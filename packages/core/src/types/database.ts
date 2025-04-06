import { Route } from './index';

export interface DatabaseConfig {
  path: string;
}

export interface Database {
  getAllRoutes(): Promise<Route[]>;
  close(): Promise<void>;
} 