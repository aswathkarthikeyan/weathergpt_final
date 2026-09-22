export const UV_INDEX_REFERENCE = {
  uv_scale: {
    "0-2": { level: "Low", color: "Green", risk: "Minimal danger" },
    "3-5": { level: "Moderate", color: "Yellow", risk: "Low to moderate risk" },
    "6-7": { level: "High", color: "Orange", risk: "High risk of harm" },
    "8-10": { level: "Very High", color: "Red", risk: "Very high risk of damage" },
    "11+": { level: "Extreme", color: "Violet", risk: "Extreme risk of harm" }
  },
  discrete_lookup: {
    "0": "Low",
    "1": "Low",
    "2": "Low",
    "3": "Moderate",
    "4": "Moderate",
    "5": "Moderate",
    "6": "High",
    "7": "High",
    "8": "Very High",
    "9": "Very High",
    "10": "Very High",
    "11+": "Extreme"
  }
};

export const PRECIPITATION_RANGE_REFERENCE = {
  title: "Meteorological Precipitation Intensity Classification",
  unit: "mm/hr",
  classifications: [
    { condition: "No Precipitation", min_mm_per_hour: 0.0, max_mm_per_hour: 0.0, description: "Dry conditions; no measurable precipitation." },
    { condition: "Trace / Very Light", min_mm_per_hour: 0.01, max_mm_per_hour: 0.25, description: "Barely measurable precipitation droplets; no accumulation." },
    { condition: "Light Rain", min_mm_per_hour: 0.25, max_mm_per_hour: 2.5, description: "Light drizzle or light rain; slow puddle formation." },
    { condition: "Moderate Rain", min_mm_per_hour: 2.5, max_mm_per_hour: 7.6, description: "Continuous steady rainfall; umbrellas required, puddles forming." },
    { condition: "Heavy Rain", min_mm_per_hour: 7.6, max_mm_per_hour: 50.0, description: "Heavy downpour; rapid accumulation, reduced visibility while driving." },
    { condition: "Violent / Torrential Rain", min_mm_per_hour: 50.0, max_mm_per_hour: 100.0, description: "Extreme convective rainfall; high risk of flash flooding and hydroplaning." }
  ]
};

export const WMO_CODE_REFERENCE: Array<{ code: string; description: string }> = [
  { code: "00", description: "Cloud development not observed or not observable" },
  { code: "01", description: "Clouds generally dissolving or becoming less developed" },
  { code: "02", description: "State of sky on the whole unchanged" },
  { code: "03", description: "Clouds generally forming or developing" },
  { code: "04", description: "Visibility reduced by smoke, industrial smoke or volcanic ashes" },
  { code: "05", description: "Haze" },
  { code: "06", description: "Widespread dust in suspension in the air" },
  { code: "10", description: "Mist" },
  { code: "21", description: "Rain (not freezing)" },
  { code: "22", description: "Snow" },
  { code: "45", description: "Fog or ice fog" },
  { code: "51", description: "Drizzle, not freezing, light" },
  { code: "53", description: "Drizzle, not freezing, moderate" },
  { code: "55", description: "Drizzle, not freezing, dense" },
  { code: "61", description: "Rain, not freezing, slight" },
  { code: "63", description: "Rain, not freezing, moderate" },
  { code: "65", description: "Rain, not freezing, heavy" },
  { code: "71", description: "Snow fall, slight" },
  { code: "73", description: "Snow fall, moderate" },
  { code: "75", description: "Snow fall, heavy" },
  { code: "80", description: "Rain shower(s), slight" },
  { code: "81", description: "Rain shower(s), moderate or heavy" },
  { code: "82", description: "Rain shower(s), violent" },
  { code: "95", description: "Thunderstorm, slight or moderate" },
  { code: "96", description: "Thunderstorm with hail" }
];

export const VISIBILITY_RANGE_REFERENCE = "";
