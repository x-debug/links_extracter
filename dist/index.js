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
const pdf_js_extract_1 = require("pdf.js-extract");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const figlet_1 = __importDefault(require("figlet"));
const ExcelJS = require('exceljs');
const program = new commander_1.Command();
program
    .version('0.0.1')
    .description('A CLI link extracter that can be used to extract links from any pdf')
    .option('-f, --from  <value>', 'Extract links from a pdf')
    .option('-t, --to [value]', 'Write links to a excel file')
    .parse(process.argv);
const handleExtract = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const pdfExtract = new pdf_js_extract_1.PDFExtract();
    const options = {};
    const data = yield pdfExtract.extract(file, options);
    const links = data.pages.map((page) => page.links).flat();
    return links;
});
const options = program.opts();
if (options.from) {
    const file = path_1.default.resolve(process.cwd(), options.from);
    if (fs_1.default.existsSync(file)) {
        if (options.to) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Links');
            worksheet.columns = [{ header: 'Link', key: 'link' }];
            handleExtract(file).then((links) => {
                links.forEach((link) => {
                    worksheet.addRow([link]);
                });
                workbook.xlsx.writeFile(options.to);
            });
        }
        else {
            handleExtract(file).then((links) => {
                console.log(links);
            });
        }
    }
    else {
        console.log('File does not exist');
    }
}
console.log(figlet_1.default.textSync('Links Extracter', 'Standard'));
//# sourceMappingURL=index.js.map