/**
 * @file db.js
 * @description
 * Handles connection to MongoDB using Mongoose.
 *
 * This module exports a single function `connectDB` that:
 * 1. Reads the MongoDB connection string from environment variable `MONGO_URI`.
 * 2. Connects to MongoDB.
 * 3. Logs any connection errors and exits the process if connection fails.
 *
 * @dependencies
 * - mongoose: MongoDB ODM for Node.js.
 * - logger: Custom logger for logging errors or info.
 *
 * @environment
 * - MONGO_URI: MongoDB connection string (required).
 *
 * @example
 * import connectDB from './config/db.js';
 * await connectDB();
 */

import mongoose from "mongoose";
import Logger from "../middleware/logger/logger.js";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    Logger.info("MongoDB connected successfully");
  } catch (err) {
    Logger.error("Error happened while trying to connect to DB", err);

    // Exit the process with failure code
    process.exit(1);
  }
};

// Export the connectDB function for use in server.js
export default connectDB;
