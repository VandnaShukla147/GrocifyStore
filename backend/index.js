const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const { errorHandler } = require("./src/middleware/errorHandler");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`, req.body);
  next();
});

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/products", require("./src/routes/productRoutes"));
app.use("/api/cart", require("./src/routes/cartRoutes"));

// Legacy routes for backward compatibility
app.get("/products", async (req, res) => {
  const Product = require("./models/product.model");
  try {
    const products = await Product.find();
    res.json({ status: true, products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/getProducts", async (req, res) => {
  const Product = require("./models/product.model");
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
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));