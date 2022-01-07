const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    return sequelize.define('ClientReview', {
        score: {
            type: DataTypes.ENUM,
            values: ["0","1", "2", "3", "4", "5"],
            // allowNull: false,
            defaultValue: "0",
        },
        comment: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
    }, {});
}