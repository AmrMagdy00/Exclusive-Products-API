import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import productsRouter from "./routes/productsRouter.js";
// Read Config from .env
dotenv.config();

// Start The Server
const app = express();

// Connect To Database
await connectDB();

// Add Middleware To Get All Requests in Json Format
app.use(express.json());

// Add Middleware For Any Request [For Debugging]
app.use((req, res, next) => {
  console.log(`[Server] ${req.method} ${req.originalUrl}`);
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
  console.log(`Server is running on port ${PORT}`);
});
