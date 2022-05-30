module.exports = (sequelize, Sequelize) => {
const Audiobook = sequelize.define('audiobooks', {
    publisherId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull:false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
},)
return Audiobook;
}