const express = require("express");
const router = express.Router();

const User = require("../Models/User");
const { body, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "qwjkityshauaklpejnaskserjrrkwqmwnsjs";

// jwt: session time
// end points

router.post(
  "/createuser",

  [body("email").isEmail(), body("password").isLength({ min: 5 })],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;

    // console.log("userEmial:", email);

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      let userData = await User.findOne({ email });
      if (userData) {
        return res.status(400).json({ errors: "User already exist" });
      }

      console.log("userData", userData);

      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: true });
    }
  }
);

router.post(
  "/loginuser",

  [body("email").isEmail(), body("password").isLength({ min: 5 })],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      // console.log("userData", userData);

      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct email" });
      }

      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct paswords" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
