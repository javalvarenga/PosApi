const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Importa la conexión a la base de datos

const Category = sequelize.define(
  "Category",
  {
    CategoryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    CategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Categories", 
  }
);

module.exports = Category;
