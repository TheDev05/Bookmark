const express = require("express");
const router = express.Router();
const user = require("../Models/User");

router.post("/profile", async (req, res) => {
  // console.log(req.body.email);

  let info = await user.findOne({ email: req.body.email });
  // console.log(info.name);
  

  try {
    res.send([info]);
  } catch (error) {
    console.error(error.message);
    res.send("server error");
  }
});

module.exports = router;
