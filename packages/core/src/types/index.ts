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
  travel_time: number;
}

export interface BountyHunter {
  planet: string;
  day: number;
}

export interface PlanetVisit {
  name: string;
  day: number;
  action?: 'wait' | 'refuel';
}

export interface Path {
  planets: PlanetVisit[];
}

export interface TravelState {
  planet: string;
  day: number;
  fuel: number;
  path: PlanetVisit[];
}
