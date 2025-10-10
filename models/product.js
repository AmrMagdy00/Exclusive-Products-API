import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    color: { type: String, required: true },
    images: { type: [String] },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    ratingCount: { type: Number, required: true },
    avgRate: { type: Number, required: true },
    mainImgSRC: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    isFeatured: { type: Boolean },
    isFlash: { type: Boolean },
    colors: { type: [colorSchema], required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema, "Products");

export default Product;
