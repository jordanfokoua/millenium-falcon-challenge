import { Empire, MillenniumFalcon } from '../src/types';

import { strict as assert } from 'assert';
import { calculateSuccessProbability } from '../src/engine';
import { join } from 'path';
import { readFileSync } from 'fs';

describe('calculateSuccessProbability', () => {
  describe('Example 1', () => {
    it('should return 0% when Millennium Falcon cannot reach Endor in 7 days with bounty hunters on Hoth', () => {
      const millenniumFalcon: MillenniumFalcon = JSON.parse(readFileSync(join(__dirname, 'examples/example1/millennium-falcon.json'), 'utf8'));
      const empire: Empire = JSON.parse(readFileSync(join(__dirname, 'examples/example1/empire.json'), 'utf8'));
      const probability = calculateSuccessProbability(millenniumFalcon, empire);
      assert.strictEqual(probability, 0);
    });
  });

  describe('Example 2', () => {
    it('should return 81% when Millennium Falcon can reach Endor in 8 days with bounty hunters on Hoth', () => {
      const millenniumFalcon: MillenniumFalcon = JSON.parse(readFileSync(join(__dirname, 'examples/example2/millennium-falcon.json'), 'utf8'));
      const empire: Empire = JSON.parse(readFileSync(join(__dirname, 'examples/example2/empire.json'), 'utf8'));
      const probability = calculateSuccessProbability(millenniumFalcon, empire);
      assert.strictEqual(probability, 0.81);
    });
  });

  describe('Example 3', () => {
    it('should return 90% when Millennium Falcon can reach Endor in 9 days with bounty hunters on Hoth', () => {
      const millenniumFalcon: MillenniumFalcon = JSON.parse(readFileSync(join(__dirname, 'examples/example3/millennium-falcon.json'), 'utf8'));
      const empire: Empire = JSON.parse(readFileSync(join(__dirname, 'examples/example3/empire.json'), 'utf8'));
      const probability = calculateSuccessProbability(millenniumFalcon, empire);
      assert.strictEqual(probability, 0.9);
    });
  });

  describe('Example 4', () => {
    it('should return 100% when Millennium Falcon can reach Endor in 10 days avoiding bounty hunters', () => {
      const millenniumFalcon: MillenniumFalcon = JSON.parse(readFileSync(join(__dirname, 'examples/example4/millennium-falcon.json'), 'utf8'));
      const empire: Empire = JSON.parse(readFileSync(join(__dirname, 'examples/example4/empire.json'), 'utf8'));
      const probability = calculateSuccessProbability(millenniumFalcon, empire);
      assert.strictEqual(probability, 1);
    });
  });

  describe.skip('Edge Cases', () => {
    it('should handle direct route without bounty hunters', () => {
      const millenniumFalcon: MillenniumFalcon = JSON.parse(readFileSync(join(__dirname, 'examples/example5/millennium-falcon.json'), 'utf8'));
      const empire: Empire = JSON.parse(readFileSync(join(__dirname, 'examples/example5/empire.json'), 'utf8'));
      const probability = calculateSuccessProbability(millenniumFalcon, empire);
      assert.strictEqual(probability, 0.9);
    });

    it('should handle multiple bounty hunter encounters', () => {
      const millenniumFalcon: MillenniumFalcon = JSON.parse(readFileSync(join(__dirname, 'examples/example6/millennium-falcon.json'), 'utf8'));
      const empire: Empire = JSON.parse(readFileSync(join(__dirname, 'examples/example6/empire.json'), 'utf8'));
      const probability = calculateSuccessProbability(millenniumFalcon, empire);
      assert.strictEqual(probability, 0.9);
    });

    it('should handle refueling scenarios', () => {
      const millenniumFalcon: MillenniumFalcon = JSON.parse(readFileSync(join(__dirname, 'examples/example7/millennium-falcon.json'), 'utf8'));
      const empire: Empire = JSON.parse(readFileSync(join(__dirname, 'examples/example7/empire.json'), 'utf8'));
      const probability = calculateSuccessProbability(millenniumFalcon, empire);
      assert.strictEqual(probability, 0.9);
    });

    it('should handle waiting strategy to avoid bounty hunters', () => {
      const millenniumFalcon: MillenniumFalcon = JSON.parse(readFileSync(join(__dirname, 'examples/example7/millennium-falcon.json'), 'utf8'));
      const empire: Empire = JSON.parse(readFileSync(join(__dirname, 'examples/example7/empire.json'), 'utf8'));
      const probability = calculateSuccessProbability(millenniumFalcon, empire);
      assert.strictEqual(probability, 0.9);
    });
  });
});
