
import { createBrotliDecompress } from 'zlib'

export function upload(filename, contentStream) {
    return Promise.resolve({
        data: 'Uploaded!'
    })
}