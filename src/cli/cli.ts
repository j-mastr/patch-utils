#! /usr/bin/env node

import { Command } from 'commander';
import commands from './commands';

const program = new Command();
program
  .name('patch-utils')
  .description('Utilities for patching (YAML) files')
  .version('1.0.2');

commands.forEach((command) => command(program));

program.parse(process.argv);
