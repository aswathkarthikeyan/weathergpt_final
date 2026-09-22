export function getPortalHtml(): string {
  return `<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WeatherGPT - National Weather & Disaster Intelligence Portal</title>
  <meta name="description" content="Weather chat service and agent powered by Google Gemini, real-time meteorology APIs, and SACHET disaster monitoring">
  <meta property="og:title" content="WeatherGPT - National Weather & Disaster Intelligence Portal">
  <meta property="og:description" content="Weather chat service and agent powered by Google Gemini, real-time meteorology APIs, and SACHET disaster monitoring">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400&family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Public Sans"', 'system-ui', '-apple-system', 'sans-serif'],
            serif: ['"Merriweather"', 'Georgia', 'serif'],
          },
          colors: {
            govblue: {
              50: '#f0f4f9',
              100: '#dde7f2',
              700: '#1b3a5c',
              800: '#132d4b',
              900: '#0c2038',
              950: '#071526'
            },
            govgold: {
              500: '#b45309',
              600: '#92400e',
            }
          }
        }
      }
    }
  </script>
  <style>
    /* Government Typography & Document Print Guidelines */
    body {
      font-family: 'Public Sans', system-ui, sans-serif;
      background-color: #f8fafc;
      color: #0f172a;
      -webkit-font-smoothing: antialiased;
    }
    .gov-title {
      font-family: 'Merriweather', Georgia, serif;
    }
    .table-bordered th, .table-bordered td {
      border: 1px solid #cbd5e1;
    }
    .official-seal-shadow {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    }
    /* Custom Scrollbars */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    ::-webkit-scrollbar-thumb {
      background: #94a3b8;
    }
  </style>
</head>
<body class="min-h-screen flex flex-col text-slate-900 bg-slate-50 text-[15px] leading-relaxed">

  <!-- ==================== 1. OFFICIAL TOP GOVERNMENT RIBBON ==================== -->
  <div id="gov-top-ribbon" class="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-3">
    <div class="flex items-center gap-2 font-medium tracking-wide">
      <span class="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold">🏛️</span>
      <span>NATIONAL METEOROLOGICAL & HAZARD INTELLIGENCE PORTAL</span>
      <span class="text-slate-500 hidden md:inline">|</span>
      <span class="text-slate-400 hidden md:inline font-normal">Official Public Atmospheric Advisory System</span>
    </div>

    <div class="flex items-center gap-4 text-[11px] text-slate-300">
      <!-- Live Clock -->
      <div class="flex items-center gap-1.5 font-mono">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span id="utc-clock">UTC: --:--:--</span>
        <span class="text-slate-600">|</span>
        <span id="local-clock">LOCAL: --:--:--</span>
      </div>

      <!-- Accessibility Font Resizer -->
      <div class="hidden sm:flex items-center gap-1 border-l border-slate-700 pl-3">
        <span class="text-slate-400 mr-1 text-[10px] uppercase tracking-wider">Text:</span>
        <button onclick="changeFontSize(-1)" title="Decrease Font Size" class="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold border border-slate-700">A-</button>
        <button onclick="changeFontSize(0)" title="Default Font Size" class="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold border border-slate-700">A</button>
        <button onclick="changeFontSize(1)" title="Increase Font Size" class="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold border border-slate-700">A+</button>
      </div>

      <!-- Database Status Indicator -->
      <div class="hidden lg:flex items-center gap-1.5 border-l border-slate-700 pl-3 text-emerald-400">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span>FIRESTORE CLOUD ACTIVE</span>
      </div>
    </div>
  </div>

  <!-- ==================== 2. PRIMARY GOVERNMENT MASTHEAD ==================== -->
  <header class="bg-govblue-900 text-white border-b-4 border-amber-600 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="flex items-center gap-4">
        <!-- Official Crest Emblem -->
        <div class="w-14 h-14 bg-white rounded-sm p-1.5 flex items-center justify-center shrink-0 border border-amber-500/40 shadow-inner">
          <svg viewBox="0 0 100 100" class="w-full h-full text-govblue-900" fill="none" stroke="currentColor" stroke-width="3">
            <!-- Official Seal Iconography -->
            <circle cx="50" cy="50" r="44" stroke="#132d4b" stroke-width="4" stroke-dasharray="2 2"/>
            <circle cx="50" cy="50" r="38" stroke="#b45309" stroke-width="2"/>
            <path d="M50 16 L50 84 M16 50 L84 50" stroke="#cbd5e1" stroke-width="1.5"/>
            <!-- Sun & Cloud Symbol -->
            <circle cx="42" cy="42" r="10" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
            <path d="M36 56 C33 56 30 53 30 49 C30 45 33 42 37 42 C38 37 43 34 48 35 C53 36 57 40 57 45 C61 45 64 48 64 52 C64 56 61 59 57 59 Z" fill="#ffffff" stroke="#132d4b" stroke-width="2"/>
            <path d="M38 64 L34 72 M48 64 L44 72 M58 64 L54 72" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        </div>

        <div>
          <div class="text-[11px] uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-2">
            <span>National Disaster Management & Meteorology Division</span>
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>WMO Standards Compliant</span>
          </div>
          <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-white gov-title">
            CENTRAL METEOROLOGICAL DISPATCH & ADVISORY SYSTEM
          </h1>
          <p class="text-xs text-slate-300 mt-0.5">
            Real-time synoptic forecasting, CAP disaster monitoring, and sector-specific operational intelligence
          </p>
        </div>
      </div>

      <!-- Quick Action Reference Strip -->
      <div class="flex flex-wrap items-center gap-2 text-xs">
        <a href="#inquiry-section" class="px-3 py-1.5 bg-govblue-800 hover:bg-govblue-700 text-slate-100 rounded-sm border border-slate-600 font-medium transition flex items-center gap-1.5">
          <span>📝</span> Submit Inquiry
        </a>
        <a href="#disaster-monitor-panel" class="px-3 py-1.5 bg-govblue-800 hover:bg-govblue-700 text-slate-100 rounded-sm border border-slate-600 font-medium transition flex items-center gap-1.5">
          <span>⚠️</span> Disaster Radar
        </a>
        <a href="#regulatory-standards-panel" class="px-3 py-1.5 bg-govblue-800 hover:bg-govblue-700 text-slate-100 rounded-sm border border-slate-600 font-medium transition flex items-center gap-1.5">
          <span>📊</span> WMO Scales
        </a>
        <a href="/health" target="_blank" class="px-2.5 py-1.5 bg-slate-900/80 hover:bg-slate-900 text-emerald-400 rounded-sm border border-emerald-500/30 font-mono text-[11px]">
          /health
        </a>
      </div>
    </div>
  </header>

  <!-- ==================== 3. ACTIVE HAZARD & ADVISORY TICKER ==================== -->
  <div class="bg-amber-50 border-b border-amber-300 text-amber-950 px-4 sm:px-8 py-2 text-xs flex items-center justify-between gap-4">
    <div class="flex items-center gap-3 overflow-hidden">
      <span class="px-2 py-0.5 bg-amber-600 text-white font-bold tracking-wider rounded-none uppercase text-[10px] shrink-0">
        PUBLIC NOTICE
      </span>
      <div id="bulletin-ticker" class="truncate font-medium text-slate-800">
        Syncing live SACHET / NDMA National Common Alerting Protocol (CAP) RSS feeds...
      </div>
    </div>
    <button onclick="loadDisasterAlerts()" class="text-[11px] text-amber-900 font-semibold underline hover:text-amber-700 shrink-0">
      Refresh Feed
    </button>
  </div>

  <!-- ==================== 4. MAIN OPERATIONAL WORKSPACE ==================== -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

    <!-- ==================== LEFT COLUMN: OFFICIAL INQUIRY & DISPATCH (7 COLS) ==================== -->
    <div class="lg:col-span-7 space-y-6">

      <!-- SECTION: INQUIRY SUBMISSION CONSOLE -->
      <div id="inquiry-section" class="bg-white border border-slate-300 shadow-sm">
        <div class="bg-slate-100 px-5 py-3 border-b border-slate-300 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="font-serif font-bold text-slate-800 text-sm tracking-wide">
              SECTION I: OFFICIAL METEOROLOGICAL CONSULTATION TERMINAL
            </span>
          </div>
          <span class="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 border border-slate-300" id="session-id-display">
            SESSION: AUTO-INIT
          </span>
        </div>

        <form id="inquiry-form" class="p-5 space-y-4">
          <!-- Sector / Persona Selection -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              1. Operational Sector Classification
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <label class="cursor-pointer border border-slate-300 p-2.5 bg-slate-50 hover:bg-slate-100 has-[:checked]:bg-govblue-50 has-[:checked]:border-govblue-700 has-[:checked]:text-govblue-900 flex flex-col justify-between">
                <input type="radio" name="sector" value="farmer" class="sr-only" checked onchange="updateSectorPrompt('farmer')">
                <div class="font-bold">🌾 Agriculture</div>
                <div class="text-[10px] text-slate-500 mt-1">Crops, soil moisture, spraying</div>
              </label>

              <label class="cursor-pointer border border-slate-300 p-2.5 bg-slate-50 hover:bg-slate-100 has-[:checked]:bg-govblue-50 has-[:checked]:border-govblue-700 has-[:checked]:text-govblue-900 flex flex-col justify-between">
                <input type="radio" name="sector" value="fisherman" class="sr-only" onchange="updateSectorPrompt('fisherman')">
                <div class="font-bold">⚓ Maritime / Marine</div>
                <div class="text-[10px] text-slate-500 mt-1">Wind gusts, squalls, sea visibility</div>
              </label>

              <label class="cursor-pointer border border-slate-300 p-2.5 bg-slate-50 hover:bg-slate-100 has-[:checked]:bg-govblue-50 has-[:checked]:border-govblue-700 has-[:checked]:text-govblue-900 flex flex-col justify-between">
                <input type="radio" name="sector" value="athlete" class="sr-only" onchange="updateSectorPrompt('athlete')">
                <div class="font-bold">🏃 Athletics & Outdoor</div>
                <div class="text-[10px] text-slate-500 mt-1">Heat stress, UV index, rain risks</div>
              </label>

              <label class="cursor-pointer border border-slate-300 p-2.5 bg-slate-50 hover:bg-slate-100 has-[:checked]:bg-govblue-50 has-[:checked]:border-govblue-700 has-[:checked]:text-govblue-900 flex flex-col justify-between">
                <input type="radio" name="sector" value="general" class="sr-only" onchange="updateSectorPrompt('general')">
                <div class="font-bold">👤 General Public</div>
                <div class="text-[10px] text-slate-500 mt-1">Daily forecast & civil advisories</div>
              </label>
            </div>
          </div>

          <!-- Location Target Input -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="sm:col-span-2">
              <label for="location-input" class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                2. Target Station / City / District Name
              </label>
              <input
                id="location-input"
                type="text"
                value="Bangalore"
                placeholder="e.g. Bangalore, New Delhi, Coimbatore, Mumbai, Shimla"
                class="w-full bg-white border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-govblue-700 focus:border-govblue-700"
                required
              />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Preset Districts
              </label>
              <select onchange="applyPresetCity(this.value)" class="w-full bg-slate-50 border border-slate-300 px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-govblue-700">
                <option value="">-- Choose Preset --</option>
                <option value="Bangalore">Bangalore (Karnataka)</option>
                <option value="Coimbatore">Coimbatore (Tamil Nadu)</option>
                <option value="Mumbai">Mumbai (Maharashtra)</option>
                <option value="New Delhi">New Delhi (NCR)</option>
                <option value="Kolkata">Kolkata (West Bengal)</option>
                <option value="Chennai">Chennai (Tamil Nadu)</option>
                <option value="Guwahati">Guwahati (Assam)</option>
                <option value="Toronto">Toronto (Canada)</option>
                <option value="London">London (UK)</option>
              </select>
            </div>
          </div>

          <!-- Specific Inquiry Prompt -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <label for="prompt-input" class="text-xs font-bold uppercase tracking-wider text-slate-700">
                3. Operational Weather Question & Activity Details
              </label>
              <span class="text-[11px] text-slate-500">Official meteorological query submission</span>
            </div>
            <textarea
              id="prompt-input"
              rows="3"
              class="w-full bg-white border border-slate-300 p-3 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-govblue-700 focus:border-govblue-700"
              placeholder="Detail your operational activity, planned timing, and specific safety concerns..."
              required
            >I am planning an outdoor farming and irrigation schedule today in Bangalore. Will rain, soil temperature, and UV index permit crop spraying?</textarea>
          </div>

          <!-- Quick Templates Bar -->
          <div class="flex flex-wrap items-center gap-1.5 text-xs pt-1 border-t border-slate-200">
            <span class="text-slate-500 font-semibold text-[11px] uppercase mr-1">Standard Templates:</span>
            <button type="button" onclick="setQuery('I am a farmer growing crops in Coimbatore. What is the precipitation forecast and soil temperature for the next 24 hours?')" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-[11px]">
              🌾 Farmer Soil & Rain
            </button>
            <button type="button" onclick="setQuery('I am a coastal fisherman operating off Mumbai. Check wind speed at 10m/80m and squall warnings at sea.')" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-[11px]">
              ⚓ Marine Squalls & Wind
            </button>
            <button type="button" onclick="setQuery('Can our team conduct an outdoor football match in Bangalore today? Verify heat index, precipitation, and UV hazards.')" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-[11px]">
              ⚽ Outdoor Sports & UV
            </button>
            <button type="button" onclick="setQuery('Check if there are any active severe disaster alerts, flash floods, or lightning warnings near Bangalore (12.97, 77.59).')" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-[11px]">
              ⚠️ SACHET CAP Check
            </button>
          </div>

          <!-- Submission Button -->
          <div class="pt-2 flex items-center justify-between">
            <div class="text-[11px] text-slate-500 flex items-center gap-1.5">
              <span>🔒 Query logged to Cloud Firestore</span>
              <span>•</span>
              <span>Agent: Gemini 2.5 Flash</span>
            </div>
            <button
              id="submit-inquiry-btn"
              type="submit"
              class="bg-govblue-900 hover:bg-govblue-800 text-white font-medium text-xs uppercase tracking-wider px-6 py-2.5 border border-govblue-950 transition flex items-center gap-2 disabled:opacity-50"
            >
              <span id="btn-icon">⚡</span>
              <span id="btn-text">TRANSMIT INQUIRY TO CENTRAL ENGINE</span>
            </button>
          </div>
        </form>
      </div>

      <!-- SECTION: OFFICIAL ADVISORY BULLETIN DISPATCH (RESPONSE) -->
      <div class="bg-white border border-slate-300 shadow-sm">
        <div class="bg-slate-100 px-5 py-3 border-b border-slate-300 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="font-serif font-bold text-slate-800 text-sm tracking-wide">
              SECTION II: OFFICIAL METEOROLOGICAL DISPATCH RECORD
            </span>
          </div>
          <div class="flex items-center gap-2 text-xs">
            <button onclick="printDispatch()" class="text-slate-600 hover:text-slate-900 px-2 py-0.5 border border-slate-300 bg-white text-[11px]">
              🖨️ Print Dispatch
            </button>
            <button onclick="clearDispatch()" class="text-slate-600 hover:text-slate-900 px-2 py-0.5 border border-slate-300 bg-white text-[11px]">
              Reset View
            </button>
          </div>
        </div>

        <div id="dispatch-container" class="p-6">
          <!-- Dispatch Header Block -->
          <div class="border border-slate-300 p-4 bg-slate-50/50 mb-5">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-300 pb-2 mb-3 gap-2">
              <div>
                <span class="text-[10px] uppercase font-bold tracking-wider text-slate-500">Official Bulletin Identifier</span>
                <div class="font-mono text-xs font-bold text-govblue-900" id="dispatch-ref">DISPATCH-WMO-READY</div>
              </div>
              <div class="text-left sm:text-right">
                <span class="text-[10px] uppercase font-bold tracking-wider text-slate-500">Issuance Chronometer</span>
                <div class="font-mono text-xs text-slate-700" id="dispatch-time">Awaiting transmission</div>
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span class="text-slate-500 block text-[10px] uppercase font-bold">Target Zone</span>
                <span id="dispatch-zone" class="font-semibold text-slate-900">National Synoptic Grid</span>
              </div>
              <div>
                <span class="text-slate-500 block text-[10px] uppercase font-bold">Inquiry Mode</span>
                <span id="dispatch-mode" class="font-semibold text-slate-900">General Public</span>
              </div>
              <div>
                <span class="text-slate-500 block text-[10px] uppercase font-bold">Data Feed Sync</span>
                <span class="font-semibold text-emerald-700">Open-Meteo & SACHET</span>
              </div>
              <div>
                <span class="text-slate-500 block text-[10px] uppercase font-bold">Audit Status</span>
                <span class="font-semibold text-slate-900">Verified & Stored</span>
              </div>
            </div>
          </div>

          <!-- Loading Indicator -->
          <div id="dispatch-loading" class="hidden py-10 text-center space-y-3">
            <div class="inline-block w-8 h-8 border-4 border-govblue-900 border-t-transparent rounded-full animate-spin"></div>
            <div class="text-sm font-semibold text-govblue-900">
              Querying Geolocation Coordinates & Synoptic Weather API...
            </div>
            <p class="text-xs text-slate-500 max-w-md mx-auto">
              Synthesizing 14-day numerical predictions, CAP disaster bulletins, and WMO threshold matrix through Gemini 2.5 Flash agent.
            </p>
          </div>

          <!-- Dispatch Content Body -->
          <div id="dispatch-body" class="space-y-4">
            <div class="prose max-w-none text-slate-800 text-[14px] leading-relaxed whitespace-pre-wrap font-sans" id="dispatch-text">
Hello. The Central Meteorological Dispatch & Advisory Terminal is ready.

Please submit an inquiry above specifying your location and operational sector (Agriculture, Maritime, Athletics, or Public Safety). The engine will automatically:
1. Resolve synoptic grid coordinates via official geocoders.
2. Query 14-day atmospheric parameters (temperature, precipitation, wind, soil temperature, UV index).
3. Cross-reference SACHET / NDMA Common Alerting Protocol emergency bulletins.
4. Formulate authoritative recommendations compliant with WMO and NDMA standards.
            </div>
          </div>

          <!-- Advisory Disclaimer Box -->
          <div class="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
            <span class="text-amber-600 font-bold shrink-0">⚠️</span>
            <span>
              <strong>Statutory Advisory Notice:</strong> Advisory forecasts synthesized by this portal are for operational guidance. During severe weather, cyclonic storms, or sudden flood events, always follow mandatory evacuations and directives issued by local civil defense and disaster management commissioners.
            </span>
          </div>
        </div>
      </div>

    </div>

    <!-- ==================== RIGHT COLUMN: DIRECT SENSORS & REGULATORY (5 COLS) ==================== -->
    <div class="lg:col-span-5 space-y-6">

      <!-- PANEL A: LIVE DISASTER ALERTS (SACHET / NDMA) -->
      <div id="disaster-monitor-panel" class="bg-white border border-slate-300 shadow-sm">
        <div class="bg-slate-100 px-4 py-2.5 border-b border-slate-300 flex items-center justify-between">
          <span class="font-serif font-bold text-slate-800 text-xs tracking-wide flex items-center gap-1.5">
            <span class="text-red-600">🚨</span> SACHET / NDMA DISASTER RADAR
          </span>
          <span id="disaster-badge" class="text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-700">
            CHECKING...
          </span>
        </div>

        <div class="p-4 space-y-3">
          <div class="flex items-center gap-2 text-xs">
            <input
              id="disaster-lat"
              type="text"
              value="12.9716"
              placeholder="Lat"
              class="w-20 bg-slate-50 border border-slate-300 px-2 py-1 text-xs font-mono"
            />
            <input
              id="disaster-lon"
              type="text"
              value="77.5946"
              placeholder="Lon"
              class="w-20 bg-slate-50 border border-slate-300 px-2 py-1 text-xs font-mono"
            />
            <select id="disaster-radius" class="flex-1 bg-slate-50 border border-slate-300 px-2 py-1 text-xs">
              <option value="25">Radius: 25 km</option>
              <option value="50" selected>Radius: 50 km</option>
              <option value="100">Radius: 100 km</option>
              <option value="200">Radius: 200 km</option>
            </select>
            <button onclick="loadDisasterAlerts()" class="bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1 text-xs font-medium">
              Scan
            </button>
          </div>

          <!-- Alert Items Display -->
          <div id="disaster-alerts-list" class="max-h-56 overflow-y-auto space-y-2 text-xs pr-1">
            <div class="p-3 bg-slate-50 border border-slate-200 text-slate-600 text-center">
              Scanning active bulletins from National Disaster Management Authority...
            </div>
          </div>
        </div>
      </div>

      <!-- PANEL B: DIRECT SYNOPTIC STATION TELEMETRY -->
      <div class="bg-white border border-slate-300 shadow-sm">
        <div class="bg-slate-100 px-4 py-2.5 border-b border-slate-300 flex items-center justify-between">
          <span class="font-serif font-bold text-slate-800 text-xs tracking-wide flex items-center gap-1.5">
            <span class="text-blue-600">📡</span> SYNOPTIC WEATHER STATION INSPECTOR
          </span>
          <span class="text-[10px] font-mono text-slate-500">14-DAY FORECAST</span>
        </div>

        <div class="p-4 space-y-3">
          <div class="flex gap-2">
            <input
              id="station-city"
              type="text"
              value="Bangalore"
              placeholder="City name..."
              class="flex-1 bg-slate-50 border border-slate-300 px-3 py-1.5 text-xs"
            />
            <button onclick="inspectStation()" class="bg-govblue-900 hover:bg-govblue-800 text-white px-3 py-1.5 text-xs font-medium uppercase">
              Inspect Station
            </button>
          </div>

          <!-- Telemetry Table -->
          <div id="telemetry-box" class="border border-slate-300 bg-slate-50/50 p-3 text-xs">
            <div class="text-slate-600 text-center py-4">
              Click <strong>Inspect Station</strong> to query direct numerical weather prediction matrices.
            </div>
          </div>
        </div>
      </div>

      <!-- PANEL C: REGULATORY METEOROLOGICAL SCALES (WMO & WHO) -->
      <div id="regulatory-standards-panel" class="bg-white border border-slate-300 shadow-sm">
        <div class="bg-slate-100 px-4 py-2.5 border-b border-slate-300 flex items-center justify-between">
          <span class="font-serif font-bold text-slate-800 text-xs tracking-wide flex items-center gap-1.5">
            <span class="text-amber-700">📘</span> WMO REGULATORY SCALES & STANDARDS
          </span>
          <span class="text-[10px] text-slate-500 font-mono">STANDARDS 2026</span>
        </div>

        <div class="p-4 space-y-3">
          <!-- Scale Selector Tabs -->
          <div class="flex border-b border-slate-300 text-xs">
            <button id="tab-btn-uv" onclick="switchScaleTab('uv')" class="px-3 py-1.5 font-bold border-b-2 border-govblue-900 text-govblue-900">
              UV Radiation Index
            </button>
            <button id="tab-btn-rain" onclick="switchScaleTab('rain')" class="px-3 py-1.5 text-slate-600 hover:text-slate-900">
              Precipitation Range
            </button>
            <button id="tab-btn-wmo" onclick="switchScaleTab('wmo')" class="px-3 py-1.5 text-slate-600 hover:text-slate-900">
              WMO Codes
            </button>
          </div>

          <!-- Content: UV Scale -->
          <div id="scale-content-uv" class="space-y-2 text-xs">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse table-bordered text-[11px]">
                <thead class="bg-slate-100 text-slate-700">
                  <tr>
                    <th class="p-1.5">Index</th>
                    <th class="p-1.5">Level</th>
                    <th class="p-1.5">Standard Public Risk Assessment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td class="p-1.5 font-bold text-emerald-700">0 - 2</td><td class="p-1.5">Low</td><td class="p-1.5">Minimal danger; safe for normal activities</td></tr>
                  <tr><td class="p-1.5 font-bold text-amber-600">3 - 5</td><td class="p-1.5">Moderate</td><td class="p-1.5">Take precautions: cover up, wear hat & sunglasses</td></tr>
                  <tr><td class="p-1.5 font-bold text-orange-600">6 - 7</td><td class="p-1.5">High</td><td class="p-1.5">High risk of harm: seek shade during midday hours</td></tr>
                  <tr><td class="p-1.5 font-bold text-red-600">8 - 10</td><td class="p-1.5">Very High</td><td class="p-1.5">Very high risk: extra protection needed, minimize exposure</td></tr>
                  <tr><td class="p-1.5 font-bold text-purple-700">11+</td><td class="p-1.5">Extreme</td><td class="p-1.5">Extreme risk: take all precautions, unprotected skin burns in minutes</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Content: Precipitation Range -->
          <div id="scale-content-rain" class="hidden space-y-2 text-xs">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse table-bordered text-[11px]">
                <thead class="bg-slate-100 text-slate-700">
                  <tr>
                    <th class="p-1.5">Intensity</th>
                    <th class="p-1.5">mm/hr</th>
                    <th class="p-1.5">Meteorological Impact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td class="p-1.5 font-semibold">Dry</td><td class="p-1.5">0.0</td><td class="p-1.5">No measurable precipitation</td></tr>
                  <tr><td class="p-1.5 font-semibold">Trace / Very Light</td><td class="p-1.5">0.01 - 0.25</td><td class="p-1.5">Barely measurable droplets; no puddling</td></tr>
                  <tr><td class="p-1.5 font-semibold">Light Rain</td><td class="p-1.5">0.25 - 2.5</td><td class="p-1.5">Slow puddle formation, slight runoff</td></tr>
                  <tr><td class="p-1.5 font-semibold">Moderate Rain</td><td class="p-1.5">2.5 - 7.6</td><td class="p-1.5">Continuous steady rain; umbrellas required</td></tr>
                  <tr><td class="p-1.5 font-semibold text-red-700">Heavy Rain</td><td class="p-1.5">7.6 - 50.0</td><td class="p-1.5">Downpour; rapid accumulation, reduced road visibility</td></tr>
                  <tr><td class="p-1.5 font-semibold text-purple-800">Torrential / Violent</td><td class="p-1.5">50.0 - 100+</td><td class="p-1.5">Severe convective storm; flash flood alert</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Content: WMO Code Reference -->
          <div id="scale-content-wmo" class="hidden space-y-2 text-xs">
            <div class="overflow-x-auto max-h-48 overflow-y-auto">
              <table class="w-full text-left border-collapse table-bordered text-[11px]">
                <thead class="bg-slate-100 text-slate-700 sticky top-0">
                  <tr>
                    <th class="p-1.5 w-16">Code</th>
                    <th class="p-1.5">Synoptic Condition</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                  <tr><td class="p-1.5 font-mono">00 - 03</td><td class="p-1.5">Clear sky or clouds generally dissolving/developing</td></tr>
                  <tr><td class="p-1.5 font-mono">05</td><td class="p-1.5">Haze / Atmospheric suspension</td></tr>
                  <tr><td class="p-1.5 font-mono">10</td><td class="p-1.5">Mist (visibility > 1km)</td></tr>
                  <tr><td class="p-1.5 font-mono">45</td><td class="p-1.5">Fog or ice fog (visibility < 1km)</td></tr>
                  <tr><td class="p-1.5 font-mono">51 - 55</td><td class="p-1.5">Drizzle (Light, Moderate, Dense)</td></tr>
                  <tr><td class="p-1.5 font-mono">61 - 65</td><td class="p-1.5">Rain (Slight, Moderate, Heavy)</td></tr>
                  <tr><td class="p-1.5 font-mono">71 - 75</td><td class="p-1.5">Snowfall (Slight, Moderate, Heavy)</td></tr>
                  <tr><td class="p-1.5 font-mono">80 - 82</td><td class="p-1.5">Rain Showers (Slight, Moderate, Violent)</td></tr>
                  <tr><td class="p-1.5 font-mono">95 - 96</td><td class="p-1.5">Thunderstorm (With or without hail)</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>

  <!-- ==================== 5. OFFICIAL GOVERNMENT FOOTER ==================== -->
  <footer class="bg-slate-900 text-slate-400 border-t-2 border-slate-700 mt-12 text-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="space-y-2 md:col-span-2">
        <div class="flex items-center gap-2 text-white font-bold text-sm gov-title">
          <span>🏛️</span> NATIONAL METEOROLOGICAL DISPATCH & ADVISORY SYSTEM
        </div>
        <p class="text-[12px] text-slate-400 leading-relaxed max-w-xl">
          An official public web intelligence service bridging numerical weather prediction grids, real-time Common Alerting Protocol (CAP) emergency feeds from NDMA/SACHET, and Google Gemini agentic reasoning.
        </p>
        <div class="pt-2 text-[11px] text-slate-500">
          Database Instance: <code class="text-slate-300">ai-studio-weathergptbacken-674b65b4-0c39-4e80-895d-17e956cebfb3</code>
        </div>
      </div>

      <div class="space-y-2">
        <div class="text-white font-semibold text-xs tracking-wider uppercase">Data Authorities & Sources</div>
        <ul class="space-y-1 text-[12px] text-slate-400">
          <li>• Open-Meteo Synoptic Numerical Models</li>
          <li>• NDMA SACHET National CAP Feed</li>
          <li>• World Meteorological Organization (WMO)</li>
          <li>• Google Cloud Firestore Persistence</li>
        </ul>
      </div>

      <div class="space-y-2">
        <div class="text-white font-semibold text-xs tracking-wider uppercase">Compliance & Protocol</div>
        <ul class="space-y-1 text-[12px] text-slate-400">
          <li>• CAP v1.2 (Common Alerting Protocol)</li>
          <li>• WMO Resolution 40 Standards</li>
          <li>• ISO 27001 Cloud Security Standards</li>
          <li>• Public Access Advisory Guidelines</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-slate-800 bg-slate-950 px-4 sm:px-8 py-3 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
      <div>
        Official Meteorological Gateway • All rights reserved • Government of India & International Meteorology Consortium
      </div>
      <div class="flex items-center gap-4">
        <span>Security Level: Public</span>
        <span>Build: Production Release</span>
      </div>
    </div>
  </footer>

  <!-- ==================== FRONTEND INTERACTION SCRIPT ==================== -->
  <script>
    // 1. Session initialization
    const sessionRandomId = Math.random().toString(36).substring(2, 9);
    const conversationId = "SESSION-" + sessionRandomId.toUpperCase();
    document.getElementById("session-id-display").textContent = "SESSION: " + conversationId;

    // 2. Synchronized Live Chronometers (UTC and Local)
    function updateClocks() {
      const now = new Date();
      document.getElementById("utc-clock").textContent = "UTC: " + now.toUTCString().slice(17, 25);
      document.getElementById("local-clock").textContent = "LOCAL: " + now.toLocaleTimeString();
    }
    setInterval(updateClocks, 1000);
    updateClocks();

    // 3. Accessibility Font Resizer
    let currentFontSizeStep = 0;
    function changeFontSize(step) {
      if (step === 0) currentFontSizeStep = 0;
      else currentFontSizeStep = Math.max(-1, Math.min(2, currentFontSizeStep + step));
      const sizes = ['14px', '15px', '16.5px', '18px'];
      document.body.style.fontSize = sizes[currentFontSizeStep + 1];
    }

    // 4. Sector & Query Presets
    function updateSectorPrompt(sector) {
      const loc = document.getElementById("location-input").value.trim() || "the area";
      const promptEl = document.getElementById("prompt-input");
      if (sector === "farmer") {
        promptEl.value = "I am an agricultural operator in " + loc + ". Provide an official advisory regarding rainfall accumulation, soil temperature (0cm & 6cm), and whether irrigation or pesticide spraying should proceed today.";
      } else if (sector === "fisherman") {
        promptEl.value = "I am a marine fisheries operator departing from " + loc + ". Provide coastal wind speeds at 10m & 80m, marine squall risks, barometric trends, and sea visibility clearance.";
      } else if (sector === "athlete") {
        promptEl.value = "We are organizing an outdoor sports and training session in " + loc + ". Advise on apparent temperature, UV index protection level, precipitation onset probability, and heat exhaustion safety.";
      } else {
        promptEl.value = "Provide an official general public weather briefing for " + loc + ", including temperatures, precipitation risks, cloud cover, and active safety advisories.";
      }
    }

    function applyPresetCity(city) {
      if (!city) return;
      document.getElementById("location-input").value = city;
      document.getElementById("station-city").value = city;
      // Also update coordinates if known for disaster radar
      const coords = {
        "Bangalore": { lat: "12.9716", lon: "77.5946" },
        "Coimbatore": { lat: "11.0168", lon: "76.9558" },
        "Mumbai": { lat: "19.0760", lon: "72.8777" },
        "New Delhi": { lat: "28.6139", lon: "77.2090" },
        "Kolkata": { lat: "22.5726", lon: "88.3639" },
        "Chennai": { lat: "13.0827", lon: "80.2707" },
        "Guwahati": { lat: "26.1445", lon: "91.7362" },
        "Toronto": { lat: "43.6532", lon: "-79.3832" },
        "London": { lat: "51.5074", lon: "-0.1278" }
      };
      if (coords[city]) {
        document.getElementById("disaster-lat").value = coords[city].lat;
        document.getElementById("disaster-lon").value = coords[city].lon;
      }
      const selectedSector = document.querySelector('input[name="sector"]:checked')?.value || 'farmer';
      updateSectorPrompt(selectedSector);
    }

    function setQuery(text) {
      document.getElementById("prompt-input").value = text;
      // Detect city in text if present
      if (text.includes("Coimbatore")) document.getElementById("location-input").value = "Coimbatore";
      else if (text.includes("Mumbai")) document.getElementById("location-input").value = "Mumbai";
      else if (text.includes("Bangalore")) document.getElementById("location-input").value = "Bangalore";
    }

    // 5. Submit Official Inquiry Form
    document.getElementById("inquiry-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const city = document.getElementById("location-input").value.trim();
      const prompt = document.getElementById("prompt-input").value.trim();
      const sector = document.querySelector('input[name="sector"]:checked')?.value || 'general';

      if (!prompt) return;

      const submitBtn = document.getElementById("submit-inquiry-btn");
      const btnIcon = document.getElementById("btn-icon");
      const btnText = document.getElementById("btn-text");
      const loading = document.getElementById("dispatch-loading");
      const dispatchText = document.getElementById("dispatch-text");
      const dispatchZone = document.getElementById("dispatch-zone");
      const dispatchMode = document.getElementById("dispatch-mode");
      const dispatchRef = document.getElementById("dispatch-ref");
      const dispatchTime = document.getElementById("dispatch-time");

      // UI state
      submitBtn.disabled = true;
      btnIcon.textContent = "⏳";
      btnText.textContent = "TRANSMITTING & SYNTHESIZING...";
      loading.classList.remove("hidden");
      dispatchText.classList.add("opacity-30");

      const now = new Date();
      dispatchTime.textContent = now.toISOString().replace("T", " ").slice(0, 19) + " UTC";
      dispatchZone.textContent = city || "Target Coordinates";
      dispatchMode.textContent = sector.toUpperCase() + " SECTOR";
      dispatchRef.textContent = "MET-" + Math.floor(100000 + Math.random() * 900000);

      try {
        const payload = {
          conversation_id: conversationId,
          message: prompt + " (Location Target: " + city + ", Sector: " + sector + ")",
          user_id: "user_" + sessionRandomId
        };

        const res = await fetch("/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          throw new Error("HTTP error " + res.status + " from advisory engine.");
        }

        const data = await res.json();
        const reply = data.reply || data.error || "No advisory details returned.";

        dispatchText.textContent = reply;
        dispatchText.classList.remove("opacity-30");
      } catch (err) {
        dispatchText.textContent = "⚠️ ERROR IN METEOROLOGICAL ENGINE DISPATCH:\\n" + err.message + "\\n\\nPlease verify internet connectivity or retry transmission.";
        dispatchText.classList.remove("opacity-30");
      } finally {
        loading.classList.add("hidden");
        submitBtn.disabled = false;
        btnIcon.textContent = "⚡";
        btnText.textContent = "TRANSMIT INQUIRY TO CENTRAL ENGINE";
      }
    });

    // 6. Direct Disaster Alert Scanner (SACHET / NDMA)
    async function loadDisasterAlerts() {
      const lat = document.getElementById("disaster-lat").value.trim() || "12.9716";
      const lon = document.getElementById("disaster-lon").value.trim() || "77.5946";
      const rad = document.getElementById("disaster-radius").value || "50";
      const listEl = document.getElementById("disaster-alerts-list");
      const badgeEl = document.getElementById("disaster-badge");
      const tickerEl = document.getElementById("bulletin-ticker");

      badgeEl.textContent = "SCANNING...";
      badgeEl.className = "text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800";

      try {
        const res = await fetch("/api/tools/disaster?latitude=" + lat + "&longitude=" + lon + "&radius=" + rad);
        const data = await res.json();

        if (data.status === "success" && data.alerts && data.alerts.length > 0) {
          badgeEl.textContent = data.count + " ACTIVE ALERTS";
          badgeEl.className = "text-[10px] font-bold px-2 py-0.5 bg-red-600 text-white animate-pulse";

          // Update Ticker
          tickerEl.innerHTML = "<span class='text-red-700 font-bold'>⚠️ ACTIVE HAZARDS (" + data.count + "):</span> " +
            data.alerts.map(a => a.title + " (" + a.severity + ")").join(" • ");

          // Render List
          listEl.innerHTML = data.alerts.map(a => {
            let sevClass = "bg-amber-100 text-amber-900 border-amber-300";
            if (a.severity === "Extreme" || a.severity === "Severe") {
              sevClass = "bg-red-100 text-red-900 border-red-300";
            }
            return \`
              <div class="border \${sevClass} p-2.5 rounded-none bg-white">
                <div class="flex items-center justify-between gap-2 mb-1">
                  <span class="font-bold text-xs text-slate-900">\${a.title}</span>
                  <span class="px-1.5 py-0.5 text-[10px] font-bold uppercase \${sevClass}">\${a.severity}</span>
                </div>
                <p class="text-[11px] text-slate-700 leading-snug line-clamp-2">\${a.description}</p>
                <div class="text-[10px] text-slate-400 mt-1 flex justify-between">
                  <span>Source: \${a.source}</span>
                  <span>ID: \${a.id.substring(0, 8)}...</span>
                </div>
              </div>
            \`;
          }).join("");
        } else {
          badgeEl.textContent = "0 ADVISORIES";
          badgeEl.className = "text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800";
          tickerEl.textContent = "NATIONAL SYNOPTIC RADAR: No severe disaster bulletins recorded within " + rad + " km of coordinates (" + lat + ", " + lon + "). Standard atmospheric monitoring active.";
          listEl.innerHTML = \`
            <div class="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-center">
              <div class="font-bold">✓ Clear Weather Conditions</div>
              <div class="text-[11px] mt-0.5">No active NDMA/SACHET severe disaster bulletins recorded for radius \${rad} km.</div>
            </div>
          \`;
        }
      } catch (err) {
        badgeEl.textContent = "FEED OFFLINE";
        badgeEl.className = "text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-700";
        listEl.innerHTML = \`
          <div class="p-2.5 bg-slate-100 border border-slate-300 text-slate-600 text-center">
            Unable to connect to SACHET feed at this time.
          </div>
        \`;
      }
    }

    // 7. Direct Synoptic Weather Station Inspector
    async function inspectStation() {
      const city = document.getElementById("station-city").value.trim() || "Bangalore";
      const box = document.getElementById("telemetry-box");

      box.innerHTML = \`
        <div class="text-center py-3 text-slate-600">
          <div class="inline-block w-5 h-5 border-2 border-govblue-900 border-t-transparent rounded-full animate-spin mb-1"></div>
          <div>Resolving grid sensors for \${city}...</div>
        </div>
      \`;

      try {
        // First get Geolocation
        const geoRes = await fetch("/api/tools/geolocation?city=" + encodeURIComponent(city));
        const geoData = await geoRes.json();

        if (!geoData.result || typeof geoData.result === "string" || !geoData.result.latitude) {
          box.innerHTML = \`<div class="text-red-700 text-center p-2">Could not locate coordinates for \${city}.</div>\`;
          return;
        }

        const { latitude, longitude } = geoData.result;

        // Next fetch Weather
        const wRes = await fetch("/api/tools/weather?latitude=" + latitude + "&longitude=" + longitude);
        const wData = await wRes.json();
        const weather = wData.result || {};
        const hourly = weather.hourly || {};
        const daily = weather.daily || {};

        // Latest hourly readings
        const curTemp = hourly.temperature_2m ? hourly.temperature_2m[0] : "N/A";
        const curAppTemp = hourly.apparent_temperature ? hourly.apparent_temperature[0] : "N/A";
        const curHumidity = hourly.relative_humidity_2m ? hourly.relative_humidity_2m[0] : "N/A";
        const curWind = hourly.wind_speed_10m ? hourly.wind_speed_10m[0] : "N/A";
        const curWind80 = hourly.wind_speed_80m ? hourly.wind_speed_80m[0] : "N/A";
        const curPress = hourly.pressure_msl ? hourly.pressure_msl[0] : "N/A";
        const curPrecip = hourly.precipitation ? hourly.precipitation[0] : "0.0";
        const curSoil0 = hourly.soil_temperature_0cm ? hourly.soil_temperature_0cm[0] : "N/A";
        const curSoil6 = hourly.soil_temperature_6cm ? hourly.soil_temperature_6cm[0] : "N/A";
        const maxUV = daily.uv_index_max ? daily.uv_index_max[0] : "N/A";

        box.innerHTML = \`
          <div class="space-y-3">
            <div class="flex items-center justify-between border-b border-slate-300 pb-1.5 font-mono text-[11px]">
              <span class="font-bold text-govblue-900">\${city.toUpperCase()} (\${latitude.toFixed(2)}°, \${longitude.toFixed(2)}°)</span>
              <span class="text-slate-500">Elevation: \${weather.elevation || 0}m</span>
            </div>

            <div class="grid grid-cols-2 gap-2 text-[11px]">
              <div class="p-1.5 bg-white border border-slate-200">
                <span class="text-slate-500 block text-[10px] uppercase">Temperature</span>
                <span class="font-bold text-slate-900 text-sm">\${curTemp}°C</span>
                <span class="text-slate-500 text-[10px]"> (Feels \${curAppTemp}°C)</span>
              </div>

              <div class="p-1.5 bg-white border border-slate-200">
                <span class="text-slate-500 block text-[10px] uppercase">Precipitation Rate</span>
                <span class="font-bold text-slate-900 text-sm">\${curPrecip} mm/hr</span>
                <span class="text-slate-500 text-[10px] block">Relative Hum: \${curHumidity}%</span>
              </div>

              <div class="p-1.5 bg-white border border-slate-200">
                <span class="text-slate-500 block text-[10px] uppercase">Wind Velocity</span>
                <span class="font-bold text-slate-900">\${curWind} km/h (10m)</span>
                <span class="text-slate-500 text-[10px] block">\${curWind80} km/h (80m)</span>
              </div>

              <div class="p-1.5 bg-white border border-slate-200">
                <span class="text-slate-500 block text-[10px] uppercase">Max UV & Pressure</span>
                <span class="font-bold text-slate-900">UV Index: \${maxUV}</span>
                <span class="text-slate-500 text-[10px] block">\${curPress} hPa MSL</span>
              </div>
            </div>

            <div class="p-2 bg-white border border-slate-200 text-[11px]">
              <div class="text-slate-500 uppercase text-[10px] font-bold mb-1">Agricultural Soil Temperature Profile:</div>
              <div class="grid grid-cols-2 gap-2 font-mono">
                <div>Surface (0 cm): <strong>\${curSoil0}°C</strong></div>
                <div>Root Zone (6 cm): <strong>\${curSoil6}°C</strong></div>
              </div>
            </div>
          </div>
        \`;
      } catch (err) {
        box.innerHTML = \`<div class="text-red-700 text-center p-2">Error retrieving telemetry: \${err.message}</div>\`;
      }
    }

    // 8. Regulatory Scales Tab Switcher
    function switchScaleTab(tabName) {
      const tabs = ['uv', 'rain', 'wmo'];
      tabs.forEach(t => {
        const btn = document.getElementById("tab-btn-" + t);
        const content = document.getElementById("scale-content-" + t);
        if (t === tabName) {
          btn.className = "px-3 py-1.5 font-bold border-b-2 border-govblue-900 text-govblue-900";
          content.classList.remove("hidden");
        } else {
          btn.className = "px-3 py-1.5 text-slate-600 hover:text-slate-900";
          content.classList.add("hidden");
        }
      });
    }

    // 9. Utility Print and Reset
    function printDispatch() {
      window.print();
    }

    function clearDispatch() {
      document.getElementById("dispatch-text").textContent = "Dispatch record cleared. Submit a new query above.";
      document.getElementById("dispatch-ref").textContent = "DISPATCH-WMO-READY";
      document.getElementById("dispatch-time").textContent = "Reset";
    }

    // Auto-load initial disaster alerts on start
    loadDisasterAlerts();
  </script>
</body>
</html>`;
}
