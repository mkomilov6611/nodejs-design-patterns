import { createWriteStream, createReadStream } from 'fs'
import { Readable, Transform } from 'stream'

function concatFiles(dest, files) {
    return new Promise((resolve, reject) => {
        const destStream = createWriteStream(dest)
        const transformStream = new Transform({
            objectMode: true,
            transform: function (filename, enc, done) {
                const src = createReadStream(filename)
                src.pipe(destStream, { end: false })
                src.on('error', done)
                src.on('end', done)
            }
        })

        Readable.from(files).pipe(transformStream)
            .on('error', reject)
            .on('finish', () => {
                destStream.end()
                resolve()
            })
    })
}

// testing it out
async function main() {
    try {
        await concatFiles('written_files/concatenated.txt', ['gzip.txt', 'gzip.txt'])
    } catch (error) {
        console.error(err)
        process.exit(1)
    }
}

main()