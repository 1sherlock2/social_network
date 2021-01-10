const { Router } = require("express");
const router = Router();

router.post("/create", (req, res) => {
  console.log(req.body.values)
  if (req.body.values) {
    return res.status(200).json({ status: 'ok'})
  }
  return res.status(404).json({status: 'false'})
})

module.exports = router;