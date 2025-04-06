import { Empire, Path } from '../src/types';

import { strict as assert } from 'assert';
import { calculateCaptureProbability } from '../src/engine/probability';

describe('calculateCaptureProbability', () => {
  it('should return 0 if there are no bounty hunter encounters', () => {
    const empire: Empire = {
      countdown: 10,
      bounty_hunters: [{ planet: 'Tatooine', day: 1 }],
    };

    const path: Path = {
      planets: [
        { name: 'Dagobah', day: 2 },
        { name: 'Endor', day: 3 },
      ],
    };

    const prob = calculateCaptureProbability(path, empire);
    assert.equal(prob, 0);
  });

  it('should return 0.1 for one bounty hunter encounter', () => {
    const empire: Empire = {
      countdown: 10,
      bounty_hunters: [{ planet: 'Tatooine', day: 1 }],
    };

    const path: Path = {
      planets: [
        { name: 'Tatooine', day: 1 },
        { name: 'Dagobah', day: 2 },
        { name: 'Endor', day: 3 },
      ],
    };

    const prob = calculateCaptureProbability(path, empire);
    assert.equal(prob, 0.1);
  });

  it('should return 0.19 for two bounty hunter encounters', () => {
    const empire: Empire = {
      countdown: 10,
      bounty_hunters: [
        { planet: 'Tatooine', day: 1 },
        { planet: 'Dagobah', day: 2 },
      ],
    };

    const path: Path = {
      planets: [
        { name: 'Tatooine', day: 1 },
        { name: 'Dagobah', day: 2 },
        { name: 'Endor', day: 3 },
      ],
    };

    const prob = calculateCaptureProbability(path, empire);
    assert.equal(prob, 0.19);
  });

  it('should return 0.271 for three bounty hunter encounters', () => {
    const empire: Empire = {
      countdown: 10,
      bounty_hunters: [
        { planet: 'Tatooine', day: 1 },
        { planet: 'Dagobah', day: 2 },
        { planet: 'Endor', day: 3 },
      ],
    };

    const path: Path = {
      planets: [
        { name: 'Tatooine', day: 1 },
        { name: 'Dagobah', day: 2 },
        { name: 'Endor', day: 3 },
      ],
    };

    const prob = calculateCaptureProbability(path, empire);
    assert.equal(prob, 0.271);
  });

  it('should count duplicate encounters separately', () => {
    const empire: Empire = {
      countdown: 10,
      bounty_hunters: [{ planet: 'Tatooine', day: 1 }],
    };

    const path: Path = {
      planets: [
        { name: 'Tatooine', day: 1 },
        { name: 'Tatooine', day: 1 },
        { name: 'Endor', day: 2 },
      ],
    };

    const prob = calculateCaptureProbability(path, empire);
    assert.equal(prob, 0.19);
  });
});
