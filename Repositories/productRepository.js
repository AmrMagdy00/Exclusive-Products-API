import logger from "../middleware/logger/logger.js";
import Product from "../models/product.js";

class ProductRepository {
  async getAll(filter = {}, options = {}) {
    const {
      page = 1,
      pageSize = 10,
      sort = "createdAt",
      order = "desc",
    } = options;

    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);
    const sortOrder = order === "asc" ? 1 : -1;

    try {
      const products = await Product.find(filter)
        .sort({ [sort]: sortOrder })
        .skip(skip)
        .limit(limit);
      logger.info(`[${products.length}] Products Got From DB Successfully `);
      return products;
    } catch (err) {
      logger.error("Error while fetching products from DB", err);
      throw err;
    }
  }
}

export default new ProductRepository();
