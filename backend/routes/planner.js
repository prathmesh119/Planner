const express = require('express');
const auth = require('../models/auth');
const Category = require('../models/Category');
const Entry = require('../models/Entry');

const router = express.Router();

// ===== CATEGORY ROUTES =====

// GET all categories
router.get('/categories', auth, async (req, res) => {
  try {
    const categories = await Category.findAll({ where: { userId: req.userId } });
    res.json({
      message: '✅ Categories fetched',
      categories,
    });
  } catch (err) {
    res.status(500).json({ message: '❌ Error fetching categories', error: err.message });
  }
});

// ADD new category
router.post('/categories', auth, async (req, res) => {
  try {
    const { name, color } = req.body;
    
    if (!name || !color) {
      return res.status(400).json({ message: '❌ Name and color are required' });
    }

    const category = await Category.create({
      userId: req.userId,
      name,
      color,
    });
    
    res.status(201).json({
      message: '✅ Category added successfully',
      category,
    });
  } catch (err) {
    res.status(500).json({ message: '❌ Error adding category', error: err.message });
  }
});

// DELETE category
router.delete('/categories/:id', auth, async (req, res) => {
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });
    
    if (!deleted) {
      return res.status(404).json({ message: '❌ Category not found' });
    }

    res.json({ message: '✅ Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: '❌ Error deleting category', error: err.message });
  }
});

// ===== ENTRY ROUTES =====

// GET all entries for user
router.get('/entries', auth, async (req, res) => {
  try {
    const entries = await Entry.findAll({ where: { userId: req.userId } });
    res.json({
      message: '✅ Entries fetched',
      entries,
    });
  } catch (err) {
    res.status(500).json({ message: '❌ Error fetching entries', error: err.message });
  }
});

// ADD new entry
router.post('/entries', auth, async (req, res) => {
  try {
    const { date, categoryId, title, notes } = req.body;
    
    if (!date || !categoryId) {
      return res.status(400).json({ message: '❌ Date and categoryId are required' });
    }

    const entry = await Entry.create({
      userId: req.userId,
      date,
      categoryId,
      title,
      notes,
    });
    
    res.status(201).json({
      message: '✅ Entry added successfully',
      entry,
    });
  } catch (err) {
    res.status(500).json({ message: '❌ Error adding entry', error: err.message });
  }
});

// UPDATE entry
router.put('/entries/:id', auth, async (req, res) => {
  try {
    const entry = await Entry.findByPk(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: '❌ Entry not found' });
    }

    await entry.update({ ...req.body });
    
    res.json({
      message: '✅ Entry updated successfully',
      entry,
    });
  } catch (err) {
    res.status(500).json({ message: '❌ Error updating entry', error: err.message });
  }
});

// DELETE entry
router.delete('/entries/:id', auth, async (req, res) => {
  try {
    const deleted = await Entry.destroy({ where: { id: req.params.id } });
    
    if (!deleted) {
      return res.status(404).json({ message: '❌ Entry not found' });
    }

    res.json({ message: '✅ Entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: '❌ Error deleting entry', error: err.message });
  }
});

module.exports = router;