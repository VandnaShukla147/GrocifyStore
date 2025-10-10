const Product = require("../models/product.model");

// ✅ Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      status: true,
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Failed to fetch products",
    });
  }
};

// 🔍 Search products
exports.searchProducts = async (req, res) => {
  const { search, category, all } = req.body;
  let query = {};

  if (!all) {
    if (category && category.length > 0) {
      query.category = { $in: category.map((c) => c.toLowerCase()) };
    }
    if (search && search.length > 0) {
      query.name = { $regex: search, $options: "i" };
    }
  }

  try {
    const products = await Product.find(query);
    res.json({ status: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Search failed" });
  }
};

// ➕ Create new product
exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({
        status: false,
        message: "Name and price are required",
      });
    }

    const product = await Product.create(req.body);
    res.status(201).json({ status: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Create failed" });
  }
};

// ✏️ Update product
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }

    res.json({ status: true, product: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Update failed" });
  }
};

// ❌ Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }

    res.json({ status: true, message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Delete failed" });
  }
};
