import Product from "../models/product.js";

export default class ProductRepository {
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

  async findWithID(id) {
    if (!id) return null;

    const numericId = Number(id);
    if (Number.isNaN(numericId)) return null;

    return Product.findOne({ id: numericId });
  }
}
