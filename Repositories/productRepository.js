import Product from "../models/product.js";

class ProductRepository {
  async findWithPagination(filter, options) {
    if (options.random) {
      return Product.aggregate([
        { $match: filter },
        { $sample: { size: options.limit } },
      ]);
    }

    return Product.find(filter)
      .sort(options.sort)
      .skip(options.skip)
      .limit(options.limit);
  }
}

export default new ProductRepository();
