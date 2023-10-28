#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const figlet_1 = __importDefault(require("figlet"));
const program = new commander_1.Command();
program
    .version('0.0.1')
    .description('A CLI link extracter that can be used to extract links from any pdf')
    .option('-f, --file  [value]', 'Extract links from a pdf')
    .parse(process.argv);
const options = program.opts();
console.log(figlet_1.default.textSync('Links Extracter', 'Standard'));
//# sourceMappingURL=index.js.map