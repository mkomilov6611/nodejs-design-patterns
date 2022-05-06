import { readFile } from "fs";

function sampleTaskAsync(callback) {
  readFile("./sample.txt", (err, data) => {
    if (err) {
      return console.error("File Read Error: " + err);
    }
    // console.log("File Read Success: " + data);
    callback();
  });
}

const tasks = [
  sampleTaskAsync,
  sampleTaskAsync,
  sampleTaskAsync,
  sampleTaskAsync,
  sampleTaskAsync,
];

const CONCURRENCY = 2;
let running = 0;
let completed = 0;
let index = 0;

function next() {
  while (running < CONCURRENCY && index < tasks.length) {
    const task = tasks[index++];

    task(() => {
      if (++completed === tasks.length) {
        return finish();
      }
      running--;
      next();
    });
    running++;
  }

  console.log(`Active concurrency: ` + running);
}

next();

function finish() {
  console.log("All tasks are finished");
}
