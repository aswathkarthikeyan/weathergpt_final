export function getPortalHtml(): string {
  return `<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
      background-color: #F5F6F3;
      color: #1B2A44;
      line-height: 1.55;
    }
    .dispatch-title {
      font-family: "Fraunces", Georgia, serif;
    }
    .ease-dispatch {
      transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    }
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #E1E4DD;
    }
    ::-webkit-scrollbar-thumb {
      background: #C2C7BD;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #9FA59A;
    }
    @media print {
      header, .no-print, #chat-composer, #api-modal, #rural-modal, #hazard-modal {
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
<body class="min-h-full flex flex-col bg-[#F5F6F3] text-[#1B2A44] antialiased">

  <!-- ==================== 1. PERSISTENT TOP ALERT TICKER STRIP ==================== -->
  <div id="alert-ticker-strip" class="bg-[#B8860B] text-white text-xs px-4 sm:px-8 py-2 flex items-center justify-between gap-3 shadow-sm cursor-pointer transition hover:bg-[#a07509]" onclick="toggleTickerDetail()">
    <div class="flex items-center gap-2 overflow-hidden">
      <span class="font-bold tracking-wider uppercase text-[10px] bg-black/20 px-2 py-0.5 rounded-sm shrink-0">
        ▎ ACTIVE SACHET / CAP BULLETIN
      </span>
      <div id="ticker-text" class="truncate font-medium">
        ⚡ Synoptic Alert: Deep depression over West-Central Bay of Bengal. Squally winds 55-65 km/h along coastal corridors. Click to inspect role-based fan-out directives.
      </div>
    </div>
    <div class="flex items-center gap-2 shrink-0 text-[11px] font-semibold">
      <span class="underline hidden sm:inline">Role Directives</span>
      <span id="ticker-chevron" class="text-sm">▼</span>
    </div>
  </div>

  <!-- Collapsible Ticker Details Drawer -->
  <div id="ticker-drawer" class="hidden bg-white border-b border-[#E1E4DD] px-4 sm:px-8 py-3.5 shadow-md ease-dispatch">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#1B2A44]">
      <div class="space-y-1">
        <div class="font-bold text-sm text-[#B3261E] flex items-center gap-2">
          <span>🚨</span> <span>OASIS CAP v1.2 Warning • Cyclone / Heavy Inundation Vector</span>
        </div>
        <p class="text-[#5B6472]">
          IMD Bulletin & SACHET NDMA RSS feed: Active cyclonic track with ±12km ensemble variance. Role-based automated translation available for Agriculture, Maritime Coastal, and Municipal Urban Local Bodies.
        </p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button onclick="triggerShowpieceFanout('cyclone')" class="px-3.5 py-1.5 bg-[#1B2A44] hover:bg-[#132845] text-white rounded-sm text-xs font-semibold shadow-sm flex items-center gap-1.5">
          <span>⚡</span> View Role Fan-Out Cards
        </button>
      </div>
    </div>
  </div>

  <!-- ==================== 2. NATIONAL ACCREDITATION & TELEMETRY CLOCK BAR ==================== -->
  <div class="bg-[#1B2A44] text-slate-300 text-[11px] px-4 sm:px-8 py-1.5 border-b border-[#132845] flex flex-wrap items-center justify-between gap-2">
    <div class="flex items-center gap-3">
      <span class="flex items-center gap-1.5 font-medium text-slate-200">
        <span class="text-[#C97A2B]">⚡</span> WeatherGPT • Conversational Meteorological Intelligence Layer
      </span>
      <span class="hidden md:inline text-slate-600">|</span>
      <span class="hidden md:inline text-slate-400">
        Mission Mausam • BharatFS • IMD Nowcast • NDMA SACHET CAP
      </span>
    </div>
    
    <!-- Language Switcher & Universal Clocks -->
    <div class="flex items-center gap-3 font-mono text-[11px]">
      <!-- Multilingual Switcher (Equal Visual Weight) -->
      <div class="flex items-center bg-black/30 rounded p-0.5 font-sans text-xs">
        <button onclick="setAppLanguage('en')" id="lang-btn-en" class="px-2 py-0.5 rounded text-white bg-[#C97A2B] font-semibold transition">
          EN
        </button>
        <button onclick="setAppLanguage('hi')" id="lang-btn-hi" class="px-2 py-0.5 rounded text-slate-300 hover:text-white transition">
          हिन्दी
        </button>
        <button onclick="setAppLanguage('ta')" id="lang-btn-ta" class="px-2 py-0.5 rounded text-slate-300 hover:text-white transition">
          தமிழ்
        </button>
      </div>

      <span class="hidden sm:inline text-slate-600">|</span>
      <span id="utc-clock" class="text-slate-400">UTC: --:--:--</span>
      <span id="local-clock" class="text-[#C97A2B] font-semibold">IST: --:--:--</span>
    </div>
  </div>

  <!-- ==================== 3. OFFICIAL WEATHERGPT DISPATCH HEADER ==================== -->
  <header class="bg-white border-b border-[#E1E4DD] px-4 sm:px-8 py-4 shadow-sm">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex items-center gap-3.5">
        <!-- WeatherGPT Official Emblem -->
        <div class="w-12 h-12 rounded bg-[#1B2A44] p-0.5 shadow-md flex items-center justify-center shrink-0 border border-[#C97A2B]">
          <div class="w-full h-full bg-[#1B2A44] rounded flex flex-col items-center justify-center text-[#C97A2B] font-serif font-black text-xl leading-none">
            <span>W</span>
            <span class="text-[8px] font-sans font-bold tracking-widest text-slate-200">GPT</span>
          </div>
        </div>
        <div>
          <div class="text-[11px] uppercase tracking-widest text-[#C97A2B] font-bold flex items-center gap-2">
            <span>Conversational Weather & Disaster Intelligence</span>
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-[#3F6B4A]"></span>
            <span>All-India Unified Layer</span>
          </div>
          <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-[#1B2A44] dispatch-title">
            WEATHERGPT • METEOROLOGICAL REASONING ENGINE
          </h1>
          <p class="text-xs text-[#5B6472] mt-0.5">
            Orchestrating BharatFS synoptic grids, Meghdoot agromet, Damini lightning, and NDMA CAP feeds into role-specific actions
          </p>
        </div>
      </div>

      <!-- Quick Action Navigation -->
      <div class="flex flex-wrap items-center gap-2 text-xs">
        <button onclick="openRoleFanoutModal()" class="px-3 py-1.5 bg-[#C97A2B] hover:bg-[#b0671f] text-white rounded-sm font-semibold transition flex items-center gap-1.5 shadow-sm">
          <span>⚡</span> Role Fan-Out Demo
        </button>
        <button onclick="openRuralModal()" class="px-3 py-1.5 bg-[#1B2A44] hover:bg-[#132845] text-white rounded-sm font-medium transition flex items-center gap-1.5">
          <span>📞</span> Rural Access Tier (IVR/SMS)
        </button>
        <button onclick="openHazardModal()" class="px-3 py-1.5 bg-white hover:bg-slate-50 text-[#1B2A44] border border-[#E1E4DD] rounded-sm font-medium transition flex items-center gap-1.5">
          <span>🗺️</span> IMD Hazard Atlas
        </button>
        <a href="/health" target="_blank" class="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#3F6B4A] rounded-sm border border-slate-300 font-mono text-[11px] font-semibold">
          /health
        </a>
      </div>
    </div>
  </header>

  <!-- ==================== 4. SHOWPIECE: ROLE-BASED ALERT FAN-OUT WORKBENCH ==================== -->
  <section id="fanout-workbench" class="max-w-7xl mx-auto w-full px-4 sm:px-8 pt-5 pb-1">
    <div class="bg-white border border-[#E1E4DD] rounded-sm p-4 shadow-sm space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[#E1E4DD]">
        <div class="flex items-center gap-2">
          <span class="w-6 h-6 bg-[#C97A2B] text-white rounded-sm flex items-center justify-center font-bold text-xs shadow-sm">
            ⚡
          </span>
          <div>
            <h2 class="font-serif font-bold text-sm text-[#1B2A44] tracking-wide flex items-center gap-2">
              <span>Showpiece Feature: Role-Based Alert Translation Engine</span>
              <span class="text-[10px] bg-red-100 text-[#B3261E] px-2 py-0.2 font-bold uppercase rounded-sm border border-red-200">
                CAP Fan-Out
              </span>
            </h2>
            <p class="text-[11px] text-[#5B6472]">
              Single Red/Orange warning automatically fanned out into parallel, domain-calibrated operational directives
            </p>
          </div>
        </div>

        <!-- Sample Scenarios Trigger -->
        <div class="flex items-center gap-1.5 flex-wrap">
          <span class="text-[11px] font-bold text-[#5B6472]">Demo Alert:</span>
          <button onclick="triggerShowpieceFanout('cyclone')" class="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-[#B3261E] border border-red-300 rounded-sm text-xs font-semibold transition">
            Cyclone Red Alert (Coast)
          </button>
          <button onclick="triggerShowpieceFanout('flood')" class="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-[#B8860B] border border-amber-300 rounded-sm text-xs font-semibold transition">
            Urban Cloudburst (Bengaluru)
          </button>
          <button onclick="triggerShowpieceFanout('heatwave')" class="px-2.5 py-1 bg-orange-50 hover:bg-orange-100 text-[#C97A2B] border border-orange-300 rounded-sm text-xs font-semibold transition">
            Severe Heatwave (Delhi NCR)
          </button>
        </div>
      </div>

      <!-- The 3 Side-By-Side Parallel Role Cards (Section 13.1 Token System) -->
      <div id="fanout-cards-grid" class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        <!-- 1. Farmer Card -->
        <div class="bg-white border-2 border-[#3F6B4A] rounded-sm p-3.5 flex flex-col justify-between space-y-2.5 shadow-sm ease-dispatch">
          <div>
            <div class="flex items-center justify-between pb-1.5 border-b border-emerald-100">
              <span class="font-bold text-xs text-[#3F6B4A] flex items-center gap-1.5">
                <span>🌾</span> AGRICULTURE &amp; AGROMET
              </span>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-[#3F6B4A]">
                FARMER ROLE
              </span>
            </div>
            <div class="mt-2 text-xs font-bold text-slate-900" id="fanout-farmer-directive">
              Harvest mature paddy immediately; pause all chemical spraying and clear peripheral trenches.
            </div>
            <ul class="mt-2 space-y-1 text-[11px] text-[#5B6472]" id="fanout-farmer-checklist">
              <li class="flex items-start gap-1.5"><span>•</span><span>30cm drainage trenches along bunds to stop root rot</span></li>
              <li class="flex items-start gap-1.5"><span>•</span><span>Zero pesticide spraying for 48h (drift & wash-off hazard)</span></li>
              <li class="flex items-start gap-1.5"><span>•</span><span>Shift cattle & poultry to elevated pucca shelters</span></li>
            </ul>
          </div>
          <div class="pt-2 border-t border-emerald-100 flex items-center justify-between text-[11px]">
            <span class="font-semibold text-emerald-800" id="fanout-farmer-status">Spraying: PAUSED</span>
            <span class="text-[10px] text-slate-400 font-mono">Meghdoot / AMFU</span>
          </div>
        </div>

        <!-- 2. Fisherman Card -->
        <div class="bg-white border-2 border-[#B8860B] rounded-sm p-3.5 flex flex-col justify-between space-y-2.5 shadow-sm ease-dispatch">
          <div>
            <div class="flex items-center justify-between pb-1.5 border-b border-amber-100">
              <span class="font-bold text-xs text-[#B8860B] flex items-center gap-1.5">
                <span>⚓</span> MARITIME &amp; COASTAL SAFETY
              </span>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-[#B8860B]">
                FISHERMAN ROLE
              </span>
            </div>
            <div class="mt-2 text-xs font-bold text-slate-900" id="fanout-fisherman-directive">
              TOTAL SEA BAN: Squalls exceeding 65 km/h with rough sea state. Return to harbor by 18:00 IST.
            </div>
            <ul class="mt-2 space-y-1 text-[11px] text-[#5B6472]" id="fanout-fisherman-checklist">
              <li class="flex items-start gap-1.5"><span>•</span><span>Total suspension of deep-sea and coastal artisanal fishing</span></li>
              <li class="flex items-start gap-1.5"><span>•</span><span>Moor catamarans and fiber craft above high spring-tide mark</span></li>
              <li class="flex items-start gap-1.5"><span>•</span><span>Keep marine VHF transceiver tuned to Coast Guard Ch 16</span></li>
            </ul>
          </div>
          <div class="pt-2 border-t border-amber-100 flex items-center justify-between text-[11px]">
            <span class="font-bold text-red-700" id="fanout-fisherman-status">Departure: TOTAL BAN</span>
            <span class="text-[10px] text-slate-400 font-mono">INCOIS / IMD Marine</span>
          </div>
        </div>

        <!-- 3. City Operations Card -->
        <div class="bg-white border-2 border-[#B3261E] rounded-sm p-3.5 flex flex-col justify-between space-y-2.5 shadow-sm ease-dispatch">
          <div>
            <div class="flex items-center justify-between pb-1.5 border-b border-red-100">
              <span class="font-bold text-xs text-[#B3261E] flex items-center gap-1.5">
                <span>🏢</span> URBAN LOCAL BODY &amp; OPS
              </span>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-[#B3261E]">
                CITY OPS ROLE
              </span>
            </div>
            <div class="mt-2 text-xs font-bold text-slate-900" id="fanout-city-directive">
              ACTIVATE MUNICIPAL DRAINAGE PROTOCOL: Mobilize 100-HP dewatering pumps to chronic low-lying wards.
            </div>
            <ul class="mt-2 space-y-1 text-[11px] text-[#5B6472]" id="fanout-city-checklist">
              <li class="flex items-start gap-1.5"><span>•</span><span>Deploy dewatering pumps to underpasses and metro stations</span></li>
              <li class="flex items-start gap-1.5"><span>•</span><span>Clear trash-screens at major stormwater lake outfalls</span></li>
              <li class="flex items-start gap-1.5"><span>•</span><span>Issue arterial traffic diversion bulletins for inundated corridors</span></li>
            </ul>
          </div>
          <div class="pt-2 border-t border-red-100 flex items-center justify-between text-[11px]">
            <span class="font-bold text-red-700" id="fanout-city-status">Alert: CODE RED</span>
            <span class="text-[10px] text-slate-400 font-mono">NDRF / Municipal Ops</span>
          </div>
        </div>
      </div>

      <!-- Provenance Line for Fan-Out -->
      <div class="text-[10px] text-[#5B6472] pt-1 flex flex-wrap items-center justify-between gap-2">
        <span id="fanout-meta-line">
          Source: NDMA SACHET (OASIS CAP v1.2) + BharatFS / IMD Cyclone Bulletin • Confidence: High (Spread ±12km)
        </span>
        <button onclick="copyFanoutDirectives()" class="text-[#1B2A44] hover:underline font-semibold flex items-center gap-1">
          <span>📋</span> Copy Multi-Role Briefing
        </button>
      </div>
    </div>
  </section>

  <!-- ==================== 5. MAIN OPERATIONAL WORKSPACE ==================== -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-5 grid grid-cols-1 lg:grid-cols-12 gap-6">

    <!-- ==================== LEFT COLUMN: WEATHERGPT CHATBOT & ADVISORY CONSOLE (7 COLS) ==================== -->
    <div class="lg:col-span-7 space-y-4">

      <!-- MAIN CHATBOT CARD -->
      <div id="weathergpt-chat-card" class="bg-white border border-[#E1E4DD] shadow-sm flex flex-col rounded-sm">
        <!-- Terminal Header -->
        <div class="bg-slate-50 px-4 sm:px-5 py-3 border-b border-[#E1E4DD] flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2.5">
            <span class="w-7 h-7 bg-[#1B2A44] text-white rounded flex items-center justify-center font-bold text-xs shadow-sm">
              ⚡
            </span>
            <div>
              <div class="font-serif font-bold text-[#1B2A44] text-sm tracking-wide flex items-center gap-2">
                <span>WeatherGPT Conversational Meteorologist</span>
                <span class="inline-flex items-center gap-1 text-[10px] font-sans font-semibold text-[#3F6B4A] bg-emerald-50 border border-emerald-300 px-1.5 py-0.5 rounded">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#3F6B4A] animate-pulse"></span>
                  AI Online
                </span>
              </div>
              <p class="text-[11px] text-[#5B6472]">Autonomous Synoptic Intelligence &amp; Multi-turn Dialogue</p>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <button onclick="clearChatHistory()" title="Clear conversation history" class="text-[#5B6472] hover:text-[#1B2A44] px-2.5 py-1 border border-[#E1E4DD] bg-white hover:bg-slate-50 text-[11px] font-medium transition flex items-center gap-1 rounded-sm">
              <span>🗑️</span> <span class="hidden sm:inline">Clear Chat</span>
            </button>
            <button onclick="printChatTranscript()" title="Print formal meteorological record" class="text-[#5B6472] hover:text-[#1B2A44] px-2.5 py-1 border border-[#E1E4DD] bg-white hover:bg-slate-50 text-[11px] font-medium transition flex items-center gap-1 rounded-sm">
              <span>🖨️</span> <span class="hidden sm:inline">Print Record</span>
            </button>
          </div>
        </div>

        <!-- Configuration & Targeting Bar -->
        <div class="p-3.5 bg-[#F5F6F3] border-b border-[#E1E4DD] space-y-2.5 text-xs">
          <!-- Location Picker Row -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-bold text-[#1B2A44] uppercase tracking-wider text-[10px] shrink-0">📍 Target:</span>
            <div class="flex-1 min-w-[180px] flex items-center gap-1.5">
              <input
                id="location-input"
                type="text"
                value="Bangalore"
                placeholder="City or district (e.g. Bangalore, Delhi, Mumbai, Coimbatore)..."
                class="flex-1 bg-white border border-[#E1E4DD] px-2.5 py-1 text-xs text-[#1B2A44] focus:outline-none focus:ring-1 focus:ring-[#1B2A44] focus:border-[#1B2A44] font-medium rounded-sm"
              />
              <button
                type="button"
                onclick="detectUserLocation()"
                title="Detect current GPS location"
                class="px-2.5 py-1 bg-white hover:bg-slate-100 border border-[#E1E4DD] text-[#1B2A44] text-[11px] font-semibold shrink-0 flex items-center gap-1 rounded-sm"
              >
                <span>🎯</span> <span class="hidden sm:inline">GPS</span>
              </button>
            </div>

            <!-- Quick City Chips (Verified Indian Metropolitan Coordinates) -->
            <div class="flex items-center gap-1 overflow-x-auto py-0.5 max-w-full">
              <button type="button" onclick="applyPresetCity('Bangalore')" class="px-2 py-0.5 bg-white hover:bg-slate-100 border border-[#E1E4DD] text-[11px] text-[#1B2A44] rounded-sm whitespace-nowrap font-medium">
                Bengaluru
              </button>
              <button type="button" onclick="applyPresetCity('New Delhi')" class="px-2 py-0.5 bg-white hover:bg-slate-100 border border-[#E1E4DD] text-[11px] text-[#1B2A44] rounded-sm whitespace-nowrap font-medium">
                Delhi
              </button>
              <button type="button" onclick="applyPresetCity('Mumbai')" class="px-2 py-0.5 bg-white hover:bg-slate-100 border border-[#E1E4DD] text-[11px] text-[#1B2A44] rounded-sm whitespace-nowrap font-medium">
                Mumbai
              </button>
              <button type="button" onclick="applyPresetCity('Chennai')" class="px-2 py-0.5 bg-white hover:bg-slate-100 border border-[#E1E4DD] text-[11px] text-[#1B2A44] rounded-sm whitespace-nowrap font-medium">
                Chennai
              </button>
              <button type="button" onclick="applyPresetCity('Coimbatore')" class="px-2 py-0.5 bg-white hover:bg-slate-100 border border-[#E1E4DD] text-[11px] text-[#1B2A44] rounded-sm whitespace-nowrap font-medium">
                Coimbatore
              </button>
              <button type="button" onclick="applyPresetCity('Kolkata')" class="px-2 py-0.5 bg-white hover:bg-slate-100 border border-[#E1E4DD] text-[11px] text-[#1B2A44] rounded-sm whitespace-nowrap font-medium">
                Kolkata
              </button>
            </div>
          </div>

          <!-- Sector Selection Pills -->
          <div class="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#E1E4DD]">
            <span class="font-bold text-[#1B2A44] uppercase tracking-wider text-[10px] shrink-0 mr-1">Role Lens:</span>
            <label class="cursor-pointer border border-[#E1E4DD] px-2 py-1 bg-white hover:bg-slate-100 has-[:checked]:bg-[#1B2A44] has-[:checked]:text-white has-[:checked]:border-[#1B2A44] text-[#1B2A44] text-[11px] font-medium flex items-center gap-1 rounded-sm transition">
              <input type="radio" name="sector" value="farmer" class="sr-only" checked onchange="handleSectorChange('farmer')">
              <span>🌾</span> <span>Farmer</span>
            </label>
            <label class="cursor-pointer border border-[#E1E4DD] px-2 py-1 bg-white hover:bg-slate-100 has-[:checked]:bg-[#1B2A44] has-[:checked]:text-white has-[:checked]:border-[#1B2A44] text-[#1B2A44] text-[11px] font-medium flex items-center gap-1 rounded-sm transition">
              <input type="radio" name="sector" value="fisherman" class="sr-only" onchange="handleSectorChange('fisherman')">
              <span>⚓</span> <span>Fisherman</span>
            </label>
            <label class="cursor-pointer border border-[#E1E4DD] px-2 py-1 bg-white hover:bg-slate-100 has-[:checked]:bg-[#1B2A44] has-[:checked]:text-white has-[:checked]:border-[#1B2A44] text-[#1B2A44] text-[11px] font-medium flex items-center gap-1 rounded-sm transition">
              <input type="radio" name="sector" value="city_ops" class="sr-only" onchange="handleSectorChange('city_ops')">
              <span>🏢</span> <span>City Ops / ULB</span>
            </label>
            <label class="cursor-pointer border border-[#E1E4DD] px-2 py-1 bg-white hover:bg-slate-100 has-[:checked]:bg-[#1B2A44] has-[:checked]:text-white has-[:checked]:border-[#1B2A44] text-[#1B2A44] text-[11px] font-medium flex items-center gap-1 rounded-sm transition">
              <input type="radio" name="sector" value="general" class="sr-only" onchange="handleSectorChange('general')">
              <span>👤</span> <span>Public</span>
            </label>
            <span class="ml-auto text-[10px] font-mono text-[#5B6472]" id="session-id-display">SESSION: READY</span>
          </div>
        </div>

        <!-- Chat Stream Conversation Container -->
        <div id="chat-thread" class="p-4 sm:p-5 space-y-4 max-h-[580px] min-h-[440px] overflow-y-auto bg-white">
          <!-- Welcome message rendered via JavaScript -->
        </div>

        <!-- Thinking / Loading Indicator -->
        <div id="chat-thinking" class="hidden px-5 py-3 bg-[#F5F6F3] border-t border-[#E1E4DD] flex items-center gap-3">
          <div class="w-4 h-4 border-2 border-[#1B2A44] border-t-transparent rounded-full animate-spin"></div>
          <span class="text-xs font-medium text-[#1B2A44]">
            WeatherGPT is consulting BharatFS synoptic grids, IMD nowcasts, and generating role directives...
          </span>
        </div>

        <!-- Composer & Quick Action Bar -->
        <div id="chat-composer" class="p-3.5 bg-white border-t border-[#E1E4DD] space-y-2.5">
          <!-- Suggestion Prompts Carousel (Localized dynamically) -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs" id="suggestion-chips-bar">
            <span class="text-[10px] font-bold text-[#5B6472] uppercase tracking-wider shrink-0">Suggestions:</span>
            <button type="button" onclick="quickAsk('Is it safe to spray pesticides on crops today in ' + getTargetCity() + '? Check wind and rain.')" class="px-2 py-0.5 bg-[#F5F6F3] hover:bg-slate-200 border border-[#E1E4DD] text-[#1B2A44] text-[11px] rounded-sm whitespace-nowrap">
              🌾 Agrochemical Spraying
            </button>
            <button type="button" onclick="quickAsk('Check coastal wind speed at 10m/80m and squall warnings for ' + getTargetCity() + '. Can boats go out?')" class="px-2 py-0.5 bg-[#F5F6F3] hover:bg-slate-200 border border-[#E1E4DD] text-[#1B2A44] text-[11px] rounded-sm whitespace-nowrap">
              ⚓ Marine Squalls &amp; Wind
            </button>
            <button type="button" onclick="quickAsk('What is the historical flood record and extreme 24h rainfall for ' + getTargetCity() + ' in Hazard Atlas?')" class="px-2 py-0.5 bg-[#F5F6F3] hover:bg-slate-200 border border-[#E1E4DD] text-[#1B2A44] text-[11px] rounded-sm whitespace-nowrap">
              🗺️ Hazard Atlas Flood History
            </button>
            <button type="button" onclick="quickAsk('Scan active disaster warnings, thunderstorms, and rain outlook for ' + getTargetCity() + '.')" class="px-2 py-0.5 bg-[#F5F6F3] hover:bg-slate-200 border border-[#E1E4DD] text-[#1B2A44] text-[11px] rounded-sm whitespace-nowrap">
              ⚠️ Disaster Bulletin Scan
            </button>
          </div>

          <!-- Chat Input Form with Voice Dictation Affordance -->
          <form id="chat-form" onsubmit="handleChatSubmit(event)" class="flex gap-2 items-end">
            <div class="flex-1 relative">
              <textarea
                id="chat-input"
                rows="2"
                placeholder="Ask WeatherGPT in English, हिन्दी, or தமிழ் (e.g. Will it rain during harvest?)"
                class="w-full bg-[#F5F6F3] focus:bg-white border border-[#E1E4DD] p-2.5 text-xs text-[#1B2A44] focus:outline-none focus:ring-1 focus:ring-[#1B2A44] focus:border-[#1B2A44] resize-none font-sans leading-relaxed rounded-sm pr-10"
                required
              ></textarea>
              
              <!-- Voice Dictation / Speech-to-Text Button (Section 4.8) -->
              <button
                type="button"
                id="voice-mic-btn"
                onclick="toggleVoiceRecognition()"
                title="Voice Input (English, Hindi, Tamil Speech Recognition)"
                class="absolute right-2.5 top-2.5 w-6 h-6 rounded-full bg-white hover:bg-[#C97A2B] hover:text-white border border-[#E1E4DD] text-[#C97A2B] flex items-center justify-center transition shadow-xs"
              >
                <span id="mic-icon" class="text-xs">🎙️</span>
              </button>
            </div>

            <button
              id="chat-send-btn"
              type="submit"
              class="h-[52px] bg-[#1B2A44] hover:bg-[#132845] text-white font-semibold text-xs uppercase tracking-wider px-5 border border-[#132845] transition flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50 rounded-sm shadow-sm"
            >
              <span id="send-icon">⚡</span>
              <span id="send-label">TRANSMIT</span>
            </button>
          </form>

          <!-- Micro Security & Standards Notice -->
          <div class="flex items-center justify-between text-[10px] text-[#5B6472] pt-0.5">
            <span class="flex items-center gap-1.5">
              <span>🔒 Firestore Memory</span>
              <span>•</span>
              <span>WMO Synoptic Standards</span>
              <span>•</span>
              <span>Explainable Provenance</span>
            </span>
            <span class="font-mono">BharatFS / GFS Ensemble (±0.8°C)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== RIGHT COLUMN: DIRECT SENSORS & REGULATORY (5 COLS) ==================== -->
    <div class="lg:col-span-5 space-y-5">

      <!-- PANEL A: LIVE SACHET / NDMA RADAR -->
      <div id="disaster-monitor-panel" class="bg-white border border-[#E1E4DD] shadow-sm rounded-sm">
        <div class="bg-slate-50 px-4 py-2.5 border-b border-[#E1E4DD] flex items-center justify-between">
          <span class="font-serif font-bold text-[#1B2A44] text-xs tracking-wide flex items-center gap-1.5">
            <span class="text-[#B3261E]">🚨</span> SACHET / NDMA DISASTER RADAR
          </span>
          <span id="disaster-badge" class="text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-[#1B2A44] rounded-xs">
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
              class="w-20 bg-[#F5F6F3] border border-[#E1E4DD] px-2 py-1 text-xs font-mono rounded-sm"
            />
            <input
              id="disaster-lon"
              type="text"
              value="77.5937"
              placeholder="Lon"
              class="w-20 bg-[#F5F6F3] border border-[#E1E4DD] px-2 py-1 text-xs font-mono rounded-sm"
            />
            <select id="disaster-radius" class="flex-1 bg-[#F5F6F3] border border-[#E1E4DD] px-2 py-1 text-xs rounded-sm">
              <option value="25">Radius: 25 km</option>
              <option value="50" selected>Radius: 50 km</option>
              <option value="100">Radius: 100 km</option>
              <option value="200">Radius: 200 km</option>
            </select>
            <button onclick="loadDisasterAlerts()" class="bg-[#1B2A44] hover:bg-[#132845] text-white px-3 py-1 text-xs font-semibold rounded-sm">
              Scan
            </button>
          </div>

          <!-- Alert Items Display -->
          <div id="disaster-alerts-list" class="space-y-2 max-h-48 overflow-y-auto pr-1">
            <div class="text-[#5B6472] text-xs text-center py-4">
              Querying National Disaster Management Authority bulletins...
            </div>
          </div>

          <div class="text-[11px] text-[#5B6472] pt-1 border-t border-[#E1E4DD] flex justify-between">
            <span>Protocol: OASIS CAP v1.2</span>
            <span>Feed: SACHET RSS</span>
          </div>
        </div>
      </div>

      <!-- PANEL B: DIRECT SYNOPTIC WEATHER STATION INSPECTOR -->
      <div id="weather-inspector-panel" class="bg-white border border-[#E1E4DD] shadow-sm rounded-sm">
        <div class="bg-slate-50 px-4 py-2.5 border-b border-[#E1E4DD] flex items-center justify-between">
          <span class="font-serif font-bold text-[#1B2A44] text-xs tracking-wide flex items-center gap-1.5">
            <span>📡</span> SYNOPTIC STATION TELEMETRY
          </span>
          <span class="text-[10px] font-mono text-[#5B6472]">RAW SENSORS</span>
        </div>

        <div class="p-4 space-y-3">
          <div class="flex items-center gap-2 text-xs">
            <input
              id="station-city"
              type="text"
              value="Bangalore"
              placeholder="Enter station name..."
              class="flex-1 bg-[#F5F6F3] border border-[#E1E4DD] px-2.5 py-1 text-xs font-medium rounded-sm"
            />
            <button onclick="inspectStation()" class="bg-[#1B2A44] hover:bg-[#132845] text-white px-3.5 py-1 text-xs font-semibold rounded-sm">
              Inspect
            </button>
          </div>

          <!-- Telemetry Output Box -->
          <div id="telemetry-box" class="bg-[#F5F6F3] border border-[#E1E4DD] p-3 text-xs rounded-sm">
            <div class="text-[#5B6472] text-center py-2">Click Inspect to query live sensors...</div>
          </div>
        </div>
      </div>

      <!-- PANEL C: WMO & NDMA REGULATORY SCALES -->
      <div id="regulatory-standards-panel" class="bg-white border border-[#E1E4DD] shadow-sm rounded-sm">
        <div class="bg-slate-50 px-4 py-2.5 border-b border-[#E1E4DD] flex items-center justify-between">
          <span class="font-serif font-bold text-[#1B2A44] text-xs tracking-wide flex items-center gap-1.5">
            <span>⚖️</span> REGULATORY METEOROLOGICAL SCALES
          </span>
          <span class="text-[10px] font-mono text-[#5B6472]">STANDARDS</span>
        </div>

        <div class="p-4 space-y-3 text-xs">
          <!-- Scale Category Selector -->
          <div class="flex border-b border-[#E1E4DD] pb-1 gap-2">
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
            <div class="flex items-center justify-between p-1.5 bg-emerald-50 border-l-4 border-[#3F6B4A]">
              <span class="font-bold text-emerald-900">0 – 2: Low</span>
              <span class="text-[11px] text-emerald-800">Minimal danger; normal outdoor work</span>
            </div>
            <div class="flex items-center justify-between p-1.5 bg-yellow-50 border-l-4 border-yellow-500">
              <span class="font-bold text-yellow-900">3 – 5: Moderate</span>
              <span class="text-[11px] text-yellow-800">SPF 30+ recommended; seek shade midday</span>
            </div>
            <div class="flex items-center justify-between p-1.5 bg-amber-50 border-l-4 border-[#B8860B]">
              <span class="font-bold text-amber-900">6 – 7: High</span>
              <span class="text-[11px] text-amber-800">Mandatory hat &amp; sunglasses; reduce exposure</span>
            </div>
            <div class="flex items-center justify-between p-1.5 bg-red-50 border-l-4 border-[#B3261E]">
              <span class="font-bold text-red-900">8 – 10: Very High</span>
              <span class="text-[11px] text-red-800">Severe burn hazard; pause field labor</span>
            </div>
            <div class="flex items-center justify-between p-1.5 bg-purple-50 border-l-4 border-purple-700">
              <span class="font-bold text-purple-900">11+: Extreme</span>
              <span class="text-[11px] text-purple-800">Full protective gear; avoid midday outdoors</span>
            </div>
          </div>

          <!-- Tab 2: Precipitation Rate Scale -->
          <div id="scale-content-rain" class="space-y-1.5 max-h-44 overflow-y-auto hidden">
            <div class="p-1.5 bg-[#F5F6F3] border border-[#E1E4DD]">
              <div class="font-bold text-slate-900">0.0 mm/hr: None</div>
              <div class="text-[11px] text-[#5B6472]">Dry operational surface. Safe for agro-chemical spraying.</div>
            </div>
            <div class="p-1.5 bg-blue-50 border border-blue-200">
              <div class="font-bold text-blue-900">0.25 – 1.0 mm/hr: Light Rain</div>
              <div class="text-[11px] text-blue-800">Individual drops visible; puddles form slowly.</div>
            </div>
            <div class="p-1.5 bg-blue-100 border border-blue-300">
              <div class="font-bold text-blue-950">1.0 – 4.0 mm/hr: Moderate Rain</div>
              <div class="text-[11px] text-blue-900">Continuous rain; rapid runoff on impervious roads.</div>
            </div>
            <div class="p-1.5 bg-red-100 border border-red-400">
              <div class="font-bold text-red-950">&gt; 16.0 mm/hr: Violent / Cloudburst</div>
              <div class="text-[11px] text-red-900">Torrential rain; high flash flood danger.</div>
            </div>
          </div>

          <!-- Tab 3: WMO Codes -->
          <div id="scale-content-wmo" class="space-y-1 max-h-44 overflow-y-auto text-[11px] font-mono hidden">
            <div class="p-1 bg-white border border-[#E1E4DD] flex justify-between">
              <span>WMO Code 00:</span> <span class="font-bold">Clear Sky</span>
            </div>
            <div class="p-1 bg-white border border-[#E1E4DD] flex justify-between">
              <span>WMO Code 01-03:</span> <span class="font-bold">Mainly Clear / Overcast</span>
            </div>
            <div class="p-1 bg-white border border-[#E1E4DD] flex justify-between">
              <span>WMO Code 51-55:</span> <span class="font-bold">Drizzle (Light to Dense)</span>
            </div>
            <div class="p-1 bg-white border border-[#E1E4DD] flex justify-between">
              <span>WMO Code 61-65:</span> <span class="font-bold">Continuous Rain</span>
            </div>
            <div class="p-1 bg-white border border-[#E1E4DD] flex justify-between">
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
        <button onclick="openRuralModal()" class="hover:text-white underline">Rural IVR / SMS Simulator</button>
        <span>•</span>
        <button onclick="openHazardModal()" class="hover:text-white underline">Hazard Atlas</button>
        <span>•</span>
        <button onclick="openApiModal()" class="hover:text-white underline">API Routing</button>
      </div>
    </div>
  </footer>

  <!-- ==================== MODAL 1: RURAL ACCESSIBILITY SUITE (IVR, SMS, KRISHI SAKHI) ==================== -->
  <div id="rural-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white border border-[#E1E4DD] shadow-2xl max-w-xl w-full p-6 space-y-4 rounded-sm">
      <div class="flex items-center justify-between border-b border-[#E1E4DD] pb-3">
        <h3 class="font-serif font-bold text-[#1B2A44] text-base flex items-center gap-2">
          <span>📞</span> Rural Accessibility Tier (Non-Smartphone Reach)
        </h3>
        <button onclick="closeRuralModal()" class="text-slate-400 hover:text-slate-700 text-lg font-bold">×</button>
      </div>

      <!-- Rural Tabs -->
      <div class="flex border-b border-[#E1E4DD] gap-2 text-xs">
        <button onclick="switchRuralTab('ivr')" id="rural-tab-ivr" class="px-3 py-1.5 font-bold border-b-2 border-[#1B2A44] text-[#1B2A44]">
          1. IVR Phone Call Simulator
        </button>
        <button onclick="switchRuralTab('sms')" id="rural-tab-sms" class="px-3 py-1.5 text-[#5B6472] hover:text-[#1B2A44]">
          2. SMS &amp; USSD Fallback
        </button>
        <button onclick="switchRuralTab('krishi')" id="rural-tab-krishi" class="px-3 py-1.5 text-[#5B6472] hover:text-[#1B2A44]">
          3. Krishi Sakhi Assist Mode
        </button>
      </div>

      <!-- Tab Content: IVR Phone Simulator -->
      <div id="rural-content-ivr" class="space-y-3 text-xs">
        <p class="text-[#5B6472]">
          Allows farmers with basic 2G feature phones to dial a toll-free number (1800-MAUSAM-AI), ask questions in regional languages, and receive spoken meteorological briefings.
        </p>
        <div class="bg-[#F5F6F3] border border-[#E1E4DD] p-3.5 rounded space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-[#1B2A44]">Toll-Free Dial-In:</span>
            <span class="font-mono font-bold text-[#C97A2B]">1800-628-7262 (1800-MAUSAM)</span>
          </div>
          <div class="flex items-center gap-2">
            <select id="ivr-lang" class="bg-white border border-[#E1E4DD] px-2.5 py-1 text-xs rounded-sm">
              <option value="hi" selected>Hindi (हिन्दी)</option>
              <option value="ta">Tamil (தமிழ்)</option>
              <option value="en">English (Indian Accent)</option>
            </select>
            <input
              id="ivr-query-input"
              type="text"
              value="क्या आज कीटनाशक का छिड़काव करना ठीक रहेगा?"
              class="flex-1 bg-white border border-[#E1E4DD] px-2.5 py-1 text-xs rounded-sm"
            />
            <button onclick="simulateIvrCall()" id="ivr-call-btn" class="bg-[#3F6B4A] hover:bg-emerald-800 text-white px-3.5 py-1 font-semibold rounded-sm">
              📞 Dial Call
            </button>
          </div>
          <div id="ivr-status-box" class="p-2.5 bg-white border border-[#E1E4DD] text-[11px] font-mono text-[#1B2A44] min-h-[50px] leading-relaxed">
            Status: On Hook. Click "Dial Call" to simulate interactive voice response.
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
            <div class="p-2 bg-[#F5F6F3] border border-[#E1E4DD] font-mono font-bold text-xs text-[#1B2A44] flex justify-between items-center">
              <span>*99*WEATHER*560001#</span>
              <span class="text-[10px] text-[#5B6472]">PIN-Code Granular</span>
            </div>
          </div>
          <div>
            <label class="font-bold text-[#1B2A44] block mb-1">Generated 160-Character SMS Dispatch:</label>
            <div class="p-2.5 bg-[#F5F6F3] border border-[#E1E4DD] font-mono text-xs text-slate-800 leading-relaxed">
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
        <div class="bg-emerald-50 border border-emerald-200 p-3 rounded space-y-2">
          <div class="font-bold text-[#3F6B4A]">👩‍🌾 Krishi Sakhi Field Assistant Portal</div>
          <div class="text-[11px] text-slate-700">
            "Farmer: Murugesan, Thondamuthur Village. Crop: Turmeric. Query: Rain risk for root rot."
          </div>
          <button onclick="speakKrishiSakhi()" class="px-3 py-1 bg-[#3F6B4A] hover:bg-emerald-800 text-white font-semibold rounded-sm text-xs flex items-center gap-1.5">
            <span>🔊</span> Play Spoken Vernacular Guidance
          </button>
        </div>
      </div>

      <div class="flex justify-end pt-2 border-t border-[#E1E4DD]">
        <button onclick="closeRuralModal()" class="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium rounded-sm text-xs">
          Close
        </button>
      </div>
    </div>
  </div>

  <!-- ==================== MODAL 2: IMD CLIMATE HAZARD ATLAS EXPLORER ==================== -->
  <div id="hazard-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white border border-[#E1E4DD] shadow-2xl max-w-xl w-full p-6 space-y-4 rounded-sm">
      <div class="flex items-center justify-between border-b border-[#E1E4DD] pb-3">
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
            class="flex-1 bg-[#F5F6F3] border border-[#E1E4DD] px-2.5 py-1.5 text-xs text-[#1B2A44] font-medium rounded-sm"
          />
          <button onclick="searchHazardAtlas()" class="bg-[#1B2A44] hover:bg-[#132845] text-white px-4 py-1.5 font-semibold rounded-sm text-xs">
            Query Atlas
          </button>
        </div>

        <div id="hazard-results-box" class="bg-[#F5F6F3] border border-[#E1E4DD] p-3.5 rounded text-xs space-y-2 min-h-[140px]">
          <div class="text-center text-[#5B6472] py-4">Click "Query Atlas" to fetch official hazard benchmarks...</div>
        </div>
      </div>

      <div class="flex justify-end pt-2 border-t border-[#E1E4DD]">
        <button onclick="closeHazardModal()" class="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium rounded-sm text-xs">
          Close
        </button>
      </div>
    </div>
  </div>

  <!-- ==================== MODAL 3: BACKEND API ROUTING ==================== -->
  <div id="api-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white border border-[#E1E4DD] shadow-2xl max-w-lg w-full p-6 space-y-4 rounded-sm">
      <div class="flex items-center justify-between border-b border-[#E1E4DD] pb-3">
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
            class="w-full bg-[#F5F6F3] border border-[#E1E4DD] px-3 py-2 text-xs font-mono text-[#1B2A44] focus:outline-none focus:border-[#1B2A44] rounded-sm"
          />
        </div>
        <div id="api-test-result" class="p-2.5 bg-[#F5F6F3] border border-[#E1E4DD] text-[11px] font-mono text-[#1B2A44] min-h-[44px]">
          Click "Test Connection" to ping target /health endpoint.
        </div>
      </div>

      <div class="flex items-center justify-between pt-2 border-t border-[#E1E4DD] text-xs">
        <div class="flex gap-2">
          <button onclick="testApiConnection()" class="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium rounded-sm">
            Test Ping
          </button>
        </div>
        <div class="flex gap-2">
          <button onclick="closeApiModal()" class="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-sm">
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

    const I18N_STRINGS = {
      en: {
        welcomeTitle: "WeatherGPT Central Advisory Terminal",
        welcomeDesc: "Welcome to <strong>WeatherGPT</strong>. I am your specialized meteorological decision-support advisor. I combine live synoptic telemetry, BharatFS / Open-Meteo numerical grids, and national SACHET/NDMA emergency hazard feeds.",
        quickPesticide: "Can I spray crops today in {city}?",
        quickMarine: "Marine clearance & coastal squall alerts",
        quickHeat: "Heat stress & UV index analysis",
        quickFlood: "Emergency flood & hazard scan",
        inputPlaceholder: "Ask WeatherGPT in English, हिन्दी, or தமிழ் (e.g. Will it rain during harvest?)",
        transmit: "TRANSMIT"
      },
      hi: {
        welcomeTitle: "मौसम जीपीटी केंद्रीय मौसम सलाह टर्मिनल",
        welcomeDesc: "<strong>मौसम जीपीटी (WeatherGPT)</strong> में आपका स्वागत है। मैं भारत सरकार के भारत-एफएस मॉडल, आईएमडी वेधशालाओं और सचेत (NDMA) आपदा चेतावनी प्रणाली से लैस आपका कृत्रिम बुद्धिमत्ता मौसम सलाहकार हूँ।",
        quickPesticide: "क्या आज {city} में कीटनाशक का छिड़काव सुरक्षित है?",
        quickMarine: "तटीय हवा की गति और मछुआरों के लिए समुद्री चेतावनी",
        quickHeat: "लू का खतरा और पराबैंगनी (UV) सूचकांक विश्लेषण",
        quickFlood: "सचेत आपदा चेतावनी और भारी बारिश का पूर्वानुमान",
        inputPlaceholder: "मौसम जीपीटी से हिंदी में पूछें (उदा. क्या आज बारिश होगी और फसल काटना ठीक है?)",
        transmit: "भेजें"
      },
      ta: {
        welcomeTitle: "வெதர் ஜிபிடி வானிலை மற்றும் பேரிடர் முனையம்",
        welcomeDesc: "<strong>வெதர் ஜிபிடி (WeatherGPT)</strong> க்கு வரவேற்கிறோம். பாரத்-எஃப்எஸ் வானிலை கணிப்பு, ஐஎம்டி புள்ளிவிவரங்கள் மற்றும் சச்செட் பேரிடர் எச்சரிக்கைகளை இணைத்து வழங்கப்படும் வானிலை ஆலோசனை முனையம்.",
        quickPesticide: "{city} பகுதியில் இன்று பூச்சிக்கொல்லி மருந்து தெளிக்கலாமா?",
        quickMarine: "மீனவர்களுக்கான கடல் அலை மற்றும் சூறாவளி காற்று எச்சரிக்கை",
        quickHeat: "வெப்ப அலை மற்றும் புற ஊதாக் கதிர்வீச்சு தாக்கம்",
        quickFlood: "பேரிடர் எச்சரிக்கை மற்றும் கனமழை முன்னறிவிப்பு",
        inputPlaceholder: "தமிழில் கேளுங்கள் (उदा. இன்று மழை பெய்யுமா? அறுவடை செய்யலாமா?)",
        transmit: "அனுப்புக"
      }
    };

    function setAppLanguage(lang) {
      currentLanguage = lang;
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
      const city = getTargetCity();
      const input = document.getElementById("chat-input");
      if (input) {
        input.placeholder = strings.inputPlaceholder;
      }
      const sendLabel = document.getElementById("send-label");
      if (sendLabel) {
        sendLabel.textContent = strings.transmit;
      }

      // Re-render suggestions if empty
      const chipsBar = document.getElementById("suggestion-chips-bar");
      if (chipsBar) {
        chipsBar.innerHTML = \`
          <span class="text-[10px] font-bold text-[#5B6472] uppercase tracking-wider shrink-0">Suggestions:</span>
          <button type="button" onclick="quickAsk('\${strings.quickPesticide.replace('{city}', city)}')" class="px-2 py-0.5 bg-[#F5F6F3] hover:bg-slate-200 border border-[#E1E4DD] text-[#1B2A44] text-[11px] rounded-sm whitespace-nowrap">
            🌾 \${strings.quickPesticide.replace('{city}', city)}
          </button>
          <button type="button" onclick="quickAsk('\${strings.quickMarine}')" class="px-2 py-0.5 bg-[#F5F6F3] hover:bg-slate-200 border border-[#E1E4DD] text-[#1B2A44] text-[11px] rounded-sm whitespace-nowrap">
            ⚓ \${strings.quickMarine}
          </button>
          <button type="button" onclick="quickAsk('\${strings.quickHeat}')" class="px-2 py-0.5 bg-[#F5F6F3] hover:bg-slate-200 border border-[#E1E4DD] text-[#1B2A44] text-[11px] rounded-sm whitespace-nowrap">
            🏃 \${strings.quickHeat}
          </button>
          <button type="button" onclick="quickAsk('\${strings.quickFlood}')" class="px-2 py-0.5 bg-[#F5F6F3] hover:bg-slate-200 border border-[#E1E4DD] text-[#1B2A44] text-[11px] rounded-sm whitespace-nowrap">
            ⚠️ \${strings.quickFlood}
          </button>
        \`;
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
        alert("Geolocation is not supported by your browser.");
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
          console.warn("Geolocation denied:", err);
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
      return \`
        <div class="border border-[#E1E4DD] bg-[#F5F6F3] p-4 rounded-sm shadow-xs space-y-3">
          <div class="flex items-center gap-2 pb-2 border-b border-[#E1E4DD]">
            <span class="w-6 h-6 bg-[#1B2A44] text-white rounded flex items-center justify-center text-xs font-bold">W</span>
            <div class="font-bold text-xs text-[#1B2A44] font-serif">\${strings.welcomeTitle}</div>
            <span class="ml-auto text-[10px] text-[#5B6472] font-mono">READY</span>
          </div>
          <p class="text-xs text-[#1B2A44] leading-relaxed">
            \${strings.welcomeDesc}
          </p>
          <div class="bg-white border border-[#E1E4DD] p-2.5 space-y-1.5 rounded-sm">
            <div class="text-[11px] font-bold text-[#5B6472] uppercase tracking-wider">Quick Action Queries:</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
              <button onclick="quickAsk('\${strings.quickPesticide.replace('{city}', city)}')" class="text-left p-1.5 bg-[#F5F6F3] hover:bg-slate-200 border border-[#E1E4DD] rounded text-[#1B2A44] text-[11px] flex items-center gap-1.5 transition">
                <span>🌾</span> <span>\${strings.quickPesticide.replace('{city}', city)}</span>
              </button>
              <button onclick="quickAsk('\${strings.quickMarine}')" class="text-left p-1.5 bg-[#F5F6F3] hover:bg-slate-200 border border-[#E1E4DD] rounded text-[#1B2A44] text-[11px] flex items-center gap-1.5 transition">
                <span>⚓</span> <span>\${strings.quickMarine}</span>
              </button>
              <button onclick="quickAsk('\${strings.quickHeat}')" class="text-left p-1.5 bg-[#F5F6F3] hover:bg-slate-200 border border-[#E1E4DD] rounded text-[#1B2A44] text-[11px] flex items-center gap-1.5 transition">
                <span>🏃</span> <span>\${strings.quickHeat}</span>
              </button>
              <button onclick="quickAsk('\${strings.quickFlood}')" class="text-left p-1.5 bg-[#F5F6F3] hover:bg-slate-200 border border-[#E1E4DD] rounded text-[#1B2A44] text-[11px] flex items-center gap-1.5 transition">
                <span>⚠️</span> <span>\${strings.quickFlood}</span>
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
          <div class="flex items-center gap-1.5 text-[10px] text-[#5B6472] mr-1">
            <span class="font-bold text-[#1B2A44] uppercase">You</span>
            <span>•</span>
            <span class="bg-[#E1E4DD] px-1.5 py-0.2 rounded font-medium text-[#1B2A44]">📍 \${metadata.city || getTargetCity()}</span>
            <span>•</span>
            <span class="bg-blue-100 text-[#1B2A44] px-1.5 py-0.2 rounded font-medium uppercase">\${metadata.sector || getSelectedSector()}</span>
            <span>•</span>
            <span>\${timeStr}</span>
          </div>
          <div class="max-w-[88%] bg-[#1B2A44] text-white px-4 py-2.5 rounded-sm shadow-xs text-xs leading-relaxed">
            \${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
          </div>
        \`;
        thread.appendChild(userDiv);
      } else {
        const asstDiv = document.createElement("div");
        asstDiv.className = "flex flex-col items-start space-y-1";
        const formattedHtml = renderWeatherMarkdown(text);

        asstDiv.innerHTML = \`
          <div class="flex items-center gap-1.5 text-[10px] text-[#5B6472] ml-1">
            <span class="w-4 h-4 bg-[#C97A2B] text-white font-bold rounded-full flex items-center justify-center text-[9px]">⚡</span>
            <span class="font-bold text-[#1B2A44] uppercase">WeatherGPT Dispatch</span>
            <span>•</span>
            <span class="text-[#3F6B4A] font-semibold font-mono">BharatFS / Gemini</span>
            <span>•</span>
            <span>\${timeStr}</span>
          </div>
          <div class="max-w-[94%] bg-white border border-[#E1E4DD] p-4 rounded-sm shadow-xs text-slate-800 text-xs leading-relaxed space-y-2">
            \${formattedHtml}
            <div class="pt-2 mt-2 border-t border-[#E1E4DD] flex items-center justify-between text-[10px] text-[#5B6472]">
              <span class="font-mono">WMO SYNOPTIC COMPLIANT</span>
              <div class="flex items-center gap-3">
                <button onclick="speakWeatherMessage(this)" data-text="\${encodeURIComponent(text)}" class="hover:text-[#1B2A44] font-medium flex items-center gap-1 text-[#C97A2B]">
                  <span>🔊</span> Listen
                </button>
                <button onclick="copyAdvisory(this)" data-text="\${encodeURIComponent(text)}" class="hover:text-[#1B2A44] font-medium flex items-center gap-1">
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
          alert("Speech synthesis is not supported on this browser.");
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
      } catch(e) {
        console.warn("TTS error:", e);
      }
    }

    // Voice Speech-To-Text Dictation (Section 4.8)
    let recognitionInstance = null;
    let isRecording = false;

    function toggleVoiceRecognition() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Speech recognition is not supported in this browser. Please use Google Chrome.");
        return;
      }

      const micBtn = document.getElementById("voice-mic-btn");
      const micIcon = document.getElementById("mic-icon");
      const input = document.getElementById("chat-input");

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
      if (confirm("Reset conversation history and clear local record?")) {
        chatHistory = [];
        localStorage.removeItem("weathergpt_chat_history");
        initChatUI();
      }
    }

    function printChatTranscript() {
      window.print();
    }

    function quickAsk(promptText) {
      const input = document.getElementById("chat-input");
      input.value = promptText;
      document.getElementById("chat-form").dispatchEvent(new Event("submit", { cancelable: true }));
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
        const errReply = "⚠️ **Connection Notice:** Unable to reach WeatherGPT backend at " + backendUrl + ". Error: " + (err.message || err);
        appendMessageToThread("assistant", errReply, { city, sector });
      } finally {
        thinking.classList.add("hidden");
        sendBtn.disabled = false;
        input.focus();
      }
    }

    // 5. Showpiece Role Fan-Out Controller (Section 4.4 & 8.4)
    const FANOUT_SCENARIOS = {
      cyclone: {
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
      flood: {
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
      heatwave: {
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
      }
    };

    function triggerShowpieceFanout(scenarioKey) {
      const data = FANOUT_SCENARIOS[scenarioKey] || FANOUT_SCENARIOS.cyclone;

      document.getElementById("fanout-meta-line").textContent = data.meta;

      // Update Farmer Card
      document.getElementById("fanout-farmer-directive").textContent = data.farmer.directive;
      document.getElementById("fanout-farmer-checklist").innerHTML = data.farmer.checklist.map(item => \`<li class="flex items-start gap-1.5"><span>•</span><span>\${item}</span></li>\`).join("");
      document.getElementById("fanout-farmer-status").textContent = data.farmer.status;

      // Update Fisherman Card
      document.getElementById("fanout-fisherman-directive").textContent = data.fisherman.directive;
      document.getElementById("fanout-fisherman-checklist").innerHTML = data.fisherman.checklist.map(item => \`<li class="flex items-start gap-1.5"><span>•</span><span>\${item}</span></li>\`).join("");
      document.getElementById("fanout-fisherman-status").textContent = data.fisherman.status;

      // Update City Ops Card
      document.getElementById("fanout-city-directive").textContent = data.city_ops.directive;
      document.getElementById("fanout-city-checklist").innerHTML = data.city_ops.checklist.map(item => \`<li class="flex items-start gap-1.5"><span>•</span><span>\${item}</span></li>\`).join("");
      document.getElementById("fanout-city-status").textContent = data.city_ops.status;

      // Scroll to workbench
      document.getElementById("fanout-workbench").scrollIntoView({ behavior: "smooth" });
    }

    function copyFanoutDirectives() {
      const farmer = document.getElementById("fanout-farmer-directive").textContent;
      const fisherman = document.getElementById("fanout-fisherman-directive").textContent;
      const city = document.getElementById("fanout-city-directive").textContent;
      const text = "=== WEATHERGPT ROLE-BASED ALERT FAN-OUT ===\\n\\n[FARMER]: " + farmer + "\\n\\n[FISHERMAN]: " + fisherman + "\\n\\n[CITY OPS]: " + city;
      navigator.clipboard.writeText(text);
      alert("Role fan-out briefing copied to clipboard!");
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
            Simulated SACHET Radar online. Connect backend for live RSS sync.
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

    // 9. Rural Accessibility Suite (IVR Simulator & Krishi Sakhi)
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

    async function simulateIvrCall() {
      const lang = document.getElementById("ivr-lang").value;
      const query = document.getElementById("ivr-query-input").value;
      const statusBox = document.getElementById("ivr-status-box");

      statusBox.innerHTML = "<span class='text-amber-600 animate-pulse'>DIALING 1800-MAUSAM-AI... CALL CONNECTED. PROCESSING SPEECH...</span>";

      try {
        const backendUrl = getActiveBackendUrl();
        const res = await fetch(backendUrl + "/api/tools/telephony_simulate", {
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

    // 12. Clocks & Bootstrapping
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
      initChatUI();
      setInterval(updateClocks, 1000);
      updateClocks();
      loadDisasterAlerts();
      inspectStation();
    });
  </script>
</body>
</html>`;
}
