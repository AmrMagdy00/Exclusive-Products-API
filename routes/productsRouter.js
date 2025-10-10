import productController from "../controllers/productsController.js";
import express from "express";

const router = express.Router();
router.use((req, res, next) => {
  console.log(`[Products Router] ${req.method} ${req.originalUrl}`);
  next();
});
router.get("/", productController.getAllProducts);

export default router;
