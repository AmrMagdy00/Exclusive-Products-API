import dotenv from "dotenv";
dotenv.config(); // Load environment variables first

import createApp from "./app.js";
import connectDB from "./config/db.js";
import logger from "./middleware/logger/logger.js";
import ProductRepository from "./repositories/productRepository.js";
import ProductService from "./services/productService.js";
import createProductsRouter from "./routes/productRouter.js";
import ProductController from "./controllers/productController.js";

// Dependency Injection
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

// Create Express app
const app = createApp(productController);

// Connect to the database
await connectDB();

// Register routes
const productRouter = createProductsRouter(productController);
app.use("/api/products", productRouter);

const PORT = process.env.PORT || 4000;
if (!PORT) {
  console.error("Error: PORT is not defined in environment variables.");
  process.exit(1);
}

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
