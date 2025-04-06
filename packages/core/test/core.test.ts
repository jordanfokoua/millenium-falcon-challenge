import { Empire, MillenniumFalcon, Route } from '../src/types';
import { describe, it } from 'mocha';

import { strict as assert } from 'assert';
import { calculateSuccessProbability } from '../src/engine';
import { createDatabase } from '../src/database';
import { join } from 'path';
import { readFileSync } from 'fs';

type TestFalcon = MillenniumFalcon & { routes_db: string };

describe('calculateSuccessProbability', () => {
  describe('Example 1', () => {
    it('should return 0% when Millennium Falcon cannot reach Endor in 7 days with bounty hunters on Hoth', async () => {
      const basePath = join(__dirname, '../examples/example1/');
      const millenniumFalcon: TestFalcon = JSON.parse(readFileSync(join(basePath, 'millennium-falcon.json'), 'utf8'));
      const db = await createDatabase({ path: join(basePath, millenniumFalcon.routes_db) });
      const empire: Empire = JSON.parse(readFileSync(join(basePath, 'empire.json'), 'utf8'));
      const expectedValue = JSON.parse(readFileSync(join(basePath, 'answer.json'), 'utf8'));
      const routes = await db.getAllRoutes();
      const probability = calculateSuccessProbability(millenniumFalcon, empire, routes);
      assert.strictEqual(probability, expectedValue.odds);
      await db.close();
    });
  });

  describe('Example 2', () => {
    it('should return 81% when Millennium Falcon can reach Endor in 8 days with bounty hunters on Hoth', async () => {
      const basePath = join(__dirname, '../examples/example2/');
      const millenniumFalcon: TestFalcon = JSON.parse(readFileSync(join(basePath, 'millennium-falcon.json'), 'utf8'));
      const db = await createDatabase({ path: join(basePath, millenniumFalcon.routes_db) });
      const empire: Empire = JSON.parse(readFileSync(join(basePath, 'empire.json'), 'utf8'));
      const expectedValue = JSON.parse(readFileSync(join(basePath, 'answer.json'), 'utf8'));
      const routes = await db.getAllRoutes();
      const probability = calculateSuccessProbability(millenniumFalcon, empire, routes);
      assert.strictEqual(probability, expectedValue.odds);
      await db.close();
    });
  });

  describe('Example 3', () => {
    it('should return 90% when Millennium Falcon can reach Endor in 9 days with bounty hunters on Hoth', async () => {
      const basePath = join(__dirname, '../examples/example3/');
      const millenniumFalcon: TestFalcon = JSON.parse(readFileSync(join(basePath, 'millennium-falcon.json'), 'utf8'));
      const db = await createDatabase({ path: join(basePath, millenniumFalcon.routes_db) });
      const empire: Empire = JSON.parse(readFileSync(join(basePath, 'empire.json'), 'utf8'));
      const expectedValue = JSON.parse(readFileSync(join(basePath, 'answer.json'), 'utf8'));
      const routes = await db.getAllRoutes();
      const probability = calculateSuccessProbability(millenniumFalcon, empire, routes);
      assert.strictEqual(probability, expectedValue.odds);
      await db.close();
    });
  });

  describe('Example 4', () => {
    it('should return 100% when Millennium Falcon can reach Endor in 10 days avoiding bounty hunters', async () => {
      const basePath = join(__dirname, '../examples/example4/');
      const millenniumFalcon: TestFalcon = JSON.parse(readFileSync(join(basePath, 'millennium-falcon.json'), 'utf8'));
      const db = await createDatabase({ path: join(basePath, millenniumFalcon.routes_db) });
      const empire: Empire = JSON.parse(readFileSync(join(basePath, 'empire.json'), 'utf8'));
      const expectedValue = JSON.parse(readFileSync(join(basePath, 'answer.json'), 'utf8'));
      const routes = await db.getAllRoutes();
      const probability = calculateSuccessProbability(millenniumFalcon, empire, routes);
      assert.strictEqual(probability, expectedValue.odds);
      await db.close();
    });
  });

  it('should return 0 if no valid paths exist', () => {
    const falcon: MillenniumFalcon = {
      autonomy: 6,
      departure: 'Tatooine',
      arrival: 'Endor',
    };
    const empire: Empire = {
      countdown: 5,
      bounty_hunters: [],
    };
    const routes: Route[] = [{ origin: 'Tatooine', destination: 'Endor', travel_time: 6 }];

    const probability = calculateSuccessProbability(falcon, empire, routes);
    assert.equal(probability, 0);
  });

  it('should return 100 if a safe route exists with no bounty hunter encounters', () => {
    const falcon: MillenniumFalcon = {
      autonomy: 6,
      departure: 'Tatooine',
      arrival: 'Endor',
    };
    const empire: Empire = {
      countdown: 6,
      bounty_hunters: [],
    };
    const routes: Route[] = [{ origin: 'Tatooine', destination: 'Endor', travel_time: 6 }];

    const probability = calculateSuccessProbability(falcon, empire, routes);
    assert.equal(probability, 1);
  });

  it('should return the best success probability from multiple paths', () => {
    const falcon: MillenniumFalcon = {
      autonomy: 6,
      departure: 'Tatooine',
      arrival: 'Endor',
    };
    const empire: Empire = {
      countdown: 11,
      bounty_hunters: [
        { planet: 'Dagobah', day: 6 },
        { planet: 'Dagobah', day: 7 },
      ],
    };
    const routes: Route[] = [
      { origin: 'Tatooine', destination: 'Dagobah', travel_time: 6 },
      { origin: 'Dagobah', destination: 'Endor', travel_time: 4 },
      { origin: 'Tatooine', destination: 'Hoth', travel_time: 6 },
      { origin: 'Hoth', destination: 'Endor', travel_time: 4 },
    ];

    const probability = calculateSuccessProbability(falcon, empire, routes);
    assert.equal(probability, 1);
  });
});
