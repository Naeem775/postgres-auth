const { Sequelize } = require('sequelize');

module.exports = new Sequelize('Naeem', 'postgres', 'abc123', {
    host: 'localhost',
    dialect: 'postgres'
  });
  