const http = require('http');
const express = require('express');
const cors = require('cors');

const entry = require('./controllers/EntryController');
const createRoom = require('./controllers/CreateRoom');
const constants = require('./utils/constants');
const chatServer = require('./chat_server/chat_server');

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use('/', entry, createRoom);

const PORT = constants.PORT;

const server = http.Server(app);
// webSocket соединение
chatServer.listen(server);

server.listen(PORT, (error) => {
  if (error) throw Error(error);
  console.log(`server was started on ${PORT} port`);
});
