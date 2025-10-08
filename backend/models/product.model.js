const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    text: { type: String },
    price: { type: Number, required: true },
    imgUrl: { type: String },
    stock: { type: Number, default: 0 },
    category: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);