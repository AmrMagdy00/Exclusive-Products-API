import mongoose from "mongoose";
import logger from "../middleware/logger/logger.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    logger.log("Error happened while trying to coonect to DB", err);
    process.exit(1);
  }
};

export default connectDB;
