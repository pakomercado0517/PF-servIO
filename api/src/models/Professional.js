const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Professional', {
        id: {
            // type: DataTypes.UUIDV4,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
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
        // profession:{
        //     type: DataTypes.STRING,
        // }
    },  { 
        // timestamps: false
    });
};
