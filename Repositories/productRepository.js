//findAll
import Product from "../models/product.js";
class ProductRepository {
  async getAll(filter = {}, options = {}) {
    const { skip = 0, limit = 0, sort = {} } = options;
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    console.log("Products Got From DB Succesfully", products);
    return products;
  }
}

export default new ProductRepository();
