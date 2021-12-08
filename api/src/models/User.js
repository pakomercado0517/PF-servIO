const { DataTypes } = require('sequelize');

module.exports = ( sequelize ) => {
    return sequelize.define('User', {
        id: {
            // type: DataTypes.UUIDV4,
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            // allowNull: false,
            unique: true
        },
        first_name: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        phone: {
            type: DataTypes.INTEGER,
            // allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        dni_front: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        dni_back: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        verified: {
            type: DataTypes.BOOLEAN,
            // allowNull: false
        },
        professional: {
            type: DataTypes.BOOLEAN,
            // allowNull: false
        },
    }, {
        // tableName: 'users',
        // timestamps: true,
        // underscored: true
    });
}
