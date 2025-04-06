import { DatabaseConfig, Database as DatabaseInterface } from '../types/database';

import { Route } from '../types';
import SQLite from 'better-sqlite3';

export async function createDatabase(config: DatabaseConfig): Promise<DatabaseInterface> {
  const db = new SQLite(config.path);
  
  return {
    async getAllRoutes(): Promise<Route[]> {
      const stmt = db.prepare('SELECT * FROM ROUTES');
      return stmt.all() as Route[];
    },

    async getRoutesFromPlanet(planet: string): Promise<Route[]> {
      const stmt = db.prepare('SELECT * FROM ROUTES WHERE ORIGIN = ?');
      return stmt.all(planet) as Route[];
    },

    async getRoutesToPlanet(planet: string): Promise<Route[]> {
      const stmt = db.prepare('SELECT * FROM ROUTES WHERE DESTINATION = ?');
      return stmt.all(planet) as Route[];
    },

    async close(): Promise<void> {
      db.close();
    }
  };
} 