const http = require("http");
const fs = require("fs").promises;

const PORT = 8081;

const requestHendler = async (request, response) => {
  const manifest = await fs.readFile("./package.json", "utf8");
  // if (request.url.indexOf("/home") >= 0) {
  //   response.writeHead(200, { "Content-type": "text/json" });
  //   return response.end('{ "url": "homepage" }');
  // }
  response.writeHead(200, { "Content-type": "text/json" });
  return response.end(manifest);
};
const server = http.createServer(requestHendler);

server.listen(PORT, (err) => {
  if (err) {
    console.error("Error at aserver launch:", err);
  }
  console.log(`Server works at port ${PORT}`);
});
