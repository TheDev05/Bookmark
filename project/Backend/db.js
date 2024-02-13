// mongoDB.js
const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://TheDev05:TheDev05@cluster0.pclim9q.mongodb.net/GoFood?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected");

    let fetched_data = mongoose.connection.db.collection("food_items");
    let data1 = await fetched_data.find({}).toArray();

    let foodCategory = mongoose.connection.db.collection("foodCategory");
    let data2 = await foodCategory.find({}).toArray();

    // Return the data
    return [data1, data2];
  } catch (error) {
    console.log("err: ", error);
    throw error; // Throw the error to be caught by the caller
  }
};

module.exports = mongoDB;
