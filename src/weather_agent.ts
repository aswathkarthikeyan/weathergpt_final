import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { getDisasterAlerts } from "./disaster/disaster_service.js";
import {
  UV_INDEX_REFERENCE,
  PRECIPITATION_RANGE_REFERENCE,
  WMO_CODE_REFERENCE
} from "./weather_reference.js";

const DEFAULT_GEO_API = "https://geocoding-api.open-meteo.com/v1/search";
const DEFAULT_WEATHER_API = "https://api.open-meteo.com/v1/forecast";

export async function getGeolocation(city: string): Promise<{ latitude: number; longitude: number } | string> {
  const url = process.env.GEOLOCATION_API_EP || DEFAULT_GEO_API;
  const geoUrl = `${url}?name=${encodeURIComponent(city)}&count=1`;
  try {
    const res = await fetch(geoUrl);
    if (!res.ok) {
      return `Failed to fetch geolocation for ${city}. Status: ${res.status}`;
    }
    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      return `Could not find coordinates for ${city}.`;
    }
    const { latitude, longitude } = data.results[0];
    return { latitude, longitude };
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

const tools = [
  {
    functionDeclarations: [getGeolocationTool, getWeatherTool, getDisasterAlertsTool]
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
    `You are a weather expert with access to 3 tools.\n` +
    `Use get_geolocation() to get the geolocation for a city mentioned in the user prompt.\n` +
    `Use get_weather() to get the weather details from the tool. It returns the data in a JSON format.\n` +
    `Use get_disaster_alerts() to check for severe alerts, warnings, and disasters.\n` +
    `If the city is not given, use the geolocation directly from the user prompt.\n` +
    `The weather JSON has the data related to temperature, visibility, elevation/altitude, precipitation, uv-index, etc.\n` +
    `Refer to the meteorological scales:\n` +
    `UV Scale: ${JSON.stringify(UV_INDEX_REFERENCE.uv_scale)}\n` +
    `Precipitation Range: ${JSON.stringify(PRECIPITATION_RANGE_REFERENCE.classifications)}\n` +
    `Identify the user persona based on the questions the user asks.\n` +
    `For Example: The user persona could be a fisherman going to sea, a farmer watering crops, or an outdoor sports person going for a run or hike.\n` +
    `Determine what aspect of the weather from the weather data will impact the user and advise accordingly.\n` +
    `IMPORTANT INSTRUCTION: Do not use your LLM capabilities to find and interpret the weather. Use the given tools only.` +
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
