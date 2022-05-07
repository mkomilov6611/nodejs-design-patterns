import { promises as fsPromises } from "fs";
import { dirname } from "path";
import superagent from "superagent";
import mkdirp from "mkdirp";
import { urlToFilename, getPageLinks } from "./utils.js";
import { TaskQueuePC } from "./taskQueue.js";

export async function spider(url, nesting, concurrency) {
  const taskQueue = new TaskQueuePC(concurrency);

  await spiderTask(url, nesting, taskQueue);
}

async function spiderTask(url, nesting, queue) {
  const filename = urlToFilename(url);

  const task = async () => {
    try {
      return await fsPromises.readFile(filename, "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }

      return await download(url, filename);
    }
  };

  return queue
    .runTask(task)
    .then((content) => spiderLinks(url, content, nesting, queue));
}

async function download(url, filename) {
  console.log(`Downloading ${url}`);
  const { text: content } = await superagent.get(url);

  await mkdirp(dirname(filename));
  await fsPromises.writeFile(filename, content);
  console.log(`Download and saved: ${url}`);

  return content;
}

async function spiderLinks(currentUrl, content, nesting, queue) {
  if (nesting === 0) {
    return;
  }

  const links = getPageLinks(currentUrl, content);

  for (const link of links) {
    await spiderTask(link, nesting - 1, queue);
  }
}
