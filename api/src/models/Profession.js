const { DataTypes } = require('sequelize');


module.exports = ( sequelize ) => {
    return sequelize.define('Profession', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        // timestamps: false,
    });
}