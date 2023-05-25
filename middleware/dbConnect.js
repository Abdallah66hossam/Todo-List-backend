const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    console.log("connecting to database");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
