import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product');
    res.json({ status: true, orders });
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ status: false, error: 'Cart is empty' });
    const order = new Order({ user: req.user.id, items: cart.items, total: req.body.total });
    await order.save();
    cart.items = [];
    await cart.save();
    res.json({ status: true, order });
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id }).populate('items.product');
    if (!order) return res.status(404).json({ status: false, error: 'Order not found' });
    res.json({ status: true, order });
  } catch (err) {
    next(err);
  }
}; 