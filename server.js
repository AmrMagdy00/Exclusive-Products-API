// server.js
import dotenv from "dotenv";
import createApp from "./app.js";
import connectDB from "./config/db.js";
import logger from "./middleware/logger/logger.js";

dotenv.config();

const app = createApp();

// Connect To Database
await connectDB();

const PORT = process.env.PORT || 4000;
if (!PORT) {
  console.error("Error: PORT is not defined in environment variables.");
  process.exit(1);
}

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
