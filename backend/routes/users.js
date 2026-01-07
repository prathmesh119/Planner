const express = require('express');
const auth = require('../models/auth');
const User = require('../models/User');

const router = express.Router();

// GET user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: '❌ User not found' });
    }

    res.json({
      message: '✅ Profile fetched successfully',
      user,
    });
  } catch (err) {
    res.status(500).json({ message: '❌ Error fetching profile', error: err.message });
  }
});

// UPDATE user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, phone, dob, bio, avatar } = req.body;
    
    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: '❌ User not found' });
    }
    
    await user.update({
      name, 
      phone, 
      dob, 
      bio, 
      avatar,
    });

    res.json({
      message: '✅ Profile updated successfully',
      user: user.toJSON(),
    });
  } catch (err) {
    res.status(500).json({ message: '❌ Error updating profile', error: err.message });
  }
});

// GET all registered users (for admin purposes)
router.get('/all', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      message: '✅ All users fetched successfully',
      totalUsers: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({ message: '❌ Error fetching users', error: err.message });
  }
});

module.exports = router;