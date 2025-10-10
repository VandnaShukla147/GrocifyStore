const Cart = require("../models/cart.model");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json({ status: true, cart: cart || { items: [] } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }
    
    const idx = cart.items.findIndex(i => i.product.toString() === product);
    if (idx > -1) {
      cart.items[idx].quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }
    
    await cart.save();
    await cart.populate('items.product');
    res.json({ status: true, cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ status: false, message: 'Cart not found' });
    
    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ status: false, message: 'Item not found' });
    
    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.product');
    res.json({ status: true, cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ status: false, message: 'Cart not found' });
    
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();
    await cart.populate('items.product');
    res.json({ status: true, cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ status: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};