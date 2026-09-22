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

export function isWithinRadius(areaData: any, lat: number, lon: number, radius: number): boolean {
  if (!areaData) return false;

  const areas = Array.isArray(areaData) ? areaData : [areaData];
  let hasGeometry = false;

  for (const area of areas) {
    if (area.circle) {
      hasGeometry = true;
      try {
        const parts = String(area.circle).replace(/,/g, " ").trim().split(/\s+/);
        if (parts.length >= 3) {
          const cLat = parseFloat(parts[0]);
          const cLon = parseFloat(parts[1]);
          const cRad = parseFloat(parts[2]);
          if (haversine(lat, lon, cLat, cLon) <= radius + cRad) {
            return true;
          }
        }
      } catch {
        // Ignore parse errors
      }
    }

    if (area.polygon) {
      hasGeometry = true;
      try {
        const parts = String(area.polygon).replace(/,/g, " ").trim().split(/\s+/);
        for (let i = 0; i < parts.length - 1; i += 2) {
          const pLat = parseFloat(parts[i]);
          const pLon = parseFloat(parts[i + 1]);
          if (!isNaN(pLat) && !isNaN(pLon) && haversine(lat, lon, pLat, pLon) <= radius) {
            return true;
          }
        }
      } catch {
        // Ignore parse errors
      }
    }
  }

  // Fallback: If no geometry is specified in the alert, include it by default (e.g. broad state alerts)
  if (!hasGeometry) {
    return true;
  }

  return false;
}

export async function fetchSachetAlerts(
  latitude: number,
  longitude: number,
  radius: number
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

      const info: Record<string, any> = {};
      const areaDicts: any[] = [];

      if (item.alert && item.alert.info) {
        const alertInfo = Array.isArray(item.alert.info) ? item.alert.info[0] : item.alert.info;
        info.event = alertInfo.event || "Unknown Event";
        info.severity = alertInfo.severity || "Unknown";
        info.category = alertInfo.category || "Weather";
        info.description = alertInfo.description || "";
        info.effective = alertInfo.effective || "";
        info.expires = alertInfo.expires || "";

        const areas = alertInfo.area ? (Array.isArray(alertInfo.area) ? alertInfo.area : [alertInfo.area]) : [];
        areaDicts.push(...areas);
      } else {
        info.event = item["cap:event"] || item.title || "Unknown Event";
        info.severity = item["cap:severity"] || "Unknown";
        info.category = item["cap:category"] || "Weather";
        info.description = item.description || "";
        info.effective = item["cap:effective"] || "";
        info.expires = item["cap:expires"] || "";

        const areaDict: Record<string, any> = {};
        if (item["cap:circle"]) areaDict.circle = item["cap:circle"];
        if (item["cap:polygon"]) areaDict.polygon = item["cap:polygon"];
        if (Object.keys(areaDict).length > 0) areaDicts.push(areaDict);
      }

      info.identifier = identifier;

      if (isWithinRadius(areaDicts, latitude, longitude, radius)) {
        relevantAlerts.push({ info, identifier });
      }
    }

    return relevantAlerts;
  } catch (err) {
    console.warn("SACHET API fetch error (graceful fallback):", err);
    return null;
  }
}
