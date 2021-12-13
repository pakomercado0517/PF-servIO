const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('ProfessionalOffer', {
        description: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            // allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
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