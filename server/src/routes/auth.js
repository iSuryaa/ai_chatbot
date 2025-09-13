const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_EXPIRES = '7d';
const SALT_ROUNDS = 10;

router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, confirmPassword } = req.body;
    const errors = {};

    // Validation
    if (!name) errors.name = "Full Name is required";
    if (!name || name.length < 5) errors.name = "Full name must be at least 5 characters long";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (!confirmPassword) errors.confirmPassword = "Confirm Password is required";
    if (password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      errors.password = "Password must be at least 8 characters, include uppercase, number, and symbol";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ errors: { email: "Email already in use" } });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({ email, passwordHash, name });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name }, message: "Account created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: { general: "Server error" } });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = {};

    // Validation
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: { email: "Invalid email" } });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(400).json({ errors: { password: "Invalid password" } });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: { general: "Server error" } });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    const errors = {};

    if (!email) errors.email = "Email is required";
    if (!newPassword) errors.newPassword = "New password is required";
    if (!confirmPassword) errors.confirmPassword = "Confirm password is required";
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // strong password check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (newPassword && !passwordRegex.test(newPassword)) {
      errors.newPassword = "Password must be at least 8 characters, include uppercase, number, and symbol";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: { email: "User not found" } });
    }

    // Update password
    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = passwordHash;
    await user.save();

    res.json({ message: "Password has been reset successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: { general: "Server error" } });
  }
});



module.exports = router;
