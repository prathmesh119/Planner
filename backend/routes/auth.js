const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// REGISTER - Create new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: '❌ Please provide name, email, and password' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: '❌ User already exists with this email' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
    });

    // Save user to database
    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: '✅ User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: '❌ Registration error', error: err.message });
  }
});

// LOGIN - Authenticate user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: '❌ Please provide email and password' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: '❌ Invalid email or password' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: '❌ Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: '✅ Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    res.status(500).json({ message: '❌ Login error', error: err.message });
  }
});

// QUICK LOGIN - Simple login with just email and name (for simple auth)
router.post('/quick-login', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validation
    if (!email || !name) {
      return res.status(400).json({ message: '❌ Please provide email and name' });
    }

    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user with temporary password if doesn't exist
      user = new User({
        name,
        email,
        password: Math.random().toString(36).slice(-10), // Random password
      });
      await user.save();
    } else {
      // Update name if user exists
      user.name = name;
      await user.save();
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: '✅ Logged in successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: '❌ Login error', error: err.message });
  }
});

module.exports = router;