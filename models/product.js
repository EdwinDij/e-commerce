const { Sequelize, DataTypes } = require('sequelize');
const db = require('../Config/db')

const Product = db.define('Product', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

Product.sync().then(() => {
    console.log('tables user avec succès ! ')
})


module.exports = Product