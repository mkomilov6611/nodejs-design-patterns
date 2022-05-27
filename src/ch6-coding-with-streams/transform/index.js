import { createReadStream } from 'fs'
import { createGunzip } from 'zlib'
import * as csvParseLibrary from 'csv-parse'
import { FilterByCountry, SumProfit } from './filter.js'

const csvParser = csvParseLibrary.parse({ columns: true })

createReadStream('data.csv.gz')
    .pipe(createGunzip())
    .pipe(csvParser)
    .pipe(new FilterByCountry('Italy'))
    .pipe(new SumProfit())
    .pipe(process.stdout)
