export interface Empire {
  countdown: number;
  bounty_hunters: Array<{
    planet: string;
    day: number;
  }>;
}

export interface MillenniumFalcon {
  autonomy: number;
  departure: string;
  arrival: string;
  routes_db: string;
} 