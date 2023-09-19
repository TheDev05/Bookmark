const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://TheDev05:TheDev05@cluster0.pclim9q.mongodb.net/GoFood?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected");

    let fetched_data = mongoose.connection.db.collection("food_items");
    let data1 = await fetched_data.find({}).toArray();

    let foodCategory = mongoose.connection.db.collection("foodCategory");
    let data2 = await foodCategory.find({}).toArray();

    // global vairbale

    global.food_items = data1;
    global.foodCategory = data2;

    // console.log(global.foodCategory);
  } catch (error) {
    console.log("err: ", error);
  }
};

module.exports = mongoDB();
