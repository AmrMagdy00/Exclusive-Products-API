export default class ProductController {
  constructor(productService) {
    this.productService = productService;
  }
  async getAllProducts(req, res, next) {
    try {
      const products = await this.productService.getAllProducts(req.query);
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      return res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
}
