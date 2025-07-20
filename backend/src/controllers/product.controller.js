import Product from '../models/product.model.js';

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({ status: true, products });
  } catch (err) {
    next(err);
  }
};

export const searchProducts = async (req, res, next) => {
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
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, text, price, imgUrl, stock, category } = req.body;
    const product = new Product({ name, text, price, imgUrl, stock, category });
    await product.save();
    res.json({ status: true, product });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ status: true, product });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ status: true });
  } catch (err) {
    next(err);
  }
}; 