import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import productsRouter from "./routes/productsRouter.js";
import cors from "cors";
import logger from "./middleware/logger/logger.js";

// Read Config from .env
dotenv.config();

// Start The Server
const app = express();

// Allow for every server to access the api [Temporary]
app.use(cors());

// Connect To Database
await connectDB();

// Add Middleware To Get All Requests in Json Format
app.use(express.json());

// Add Middleware To Log  Requests in txt File
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).send("Something went wrong!");
});

app.use((req, res, next) => {
  logger.info(`[REQUEST STARTED] ${req.method} ${req.originalUrl}`);
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(
      `[REQUEST ENDED]${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
    );
  });
  next();
});

// Add Our Products Router To The Middleware
app.use("/products", productsRouter);

// Exit the App If Our Port doesn't Exist ;
const PORT = process.env.PORT || 4000;

if (!PORT) {
  console.error("Error: PORT is not defined in environment variables.");
  process.exit(1);
}

// Let The Server Listen To our configured Port
app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
