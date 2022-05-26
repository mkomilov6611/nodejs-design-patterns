import { createReadStream, createWriteStream } from 'fs'
import { createGzip } from 'zlib'

const fileName = process.argv[2]

createReadStream(fileName)
    .pipe(createGzip())
    .pipe(createWriteStream(`${fileName}.gz`))
    .on('finish', () => console.log('File successfully compressed!'))

