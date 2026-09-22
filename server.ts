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

// 4. Interactive Web Interface for AI Studio Preview
app.get("/", (req: Request, res: Response) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WeatherGPT Backend Service</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen font-sans flex flex-col">
  <header class="border-b border-slate-800 bg-slate-950/80 backdrop-blur px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
        ⛅
      </div>
      <div>
        <h1 class="text-lg font-bold tracking-tight text-white">WeatherGPT</h1>
        <p class="text-xs text-slate-400">LangChain & Gemini Weather Intelligence Agent</p>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <span id="health-badge" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        API Online
      </span>
      <a href="/health" target="_blank" class="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 border border-slate-700">/health</a>
    </div>
  </header>

  <main class="flex-1 max-w-5xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Chat Window -->
    <div class="lg:col-span-2 flex flex-col bg-slate-950/60 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
      <div class="px-5 py-3 border-b border-slate-800/80 bg-slate-900/50 flex items-center justify-between text-xs text-slate-400">
        <span class="font-medium text-slate-300">Live Agent Console</span>
        <span id="session-label">Session: session-1</span>
      </div>

      <div id="chat-messages" class="flex-1 p-5 space-y-4 overflow-y-auto max-h-[480px] min-h-[360px]">
        <div class="flex items-start gap-3">
          <div class="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs shrink-0 mt-0.5">AI</div>
          <div class="bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-300 max-w-xl">
            Hello! I am <strong>WeatherGPT</strong>. I can look up coordinates, fetch meteorological forecasts, check genuine SACHET disaster advisories, and tailor my recommendations to your activity (farmer, fisherman, runner, athlete). How can I help you today?
          </div>
        </div>
      </div>

      <div class="p-4 border-t border-slate-800 bg-slate-900/30">
        <div class="flex gap-2 mb-3 overflow-x-auto pb-1 text-xs">
          <button onclick="sendPrompt('Can I play football outside now in Toronto? (12.9716, 77.59)')" class="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">⚽ Football in Toronto</button>
          <button onclick="sendPrompt('I am a farmer in Coimbatore growing tomatoes. Will it rain today?')" class="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">🌾 Farmer in Coimbatore</button>
          <button onclick="sendPrompt('Check if there are any severe disaster alerts near Bangalore coordinates 12.97, 77.59')" class="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">⚠️ SACHET Alerts</button>
        </div>
        <form id="chat-form" class="flex gap-2">
          <input id="user-input" type="text" placeholder="Ask about the weather, disaster alerts, outdoor planning..." class="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
          <button id="send-btn" type="submit" class="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition shadow-lg shadow-blue-600/20 disabled:opacity-50">Send</button>
        </form>
      </div>
    </div>

    <!-- Sidebar Tools & Documentation -->
    <div class="space-y-6">
      <!-- Tool Status -->
      <div class="bg-slate-950/60 rounded-2xl border border-slate-800 p-5 shadow-xl">
        <h2 class="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <span class="text-blue-400">🛠️</span> Configured Tools
        </h2>
        <div class="space-y-2 text-xs">
          <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <div class="font-medium text-slate-200">get_geolocation</div>
              <div class="text-slate-400 text-[11px]">Open-Meteo Geocoding</div>
            </div>
            <button onclick="testGeo()" class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">Test</button>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <div class="font-medium text-slate-200">get_weather</div>
              <div class="text-slate-400 text-[11px]">Open-Meteo 14-day API</div>
            </div>
            <button onclick="testWeather()" class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">Test</button>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <div class="font-medium text-slate-200">get_disaster_alerts</div>
              <div class="text-slate-400 text-[11px]">SACHET / NDMA CAP RSS</div>
            </div>
            <button onclick="testDisaster()" class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">Test</button>
          </div>
        </div>
      </div>

      <!-- API Endpoints Info -->
      <div class="bg-slate-950/60 rounded-2xl border border-slate-800 p-5 shadow-xl">
        <h2 class="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <span class="text-emerald-400">🔌</span> Backend API Endpoints
        </h2>
        <div class="space-y-3 text-xs text-slate-300">
          <div>
            <span class="px-1.5 py-0.5 rounded font-mono text-[10px] bg-blue-500/20 text-blue-300 font-bold">POST</span>
            <span class="font-mono text-slate-200 ml-1">/chat</span>
            <pre class="mt-1.5 p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400 overflow-x-auto">{"conversation_id": "c1", "message": "Can I run outside?"}</pre>
          </div>
          <div>
            <span class="px-1.5 py-0.5 rounded font-mono text-[10px] bg-emerald-500/20 text-emerald-300 font-bold">GET</span>
            <span class="font-mono text-slate-200 ml-1">/health</span>
            <div class="text-slate-400 mt-1">Health check & model status</div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    const convId = "session-" + Math.floor(Math.random() * 10000);
    document.getElementById("session-label").textContent = "Session: " + convId;

    async function sendPrompt(text) {
      document.getElementById("user-input").value = text;
      document.getElementById("chat-form").dispatchEvent(new Event("submit"));
    }

    async function testGeo() {
      const res = await fetch("/api/tools/geolocation?city=Bangalore");
      const data = await res.json();
      alert("Geolocation for Bangalore:\\n" + JSON.stringify(data.result, null, 2));
    }

    async function testWeather() {
      const res = await fetch("/api/tools/weather?latitude=12.9716&longitude=77.5946");
      const data = await res.json();
      alert("Weather response received with " + Object.keys(data.result || {}).length + " fields.");
    }

    async function testDisaster() {
      const res = await fetch("/api/tools/disaster?latitude=12.9716&longitude=77.5946&radius=50");
      const data = await res.json();
      alert("SACHET alerts found: " + (data.count || 0));
    }

    document.getElementById("chat-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = document.getElementById("user-input");
      const msg = input.value.trim();
      if (!msg) return;

      const chat = document.getElementById("chat-messages");
      chat.innerHTML += \`
        <div class="flex items-start gap-3 justify-end">
          <div class="bg-blue-600 rounded-xl p-3 text-sm text-white max-w-xl">\${msg}</div>
        </div>
      \`;
      input.value = "";
      input.disabled = true;
      document.getElementById("send-btn").disabled = true;

      const loadingId = "loading-" + Date.now();
      chat.innerHTML += \`
        <div id="\${loadingId}" class="flex items-start gap-3">
          <div class="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs shrink-0 mt-0.5">AI</div>
          <div class="bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-400 max-w-xl flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            Consulting weather sensors and meteorology agent...
          </div>
        </div>
      \`;
      chat.scrollTop = chat.scrollHeight;

      try {
        const response = await fetch("/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conversation_id: convId, message: msg })
        });
        const data = await response.json();
        document.getElementById(loadingId).remove();

        chat.innerHTML += \`
          <div class="flex items-start gap-3">
            <div class="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs shrink-0 mt-0.5">AI</div>
            <div class="bg-slate-900 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 max-w-xl whitespace-pre-wrap leading-relaxed">\${data.reply || data.error}</div>
          </div>
        \`;
      } catch (err) {
        document.getElementById(loadingId).remove();
        chat.innerHTML += \`
          <div class="flex items-start gap-3">
            <div class="w-7 h-7 rounded-lg bg-red-600/30 text-red-400 flex items-center justify-center text-xs shrink-0 mt-0.5">!</div>
            <div class="bg-red-950/40 border border-red-800/60 rounded-xl p-3 text-sm text-red-300 max-w-xl">
              Failed to connect to agent: \${err.message}
            </div>
          </div>
        \`;
      } finally {
        input.disabled = false;
        document.getElementById("send-btn").disabled = false;
        input.focus();
        chat.scrollTop = chat.scrollHeight;
      }
    });
  </script>
</body>
</html>`);
});
