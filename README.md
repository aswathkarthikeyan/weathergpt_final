# 🌦️ WeatherGPT • Meteorological & Disaster Intelligence Engine

> **Conversational AI Meteorological Reasoning & Early Disaster Action Platform for India**  
> Unifying BharatFS synoptic grids, IMD Nowcast radar feeds, Meghdoot Agromet, Damini Lightning telemetry, and NDMA SACHET CAP feeds into role-specific operational directives.

---

## 🌟 Overview

**WeatherGPT** is a production-grade meteorological reasoning engine and early warning intelligence platform tailored specifically to the Indian subcontinental synoptic patterns and agro-climatic zones.

Unlike generic weather forecast applications that merely display raw numerical temperatures or precipitation probabilities, WeatherGPT performs **multi-source meteorological synthesis and role-calibrated impact translation**:

1. **BharatFS & Synoptic Grid Analysis**: Synthesizes Numerical Weather Prediction (NWP) models (ECMWF, GFS, BharatFS 0.125° grid resolutions).
2. **Role-Based Alert Translation**: Translates single Red/Orange alerts into parallel, actionable directives for **Farmers** (spraying/harvest windows), **Fishermen & Coastal Workers** (harbor returns & sea ban thresholds), **City Ops / Municipal ULBs** (stormwater pumping & urban flash flood alerts), and the **General Public**.
3. **Multilingual Voice & Text**: Full support for English, Hindi (हिन्दी), and Tamil (தமிழ்), with built-in speech synthesis (`Web Speech API`).
4. **Offline & Low-Bandwidth Rural Accessibility**: Provides a low-bandwidth USSD simulation, SMS broadcast dispatching, and emergency voice hotline script generators for last-mile connectivity.
5. **Interactive IMD Climate Hazard Atlas**: Geospatial hazard return periods, cyclone vulnerability tiers, and heatwave mortality risk grids.

---

## 🏛️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                   WEATHERGPT CLIENT INTERFACE (Frontend)               │
│  • Pure Tailwind CSS (Zero-Pill Minimalist Aesthetic)                  │
│  • Interactive Floating Atmospheric Dots Background (Canvas)           │
│  • Role-Based Directives Engine                                        │
│  • Multilingual Localization (EN / HI / TA)                            │
│  • Audio Speech Synthesis & Form Transcript Printer                    │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                         HTTPS / REST / JSON
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   WEATHERGPT API SERVER (Express / Node.js)            │
│  • CORS-Permissive Architecture (Cloudflare Pages / Cloud Run)         │
│  • Endpoint Proxy & Synthesis Router (/api/weather, /api/agent/chat)   │
│  • Role-Lens Contextual Injectors (Farmer, Fisherman, City Ops)       │
└────────────────────────────────────────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌──────────────┐             ┌──────────────┐             ┌──────────────┐
│ Google Gemini│             │ IMD & NDMA   │             │   Firebase   │
│  Reasoning   │             │ CAP Bulletin │             │  Firestore   │
│ (gemini-2.5) │             │ Nowcast Feeds│             │ Chat Memory  │
└──────────────┘             └──────────────┘             └──────────────┘
```

---

## 🚀 Key Features

### 1. Conversational Meteorological Console
- Multi-turn conversation maintaining contextual meteorological memory.
- In-depth answers with synoptic explanations, agricultural advice (AMFU/Meghdoot), and marine safety thresholds (INCOIS).
- Quick inquiry shortcuts for immediate pesticide spraying windows, marine squall checks, heat exhaustion risk, and flood inundation.

### 2. Role-Based Operational Directives Engine
- Instant simulated and live fan-out for:
  - **Cyclone Red Alert** (Coastal Andhra / Odisha / Tamil Nadu)
  - **Urban Cloudburst** (Bengaluru / Mumbai)
  - **Severe Heatwave & Evaporation** (Delhi / Rajasthan)
- Role-specific checklists and active operational status flags.

### 3. Integrated Indian Meteorological Sensors
- Real-time station telemetry for Bangalore, Delhi, Mumbai, Chennai, Coimbatore, Kolkata, and GPS-detected coordinates.
- Air Quality Index (PM2.5, PM10, AQI Categories).
- Barometric pressure trends with synoptic tendency calculation (e.g., `-2.4 hPa/3h`).
- Cloud base altitude, planetary boundary layer height, dew point, wet-bulb temperature, and ultraviolet index.

### 4. Rural & Offline Last-Mile Disaster Tier
- **USSD Quick Dial simulation** (`*999*5#`) for non-smartphone users.
- **SMS Broadcast Generator** with pre-formatted 160-character alerts in regional scripts.
- **IVR Voice Helpline Script** generator for automated community phone trees.

### 5. IMD Climate Hazard Atlas
- Interactive vulnerability assessment by hazard type: **Tropical Cyclones**, **Urban & Riverine Floods**, **Severe Heatwaves**, and **Lightning/Damini strikes**.
- 50-year return period statistics and recommended district-level standard operating procedures (SOPs).

---

## 🛠️ Tech Stack

- **Runtime & Backend**: Node.js, Express, TypeScript, `tsx`, `esbuild`
- **AI & Reasoning Engine**: `@google/genai` (Google Gemini models)
- **Database & State Management**: Firebase Firestore (`firebase@12.x`)
- **Frontend / UI**: Clean semantic HTML5, Modern Tailwind CSS (CDN), Vanilla JavaScript with zero heavy framework bloat.
- **Static Site Compilation**: Custom static generator (`scripts/generate_static.ts`) outputting production-ready static bundles to `public/`, `dist/`, and root `/`.

---

## 📦 Installation & Local Development

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **bun** / **yarn**

### 1. Clone the repository
```bash
git clone https://github.com/your-org/weathergpt.git
cd weathergpt
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory (based on `.env.example`):
```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
The server will start at `http://localhost:3000`.

---

## 🌐 Deployment Guide

### Option A: Cloudflare Pages (Frontend / Static Mode)

Cloudflare Pages can host WeatherGPT statically with seamless connection to your backend server.

1. In the **Cloudflare Pages Dashboard**, create a new project linked to your Git repository.
2. Configure **Build Settings**:
   - **Framework preset**: `None` (or `Custom`)
   - **Build command**: `npm run build:pages`
   - **Build output directory**: `public` *(or `dist` or root `/`)*
3. Deploy the project.
4. On your live Cloudflare site, click the **`API`** button in the top navigation bar and enter your backend server URL (e.g. Cloud Run, Railway, or VPS) if hosting the Express backend separately.

### Option B: Full-Stack Container (Google Cloud Run / VPS / Railway)

1. **Build and bundle:**
   ```bash
   npm run build
   ```
2. **Start the production server:**
   ```bash
   npm run start
   ```
   The application will serve both the backend API endpoints (`/api/*`) and the static frontend on port `3000` (or `process.env.PORT`).

---

## 📡 API Reference

### 1. Health Check
- **`GET /health`**
- Returns server status, timestamp, and active services.

### 2. Weather & Synoptic Data
- **`GET /api/weather?city={city}`**
- Returns real-time observational metrics, NWP forecast grids, agricultural advice, and marine parameters for the specified city.

### 3. Conversational Reasoning Agent
- **`POST /api/agent/chat`**
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "message": "Is it safe to spray systemic fungicide on my tomato crop in Kolar today?",
    "city": "Bangalore",
    "sector": "farmer",
    "history": []
  }
  ```
- **Response:**
  ```json
  {
    "reply": "### AGROMET DIRECTIVE: DO NOT SPRAY\n\n- Precipitation probability is 80% over the next 6 hours...",
    "city": "Bangalore",
    "sector": "farmer",
    "timestamp": "2026-09-23T07:30:00Z"
  }
  ```

### 4. SACHET / CAP Active Bulletin Alerts
- **`GET /api/disaster/alerts`**
- Returns real-time CAP disaster bulletins categorized by severity, affected districts, and urgency.

---

## 🔒 Security & Best Practices

- **CORS Configured**: Allows flexible hosting scenarios where the frontend is on Cloudflare Pages and the backend is on Google Cloud Run.
- **Cache-Control Headers**: Pre-configured `_headers` and HTML meta tags prevent stale client caching of emergency weather alerts.
- **Zero API Key Leakage**: LLM and provider keys remain securely on the server side.

---

## 📄 License

This project is licensed under the MIT License.
