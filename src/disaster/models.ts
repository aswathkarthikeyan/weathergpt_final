export interface DisasterAlertInput {
  latitude: number;
  longitude: number;
  radius?: number;
}

export interface AlertItem {
  id: string;
  title: string;
  severity: string;
  category: string;
  description: string;
  effective_from: string;
  expires_on: string;
  source: string;
}

export interface DisasterAlertResponse {
  status: "success" | "error";
  count: number;
  alerts: AlertItem[];
}
