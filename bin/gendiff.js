#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';
import { readFileSync } from 'fs';
import path from 'path';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0')  // Просто явно укажите версию
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
  const diff = genDiff(filepath1, filepath2, options.format);
  console.log(diff);
});


program.parse();