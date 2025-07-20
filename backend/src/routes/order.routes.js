import express from 'express';
import { getOrders, createOrder, getOrderById } from '../controllers/order.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getOrders);
router.post('/', createOrder);
router.get('/:id', getOrderById);

export default router; 