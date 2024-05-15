const mongoose = require("mongoose");
require("dotenv").config();
const dbUrl = process.env.MONGO_URI;
const dbName = process.env.DATABASE_NAME;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      dbName: dbName,
    });

    console.log(`Database succesfully contected`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectDB };
