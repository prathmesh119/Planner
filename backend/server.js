require('dotenv').config();
const express = require('express');
const cors = require('cors');
const initializeDatabase = require('./utils/initDb');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database
initializeDatabase();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/planner', require('./routes/planner'));
app.use('/api/clients', require('./routes/clients'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running ✅', timestamp: new Date() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;