import { promises as fsPromises } from "fs";
import { dirname } from "path";
import superagent from "superagent";
import mkdirp from "mkdirp";
import { urlToFilename, getPageLinks } from "./utils.js";

export function spider(url, nesting) {
  const filename = urlToFilename(url);

  return fsPromises
    .readFile(filename, "utf8")
    .catch((err) => {
      if (err.code !== "ENOENT") {
        throw err;
      }

      // The file doesnt exist, so lets download it
      return download(url, filename);
    })
    .then((content) => spiderLinks(url, content, nesting))
    .catch((err) => {
      throw err;
    });
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

function spiderLinks(currentUrl, content, nesting) {
  let promise = Promise.resolve();

  if (nesting === 0) {
    return promise;
  }

  const links = getPageLinks(currentUrl, content);

  for (const link of links) {
    promise = promise.then(() => spider(link, nesting - 1));
  }

  return promise;
}
