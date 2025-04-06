import { Empire, MillenniumFalcon, Route } from '../types';

import { calculateCaptureProbability } from './probability';
import { findAllPaths } from './path-finder';

/**
 * Calculates the best possible success probability (as a percentage from 0 to 100)
 * for the Millennium Falcon to reach Endor before the countdown and avoid capture.
 *
 * @param falcon - Falcon configuration
 * @param empire - Empire configuration (countdown and bounty hunters)
 * @param routes - All known hyperspace routes
 * @returns Number from 0 to 100 representing the best possible success rate
 */
export function calculateSuccessProbability(falcon: MillenniumFalcon, empire: Empire, routes: Route[]): number {
  const paths = findAllPaths(falcon, empire, routes);
  if (paths.length === 0) return 0;

  let bestSuccessRate = 0;

  for (const path of paths) {
    const captureProb = calculateCaptureProbability(path, empire);
    const successProb = 1 - captureProb;
    bestSuccessRate = Math.max(bestSuccessRate, successProb);
  }

  return Math.round(bestSuccessRate * 100);
}
