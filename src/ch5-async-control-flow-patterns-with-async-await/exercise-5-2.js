export class TaskQueuePC {
  constructor(concurrency) {
    this.taskQueue = [];
    this.consumerQueue = [];

    for (let i = 0; i < concurrency; i++) {
      this.consumer();
    }
  }

  async consumer() {
    while (true) {
      console.log("Fetching Tasks");

      try {
        const task = await this.getNextTask();
        await task();
      } catch (err) {
        console.error(err);
      }
    }
  }

  getNextTask() {
    return new Promise((resolve) => {
      if (this.taskQueue.length) {
        return resolve(this.taskQueue.shift());
      }

      this.consumerQueue.push(resolve);
    });
  }

  async runTask(task) {
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
setTimeout(async () => {
  queue.runTask(sampleTask);
}, 3000);
