const { Router } = require("express");
const router = Router();
const rooms = require("../roomData");

router.post("/", (req, res) => {
  try {
    const { roomName, roomPass } = req.body;
    const hasRoom = !rooms.has(roomName)

    console.log(rooms)
    console.log(roomName, rooms.has(roomName))
    if (!hasRoom) {
      res.status(404).json({status: false, message: 'Данной комнаты не существует. Введите корректное название или создайте свою комнату'})
    } else {
      const getRoom = rooms.get(roomName);
      const entriesRoom = [...getRoom.entries()];
      
      res.status(200).json(entriesRoom);
    }
  } catch (e) {
    console.log(e.message)
  }
});

module.exports = router;
