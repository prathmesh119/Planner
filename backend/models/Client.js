const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  company: {
    type: DataTypes.STRING,
  },
  projectType: {
    type: DataTypes.STRING,
  },
  budget: {
    type: DataTypes.STRING,
  },
  deadline: {
    type: DataTypes.DATE,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  timestamps: true,
  tableName: 'clients',
});

Client.belongsTo(User, { foreignKey: 'userId' });

module.exports = Client;