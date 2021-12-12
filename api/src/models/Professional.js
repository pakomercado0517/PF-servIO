const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Professional', {
        certification_name: {
            type: DataTypes.STRING,
        },
        certification_img:{
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.ENUM,
            values: ['vip', 'normal'],
        },
    },  { 
        // timestamps: false
    });
};
