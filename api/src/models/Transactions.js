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
        },
        status: {
            type: DataTypes.ENUM,
            values: ["pending to pay", "approved", "rejected", "pending to approve"],
        },
        mptoken: {
            type: DataTypes.STRING,
        }
    }, {});
}