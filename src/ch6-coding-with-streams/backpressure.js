import { createServer } from 'http'
import Chance from 'chance'

const chance = new Chance()

const server = createServer((req, res) => {
    console.log("New Request!")

    res.writeHead(200, { 'Content-Type': 'text/plain' })

    const generateMore = () => {
        while (chance.bool({ likelihood: 95 })) {
            const shouldContinue = res.write(`${chance.string({ length: (16 * 1024 - 1) })}\n`)

            if (!shouldContinue) {
                console.log("Backpressure happened!")
                return res.once('drain', generateMore)
            }
        }
        res.end('\n\n')
    }
    generateMore()

    res.on('finish', () => console.log('All data sent'))
})

server.listen(8080, () => console.log("Listening on port 8080.."))