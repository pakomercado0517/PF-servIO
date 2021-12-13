const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "ClientNeed",
    {
      name: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["in offer", "in progress", "done"],
        // allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      // price: {
      //     type: DataTypes.INTEGER,
      //     // allowNull: false,
      // },
      // duration: {
      //     type: DataTypes.INTEGER,
      //     // allowNull: false,
      // },
      // guarantee_time: {
      //     type: DataTypes.INTEGER,
      //     // allowNull: false,
      // }
    },
    {}
  );
};
