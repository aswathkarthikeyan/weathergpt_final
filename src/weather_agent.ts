import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { getDisasterAlerts } from "./disaster/disaster_service.js";
import { queryHazardAtlas } from "./hazard_atlas.js";
import { translateAlertToRoles } from "./disaster/role_alert_translator.js";
import {
  UV_INDEX_REFERENCE,
  PRECIPITATION_RANGE_REFERENCE,
  WMO_CODE_REFERENCE
} from "./weather_reference.js";

const DEFAULT_GEO_API = "https://geocoding-api.open-meteo.com/v1/search";
const DEFAULT_WEATHER_API = "https://api.open-meteo.com/v1/forecast";

// Common geographical aliases and variations to ensure accurate resolution
const CITY_ALIASES: Record<string, string> = {
  "bangalore": "Bengaluru",
  "bangalore urban": "Bengaluru",
  "bangalore rural": "Bengaluru",
  "bombay": "Mumbai",
  "madras": "Chennai",
  "calcutta": "Kolkata",
  "cochin": "Kochi",
  "trivandrum": "Thiruvananthapuram",
  "poona": "Pune",
  "gurgaon": "Gurugram",
  "baroda": "Vadodara",
  "benaras": "Varanasi",
  "banaras": "Varanasi",
  "orissa": "Odisha",
  "pondicherry": "Puducherry"
};

export async function getGeolocation(city: string): Promise<{ latitude: number; longitude: number; name?: string; country?: string; admin1?: string } | string> {
  const normalized = (city || "").trim().toLowerCase();
  const searchCity = CITY_ALIASES[normalized] || (city || "").trim();
  const url = process.env.GEOLOCATION_API_EP || DEFAULT_GEO_API;
  const geoUrl = `${url}?name=${encodeURIComponent(searchCity)}&count=10&language=en&format=json`;

  try {
    const res = await fetch(geoUrl);
    if (!res.ok) {
      return `Failed to fetch geolocation for ${city}. Status: ${res.status}`;
    }
    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      return `Could not find coordinates for ${city}.`;
    }

    // Sort to prioritize:
    // 1. India (country_code === "IN") when Indian cities like Bangalore / Bengaluru are queried
    // 2. Highest population first to avoid small towns or duplicate names in other countries
    const sorted = [...data.results].sort((a: any, b: any) => {
      if (normalized.includes("bangalore") || normalized.includes("bengaluru")) {
        if (a.country_code === "IN" && b.country_code !== "IN") return -1;
        if (b.country_code === "IN" && a.country_code !== "IN") return 1;
      }
      const popA = a.population || 0;
      const popB = b.population || 0;
      return popB - popA;
    });

    const best = sorted[0];
    return {
      latitude: best.latitude,
      longitude: best.longitude,
      name: best.name,
      country: best.country,
      country_code: best.country_code,
      admin1: best.admin1
    };
  } catch (err: any) {
    return `Error fetching coordinates: ${err?.message || err}`;
  }
}

export async function getWeather(latitude: string | number, longitude: string | number): Promise<any> {
  const url = process.env.WEATHER_API_EP || DEFAULT_WEATHER_API;
  const weatherUrl =
    `${url}?latitude=${latitude}&longitude=${longitude}` +
    `&daily=weather_code,sunrise,sunset,daylight_duration,sunshine_duration,moonset,moonrise,` +
    `uv_index_max,apparent_temperature_min,apparent_temperature_max,temperature_2m_min,` +
    `temperature_2m_max,rain_sum&hourly=temperature_2m,weather_code,wind_speed_10m,` +
    `relative_humidity_2m,precipitation,pressure_msl,soil_temperature_0cm,soil_temperature_6cm,` +
    `visibility,wind_speed_80m,wind_direction_10m,wind_direction_80m,apparent_temperature,` +
    `soil_temperature_18cm,uv_index,is_day,sunshine_duration&models=best_match&forecast_days=14`;

  try {
    const res = await fetch(weatherUrl);
    if (!res.ok) {
      return { error: `Weather API returned status ${res.status}` };
    }
    return await res.json();
  } catch (err: any) {
    return { error: `Error fetching weather: ${err?.message || err}` };
  }
}

// Function Declarations for Gemini Tool Calling
const getGeolocationTool: FunctionDeclaration = {
  name: "get_geolocation",
  description: "Fetch Geolocation (latitude, longitude) for a given city name.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      city: {
        type: Type.STRING,
        description: "The name of the city to look up coordinates for."
      }
    },
    required: ["city"]
  }
};

const getWeatherTool: FunctionDeclaration = {
  name: "get_weather",
  description: "Fetch real-time and forecast weather details for given latitude and longitude coordinates.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      latitude: {
        type: Type.STRING,
        description: "The latitude coordinate."
      },
      longitude: {
        type: Type.STRING,
        description: "The longitude coordinate."
      }
    },
    required: ["latitude", "longitude"]
  }
};

const getDisasterAlertsTool: FunctionDeclaration = {
  name: "get_disaster_alerts",
  description: "Checks SACHET / NDMA for genuine disaster alerts, warnings, and weather advisories in the specified geographic area.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      latitude: {
        type: Type.NUMBER,
        description: "The latitude coordinate."
      },
      longitude: {
        type: Type.NUMBER,
        description: "The longitude coordinate."
      },
      radius: {
        type: Type.NUMBER,
        description: "The search radius in kilometers (default 50)."
      }
    },
    required: ["latitude", "longitude"]
  }
};

const getClimateHazardTool: FunctionDeclaration = {
  name: "get_climate_hazard_data",
  description: "Queries IMD Climate Hazard & Vulnerability Atlas (imdpune.gov.in/hazardatlas) for historical extreme rainfall records, flood return periods, cyclone vulnerability, and 10-year monsoon onset normals for an Indian city or district.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      city: {
        type: Type.STRING,
        description: "The name of the Indian city or district (e.g. Bangalore, Mumbai, Chennai, Coimbatore, Delhi)."
      }
    },
    required: ["city"]
  }
};

const translateAlertRolesTool: FunctionDeclaration = {
  name: "translate_alert_roles",
  description: "Closes the loop on extreme weather or cyclone warnings by translating them into 3 distinct, actionable role-based directives: Farmer (agriculture/spraying/harvest), Fisherman (sea departure clearance/harbor return), and City Ops (municipal drainage/traffic protocol).",
  parameters: {
    type: Type.OBJECT,
    properties: {
      event: {
        type: Type.STRING,
        description: "The hazardous weather event (e.g. Cyclone, Heavy Rainfall, Heatwave, Thunderstorm)."
      },
      severity: {
        type: Type.STRING,
        description: "Severity level: 'Red', 'Orange', 'Yellow', or 'Green'."
      },
      area: {
        type: Type.STRING,
        description: "Target district or city name."
      },
      extra_details: {
        type: Type.STRING,
        description: "Optional contextual meteorological data."
      }
    },
    required: ["event", "severity", "area"]
  }
};

const tools = [
  {
    functionDeclarations: [
      getGeolocationTool,
      getWeatherTool,
      getDisasterAlertsTool,
      getClimateHazardTool,
      translateAlertRolesTool
    ]
  }
];

export async function executeWeatherAgent(
  history: Array<[string, string]>,
  userMessage: string,
  userMemories?: Record<string, string>
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    // Graceful offline fallback if API key is not yet configured in environment
    return (
      "⚠️ WeatherGPT requires a GEMINI_API_KEY or GOOGLE_API_KEY in the environment. " +
      "Please set it in Settings > Secrets to enable live Gemini AI weather responses."
    );
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });

  const modelName = process.env.MODEL || "gemini-2.5-flash";

  let persistentContext = "";
  if (userMemories && Object.keys(userMemories).length > 0) {
    const facts = Object.entries(userMemories)
      .map(([k, v]) => `- ${k.replace(/_/g, " ")}: ${v}`)
      .join("\n");
    persistentContext = `\n\nPersistent User Context:\n${facts}\nNote: Use these persistent facts to tailor persona/advice. If the user asks about a different specific location, prioritize that location for tools.`;
  }

  const systemInstruction =
    `You are WeatherGPT, an intelligent, authoritative meteorological and environmental decision-support advisor for India.\n` +
    `You unify national forecasting systems (BharatFS / IMD, Open-Meteo GFS/ECMWF synoptic grids, SACHET / NDMA Common Alerting Protocol, and IMD Climate Hazard & Vulnerability Atlas).\n\n` +
    `You have access to 5 specialized tools:\n` +
    `1. get_geolocation(city): Retrieves latitude, longitude, and administrative boundaries for an Indian city, district, or village.\n` +
    `2. get_weather(latitude, longitude): Retrieves live synoptic telemetry (temperature, apparent temperature, precipitation rate, wind speed at 10m & 80m, relative humidity, pressure, UV index, soil temperatures at 0cm & 6cm).\n` +
    `3. get_disaster_alerts(latitude, longitude, radius): Scans SACHET / NDMA CAP feeds for active cyclone, thunderstorm, flood, or heatwave alerts.\n` +
    `4. get_climate_hazard_data(city): Retrieves historical climate trends, extreme 24h rainfall records, flood return periods, cyclone vulnerability, and normal monsoon onset/withdrawal dates from the IMD Hazard Atlas (imdpune.gov.in/hazardatlas).\n` +
    `5. translate_alert_roles(event, severity, area, extra_details): Translates an alert into actionable role-based directives for Farmers (agriculture/spraying/harvest), Fishermen (sea departure clearance/squalls), and City Ops (drainage/underpasses/transit).\n\n` +
    `CRITICAL ACCURACY & PROVENANCE RULES:\n` +
    `- Geolocation: When asked about Bangalore (or Bengaluru), ALWAYS resolve to Bengaluru, Karnataka, India (latitude ~12.9719, longitude ~77.5937). Never resolve to Pakistan or other countries.\n` +
    `- For Indian cities (Bangalore -> Bengaluru, Bombay -> Mumbai, Madras -> Chennai, Calcutta -> Kolkata), resolve to the Indian metropolitan center.\n` +
    `- MULTILINGUAL SUPPORT: You support English, Hindi (हिन्दी), and Tamil (தமிழ்). If the user asks in Hindi or Tamil (or code-switched Hinglish/Tanglish like "kal barish hogi kya Coimbatore mein" or "நாளை மழை பெய்யுமா"), respond naturally and authoritatively in that language or script.\n` +
    `- PROVENANCE / SOURCE LINE: At the end of every response, provide an explicit, collapsed source line:\n` +
    `  "Source: BharatFS + IMD Nowcast [Time] | SACHET/NDMA CAP | IMD Hazard Atlas"\n` +
    `- ENSEMBLE SPREAD: Include ensemble spread / forecast confidence where relevant (e.g. "Forecast Confidence: High (ECMWF/GFS ensemble spread ±0.8°C, ±5% precipitation variance)").\n\n` +
    `METEOROLOGICAL SCALES REFERENCE:\n` +
    `UV Scale: ${JSON.stringify(UV_INDEX_REFERENCE.uv_scale)}\n` +
    `Precipitation Range: ${JSON.stringify(PRECIPITATION_RANGE_REFERENCE.classifications)}\n\n` +
    `RESPONSE STYLE & FORMATTING GUIDELINES:\n` +
    `- Do NOT clutter the output with excessive asterisks (e.g. do not put double asterisks ** around every word or clause).\n` +
    `- Format key telemetry cleanly: State the current temperature, conditions, wind, precipitation chance, and UV index clearly.\n` +
    `- Tailor domain-specific actionable advice directly for the user persona:\n` +
    `  * Farmers / Agriculture: Clearly state if spraying is safe (wind < 15 km/h, no imminent rain), soil temperature profile, and irrigation guidance.\n` +
    `  * Fishermen / Marine: Clear sea clearance status, 10m and 80m wind velocities, squall alerts, and barometric trends.\n` +
    `  * City Operations / Urban Local Bodies: Drainage pump mobilization, low-lying ward inundation risks, transit corridors.\n` +
    `  * Athletes / Outdoor Training: Apparent temperature (feels-like), heat stress risk, UV index protection, and hydration recommendations.\n` +
    `  * General Public: Clear day forecast, umbrella/clothing requirements, and any active alerts.\n` +
    `- When asked about historical floods, monsoon onset, or climate patterns, use get_climate_hazard_data.` +
    persistentContext;

  // Build contents from history
  const contents: any[] = [];

  for (const [role, text] of history) {
    contents.push({
      role: role === "assistant" ? "model" : "user",
      parts: [{ text }]
    });
  }

  contents.push({
    role: "user",
    parts: [{ text: userMessage }]
  });

  try {
    // Multi-turn tool calling loop (up to 6 iterations)
    for (let iteration = 0; iteration < 6; iteration++) {
      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction,
          tools
        }
      });

      const candidate = response.candidates?.[0];
      const modelContent = candidate?.content;

      if (!modelContent) {
        return response.text || "No response generated from weather agent.";
      }

      contents.push(modelContent);

      const functionCalls = response.functionCalls;
      if (!functionCalls || functionCalls.length === 0) {
        return response.text || "Weather analysis complete.";
      }

      // Execute tool calls
      const responseParts: any[] = [];

      for (const call of functionCalls) {
        const { name, args } = call;
        let functionResult: any;

        if (name === "get_geolocation") {
          functionResult = await getGeolocation(String(args?.city || ""));
        } else if (name === "get_weather") {
          functionResult = await getWeather(String(args?.latitude || ""), String(args?.longitude || ""));
        } else if (name === "get_disaster_alerts") {
          const lat = typeof args?.latitude === "number" ? args.latitude : parseFloat(String(args?.latitude || "0"));
          const lon = typeof args?.longitude === "number" ? args.longitude : parseFloat(String(args?.longitude || "0"));
          const radius = typeof args?.radius === "number" ? args.radius : 50;
          functionResult = await getDisasterAlerts(lat, lon, radius);
        } else if (name === "get_climate_hazard_data") {
          functionResult = queryHazardAtlas(String(args?.city || ""));
        } else if (name === "translate_alert_roles") {
          const event = String(args?.event || "Severe Weather");
          const severity = (args?.severity as any) || "Orange";
          const area = String(args?.area || "Target Region");
          const extra = args?.extra_details ? String(args.extra_details) : undefined;
          functionResult = translateAlertToRoles(event, severity, area, extra);
        } else {
          functionResult = { error: `Unknown tool: ${name}` };
        }

        responseParts.push({
          functionResponse: {
            name,
            response: { result: functionResult }
          }
        });
      }

      contents.push({
        role: "user",
        parts: responseParts
      });
    }

    return "Weather query exceeded maximum tool-call rounds.";
  } catch (err: any) {
    console.error("Error in executeWeatherAgent:", err);
    return `Error processing weather request: ${err?.message || err}`;
  }
}
