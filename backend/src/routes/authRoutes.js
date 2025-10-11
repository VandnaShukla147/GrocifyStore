const express = require("express");
const { signupUser, loginUser, googleAuth } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);  

module.exports = router;
