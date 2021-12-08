const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    return sequelize.define('ClientNeed', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: ['in offer', 'in progress', 'done'],
            // allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        }, {});
}