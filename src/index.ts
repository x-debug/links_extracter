#! /usr/bin/env node

import { Command } from 'commander'
import { PDFExtract, PDFExtractOptions } from 'pdf.js-extract'
import fs, { link } from 'fs'
import path from 'path'
import figlet from 'figlet'

const ExcelJS = require('exceljs')
const program = new Command()
program
  .version('0.0.1')
  .description(
    'A CLI link extracter that can be used to extract links from any pdf'
  )
  .option('-f, --from  <value>', 'Extract links from a pdf')
  .option('-t, --to [value]', 'Write links to a excel file')
  .parse(process.argv)

const handleExtract = async (file: string) => {
  const pdfExtract = new PDFExtract()
  const options: PDFExtractOptions = {}
  const data = await pdfExtract.extract(file, options)
  const links = data.pages.map((page) => page.links).flat()
  return links
}

const options = program.opts()

if (options.from) {
  const file = path.resolve(process.cwd(), options.from)
  if (fs.existsSync(file)) {
    if (options.to) {
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Links')
      worksheet.columns = [{ header: 'Link', key: 'link' }]
      handleExtract(file).then((links) => {
        links.forEach((link) => {
          worksheet.addRow([link])
        })
        workbook.xlsx.writeFile(options.to)
      })
    } else {
      handleExtract(file).then((links) => {
        console.log(links)
      })
    }
  } else {
    console.log('File does not exist')
  }
}

console.log(figlet.textSync('Links Extracter', 'Standard'))
