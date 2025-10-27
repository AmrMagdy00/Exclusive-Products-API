import { buildQueryOptions } from "../utils/builder.js"; // Utility to parse query parameters
import logger from "../middleware/logger/logger.js";

// ProductService contains business logic for products
export default class ProductService {
  constructor(ProductRepository) {
    // Dependency Injection: store the repository instance
    this.ProductRepository = ProductRepository;
  }

  // -------------------- Get All Products --------------------
  async getAllProducts(query) {
    // Parse the query parameters into filter and options for repository
    // options may include sort, skip, limit, random, etc.
    const { filter, options } = buildQueryOptions(query);

    // Fetch products from repository with filtering, pagination, and sorting
    const products = await this.ProductRepository.findWithPagination(
      filter,
      options
    );

    // Log the number of fetched products
    logger.info(`[${products.length}] products fetched successfully`);

    return products; // Return the products array
  }

  // -------------------- Get Product by ID --------------------
  async getProductById(id) {
    if (!id) {
      logger.warn("getProductById called without id"); // Warn if no ID provided
      return null;
    }

    // Fetch the product by ID using the repository
    const product = await this.ProductRepository.findWithID(id);

    // Log whether the product was found or not
    if (product) logger.info(`Product [${id}] fetched successfully`);
    else logger.info(`Product [${id}] not found`);

    return product; // Return the product or null
  }
}
