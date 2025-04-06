import { Route } from './index';

export interface DatabaseConfig {
  path: string;
}

export interface Database {
  getAllRoutes(): Promise<Route[]>;
  getRoutesFromPlanet(planet: string): Promise<Route[]>;
  getRoutesToPlanet(planet: string): Promise<Route[]>;
  close(): Promise<void>;
} 