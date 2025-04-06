import { Empire, MillenniumFalcon, Route } from 'core';

import { readFile } from 'fs/promises';

export async function loadInputs(
  millenniumFalconPath: string,
  empirePath: string
): Promise<{ falcon: MillenniumFalcon; empire: Empire; routes: Route[] }> {
  try {
    const [falconData, empireData, routesData] = await Promise.all([
      readFile(millenniumFalconPath, 'utf-8'),
      readFile(empirePath, 'utf-8'),
      readFile('examples/routes.json', 'utf-8')
    ]);

    const falcon = JSON.parse(falconData) as MillenniumFalcon;
    const empire = JSON.parse(empireData) as Empire;
    const routes = JSON.parse(routesData) as Route[];

    return { falcon, empire, routes };
  } catch (error) {
    console.error('Error loading input files:', error);
    throw new Error('Failed to load input files');
  }
} 