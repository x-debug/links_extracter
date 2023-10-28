#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const figlet_1 = __importDefault(require("figlet"));
const program = new commander_1.Command();
program
    .version('0.0.1')
    .description('An example CLI for managing a directory')
    .option('-l, --ls  [value]', 'List directory contents')
    .option('-m, --mkdir <value>', 'Create a directory')
    .option('-t, --touch <value>', 'Create a file')
    .parse(process.argv);
const options = program.opts();
function listDirContents(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield fs_1.default.promises.readdir(filepath);
            const detailedFilesPromises = files.map((file) => __awaiter(this, void 0, void 0, function* () {
                // Get the file details
                let fileDetails = yield fs_1.default.promises.lstat(path_1.default.resolve(filepath, file));
                const { size, birthtime } = fileDetails;
                return { filename: file, 'size(KB)': size, created_at: birthtime };
            }));
            const detailedFiles = yield Promise.all(detailedFilesPromises);
            console.table(detailedFiles);
        }
        catch (error) {
            console.error('Error occurred while reading the directory!', error);
        }
    });
}
function createDir(filepath) {
    if (!fs_1.default.existsSync(filepath)) {
        fs_1.default.mkdirSync(filepath);
        console.log('The directory has been created successfully');
    }
}
function createFile(filepath) {
    fs_1.default.openSync(filepath, 'w');
    console.log('An empty file has been created');
}
// handle ls option
if (options.ls) {
    const filepath = typeof options.ls === 'string' ? options.ls : __dirname;
    listDirContents(filepath);
}
// handle mkdir option
if (options.mkdir) {
    createDir(path_1.default.resolve(__dirname, options.mkdir));
}
// handle touch option
if (options.touch) {
    createFile(path_1.default.resolve(__dirname, options.touch));
}
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
console.log(figlet_1.default.textSync('Dir Manager'));
//# sourceMappingURL=index.js.map