import fs from "fs";

const allFilesWithKeyword = [];
let allFilesLength = 0;
let filesSearched = 0;

function recursiveFind(dir, keyword, cb) {
  fs.readdir(dir, "utf8", (err, files) => {
    if (err) {
      return cb(err);
    }
    allFilesLength += files.length;

    searchFile(dir, keyword, files, cb);
  });
}

function searchFile(dir, keyword, files, cb) {
  files.forEach((file) => {
    const currentFileDir = dir + "/" + file;
    if (fs.statSync(currentFileDir).isDirectory()) {
      filesSearched++;
      return recursiveFind(currentFileDir, keyword, cb);
    }

    fs.readFile(currentFileDir, "utf8", (err, data) => {
      if (err) {
        return cb(err);
      }

      filesSearched++;

      if (data.includes(keyword)) {
        allFilesWithKeyword.push(file);
      }

      if (filesSearched === allFilesLength) {
        cb(allFilesWithKeyword);
      }
    });
  });
}

recursiveFind("myDir", "batman", console.log);
