import { spider } from "./spider.js";

const url = process.argv[2];
const concurrency = process.argv[3] || 2;
const nesting = process.argv[4] || 0;

spider(url, nesting, concurrency)
  .then(() => console.log(`Download Complete.`))
  .catch((err) => console.error(`Download was unsuccessfull: ` + err));
