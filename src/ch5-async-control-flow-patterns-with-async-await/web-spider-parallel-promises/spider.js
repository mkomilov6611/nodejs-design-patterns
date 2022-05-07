import { promises as fsPromises } from "fs";
import { dirname } from "path";
import superagent from "superagent";
import mkdirp from "mkdirp";
import { urlToFilename, getPageLinks } from "./utils.js";
import TaskQueue from "./taskQueue.js";

const spidering = new Set();

export function spider(url, nesting, concurrency) {
  console.log("Spidering");
  const queue = new TaskQueue(concurrency);

  return spiderTask(url, nesting, queue);
}

function spiderTask(url, nesting, queue) {
  if (spidering.has(url)) {
    return Promise.resolve();
  }

  spidering.add(url);

  const filename = urlToFilename(url);
  const task = () => {
    return fsPromises.readFile(filename, "utf8").catch((err) => {
      if (err.code !== "ENOENT") {
        throw err;
      }

      // The file doesnt exist, so lets download it
      return download(url, filename);
    });
  };

  return queue
    .runTask(task)
    .then((content) => spiderLinks(url, content, nesting, queue));
}

function download(url, filename) {
  console.log(`Downloading ${url} into ${filename}..`);

  let content;
  return superagent
    .get(url)
    .then((res) => {
      content = res.text;
      return mkdirp(dirname(filename));
    })
    .then(() => {
      return fsPromises.writeFile(filename, content);
    })
    .then(() => {
      return content;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
}

function spiderLinks(currentUrl, content, nesting, queue) {
  if (nesting === 0) {
    return Promise.resolve();
  }

  const links = getPageLinks(currentUrl, content);
  const promises = links.map((link) => spider(link, nesting - 1, queue));

  return Promise.all(promises);
}
