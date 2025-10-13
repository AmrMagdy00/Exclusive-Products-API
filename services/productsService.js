import ProductRepository from "../Repositories/productRepository.js";
import { buildQueryOptions } from "../utils/builder.js";
import logger from "../middleware/logger/logger.js";

class ProductService {
  async getAllProducts(query) {
    const { filter, options } = buildQueryOptions(query);

    const products = await ProductRepository.findWithPagination(
      filter,
      options.sort,
      options.skip,
      options.limit
    );

    logger.info(`[${products.length}] products fetched successfully`);
    return products;
  }
}

export default new ProductService();
