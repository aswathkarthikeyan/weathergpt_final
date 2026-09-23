import { getDisasterAlerts } from "./disaster_service.js";
import { AlertItem } from "./models.js";

const SUBSCRIBED_USERS_REGISTRY = [
  { user_id: "user_123", lat: 12.9716, lon: 77.59, radius: 50, monitor_enabled: true }
];

const NOTIFIED_ALERTS = new Set<string>();

export function informUserOfDisaster(userId: string, alert: AlertItem) {
  console.log(`[DISASTER MONITOR] Sending disaster notification to ${userId}:`);
  console.log(`⚠️ ${alert.severity} Weather Alert: ${alert.title}\n${alert.description}\nSource: ${alert.source}`);
}

export async function runHourlyCheck() {
  console.log("[DISASTER MONITOR] Hourly check started");

  for (const user of SUBSCRIBED_USERS_REGISTRY) {
    if (!user.monitor_enabled) continue;

    try {
      const response = await getDisasterAlerts(user.lat, user.lon, user.radius);
      if (response.status === "error") continue;

      for (const alert of response.alerts) {
        if (["Extreme", "Severe", "High"].includes(alert.severity)) {
          if (NOTIFIED_ALERTS.has(alert.id)) continue;
          informUserOfDisaster(user.user_id, alert);
          NOTIFIED_ALERTS.add(alert.id);
        }
      }
    } catch (err) {
      console.warn("[DISASTER MONITOR] Check error:", err);
    }
  }

  console.log("[DISASTER MONITOR] Hourly check completed");
}

let monitorInterval: NodeJS.Timeout | null = null;

export function startDisasterScheduler() {
  if (monitorInterval) return;
  // Run every hour
  monitorInterval = setInterval(runHourlyCheck, 60 * 60 * 1000);
  // Initial run on startup
  runHourlyCheck().catch(() => {});
}
