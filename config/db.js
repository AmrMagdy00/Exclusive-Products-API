import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected To The Database");
  } catch (err) {
    console.log("Error happened while trying to coonect to DB", err);
    process.exit(1);
  }
};

export default connectDB;
