import productsService from "../services/productsService.js";

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productsService.getAllProducts(req.query);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export default { getAllProducts };
