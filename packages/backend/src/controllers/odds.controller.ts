import { Empire, MillenniumFalcon, calculateSuccessProbability, createDatabase } from 'core';
import { Request, Response } from 'express';

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
      return res.status(400).json({ error: 'Missing empire data' });
    }

    const falconPath = resolve('src/data/millennium-falcon.json');
    const falcon: MillenniumFalcon & { routes_db: string } = JSON.parse(await fs.readFile(falconPath, 'utf-8'));

    const dbPath = resolve('src/data', falcon.routes_db);
    const db = await createDatabase({ path: dbPath });
    const routes = await db.getAllRoutes();
    await db.close();
    const odds = calculateSuccessProbability(falcon, empire, routes);
    res.json({ data: { odds } });
  } catch (err) {
    console.error('Error in calculateOdds:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
