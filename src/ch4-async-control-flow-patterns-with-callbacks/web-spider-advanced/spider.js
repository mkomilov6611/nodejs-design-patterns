import fs from "fs";
import path from "path";
import mkdirp from "mkdirp";
import superagent from "superagent";
import { urlToFilename } from "./utils.js";

const spidering = new Set();

export function spider({ url, nesting, queue }) {
  if (spidering.has(url)) {
    return;
  }

  spidering.add(url);
  queue.pushTask((cb) => {
    spiderTask({ url, nesting, queue, cb });
  });
}

function spiderTask({ url, nesting, queue, cb }) {
  const filename = urlToFilename(url);

  fs.readFile(filename, "utf-8", (err, fileContent) => {
    if (err) {
      if (err.code !== "ENOENT") {
        return cb(err);
      }

      return download(url, filename, (err, requestContent) => {
        if (err) {
          return cb(err);
        }

        spiderLinks({ url, content: requestContent, nesting, queue });
        return cb();
      });
    }

    spiderLinks({ url, content: fileContent, nesting, queue });
    return cb();
  });
}
function download(url, filename, cb) {
  // File doesnt exist and its safe to create it
  console.log(`Downloading ${url} into ${filename}`);
  superagent.get(url).end((err, res) => {
    if (err) {
      return cb(err);
    }

    saveFile(filename, res.text, (err) => {
      if (err) {
        return cb(err);
      }

      console.log(`Downloaded and saved: ${url}`);
      cb(null, res.text);
    });
  });
}

function saveFile(filename, content, cb) {
  const dirname = path.dirname(filename);
  const response = mkdirp(dirname);
  console.log("Made directory", response);
  fs.writeFile(path.join(dirname, filename), content, cb);
}

function spiderLinks({ currentUrl, content, nesting, queue }) {
  if (nesting === 0) {
    return;
  }

  // const links = getPageLinks(currentUrl, content);
  const links = ["https://www.kun.uz", "https://www.daryo.uz"];
  if (links.length === 0) {
    return;
  }

  links.forEach((link) => spider({ url: link, nesting: nesting - 1, queue }));
}
