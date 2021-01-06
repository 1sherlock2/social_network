const { Router } = require("express");
const router = Router();

router.post("/entry", (req, res) => {
  console.log(req.body);
});

module.exports = router;
