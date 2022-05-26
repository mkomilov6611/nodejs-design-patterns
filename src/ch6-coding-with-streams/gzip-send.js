import { request } from 'http'
import { createGzip } from 'zlib'
import { createReadStream } from 'fs'
import { basename } from 'path'
import { createCipheriv, randomBytes } from 'crypto'

const filename = process.argv[2]
const secret = Buffer.from(process.argv[3], 'hex')
const iv = randomBytes(16)

const httpRequestOptions = {
    host: 'localhost',
    port: 3000,
    path: '/',
    method: 'PUT',
    headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Encoding': 'gzip',
        'X-Filename': basename(filename),
        'X-Initialization-Vector': iv.toString('hex')
    }
}

const req = request(httpRequestOptions, res => {
    console.log(`Server response: ${res.statusCode}`)
})

createReadStream(filename)
    .pipe(createGzip())
    .pipe(createCipheriv('aes192', secret, iv))
    .pipe(req)
    .on('finish', () => {
        console.log('File successfully sent')
    })
    .on('error', (err) => {
        console.log('Error: ' + err)
    })
