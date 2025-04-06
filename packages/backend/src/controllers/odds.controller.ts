import { Empire, MillenniumFalcon, calculateSuccessProbability, createDatabase } from 'core';
import { Request, Response } from 'express';

import { ApiError } from '../middleware/error.middleware';
import fs from 'fs/promises';
import { resolve } from 'path';

/**
 * POST /api/odds
 * Accepts an `empire.json` payload, loads falcon config and routes internally, and returns odds.
 */
export const calculateOdds = async (req: Request, res: Response) => {
  try {
    const { empire } = req.body as { empire: Empire };

    if (!empire) {
      throw new ApiError('Missing empire data', 400, 'MISSING_EMPIRE_DATA');
    }

    const falconPath = resolve('src/data/millennium-falcon.json');
    let falcon: MillenniumFalcon & { routes_db: string };
    
    try {
      falcon = JSON.parse(await fs.readFile(falconPath, 'utf-8'));
    } catch (err) {
      throw new ApiError('Failed to load Millennium Falcon configuration', 500, 'FALCON_CONFIG_ERROR');
    }

    const dbPath = resolve('src/data', falcon.routes_db);
    let db;
    try {
      db = await createDatabase({ path: dbPath });
      const routes = await db.getAllRoutes();
      await db.close();
      const odds = calculateSuccessProbability(falcon, empire, routes);
      res.json({ data: { odds } });
    } catch (err) {
      if (db) {
        await db.close();
      }
      throw new ApiError('Failed to calculate odds', 500, 'CALCULATION_ERROR');
    }
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError('Internal server error', 500, 'INTERNAL_SERVER_ERROR');
  }
};
