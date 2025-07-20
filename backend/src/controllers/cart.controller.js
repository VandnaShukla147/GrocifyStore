import Cart from '../models/cart.model.js';

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    res.json({ status: true, cart: cart || { items: [] } });
  } catch (err) {
    next(err);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { product, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = new Cart({ user: req.user.id, items: [] });
    const idx = cart.items.findIndex(i => i.product.toString() === product);
    if (idx > -1) {
      cart.items[idx].quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }
    await cart.save();
    res.json({ status: true, cart });
  } catch (err) {
    next(err);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ status: false, error: 'Cart not found' });
    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ status: false, error: 'Item not found' });
    item.quantity = quantity;
    await cart.save();
    res.json({ status: true, cart });
  } catch (err) {
    next(err);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ status: false, error: 'Cart not found' });
    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ status: false, error: 'Item not found' });
    item.remove();
    await cart.save();
    res.json({ status: true, cart });
  } catch (err) {
    next(err);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ status: true });
  } catch (err) {
    next(err);
  }
}; 