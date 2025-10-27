import express from "express";

// Factory function to create a router for product-related routes
// We receive the controller as a parameter instead of importing a fixed one
export default function createProductRouter(productController) {
  const router = express.Router(); // Create a new Express router instance

  // -------------------- Get All Products Route --------------------
  // GET /products
  // Calls the getAllProducts method of the controller
  // Supports query parameters for filtering, sorting, and pagination
  router.get("/", (req, res, next) =>
    productController.getAllProducts(req, res, next)
  );

  // -------------------- Get Product by ID Route --------------------
  // GET /products/:id
  // Calls the getProductById method of the controller
  router.get("/:id", (req, res, next) =>
    productController.getProductById(req, res, next)
  );

  return router; // Return the configured router
}
