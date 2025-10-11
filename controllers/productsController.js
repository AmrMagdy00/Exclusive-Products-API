import logger from "../middleware/logger/logger.js";
import ProductRepository from "../Repositories/productRepository.js";
import { buildQueryOptions } from "../utils/builder.js";

const getAllProducts = async function (req, res, next) {
  try {
    const { filter, option } = buildQueryOptions(req.query);
    const products = await ProductRepository.getAll(filter, option);
    res.status(200).json(products);
    logger.info(`Succesfull request for Query: ${JSON.stringify(req.query)}`);
  } catch (err) {
    next(err);
  }
};

export default {
  getAllProducts,
};
