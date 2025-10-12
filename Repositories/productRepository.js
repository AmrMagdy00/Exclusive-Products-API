import Product from "../models/product.js";

class ProductRepository {
  async findWithPagination(filter, sort, skip, limit) {
    return Product.find(filter).sort(sort).skip(skip).limit(limit);
  }
}

export default new ProductRepository();
