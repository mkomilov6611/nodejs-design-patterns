const delayPromise = new Promise((resolve) => {
  console.log("Delay: 1");
  setTimeout(resolve, 1000);
});
const delayPromise2 = new Promise((resolve) => {
  console.log("Delay: 2");
  setTimeout(resolve, 2000);
});
const delayPromise3 = new Promise((resolve) => {
  console.log("Delay: 3");
  setTimeout(resolve, 3000);
});

export async function promiseAll(promises) {
  try {
    for (const promise of promises) {
      await promise;
    }
  } catch (error) {
    throw error;
  }
}

promiseAll([delayPromise, delayPromise2, delayPromise3]).then(() =>
  console.log("Finished")
);
