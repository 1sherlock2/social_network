const http = require("http");
const express = require("express");
const cors = require("cors");

const entry = require("./controllers/EntryController");
const createRoom = require('./controllers/CreateRoom')
const constants = require("./utils/constants");
const chatServer = require("./chat_server/chat_server");
const rooms = [];

const app = express();
// const urlencodedFalse = bodyParser.urlencoded({ extended: false });
// const bodyParserJsonTrue = bodyParser.json({
//   inflate: true,
//   strict: true,
// });
app.use(cors({ credentials: true, origin: true }));
app.use(express.json())
app.use("/", entry);
app.use("/create", createRoom)

const PORT = constants.PORT;

const server = http.Server(app);
// webSocket соединение
chatServer.listen(server, rooms);

server.listen(PORT, (error) => {
  if (error) throw Error(error);
  console.log(`server was started on ${PORT} port`);
});
