/*
  Monkey Patching - It generally refers to the practice of modifying the existing objects (modules)
  at runtime to change or extend their behavior or to apply temporary fixes (in global scope).
*/

// file patcher.js
require('./logger').customMessage = function () {
  console.log('This is a new functionality')
}


// file main.js
require('./patcher'); // Will also cache './logger' module
const logger = require('./logger')

logger.customMessage();
