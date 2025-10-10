import User from '../models/user.model.js';

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ status: false, error: 'User not found' });
    res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, select: '-password' });
    if (!user) return res.status(404).json({ status: false, error: 'User not found' });
    res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
}; 