import { Empire, MillenniumFalcon, Route, createDatabase } from 'core';
import { ValidationError, validateEmpire, validateFileFormat, validateJson, validateMillenniumFalcon } from './validation';

import fs from 'fs';
import path from 'path';

export async function loadInputs(falconPath: string, empirePath: string): Promise<{ falcon: MillenniumFalcon; empire: Empire; routes: Route[] }> {
  try {
    validateFileFormat(falconPath);
    validateFileFormat(empirePath);

    const falconRaw = await fs.promises.readFile(falconPath, 'utf-8');
    const empireRaw = await fs.promises.readFile(empirePath, 'utf-8');

    const falconData = validateJson(falconRaw, falconPath);
    const empireData = validateJson(empireRaw, empirePath);

    const falcon = validateMillenniumFalcon(falconData);
    const empire = validateEmpire(empireData);

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
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    throw new ValidationError(error instanceof Error ? error.message : 'Unknown error occurred', 'LOAD_ERROR');
  }
}
