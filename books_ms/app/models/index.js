const sequelize = require('../utils/database.js');
const Sequelize = require('sequelize');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.audiobooks = require('./audiobook')(sequelize, Sequelize);

module.exports = db;