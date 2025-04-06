import { Empire, MillenniumFalcon, Route, createDatabase } from 'core';

import fs from 'fs';
import path from 'path';

export async function loadInputs(falconPath: string, empirePath: string): Promise<{ falcon: MillenniumFalcon; empire: Empire; routes: Route[] }> {
  const falconRaw = await fs.promises.readFile(falconPath, 'utf-8');
  const empireRaw = await fs.promises.readFile(empirePath, 'utf-8');

  const falcon = JSON.parse(falconRaw) as MillenniumFalcon;
  const empire = JSON.parse(empireRaw) as Empire;

  if (!falcon.routes_db) {
    throw new Error('routes_db is required in millennium-falcon.json');
  }

  const dbPath = path.isAbsolute(falcon.routes_db) ? falcon.routes_db : path.resolve(path.dirname(falconPath), falcon.routes_db);

  if (!dbPath) {
    throw new Error('routes_db is required in millennium-falcon.json');
  }

  const db = await createDatabase({ path: dbPath });
  const routes = await db.getAllRoutes();
  await db.close();

  return { falcon, empire, routes };
}
