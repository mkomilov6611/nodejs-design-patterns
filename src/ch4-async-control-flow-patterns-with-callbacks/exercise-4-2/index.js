import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const sampleDir = dirname(fileURLToPath(import.meta.url)); // this __dirname

const filesFound = [];

function listNestedFiles(dir, cb) {
  fs.readdir(dir, "utf-8", (err, files) => {
    if (err) {
      return cb(err);
    }

    files.forEach((file) => {
      if (fs.statSync(dir + "/" + file).isDirectory()) {
        return listNestedFiles(path.join(dir, "/", file), cb);
      }

      filesFound.push(file);
    });

    cb(null);
  });
}

listNestedFiles(sampleDir, (err) => {
  if (err) {
    return console.error("Error while traversing: " + err.message);
  }

  console.log("Files found: " + filesFound);
});
