module.exports = (sequelize, Sequelize) => {
    const Library = sequelize.define('library', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: Sequelize.INTEGER,
            unique: true
        },
        bookIds: {
            type: Sequelize.ARRAY(Sequelize.INTEGER)
        }
    });
    return Library;
}
