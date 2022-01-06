const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    return sequelize.define('Transactions', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        data: {
            type: DataTypes.ARRAY(DataTypes.JSON)
        }
    }, {});
}