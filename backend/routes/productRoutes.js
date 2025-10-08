const express = require("express");
const { 
  getAllProducts, 
  searchProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getAllProducts);
router.post("/search", searchProducts);
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;