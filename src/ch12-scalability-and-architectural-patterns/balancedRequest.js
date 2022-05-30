import { request } from "http";
import getStream from "get-stream";

const servers = [
  { host: "localhost", port: 8081 },
  { host: "localhost", port: 8082 },
];

let i = 0;

function balancedRequest(options) {
  return new Promise((resolve) => {
    i = (i + 1) % servers.length;

    options.hostname = servers[i].host;
    options.port = servers[i].port;

    request(options, (response) => {
      resolve(getStream(response));
    }).end();
  });
}

async function trial() {
  for (let i = 0; i < 10; i++) {
    const body = await balancedRequest({
      mathod: "GET",
      path: "/",
    });

    console.log(`Request ${i} completed: `, body);
  }
}

trial().catch((err) => {
  console.error(err);
  process.exit(1);
});
