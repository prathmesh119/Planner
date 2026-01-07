const express = require('express');
const auth = require('../models/auth');
const Client = require('../models/Client');

const router = express.Router();

// GET all clients for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const clients = await Client.findAll({ where: { userId: req.userId } });
    res.json({
      message: '✅ Clients fetched',
      clients,
    });
  } catch (err) {
    res.status(500).json({ message: '❌ Error fetching clients', error: err.message });
  }
});

// ADD new client
router.post('/', auth, async (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ message: '❌ Name and email are required' });
    }

    const client = await Client.create({
      userId: req.userId,
      ...req.body,
    });
    
    res.status(201).json({
      message: '✅ Client added successfully',
      client,
    });
  } catch (err) {
    res.status(500).json({ message: '❌ Error adding client', error: err.message });
  }
});

// GET single client
router.get('/:id', auth, async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    
    if (!client) {
      return res.status(404).json({ message: '❌ Client not found' });
    }

    res.json({
      message: '✅ Client fetched',
      client,
    });
  } catch (err) {
    res.status(500).json({ message: '❌ Error fetching client', error: err.message });
  }
});

// UPDATE client
router.put('/:id', auth, async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);

    if (!client) {
      return res.status(404).json({ message: '❌ Client not found' });
    }

    await client.update({ ...req.body });
    
    res.json({
      message: '✅ Client updated successfully',
      client,
    });
  } catch (err) {
    res.status(500).json({ message: '❌ Error updating client', error: err.message });
  }
});

// DELETE client
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Client.destroy({ where: { id: req.params.id } });
    
    if (!deleted) {
      return res.status(404).json({ message: '❌ Client not found' });
    }

    res.json({ message: '✅ Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: '❌ Error deleting client', error: err.message });
  }
});

module.exports = router;