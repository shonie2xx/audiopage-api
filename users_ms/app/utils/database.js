const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(`postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOSTNAME}:${process.env.PG_PORT}/${process.env.PG_DB_NAME}`)
//const sequelize = new Sequelize(`postgres://alex:12345@34.90.139.74:5432/db_users`)


module.exports = sequelize;
