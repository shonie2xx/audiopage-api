const sequelize = require('../utils/database.js');
const Sequelize = require('sequelize');


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('./users')(sequelize, Sequelize);
db.role = require('./roles')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherkey: "userId",
})
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["user", "admin"];

module.exports = db;