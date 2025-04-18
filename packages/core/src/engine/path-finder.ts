import { Empire, MillenniumFalcon, Path, Route, TravelState } from '../types';

/**
 * Finds all valid paths for the Millennium Falcon to reach its destination before the countdown expires
 * This function builds a graph from the provided routes and performs a depth-first search (DFS) to explore
 * all possible paths from the departure planet to the arrival planet. It accounts for fuel autonomy and the need to
 * refuel (which costs 1 day) when the current fuel is insufficient for a jump.
 * @param falcon - The Millennium Falcon configuration, including its fuel autonomy, departure, and arrival planets
 * @param empire - The Empire's configuration including the countdown and bounty hunter locations
 * @param routes - A list of routes available in the galaxy
 * @returns An array of valid paths, where each path is a sequence of planet stops with the day they were reached
 */
export function findAllPaths(falcon: MillenniumFalcon, empire: Empire, routes: Route[]): Path[] {
  // Build a bi-directional graph from the routes for easy traversal.
  const graph = buildGraph(routes);
  const paths: Path[] = [];
  const REFUEL_COST = 1;

  // A simple memoization to avoid processing the same state repeatedly.
  const visited = new Set<string>();

  // Helper to build a unique key for the current travel state.
  function stateKey(state: TravelState): string {
    return `${state.planet}-${state.day}-${state.fuel}`;
  }

  /**
   * Depth-first search to explore paths
   * @param state - The current travel state including planet, day, remaining fuel, and the path so far
   */
  function dfs(state: TravelState) {
    const { planet, day, fuel, path } = state;

    if (day > empire.countdown) return;

    if (planet === falcon.arrival) {
      paths.push({ planets: [...path, { name: planet, day }] });
      return;
    }

    const key = stateKey(state);
    if (visited.has(key)) {
      return;
    }
    visited.add(key);

    // --- Waiting branch ---
    // Even if there's enough fuel, the Falcon can wait one day on the current planet
    // to potentially avoid bounty hunters on a subsequent landing
    if (day < empire.countdown) {
      dfs({
        planet,
        day: day + 1,
        fuel,
        path: [...path, { name: planet, day: day + 1, action: 'wait' }],
      });
    }

    // --- Travel branches ---
    for (const edge of graph.get(planet) || []) {
      const nextPlanet = edge.planet;
      const travel_time = edge.travel_time;

      if (fuel >= travel_time) {
        dfs({
          planet: nextPlanet,
          day: day + travel_time,
          fuel: fuel - travel_time,
          path: [...path, { name: planet, day }],
        });
      }

      // If fuel is insufficient and a refuel is possible (refuel takes 1 day),
      // then refuel and attempt the jump.
      if (fuel < travel_time && falcon.autonomy >= travel_time) {
        dfs({
          planet: nextPlanet,
          day: day + REFUEL_COST + travel_time, // 1 day for refueling plus travel time.
          fuel: falcon.autonomy - travel_time, // Reset fuel to full autonomy, then subtract jump fuel.
          // Record the current planet (stop) and the refuel stop (same planet, next day).
          path: [...path, { name: planet, day }, { name: planet, day: day + REFUEL_COST, action: 'refuel' }],
        });
      }
    }
  }

  // Start the DFS from the departure planet with full fuel at day 0.
  dfs({
    planet: falcon.departure,
    day: 0,
    fuel: falcon.autonomy,
    path: [],
  });

  return paths;
}

/**
 * Builds a bi-directional graph from the provided routes
 * Each route connects two planets, and the graph allows traversal in both directions
 * @param routes - A list of routes available in the galaxy
 * @returns A map where each key is a planet name and the value is an array of connected planets with travel times
 */
function buildGraph(routes: Route[]) {
  const graph = new Map<string, { planet: string; travel_time: number }[]>();
  for (const route of routes) {
    if (!graph.has(route.origin)) {
      graph.set(route.origin, []);
    }
    if (!graph.has(route.destination)) {
      graph.set(route.destination, []);
    }
    // Since travel is possible in both directions, add an edge from origin
    // to destination and from destination to origin
    graph.get(route.origin)!.push({ planet: route.destination, travel_time: route.travel_time });
    graph.get(route.destination)!.push({ planet: route.origin, travel_time: route.travel_time });
  }
  return graph;
}
