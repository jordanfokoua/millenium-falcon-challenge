export interface Empire {
  countdown: number;
  bounty_hunters: BountyHunter[];
}

export interface MillenniumFalcon {
  autonomy: number;
  departure: string;
  arrival: string;
}

export interface Route {
  origin: string;
  destination: string;
  travelTime: number;
}

export interface BountyHunter {
  planet: string;
  day: number;
}
