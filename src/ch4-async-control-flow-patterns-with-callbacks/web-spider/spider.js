import fs from "fs";
import path from "path";
import superagent from "superagent";
import mkdirp from "mkdirp";
import { urlToFilename } from "./utils.js";

export function spider(url, cb) {
  const filename = urlToFilename(url);

  fs.access(filename, (err) => {
    if (!err || err.code !== "ENOENT") {
      return cb(null, filename, false);
    }

    download(url, filename, (err) => {
      if (err) {
        return cb(err);
      }

      cb(null, filename, true);
    });
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
  const folderName = path.dirname(filename);
  console.log(`Folder name: ${folderName}`);

  mkdirp(folderName, (err) => {
    if (err) {
      return cb(err);
    }

    fs.writeFile(filename, content, cb);
  });
}
