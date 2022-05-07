export async function asyncMap(iterable, callback, concurrency) {
  return new Promise((resolve) => {
    let running = 0;
    let currentIndex = 0;
    const resultsArray = [];

    iterate().then((result) => {
      resolve(result);
    });

    function iterate() {
      return new Promise((resolve) => {
        while (running < concurrency && currentIndex < iterable.length) {
          callback(null, iterable[currentIndex++])
            .then((result) => {
              if (currentIndex === iterable.length) {
                resolve(resultsArray);
              }

              resultsArray.push(result);

              iterate().then((result) => resolve(result));
            })
            .finally(() => {
              running--;
            });

          running++;
        }
      });
    }
  });
}

const callbackFunc = (err, data) => {
  if (err) {
    return err;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data * 2);
    }, Math.random() * 1000);
  });
};

asyncMap([1, 2, 3, 4, 5, 6], callbackFunc, 2).then((result) =>
  console.log("Result:", result)
);
