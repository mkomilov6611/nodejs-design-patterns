import { createServer } from "http";
import { cpus } from "os";
import cluster from "cluster";

if (cluster.isMaster) {
  const availableCpus = cpus();

  console.log("Clustering to " + availableCpus.length + " process instances");
  availableCpus.forEach(() => cluster.fork());
} else {
  const { pid } = process;

  const server = createServer((req, res) => {
    let i = 1e7;
    while (i > 0) {
      i--;
    }

    console.log("Handling request from " + pid);

    res.end("Request ended successfully");
  });

  const port = process.argv[2];
  server.listen(port, () => console.log("Started at pid " + pid));
}
