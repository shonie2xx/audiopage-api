module.exports = (sequelize, Sequelize) => {
      const User = sequelize.define('users', {
        userId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return User;
};
