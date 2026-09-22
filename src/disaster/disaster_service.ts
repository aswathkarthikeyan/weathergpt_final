import crypto from "crypto";
import { fetchSachetAlerts } from "./sachet_client.js";
import { AlertItem, DisasterAlertResponse } from "./models.js";

const SEVERITY_THRESHOLDS = ["Extreme", "Severe", "High", "Moderate", "Low", "Minor", "Unknown"];

export function normalizeSeverity(rawSeverity: string): string {
  if (!rawSeverity) return "Unknown";
  const str = String(rawSeverity).trim();
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  return SEVERITY_THRESHOLDS.includes(capitalized) ? capitalized : "Unknown";
}

export function generateAlertFingerprint(alertDict: Record<string, any>): string {
  const uniqueString = `${alertDict.event}-${alertDict.effective}-${alertDict.description}`;
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

    normalizedAlerts.push({
      id: String(alertId),
      title: String(info.event || "Unknown Event"),
      severity: normalizeSeverity(info.severity || "Unknown"),
      category: String(info.category || "Weather"),
      description: String(info.description || "No description provided."),
      effective_from: String(info.effective || ""),
      expires_on: String(info.expires || ""),
      source: "SACHET / NDMA"
    });
  }

  return {
    status: "success",
    count: normalizedAlerts.length,
    alerts: normalizedAlerts
  };
}
