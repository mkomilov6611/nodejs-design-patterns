import { Writable } from 'stream'
import { promises as fs } from 'fs'
import { dirname, join } from 'path'

const tfs = new Writable({
    objectMode: true,
    write: function (chunk, encoding, cb) {
        fs.mkdir(dirname(chunk.path))
            .then(() => fs.writeFile(chunk.path, chunk.content))
            .then(() => cb(null))
            .catch(cb);
    }
})

tfs.write({
    path: join('written_files', 'file1.txt'),
    content: 'Hi there'
})