const { DataTypes } = require('sequelize');


module.exports = ( sequelize ) => {
    return sequelize.define('Profession', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        // timestamps: false,
    });
}