// foodData.js
const express = require("express");
const router = express.Router();
const mongoDB = require('../db.js');

router.get("/foodData", async (req, res) => {
  try {
    // Fetch data from the database
    const [food_items, foodCategory] = await mongoDB();
    res.send([food_items, foodCategory]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
