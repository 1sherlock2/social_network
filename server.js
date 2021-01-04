const http = require('http');
const serveStatic = require('./server/serveStatic');
const constants = require('./server/constants');
const chatServer = require('./server/chat_server');

const PORT  = constants.PORT;

let cache = {};

const server = http.createServer((req, res) => {
  let filePath;
  if (req.url === '/') {
    filePath = 'public/index.html'
  } else {
    filePath = `public${req.url}`
  }
  const absPath = `./${filePath}`
  serveStatic(res, cache, absPath)
})
// webSocket соединение
chatServer.listen(server)

server.listen(PORT, () => {
  console.log(`server was started on ${PORT} port`)
});

