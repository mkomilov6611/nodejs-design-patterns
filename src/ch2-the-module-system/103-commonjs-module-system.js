/* a.file */

class Logger {
  constructor(name) {
    this.name = name
  }
  
  log (message) {
    console.log(`[${this.name}] ${this.message}`)
  }
  
  info (message) {
    this.log(`info: ${message}`)
  }
  
  
  verbose (message) {
    this.log(`verbose: ${message}`)
  }
}

module.exports = Logger; // Exporting

/* b.file */
const Logger = require('./logger') // Importing

const dbLogger = new Logger('DB')
dbLogger.info('This is an informational message')

const accessLogger = new Logger('ACCESS')
accessLogger.verbose('This is a verbose message')
