// logger.js
export function log (message) { // Named Export
  console.log(message)
}

export const DEFAULT_LEVEL = 'info'

export const LEVELS = {
  error: 0,
  debug: 1,
  warn: 2,
  data: 3,
  info: 4,
  verbose: 5
}

export default class Logger { // Default Export
  constructor (name) {
    this.name = name
  }
  
  log (message) {
    console.log(`[${this.name}] ${message}`)
  }
}



// in another file
import * as loggerModule from './logger.js' // Namespace Import
// or
import { log, LEVELS} from './logger.js' // Named Import
// or
import MyLogger from './logger.js' // Default Import
