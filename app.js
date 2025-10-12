// app.js
import express from "express";
import cors from "cors";
import productsRouter from "./routes/productsRouter.js";
import logger from "./middleware/logger/logger.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Error handler
  app.use((err, req, res, next) => {
    logger.error(`Error: ${err.message}`);
    res.status(500).send("Something went wrong!");
  });

  // Request logger
  app.use((req, res, next) => {
    logger.info(`[REQUEST STARTED] ${req.method} ${req.originalUrl}`);
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      logger.info(
        `[REQUEST ENDED] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
      );
    });
    next();
  });

  app.use("/products", productsRouter);

  return app;
}

export default createApp;
