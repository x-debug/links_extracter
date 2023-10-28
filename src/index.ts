#! /usr/bin/env node

import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import figlet from 'figlet'

const program = new Command()
program
  .version('0.0.1')
  .description(
    'A CLI link extracter that can be used to extract links from any pdf'
  )
  .option('-f, --file  [value]', 'Extract links from a pdf')
  .parse(process.argv)

const options = program.opts()

console.log(figlet.textSync('Links Extracter', 'Standard'))
