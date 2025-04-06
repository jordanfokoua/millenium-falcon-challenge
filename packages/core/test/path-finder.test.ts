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
      countdown: 11,
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

  it('should return one valid direct path without refuel', () => {
    const falcon: MillenniumFalcon = {
      autonomy: 6,
      departure: 'Tatooine',
      arrival: 'Endor',
    };

    const empire: Empire = {
      countdown: 5,
      bounty_hunters: [],
    };

    const routes: Route[] = [
      { origin: 'Tatooine', destination: 'Endor', travelTime: 5 },
    ];

    const paths = findAllPaths(falcon, empire, routes);
    assert.equal(paths.length, 1);
    assert.deepEqual(
      paths[0].planets.map(p => p.name),
      ['Tatooine', 'Endor']
    );
  });

  it('should return two valid paths with multiple options', () => {
    const falcon: MillenniumFalcon = {
      autonomy: 6,
      departure: 'Tatooine',
      arrival: 'Endor',
    };

    const empire: Empire = {
      countdown: 11,
      bounty_hunters: [],
    };

    const routes: Route[] = [
      { origin: 'Tatooine', destination: 'Dagobah', travelTime: 6 },
      { origin: 'Dagobah', destination: 'Endor', travelTime: 4 },
      { origin: 'Tatooine', destination: 'Hoth', travelTime: 6 },
      { origin: 'Hoth', destination: 'Endor', travelTime: 4 },
    ];

    const paths = findAllPaths(falcon, empire, routes);
    assert.equal(paths.length, 2);

    const expectedPaths = [
      ['Tatooine', 'Dagobah', 'Dagobah', 'Endor'],
      ['Tatooine', 'Hoth', 'Hoth', 'Endor']
    ];

    const foundPaths = paths.map(p => p.planets.map(stop => stop.name));
    expectedPaths.forEach(expected => {
      assert.ok(
        foundPaths.some(found => JSON.stringify(found) === JSON.stringify(expected)),
        `Expected path ${expected} not found`
      );
    });
  });

  it('should return no valid paths if countdown is too short', () => {
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
    assert.equal(paths.length, 0);
  });

  it('should return valid path when fuel exactly matches travel time', () => {
    const falcon: MillenniumFalcon = {
      autonomy: 6,
      departure: 'Tatooine',
      arrival: 'Endor',
    };

    const empire: Empire = {
      countdown: 6,
      bounty_hunters: [],
    };

    const routes: Route[] = [
      { origin: 'Tatooine', destination: 'Endor', travelTime: 6 },
    ];

    const paths = findAllPaths(falcon, empire, routes);
    assert.equal(paths.length, 1);
    assert.deepEqual(
      paths[0].planets.map(p => p.name),
      ['Tatooine', 'Endor']
    );
  });
});
