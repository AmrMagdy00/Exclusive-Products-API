// ProductController handles HTTP requests for product-related actions
export default class ProductController {
  constructor(productService) {
    // Dependency Injection: store the service instance
    this.productService = productService;
  }

  // -------------------- Get All Products --------------------
  async getAllProducts(req, res, next) {
    try {
      // Pass query parameters to the service (for filtering, sorting, pagination)
      const products = await this.productService.getAllProducts(req.query);

      // Respond with status 200 and the list of products
      res.status(200).json(products);
    } catch (err) {
      // Pass errors to the error-handling middleware
      next(err);
    }
  }

  // -------------------- Get Product by ID --------------------
  async getProductById(req, res, next) {
    try {
      const { id } = req.params; // Get the product ID from the route parameters

      // Call the service layer to retrieve the product
      const product = await this.productService.getProductById(id);

      // If product not found, respond with 404
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      // Respond with status 200 and the product data
      return res.status(200).json(product);
    } catch (err) {
      // Pass errors to the error-handling middleware
      next(err);
    }
  }
}
