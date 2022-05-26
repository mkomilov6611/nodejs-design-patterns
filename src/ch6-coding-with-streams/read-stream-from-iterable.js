import { Readable } from 'stream'

const mountains = [
    {
        name: 'Everest',
        height: 8848
    },
    {
        name: 'Chorvoq',
        height: 2848
    },
    {
        name: 'Pyramid',
        height: 1531
    },
]

Readable.from(mountains).on('data', (mountain) => {
    console.log(`${mountain.name.padStart(14)}\t${mountain.height}m`)
})