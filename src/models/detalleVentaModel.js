const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Importa la conexión a la base de datos
const Product = require("./productModel"); // Importa el modelo de productos

const DetalleVenta = sequelize.define(
  "DetalleVenta",
  {
    id_detallev: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, // Especifica que esta es la clave primaria
    },
    id_venta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product, // Modelo asociado
        key: "ProductId", // Clave primaria de la tabla de productos
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "detalle_ventas", // Nombre de la tabla en la base de datos
  }
);

module.exports = DetalleVenta;
