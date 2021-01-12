const { Router } = require("express");
const router = Router();
const bcrypt = require('bcrypt');
const rooms  = require('../roomData');

router.post("/create", (req, res) => {
  try {
    const {newRoomName, newRoomPass} = req.body;
    if (!req.body) {
      return res.status(404).json({status: false})
    }
    const saltOrRounds = bcrypt.genSaltSync(10)
    const passWithBcrypt = bcrypt.hashSync(newRoomPass, saltOrRounds)
    if (rooms.has(newRoomName)) {
      res.status(404).json({message: 'Комната с данным наименованием уже создана. Выберите другое название'})
    }
    rooms.set(newRoomName, new Map([
      ["roomName", newRoomName],
      ["password", passWithBcrypt],
      ["users", new Map()],
      ["messages", []],
    ]))
    return res.status(200).json({ status: true })
  } catch (e) {
    console.log(e.message)
  }
})

module.exports = router;