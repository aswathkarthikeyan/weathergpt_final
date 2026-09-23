import crypto from "crypto";
import { fetchSachetAlerts } from "./sachet_client.js";
import { AlertItem, DisasterAlertResponse } from "./models.js";

const SEVERITY_THRESHOLDS = ["Extreme", "Severe", "High", "Moderate", "Low", "Minor", "Unknown"];

export function normalizeSeverity(rawSeverity: string): string {
  if (!rawSeverity) return "Moderate";
  const str = String(rawSeverity).trim();
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  return SEVERITY_THRESHOLDS.includes(capitalized) ? capitalized : "Moderate";
}

export function generateAlertFingerprint(alertDict: Record<string, any>): string {
  const uniqueString = `${alertDict.event}-${alertDict.effective}-${alertDict.headline || alertDict.description}`;
  return crypto.createHash("md5").update(uniqueString).digest("hex");
}

export async function getDisasterAlerts(
  latitude: number,
  longitude: number,
  radius: number = 50
): Promise<DisasterAlertResponse> {
  const rawAlerts = await fetchSachetAlerts(latitude, longitude, radius);

  // Failure should not break normal weather requests
  if (rawAlerts === null) {
    return { status: "error", count: 0, alerts: [] };
  }

  const normalizedAlerts: AlertItem[] = [];

  for (const raw of rawAlerts) {
    const info = raw.info || {};
    const alertId = raw.identifier || generateAlertFingerprint(info);
    const eventName = String(info.event || "Severe Weather Advisory");
    const headlineText = String(info.headline || info.description || eventName);
    const descriptionText = String(info.description || headlineText || "Active meteorological alert issued by disaster management authority.");

    normalizedAlerts.push({
      id: String(alertId),
      title: eventName,
      event: eventName,
      severity: normalizeSeverity(info.severity || "Moderate"),
      category: String(info.category || "Met"),
      headline: headlineText,
      description: descriptionText,
      area_desc: String(info.area_desc || "Regional Impact Zone"),
      effective_from: String(info.effective || new Date().toISOString()),
      effective: String(info.effective || new Date().toISOString()),
      expires_on: String(info.expires || ""),
      expires: String(info.expires || ""),
      source: String(info.source || "SACHET / NDMA")
    });
  }

  return {
    status: "success",
    count: normalizedAlerts.length,
    alerts: normalizedAlerts
  };
}
