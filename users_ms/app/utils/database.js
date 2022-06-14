const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(`postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOSTNAME}:${process.env.PG_PORT}/${process.env.PG_DB_NAME}`)

module.exports = sequelize;
