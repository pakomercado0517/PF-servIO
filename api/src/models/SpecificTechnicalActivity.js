const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "SpecificTechnicalActivity",
    {
      name: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      materials: {
        type: DataTypes.BOOLEAN,
        // allowNull: false,
      },
      guarantee: {
        type: DataTypes.BOOLEAN,
        // allowNull: false,
      },
      guarantee_time: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      job_time: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      type: {
        type: DataTypes.STRING,
        values: ["specific", "general"],
      },
    },
    {}
  );
};
