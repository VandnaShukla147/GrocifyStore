import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret';

export const signup = async (req, res, next) => {
  try {
    const { email, userName, password, confirmPassword } = req.body;
    if (!email || !userName || !password || !confirmPassword)
      return res.status(400).json({ status: false, error: 'All fields required' });
    if (password !== confirmPassword)
      return res.status(400).json({ status: false, error: 'Passwords do not match' });
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ status: false, error: 'Email already registered' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, userName, password: hashedPassword });
    await user.save();
    res.json({ status: true, user: { email, userName } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ status: false, error: 'All fields required' });
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ status: false, error: 'Invalid email or password' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ status: false, error: 'Invalid email or password' });
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ status: true, user: { email: user.email, userName: user.userName, role: user.role }, token });
  } catch (err) {
    next(err);
  }
}; 