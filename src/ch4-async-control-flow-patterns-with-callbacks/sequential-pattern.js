const tasks = [
  /* Some tasks (functions) */
];

function iterate(index) {
  if (index === tasks.length) {
    return finish();
  }

  const task = tasks[index];

  task(() => iterate(index + 1));
}

function finish() {
  // iteration completed
}

iterate(0);
