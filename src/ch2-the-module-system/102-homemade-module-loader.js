function require(moduleName) {
  console.log(`Require invoked for module: ${moduleName}`);

  const id = require.resolve(moduleName);

  if (require.cache[id]) {
    return require.cache[id].exports;
  }

  // module metadata
  const module = {
    exports: {},
    id,
  };

  // update the cache
  require.cache[id] = module;

  // load the module
  loadModule(id, module, require);

  //return exported variables
  return module.exports;
}

// Function also is an Object
require.cache = {};
require.resolve = (moduleName) => {
  // resolve a full module id from the moduleName
};

function loadModule(filename, module, require) {
  const wrappedSrc = `(function (module, exports, require) {
        ${fs.readFileSync(filename, "utf8")}
    })(module, module.exports, require)`;

  eval(wrappedSrc); // using 'eval' for educational purposes, should not be used in production code
}
