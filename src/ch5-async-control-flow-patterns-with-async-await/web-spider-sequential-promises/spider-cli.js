import { spider } from "./spider.js";

const url = process.argv[2];
const nesting = process.argv[3] || 1;

spider(url, nesting)
  .then(() => console.log(`Download Complete.`))
  .catch((err) => console.error(`Download was unsuccessfull: ` + err));
