const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const admin = require("../config/firebaseAdmin");


// 📌 Email/Password Signup
exports.signupUser = async (req, res) => {
  try {
    console.log("📥 Signup request body:", req.body);
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name: name || email.split("@")[0],
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);
    res.status(201).json({
      status: true,
      user: { id: user._id, email: user.email, name: user.name },
      token,
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: err.message });
  }
};

// 📌 Email/Password Login
exports.loginUser = async (req, res) => {
  try {
    console.log("📥 Login request body:", req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({
      status: true,
      user: { id: user._id, email: user.email, name: user.name },
      token,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: err.message });
  }
};

// 📌 Google Authentication using Firebase Admin
exports.googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Missing token" });

    // ✅ Verify the Google ID token with Firebase Admin SDK
    const decoded = await admin.auth().verifyIdToken(token);

    const email = decoded.email;
    const name = decoded.name || email.split("@")[0];
    const picture = decoded.picture;

    let user = await User.findOne({ email });

    // If no user exists, create one
    if (!user) {
      user = await User.create({
        name,
        email,
        password: "google_oauth", // placeholder
      });
    }

    const jwtToken = generateToken(user._id);
    res.json({
      status: true,
      user: { id: user._id, email: user.email, name: user.name, picture },
      token: jwtToken,
    });

  } catch (err) {
    console.error("❌ Google Auth error:", err);
    res.status(500).json({ message: "Google login failed" });
  }
};
