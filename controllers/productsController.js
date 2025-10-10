//getAllProducts
//getProductById
import ProductRepository from "../Repositories/productRepository.js";
const getAllProducts = async function (req, res) {
  try {
    const products = await ProductRepository.getAll();
    res.status(200).json(products);
    console.log("Products Imported Succusfully ");
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(
      "Error Happened In Product Repo Whilte Getting all products",
      err
    );
  }
};

export default {
  getAllProducts,
};
