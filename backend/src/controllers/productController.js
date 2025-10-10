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
    console.error("❌ Error fetching all products:", err);
    res.status(500).json({
      status: false,
      message: "Failed to fetch products",
    });
  }
};

// 🔍 Search products (final version with "all" handling)
exports.searchProducts = async (req, res) => {
  try {
    console.log("🛰 Incoming search request body:", req.body);

    let { search = "", category = [], all = true } = req.body;
    let query = {};

    // ✅ Remove "all" if it's in the category list
    category = category.filter((c) => c.toLowerCase() !== "all");

    // ✅ Decide if we actually need filters
    const noFilters = (all || (category.length === 0 && search.trim().length === 0));

    if (!noFilters) {
      // 📝 Category filter
      if (Array.isArray(category) && category.length > 0) {
        query.category = { $in: category.map((c) => c.toLowerCase()) };
      }

      // 📝 Name search filter
      if (search.trim().length > 0) {
        query.name = { $regex: search.trim(), $options: "i" };
      }
    }

    console.log("🧭 Final query being executed:", query);

    const products = await Product.find(query);
    console.log("📦 Products found:", products.length);

    res.json({
      status: true,
      products,
    });
  } catch (err) {
    console.error("❌ Search failed:", err);
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
    console.error("❌ Create product failed:", err);
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
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }

    res.json({ status: true, product: updated });
  } catch (err) {
    console.error("❌ Update product failed:", err);
    res.status(500).json({ status: false, message: "Update failed" });
  }
};

// ❌ Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }

    res.json({ status: true, message: "Product deleted" });
  } catch (err) {
    console.error("❌ Delete product failed:", err);
    res.status(500).json({ status: false, message: "Delete failed" });
  }
};
