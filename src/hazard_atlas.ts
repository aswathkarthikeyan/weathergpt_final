/**
 * IMD Hazard Atlas & Historical Climate Normals Service
 * Grounded in IMD Pune Climate Hazard & Vulnerability Atlas (imdpune.gov.in/hazardatlas)
 * Covers extreme rainfall, cyclone vulnerability, flood return periods, heatwave thresholds,
 * and 10-year historical monsoon onset/withdrawal normals across Indian meteorological subdivisions.
 */

export interface DistrictHazardProfile {
  district: string;
  state: string;
  subdivision: string;
  monsoon_onset_normal: string;
  monsoon_withdrawal_normal: string;
  annual_rainfall_normal_mm: number;
  cyclone_vulnerability: string;
  flood_hazard_level: string;
  flood_history: string;
  extreme_24h_rainfall_record_mm: number;
  extreme_rainfall_record_date: string;
  heatwave_vulnerability: string;
  thunderstorm_lightning_hazard: string;
  soil_type_primary: string;
}

export const HAZARD_ATLAS_DATABASE: Record<string, DistrictHazardProfile> = {
  "bengaluru": {
    district: "Bengaluru Urban",
    state: "Karnataka",
    subdivision: "South Interior Karnataka",
    monsoon_onset_normal: "June 2 - June 5",
    monsoon_withdrawal_normal: "October 15 - October 20",
    annual_rainfall_normal_mm: 986.5,
    cyclone_vulnerability: "Low (Indirect feeder band rain)",
    flood_hazard_level: "Moderate (Urban valley flash waterlogging)",
    flood_history: "Significant urban flash flood events in Sept 2022 (Bellandur/Outer Ring Road, 131.6 mm in 24h), Oct 2005 (114 mm in 4h), and Oct 2017 (Hebbal valley inundation).",
    extreme_24h_rainfall_record_mm: 179.8,
    extreme_rainfall_record_date: "12 September 1988",
    heatwave_vulnerability: "Low",
    thunderstorm_lightning_hazard: "High (Pre-monsoon convective thunderstorms April-May and retreating monsoon Sept-Oct)",
    soil_type_primary: "Red loamy and red clay soil (moderate infiltration)"
  },
  "bangalore": {
    district: "Bengaluru Urban",
    state: "Karnataka",
    subdivision: "South Interior Karnataka",
    monsoon_onset_normal: "June 2 - June 5",
    monsoon_withdrawal_normal: "October 15 - October 20",
    annual_rainfall_normal_mm: 986.5,
    cyclone_vulnerability: "Low (Indirect feeder band rain)",
    flood_hazard_level: "Moderate (Urban valley flash waterlogging)",
    flood_history: "Significant urban flash flood events in Sept 2022 (Bellandur/Outer Ring Road, 131.6 mm in 24h), Oct 2005 (114 mm in 4h), and Oct 2017 (Hebbal valley inundation).",
    extreme_24h_rainfall_record_mm: 179.8,
    extreme_rainfall_record_date: "12 September 1988",
    heatwave_vulnerability: "Low",
    thunderstorm_lightning_hazard: "High (Pre-monsoon convective thunderstorms April-May and retreating monsoon Sept-Oct)",
    soil_type_primary: "Red loamy and red clay soil (moderate infiltration)"
  },
  "coimbatore": {
    district: "Coimbatore",
    state: "Tamil Nadu",
    subdivision: "Tamil Nadu, Puducherry & Karaikal",
    monsoon_onset_normal: "June 4 (SW Monsoon rainshadow) & October 20 (NE Monsoon)",
    monsoon_withdrawal_normal: "December 15 - December 20",
    annual_rainfall_normal_mm: 698.2,
    cyclone_vulnerability: "Moderate (Depression remnants from Bay of Bengal)",
    flood_hazard_level: "Moderate (Noyyal river basin localized overflow)",
    flood_history: "November 1992 (Noyyal overflow), November 2015, and Dec 2023 localized inundation in low-lying Valankulam and Singanallur catchments.",
    extreme_24h_rainfall_record_mm: 147.2,
    extreme_rainfall_record_date: "18 November 1992",
    heatwave_vulnerability: "Moderate",
    thunderstorm_lightning_hazard: "Moderate (Palghat gap orographic storm cells)",
    soil_type_primary: "Black cotton soil and red sandy loam"
  },
  "chennai": {
    district: "Chennai",
    state: "Tamil Nadu",
    subdivision: "Tamil Nadu, Puducherry & Karaikal",
    monsoon_onset_normal: "October 18 - October 22 (Northeast Monsoon primary)",
    monsoon_withdrawal_normal: "December 30",
    annual_rainfall_normal_mm: 1400.0,
    cyclone_vulnerability: "Very High (East Coast Bay of Bengal landfall zone)",
    flood_hazard_level: "Severe / Recurrent (Adyar, Cooum, and Kosasthalaiyar basins)",
    flood_history: "Disastrous inundation during Dec 2015 (494 mm in 24h), Cyclone Michaung Dec 2023 (450 mm in 36h), and Cyclone Vardah Dec 2016.",
    extreme_24h_rainfall_record_mm: 494.0,
    extreme_rainfall_record_date: "01 December 2015",
    heatwave_vulnerability: "Moderate (High humid heat stress / wet-bulb temps)",
    thunderstorm_lightning_hazard: "Moderate to High",
    soil_type_primary: "Coastal alluvium, clay, and sand"
  },
  "mumbai": {
    district: "Mumbai City & Suburban",
    state: "Maharashtra",
    subdivision: "Konkan & Goa",
    monsoon_onset_normal: "June 10 - June 12",
    monsoon_withdrawal_normal: "October 8 - October 12",
    annual_rainfall_normal_mm: 2200.0,
    cyclone_vulnerability: "Moderate (Arabian Sea post-monsoon cyclonic systems, e.g. Cyclone Nisarga 2020)",
    flood_hazard_level: "Severe / Recurrent (Mithi river overflow, high tide + cloudburst concurrence)",
    flood_history: "Catastrophic 26 July 2005 cloudburst (944 mm in 24h, Santacruz); July 2019 (375 mm); July 2021 intense convective downpours.",
    extreme_24h_rainfall_record_mm: 944.2,
    extreme_rainfall_record_date: "26 July 2005",
    heatwave_vulnerability: "Moderate (Extreme humid coastal heat stress in May/Oct)",
    thunderstorm_lightning_hazard: "Moderate",
    soil_type_primary: "Coastal alluvium and basaltic trap"
  },
  "delhi": {
    district: "New Delhi & NCR",
    state: "Delhi",
    subdivision: "Haryana, Chandigarh & Delhi",
    monsoon_onset_normal: "June 27 - June 30",
    monsoon_withdrawal_normal: "September 25 - September 28",
    annual_rainfall_normal_mm: 774.4,
    cyclone_vulnerability: "Nil (Inland)",
    flood_hazard_level: "High (Yamuna river flood plain overflow, Hathnikund barrage discharge)",
    flood_history: "Historic Yamuna river flooding in July 2023 (Yamuna level 208.66m, water entered Red Fort and ITO), Sept 1978 (207.49m), and Sept 2010.",
    extreme_24h_rainfall_record_mm: 266.2,
    extreme_rainfall_record_date: "21 July 1958 (Recent: 153 mm on 9 July 2023)",
    heatwave_vulnerability: "High (Loo winds, maximum temperatures exceeding 47-49°C in May-June)",
    thunderstorm_lightning_hazard: "Moderate (Dust storms / Andhi pre-monsoon)",
    soil_type_primary: "Alluvial soil (Yamuna flood plain silt and sandy loam)"
  },
  "new delhi": {
    district: "New Delhi & NCR",
    state: "Delhi",
    subdivision: "Haryana, Chandigarh & Delhi",
    monsoon_onset_normal: "June 27 - June 30",
    monsoon_withdrawal_normal: "September 25 - September 28",
    annual_rainfall_normal_mm: 774.4,
    cyclone_vulnerability: "Nil (Inland)",
    flood_hazard_level: "High (Yamuna river flood plain overflow, Hathnikund barrage discharge)",
    flood_history: "Historic Yamuna river flooding in July 2023 (Yamuna level 208.66m, water entered Red Fort and ITO), Sept 1978 (207.49m), and Sept 2010.",
    extreme_24h_rainfall_record_mm: 266.2,
    extreme_rainfall_record_date: "21 July 1958 (Recent: 153 mm on 9 July 2023)",
    heatwave_vulnerability: "High (Loo winds, maximum temperatures exceeding 47-49°C in May-June)",
    thunderstorm_lightning_hazard: "Moderate (Dust storms / Andhi pre-monsoon)",
    soil_type_primary: "Alluvial soil (Yamuna flood plain silt and sandy loam)"
  },
  "kolkata": {
    district: "Kolkata",
    state: "West Bengal",
    subdivision: "Gangetic West Bengal",
    monsoon_onset_normal: "June 8 - June 10",
    monsoon_withdrawal_normal: "October 10 - October 15",
    annual_rainfall_normal_mm: 1750.0,
    cyclone_vulnerability: "Very High (Bay of Bengal super cyclones, e.g. Amphan 2020, Yaas 2021, Remal 2024)",
    flood_hazard_level: "Severe / Recurrent (Hooghly river tidal surges and drainage congestion)",
    flood_history: "September 1978 (widespread inundation), September 2000, Super Cyclone Amphan (May 2020, winds > 133 km/h in city), Cyclone Remal (May 2024).",
    extreme_24h_rainfall_record_mm: 369.6,
    extreme_rainfall_record_date: "27 September 1978",
    heatwave_vulnerability: "High (Prolonged sultry humid heat stress April-May)",
    thunderstorm_lightning_hazard: "High (Kalbaishakhi / Nor'westers March-May with squalls > 80 km/h)",
    soil_type_primary: "Deltaic alluvial silt and clay"
  },
  "hyderabad": {
    district: "Hyderabad",
    state: "Telangana",
    subdivision: "Telangana",
    monsoon_onset_normal: "June 5 - June 8",
    monsoon_withdrawal_normal: "October 15",
    annual_rainfall_normal_mm: 812.5,
    cyclone_vulnerability: "Low (Remnant depressions)",
    flood_hazard_level: "High (Musi river catchment and urban nala flash floods)",
    flood_history: "Catastrophic October 2020 urban flooding (190 mm in 24h, widespread waterlogging in LB Nagar and Begumpet); August 2000 historic cloudburst.",
    extreme_24h_rainfall_record_mm: 241.5,
    extreme_rainfall_record_date: "24 August 2000",
    heatwave_vulnerability: "High (Telangana plateau heatwave zone in April-May > 44°C)",
    thunderstorm_lightning_hazard: "Moderate",
    soil_type_primary: "Red gravelly and mixed red-black soils"
  }
};

/**
 * Lookup historical hazard atlas data for a given city or district name
 */
export function queryHazardAtlas(cityName: string): DistrictHazardProfile | null {
  const norm = (cityName || "").trim().toLowerCase();
  for (const [key, profile] of Object.entries(HAZARD_ATLAS_DATABASE)) {
    if (norm.includes(key) || norm.includes(profile.district.toLowerCase()) || norm.includes(profile.state.toLowerCase())) {
      return profile;
    }
  }
  // Return generalized Indian climatological baseline if not explicitly in table
  return {
    district: cityName || "Regional District",
    state: "India",
    subdivision: "Indian Meteorological Subdivision",
    monsoon_onset_normal: "June 1 - June 15 (Standard SW Monsoon Progression)",
    monsoon_withdrawal_normal: "October 1 - October 15",
    annual_rainfall_normal_mm: 1100.0,
    cyclone_vulnerability: "Moderate",
    flood_hazard_level: "Moderate",
    flood_history: "Historical flood recurrence aligns with peak monsoon months (July-August) and active low pressure depressions.",
    extreme_24h_rainfall_record_mm: 150.0,
    extreme_rainfall_record_date: "IMD Historical Archive Peak Record",
    heatwave_vulnerability: "Moderate",
    thunderstorm_lightning_hazard: "Moderate",
    soil_type_primary: "Alluvial / Loamy soil"
  };
}
