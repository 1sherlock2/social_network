const { Router } = require("express");
const router = Router();
const rooms = require("../roomData");
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  try {
    const { roomName, roomPass } = req.body;
    const hasRoom = rooms.has(roomName);
    if (!hasRoom) {
      res.status(404).json({
        status: false,
        message:
          "Данной комнаты не существует. Введите корректное название или создайте свою комнату",
      });
    } else {
      const getRoom = rooms.get(roomName);
      const entriesRoom = [...getRoom.entries()];
      const comparePass = entriesRoom
        .filter((items) => items[0] === "password")[0]
        .reduce((acc, el) => (acc[el] = el), {});
      if (!bcrypt.compareSync(roomPass, comparePass)) {
        res.status(404).json({ status: false, message: "Авторизационные данные неверны" });
      }
      res.status(200).json(entriesRoom);
    }
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
