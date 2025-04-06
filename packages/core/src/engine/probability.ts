import { Empire, Path } from '../types';
const NUMERATOR_BASE = 9;
const DENOMINATOR_BASE = 10;

/**
 * Calculates the capture probability for a given travel path based on bounty hunter encounters.
 * For each encounter (i.e. when the Millennium Falcon lands or refuels on a planet on a day where
 * bounty hunters are present), the probability of capture is incremented using the above formula.
 * @param path - The travel path, which is an ordered list of stops (each with a planet name and day) that the Millennium Falcon visits
 * @param empire - The Empire configuration containing the schedule of bounty hunters. Each bounty hunter entry includes a planet and a day
 * @returns The cumulative probability (a number between 0 and 1) that the Millennium Falcon gets captured
 */
export function calculateCaptureProbability(path: Path, empire: Empire): number {
  let probability = 0;
  let bounty_hunter_encounters = 1;

  // Create a set of strings in the format "planet:day" for fast lookup of bounty hunter encounters.
  const encounters = new Set(empire.bounty_hunters.map(({ planet, day }) => `${planet}:${day}`));

  for (const { name, day } of path.planets) {
    if (encounters.has(`${name}:${day}`)) {
      // Calculate and add the probability of capture for this encounter using the formula:
      // (0.9^(k-1)) / (10^k), then increment k for subsequent encounters
      probability += Math.pow(NUMERATOR_BASE, bounty_hunter_encounters - 1) / Math.pow(DENOMINATOR_BASE, bounty_hunter_encounters);
      bounty_hunter_encounters++;
    }
  }
  return probability;
}
