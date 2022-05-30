const sequelize = require('../utils/database.js');
const Sequelize = require('sequelize');
//const db = require('../utils/database');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.library = require('./library')(sequelize, Sequelize);
db.audiobook = require('./audiobook')(sequelize, Sequelize);

module.exports = db;