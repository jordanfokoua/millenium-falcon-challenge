#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .name('give-me-the-odds')
  .description('Calculate the probability of success for the Millennium Falcon mission')
  .version('1.0.0')
  .argument('<millennium-falcon>', 'path to millennium-falcon.json')
  .argument('<empire>', 'path to empire.json')
  .action(() => {
    console.log('Probability of success:', 1);
  });

program.parse(process.argv);
