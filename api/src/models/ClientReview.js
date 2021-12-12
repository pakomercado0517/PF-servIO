const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    return sequelize.define('ClientReview', {
        score: {
            type: DataTypes.ENUM,
            values: ["1", "2", "3", "4", "5"],
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {});
}