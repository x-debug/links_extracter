#! /usr/bin/env node

import { Command } from 'commander'
import { PDFExtract, PDFExtractOptions } from 'pdf.js-extract'
import fs from 'fs'
import path from 'path'
import figlet from 'figlet'

const program = new Command()
program
  .version('0.0.1')
  .description(
    'A CLI link extracter that can be used to extract links from any pdf'
  )
  .option('-from, --from  [value]', 'Extract links from a pdf')
  .option('-to, --to [value]', 'Write links to a excel file')
  .parse(process.argv)

const handleExtract = async (file: string) => {
  const pdfExtract = new PDFExtract()
  const options: PDFExtractOptions = {}
  const data = await pdfExtract.extract(file, options)
  const links = data.pages.map((page) => page.links).flat()
  console.log(links)
}

const options = program.opts()
if (options.file) {
  const file = path.resolve(process.cwd(), options.file)
  if (fs.existsSync(file)) {
    handleExtract(file)
  } else {
    console.log('File does not exist')
  }
}

console.log(figlet.textSync('Links Extracter', 'Standard'))
