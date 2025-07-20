import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/me', getUserProfile);
router.put('/me', updateUserProfile);

export default router; 