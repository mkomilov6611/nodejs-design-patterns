import { readFile } from "fs";

const cache = new Map();

function inconsistentRead(filename, cb) {
  if (cache.has(filename)) {
    // invoked synchronously
    cb(cache.get(filename));
  } else {
    // asynchronous function
    readFile(filename, "utf8", (err, data) => {
      cache.set(filename, data);
      cb(data);
    });
  }
}

function createFileReader(filename) {
  const listeners = [];

  inconsistentRead(filename, (value) => {
    listeners.forEach((listener) => listener(value));
  });

  return {
    onDataReady: (listener) => listeners.push(listener),
  };
}

const reader1 = createFileReader("data.txt");
reader1.onDataReady((data) => {
  console.log(`First call data: ${data}`);

  const reader2 = createFileReader("data.txt");
  reader2.onDataReady((data) => {
    console.log(`Second call data: ${data}`);
  });
});

/* 
  Console: First call data: [dataFromFile]
  
  As you can see, the callback of the second reader is never invoked. Let's see why:  
    • During the creation of reader1, our inconsistentRead() function behaves
      asynchronously because there is no cached result available. This means that
      any onDataReady listener will be invoked later in another cycle of the event
      loop, so we have all the time we need to register our listener.
    
    • Then, reader2 is created in a cycle of the event loop in which the
      cache for the requested file already exists. In this case, the inner call
      to inconsistentRead() will be synchronous. So, its callback will be invoked
      immediately, which means that all the listeners of reader2 will be invoked
      synchronously as well. However, we are registering the listener after the
      creation of reader2, so it will never be invoked.
*/

