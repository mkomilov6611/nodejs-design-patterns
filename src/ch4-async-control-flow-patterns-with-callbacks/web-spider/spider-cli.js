import { spider } from "./spider.js";

const inputURL = process.argv[2];

spider(inputURL, (err, filename, downloaded) => {
    if(err) {
        console.error(err)
    } else if (downloaded) {
        console.log(`Completed the download of ${filename}`)
    } else {
        console.log(`${filename} was already downloaded`)
    }
})