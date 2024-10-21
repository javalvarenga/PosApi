const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Importa la conexión a la base de datos

// Define el modelo para la tabla "Example"
const Product = sequelize.define(
  "Product",

  {
    ProductId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, // Especifica que esta es la clave primaria
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Products", // Nombre de la tabla en la base de datos
  }
);

module.exports = Product;
