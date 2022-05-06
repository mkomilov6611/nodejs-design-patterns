import { appendFile, readFile } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
let currentFileIndex = 0;

function concatFiles(files, dest, cb) {
  readFile(files[currentFileIndex], "utf8", (err, data) => {
    if (err) {
      cb(err);
    }

    appendFile(dest, `${data}: ${new Date()} \n`, (err) => {
      if (err) {
        return cb(err);
      }

      currentFileIndex++;

      if (currentFileIndex === files.length) {
        return cb();
      }

      concatFiles(files, dest, cb);
    });
  });
}
const sampleFilePath = path.join(__dirname, "../sample.txt");

concatFiles([sampleFilePath, sampleFilePath], "output.txt", (err, done) => {
  if (err) {
    return console.error("Error: " + err.message);
  }

  console.log("Done");
});
