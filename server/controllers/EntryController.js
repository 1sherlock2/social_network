const { Router } = require("express");
const router = Router();
const rooms = require("../roomData");

router.post("/", (req, res) => {
  const { roomId, roomPass } = req.body.values;
  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ["roomName", roomId],
        ["users", new Map()],
        ["messages", []],
      ])
    );
  } else {
    res.status(404).json({ message: "Такой комнаты нет " });
  }
  const getRoom = rooms.get(roomId);
  const entriesRoom = [...getRoom.entries()];
  res.status(200).json(entriesRoom);
});

module.exports = router;
