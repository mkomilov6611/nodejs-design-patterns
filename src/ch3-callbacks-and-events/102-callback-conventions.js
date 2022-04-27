import {readFile} from 'fs';

// 1 - The callback comes last
readFile(fileName, [options], callback);

// 2 - Any error comes first (in callback parameter) - error should be type of Error object
readFile('foo.txt', 'utf8', (err, data) => {
  if(err) {
    handleError(err)
  } else {
    processData(data)
  }
})

// 3 - Proper error propagation
function readJSON(filename, callback) {
  readFile(filename, 'utf8', (err, data)=> {
    let parsed;
    
    if(err) {
      // propagate the error and exit the current function
      return callback(err)
    }
    
    try {
      // parse the file contents
      parsed = JSON.parse(data)
    } catch(err) {
      // catch parsing errors
      return callback()
    }
    
    // no errors, propagate just the data
    callback(null, parsed);
  })
}

