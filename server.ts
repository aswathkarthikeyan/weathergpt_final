import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { executeWeatherAgent, getGeolocation, getWeather } from "./src/weather_agent.js";
import { getDisasterAlerts } from "./src/disaster/disaster_service.js";
import { startDisasterScheduler } from "./src/disaster/disaster_monitor.js";
import {
  initDb,
  saveMessage,
  loadMessages
} from "./src/memory/conversation_memory.js";
import {
  initUserMemoryDb,
  loadUserMemories,
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

app.use(express.json());

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
    model: process.env.MODEL || "gemini-2.5-flash",
    timestamp: new Date().toISOString()
  });
});

// 2. Chat endpoint (Matches original FastAPI /chat signature)
app.post("/chat", async (req: Request, res: Response) => {
  const { conversation_id, message, user_id } = req.body;

  if (!conversation_id || !message) {
    return res.status(400).json({
      error: "Missing required fields: conversation_id and message are required."
    });
  }

  try {
    const convId = String(conversation_id);
    const userMsg = String(message);
    const uid = user_id ? String(user_id) : "default_user";

    // 1. Load persistent user profile memories
    const userMemories = await loadUserMemories(uid);

    // 2. Load recent conversation history (up to 25 turns)
    const history = await loadMessages(convId, 25);

    // 3. Execute WeatherGPT agent
    const reply = await executeWeatherAgent(history, userMsg, userMemories);

    // 4. Save to conversation memory
    await saveMessage(convId, "user", userMsg);
    await saveMessage(convId, "assistant", reply);

    // 5. Update user memories asynchronously in background
    processAndStoreUserMemories(uid, userMsg, userMemories).catch((e) =>
      console.warn("Background user memory extraction failed:", e)
    );

    return res.json({ reply });
  } catch (err: any) {
    console.error("Error processing chat endpoint:", err);
    return res.status(500).json({
      error: "An error occurred while processing your request. Please try again."
    });
  }
});

// 3. Direct tool test endpoints for convenience
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

app.get("/api/tools/disaster", async (req: Request, res: Response) => {
  const lat = parseFloat(String(req.query.latitude || "12.9716"));
  const lon = parseFloat(String(req.query.longitude || "77.5946"));
  const radius = parseInt(String(req.query.radius || "50"), 10);
  const result = await getDisasterAlerts(lat, lon, radius);
  res.json(result);
});

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
