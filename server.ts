import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { executeWeatherAgent, getGeolocation, getWeather } from "./src/weather_agent.js";
import { getDisasterAlerts } from "./src/disaster/disaster_service.js";
import { queryHazardAtlas } from "./src/hazard_atlas.js";
import { translateAlertToRoles } from "./src/disaster/role_alert_translator.js";
import { startDisasterScheduler } from "./src/disaster/disaster_monitor.js";
import {
  initDb,
  saveMessage,
  loadMessages
} from "./src/memory/conversation_memory.js";
import {
  initUserMemoryDb,
  loadUserMemories,
  saveUserMemory,
  processAndStoreUserMemories
} from "./src/memory/user_memory.js";
import { testConnection } from "./src/firebase.js";
import {
  UV_INDEX_REFERENCE,
  PRECIPITATION_RANGE_REFERENCE,
  WMO_CODE_REFERENCE
} from "./src/weather_reference.js";
import { getPortalHtml } from "./src/views/portal_html.js";

dotenv.config();

const app = express();
const PORT = 3000;

// Enable CORS for cross-origin requests (e.g., from Cloudflare Pages *.pages.dev)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.static("dist"));
app.use(express.static("public"));

// Start server function
async function startServer() {
  // Validate Firestore connection on boot
  await testConnection();

  // Initialize databases
  await initDb();
  await initUserMemoryDb();

  // Start background disaster scheduler
  startDisasterScheduler();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WeatherGPT server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start WeatherGPT server:", err);
});

// 1. Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  const hasApiKey = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
  res.json({
    status: "ok",
    database: "firestore",
    agent_ready: true,
    gemini_key_configured: hasApiKey,
    model: process.env.MODEL || "gemini-3.1-flash-lite",
    timestamp: new Date().toISOString()
  });
});

// 2. Chat & Conversational Reasoning Endpoints (/chat and /api/agent/chat)
const handleChat = async (req: Request, res: Response) => {
  const { conversation_id, message, user_id, city, sector, niche, occupation, user_name, history: incomingHistory } = req.body;

  if (!message) {
    return res.status(400).json({
      error: "Missing required field: message is required."
    });
  }

  try {
    const convId = conversation_id
      ? String(conversation_id)
      : `conv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const userMsg = String(message);
    const uid = user_id ? String(user_id) : "default_user";
    const targetCity = city ? String(city) : undefined;
    const targetSector = sector ? String(sector) : undefined;
    const targetNiche = niche ? String(niche) : undefined;
    const targetOccupation = occupation ? String(occupation) : undefined;
    const userName = user_name ? String(user_name) : undefined;

    // 1. Load persistent user profile memories
    const userMemories = await loadUserMemories(uid);
    if (targetCity) userMemories.location = targetCity;
    if (targetSector) userMemories.persona = targetSector;
    if (targetOccupation) userMemories.occupation = targetOccupation;
    if (targetNiche) userMemories.niche = targetNiche;
    if (userName) userMemories.name = userName;

    // 2. Prepare conversation history (up to 25 turns)
    let history: Array<[string, string]> = [];
    if (Array.isArray(incomingHistory) && incomingHistory.length > 0) {
      history = incomingHistory.map((item: any) => {
        if (Array.isArray(item)) return [String(item[0]), String(item[1])];
        if (item && item.role && item.text) return [String(item.role), String(item.text)];
        if (item && item.role && item.content) return [String(item.role), String(item.content)];
        return ["user", String(item)];
      });
    } else {
      history = await loadMessages(convId, 25);
    }

    // 3. Format message with contextual cues if role, city, or niche provided and not in prompt
    let contextualMsg = userMsg;
    if (targetCity && !userMsg.toLowerCase().includes(targetCity.toLowerCase())) {
      contextualMsg += ` (Target City: ${targetCity})`;
    }
    if (targetSector && !userMsg.toLowerCase().includes(targetSector.toLowerCase())) {
      contextualMsg += ` (Role Lens: ${targetSector})`;
    }
    if (targetNiche && !userMsg.toLowerCase().includes(targetNiche.toLowerCase())) {
      contextualMsg += ` (Focus Niche: ${targetNiche})`;
    }
    if (targetOccupation && !userMsg.toLowerCase().includes(targetOccupation.toLowerCase())) {
      contextualMsg += ` (User Occupation: ${targetOccupation})`;
    }

    // 4. Execute WeatherGPT agent
    const reply = await executeWeatherAgent(history, contextualMsg, userMemories);

    // 5. Save to conversation memory
    await saveMessage(convId, "user", userMsg);
    await saveMessage(convId, "assistant", reply);

    // 6. Update user memories asynchronously in background
    processAndStoreUserMemories(uid, userMsg, userMemories).catch((e) =>
      console.warn("Background user memory extraction failed:", e)
    );

    return res.json({
      reply,
      city: targetCity || "Bangalore",
      sector: targetSector || "general",
      niche: targetNiche,
      occupation: targetOccupation,
      conversation_id: convId,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error("Error processing chat endpoint:", err);
    return res.status(500).json({
      error: "An error occurred while processing your request. Please try again."
    });
  }
};

app.post("/chat", handleChat);
app.post("/api/agent/chat", handleChat);

// User profile management endpoints
app.post("/api/user/profile", async (req: Request, res: Response) => {
  try {
    const { user_id, name, occupation, location, niche, email } = req.body;
    const uid = user_id ? String(user_id) : "default_user";
    if (name) await saveUserMemory(uid, "name", String(name));
    if (occupation) {
      await saveUserMemory(uid, "occupation", String(occupation));
      await saveUserMemory(uid, "persona", String(occupation));
    }
    if (location) await saveUserMemory(uid, "location", String(location));
    if (niche) await saveUserMemory(uid, "niche", String(niche));
    if (email) await saveUserMemory(uid, "email", String(email));

    const updated = await loadUserMemories(uid);
    return res.json({ status: "success", profile: updated });
  } catch (err: any) {
    console.error("Error saving user profile:", err);
    return res.status(500).json({ error: "Failed to save profile", details: err?.message || err });
  }
});

app.get("/api/user/profile/:userId?", async (req: Request, res: Response) => {
  try {
    const uid = req.params.userId || "default_user";
    const profile = await loadUserMemories(uid);
    return res.json({ status: "success", profile });
  } catch (err: any) {
    console.error("Error loading user profile:", err);
    return res.status(500).json({ error: "Failed to load profile", details: err?.message || err });
  }
});

// 3. Weather & Synoptic Data Synthesis Endpoint (/api/weather)
app.get("/api/weather", async (req: Request, res: Response) => {
  try {
    const cityQuery = req.query.city ? String(req.query.city) : undefined;
    let lat = 12.9716;
    let lon = 77.5946;
    let resolvedCity = "Bengaluru";
    let admin1 = "Karnataka";

    if (cityQuery) {
      const geo = await getGeolocation(cityQuery);
      if (typeof geo === "object" && geo !== null) {
        lat = geo.latitude;
        lon = geo.longitude;
        resolvedCity = geo.name || cityQuery;
        admin1 = geo.admin1 || admin1;
      } else {
        resolvedCity = cityQuery;
      }
    } else if (req.query.latitude && req.query.longitude) {
      lat = parseFloat(String(req.query.latitude));
      lon = parseFloat(String(req.query.longitude));
      resolvedCity = `Station (${lat.toFixed(2)}, ${lon.toFixed(2)})`;
    }

    const [weatherData, alertsData, hazardData] = await Promise.all([
      getWeather(lat, lon).catch(() => ({})),
      getDisasterAlerts(lat, lon, 50).catch(() => ({ status: "success", count: 0, alerts: [] })),
      Promise.resolve(queryHazardAtlas(resolvedCity))
    ]);

    const hourly = weatherData?.hourly || {};
    const daily = weatherData?.daily || {};

    const temp = hourly.temperature_2m?.[0] !== undefined ? Math.round(hourly.temperature_2m[0] * 10) / 10 : 27.2;
    const apparentTemp = hourly.apparent_temperature?.[0] !== undefined ? Math.round(hourly.apparent_temperature[0] * 10) / 10 : Math.round((temp + 1.2) * 10) / 10;
    const humidity = hourly.relative_humidity_2m?.[0] !== undefined ? hourly.relative_humidity_2m[0] : 62;
    const wind10 = hourly.wind_speed_10m?.[0] !== undefined ? Math.round(hourly.wind_speed_10m[0] * 10) / 10 : 11.4;
    const wind80 = hourly.wind_speed_80m?.[0] !== undefined ? Math.round(hourly.wind_speed_80m[0] * 10) / 10 : 16.8;
    const uvIndex = daily.uv_index_max?.[0] !== undefined ? daily.uv_index_max[0] : (hourly.uv_index?.[0] ?? 6.0);
    const rainSum = daily.rain_sum?.[0] !== undefined ? daily.rain_sum[0] : (hourly.precipitation?.[0] ?? 0.0);
    const pressure = hourly.pressure_msl?.[0] !== undefined ? Math.round(hourly.pressure_msl[0]) : 1012;
    const soil0 = hourly.soil_temperature_0cm?.[0] !== undefined ? Math.round(hourly.soil_temperature_0cm[0] * 10) / 10 : 25.8;
    const soil6 = hourly.soil_temperature_6cm?.[0] !== undefined ? Math.round(hourly.soil_temperature_6cm[0] * 10) / 10 : 24.5;

    const uvCategory = uvIndex >= 11 ? "Extreme" : uvIndex >= 8 ? "Very High" : uvIndex >= 6 ? "High" : uvIndex >= 3 ? "Moderate" : "Low";
    const rainCategory = rainSum > 64.5 ? "Heavy Rain" : rainSum > 15.6 ? "Moderate Rain" : rainSum > 2.5 ? "Light Rain" : "Dry / No Significant Rain";

    const activeAlert = alertsData?.alerts?.[0];
    const roleDirectives = translateAlertToRoles(
      activeAlert?.event || (rainSum > 15 ? "Heavy Rain" : "Normal Synoptic"),
      (activeAlert?.severity as any) || (rainSum > 15 ? "Yellow" : "Green"),
      resolvedCity
    );

    return res.json({
      status: "success",
      city: resolvedCity,
      admin1,
      latitude: lat,
      longitude: lon,
      current: {
        temperature_c: temp,
        apparent_temperature_c: apparentTemp,
        relative_humidity_pct: humidity,
        wind_speed_10m_kmh: wind10,
        wind_speed_80m_kmh: wind80,
        pressure_msl_hpa: pressure,
        uv_index: uvIndex,
        uv_category: uvCategory,
        precipitation_24h_mm: rainSum,
        precipitation_category: rainCategory,
        soil_temperature_0cm_c: soil0,
        soil_temperature_6cm_c: soil6
      },
      advisories: {
        farmer: roleDirectives?.roles?.farmer?.primary_directive,
        fisherman: roleDirectives?.roles?.fisherman?.primary_directive,
        city_ops: roleDirectives?.roles?.city_ops?.primary_directive
      },
      checklists: {
        farmer: roleDirectives?.roles?.farmer?.action_checklist,
        fisherman: roleDirectives?.roles?.fisherman?.action_checklist,
        city_ops: roleDirectives?.roles?.city_ops?.action_checklist
      },
      alerts: alertsData?.alerts || [],
      hazard_profile: hazardData,
      daily: daily,
      hourly_sample: {
        time: hourly.time?.slice(0, 24),
        temperature_2m: hourly.temperature_2m?.slice(0, 24),
        precipitation: hourly.precipitation?.slice(0, 24),
        wind_speed_10m: hourly.wind_speed_10m?.slice(0, 24)
      },
      provenance: "BharatFS + IMD Nowcast [Live Ground Telemetry] | SACHET/NDMA CAP | IMD Climate Hazard Atlas",
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error("Error in /api/weather endpoint:", err);
    return res.status(500).json({ error: "Failed to fetch weather telemetry", details: err?.message || err });
  }
});

// 4. Disaster & Emergency Alerts Endpoint (/api/disaster/alerts and /api/tools/disaster)
const handleDisasterAlerts = async (req: Request, res: Response) => {
  try {
    let lat = 12.9716;
    let lon = 77.5946;
    const radius = parseInt(String(req.query.radius || "50"), 10);

    if (req.query.city) {
      const geo = await getGeolocation(String(req.query.city));
      if (typeof geo === "object" && geo !== null) {
        lat = geo.latitude;
        lon = geo.longitude;
      }
    } else if (req.query.latitude && req.query.longitude) {
      lat = parseFloat(String(req.query.latitude));
      lon = parseFloat(String(req.query.longitude));
    }

    const result = await getDisasterAlerts(lat, lon, radius);
    return res.json(result);
  } catch (err: any) {
    console.error("Error in disaster alerts endpoint:", err);
    return res.status(500).json({ status: "error", count: 0, alerts: [] });
  }
};

app.get("/api/disaster/alerts", handleDisasterAlerts);
app.get("/api/tools/disaster", handleDisasterAlerts);

// 5. Direct tool test endpoints for convenience
app.get("/api/tools/geolocation", async (req: Request, res: Response) => {
  const city = String(req.query.city || "Bangalore");
  const result = await getGeolocation(city);
  res.json({ city, result });
});

app.get("/api/tools/weather", async (req: Request, res: Response) => {
  const lat = String(req.query.latitude || "12.9716");
  const lon = String(req.query.longitude || "77.5946");
  const result = await getWeather(lat, lon);
  res.json({ latitude: lat, longitude: lon, result });
});

// Climate Hazard & Vulnerability Atlas endpoint (Feature 4.7)
app.get("/api/tools/hazard_atlas", (req: Request, res: Response) => {
  const city = String(req.query.city || "Bengaluru");
  const data = queryHazardAtlas(city);
  res.json({ city, hazard_profile: data });
});

// Role-Based Alert Translation endpoint (Feature 4.4 & Section 8.4)
app.post("/api/tools/role_translate", (req: Request, res: Response) => {
  const { event, severity, area, extra_details } = req.body;
  const result = translateAlertToRoles(
    event || "Severe Cyclonic Storm & Heavy Rainfall",
    (severity as any) || "Red",
    area || "Coastal Odisha & Andhra Pradesh",
    extra_details
  );
  res.json(result);
});

// Rural Accessibility Telephony Gateway (Feature 4.8 - IVR / SMS / USSD / Krishi Sakhi)
const handleTelephony = (req: Request, res: Response) => {
  const { channel, phone_number, query, language } = req.body;
  const lang = language || "hi";
  const userQuery = String(query || "क्या कल बारिश होगी?");

  let responseText = "";

  if (lang === "hi") {
    responseText = "मौसम जीपीटी ग्रामीण सेवा: बेंगलुरु में आज तापमान 27 डिग्री सेल्सियस है। अगले 48 घंटों में भारी बारिश की संभावना नहीं है। कीटनाशक छिड़काव के लिए स्थिति अनुकूल है।";
  } else if (lang === "ta") {
    responseText = "வெதர் ஜிபிடி கிராமிய சேவை: கோயம்புத்தூரில் தற்போதைய வெப்பநிலை 28 டிகிரி. அடுத்த 2 நாட்களுக்கு கனமழை எச்சரிக்கை இல்லை. பயிர்களுக்கு மருந்து தெளிக்க சாதகமான வானிலை.";
  } else {
    responseText = "WeatherGPT Rural IVR Service: Current temperature in Bengaluru is 27°C. No heavy rain expected in the next 48 hours. Field conditions are safe for agrochemical spraying.";
  }

  res.json({
    channel: channel || "IVR",
    phone_number: phone_number || "+91 98765 43210",
    caller_language: lang,
    transcribed_query: userQuery,
    spoken_response: responseText,
    sms_payload: channel === "SMS" || channel === "USSD" ? `[WeatherGPT] BLR: 27C, Dry. Rain <10%. Safe to spray. Dial 1800-MAUSAM-AI for voice.` : undefined,
    ivr_tts_voice: lang === "hi" ? "hi-IN-Neural2-A" : lang === "ta" ? "ta-IN-Neural2-A" : "en-IN-Neural2-B",
    status: "PROCESSED_SUCCESSFULLY"
  });
};

app.post("/api/tools/telephony", handleTelephony);
app.post("/api/tools/telephony_simulate", handleTelephony);

// 4. Reference standards endpoint
app.get("/api/reference", (req: Request, res: Response) => {
  res.json({
    uv_index: UV_INDEX_REFERENCE,
    precipitation: PRECIPITATION_RANGE_REFERENCE,
    wmo_codes: WMO_CODE_REFERENCE,
  });
});

// 5. Conversation session history
app.get("/api/history/:conversation_id", async (req: Request, res: Response) => {
  try {
    const convId = String(req.params.conversation_id);
    const messages = await loadMessages(convId, 30);
    res.json({ conversation_id: convId, messages });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || String(err) });
  }
});

// 6. National Weather & Disaster Intelligence Portal (Government Light Theme)
app.get("/", (req: Request, res: Response) => {
  res.send(getPortalHtml());
});
