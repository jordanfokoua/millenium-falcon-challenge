export interface MillenniumFalcon {
  autonomy: number;
  departure: string;
  arrival: string;
  routes_db: string;
}

export interface Empire {
  countdown: number;
  bounty_hunters: Array<{
    planet: string;
    day: number;
  }>;
}

export interface Route {
  origin: string;
  destination: string;
  travel_time: number;
} 