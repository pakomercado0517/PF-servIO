const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('SpecificTechnicalActivity', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            // allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        materials: {
            type: DataTypes.BOOLEAN,
            // allowNull: false,
        },
        guarantee_time: {
            type: DataTypes.INTEGER,
            // allowNull: false,
        },
    }, {});
}