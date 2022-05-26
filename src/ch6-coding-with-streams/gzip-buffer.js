import { promises as fs } from 'fs'
import { gzip } from 'zlib'
import { promisify } from 'util'

const gzipPromise = promisify(gzip)
const fileName = process.argv[2]

async function main() {
    const data = await fs.readFile(fileName)
    const gzippedData = await gzipPromise(data)

    await fs.writeFile(`${fileName}.gz`, gzippedData)

    console.log("File successfully compressed")
}

main()
