export class TaskQueuePC {
  constructor(concurrency) {
    this.taskQueue = [];
    this.consumerQueue = [];

    for (let i = 0; i < concurrency; i++) {
      this.consumer();
    }
  }

  consumer() {
    const self = this;
    return new Promise((resolve, reject) => {
      (function internalLoop() {
        self
          .getNextTask()
          .then((task) => {
            task().then(() => internalLoop());
          })
          .catch((err) => reject(err));
      })();
    });
  }

  getNextTask() {
    return new Promise((resolve) => {
      if (this.taskQueue.length) {
        console.log("Finally something got to do");
        return resolve(this.taskQueue.shift());
      }

      console.log("Nothing to do, making it sleep then");
      this.consumerQueue.push(resolve);
    });
  }

  runTask(task) {
    if (this.consumerQueue.length) {
      const consumer = this.consumerQueue.shift();
      consumer(task);
    } else {
      this.taskQueue.push(task);
    }
  }
}

const queue = new TaskQueuePC(2);

const sampleTask = () => Promise.resolve(console.log("Hi, its working"));

setTimeout(() => {
  queue.runTask(sampleTask);
}, 3000);
