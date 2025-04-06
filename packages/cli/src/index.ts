#!/usr/bin/env node

import { Command } from 'commander';
import { calculateSuccessProbability } from 'core';
import { loadInputs } from './loader.js';
import { ValidationError } from './validation.js';

const program = new Command();

program
  .name('give-me-the-odds')
  .description('Calculate the probability of success for the Millennium Falcon mission')
  .version('1.0.0')
  .argument('<millennium-falcon>', 'path to millennium-falcon.json')
  .argument('<empire>', 'path to empire.json')
  .action(async (millenniumFalconPath: string, empirePath: string) => {
    try {
      const { falcon, empire, routes } = await loadInputs(millenniumFalconPath, empirePath);
      const odds = calculateSuccessProbability(falcon, empire, routes);
      console.log(odds);
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error(`Error (${error.code}): ${error.message}`);
      } else {
        console.error('Error:', error instanceof Error ? error.message : 'Unknown error occurred');
      }
      process.exit(1);
    }
  });

program.parse(process.argv);
