const sequelize = require('../config/database');
const User = require('../models/User');
const Category = require('../models/Category');
const Entry = require('../models/Entry');
const Client = require('../models/Client');

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected successfully');
    
    await sequelize.sync({ alter: true });
    console.log('✅ Database tables synced');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = initializeDatabase;
