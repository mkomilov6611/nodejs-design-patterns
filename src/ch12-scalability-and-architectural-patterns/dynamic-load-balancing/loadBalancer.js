import { createServer } from "http";
import httpProxy from "http-proxy";
import consul from "consul";

const routing = [
  {
    path: "/api",
    service: "api-service",
    index: 0,
  },
  {
    path: "/",
    service: "web-service",
    index: 0,
  },
];

const consulClient = consul();
const proxy = httpProxy.createProxyServer();

const server = createServer((req, res) => {
  const route = routing.find((route) => req.url.startsWith(route.path));

  consulClient.agent.service.list((err, services) => {
    const servers =
      !err &&
      Object.values(services).filter((service) =>
        service.Tags.includes(route.service)
      );

    if (err || servers.length === 0) {
      res.writeHead(502);
      return res.end("Bad gateway");
    }

    route.index = (route.index + 1) % servers.length;
    const server = servers[route.index];
    const target = `http://${server.Address}"${server.Port}`;

    proxy.web(req, res, { target });
  });
});

server.listen(8080, () => {
  console.log(`Load balancer started on port 8080`);
});
