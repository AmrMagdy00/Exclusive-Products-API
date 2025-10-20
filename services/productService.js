import { buildQueryOptions } from "../utils/builder.js";
import logger from "../middleware/logger/logger.js";

export default class ProductService {
  constructor(ProductRepository) {
    this.ProductRepository = ProductRepository;
  }
  async getAllProducts(query) {
    const { filter, options } = buildQueryOptions(query);

    const products = await this.ProductRepository.findWithPagination(
      filter,
      options
    );

    logger.info(`[${products.length}] products fetched successfully`);
    return products;
  }

  async getProductById(id) {
    if (!id) {
      logger.warn("getProductById called without id");
      return null;
    }

    const product = await this.ProductRepository.findWithID(id);
    if (product) logger.info(`Product [${id}] fetched successfully`);
    else logger.info(`Product [${id}] not found`);

    return product;
  }
}
