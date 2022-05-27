import { createReadStream } from 'fs'
import { createBrotliCompress } from 'zlib'
import { PassThrough } from 'stream'
import { basename } from 'path'
import { upload } from './util.js'

const filePath = process.argv[2]
const fileName = basename(filePath)
const contentStream = new PassThrough()

upload(`${fileName}.br`, contentStream)
    .then((response) => {
        console.log(`Server response: ${response.data}`)
    })
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })

createReadStream(filePath)
    .pipe(createBrotliCompress())
    .pipe(contentStream)
