import { PassThrough } from 'stream'

let bytesWritten = 0
const monitor = new PassThrough()

monitor.on('data', (chunk) => {
    bytesWritten += chunk.length
})

monitor.on('finish', () => console.log(`${bytesWritten} bytes written`))

monitor.write('hello')
monitor.end()

// in a more realistic scenario we would use our monitor stream like the following example:
// createReadStream(filename)
//      .pipe(createGzip())
//      .pipe(monitor)
//      .pipe(createWriteStream(`${filename}.gz`))