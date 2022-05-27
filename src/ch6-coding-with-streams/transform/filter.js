import { Transform } from 'stream'

export class FilterByCountry extends Transform {
    constructor(country, options = {}) {
        options.objectMode = true
        super(options)
        this.country = country
    }

    _transform(record, enc, cb) {
        if (record.country === this.country) {
            this.push(record)
        }

        cb()
    }
}

export class SumProfit extends Transform {
    constructor(options = {}) {
        options.objectMode = true
        super(options)
        this.total = 0
    }

    _transform(record, enc, cb) {
        this.total += Number.parseFloat(record.profit)
        cb()
    }

    _flush(cb) {
        this.push(this.total.toString())
        cb()
    }
}