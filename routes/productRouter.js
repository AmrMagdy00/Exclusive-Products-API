// routes/productsRouter.js
import express from "express";

// Instead of importing a fixed controller, we receive it as a parameter
export default function createProductRouter(productController) {
  const router = express.Router();

  router.get("/", (req, res, next) =>
    productController.getAllProducts(req, res, next)
  );

  router.get("/:id", (req, res, next) =>
    productController.getProductById(req, res, next)
  );

  return router;
}
