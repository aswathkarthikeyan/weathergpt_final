export function getPortalHtml(): string {
  return `<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <title>WeatherGPT • National Meteorological & Disaster Intelligence</title>
  <meta name="description" content="WeatherGPT: Conversational AI meteorological reasoning and early disaster intelligence engine for India, unifying BharatFS, IMD Nowcast, SACHET CAP, and IMD Climate Hazard Atlas.">
  <meta property="og:title" content="WeatherGPT • National Meteorological & Disaster Intelligence">
  <meta property="og:description" content="Conversational AI weather intelligence layer for India. Real-time synoptic forecasts, role-based alert translation, multilingual voice, and rural accessibility.">

  <!-- Typography: Fraunces (Slab Serif for Dispatches) + Noto Sans (Latin, Devanagari, Tamil) for Script Parity -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Sans+Tamil:wght@400;500;600;700&family=Noto+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Noto Sans"', '"Noto Sans Devanagari"', '"Noto Sans Tamil"', 'system-ui', '-apple-system', 'sans-serif'],
            serif: ['"Fraunces"', 'Georgia', 'serif'],
          },
          colors: {
            'sih-bg': '#F5F6F3',
            'sih-surface': '#FFFFFF',
            'sih-ink': '#1B2A44',
            'sih-muted': '#5B6472',
            'sih-accent': '#C97A2B',
            'sih-alert': '#B3261E',
            'sih-caution': '#B8860B',
            'sih-ok': '#3F6B4A',
            'sih-line': '#E1E4DD',
            govblue: {
              50: '#f0f4f9',
              100: '#dce5f1',
              200: '#bdcfe4',
              700: '#1b365d',
              800: '#132845',
              900: '#0b182b',
              950: '#060d17',
            }
          }
        }
      }
    };
  </script>
  <style>
    body {
      font-family: "Noto Sans", "Noto Sans Devanagari", "Noto Sans Tamil", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #FFFFFF;
      color: #1B2A44;
      line-height: 1.55;
    }
    .dispatch-title {
      font-family: "Fraunces", Georgia, serif;
    }
    .ease-dispatch {
      transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    }
    #floating-dots-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    }
    /* Aesthetic semi-transparent glass cards */
    .glass-card {
      background: rgba(255, 255, 255, 0.82) !important;
      backdrop-filter: blur(14px) saturate(180%);
      -webkit-backdrop-filter: blur(14px) saturate(180%);
      border: 1px solid rgba(225, 228, 221, 0.75) !important;
      box-shadow: 0 4px 20px -2px rgba(27, 42, 68, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02) !important;
    }
    .glass-card:hover {
      box-shadow: 0 8px 26px -3px rgba(27, 42, 68, 0.08), 0 3px 8px -1px rgba(0, 0, 0, 0.03) !important;
    }
    .glass-card-subtle {
      background: rgba(255, 255, 255, 0.72) !important;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(225, 228, 221, 0.65) !important;
    }
    .glass-inner-subtle {
      background: rgba(245, 246, 243, 0.65) !important;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border: 1px solid rgba(225, 228, 221, 0.6) !important;
    }
    .glass-chat-thread {
      background: rgba(255, 255, 255, 0.75) !important;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: rgba(225, 228, 221, 0.4);
    }
    ::-webkit-scrollbar-thumb {
      background: #C2C7BD;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #9FA59A;
    }
    @media print {
      header, .no-print, #chat-composer, #api-modal, #rural-modal, #hazard-modal, #floating-dots-canvas {
        display: none !important;
      }
      body, main {
        background: white !important;
        color: black !important;
        padding: 0 !important;
      }
      #chat-thread {
        max-height: none !important;
        overflow: visible !important;
      }
    }
  </style>
</head>
<body class="min-h-full flex flex-col bg-white text-[#1B2A44] antialiased relative">
  <!-- Interactive Floating Atmospheric Dots Background Canvas -->
  <canvas id="floating-dots-canvas"></canvas>

  <!-- ==================== 1. UNIFIED SLEEK AESTHETIC NAVBAR & HEADER ==================== -->
  <header class="sticky top-0 z-40 w-full glass-card border-b border-[#E1E4DD]/80 shadow-xs backdrop-blur-md">
    <!-- Active Sachet Alert Banner Bar -->
    <div id="alert-ticker-strip" class="bg-gradient-to-r from-[#B8860B] via-[#C97A2B] to-[#B8860B] text-white text-[11px] px-4 sm:px-8 py-1.5 flex items-center justify-between gap-3 cursor-pointer transition hover:brightness-105 shadow-2xs" onclick="toggleTickerDetail()">
      <div class="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
        <div class="flex items-center gap-2 overflow-hidden">
          <span class="font-bold tracking-wider uppercase text-[9px] bg-black/25 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse"></span>
            ACTIVE SACHET / CAP BULLETIN
          </span>
          <div id="ticker-text" class="truncate font-medium text-white/95">
            ⚡ Synoptic Alert: Deep depression over West-Central Bay of Bengal. Squally winds 55-65 km/h along coastal corridors. Click to inspect role-based fan-out directives.
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0 text-[10px] font-semibold">
          <span class="underline hidden sm:inline" data-i18n="topBarDirectives">Role Directives</span>
          <span id="ticker-chevron" class="text-xs">▼</span>
        </div>
      </div>
    </div>

    <!-- Collapsible Ticker Details Drawer -->
    <div id="ticker-drawer" class="hidden bg-white/95 border-b border-[#E1E4DD] px-4 sm:px-8 py-3 shadow-md ease-dispatch backdrop-blur-md">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[#1B2A44]">
        <div class="space-y-1">
          <div class="font-bold text-xs text-[#B3261E] flex items-center gap-1.5">
            <span>🚨</span> <span data-i18n="drawerWarning">OASIS CAP v1.2 Warning • Cyclone / Heavy Inundation Vector</span>
          </div>
          <p class="text-[#5B6472] text-[11px] leading-relaxed" data-i18n="drawerDesc">
            IMD Bulletin &amp; SACHET NDMA RSS feed: Active cyclonic track with ±12km ensemble variance. Role-based automated translation available for Agriculture, Maritime Coastal, and Municipal Urban Local Bodies.
          </p>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button onclick="triggerRoleDirectives('cyclone')" class="px-3 py-1.5 bg-[#1B2A44] hover:bg-[#132845] text-white rounded-sm text-xs font-semibold shadow-xs flex items-center gap-1.5">
            <span>⚡</span> <span data-i18n="viewRoleDirectives">View Role Directives</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      <!-- Left: Identity -->
      <div>
        <div class="flex items-center flex-wrap gap-2">
          <span class="text-[11px] uppercase tracking-wider text-slate-700 font-bold" data-i18n="headerKicker">
            WeatherGPT
          </span>
          <span class="text-slate-300 text-[10px]">•</span>
          <span class="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            <span data-i18n="headerLayer">All-India Unified Layer</span>
          </span>
        </div>
        <h1 class="text-sm sm:text-base font-semibold text-[#1B2A44] tracking-tight" data-i18n="headerTitle">
          Meteorological Reasoning Engine
        </h1>
        <p class="text-[10.5px] text-slate-500 hidden sm:block truncate max-w-xl" data-i18n="headerDesc">
          Orchestrating BharatFS synoptic grids, Meghdoot agromet, Damini lightning &amp; NDMA CAP
        </p>
      </div>

      <!-- Right: Subscriptions, Telemetry, Controls -->
      <div class="flex flex-wrap items-center justify-between lg:justify-end gap-2.5 text-xs pt-1 lg:pt-0 border-t lg:border-t-0 border-slate-200/60">
        <!-- Telemetry Clock Pill -->
        <div class="hidden xl:flex items-center gap-2 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md text-[10.5px] font-mono">
          <span id="utc-clock" class="text-slate-500">UTC: --:--:--</span>
          <span class="text-slate-300">|</span>
          <span id="local-clock" class="text-slate-800 font-semibold">IST: --:--:--</span>
        </div>

        <!-- Language Selector -->
        <div class="flex items-center bg-white border border-slate-200 rounded-md p-0.5 shadow-2xs text-[11px]">
          <button onclick="setAppLanguage('en')" id="lang-btn-en" class="px-2 py-0.5 rounded text-white bg-slate-800 font-semibold transition">
            EN
          </button>
          <button onclick="setAppLanguage('hi')" id="lang-btn-hi" class="px-2 py-0.5 rounded text-slate-600 hover:text-slate-900 transition">
            हिन्दी
          </button>
          <button onclick="setAppLanguage('ta')" id="lang-btn-ta" class="px-2 py-0.5 rounded text-slate-600 hover:text-slate-900 transition">
            தமிழ்
          </button>
        </div>

        <!-- Action Nav Buttons -->
        <div class="flex items-center gap-1.5">
          <button onclick="openRoleFanoutModal()" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white rounded-md font-medium text-xs transition flex items-center gap-1 shadow-2xs">
            <span data-i18n="navRoleDirectives">Directives</span>
          </button>
          <button onclick="openRuralModal()" class="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-md font-medium text-xs transition flex items-center gap-1 shadow-2xs">
            <span data-i18n="navRural">Rural Tier</span>
          </button>
          <button onclick="openHazardModal()" class="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-md font-medium text-xs transition flex items-center gap-1 shadow-2xs">
            <span data-i18n="navHazard">Atlas</span>
          </button>
          <button onclick="openApiModal()" title="Configure Backend API Endpoint (Cloudflare / Cloud Run)" class="px-2 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-md font-mono text-[11px] font-medium transition flex items-center gap-1 shadow-2xs">
            <span>API</span>
          </button>
          <a href="/health" target="_blank" class="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-emerald-800 rounded-md border border-slate-200 font-mono text-[10px] font-semibold">
            /health
          </a>
        </div>
      </div>
    </div>
  </header>

  <!-- ==================== 2. MAIN OPERATIONAL WORKSPACE ==================== -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-5 space-y-6">

    <!-- ==================== ROLE-BASED ALERT DIRECTIVES ENGINE (SEAMLESS INTEGRATED BAR) ==================== -->
    <section id="fanout-workbench" class="bg-white rounded-xl p-4 sm:p-5 space-y-4 relative z-10 shadow-xs border border-slate-200/90">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div class="space-y-0.5">
          <h2 class="font-semibold text-sm text-slate-800 tracking-tight" data-i18n="workbenchTitle">
            Role-Based Operational Directives Engine
          </h2>
          <p class="text-[11.5px] text-slate-500" data-i18n="workbenchDesc">
            Single Red/Orange warning automatically fanned out into parallel, domain-calibrated operational directives
          </p>
        </div>

        <!-- Solid Color Active Scenario Selector Pills -->
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider shrink-0" data-i18n="scenarioLabel">Active Scenario:</span>
          <div class="inline-flex rounded-lg p-1 bg-slate-100 border border-slate-200 gap-1 shadow-2xs">
            <button id="scenario-btn-cyclone" onclick="triggerRoleDirectives('cyclone')" class="px-3 py-1.5 text-xs font-semibold rounded-md transition flex items-center gap-1.5 bg-red-600 text-white shadow-xs" data-i18n="scenarioCyclone">
              <span>🔴</span> Cyclone Red Alert (Coast)
            </button>
            <button id="scenario-btn-flood" onclick="triggerRoleDirectives('flood')" class="px-3 py-1.5 text-xs font-medium rounded-md transition flex items-center gap-1.5 text-slate-600 hover:text-slate-900 hover:bg-white" data-i18n="scenarioFlood">
              <span>🌧️</span> Urban Cloudburst (Bengaluru)
            </button>
            <button id="scenario-btn-heatwave" onclick="triggerRoleDirectives('heatwave')" class="px-3 py-1.5 text-xs font-medium rounded-md transition flex items-center gap-1.5 text-slate-600 hover:text-slate-900 hover:bg-white" data-i18n="scenarioHeatwave">
              <span>☀️</span> Severe Heatwave &amp; Evaporation (Delhi)
            </button>
          </div>
        </div>
      </div>

      <!-- The 3 Side-By-Side Parallel Role Cards -->
      <div id="fanout-cards-grid" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- 1. Farmer Card -->
        <div class="glass-card-subtle border-l-4 border-l-[#3F6B4A] border-t border-r border-b border-[#E1E4DD]/70 rounded-lg p-3.5 flex flex-col justify-between space-y-2.5 shadow-2xs hover:shadow-xs transition">
          <div>
            <div class="flex items-center justify-between pb-1.5 border-b border-emerald-200/50">
              <span class="font-bold text-xs text-[#3F6B4A] flex items-center gap-1.5">
                <span>🌾</span> <span data-i18n="cardFarmerTitle">AGRICULTURE &amp; AGROMET</span>
              </span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#3F6B4A]" data-i18n="cardFarmerBadge">
                FARMER ROLE
              </span>
            </div>
            <div class="mt-2 text-xs font-bold text-slate-900 leading-snug" id="fanout-farmer-directive">
              Harvest mature paddy immediately; pause all chemical spraying and clear peripheral trenches.
            </div>
            <ul class="mt-2 space-y-1 text-[11px] text-[#5B6472]" id="fanout-farmer-checklist">
              <li class="flex items-start gap-1.5"><span>•</span><span>30cm drainage trenches along bunds to stop root rot</span></li>
              <li class="flex items-start gap-1.5"><span>•</span><span>Zero pesticide spraying for 48h (drift &amp; wash-off hazard)</span></li>
              <li class="flex items-start gap-1.5"><span>•</span><span>Shift cattle &amp; poultry to elevated pucca shelters</span></li>
            </ul>
          </div>
          <div class="pt-2 border-t border-[#E1E4DD]/60 flex items-center justify-between text-[11px]">
            <span class="font-semibold text-emerald-800" id="fanout-farmer-status">Spraying: PAUSED</span>
            <span class="text-[10px] text-slate-400 font-mono">Meghdoot / AMFU</span>
          </div>
        </div>

        <!-- 2. Fisherman Card -->
        <div class="glass-card-subtle border-l-4 border-l-[#B8860B] border-t border-r border-b border-[#E1E4DD]/70 rounded-lg p-3.5 flex flex-col justify-between space-y-2.5 shadow-2xs hover:shadow-xs transition">
          <div>
            <div class="flex items-center justify-between pb-1.5 border-b border-amber-200/50">
              <span class="font-bold text-xs text-[#B8860B] flex items-center gap-1.5">
                <span>⚓</span> <span data-i18n="cardFishermanTitle">MARITIME &amp; COASTAL SAFETY</span>
              </span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-[#B8860B]" data-i18n="cardFishermanBadge">
                FISHERMAN ROLE
              </span>
            </div>
            <div class="mt-2 text-xs font-bold text-slate-900 leading-snug" id="fanout-fisherman-directive">
              TOTAL SEA BAN: Squalls exceeding 65 km/h with rough sea state. Return to harbor by 18:00 IST.
            </div>
            <ul class="mt-2 space-y-1 text-[11px] text-[#5B6472]" id="fanout-fisherman-checklist">
              <li class="flex items-start gap-1.5"><span>•</span><span>Total suspension of deep-sea and coastal artisanal fishing</span></li>
              <li class="flex items-start gap-1.5"><span>•</span><span>Moor catamarans and fiber craft above high spring-tide mark</span></li>
              <li class="flex items-start gap-1.5"><span>•</span><span>Keep marine VHF transceiver tuned to Coast Guard Ch 16</span></li>
            </ul>
          </div>
          <div class="pt-2 border-t border-[#E1E4DD]/60 flex items-center justify-between text-[11px]">
            <span class="font-bold text-red-700" id="fanout-fisherman-status">Departure: TOTAL BAN</span>
            <span class="text-[10px] text-slate-400 font-mono">INCOIS / IMD Marine</span>
          </div>
        </div>

        <!-- 3. City Operations Card -->
        <div class="glass-card-subtle border-l-4 border-l-[#B3261E] border-t border-r border-b border-[#E1E4DD]/70 rounded-lg p-3.5 flex flex-col justify-between space-y-2.5 shadow-2xs hover:shadow-xs transition">
          <div>
            <div class="flex items-center justify-between pb-1.5 border-b border-red-200/50">
              <span class="font-bold text-xs text-[#B3261E] flex items-center gap-1.5">
                <span>🏢</span> <span data-i18n="cardCityTitle">URBAN LOCAL BODY &amp; OPS</span>
              </span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-[#B3261E]" data-i18n="cardCityBadge">
                CITY OPS ROLE
              </span>
            </div>
            <div class="mt-2 text-xs font-bold text-slate-900 leading-snug" id="fanout-city-directive">
              ACTIVATE MUNICIPAL DRAINAGE PROTOCOL: Mobilize 100-HP dewatering pumps to chronic low-lying wards.
            </div>
            <ul class="mt-2 space-y-1 text-[11px] text-[#5B6472]" id="fanout-city-checklist">
              <li class="flex items-start gap-1.5"><span>•</span><span>Deploy dewatering pumps to underpasses and metro stations</span></li>
              <li class="flex items-start gap-1.5"><span>•</span><span>Clear trash-screens at major stormwater lake outfalls</span></li>
              <li class="flex items-start gap-1.5"><span>•</span><span>Issue arterial traffic diversion bulletins for inundated corridors</span></li>
            </ul>
          </div>
          <div class="pt-2 border-t border-[#E1E4DD]/60 flex items-center justify-between text-[11px]">
            <span class="font-bold text-red-700" id="fanout-city-status">Alert: CODE RED</span>
            <span class="text-[10px] text-slate-400 font-mono">NDRF / Municipal Ops</span>
          </div>
        </div>
      </div>

      <!-- Provenance Line for Directives -->
      <div class="text-[10.5px] text-[#5B6472] pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-[#E1E4DD]/60">
        <span id="fanout-meta-line">
          Source: NDMA SACHET (OASIS CAP v1.2) + BharatFS / IMD Cyclone Bulletin • Confidence: High (Spread ±12km)
        </span>
        <button onclick="copyFanoutDirectives(this)" class="text-[#1B2A44] hover:underline font-semibold flex items-center gap-1">
          <span>📋</span> <span data-i18n="copyBriefing">Copy Multi-Role Briefing</span>
        </button>
      </div>
    </section>

    <!-- ==================== SPLIT COLUMNS: CHAT & SENSORS ==================== -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- ==================== LEFT COLUMN: WEATHERGPT CHATBOT & ADVISORY CONSOLE (7 COLS) ==================== -->
      <div class="lg:col-span-7 space-y-4">

        <!-- MAIN CHATBOT CARD -->
        <div id="weathergpt-chat-card" class="bg-white/90 backdrop-blur-md shadow-md flex flex-col rounded-2xl overflow-hidden relative z-10 border border-slate-200/90 transition-all">
          <!-- Clean Meteorological Console Header -->
          <div class="bg-slate-50/80 px-5 py-3.5 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 class="font-sans font-semibold text-[#1B2A44] text-sm tracking-tight" data-i18n="chatCardTitle">
                WeatherGPT Meteorological Console
              </h3>
              <p class="text-[11px] text-slate-500" data-i18n="chatCardSubtitle">Synoptic Intelligence &amp; Multi-turn Dialogue</p>
            </div>
            
            <div class="flex items-center gap-2">
              <button onclick="clearChatHistory()" title="Clear conversation history" class="text-slate-600 hover:text-slate-900 px-2.5 py-1 border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-medium transition flex items-center gap-1.5 rounded-md shadow-2xs">
                <span>🧹</span> <span class="hidden sm:inline" data-i18n="clearChat">Clear Chat</span>
              </button>
              <button onclick="printChatTranscript()" title="Print formal meteorological record" class="text-slate-600 hover:text-slate-900 px-2.5 py-1 border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-medium transition flex items-center gap-1.5 rounded-md shadow-2xs">
                <span>🖨️</span> <span class="hidden sm:inline" data-i18n="printRecord">Print Record</span>
              </button>
            </div>
          </div>

        <!-- Configuration & Targeting Bar -->
        <div class="p-4 bg-slate-50/40 border-b border-slate-200/70 space-y-3 text-xs">
          <!-- Location Picker Row -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-semibold text-slate-700 text-[11px] shrink-0" data-i18n="targetLabel">📍 Target Location:</span>
            <div class="flex-1 min-w-[180px] flex items-center gap-1.5">
              <input
                id="location-input"
                type="text"
                value="Bangalore"
                placeholder="City or district (e.g. Bangalore, Delhi, Mumbai, Coimbatore)..."
                data-i18n-placeholder="targetPlaceholder"
                class="flex-1 bg-white border border-slate-200 px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium rounded-lg shadow-2xs transition"
              />
              <button
                type="button"
                onclick="detectUserLocation()"
                title="Detect current GPS location"
                class="px-2.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-medium shrink-0 flex items-center gap-1 rounded-lg shadow-2xs transition"
              >
                <span>🎯</span> <span class="hidden sm:inline">GPS</span>
              </button>
            </div>

            <!-- Quick City Chips (Verified Indian Metropolitan Coordinates) -->
            <div class="flex items-center gap-1 overflow-x-auto py-0.5 max-w-full">
              <button type="button" onclick="applyPresetCity('Bangalore')" class="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-[11px] text-slate-700 rounded-md whitespace-nowrap font-medium shadow-2xs transition">
                Bengaluru
              </button>
              <button type="button" onclick="applyPresetCity('New Delhi')" class="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-[11px] text-slate-700 rounded-md whitespace-nowrap font-medium shadow-2xs transition">
                Delhi
              </button>
              <button type="button" onclick="applyPresetCity('Mumbai')" class="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-[11px] text-slate-700 rounded-md whitespace-nowrap font-medium shadow-2xs transition">
                Mumbai
              </button>
              <button type="button" onclick="applyPresetCity('Chennai')" class="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-[11px] text-slate-700 rounded-md whitespace-nowrap font-medium shadow-2xs transition">
                Chennai
              </button>
              <button type="button" onclick="applyPresetCity('Coimbatore')" class="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-[11px] text-slate-700 rounded-md whitespace-nowrap font-medium shadow-2xs transition">
                Coimbatore
              </button>
              <button type="button" onclick="applyPresetCity('Kolkata')" class="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-[11px] text-slate-700 rounded-md whitespace-nowrap font-medium shadow-2xs transition">
                Kolkata
              </button>
            </div>
          </div>

          <!-- Sector Selection Pills -->
          <div class="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/60">
            <span class="font-semibold text-slate-700 text-[11px] shrink-0 mr-1" data-i18n="roleLensLabel">Role Lens:</span>
            <label class="cursor-pointer border border-slate-200 px-2.5 py-1 bg-white hover:bg-slate-50 has-[:checked]:bg-[#1B2A44] has-[:checked]:text-white has-[:checked]:border-[#1B2A44] text-slate-700 text-[11px] font-medium flex items-center gap-1.5 rounded-lg transition shadow-2xs">
              <input type="radio" name="sector" value="farmer" class="sr-only" checked onchange="handleSectorChange('farmer')">
              <span>🌾</span> <span data-i18n="roleFarmer">Farmer</span>
            </label>
            <label class="cursor-pointer border border-slate-200 px-2.5 py-1 bg-white hover:bg-slate-50 has-[:checked]:bg-[#1B2A44] has-[:checked]:text-white has-[:checked]:border-[#1B2A44] text-slate-700 text-[11px] font-medium flex items-center gap-1.5 rounded-lg transition shadow-2xs">
              <input type="radio" name="sector" value="fisherman" class="sr-only" onchange="handleSectorChange('fisherman')">
              <span>⚓</span> <span data-i18n="roleFisherman">Fisherman</span>
            </label>
            <label class="cursor-pointer border border-slate-200 px-2.5 py-1 bg-white hover:bg-slate-50 has-[:checked]:bg-[#1B2A44] has-[:checked]:text-white has-[:checked]:border-[#1B2A44] text-slate-700 text-[11px] font-medium flex items-center gap-1.5 rounded-lg transition shadow-2xs">
              <input type="radio" name="sector" value="city_ops" class="sr-only" onchange="handleSectorChange('city_ops')">
              <span>🏢</span> <span data-i18n="roleCityOps">City Ops / ULB</span>
            </label>
            <label class="cursor-pointer border border-slate-200 px-2.5 py-1 bg-white hover:bg-slate-50 has-[:checked]:bg-[#1B2A44] has-[:checked]:text-white has-[:checked]:border-[#1B2A44] text-slate-700 text-[11px] font-medium flex items-center gap-1.5 rounded-lg transition shadow-2xs">
              <input type="radio" name="sector" value="general" class="sr-only" onchange="handleSectorChange('general')">
              <span>👤</span> <span data-i18n="rolePublic">Public</span>
            </label>
            <span class="ml-auto text-[10px] font-mono text-slate-400" id="session-id-display">SESSION: READY</span>
          </div>
        </div>

        <!-- Chat Stream Conversation Container -->
        <div id="chat-thread" class="p-5 space-y-4 max-h-[580px] min-h-[440px] overflow-y-auto bg-slate-50/20">
          <!-- Welcome message rendered via JavaScript -->
        </div>

        <!-- Thinking / Loading Indicator -->
        <div id="chat-thinking" class="hidden px-5 py-3 bg-slate-50 border-t border-slate-200/70 flex items-center gap-3">
          <div class="w-4 h-4 border-2 border-slate-700 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-xs font-medium text-slate-700" data-i18n="thinkingText">
            Consulting BharatFS numerical grids, IMD nowcasts, and generating role directives...
          </span>
        </div>

        <!-- Composer & Quick Action Bar -->
        <div id="chat-composer" class="p-4 bg-white border-t border-slate-200/80 space-y-3">
          <!-- Suggestion Prompts Carousel (Localized dynamically) -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs" id="suggestion-chips-bar">
            <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider shrink-0" data-i18n="suggestionsLabel">Suggestions:</span>
            <button type="button" onclick="quickAsk('Is it safe to spray pesticides on crops today in ' + getTargetCity() + '? Check wind and rain.')" class="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] rounded-lg whitespace-nowrap shadow-2xs transition">
              🌾 Agrochemical Spraying
            </button>
            <button type="button" onclick="quickAsk('Check coastal wind speed at 10m/80m and squall warnings for ' + getTargetCity() + '. Can boats go out?')" class="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] rounded-lg whitespace-nowrap shadow-2xs transition">
              ⚓ Marine Squalls &amp; Wind
            </button>
            <button type="button" onclick="quickAsk('What is the historical flood record and extreme 24h rainfall for ' + getTargetCity() + ' in Hazard Atlas?')" class="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] rounded-lg whitespace-nowrap shadow-2xs transition">
              🗺️ Hazard Atlas Flood History
            </button>
            <button type="button" onclick="quickAsk('Scan active disaster warnings, thunderstorms, and rain outlook for ' + getTargetCity() + '.')" class="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] rounded-lg whitespace-nowrap shadow-2xs transition">
              ⚠️ Disaster Bulletin Scan
            </button>
          </div>

          <!-- Chat Input Form with Voice Dictation Affordance -->
          <form id="chat-form" onsubmit="handleChatSubmit(event)" class="flex gap-2 items-end">
            <div class="flex-1 relative">
              <textarea
                id="chat-input"
                rows="2"
                placeholder="Ask about weather, rain forecasts, agricultural advisories, or coastal warnings..."
                data-i18n-placeholder="inputPlaceholder"
                class="w-full bg-slate-50 focus:bg-white border border-slate-200 p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none font-sans leading-relaxed rounded-xl pr-10 shadow-2xs transition"
                required
              ></textarea>
              
              <!-- Voice Dictation / Speech-to-Text Button -->
              <button
                type="button"
                id="voice-mic-btn"
                onclick="toggleVoiceRecognition()"
                title="Voice Input (English, Hindi, Tamil Speech Recognition)"
                class="absolute right-3 top-3 w-6 h-6 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center transition shadow-2xs"
              >
                <span id="mic-icon" class="text-xs">🎙️</span>
              </button>
            </div>

            <button
              id="chat-send-btn"
              type="submit"
              class="h-[52px] bg-[#1B2A44] hover:bg-[#132845] text-white font-medium text-xs tracking-wide px-5 transition flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50 rounded-xl shadow-xs"
            >
              <span id="send-label" data-i18n="transmit">Send</span>
              <span>➔</span>
            </button>
          </form>

          <!-- Micro Security & Standards Notice -->
          <div class="flex items-center justify-between text-[10.5px] text-slate-400 pt-0.5">
            <span class="flex items-center gap-2">
              <span>WMO Standards</span>
              <span>•</span>
              <span>Explainable Provenance</span>
            </span>
            <span class="font-mono">BharatFS Numerical Grids</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== RIGHT COLUMN: DIRECT SENSORS & REGULATORY (5 COLS) ==================== -->
    <div class="lg:col-span-5 space-y-5 relative z-10">

      <!-- PANEL A: LIVE SACHET / NDMA RADAR -->
      <div id="disaster-monitor-panel" class="glass-card rounded-md shadow-sm overflow-hidden">
        <div class="glass-inner-subtle px-4 py-2.5 border-b border-[#E1E4DD]/70 flex items-center justify-between">
          <span class="font-serif font-bold text-[#1B2A44] text-xs tracking-wide flex items-center gap-1.5">
            <span class="text-[#B3261E]">🚨</span> <span data-i18n="disasterRadarTitle">SACHET / NDMA DISASTER RADAR</span>
          </span>
          <span id="disaster-badge" class="text-[10px] font-bold px-2 py-0.5 bg-slate-200/80 text-[#1B2A44] rounded-xs">
            CHECKING...
          </span>
        </div>

        <div class="p-4 space-y-3">
          <div class="flex items-center gap-2 text-xs">
            <input
              id="disaster-lat"
              type="text"
              value="12.9719"
              placeholder="Lat"
              class="w-20 bg-white/80 border border-[#E1E4DD] px-2 py-1 text-xs font-mono rounded-sm shadow-2xs"
            />
            <input
              id="disaster-lon"
              type="text"
              value="77.5937"
              placeholder="Lon"
              class="w-20 bg-white/80 border border-[#E1E4DD] px-2 py-1 text-xs font-mono rounded-sm shadow-2xs"
            />
            <select id="disaster-radius" class="flex-1 bg-white/80 border border-[#E1E4DD] px-2 py-1 text-xs rounded-sm shadow-2xs">
              <option value="25">Radius: 25 km</option>
              <option value="50" selected>Radius: 50 km</option>
              <option value="100">Radius: 100 km</option>
              <option value="200">Radius: 200 km</option>
            </select>
            <button onclick="loadDisasterAlerts()" class="bg-[#1B2A44] hover:bg-[#132845] text-white px-3 py-1 text-xs font-semibold rounded-sm shadow-xs">
              Scan
            </button>
          </div>

          <!-- Alert Items Display -->
          <div id="disaster-alerts-list" class="space-y-2 max-h-48 overflow-y-auto pr-1">
            <div class="text-[#5B6472] text-xs text-center py-4">
              Querying National Disaster Management Authority bulletins...
            </div>
          </div>

          <div class="text-[11px] text-[#5B6472] pt-1 border-t border-[#E1E4DD]/70 flex justify-between">
            <span>Protocol: OASIS CAP v1.2</span>
            <span>Feed: SACHET RSS</span>
          </div>
        </div>
      </div>

      <!-- PANEL B: DIRECT SYNOPTIC WEATHER STATION INSPECTOR -->
      <div id="weather-inspector-panel" class="glass-card rounded-md shadow-sm overflow-hidden">
        <div class="glass-inner-subtle px-4 py-2.5 border-b border-[#E1E4DD]/70 flex items-center justify-between">
          <span class="font-serif font-bold text-[#1B2A44] text-xs tracking-wide flex items-center gap-1.5">
            <span>📡</span> <span data-i18n="telemetryTitle">SYNOPTIC STATION TELEMETRY</span>
          </span>
          <span class="text-[10px] font-mono text-[#5B6472]" data-i18n="telemetrySub">RAW SENSORS</span>
        </div>

        <div class="p-4 space-y-3">
          <div class="flex items-center gap-2 text-xs">
            <input
              id="station-city"
              type="text"
              value="Bangalore"
              placeholder="Enter station name..."
              class="flex-1 bg-white/80 border border-[#E1E4DD] px-2.5 py-1 text-xs font-medium rounded-sm shadow-2xs"
            />
            <button onclick="inspectStation()" class="bg-[#1B2A44] hover:bg-[#132845] text-white px-3.5 py-1 text-xs font-semibold rounded-sm shadow-xs">
              <span data-i18n="inspectBtn">Inspect</span>
            </button>
          </div>

          <!-- Telemetry Output Box -->
          <div id="telemetry-box" class="glass-inner-subtle p-3 text-xs rounded-sm">
            <div class="text-[#5B6472] text-center py-2">Click Inspect to query live sensors...</div>
          </div>
        </div>
      </div>

      <!-- PANEL C: WMO & NDMA REGULATORY SCALES -->
      <div id="regulatory-standards-panel" class="glass-card rounded-md shadow-sm overflow-hidden">
        <div class="glass-inner-subtle px-4 py-2.5 border-b border-[#E1E4DD]/70 flex items-center justify-between">
          <span class="font-serif font-bold text-[#1B2A44] text-xs tracking-wide flex items-center gap-1.5">
            <span>⚖️</span> <span data-i18n="scalesTitle">REGULATORY METEOROLOGICAL SCALES</span>
          </span>
          <span class="text-[10px] font-mono text-[#5B6472]" data-i18n="scalesSub">STANDARDS</span>
        </div>

        <div class="p-4 space-y-3 text-xs">
          <!-- Scale Category Selector -->
          <div class="flex border-b border-[#E1E4DD]/70 pb-1 gap-2">
            <button onclick="switchScaleTab('uv')" id="tab-btn-uv" class="px-3 py-1 font-bold border-b-2 border-[#1B2A44] text-[#1B2A44] text-xs">
              UV Solar Scale
            </button>
            <button onclick="switchScaleTab('rain')" id="tab-btn-rain" class="px-3 py-1 text-[#5B6472] hover:text-[#1B2A44] text-xs">
              Precipitation Rates
            </button>
            <button onclick="switchScaleTab('wmo')" id="tab-btn-wmo" class="px-3 py-1 text-[#5B6472] hover:text-[#1B2A44] text-xs">
              WMO Codes
            </button>
          </div>

          <!-- Tab 1: UV Index -->
          <div id="scale-content-uv" class="space-y-1.5 max-h-44 overflow-y-auto">
            <div class="flex items-center justify-between p-1.5 bg-emerald-50/90 border-l-4 border-[#3F6B4A] rounded-xs shadow-2xs">
              <span class="font-bold text-emerald-900">0 – 2: Low</span>
              <span class="text-[11px] text-emerald-800">Minimal danger; normal outdoor work</span>
            </div>
            <div class="flex items-center justify-between p-1.5 bg-yellow-50/90 border-l-4 border-yellow-500 rounded-xs shadow-2xs">
              <span class="font-bold text-yellow-900">3 – 5: Moderate</span>
              <span class="text-[11px] text-yellow-800">SPF 30+ recommended; seek shade midday</span>
            </div>
            <div class="flex items-center justify-between p-1.5 bg-amber-50/90 border-l-4 border-[#B8860B] rounded-xs shadow-2xs">
              <span class="font-bold text-amber-900">6 – 7: High</span>
              <span class="text-[11px] text-amber-800">Mandatory hat &amp; sunglasses; reduce exposure</span>
            </div>
            <div class="flex items-center justify-between p-1.5 bg-red-50/90 border-l-4 border-[#B3261E] rounded-xs shadow-2xs">
              <span class="font-bold text-red-900">8 – 10: Very High</span>
              <span class="text-[11px] text-red-800">Severe burn hazard; pause field labor</span>
            </div>
            <div class="flex items-center justify-between p-1.5 bg-purple-50/90 border-l-4 border-purple-700 rounded-xs shadow-2xs">
              <span class="font-bold text-purple-900">11+: Extreme</span>
              <span class="text-[11px] text-purple-800">Full protective gear; avoid midday outdoors</span>
            </div>
          </div>

          <!-- Tab 2: Precipitation Rate Scale -->
          <div id="scale-content-rain" class="space-y-1.5 max-h-44 overflow-y-auto hidden">
            <div class="p-1.5 glass-inner-subtle rounded-xs">
              <div class="font-bold text-slate-900">0.0 mm/hr: None</div>
              <div class="text-[11px] text-[#5B6472]">Dry operational surface. Safe for agro-chemical spraying.</div>
            </div>
            <div class="p-1.5 bg-blue-50/90 border border-blue-200 rounded-xs shadow-2xs">
              <div class="font-bold text-blue-900">0.25 – 1.0 mm/hr: Light Rain</div>
              <div class="text-[11px] text-blue-800">Individual drops visible; puddles form slowly.</div>
            </div>
            <div class="p-1.5 bg-blue-100/90 border border-blue-300 rounded-xs shadow-2xs">
              <div class="font-bold text-blue-950">1.0 – 4.0 mm/hr: Moderate Rain</div>
              <div class="text-[11px] text-blue-900">Continuous rain; rapid runoff on impervious roads.</div>
            </div>
            <div class="p-1.5 bg-red-100/90 border border-red-400 rounded-xs shadow-2xs">
              <div class="font-bold text-red-950">&gt; 16.0 mm/hr: Violent / Cloudburst</div>
              <div class="text-[11px] text-red-900">Torrential rain; high flash flood danger.</div>
            </div>
          </div>

          <!-- Tab 3: WMO Codes -->
          <div id="scale-content-wmo" class="space-y-1 max-h-44 overflow-y-auto text-[11px] font-mono hidden">
            <div class="p-1 bg-white/80 border border-[#E1E4DD] flex justify-between rounded-xs">
              <span>WMO Code 00:</span> <span class="font-bold">Clear Sky</span>
            </div>
            <div class="p-1 bg-white/80 border border-[#E1E4DD] flex justify-between rounded-xs">
              <span>WMO Code 01-03:</span> <span class="font-bold">Mainly Clear / Overcast</span>
            </div>
            <div class="p-1 bg-white/80 border border-[#E1E4DD] flex justify-between rounded-xs">
              <span>WMO Code 51-55:</span> <span class="font-bold">Drizzle (Light to Dense)</span>
            </div>
            <div class="p-1 bg-white/80 border border-[#E1E4DD] flex justify-between rounded-xs">
              <span>WMO Code 61-65:</span> <span class="font-bold">Continuous Rain</span>
            </div>
            <div class="p-1 bg-white/80 border border-[#E1E4DD] flex justify-between rounded-xs">
              <span>WMO Code 95-99:</span> <span class="font-bold text-red-700">Thunderstorm / Hail</span>
            </div>
          </div>
        </div>
      </div>

    </div>

  </main>

  <!-- ==================== 6. OFFICIAL FOOTER ==================== -->
  <footer class="bg-[#1B2A44] text-slate-400 text-xs border-t border-[#132845] mt-12 py-8 px-4 sm:px-8">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <div class="font-serif font-bold text-white text-sm flex items-center gap-2">
          <span>WeatherGPT • Conversational AI Weather Intelligence Layer</span>
        </div>
        <div class="text-[11px] text-slate-400 mt-1">
          Grounded in BharatFS, IMD Nowcast, SACHET / NDMA CAP v1.2, and IMD Climate Hazard &amp; Vulnerability Atlas.
        </div>
      </div>
      <div class="flex items-center gap-4 text-[11px]">
        <button onclick="openRuralModal()" class="hover:text-white underline" data-i18n="footerRural">Rural IVR &amp; Telephony Gateway</button>
        <span>•</span>
        <button onclick="openHazardModal()" class="hover:text-white underline" data-i18n="navHazard">Hazard Atlas</button>
        <span>•</span>
        <button onclick="openApiModal()" class="hover:text-white underline">API Routing</button>
      </div>
    </div>
  </footer>

  <!-- ==================== MODAL 1: RURAL ACCESSIBILITY SUITE (IVR, SMS, KRISHI SAKHI) ==================== -->
  <div id="rural-modal" class="hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="glass-card shadow-2xl max-w-xl w-full p-6 space-y-4 rounded-lg border border-white/60">
      <div class="flex items-center justify-between border-b border-[#E1E4DD]/70 pb-3">
        <h3 class="font-serif font-bold text-[#1B2A44] text-base flex items-center gap-2">
          <span>📞</span> <span data-i18n="ruralModalTitle">Rural Accessibility Tier (Non-Smartphone Reach)</span>
        </h3>
        <button onclick="closeRuralModal()" class="text-slate-400 hover:text-slate-700 text-lg font-bold">×</button>
      </div>

      <!-- Rural Tabs -->
      <div class="flex border-b border-[#E1E4DD]/70 gap-2 text-xs">
        <button onclick="switchRuralTab('ivr')" id="rural-tab-ivr" class="px-3 py-1.5 font-bold border-b-2 border-[#1B2A44] text-[#1B2A44]" data-i18n="ruralTabIvr">
          1. Toll-Free IVR Voice Gateway (1800-MAUSAM-AI)
        </button>
        <button onclick="switchRuralTab('sms')" id="rural-tab-sms" class="px-3 py-1.5 text-[#5B6472] hover:text-[#1B2A44]" data-i18n="ruralTabSms">
          2. SMS &amp; USSD Delivery
        </button>
        <button onclick="switchRuralTab('krishi')" id="rural-tab-krishi" class="px-3 py-1.5 text-[#5B6472] hover:text-[#1B2A44]" data-i18n="ruralTabKrishi">
          3. Krishi Sakhi Field Console
        </button>
      </div>

      <!-- Tab Content: IVR Phone Gateway -->
      <div id="rural-content-ivr" class="space-y-3 text-xs">
        <p class="text-[#5B6472]">
          Allows farmers with basic 2G feature phones to dial a toll-free number (1800-MAUSAM-AI), ask questions in regional languages, and receive spoken meteorological briefings.
        </p>
        <div class="glass-inner-subtle p-3.5 rounded-md space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-[#1B2A44]">Toll-Free Dial-In:</span>
            <span class="font-mono font-bold text-[#C97A2B]">1800-628-7262 (1800-MAUSAM)</span>
          </div>
          <div class="flex items-center gap-2">
            <select id="ivr-lang" class="bg-white/90 border border-[#E1E4DD] px-2.5 py-1 text-xs rounded-sm shadow-2xs">
              <option value="hi" selected>Hindi (हिन्दी)</option>
              <option value="ta">Tamil (தமிழ்)</option>
              <option value="en">English (Indian Accent)</option>
            </select>
            <input
              id="ivr-query-input"
              type="text"
              value="क्या आज कीटनाशक का छिड़काव करना ठीक रहेगा?"
              class="flex-1 bg-white/90 border border-[#E1E4DD] px-2.5 py-1 text-xs rounded-sm shadow-2xs"
            />
            <button onclick="connectIvrCall()" id="ivr-call-btn" class="bg-[#3F6B4A] hover:bg-emerald-800 text-white px-3.5 py-1 font-semibold rounded-sm shadow-xs">
              <span data-i18n="ivrCallBtn">📞 Connect Call</span>
            </button>
          </div>
          <div id="ivr-status-box" class="p-2.5 bg-white/80 border border-[#E1E4DD] text-[11px] font-mono text-[#1B2A44] min-h-[50px] leading-relaxed rounded-xs shadow-2xs">
            Status: Line Ready. Click "Connect Call" to dispatch interactive voice response.
          </div>
        </div>
      </div>

      <!-- Tab Content: SMS & USSD Fallback -->
      <div id="rural-content-sms" class="space-y-3 text-xs hidden">
        <p class="text-[#5B6472]">
          Low-bandwidth, zero-data protocol for feature phones in remote or cyclone-affected transmission blackouts.
        </p>
        <div class="space-y-2">
          <div>
            <label class="font-bold text-[#1B2A44] block mb-1">Standard USSD Code String:</label>
            <div class="p-2 glass-inner-subtle font-mono font-bold text-xs text-[#1B2A44] flex justify-between items-center rounded-xs">
              <span>*99*WEATHER*560001#</span>
              <span class="text-[10px] text-[#5B6472]">PIN-Code Granular</span>
            </div>
          </div>
          <div>
            <label class="font-bold text-[#1B2A44] block mb-1">Generated 160-Character SMS Dispatch:</label>
            <div class="p-2.5 glass-inner-subtle font-mono text-xs text-slate-800 leading-relaxed rounded-xs">
              [WeatherGPT] BLR: 27°C, Dry. Rain &lt;10%. Wind 11km/h. Safe to spray. No alerts. Dial 1800-MAUSAM for voice advisory.
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Content: Krishi Sakhi Assist Mode -->
      <div id="rural-content-krishi" class="space-y-3 text-xs hidden">
        <p class="text-[#5B6472]">
          Designed for village self-help group leaders (Krishi Sakhis) to input a farmer's localized village query, print a card, or play the synthesized audio to the farmer on the spot.
        </p>
        <div class="bg-emerald-50/80 border border-emerald-200 p-3 rounded-md space-y-2">
          <div class="font-bold text-[#3F6B4A]">👩‍🌾 Krishi Sakhi Field Assistant Portal</div>
          <div class="text-[11px] text-slate-700">
            "Farmer: Murugesan, Thondamuthur Village. Crop: Turmeric. Query: Rain risk for root rot."
          </div>
          <button onclick="speakKrishiSakhi()" class="px-3 py-1 bg-[#3F6B4A] hover:bg-emerald-800 text-white font-semibold rounded-sm text-xs flex items-center gap-1.5 shadow-xs">
            <span>🔊</span> Play Spoken Vernacular Guidance
          </button>
        </div>
      </div>

      <div class="flex justify-end pt-2 border-t border-[#E1E4DD]/70">
        <button onclick="closeRuralModal()" class="px-4 py-1.5 bg-slate-200/80 hover:bg-slate-300 text-slate-800 font-medium rounded-sm text-xs">
          Close
        </button>
      </div>
    </div>
  </div>

  <!-- ==================== MODAL 2: IMD CLIMATE HAZARD ATLAS EXPLORER ==================== -->
  <div id="hazard-modal" class="hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="glass-card shadow-2xl max-w-xl w-full p-6 space-y-4 rounded-lg border border-white/60">
      <div class="flex items-center justify-between border-b border-[#E1E4DD]/70 pb-3">
        <h3 class="font-serif font-bold text-[#1B2A44] text-base flex items-center gap-2">
          <span>🗺️</span> IMD Climate Hazard &amp; Vulnerability Atlas
        </h3>
        <button onclick="closeHazardModal()" class="text-slate-400 hover:text-slate-700 text-lg font-bold">×</button>
      </div>

      <div class="text-xs text-[#5B6472] space-y-3">
        <p>
          Authoritative climatological records from IMD Pune Climate Hazard Atlas (imdpune.gov.in/hazardatlas), covering extreme rainfall, flood recurrence, cyclone vulnerability, and 10-year monsoon onset normals.
        </p>

        <div class="flex items-center gap-2">
          <input
            id="hazard-search-input"
            type="text"
            value="Bengaluru"
            placeholder="Enter district (e.g. Bengaluru, Chennai, Mumbai, Coimbatore, Delhi)..."
            class="flex-1 bg-white/90 border border-[#E1E4DD] px-2.5 py-1.5 text-xs text-[#1B2A44] font-medium rounded-sm shadow-2xs"
          />
          <button onclick="searchHazardAtlas()" class="bg-[#1B2A44] hover:bg-[#132845] text-white px-4 py-1.5 font-semibold rounded-sm text-xs shadow-xs">
            Query Atlas
          </button>
        </div>

        <div id="hazard-results-box" class="glass-inner-subtle p-3.5 rounded-md text-xs space-y-2 min-h-[140px]">
          <div class="text-center text-[#5B6472] py-4">Click "Query Atlas" to fetch official hazard benchmarks...</div>
        </div>
      </div>

      <div class="flex justify-end pt-2 border-t border-[#E1E4DD]/70">
        <button onclick="closeHazardModal()" class="px-4 py-1.5 bg-slate-200/80 hover:bg-slate-300 text-slate-800 font-medium rounded-sm text-xs">
          Close
        </button>
      </div>
    </div>
  </div>

  <!-- ==================== MODAL 3: BACKEND API ROUTING ==================== -->
  <div id="api-modal" class="hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="glass-card shadow-2xl max-w-lg w-full p-6 space-y-4 rounded-lg border border-white/60">
      <div class="flex items-center justify-between border-b border-[#E1E4DD]/70 pb-3">
        <h3 class="font-serif font-bold text-[#1B2A44] text-base flex items-center gap-2">
          <span>⚡</span> Backend API Routing Configuration
        </h3>
        <button onclick="closeApiModal()" class="text-slate-400 hover:text-slate-700 text-lg font-bold">×</button>
      </div>

      <div class="text-xs text-[#5B6472] space-y-2">
        <p>Configure the active WeatherGPT backend endpoint URL.</p>
        <div>
          <label class="block font-bold text-[#1B2A44] mb-1">Backend URL (Origin / Cloud Run / Tunnel):</label>
          <input
            id="api-url-input"
            type="url"
            placeholder="https://..."
            class="w-full bg-white/90 border border-[#E1E4DD] px-3 py-2 text-xs font-mono text-[#1B2A44] focus:outline-none focus:border-[#1B2A44] rounded-sm shadow-2xs"
          />
        </div>
        <div id="api-test-result" class="p-2.5 glass-inner-subtle text-[11px] font-mono text-[#1B2A44] min-h-[44px] rounded-xs">
          Click "Test Connection" to ping target /health endpoint.
        </div>
      </div>

      <div class="flex items-center justify-between pt-2 border-t border-[#E1E4DD]/70 text-xs">
        <div class="flex gap-2">
          <button onclick="testApiConnection()" class="px-3 py-1.5 bg-slate-200/80 hover:bg-slate-300 text-slate-800 font-medium rounded-sm">
            Test Ping
          </button>
        </div>
        <div class="flex gap-2">
          <button onclick="closeApiModal()" class="px-3 py-1.5 bg-slate-200/80 hover:bg-slate-300 text-slate-700 rounded-sm">
            Cancel
          </button>
          <button onclick="saveApiEndpoint()" class="px-4 py-1.5 bg-[#1B2A44] hover:bg-[#132845] text-white font-medium rounded-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== CORE WEATHERGPT JAVASCRIPT ENGINE ==================== -->
  <script>
    // 0. Active Language State (en, hi, ta)
    let currentLanguage = "en";
    let currentScenario = "cyclone";

    const I18N_STRINGS = {
      en: {
        welcomeTitle: "WeatherGPT Central Advisory Terminal",
        welcomeDesc: "Welcome to <strong>WeatherGPT</strong>. I am your specialized meteorological decision-support advisor. I combine live synoptic telemetry, BharatFS / Open-Meteo numerical grids, and national SACHET/NDMA emergency hazard feeds.",
        quickPesticide: "Can I spray crops today in {city}?",
        quickMarine: "Marine clearance & coastal squall alerts",
        quickHeat: "Heat stress & UV index analysis",
        quickFlood: "Emergency flood & hazard scan",
        inputPlaceholder: "Ask WeatherGPT in English, हिन्दी, or தமிழ் (e.g. Will it rain during harvest?)",
        transmit: "TRANSMIT",
        topBarDirectives: "Operational Directives",
        drawerWarning: "Synoptic Warning: Deep depression over West-Central Bay of Bengal. Squally winds 55-65 km/h along coastal corridors.",
        drawerDesc: "National Disaster Management Authority (NDMA) Common Alerting Protocol (CAP v1.2) active advisory. Multi-agency operational fan-out deployed across Agriculture, Maritime Coastal Fisheries, and Urban Local Bodies.",
        viewRoleDirectives: "View Role Directives",
        topBarSub: "Conversational Meteorological Intelligence Layer",
        topBarTag: "Mission Mausam • BharatFS • IMD Nowcast • NDMA SACHET CAP",
        headerKicker: "WEATHERGPT • METEOROLOGICAL REASONING ENGINE",
        headerLayer: "All-India Unified Layer",
        headerTitle: "Conversational Weather & Disaster Intelligence",
        headerDesc: "Orchestrating BharatFS synoptic grids, Meghdoot agromet, Damini lightning, and NDMA CAP feeds into role-specific actions",
        navRoleDirectives: "Role Directives",
        navRural: "Rural Access Tier (IVR/SMS)",
        navHazard: "IMD Hazard Atlas",
        workbenchTitle: "Role-Based Operational Directives Engine",
        workbenchBadge: "CAP FAN-OUT",
        workbenchDesc: "Single Red/Orange warning automatically fanned out into parallel, domain-calibrated operational directives",
        scenarioLabel: "Active Scenario:",
        scenarioCyclone: "Cyclone Red Alert (Coast)",
        scenarioFlood: "Urban Cloudburst (Bengaluru)",
        scenarioHeatwave: "Severe Heatwave & Evaporation (Delhi)",
        cardFarmerTitle: "AGRICULTURE & AGROMET",
        cardFarmerBadge: "FARMER ROLE",
        cardFishermanTitle: "MARITIME & COASTAL SAFETY",
        cardFishermanBadge: "FISHERMAN ROLE",
        cardCityTitle: "URBAN LOCAL BODY & OPS",
        cardCityBadge: "CITY OPS ROLE",
        copyBriefing: "Copy Multi-Role Briefing",
        chatCardTitle: "WeatherGPT Conversational Meteorologist",
        aiOnline: "AI Online",
        chatCardSubtitle: "Autonomous Synoptic Intelligence & Multi-turn Dialogue",
        clearChat: "Clear Chat",
        printRecord: "Print Record",
        targetLabel: "📍 Target:",
        targetPlaceholder: "City or district (e.g. Bangalore, Delhi, Mumbai, Coimbatore)...",
        roleLensLabel: "Role Lens:",
        roleFarmer: "Farmer",
        roleFisherman: "Fisherman",
        roleCityOps: "City Ops / ULB",
        rolePublic: "Public",
        thinkingText: "WeatherGPT is consulting BharatFS synoptic grids, IMD nowcasts, and generating role directives...",
        suggestionsLabel: "Suggestions:",
        disasterRadarTitle: "SACHET / NDMA DISASTER RADAR",
        telemetryTitle: "SYNOPTIC STATION TELEMETRY",
        telemetrySub: "RAW SENSORS",
        inspectBtn: "Inspect",
        scalesTitle: "REGULATORY METEOROLOGICAL SCALES",
        scalesSub: "STANDARDS",
        footerRural: "Rural IVR & Telephony Gateway",
        ruralModalTitle: "Rural Accessibility Tier (Non-Smartphone Reach)",
        ruralTabIvr: "1. Toll-Free IVR Voice Gateway (1800-MAUSAM-AI)",
        ruralTabSms: "2. SMS & USSD Delivery",
        ruralTabKrishi: "3. Krishi Sakhi Field Console",
        ivrCallBtn: "📞 Connect Call"
      },
      hi: {
        welcomeTitle: "मौसम जीपीटी केंद्रीय मौसम सलाह टर्मिनल",
        welcomeDesc: "<strong>मौसम जीपीटी (WeatherGPT)</strong> में आपका स्वागत है। मैं भारत सरकार के भारत-एफएस मॉडल, आईएमडी वेधशालाओं और सचेत (NDMA) आपदा चेतावनी प्रणाली से लैस आपका कृत्रिम बुद्धिमत्ता मौसम सलाहकार हूँ।",
        quickPesticide: "क्या आज {city} में कीटनाशक का छिड़काव सुरक्षित है?",
        quickMarine: "तटीय हवा की गति और मछुआरों के लिए समुद्री चेतावनी",
        quickHeat: "लू का खतरा और पराबैंगनी (UV) सूचकांक विश्लेषण",
        quickFlood: "सचेत आपदा चेतावनी और भारी बारिश का पूर्वानुमान",
        inputPlaceholder: "मौसम जीपीटी से हिंदी में पूछें (उदा. क्या आज बारिश होगी और फसल काटना ठीक है?)",
        transmit: "भेजें",
        topBarDirectives: "परिचालन निर्देश",
        drawerWarning: "सिनॉप्टिक चेतावनी: पश्चिम-मध्य बंगाल की खाड़ी पर गहरा दबाव। तटीय क्षेत्रों में 55-65 किमी/घंटा की तूफानी हवाएँ।",
        drawerDesc: "राष्ट्रीय आपदा प्रबंधन प्राधिकरण (NDMA) कॉमन अलर्टिंग प्रोटोकॉल (CAP v1.2) सक्रिय चेतावनी। कृषि, समुद्री मत्स्य पालन और नगर निगमों के लिए समन्वित परिचालन निर्देश जारी।",
        viewRoleDirectives: "भूमिका-आधारित निर्देश देखें",
        topBarSub: "संवादात्मक मौसम विज्ञान व आपदा आसूचना प्रणाली",
        topBarTag: "मिशन मौसम • भारत-एफएस • आईएमडी नाउकास्ट • सचेत एनडीएमए",
        headerKicker: "वेदर जीपीटी • मौसम विज्ञान विश्लेषण इंजन",
        headerLayer: "अखिल भारतीय एकीकृत प्रणाली",
        headerTitle: "संवादात्मक मौसम और आपदा आसूचना",
        headerDesc: "भारत-एफएस संख्यात्मक ग्रिड, मेघदूत कृषि मौसम, दामिनी आकाशीय बिजली और एनडीएमए सचेत अलर्ट को भूमिका-विशिष्ट निर्णयों में परिवर्तित करना",
        navRoleDirectives: "भूमिका निर्देश",
        navRural: "ग्रामीण पहुंच स्तर (IVR/SMS)",
        navHazard: "आईएमडी आपदा एटलस",
        workbenchTitle: "भूमिका-आधारित परिचालन निर्देश इंजन",
        workbenchBadge: "सचेत अलर्ट विभाजन",
        workbenchDesc: "एकल रेड/ऑरेंज चेतावनी को स्वतः समानांतर, क्षेत्र-विशिष्ट परिचालन निर्देशों में प्रसारित किया जाता है",
        scenarioLabel: "सक्रिय परिदृश्य:",
        scenarioCyclone: "चक्रवात रेड अलर्ट (तटीय)",
        scenarioFlood: "शहरी अतिवृष्टि व बाढ़ (बेंगलुरु)",
        scenarioHeatwave: "भीषण लू व जल वाष्पीकरण (दिल्ली)",
        cardFarmerTitle: "कृषि एवं कृषि मौसम विज्ञान",
        cardFarmerBadge: "किसान भूमिका",
        cardFishermanTitle: "समुद्री एवं तटीय सुरक्षा",
        cardFishermanBadge: "मछुआरा भूमिका",
        cardCityTitle: "शहरी स्थानीय निकाय एवं आपदा प्रबंधन",
        cardCityBadge: "नगर निगम भूमिका",
        copyBriefing: "निर्देश कॉपी करें",
        chatCardTitle: "मौसम जीपीटी संवादात्मक मौसम विज्ञानी",
        aiOnline: "एआई सक्रिय",
        chatCardSubtitle: "स्वायत्त सिनॉप्टिक आसूचना एवं बहु-चरणीय संवाद",
        clearChat: "बातचीत साफ़ करें",
        printRecord: "प्रिंट रिकॉर्ड",
        targetLabel: "📍 लक्षित स्थान:",
        targetPlaceholder: "शहर या जिला दर्ज करें (उदा. बेंगलुरु, दिल्ली, मुंबई)...",
        roleLensLabel: "भूमिका दृष्टिकोण:",
        roleFarmer: "किसान",
        roleFisherman: "मछुआरा",
        roleCityOps: "नगर निगम / यूएलबी",
        rolePublic: "नागरिक",
        thinkingText: "मौसम जीपीटी भारत-एफएस ग्रिड और आईएमडी नाउकास्ट का विश्लेषण कर भूमिका निर्देश तैयार कर रहा है...",
        suggestionsLabel: "सुझाव:",
        disasterRadarTitle: "सचेत / एनडीएमए आपदा रडार",
        telemetryTitle: "सिनॉप्टिक मौसम केंद्र टेलीमेट्री",
        telemetrySub: "सेंसर डेटा",
        inspectBtn: "जांचें",
        scalesTitle: "मानक मौसम विज्ञान पैमाने",
        scalesSub: "मानक",
        footerRural: "ग्रामीण आईवीआर एवं टेलीफोनी गेटवे",
        ruralModalTitle: "ग्रामीण पहुंच स्तर (फीचर फोन उपयोगकर्ताओं हेतु)",
        ruralTabIvr: "1. टोल-फ्री आईवीआर वॉयस गेटवे (1800-MAUSAM-AI)",
        ruralTabSms: "2. एसएमएस एवं यूएसएसडी सेवा",
        ruralTabKrishi: "3. कृषि सखी फील्ड कंसोल",
        ivrCallBtn: "📞 कॉल कनेक्ट करें"
      },
      ta: {
        welcomeTitle: "வெதர் ஜிபிடி வானிலை மற்றும் பேரிடர் முனையம்",
        welcomeDesc: "<strong>வெதர் ஜிபிடி (WeatherGPT)</strong> க்கு வரவேற்கிறோம். பாரத்-எஃப்எஸ் வானிலை கணிப்பு, ஐஎம்டி புள்ளிவிவரங்கள் மற்றும் சச்செட் பேரிடர் எச்சரிக்கைகளை இணைத்து வழங்கப்படும் வானிலை ஆலோசனை முனையம்.",
        quickPesticide: "{city} பகுதியில் இன்று பூச்சிக்கொல்லி மருந்து தெளிக்கலாமா?",
        quickMarine: "மீனவர்களுக்கான கடல் அலை மற்றும் சூறாவளி காற்று எச்சரிக்கை",
        quickHeat: "வெப்ப அலை மற்றும் புற ஊதாக் கதிர்வீச்சு தாக்கம்",
        quickFlood: "பேரிடர் எச்சரிக்கை மற்றும் கனமழை முன்னறிவிப்பு",
        inputPlaceholder: "தமிழில் கேளுங்கள் (उदा. இன்று மழை பெய்யுமா? அறுவடை செய்யலாமா?)",
        transmit: "அனுப்புக",
        topBarDirectives: "செயல்பாட்டு வழிமுறைகள்",
        drawerWarning: "வானிலை எச்சரிக்கை: மேற்கு-மத்திய வங்காள விரிகுடாவில் ஆழ்ந்த காற்றழுத்த தாழ்வு மண்டலம். கடலோரப் பகுதிகளில் 55-65 கிமீ/மணி வேகத்தில் பலத்த காற்று.",
        drawerDesc: "தேசிய பேரிடர் மேலாண்மை ஆணையம் (NDMA) பொது எச்சரிக்கை நெறிமுறை (CAP v1.2) நேரடி ஆலோசனை. விவசாயம், கடலோர மீன்பிடி மற்றும் நகர்ப்புற உள்ளாட்சி அமைப்புகளுக்கான வழிகாட்டுதல்கள் தீவிரப்படுத்தப்பட்டுள்ளன.",
        viewRoleDirectives: "பணி வழிகாட்டுதல்களைக் காண்க",
        topBarSub: "உரையாடல் வானிலை மற்றும் பேரிடர் நுண்ணறிவு தளம்",
        topBarTag: "மிஷன் மௌசம் • பாரத்-எஃப்எஸ் • ஐஎம்டி வானிலை • என்டிஎம்ஏ சச்செட்",
        headerKicker: "வெதர் ஜிபிடி • வானிலை பகுப்பாய்வு இயந்திரம்",
        headerLayer: "அனைத்திந்திய ஒருங்கிணைந்த தளம்",
        headerTitle: "உரையாடல் வானிலை மற்றும் பேரிடர் நுண்ணறிவு",
        headerDesc: "பாரத்-எஃப்எஸ் வானிலை மாதிரி, மேக்தூத் வேளாண் வானிலை, தாமினி மின்னல் மற்றும் என்டிஎம்ஏ பேரிடர் எச்சரிக்கைகளை துறைசார் வழிகாட்டுதல்களாக மாற்றுகிறது",
        navRoleDirectives: "பணி வழிகாட்டுதல்கள்",
        navRural: "கிராமப்புற தொலைபேசி சேவை (IVR/SMS)",
        navHazard: "ஐஎம்டி பேரிடர் அட்லஸ்",
        workbenchTitle: "பணி அடிப்படையிலான செயல்பாட்டு வழிகாட்டு இயந்திரம்",
        workbenchBadge: "எச்சரிக்கை பகுப்பாய்வு",
        workbenchDesc: "ஒற்றை சிவப்பு/ஆரஞ்சு எச்சரிக்கை ஒரே நேரத்தில் துறைசார்ந்த செயல்பாட்டு வழிகாட்டுதல்களாக மாற்றப்படுகிறது",
        scenarioLabel: "செயல்பாட்டு சூழல்:",
        scenarioCyclone: "புயல் சிவப்பு எச்சரிக்கை (கடற்கரை)",
        scenarioFlood: "நகர்ப்புற பெருமழை (பெங்களூரு)",
        scenarioHeatwave: "கடும் வெப்ப அலை (தில்லி)",
        cardFarmerTitle: "விவசாயம் மற்றும் வேளாண் வானிலை",
        cardFarmerBadge: "விவசாயி பணி",
        cardFishermanTitle: "கடல் மற்றும் கடலோர பாதுகாப்பு",
        cardFishermanBadge: "மீனவர் பணி",
        cardCityTitle: "நகர்ப்புற உள்ளாட்சி மற்றும் பேரிடர் மேலாண்மை",
        cardCityBadge: "நகராட்சி பணி",
        copyBriefing: "அனைத்து வழிகாட்டுதல்களையும் நகலெடு",
        chatCardTitle: "வெதர் ஜிபிடி உரையாடல் வானிலை ஆய்வாளர்",
        aiOnline: "செயற்கை நுண்ணறிவு தயார்",
        chatCardSubtitle: "தன்னாட்சி வானிலை நுண்ணறிவு மற்றும் உரையாடல்",
        clearChat: "உரையாடலை அழிக்க",
        printRecord: "பதிவை அச்சிட",
        targetLabel: "📍 இடம்:",
        targetPlaceholder: "நகரம் அல்லது மாவட்டத்தை உள்ளிடவும் (எ.கா. பெங்களூரு, சென்னை, தில்லி)...",
        roleLensLabel: "பார்வை நோக்கம்:",
        roleFarmer: "விவசாயி",
        roleFisherman: "மீனவர்",
        roleCityOps: "நகராட்சி / நிர்வாகம்",
        rolePublic: "பொதுமக்கள்",
        thinkingText: "வெதர் ஜிபிடி பாரத்-எஃப்எஸ் மாதிரிகள் மற்றும் ஐஎம்டி புள்ளிவிவரங்களை பகுப்பாய்வு செய்கிறது...",
        suggestionsLabel: "பரிந்துரைகள்:",
        disasterRadarTitle: "சச்செட் / என்டிஎம்ஏ பேரிடர் ரேடார்",
        telemetryTitle: "வானிலை ஆய்வு மைய நேரடி தகவல்கள்",
        telemetrySub: "சென்சார் தகவல்கள்",
        inspectBtn: "ஆராய்க",
        scalesTitle: "வானிலை அளவீட்டு அளவுகோல்கள்",
        scalesSub: "தரநிலைகள்",
        footerRural: "கிராமப்புற ஐவிஆர் மற்றும் தொலைபேசி சேவை",
        ruralModalTitle: "கிராமப்புற தொலைபேசி சேவை (சாதாரண மொபைல் போன்கள்)",
        ruralTabIvr: "1. கட்டணமில்லா தொலைபேசி சேவை (1800-MAUSAM-AI)",
        ruralTabSms: "2. எஸ்எம்எஸ் & யுஎஸ்எஸ்டி தகவல்",
        ruralTabKrishi: "3. கிருஷி சகி கள உதவி",
        ivrCallBtn: "📞 இணைப்பைத் தொடங்கு"
      }
    };

    function setAppLanguage(lang) {
      currentLanguage = lang;
      document.documentElement.lang = lang;
      
      ["en", "hi", "ta"].forEach(l => {
        const btn = document.getElementById("lang-btn-" + l);
        if (btn) {
          if (l === lang) {
            btn.className = "px-2 py-0.5 rounded text-white bg-[#C97A2B] font-semibold transition";
          } else {
            btn.className = "px-2 py-0.5 rounded text-slate-300 hover:text-white transition";
          }
        }
      });

      const strings = I18N_STRINGS[lang] || I18N_STRINGS.en;
      
      // Update all elements with data-i18n
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (strings[key]) {
          el.textContent = strings[key];
        }
      });

      // Update all elements with data-i18n-placeholder
      document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (strings[key]) {
          el.setAttribute("placeholder", strings[key]);
        }
      });

      const city = getTargetCity();
      const input = document.getElementById("chat-input");
      if (input && !input.value.trim()) {
        input.placeholder = strings.inputPlaceholder;
      }
      const sendLabel = document.getElementById("send-label");
      if (sendLabel) {
        sendLabel.textContent = strings.transmit;
      }

      // Re-render suggestions
      const chipsBar = document.getElementById("suggestion-chips-bar");
      if (chipsBar) {
        const qP = strings.quickPesticide.replace('{city}', city);
        const qM = strings.quickMarine;
        const qH = strings.quickHeat;
        const qF = strings.quickFlood;
        chipsBar.innerHTML = \`
          <span class="text-[10px] font-bold text-[#5B6472] uppercase tracking-wider shrink-0">\${strings.suggestionsLabel}</span>
          <button type="button" onclick="quickAsk(this.getAttribute('data-prompt'))" data-prompt="\${encodeURIComponent(qP)}" class="px-2 py-0.5 bg-[#F5F6F3] hover:bg-slate-200 border border-[#E1E4DD] text-[#1B2A44] text-[11px] rounded-sm whitespace-nowrap">
            🌾 \${qP}
          </button>
          <button type="button" onclick="quickAsk(this.getAttribute('data-prompt'))" data-prompt="\${encodeURIComponent(qM)}" class="px-2 py-0.5 bg-[#F5F6F3] hover:bg-slate-200 border border-[#E1E4DD] text-[#1B2A44] text-[11px] rounded-sm whitespace-nowrap">
            ⚓ \${qM}
          </button>
          <button type="button" onclick="quickAsk(this.getAttribute('data-prompt'))" data-prompt="\${encodeURIComponent(qH)}" class="px-2 py-0.5 bg-[#F5F6F3] hover:bg-slate-200 border border-[#E1E4DD] text-[#1B2A44] text-[11px] rounded-sm whitespace-nowrap">
            🏃 \${qH}
          </button>
          <button type="button" onclick="quickAsk(this.getAttribute('data-prompt'))" data-prompt="\${encodeURIComponent(qF)}" class="px-2 py-0.5 bg-[#F5F6F3] hover:bg-slate-200 border border-[#E1E4DD] text-[#1B2A44] text-[11px] rounded-sm whitespace-nowrap">
            ⚠️ \${qF}
          </button>
        \`;
      }

      // Refresh directives cards in selected language
      if (typeof triggerRoleDirectives === "function") {
        triggerRoleDirectives(currentScenario);
      }
    }

    // 1. Endpoint Configuration
    function sanitizeUrl(url) {
      if (!url) return "";
      return url.trim().replace(/\\/+$/, "");
    }

    function getActiveBackendUrl() {
      const stored = localStorage.getItem("weathergpt_backend_url");
      if (stored && stored.trim()) {
        return sanitizeUrl(stored);
      }
      return window.location.origin;
    }

    // 2. City Aliases & Coordinates
    const KNOWN_PRESETS = {
      "bangalore": { lat: 12.9719, lon: 77.5937, label: "Bengaluru, Karnataka, India" },
      "bengaluru": { lat: 12.9719, lon: 77.5937, label: "Bengaluru, Karnataka, India" },
      "new delhi": { lat: 28.6139, lon: 77.2090, label: "New Delhi, Delhi, India" },
      "delhi": { lat: 28.6139, lon: 77.2090, label: "Delhi, India" },
      "mumbai": { lat: 19.0760, lon: 72.8777, label: "Mumbai, Maharashtra, India" },
      "chennai": { lat: 13.0827, lon: 80.2707, label: "Chennai, Tamil Nadu, India" },
      "kolkata": { lat: 22.5726, lon: 88.3639, label: "Kolkata, West Bengal, India" },
      "coimbatore": { lat: 11.0168, lon: 76.9558, label: "Coimbatore, Tamil Nadu, India" },
      "hyderabad": { lat: 17.3850, lon: 78.4867, label: "Hyderabad, Telangana, India" }
    };

    function getTargetCity() {
      const el = document.getElementById("location-input");
      return (el && el.value.trim()) ? el.value.trim() : "Bangalore";
    }

    function getSelectedSector() {
      const checked = document.querySelector('input[name="sector"]:checked');
      return checked ? checked.value : "farmer";
    }

    function applyPresetCity(city) {
      if (!city) return;
      document.getElementById("location-input").value = city;
      document.getElementById("station-city").value = city;
      document.getElementById("hazard-search-input").value = city;

      const norm = city.toLowerCase();
      if (KNOWN_PRESETS[norm]) {
        document.getElementById("disaster-lat").value = KNOWN_PRESETS[norm].lat;
        document.getElementById("disaster-lon").value = KNOWN_PRESETS[norm].lon;
      }
      handleSectorChange(getSelectedSector());
    }

    function handleSectorChange(sector) {
      const city = getTargetCity();
      const input = document.getElementById("chat-input");
      if (input && !input.value.trim()) {
        if (currentLanguage === "hi") {
          input.placeholder = "मौसम जीपीटी से " + city + " के मौसम के बारे में पूछें...";
        } else if (currentLanguage === "ta") {
          input.placeholder = city + " வானிலை பற்றி வெதர் ஜிபிடியிடம் கேளுங்கள்...";
        } else {
          if (sector === "farmer") {
            input.placeholder = "Ask about soil moisture, rain forecast, or crop spraying in " + city + "...";
          } else if (sector === "fisherman") {
            input.placeholder = "Ask about coastal wind gusts, squall alerts, or sea clearance for " + city + "...";
          } else if (sector === "city_ops") {
            input.placeholder = "Ask about municipal flood drainage, pump activation, or traffic alerts in " + city + "...";
          } else {
            input.placeholder = "Ask about current forecast, rain probability, and safety advisories for " + city + "...";
          }
        }
      }
    }

    function detectUserLocation() {
      if (!navigator.geolocation) {
        console.warn("Geolocation is not supported by your browser.");
        const locInput = document.getElementById("location-input");
        if (locInput) locInput.placeholder = "GPS unavailable - enter city manually";
        return;
      }
      const locInput = document.getElementById("location-input");
      const orig = locInput.value;
      locInput.value = "Detecting GPS location...";

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          document.getElementById("disaster-lat").value = lat.toFixed(4);
          document.getElementById("disaster-lon").value = lon.toFixed(4);
          locInput.value = lat.toFixed(4) + ", " + lon.toFixed(4);
          document.getElementById("station-city").value = lat.toFixed(4) + ", " + lon.toFixed(4);
        },
        (err) => {
          locInput.value = orig;
          console.warn("Geolocation denied or unavailable:", err);
        },
        { timeout: 8000 }
      );
    }

    // 3. Clean Weather Output Markdown Formatter (Eliminates Raw Asterisks)
    function stripAsterisks(str) {
      if (!str) return "";
      return str.split("*").join("");
    }

    function formatInlineStyles(str) {
      if (!str) return "";
      const boldRegex = new RegExp("\\\\*\\\\*([^\\\\*]+)\\\\*\\\\*", "g");
      const italicRegex = new RegExp("\\\\*([^\\\\*]+)\\\\*", "g");
      let res = str.replace(boldRegex, "<strong class='font-semibold text-[#1B2A44]'>$1</strong>");
      res = res.replace(italicRegex, "<em class='italic text-slate-800'>$1</em>");
      return stripAsterisks(res);
    }

    function renderWeatherMarkdown(rawText) {
      if (!rawText) return "";
      const lines = rawText.split(String.fromCharCode(10));
      const processed = [];
      let inList = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trimEnd();

        if (line.startsWith("### ")) {
          if (inList) { processed.push("</ul>"); inList = false; }
          const h3 = stripAsterisks(line.slice(4));
          processed.push("<div class='font-bold text-xs uppercase tracking-wider text-[#1B2A44] mt-3 mb-1 pb-1 border-b border-[#E1E4DD] flex items-center gap-1.5'><span>🔹</span><span>" + h3 + "</span></div>");
          continue;
        }
        if (line.startsWith("## ")) {
          if (inList) { processed.push("</ul>"); inList = false; }
          const h2 = stripAsterisks(line.slice(3));
          processed.push("<div class='font-bold text-sm text-[#1B2A44] mt-3.5 mb-1.5 pb-1 border-b border-[#E1E4DD] flex items-center gap-1.5 font-serif'><span>📡</span><span>" + h2 + "</span></div>");
          continue;
        }
        if (line.startsWith("# ")) {
          if (inList) { processed.push("</ul>"); inList = false; }
          const h1 = stripAsterisks(line.slice(2));
          processed.push("<div class='font-bold text-base text-[#1B2A44] mt-4 mb-2'>" + h1 + "</div>");
          continue;
        }

        const isBullet = line.startsWith("* ") || line.startsWith("- ") || line.startsWith("• ");
        if (isBullet) {
          if (!inList) {
            processed.push("<ul class='my-2 space-y-1 pl-1'>");
            inList = true;
          }
          const itemContent = formatInlineStyles(line.slice(2));
          processed.push("<li class='flex items-start gap-2 text-slate-700 leading-relaxed text-[13px]'><span class='text-[#1B2A44] font-bold shrink-0 mt-0.5'>•</span><span>" + itemContent + "</span></li>");
          continue;
        }

        if (inList) {
          processed.push("</ul>");
          inList = false;
        }

        if (!line.trim()) {
          continue;
        }

        const p = formatInlineStyles(line);

        // Highlight Callout Cards for Clearances & Warnings
        if (p.includes("✅") || p.includes("Departure Clearance") || p.includes("Feasible") || p.includes("Spray Feasible")) {
          processed.push("<div class='p-2.5 my-2 bg-emerald-50 border-l-4 border-[#3F6B4A] text-emerald-950 text-xs rounded-r font-medium leading-relaxed'>" + p + "</div>");
        } else if (p.includes("⚠️") || p.includes("Warning") || p.includes("Caution") || p.includes("Risk") || p.includes("Squall") || p.includes("BAN")) {
          processed.push("<div class='p-2.5 my-2 bg-amber-50 border-l-4 border-[#B8860B] text-amber-950 text-xs rounded-r font-medium leading-relaxed'>" + p + "</div>");
        } else if (p.includes("💧") || p.includes("🌧️") || p.includes("Irrigation") || p.includes("Precipitation")) {
          processed.push("<div class='p-2.5 my-2 bg-blue-50 border-l-4 border-blue-600 text-blue-950 text-xs rounded-r font-medium leading-relaxed'>" + p + "</div>");
        } else {
          processed.push("<p class='my-1.5 leading-relaxed text-slate-700 text-[13px]'>" + p + "</p>");
        }
      }

      if (inList) {
        processed.push("</ul>");
      }

      return processed.join("");
    }

    // 4. Chatbot Conversation Management
    let chatHistory = [];
    try {
      const saved = localStorage.getItem("weathergpt_chat_history");
      if (saved) {
        chatHistory = JSON.parse(saved);
      }
    } catch(e) {
      chatHistory = [];
    }

    function saveChatHistory() {
      try {
        localStorage.setItem("weathergpt_chat_history", JSON.stringify(chatHistory.slice(-20)));
      } catch(e) {}
    }

    function renderWelcomeMessage() {
      const city = getTargetCity();
      const strings = I18N_STRINGS[currentLanguage] || I18N_STRINGS.en;
      const qPesticide = strings.quickPesticide.replace('{city}', city);
      const qMarine = strings.quickMarine;
      const qHeat = strings.quickHeat;
      const qFlood = strings.quickFlood;
      return \`
        <div class="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-xl shadow-xs space-y-3">
          <div class="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <div class="font-semibold text-xs text-slate-800">\${strings.welcomeTitle}</div>
            <span class="text-[10px] text-slate-400 font-mono">ONLINE</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            \${strings.welcomeDesc}
          </p>
          <div class="bg-slate-50/70 p-3 space-y-2 rounded-lg border border-slate-200/60">
            <div class="text-[10.5px] font-semibold text-slate-500 uppercase tracking-wider">Quick Inquiries:</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button onclick="quickAsk(this.getAttribute('data-prompt'))" data-prompt="\${encodeURIComponent(qPesticide)}" class="text-left p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-[11px] flex items-center gap-2 transition shadow-2xs">
                <span>🌾</span> <span>\${qPesticide}</span>
              </button>
              <button onclick="quickAsk(this.getAttribute('data-prompt'))" data-prompt="\${encodeURIComponent(qMarine)}" class="text-left p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-[11px] flex items-center gap-2 transition shadow-2xs">
                <span>⚓</span> <span>\${qMarine}</span>
              </button>
              <button onclick="quickAsk(this.getAttribute('data-prompt'))" data-prompt="\${encodeURIComponent(qHeat)}" class="text-left p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-[11px] flex items-center gap-2 transition shadow-2xs">
                <span>🏃</span> <span>\${qHeat}</span>
              </button>
              <button onclick="quickAsk(this.getAttribute('data-prompt'))" data-prompt="\${encodeURIComponent(qFlood)}" class="text-left p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-[11px] flex items-center gap-2 transition shadow-2xs">
                <span>⚠️</span> <span>\${qFlood}</span>
              </button>
            </div>
          </div>
        </div>
      \`;
    }

    function appendMessageToThread(role, text, metadata = {}) {
      const thread = document.getElementById("chat-thread");
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (role === "user") {
        const userDiv = document.createElement("div");
        userDiv.className = "flex flex-col items-end space-y-1";
        userDiv.innerHTML = \`
          <div class="flex items-center gap-1.5 text-[10px] text-slate-400 mr-1">
            <span class="font-semibold text-slate-700">You</span>
            <span>•</span>
            <span class="bg-white border border-slate-200 px-1.5 py-0.2 rounded font-medium text-slate-600">📍 \${metadata.city || getTargetCity()}</span>
            <span>•</span>
            <span class="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-medium uppercase">\${metadata.sector || getSelectedSector()}</span>
            <span>•</span>
            <span>\${timeStr}</span>
          </div>
          <div class="max-w-[88%] bg-[#1B2A44] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs shadow-xs text-xs leading-relaxed">
            \${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
          </div>
        \`;
        thread.appendChild(userDiv);
      } else {
        const asstDiv = document.createElement("div");
        asstDiv.className = "flex flex-col items-start space-y-1";
        const formattedHtml = renderWeatherMarkdown(text);

        asstDiv.innerHTML = \`
          <div class="flex items-center gap-1.5 text-[10px] text-slate-400 ml-1">
            <span class="font-semibold text-slate-700">WeatherGPT Advisory</span>
            <span>•</span>
            <span class="text-emerald-700 font-medium font-mono">BharatFS</span>
            <span>•</span>
            <span>\${timeStr}</span>
          </div>
          <div class="max-w-[94%] bg-white border border-slate-200/90 p-4 sm:p-5 rounded-2xl rounded-tl-xs shadow-xs text-slate-800 text-xs leading-relaxed space-y-2">
            \${formattedHtml}
            <div class="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span class="font-mono">WMO SYNOPTIC COMPLIANT</span>
              <div class="flex items-center gap-3">
                <button onclick="speakWeatherMessage(this)" data-text="\${encodeURIComponent(text)}" class="hover:text-[#1B2A44] font-medium flex items-center gap-1 text-slate-600 hover:text-slate-900">
                  <span>🔊</span> Listen
                </button>
                <button onclick="copyAdvisory(this)" data-text="\${encodeURIComponent(text)}" class="hover:text-[#1B2A44] font-medium flex items-center gap-1 text-slate-600 hover:text-slate-900">
                  <span>📋</span> Copy Text
                </button>
              </div>
            </div>
          </div>
        \`;
        thread.appendChild(asstDiv);
      }

      thread.scrollTop = thread.scrollHeight;
    }

    function copyAdvisory(btn) {
      try {
        const text = decodeURIComponent(btn.getAttribute("data-text"));
        navigator.clipboard.writeText(text);
        const orig = btn.innerHTML;
        btn.innerHTML = "<span>✓</span> Copied";
        setTimeout(() => { btn.innerHTML = orig; }, 1800);
      } catch(e) {}
    }

    // Voice Text-To-Speech (Section 4.8)
    function speakWeatherMessage(btn) {
      try {
        const text = decodeURIComponent(btn.getAttribute("data-text"));
        if (!window.speechSynthesis) {
          console.warn("Speech synthesis is not supported on this browser.");
          btn.innerHTML = "<span>⚠️</span> Audio Unavailable";
          setTimeout(() => { btn.innerHTML = "<span>🔊</span> Listen"; }, 2000);
          return;
        }
        window.speechSynthesis.cancel(); // stop previous
        const clean = text.split("*").join("").replace(/###/g, "").replace(/##/g, "");
        const utterance = new SpeechSynthesisUtterance(clean.substring(0, 450));
        
        if (currentLanguage === "hi") {
          utterance.lang = "hi-IN";
        } else if (currentLanguage === "ta") {
          utterance.lang = "ta-IN";
        } else {
          utterance.lang = "en-IN";
        }
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);

        const orig = btn.innerHTML;
        btn.innerHTML = "<span>🔊</span> Speaking...";
        utterance.onend = () => { btn.innerHTML = orig; };
        utterance.onerror = () => { btn.innerHTML = orig; };
      } catch(e) {
        console.warn("TTS error:", e);
      }
    }

    // Voice Speech-To-Text Dictation (Section 4.8)
    let recognitionInstance = null;
    let isRecording = false;

    function toggleVoiceRecognition() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const micBtn = document.getElementById("voice-mic-btn");
      const micIcon = document.getElementById("mic-icon");
      const input = document.getElementById("chat-input");

      if (!SpeechRecognition) {
        console.warn("Speech recognition is not supported in this browser.");
        if (input) {
          const origPlaceholder = input.placeholder;
          input.placeholder = "Speech dictation unavailable in this browser — type here";
          setTimeout(() => { input.placeholder = origPlaceholder; }, 3000);
        }
        return;
      }

      if (isRecording && recognitionInstance) {
        recognitionInstance.stop();
        isRecording = false;
        micBtn.classList.remove("bg-red-500", "text-white", "animate-pulse");
        micIcon.textContent = "🎙️";
        return;
      }

      recognitionInstance = new SpeechRecognition();
      if (currentLanguage === "hi") {
        recognitionInstance.lang = "hi-IN";
      } else if (currentLanguage === "ta") {
        recognitionInstance.lang = "ta-IN";
      } else {
        recognitionInstance.lang = "en-IN";
      }

      recognitionInstance.interimResults = true;

      recognitionInstance.onstart = () => {
        isRecording = true;
        micBtn.classList.add("bg-red-500", "text-white", "animate-pulse");
        micIcon.textContent = "⏹️";
      };

      recognitionInstance.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        input.value = transcript;
      };

      recognitionInstance.onerror = (e) => {
        console.warn("STT error:", e);
        isRecording = false;
        micBtn.classList.remove("bg-red-500", "text-white", "animate-pulse");
        micIcon.textContent = "🎙️";
      };

      recognitionInstance.onend = () => {
        isRecording = false;
        micBtn.classList.remove("bg-red-500", "text-white", "animate-pulse");
        micIcon.textContent = "🎙️";
      };

      recognitionInstance.start();
    }

    function initChatUI() {
      const thread = document.getElementById("chat-thread");
      thread.innerHTML = renderWelcomeMessage();

      if (chatHistory && chatHistory.length > 0) {
        chatHistory.forEach(item => {
          appendMessageToThread(item.role, item.text, item.metadata || {});
        });
      }
    }

    function clearChatHistory() {
      chatHistory = [];
      localStorage.removeItem("weathergpt_chat_history");
      initChatUI();
    }

    function printChatTranscript() {
      window.print();
    }

    function quickAsk(promptText) {
      if (!promptText) return;
      let decoded = promptText;
      try {
        if (typeof promptText === "string" && (promptText.includes("%20") || promptText.includes("%"))) {
          decoded = decodeURIComponent(promptText);
        }
      } catch (e) {
        decoded = promptText;
      }
      const input = document.getElementById("chat-input");
      if (input) {
        input.value = decoded;
        const form = document.getElementById("chat-form");
        if (form) {
          form.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      }
    }

    async function handleChatSubmit(event) {
      event.preventDefault();
      const input = document.getElementById("chat-input");
      const userText = input.value.trim();
      if (!userText) return;

      input.value = "";
      const city = getTargetCity();
      const sector = getSelectedSector();

      // Append User message
      appendMessageToThread("user", userText, { city, sector });
      chatHistory.push({ role: "user", text: userText, metadata: { city, sector } });
      saveChatHistory();

      // UI States
      const thinking = document.getElementById("chat-thinking");
      const sendBtn = document.getElementById("chat-send-btn");
      thinking.classList.remove("hidden");
      sendBtn.disabled = true;

      // Generate or retrieve persistent conversation session
      let convId = localStorage.getItem("weathergpt_conv_id");
      if (!convId) {
        convId = "conv_" + Math.random().toString(36).substring(2, 10);
        localStorage.setItem("weathergpt_conv_id", convId);
      }
      document.getElementById("session-id-display").textContent = "SESSION: " + convId.slice(0, 10);

      // Contextual prompt with role and location if not present
      let finalMessage = userText;
      if (!userText.toLowerCase().includes(city.toLowerCase()) && !userText.includes("📍")) {
        finalMessage = userText + " (Target Location: " + city + ", Role Lens: " + sector + ", Preferred Language: " + currentLanguage + ")";
      }

      const backendUrl = getActiveBackendUrl();

      try {
        const response = await fetch(backendUrl + "/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversation_id: convId,
            message: finalMessage,
            user_id: "public_citizen"
          })
        });

        if (!response.ok) {
          throw new Error("HTTP error " + response.status + ": " + (await response.text()));
        }

        const data = await response.json();
        const reply = data.reply || "No reply returned from server.";

        appendMessageToThread("assistant", reply, { city, sector });
        chatHistory.push({ role: "assistant", text: reply, metadata: { city, sector } });
        saveChatHistory();
      } catch (err) {
        console.error("Chat error:", err);
        const isCloudflareOrStatic = window.location.hostname.includes("pages.dev") || window.location.hostname.includes("cloudflare");
        const helperNote = isCloudflareOrStatic && !localStorage.getItem("weathergpt_backend_url")
          ? "\\n\\n💡 Tip for Cloudflare Pages: Click the ⚙️ API button in the navbar to configure your live backend service URL."
          : "";
        const errReply = "⚠️ **Connection Notice:** Unable to reach WeatherGPT backend at " + backendUrl + ". " + (err.message || err) + helperNote;
        appendMessageToThread("assistant", errReply, { city, sector });
      } finally {
        thinking.classList.add("hidden");
        sendBtn.disabled = false;
        input.focus();
      }
    }

    // 5. Role-Based Operational Directives Controller (Section 4.4 & 8.4)
    const ROLE_DIRECTIVE_SCENARIOS = {
      cyclone: {
        en: {
          event: "Extremely Severe Cyclonic Storm & Storm Surge (Red Alert)",
          area: "Coastal Odisha & Northern Andhra Pradesh",
          meta: "Source: NDMA SACHET CAP v1.2 + BharatFS Cyclone Track (±12km ensemble spread)",
          farmer: {
            directive: "Emergency harvest of mature paddy within 18 hours; pause all agro-chemical spraying and secure livestock.",
            checklist: [
              "Dig 30cm peripheral trenches to stop prolonged root submergence",
              "Zero pesticide or fertilizer application (drift & immediate washout risk)",
              "Evacuate livestock to high-ground pucca shelters with stored dry fodder"
            ],
            status: "Spraying: SUSPENDED"
          },
          fisherman: {
            directive: "TOTAL SEA BAN: Coastal squalls exceeding 75 km/h with rough sea state. Return to harbor by 18:00 IST.",
            checklist: [
              "Total suspension of deep-sea and coastal fishing operations",
              "Moor fiber boats and catamarans securely above high spring-tide line",
              "Keep marine VHF tuned to Coast Guard Channel 16 for SAR updates"
            ],
            status: "Departure: TOTAL BAN"
          },
          city_ops: {
            directive: "ACTIVATE MUNICIPAL DRAINAGE PROTOCOL: Mobilize heavy dewatering pumps to chronic low-lying wards.",
            checklist: [
              "Station 100-HP diesel pumps at known inundation railway underpasses",
              "Pre-position NDRF and Civil Defense boats in vulnerable wards",
              "Broadcast real-time road diversion alerts for submerged arterial routes"
            ],
            status: "Alert: CODE RED"
          }
        },
        hi: {
          event: "अत्यंत गंभीर चक्रवाती तूफान और तूफानी लहरें (रेड अलर्ट)",
          area: "तटीय ओडिशा एवं उत्तरी आंध्र प्रदेश",
          meta: "स्रोत: एनडीएमए सचेत सीएपी v1.2 + भारत-एफएस चक्रवात पथ (±12 किमी फैलाव)",
          farmer: {
            directive: "18 घंटों के भीतर पकी धान की फसल की आपातकालीन कटाई करें; सभी कीटनाशक छिड़काव रोकें और मवेशियों को सुरक्षित रखें।",
            checklist: [
              "जड़ों के जलभराव को रोकने के लिए मेड़ों के किनारे 30 सेमी गहरी जल निकासी नालियां बनाएं",
              "48 घंटों तक किसी भी कीटनाशक या उर्वरक का छिड़काव न करें (हवा में बहने और धुलने का खतरा)",
              "मवेशियों को सूखे चारे के साथ ऊंचे पक्के आश्रयों में स्थानांतरित करें"
            ],
            status: "छिड़काव: स्थगित"
          },
          fisherman: {
            directive: "समुद्र में जाने पर पूर्ण प्रतिबंध: 75 किमी/घंटे से अधिक तेज तूफानी हवाएं। शाम 18:00 बजे तक बंदरगाह लौटें।",
            checklist: [
              "गहरे समुद्र और तटीय मछली पकड़ने के सभी कार्य तुरंत स्थगित करें",
              "फाइबर नौकाओं और नावों को उच्च ज्वार रेखा से ऊपर सुरक्षित बांधें",
              "तटरक्षक खोज व बचाव हेतु मरीन वीएचएफ चैनल 16 चालू रखें"
            ],
            status: "रवानगी: पूर्ण प्रतिबंध"
          },
          city_ops: {
            directive: "नगर निगम जल निकासी प्रोटोकॉल सक्रिय करें: जलभराव वाले निचले वार्डों में भारी पंप तैनात करें।",
            checklist: [
              "रेलवे अंडरपास और संवेदनशील चौराहों पर 100-एचपी डीजल पंप तैनात करें",
              "संवेदनशील वार्डों में एनडीआरएफ और नागरिक सुरक्षा बचाव नौकाएं पहले से तैनात करें",
              "जलमग्न मुख्य मार्गों के लिए वास्तविक समय में यातायात डायवर्जन जारी करें"
            ],
            status: "चेतावनी: कोड रेड"
          }
        },
        ta: {
          event: "மிக தீவிர புயல் மற்றும் கடல் கொந்தளிப்பு (சிவப்பு எச்சரிக்கை)",
          area: "கடலோர ஒடிசா மற்றும் வடக்கு ஆந்திர பிரதேசம்",
          meta: "ஆதாரம்: என்டிஎம்ஏ சச்செட் சிஏபி v1.2 + பாரத்-எஃப்எஸ் புயல் பாதை (±12 கிமீ)",
          farmer: {
            directive: "18 மணி நேரத்திற்குள் பழுத்த நெல் பயிரை அவசரமாக அறுவடை செய்யவும்; பூச்சிக்கொல்லி மருந்து தெளிப்பதை நிறுத்தி கால்நடைகளைப் பாதுகாக்கவும்.",
            checklist: [
              "வேர் அழுகலைத் தடுக்க வரப்புகளில் 30 செ.மீ வடிகால் வாய்க்கால்களை வெட்டவும்",
              "பூச்சிக்கொல்லி அல்லது உரமிடுவதை உடனடியாக தவிர்க்கவும் (காற்று மற்றும் மழையால் அடித்துச் செல்லப்படும் அபாயம்)",
              "கால்நடைகளை மேடான கான்கிரீட் கொட்டகைகளுக்கு மாற்றவும்"
            ],
            status: "மருந்து தெளித்தல்: நிறுத்திவைப்பு"
          },
          fisherman: {
            directive: "கடலுக்குச் செல்ல முழு தடை: 75 கிமீ/மணி வேகத்தில் பலத்த சூறாவளி காற்று. மாலை 18:00 மணிக்குள் கரை திரும்புங்கள்.",
            checklist: [
              "ஆழ்கடல் மற்றும் கடலோர மீன்பிடி நடவடிக்கைகளை முழுமையாக நிறுத்தவும்",
              "படகுகளை உயர் அலை வரம்பிற்கு மேல் பாதுகாப்பாக கட்டி வைக்கவும்",
              "கடலோர காவல்படை சேனல் 16-ஐ தொடர்ந்து கவனிக்கவும்"
            ],
            status: "புறப்பாடு: முழு தடை"
          },
          city_ops: {
            directive: "நகராட்சி வடிகால் அவசர திட்டத்தை செயல்படுத்துக: தாழ்வான பகுதிகளில் அதிக திறன் கொண்ட நீர் இறைக்கும் பம்புகளை தயார் செய்க.",
            checklist: [
              "தண்ணீர் தேங்கும் ரயில்வே பாலங்கள் அருகே 100-HP பம்புகளை நிறுவவும்",
              "பாதிக்கப்படக்கூடிய பகுதிகளில் பேரிடர் மீட்புப் படகுகளை முன்கூட்டியே தயார் நிலையில் வைக்கவும்",
              "போக்குவரத்து மாற்று வழிகள் குறித்த அறிவிப்புகளை வெளியிடவும்"
            ],
            status: "எச்சரிக்கை: ரெட் அலர்ட்"
          }
        }
      },
      flood: {
        en: {
          event: "Monsoon Convective Torrential Downpour & Flash Floods",
          area: "Bengaluru Urban & Hebbal Catchment",
          meta: "Source: IMD Doppler Radar & Nowcast (14:00 IST) + Hazard Atlas Historical Normals",
          farmer: {
            directive: "Drain excess water from horticultural and vegetable beds; delay fertilizer application by 48 hours.",
            checklist: [
              "Clear soil drainage furrows to prevent seedling root asphyxiation",
              "Suspend foliar fungicide sprays until rainfall ceases completely",
              "Inspect bund structural stability along field margins"
            ],
            status: "Spraying: DELAYED"
          },
          fisherman: {
            directive: "INLAND RESERVOIR WARNING: High surface turbulence and sudden surge in lake and reservoir outfalls.",
            checklist: [
              "Halt coracle and freshwater artisanal netting on lakes and dams",
              "Watch for rapid reservoir spillway shutter openings",
              "Secure nylon gill nets away from flooded shorelines"
            ],
            status: "Freshwater: RESTRICTED"
          },
          city_ops: {
            directive: "ACTIVATE WARD SUMP PUMPING: High risk of underpass waterlogging on Outer Ring Road.",
            checklist: [
              "Switch on automatic sump pumps at chronic underpasses",
              "Alert traffic police to divert traffic around flooded lake overflows",
              "Desilt stormwater drain entry grates from urban debris"
            ],
            status: "Alert: CODE ORANGE"
          }
        },
        hi: {
          event: "मानसून की मूसलाधार बारिश और अचानक बाढ़ का खतरा",
          area: "बेंगलुरु शहरी एवं हेब्बल जलग्रहण क्षेत्र",
          meta: "स्रोत: आईएमडी डॉपलर रडार व नाउकास्ट + आपदा एटलस ऐतिहासिक रिकॉर्ड",
          farmer: {
            directive: "सब्जियों और बागवानी क्यारियों से अतिरिक्त पानी निकालें; उर्वरक का प्रयोग 48 घंटे टालें।",
            checklist: [
              "पौधों की जड़ों को गलने से बचाने के लिए जल निकासी नालियों को तुरंत साफ करें",
              "बारिश पूरी तरह रुकने तक पत्तियों पर फफूंदनाशक का छिड़काव स्थगित रखें",
              "खेत की मेड़ों की स्थिरता की जांच करें"
            ],
            status: "छिड़काव: स्थगित"
          },
          fisherman: {
            directive: "जलाशय चेतावनी: झीलों और जलाशयों में भारी उफान और तेज बहाव की संभावना।",
            checklist: [
              "झीलों और बांधों में छोटी नावों और मछली पकड़ने के जालों का उपयोग रोकें",
              "जलाशय के स्पिलवे गेट तेजी से खुलने पर सतर्क रहें",
              "बाढ़ वाले किनारों से नायलॉन के जालों को सुरक्षित ऊंचाई पर रखें"
            ],
            status: "जलाशय: प्रतिबंधित"
          },
          city_ops: {
            directive: "वार्ड संप पंपिंग सक्रिय करें: आउटर रिंग रोड और अंडरपासों में गंभीर जलभराव का खतरा।",
            checklist: [
              "प्रमुख अंडरपासों पर स्वचालित संप पंप तुरंत चालू करें",
              "झीलों के ओवरफ्लो होने पर ट्रैफिक पुलिस को मार्ग मोड़ने के निर्देश दें",
              "तूफानी नालों की जालियों से कचरा साफ करें"
            ],
            status: "चेतावनी: कोड ऑरेंज"
          }
        },
        ta: {
          event: "பருவமழை பெருவெள்ளம் மற்றும் மேகவெடிப்பு எச்சரிக்கை",
          area: "பெங்களூரு நகர்ப்புறம் மற்றும் ஹெப்பல் வடிநிலம்",
          meta: "ஆதாரம்: ஐஎம்டி டாப்ளர் ரேடார் மற்றும் வானிலை முன்னறிவிப்பு",
          farmer: {
            directive: "தோட்டக்கலை மற்றும் காய்கறி பயிர்களில் இருந்து தேங்கிய நீரை வெளியேற்றவும்; உரமிடுவதை 48 மணி நேரம் தள்ளிப்போடவும்.",
            checklist: [
              "நாற்றுகள் அழுகாமல் இருக்க வயல் வடிகால்களை உடனடியாக தூர்வாரவும்",
              "மழை முழுமையாக நிற்கும் வரை பூஞ்சாணக் கொல்லி மருந்து தெளிக்க வேண்டாம்",
              "வயல் வரப்புகளின் உறுதியை சரிபார்க்கவும்"
            ],
            status: "மருந்து தெளித்தல்: தள்ளிவைப்பு"
          },
          fisherman: {
            directive: "உள்நாட்டு நீர்நிலை எச்சரிக்கை: ஏரிகள் மற்றும் அணைகளில் நீர்மட்டம் உயர்வு.",
            checklist: [
              "ஏரிகளில் பரிசல் மற்றும் மீன்பிடி வலைகளைப் பயன்படுத்துவதை தவிர்க்கவும்",
              "அணை மதகுகள் திறக்கப்படும் அபாயத்தை கண்காணிக்கவும்",
              "மீன்பிடி வலைகளை பாதுகாப்பான இடங்களுக்கு மாற்றவும்"
            ],
            status: "உள்நாட்டு மீன்பிடி: தடை"
          },
          city_ops: {
            directive: "நகர நீர் இறைக்கும் பம்புகளை இயக்கவும்: முக்கிய சாலைகள் மற்றும் சுரங்கப்பாதைகளில் நீர் தேங்கும் அபாயம்.",
            checklist: [
              "சுரங்கப்பாதைகளில் தானியங்கி நீர் இறைக்கும் பம்புகளை இயக்கவும்",
              "போக்குவரத்து நெரிசலைத் தவிர்க்க மாற்று வழிகளை அறிவிக்கவும்",
              "மழைநீர் வடிகால் வாயில்களில் உள்ள குப்பைகளை அகற்றவும்"
            ],
            status: "எச்சரிக்கை: ஆரஞ்சு அலர்ட்"
          }
        }
      },
      heatwave: {
        en: {
          event: "Severe Heatwave & Evapotranspiration Surge (Loo Conditions)",
          area: "New Delhi & NCR Region",
          meta: "Source: IMD Heat Action Plan Bulletin + BharatFS Thermal Forecast",
          farmer: {
            directive: "Apply nocturnal irrigation (03:00 - 06:00 IST); mulch topsoil to preserve root zone moisture.",
            checklist: [
              "Apply straw mulch to conserve 0-6cm topsoil moisture",
              "Provide shaded shelters and continuous cool water for milch cattle",
              "Strictly avoid field labor during peak thermal window (11:30 - 15:30)"
            ],
            status: "Labor: NOCTURNAL SHIFT"
          },
          fisherman: {
            directive: "AQUACULTURE ADVISORY: Pond water temperature exceeding 33°C. Risk of dissolved oxygen depletion.",
            checklist: [
              "Run pond paddle aerators during early dawn hours",
              "Add freshwater recharge to maintain pond depth > 1.5m",
              "Reduce feed ration by 30% to prevent unconsumed waste decomposition"
            ],
            status: "Aquaculture: HIGH STRESS"
          },
          city_ops: {
            directive: "ACTIVATE HEAT ACTION PLAN (HAP): Open public hydration stations and misting shelters.",
            checklist: [
              "Establish ORS kiosks at major transit interchanges",
              "Ensure uninterrupted municipal power supply to emergency hospital wards",
              "Enforce mandatory rest breaks for outdoor construction laborers"
            ],
            status: "Alert: CODE ORANGE"
          }
        },
        hi: {
          event: "भीषण लू एवं अत्यधिक वाष्पीकरण की स्थिति",
          area: "नई दिल्ली एवं राष्ट्रीय राजधानी क्षेत्र (NCR)",
          meta: "स्रोत: आईएमडी हीट एक्शन प्लान बुलेटिन + भारत-एफएस थर्मल पूर्वानुमान",
          farmer: {
            directive: "रात के समय सिंचाई करें (03:00 - 06:00 बजे); नमी बनाए रखने के लिए मिट्टी में पुआल की मल्चिंग करें।",
            checklist: [
              "मिट्टी की नमी बचाने के लिए 0-6 सेमी पुआल या पत्तों की मल्चिंग करें",
              "दुधारू पशुओं के लिए छायादार बाड़े और स्वच्छ शीतल जल की व्यवस्था करें",
              "दोपहर 11:30 से 15:30 के बीच खेत में शारीरिक श्रम से पूरी तरह बचें"
            ],
            status: "श्रम: रात्रि पाली"
          },
          fisherman: {
            directive: "मत्स्य पालन सलाह: तालाब का तापमान 33°C से अधिक। ऑक्सीजन की कमी का गंभीर खतरा।",
            checklist: [
              "सुबह तड़के तालाब के पैडल एरेटर चलाकर ऑक्सीजन स्तर बढ़ाएं",
              "तालाब की गहराई 1.5 मीटर से अधिक बनाए रखने के लिए ताजा पानी डालें",
              "भोजन की मात्रा में 30% की कटौती करें ताकि अपशिष्ट न सड़े"
            ],
            status: "मत्स्य पालन: अत्यधिक तनाव"
          },
          city_ops: {
            directive: "हीट एक्शन प्लान (HAP) लागू करें: सार्वजनिक पेयजल केंद्र और ओआरएस स्टॉल शुरू करें।",
            checklist: [
              "बस स्टैंड और मेट्रो स्टेशनों पर ओआरएस और शीतल जल कियोस्क स्थापित करें",
              "अस्पतालों के आपातकालीन वार्डों में निर्बाध बिजली व कूलिंग सुनिश्चित करें",
              "निर्माण श्रमिकों के लिए दोपहर में अनिवार्य विश्राम लागू करें"
            ],
            status: "चेतावनी: कोड ऑरेंज"
          }
        },
        ta: {
          event: "கடும் வெப்ப அலை மற்றும் நிலத்தடி நீர் ஆவியாதல் நிலை",
          area: "புது தில்லி மற்றும் தேசிய தலைநகர் பகுதி (NCR)",
          meta: "ஆதாரம்: ஐஎம்டி வெப்ப அலை திட்டம் மற்றும் பாரத்-எஃப்எஸ் மாதிரி",
          farmer: {
            directive: "இரவு அல்லது விடியற்காலை வேளையில் பாசனம் செய்யவும் (03:00 - 06:00); மண் ஈரப்பதத்தை பாதுகாக்க தழைக்கூளம் இடவும்.",
            checklist: [
              "மண்ணின் ஈரப்பதத்தை பாதுகாக்க வைக்கோல் கொண்டு மூடாக்கு இடவும்",
              "கால்நடைகளுக்கு நிழலான கொட்டகை மற்றும் தொடர்ச்சியான குடிநீர் வசதி அளிக்கவும்",
              "நண்பகல் 11:30 முதல் 15:30 வரை வெயிலில் கடுமையான வேலை செய்வதைத் தவிர்க்கவும்"
            ],
            status: "பணி: இரவு நேர மாற்றம்"
          },
          fisherman: {
            directive: "மீன் பண்ணை வழிகாட்டுதல்: குட்டை நீர் வெப்பநிலை 33°C-க்கு மேல் உயர்வு. ஆக்சிஜன் பற்றாக்குறை ஆபத்து.",
            checklist: [
              "விடியற்காலையில் குட்டைகளில் காற்று காற்றோட்ட கருவிகளை இயக்கவும்",
              "குட்டை ஆழத்தை 1.5 மீட்டருக்கு மேல் வைத்திருக்க புதிய நீரை நிரப்பவும்",
              "தீவன அளவை 30% குறைத்து நீர் மாசடைவதை தடுக்கவும்"
            ],
            status: "மீன்வளர்ப்பு: அதிக வெப்ப அழுத்தம்"
          },
          city_ops: {
            directive: "வெப்ப அலை தணிப்பு திட்டம் (HAP) செயல்படுத்துக: பொது குடிநீர் மற்றும் நிழல் கூடாரங்களை அமைக்கவும்.",
            checklist: [
              "முக்கிய போக்குவரத்து மையங்களில் ORS மற்றும் குடிநீர் மையங்களை திறக்கவும்",
              "மருத்துவமனைகளில் தொடர்ச்சியான மின்சாரம் மற்றும் குளிர்சாதன வசதியை உறுதி செய்க",
              "கட்டுமானத் தொழிலாளர்களுக்கு நண்பகல் கட்டாய ஓய்வு வழங்கவும்"
            ],
            status: "எச்சரிக்கை: ஆரஞ்சு அலர்ட்"
          }
        }
      }
    };

    function triggerRoleDirectives(scenarioKey) {
      currentScenario = scenarioKey || currentScenario || "cyclone";
      const scenarioBundle = ROLE_DIRECTIVE_SCENARIOS[currentScenario] || ROLE_DIRECTIVE_SCENARIOS.cyclone;
      const data = scenarioBundle[currentLanguage] || scenarioBundle.en;

      // Update Scenario Buttons Active Visual State
      const btnCyclone = document.getElementById("scenario-btn-cyclone");
      const btnFlood = document.getElementById("scenario-btn-flood");
      const btnHeatwave = document.getElementById("scenario-btn-heatwave");

      const inactiveBaseClass = "px-3 py-1.5 text-xs font-semibold rounded-md transition flex items-center gap-1.5 text-[#5B6472] hover:text-[#1B2A44] hover:bg-white/60";

      if (btnCyclone) {
        btnCyclone.className = (currentScenario === "cyclone") 
          ? "px-3 py-1.5 text-xs font-semibold rounded-md transition flex items-center gap-1.5 bg-[#B3261E] text-white shadow-xs" 
          : inactiveBaseClass;
      }
      if (btnFlood) {
        btnFlood.className = (currentScenario === "flood") 
          ? "px-3 py-1.5 text-xs font-semibold rounded-md transition flex items-center gap-1.5 bg-[#B8860B] text-white shadow-xs" 
          : inactiveBaseClass;
      }
      if (btnHeatwave) {
        btnHeatwave.className = (currentScenario === "heatwave") 
          ? "px-3 py-1.5 text-xs font-semibold rounded-md transition flex items-center gap-1.5 bg-[#C97A2B] text-white shadow-xs" 
          : inactiveBaseClass;
      }

      const metaEl = document.getElementById("fanout-meta-line");
      if (metaEl) metaEl.textContent = data.meta;

      // Update Farmer Card
      const farmDir = document.getElementById("fanout-farmer-directive");
      if (farmDir) farmDir.textContent = data.farmer.directive;
      const farmList = document.getElementById("fanout-farmer-checklist");
      if (farmList) {
        farmList.innerHTML = data.farmer.checklist.map(item => '<li class="flex items-start gap-1.5"><span>•</span><span>' + item + '</span></li>').join("");
      }
      const farmStat = document.getElementById("fanout-farmer-status");
      if (farmStat) farmStat.textContent = data.farmer.status;

      // Update Fisherman Card
      const fishDir = document.getElementById("fanout-fisherman-directive");
      if (fishDir) fishDir.textContent = data.fisherman.directive;
      const fishList = document.getElementById("fanout-fisherman-checklist");
      if (fishList) {
        fishList.innerHTML = data.fisherman.checklist.map(item => '<li class="flex items-start gap-1.5"><span>•</span><span>' + item + '</span></li>').join("");
      }
      const fishStat = document.getElementById("fanout-fisherman-status");
      if (fishStat) fishStat.textContent = data.fisherman.status;

      // Update City Ops Card
      const cityDir = document.getElementById("fanout-city-directive");
      if (cityDir) cityDir.textContent = data.city_ops.directive;
      const cityList = document.getElementById("fanout-city-checklist");
      if (cityList) {
        cityList.innerHTML = data.city_ops.checklist.map(item => '<li class="flex items-start gap-1.5"><span>•</span><span>' + item + '</span></li>').join("");
      }
      const cityStat = document.getElementById("fanout-city-status");
      if (cityStat) cityStat.textContent = data.city_ops.status;

      // Scroll to workbench
      const workbench = document.getElementById("fanout-workbench");
      if (workbench) workbench.scrollIntoView({ behavior: "smooth" });
    }

    // Backwards compatibility alias
    const triggerShowpieceFanout = triggerRoleDirectives;
    const FANOUT_SCENARIOS = ROLE_DIRECTIVE_SCENARIOS;

    function openRoleFanoutModal(scenario) {
      triggerRoleDirectives(scenario || currentScenario || "cyclone");
      const workbench = document.getElementById("fanout-workbench");
      if (workbench) {
        workbench.scrollIntoView({ behavior: "smooth", block: "start" });
        workbench.classList.add("ring-2", "ring-[#C97A2B]");
        setTimeout(() => workbench.classList.remove("ring-2", "ring-[#C97A2B]"), 1600);
      }
    }
    const openRoleDirectivesModal = openRoleFanoutModal;
    window.openRoleFanoutModal = openRoleFanoutModal;
    window.openRoleDirectivesModal = openRoleDirectivesModal;

    function copyFanoutDirectives(btn) {
      const farmer = document.getElementById("fanout-farmer-directive").textContent;
      const fisherman = document.getElementById("fanout-fisherman-directive").textContent;
      const city = document.getElementById("fanout-city-directive").textContent;
      const text = "=== WEATHERGPT ROLE-BASED OPERATIONAL DIRECTIVES ===\\n\\n[FARMER]: " + farmer + "\\n\\n[FISHERMAN]: " + fisherman + "\\n\\n[CITY OPS]: " + city;
      navigator.clipboard.writeText(text);
      
      if (btn) {
        const orig = btn.innerHTML;
        const msg = currentLanguage === 'hi' ? 'कॉपी हो गया' : (currentLanguage === 'ta' ? 'நகலெடுக்கப்பட்டது' : 'Copied');
        btn.innerHTML = "<span>✓</span> <span>" + msg + "</span>";
        setTimeout(() => { btn.innerHTML = orig; }, 1800);
      }
    }

    function toggleTickerDetail() {
      const drawer = document.getElementById("ticker-drawer");
      const chevron = document.getElementById("ticker-chevron");
      if (drawer.classList.contains("hidden")) {
        drawer.classList.remove("hidden");
        chevron.textContent = "▲";
      } else {
        drawer.classList.add("hidden");
        chevron.textContent = "▼";
      }
    }

    // 6. Live SACHET Radar Scanner
    async function loadDisasterAlerts() {
      const listEl = document.getElementById("disaster-alerts-list");
      const badge = document.getElementById("disaster-badge");
      const lat = document.getElementById("disaster-lat").value;
      const lon = document.getElementById("disaster-lon").value;
      const radius = document.getElementById("disaster-radius").value;

      badge.textContent = "SCANNING...";
      badge.className = "text-[10px] font-bold px-2 py-0.5 bg-yellow-200 text-yellow-900 rounded-xs";

      try {
        const backendUrl = getActiveBackendUrl();
        const res = await fetch(backendUrl + "/api/tools/disaster?latitude=" + lat + "&longitude=" + lon + "&radius=" + radius);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();

        if (data && data.alerts && data.alerts.length > 0) {
          badge.textContent = data.alerts.length + " ACTIVE";
          badge.className = "text-[10px] font-bold px-2 py-0.5 bg-red-100 text-[#B3261E] rounded-xs";

          listEl.innerHTML = data.alerts.map(a => {
            const isRed = (a.severity || "").toLowerCase().includes("severe") || (a.severity || "").toLowerCase().includes("extreme");
            const badgeColor = isRed ? "bg-red-200 text-red-900 border border-red-300" : "bg-amber-100 text-amber-900 border border-amber-300";
            const borderCol = isRed ? "border-[#B3261E]" : "border-[#C97A2B]";
            const bgCol = isRed ? "bg-red-50/70" : "bg-amber-50/70";
            const titleCol = isRed ? "text-[#B3261E]" : "text-[#B8860B]";

            return \`
              <div class="p-2.5 \${bgCol} border-l-4 \${borderCol} border-t border-r border-b border-[#E1E4DD] rounded-r space-y-1.5 transition-all hover:shadow-xs">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-xs \${titleCol} flex items-center gap-1">
                    <span>\${isRed ? '🔴' : '⚠️'}</span>
                    \${a.event || a.title || "Severe Weather Advisory"}
                  </span>
                  <span class="text-[10px] font-semibold px-1.5 py-0.5 rounded \${badgeColor}">\${a.severity || "Moderate"}</span>
                </div>
                <p class="text-[11px] text-slate-800 leading-snug font-normal">\${a.headline || a.description || "Active synoptic advisory issued."}</p>
                <div class="text-[10px] text-[#5B6472] flex justify-between items-center pt-1 border-t border-black/5">
                  <span class="font-medium text-slate-600">📍 \${a.area_desc || "Regional Impact"}</span>
                  <span class="font-mono text-[9px] text-slate-500">\${a.effective ? new Date(a.effective).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Active"}</span>
                </div>
              </div>
            \`;
          }).join("");
        } else {
          badge.textContent = "ALL CLEAR";
          badge.className = "text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-[#3F6B4A] rounded-xs";
          listEl.innerHTML = \`
            <div class="p-4 bg-emerald-50/70 border border-emerald-200 text-center rounded space-y-1">
              <div class="flex items-center justify-center gap-1.5 text-xs font-bold text-[#3F6B4A]">
                <span>✅</span>
                <span>All Clear in Local Catchment</span>
              </div>
              <p class="text-[11px] text-emerald-800">No active NDMA/SACHET severe disaster warnings within \${radius} km radius.</p>
              <div class="pt-2">
                <button onclick="document.getElementById('radar-radius').value='500'; loadDisasterAlerts();" class="text-[10px] font-semibold text-[#1B2A44] bg-white border border-[#E1E4DD] hover:bg-slate-50 px-2.5 py-1 rounded shadow-2xs transition-colors">
                  🔍 Scan Broad Regional Catchment (500 km)
                </button>
              </div>
            </div>
          \`;
        }
      } catch (e) {
        badge.textContent = "OFFLINE";
        badge.className = "text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-xs";
        listEl.innerHTML = \`
          <div class="text-xs text-slate-500 text-center py-3">
            SACHET Radar standby. Connecting backend for live RSS sync.
          </div>
        \`;
      }
    }

    // 7. Synoptic Weather Station Telemetry Inspector
    async function inspectStation() {
      const city = document.getElementById("station-city").value.trim() || "Bangalore";
      const box = document.getElementById("telemetry-box");
      box.innerHTML = "<div class='text-center py-2 text-[#5B6472]'>Querying synoptic sensors...</div>";

      try {
        const backendUrl = getActiveBackendUrl();
        const geoRes = await fetch(backendUrl + "/api/tools/geolocation?city=" + encodeURIComponent(city));
        const geoData = await geoRes.json();
        const coords = geoData.result;

        if (!coords || typeof coords !== "object" || !coords.latitude) {
          box.innerHTML = "<div class='text-red-600'>Could not locate coordinates for " + city + "</div>";
          return;
        }

        const wxRes = await fetch(backendUrl + "/api/tools/weather?latitude=" + coords.latitude + "&longitude=" + coords.longitude);
        const wxData = await wxRes.json();
        const wx = wxData.result;

        if (wx && wx.hourly) {
          const temp = wx.hourly.temperature_2m[0] || "--";
          const feels = wx.hourly.apparent_temperature ? wx.hourly.apparent_temperature[0] : temp;
          const wind10m = wx.hourly.wind_speed_10m ? wx.hourly.wind_speed_10m[0] : "--";
          const wind80m = wx.hourly.wind_speed_80m ? wx.hourly.wind_speed_80m[0] : "--";
          const rain = wx.hourly.precipitation ? wx.hourly.precipitation[0] : 0;
          const uv = wx.hourly.uv_index ? wx.hourly.uv_index[0] : "--";
          const soil0 = wx.hourly.soil_temperature_0cm ? wx.hourly.soil_temperature_0cm[0] : "--";
          const pressure = wx.hourly.pressure_msl ? wx.hourly.pressure_msl[0] : "--";

          box.innerHTML = \`
            <div class="space-y-2">
              <div class="flex items-center justify-between font-bold text-xs text-[#1B2A44] pb-1 border-b border-[#E1E4DD]">
                <span>\${coords.name || city} (\${coords.admin1 || coords.country || "IN"})</span>
                <span class="text-[#3F6B4A]">LIVE SENSORS</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="p-1.5 bg-white border border-[#E1E4DD] rounded">
                  <span class="text-[10px] text-[#5B6472] block">Temperature:</span>
                  <span class="font-bold text-sm text-[#1B2A44]">\${temp}°C</span> (Feels: \${feels}°C)
                </div>
                <div class="p-1.5 bg-white border border-[#E1E4DD] rounded">
                  <span class="text-[10px] text-[#5B6472] block">Precipitation Rate:</span>
                  <span class="font-bold text-sm text-[#1B2A44]">\${rain} mm/hr</span>
                </div>
                <div class="p-1.5 bg-white border border-[#E1E4DD] rounded">
                  <span class="text-[10px] text-[#5B6472] block">Wind Velocity:</span>
                  <span class="font-bold text-xs text-[#1B2A44]">10m: \${wind10m} km/h | 80m: \${wind80m} km/h</span>
                </div>
                <div class="p-1.5 bg-white border border-[#E1E4DD] rounded">
                  <span class="text-[10px] text-[#5B6472] block">UV & Soil Profile:</span>
                  <span class="font-bold text-xs text-[#1B2A44]">UV: \${uv} | Soil 0cm: \${soil0}°C</span>
                </div>
              </div>
              <div class="text-[10px] text-[#5B6472] flex justify-between pt-1">
                <span>Barometer: \${pressure} hPa</span>
                <span>Lat: \${coords.latitude.toFixed(2)}, Lon: \${coords.longitude.toFixed(2)}</span>
              </div>
            </div>
          \`;
        }
      } catch(e) {
        box.innerHTML = "<div class='text-xs text-red-600'>Error querying telemetry: " + e.message + "</div>";
      }
    }

    // 8. Regulatory Scales Tab Switcher
    function switchScaleTab(tabKey) {
      ["uv", "rain", "wmo"].forEach(key => {
        const btn = document.getElementById("tab-btn-" + key);
        const content = document.getElementById("scale-content-" + key);
        if (key === tabKey) {
          btn.className = "px-3 py-1 font-bold border-b-2 border-[#1B2A44] text-[#1B2A44] text-xs";
          content.classList.remove("hidden");
        } else {
          btn.className = "px-3 py-1 text-[#5B6472] hover:text-[#1B2A44] text-xs";
          content.classList.add("hidden");
        }
      });
    }

    // 9. Rural Accessibility Suite (IVR Telephony & Krishi Sakhi)
    function openRuralModal() {
      document.getElementById("rural-modal").classList.remove("hidden");
    }
    function closeRuralModal() {
      document.getElementById("rural-modal").classList.add("hidden");
    }

    function switchRuralTab(tabKey) {
      ["ivr", "sms", "krishi"].forEach(key => {
        const btn = document.getElementById("rural-tab-" + key);
        const content = document.getElementById("rural-content-" + key);
        if (key === tabKey) {
          btn.className = "px-3 py-1.5 font-bold border-b-2 border-[#1B2A44] text-[#1B2A44]";
          content.classList.remove("hidden");
        } else {
          btn.className = "px-3 py-1.5 text-[#5B6472] hover:text-[#1B2A44]";
          content.classList.add("hidden");
        }
      });
    }

    async function connectIvrCall() {
      const lang = document.getElementById("ivr-lang").value;
      const query = document.getElementById("ivr-query-input").value;
      const statusBox = document.getElementById("ivr-status-box");

      statusBox.innerHTML = "<span class='text-amber-600 animate-pulse'>DIALING 1800-MAUSAM-AI... CALL CONNECTED. PROCESSING SPEECH...</span>";

      try {
        const backendUrl = getActiveBackendUrl();
        const res = await fetch(backendUrl + "/api/tools/telephony", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ channel: "IVR", language: lang, query })
        });
        const data = await res.json();

        statusBox.innerHTML = \`
          <div class="space-y-1">
            <div class="text-[#3F6B4A] font-bold">✓ CALL LIVE • VOICE SYNTHESIS ACTIVE (\${data.ivr_tts_voice})</div>
            <div class="text-[#1B2A44] italic">"Caller: \${data.transcribed_query}"</div>
            <div class="text-[#1B2A44] font-semibold bg-emerald-50 p-1.5 rounded mt-1">"IVR Audio: \${data.spoken_response}"</div>
          </div>
        \`;

        // Speak aloud via browser TTS
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const ut = new SpeechSynthesisUtterance(data.spoken_response);
          ut.lang = lang === "hi" ? "hi-IN" : (lang === "ta" ? "ta-IN" : "en-IN");
          ut.rate = 0.95;
          window.speechSynthesis.speak(ut);
        }
      } catch(e) {
        statusBox.innerHTML = "<span class='text-red-600'>IVR Telephony error: " + e.message + "</span>";
      }
    }

    // Backwards compatibility alias
    const simulateIvrCall = connectIvrCall;

    function speakKrishiSakhi() {
      const text = "வணக்கம் முருகேசன். அடுத்த 24 மணி நேரத்திற்கு உங்கள் கிராமத்தில் கனமழைக்கு வாய்ப்பு குறைவு. மஞ்சள் பயிரில் வேர் அழுகல் ஏற்படாமல் இருக்க வடிகால் வாய்க்கால்களை சுத்தமாக வைத்திருங்கள்.";
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const ut = new SpeechSynthesisUtterance(text);
        ut.lang = "ta-IN";
        ut.rate = 0.9;
        window.speechSynthesis.speak(ut);
      }
    }

    // 10. IMD Hazard Atlas Modal & Query
    function openHazardModal() {
      document.getElementById("hazard-modal").classList.remove("hidden");
      searchHazardAtlas();
    }
    function closeHazardModal() {
      document.getElementById("hazard-modal").classList.add("hidden");
    }

    async function searchHazardAtlas() {
      const city = document.getElementById("hazard-search-input").value.trim() || "Bengaluru";
      const box = document.getElementById("hazard-results-box");
      box.innerHTML = "<div class='text-center py-4 text-[#5B6472]'>Querying IMD Climate Hazard & Vulnerability Atlas...</div>";

      try {
        const backendUrl = getActiveBackendUrl();
        const res = await fetch(backendUrl + "/api/tools/hazard_atlas?city=" + encodeURIComponent(city));
        const data = await res.json();
        const p = data.hazard_profile;

        if (p) {
          box.innerHTML = \`
            <div class="space-y-2">
              <div class="flex items-center justify-between pb-1 border-b border-[#E1E4DD] font-bold text-[#1B2A44]">
                <span>\${p.district} (\${p.state})</span>
                <span class="text-[#B3261E]">\${p.subdivision}</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="p-1.5 bg-white border border-[#E1E4DD] rounded">
                  <span class="text-[10px] text-[#5B6472] block">Monsoon Onset Normal:</span>
                  <span class="font-bold text-[#1B2A44]">\${p.monsoon_onset_normal}</span>
                </div>
                <div class="p-1.5 bg-white border border-[#E1E4DD] rounded">
                  <span class="text-[10px] text-[#5B6472] block">Extreme 24h Rain Record:</span>
                  <span class="font-bold text-[#B3261E]">\${p.extreme_24h_rainfall_record_mm} mm</span> (\${p.extreme_rainfall_record_date})
                </div>
                <div class="p-1.5 bg-white border border-[#E1E4DD] rounded">
                  <span class="text-[10px] text-[#5B6472] block">Cyclone Vulnerability:</span>
                  <span class="font-bold text-[#1B2A44]">\${p.cyclone_vulnerability}</span>
                </div>
                <div class="p-1.5 bg-white border border-[#E1E4DD] rounded">
                  <span class="text-[10px] text-[#5B6472] block">Flood Hazard Level:</span>
                  <span class="font-bold text-[#1B2A44]">\${p.flood_hazard_level}</span>
                </div>
              </div>
              <div class="p-2 bg-white border border-[#E1E4DD] rounded text-[11px] text-[#5B6472]">
                <strong class="text-[#1B2A44]">Flood History & Vulnerability:</strong> \${p.flood_history}
              </div>
              <div class="text-[10px] text-[#5B6472] flex justify-between pt-1">
                <span>Soil: \${p.soil_type_primary}</span>
                <span>Annual Rainfall: \${p.annual_rainfall_normal_mm} mm</span>
              </div>
            </div>
          \`;
        }
      } catch(e) {
        box.innerHTML = "<div class='text-xs text-red-600'>Error loading hazard data: " + e.message + "</div>";
      }
    }

    // 11. Backend API Routing Modal
    function openApiModal() {
      document.getElementById("api-modal").classList.remove("hidden");
      document.getElementById("api-url-input").value = getActiveBackendUrl();
    }
    function closeApiModal() {
      document.getElementById("api-modal").classList.add("hidden");
    }
    async function testApiConnection() {
      const url = sanitizeUrl(document.getElementById("api-url-input").value) || window.location.origin;
      const resBox = document.getElementById("api-test-result");
      resBox.textContent = "Pinging " + url + "/health...";
      try {
        const r = await fetch(url + "/health");
        const json = await r.json();
        resBox.textContent = "✓ Connected: " + JSON.stringify(json);
        resBox.className = "p-2.5 bg-emerald-50 border border-emerald-300 text-[11px] font-mono text-emerald-900 min-h-[44px]";
      } catch(e) {
        resBox.textContent = "✗ Connection failed: " + e.message;
        resBox.className = "p-2.5 bg-red-50 border border-red-300 text-[11px] font-mono text-red-900 min-h-[44px]";
      }
    }
    function saveApiEndpoint() {
      const url = sanitizeUrl(document.getElementById("api-url-input").value);
      if (url) {
        localStorage.setItem("weathergpt_backend_url", url);
      } else {
        localStorage.removeItem("weathergpt_backend_url");
      }
      closeApiModal();
      loadDisasterAlerts();
      inspectStation();
    }

    // 12. Floating Atmospheric Dots Background Engine (Lots of small grey floating dots)
    function initFloatingDotsBackground() {
      const canvas = document.getElementById("floating-dots-canvas");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      // High density of small, soft grey dots for pure white canvas
      const count = Math.min(Math.floor((width * height) / 5500), 220);
      const dots = [];

      for (let i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.3 + 0.6, // small subtle dots
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35 - 0.08, // gentle buoyant updraft
          opacity: Math.random() * 0.3 + 0.12,
          baseOpacity: Math.random() * 0.3 + 0.12,
          pulseSpeed: Math.random() * 0.015 + 0.005,
          pulseAngle: Math.random() * Math.PI * 2,
          color: "148, 163, 184" // elegant neutral slate grey
        });
      }

      // Mouse interactive repelling field
      let mouseX = -1000;
      let mouseY = -1000;
      window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });
      window.addEventListener("mouseleave", () => {
        mouseX = -1000;
        mouseY = -1000;
      });

      function render() {
        ctx.clearRect(0, 0, width, height);

        // Draw connecting faint grey filaments between nearby dots
        for (let i = 0; i < dots.length; i++) {
          for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 75) {
              const alpha = (1 - dist / 75) * 0.08;
              ctx.strokeStyle = "rgba(148, 163, 184, " + alpha + ")";
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(dots[i].x, dots[i].y);
              ctx.lineTo(dots[j].x, dots[j].y);
              ctx.stroke();
            }
          }
        }

        // Draw & update each floating grey dot
        for (let i = 0; i < dots.length; i++) {
          const d = dots[i];

          d.x += d.vx;
          d.y += d.vy;

          d.pulseAngle += d.pulseSpeed;
          d.opacity = d.baseOpacity + Math.sin(d.pulseAngle) * 0.08;

          const mdx = d.x - mouseX;
          const mdy = d.y - mouseY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 70 && mdist > 0) {
            const push = (70 - mdist) / 70 * 0.9;
            d.x += (mdx / mdist) * push;
            d.y += (mdy / mdist) * push;
          }

          if (d.x < -10) d.x = width + 10;
          if (d.x > width + 10) d.x = -10;
          if (d.y < -10) d.y = height + 10;
          if (d.y > height + 10) d.y = -10;

          ctx.beginPath();
          ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(" + d.color + ", " + Math.max(0.04, d.opacity) + ")";
          ctx.fill();
        }

        requestAnimationFrame(render);
      }

      render();
    }

    // 13. Clocks & Bootstrapping
    function updateClocks() {
      const now = new Date();
      const utc = now.toUTCString().split(" ").slice(4, 5)[0];
      const local = now.toLocaleTimeString();
      const utcEl = document.getElementById("utc-clock");
      const localEl = document.getElementById("local-clock");
      if (utcEl) utcEl.textContent = "UTC: " + utc;
      if (localEl) localEl.textContent = "IST: " + local;
    }

    window.addEventListener("DOMContentLoaded", () => {
      initFloatingDotsBackground();
      initChatUI();
      setInterval(updateClocks, 1000);
      updateClocks();
      triggerRoleDirectives(currentScenario || "cyclone");
      loadDisasterAlerts();
      inspectStation();
    });
  </script>
</body>
</html>`;
}
