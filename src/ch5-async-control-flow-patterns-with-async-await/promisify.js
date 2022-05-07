import { randomBytes } from "crypto";

// Callback Style
randomBytes(32, (err, result) => {
  if (err) {
    return console.log("CB Error: " + err);
  }
  return console.log("CB Result: " + result);
});

// With Promises
promisify(randomBytes)(32)
  .then((result) => {
    console.log("PROMISE Result: " + result);
  })
  .catch((err) => {
    console.error("PROMISE Error: " + err);
  });

function promisify(callbackBasedAPI) {
  return function promisified(...args) {
    return new Promise((resolve, reject) => {
      const newArgs = [
        ...args,
        function (err, result) {
          if (err) {
            return reject(err);
          }

          resolve(result);
        },
      ];

      callbackBasedAPI(...newArgs);
    });
  };
}
