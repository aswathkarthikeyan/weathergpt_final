import { XMLParser } from "fast-xml-parser";

export const DEFAULT_SACHET_URL = "https://sachet.ndma.gov.in/cap_public_website/rss/rss_india.xml";

export function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371.0;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dlat = toRad(lat2 - lat1);
  const dlon = toRad(lon2 - lon1);
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Indian Districts & Meteorological Center Coordinates for Geographic Relevance Filtering
const INDIAN_REGIONS_GEO: Record<string, { lat: number; lon: number; label: string }> = {
  // Karnataka (South & Central)
  "bengaluru": { lat: 12.9719, lon: 77.5937, label: "Bengaluru Urban & Rural" },
  "bangalore": { lat: 12.9719, lon: 77.5937, label: "Bengaluru Urban & Rural" },
  "ramanagara": { lat: 12.7200, lon: 77.2800, label: "Ramanagara" },
  "kolar": { lat: 13.1367, lon: 78.1291, label: "Kolar" },
  "chikkaballapura": { lat: 13.4325, lon: 77.7275, label: "Chikkaballapura" },
  "tumakuru": { lat: 13.3379, lon: 77.1010, label: "Tumakuru" },
  "mysuru": { lat: 12.2958, lon: 76.6394, label: "Mysuru" },
  "mysore": { lat: 12.2958, lon: 76.6394, label: "Mysuru" },
  "mandya": { lat: 12.5218, lon: 76.8951, label: "Mandya" },
  "hassan": { lat: 13.0033, lon: 76.1004, label: "Hassan" },
  "shivamogga": { lat: 13.9299, lon: 75.5681, label: "Shivamogga" },
  "chikkamagaluru": { lat: 13.3161, lon: 75.7720, label: "Chikkamagaluru" },
  "davanagere": { lat: 14.4644, lon: 75.9218, label: "Davanagere" },

  // Karnataka (Coastal)
  "dakshina kannada": { lat: 12.8703, lon: 74.8806, label: "Dakshina Kannada" },
  "mangaluru": { lat: 12.9141, lon: 74.8560, label: "Mangaluru" },
  "mangalore": { lat: 12.9141, lon: 74.8560, label: "Mangaluru" },
  "udupi": { lat: 13.3409, lon: 74.7421, label: "Udupi" },
  "uttara kannada": { lat: 14.8185, lon: 74.1416, label: "Uttara Kannada" },
  "karwar": { lat: 14.8185, lon: 74.1416, label: "Karwar" },

  // Karnataka (North)
  "bagalakote": { lat: 16.1817, lon: 75.6958, label: "Bagalakote" },
  "bagalkot": { lat: 16.1817, lon: 75.6958, label: "Bagalakote" },
  "belagavi": { lat: 15.8497, lon: 74.4977, label: "Belagavi" },
  "belgaum": { lat: 15.8497, lon: 74.4977, label: "Belagavi" },
  "bidar": { lat: 17.9104, lon: 77.5199, label: "Bidar" },
  "dharwad": { lat: 15.4589, lon: 75.0078, label: "Dharwad" },
  "gadag": { lat: 15.4319, lon: 75.6355, label: "Gadag" },
  "haveri": { lat: 14.7954, lon: 75.4024, label: "Haveri" },
  "kalaburagi": { lat: 17.3297, lon: 76.8343, label: "Kalaburagi" },
  "gulbarga": { lat: 17.3297, lon: 76.8343, label: "Kalaburagi" },
  "koppal": { lat: 15.3458, lon: 76.1557, label: "Koppal" },
  "raichur": { lat: 16.2120, lon: 77.3439, label: "Raichur" },
  "vijayapura": { lat: 16.8302, lon: 75.7100, label: "Vijayapura" },
  "bijapur": { lat: 16.8302, lon: 75.7100, label: "Vijayapura" },
  "yadgir": { lat: 16.7648, lon: 77.1378, label: "Yadgir" },
  "ballari": { lat: 15.1394, lon: 76.9214, label: "Ballari" },
  "bellary": { lat: 15.1394, lon: 76.9214, label: "Ballari" },

  // Telangana
  "hyderabad": { lat: 17.3850, lon: 78.4867, label: "Hyderabad" },
  "ranga reddy": { lat: 17.3457, lon: 78.5522, label: "Ranga Reddy" },
  "jogulamba gadwal": { lat: 16.2333, lon: 77.8000, label: "Jogulamba Gadwal" },
  "nagarkurnool": { lat: 16.4858, lon: 78.3328, label: "Nagarkurnool" },
  "wanaparthy": { lat: 16.3622, lon: 78.0628, label: "Wanaparthy" },
  "warangal": { lat: 17.9689, lon: 79.5941, label: "Warangal" },

  // Andhra Pradesh
  "visakhapatnam": { lat: 17.6868, lon: 83.2185, label: "Visakhapatnam" },
  "kalingapatnam": { lat: 18.3392, lon: 84.1294, label: "Kalingapatnam" },
  "amravati": { lat: 16.5417, lon: 80.5158, label: "Amaravati" },
  "vijayawada": { lat: 16.5062, lon: 80.6480, label: "Vijayawada" },
  "guntur": { lat: 16.3067, lon: 80.4365, label: "Guntur" },
  "tirupati": { lat: 13.6288, lon: 79.4192, label: "Tirupati" },
  "srikakulam": { lat: 18.2949, lon: 83.8938, label: "Srikakulam" },

  // Maharashtra
  "mumbai": { lat: 19.0760, lon: 72.8777, label: "Mumbai" },
  "pune": { lat: 18.5204, lon: 73.8567, label: "Pune" },
  "thane": { lat: 19.2183, lon: 72.9781, label: "Thane" },
  "palghar": { lat: 19.6936, lon: 72.7655, label: "Palghar" },
  "raigad": { lat: 18.5158, lon: 73.1822, label: "Raigad" },
  "ratnagiri": { lat: 16.9902, lon: 73.3120, label: "Ratnagiri" },
  "sindhudurg": { lat: 16.1165, lon: 73.7145, label: "Sindhudurg" },
  "nagpur": { lat: 21.1458, lon: 79.0882, label: "Nagpur" },

  // Tamil Nadu
  "chennai": { lat: 13.0827, lon: 80.2707, label: "Chennai" },
  "kanchipuram": { lat: 12.8342, lon: 79.7036, label: "Kanchipuram" },
  "tiruvallur": { lat: 13.1432, lon: 79.9083, label: "Tiruvallur" },
  "coimbatore": { lat: 11.0168, lon: 76.9558, label: "Coimbatore" },
  "tiruppur": { lat: 11.1085, lon: 77.3411, label: "Tiruppur" },
  "erode": { lat: 11.3410, lon: 77.7172, label: "Erode" },
  "madurai": { lat: 9.9252, lon: 78.1198, label: "Madurai" },
  "salem": { lat: 11.6643, lon: 78.1460, label: "Salem" },

  // Delhi / NCR
  "delhi": { lat: 28.6139, lon: 77.2090, label: "Delhi NCR" },
  "noida": { lat: 28.5355, lon: 77.3910, label: "Noida" },
  "gurugram": { lat: 28.4595, lon: 77.0266, label: "Gurugram" },

  // Odisha
  "bhubaneswar": { lat: 20.2961, lon: 85.8245, label: "Bhubaneswar" },
  "puri": { lat: 19.8135, lon: 85.8312, label: "Puri" },
  "cuttack": { lat: 20.4625, lon: 85.8828, label: "Cuttack" },
  "balasore": { lat: 21.4934, lon: 86.9135, label: "Balasore" },

  // West Bengal
  "kolkata": { lat: 22.5726, lon: 88.3639, label: "Kolkata" },
  "howrah": { lat: 22.5958, lon: 88.2636, label: "Howrah" }
};

export function inferEventAndSeverity(text: string): { event: string; severity: string } {
  const lower = text.toLowerCase();

  let event = "Severe Weather Alert";
  if (
    lower.includes("thunder shower") ||
    lower.includes("thundershower") ||
    lower.includes("thunderstorm") ||
    lower.includes("lightning") ||
    lower.includes("విజా") ||
    lower.includes("విజ") ||
    lower.includes("పిడుగులు") ||
    lower.includes("विजा")
  ) {
    event = "Thunderstorm & Lightning Warning";
  } else if (
    lower.includes("తీవ్ర") ||
    lower.includes("వాయుగుండం") ||
    lower.includes("cyclon") ||
    lower.includes("depression") ||
    lower.includes("squall")
  ) {
    event = "Cyclonic Storm & Squall Warning";
  } else if (
    lower.includes("heavy rain") ||
    lower.includes("downpour") ||
    lower.includes("rain") ||
    lower.includes("वर्षा") ||
    lower.includes("వర్షం") ||
    lower.includes("अतिवृष्टी") ||
    lower.includes("மழை")
  ) {
    event = "Heavy Rainfall Advisory";
  } else if (lower.includes("heat") || lower.includes("loo") || lower.includes("उष्णतेची लाट")) {
    event = "Heatwave Advisory";
  } else if (lower.includes("flood") || lower.includes("inundat") || lower.includes("पूर")) {
    event = "Flood Inundation Warning";
  }

  let severity = "Moderate";
  if (
    lower.includes("తీవ్ర") ||
    lower.includes("extreme") ||
    lower.includes("danger") ||
    lower.includes("disaster") ||
    lower.includes("catastroph") ||
    lower.includes("red alert") ||
    lower.includes("emergency") ||
    lower.includes("अतिवृष्टी")
  ) {
    severity = "Severe";
  } else if (
    lower.includes("thunder shower") ||
    lower.includes("strong wind") ||
    lower.includes("lightning") ||
    lower.includes("moderate rain") ||
    lower.includes("warning") ||
    lower.includes("विजा") ||
    lower.includes("పిడుగులు")
  ) {
    severity = "Moderate";
  } else if (lower.includes("advisory") || lower.includes("light rain") || lower.includes("likely")) {
    severity = "Moderate";
  }

  return { event, severity };
}

export function isAlertRelevantToLocation(
  text: string,
  author: string,
  areaDicts: any[],
  targetLat: number,
  targetLon: number,
  radiusKm: number
): { relevant: boolean; matchedArea: string; distanceKm?: number } {
  // 1. Explicit CAP Circle / Polygon check if present
  for (const area of areaDicts) {
    if (area.circle) {
      try {
        const parts = String(area.circle).replace(/,/g, " ").trim().split(/\s+/);
        if (parts.length >= 3) {
          const cLat = parseFloat(parts[0]);
          const cLon = parseFloat(parts[1]);
          const cRad = parseFloat(parts[2]);
          const dist = haversine(targetLat, targetLon, cLat, cLon);
          if (dist <= radiusKm + cRad) {
            return { relevant: true, matchedArea: "CAP Geometry Circle", distanceKm: Math.round(dist) };
          }
        }
      } catch {}
    }

    if (area.polygon) {
      try {
        const parts = String(area.polygon).replace(/,/g, " ").trim().split(/\s+/);
        for (let i = 0; i < parts.length - 1; i += 2) {
          const pLat = parseFloat(parts[i]);
          const pLon = parseFloat(parts[i + 1]);
          if (!isNaN(pLat) && !isNaN(pLon)) {
            const dist = haversine(targetLat, targetLon, pLat, pLon);
            if (dist <= radiusKm) {
              return { relevant: true, matchedArea: "CAP Polygon", distanceKm: Math.round(dist) };
            }
          }
        }
      } catch {}
    }
  }

  // 2. High-Precision District & Regional Entity Matching
  // Strip trailing "Source :- IMD Bengaluru" or "By :- IMD Hyderabad" to avoid false positive matches on the issuing station location
  const bodyText = text.replace(/Source\s*:-?\s*IMD.*$/i, "").replace(/By\s*:-?\s*.*$/i, "").toLowerCase();
  const matchedDistricts: Array<{ name: string; lat: number; lon: number; label: string; dist: number }> = [];

  for (const [key, geo] of Object.entries(INDIAN_REGIONS_GEO)) {
    if (bodyText.includes(key)) {
      const dist = haversine(targetLat, targetLon, geo.lat, geo.lon);
      matchedDistricts.push({ name: key, ...geo, dist });
    }
  }

  if (matchedDistricts.length > 0) {
    // Sort by closest matched district
    matchedDistricts.sort((a, b) => a.dist - b.dist);
    const closest = matchedDistricts[0];

    // If any matched district in the bulletin is within target radius
    if (closest.dist <= radiusKm) {
      return {
        relevant: true,
        matchedArea: matchedDistricts.map(d => d.label).slice(0, 3).join(", "),
        distanceKm: Math.round(closest.dist)
      };
    } else {
      // The alert explicitly named districts, but they are all outside the user radius!
      return { relevant: false, matchedArea: closest.label, distanceKm: Math.round(closest.dist) };
    }
  }

  // 3. Fallback for statewide bulletins: check author state center
  if (author.includes("IMD Bengaluru") || author.includes("Karnataka")) {
    const dist = haversine(targetLat, targetLon, 13.5, 76.5); // Karnataka center
    if (dist <= radiusKm || radiusKm >= 200) {
      return { relevant: true, matchedArea: "Karnataka Region", distanceKm: Math.round(dist) };
    }
  } else if (author.includes("Maharashtra") || author.includes("SEOC Mumbai")) {
    const dist = haversine(targetLat, targetLon, 19.0, 75.0);
    if (dist <= radiusKm || radiusKm >= 400) {
      return { relevant: true, matchedArea: "Maharashtra Region", distanceKm: Math.round(dist) };
    }
  } else if (author.includes("Andhra Pradesh") || author.includes("Amravati") || author.includes("Visakhapatnam")) {
    const dist = haversine(targetLat, targetLon, 16.0, 80.0);
    if (dist <= radiusKm || radiusKm >= 300) {
      return { relevant: true, matchedArea: "Andhra Pradesh Region", distanceKm: Math.round(dist) };
    }
  } else if (author.includes("Hyderabad") || author.includes("TGiCCC") || author.includes("Telangana")) {
    const dist = haversine(targetLat, targetLon, 17.5, 78.5);
    if (dist <= radiusKm || radiusKm >= 300) {
      return { relevant: true, matchedArea: "Telangana Region", distanceKm: Math.round(dist) };
    }
  }

  // If completely unplaced and radius is tight (e.g. 25km or 50km), do NOT blindly flood the user
  if (radiusKm < 150) {
    return { relevant: false, matchedArea: "Other Region" };
  }

  return { relevant: false, matchedArea: "National Advisory" };
}

export async function fetchSachetAlerts(
  latitude: number,
  longitude: number,
  radius: number = 50
): Promise<Array<{ info: Record<string, any>; identifier: string }> | null> {
  const sachetUrl = process.env.SACHET_API_URL || DEFAULT_SACHET_URL;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(sachetUrl, {
      headers: { "User-Agent": "WeatherGPT-DisasterMonitor/1.0" },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const xmlText = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
    const parsedData = parser.parse(xmlText);

    const channel = parsedData?.rss?.channel;
    if (!channel) return [];

    let items = channel.item || [];
    if (!Array.isArray(items)) {
      items = [items];
    }

    const relevantAlerts: Array<{ info: Record<string, any>; identifier: string }> = [];

    for (const item of items) {
      const guid = typeof item.guid === "object" ? item.guid["#text"] : item.guid;
      const identifier = String(guid || item.identifier || "unknown");

      const titleText = String(item.title || "").trim();
      const authorText = String(item.author || "").trim();
      const pubDate = String(item.pubDate || new Date().toISOString());

      // Parse Event & Severity intelligently from the text
      const { event, severity } = inferEventAndSeverity(`${titleText} ${item["cap:event"] || ""}`);

      const info: Record<string, any> = {
        identifier,
        event: item["cap:event"] || event,
        severity: item["cap:severity"] || severity,
        category: item.category || "Met",
        headline: titleText,
        description: titleText,
        effective: item["cap:effective"] || pubDate,
        expires: item["cap:expires"] || "",
        source: authorText ? `NDMA SACHET (${authorText})` : "NDMA SACHET CAP"
      };

      const areaDicts: any[] = [];
      if (item["cap:circle"]) areaDicts.push({ circle: item["cap:circle"] });
      if (item["cap:polygon"]) areaDicts.push({ polygon: item["cap:polygon"] });

      // Precise Location & Radius Filter
      const check = isAlertRelevantToLocation(
        titleText,
        authorText,
        areaDicts,
        latitude,
        longitude,
        radius
      );

      if (check.relevant) {
        info.area_desc = check.matchedArea;
        info.distance_km = check.distanceKm;
        relevantAlerts.push({ info, identifier });
      }
    }

    return relevantAlerts;
  } catch (err) {
    console.warn("SACHET API fetch error (graceful fallback):", err);
    return null;
  }
}
