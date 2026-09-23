export interface DisasterAlertInput {
  latitude: number;
  longitude: number;
  radius?: number;
}

export interface AlertItem {
  id: string;
  title: string;
  event: string;
  severity: string;
  category: string;
  headline: string;
  description: string;
  area_desc: string;
  effective_from: string;
  effective?: string;
  expires_on: string;
  expires?: string;
  source: string;
}

export interface DisasterAlertResponse {
  status: "success" | "error";
  count: number;
  alerts: AlertItem[];
}
