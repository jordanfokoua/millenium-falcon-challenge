import { Empire, MillenniumFalcon, Route } from '../src/types';

import { strict as assert } from 'assert';
import { findAllPaths } from '../src/engine/path-finder';

describe('findAllPaths', () => {
  it('should return one valid path with refuel', () => {
    const falcon: MillenniumFalcon = {
      autonomy: 6,
      departure: 'Tatooine',
      arrival: 'Endor',
    };

    const empire: Empire = {
      countdown: 10,
      bounty_hunters: [],
    };

    const routes: Route[] = [
      { origin: 'Tatooine', destination: 'Dagobah', travelTime: 6 },
      { origin: 'Dagobah', destination: 'Endor', travelTime: 4 },
    ];

    const paths = findAllPaths(falcon, empire, routes);
    assert.equal(paths.length, 1);
    assert.deepEqual(
      paths[0].planets.map(p => p.name),
      ['Tatooine', 'Dagobah', 'Dagobah', 'Endor']
    );
  });
});
