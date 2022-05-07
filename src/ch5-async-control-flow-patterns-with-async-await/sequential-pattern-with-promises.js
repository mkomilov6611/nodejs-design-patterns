const promise = tasks.reduce((prev, task) => {
  return prev.then(() => task());
}, Promise.resolve());
