export default class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  next() {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      task().finally(() => {
        this.running--;
        this.next();
      });

      this.running++;
    }
  }

  runTask(task) {
    console.log("running task");
    return new Promise((resolve, reject) => {
      this.queue.push(() => task().then(resolve, reject));
      process.nextTick(this.next.bind(this));
    });
  }
}
