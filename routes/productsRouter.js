import productController from "../controllers/productsController.js";
import express from "express";

const router = express.Router();

router.get("/", productController.getAllProducts);

export default router;
