const Product = require("../models/product.model");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ status: true, products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { all, search, category } = req.body;
    let query = {};
    
    if (!all) {
      if (category && category.length > 0) {
        query.category = { $in: category.map(c => c.toLowerCase()) };
      }
      if (search && search.length > 0) {
        query.name = { $regex: search, $options: 'i' };
      }
    }
    
    const products = await Product.find(query);
    res.json({ status: true, products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, text, price, imgUrl, stock, category } = req.body;
    const product = await Product.create({ name, text, price, imgUrl, stock, category });
    res.status(201).json({ status: true, product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ status: true, product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ status: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};