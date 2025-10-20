// app.js
import express from "express";
import cors from "cors";
import createProductsRouter from "./routes/productRouter.js";
import logger from "./middleware/logger/logger.js";

export function createApp(productsController) {
  const app = express();

  app.use(cors());
  app.use(express.json());

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

  // Register routes with injected controller
  const productsRouter = createProductsRouter(productsController);
  app.use("/products", productsRouter);

  // Error handler (should come after routes)
  app.use((err, req, res, next) => {
    logger.error(`Error: ${err.message}`);
    res.status(500).send("Something went wrong!");
  });

  return app;
}

export default createApp;
