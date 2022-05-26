import { Readable } from 'stream'
import Chance from 'chance'

const chance = new Chance()
let emittedBytes = 0

const randomStream = new Readable({
    read: function (size) {
        const chunk = chance.string({ length: size })
        this.push(chunk, 'utf8')

        emittedBytes += chunk.length

        if (chance.bool({ likelihood: 5 })) {
            this.push(null)
        }
    }
})

