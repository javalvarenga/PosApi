const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Importa la conexión a la base de datos
const DetalleVenta = require("./detalleVentaModel");

// Define el modelo para la tabla "Example"
const Sale = sequelize.define(
  "Sale",
  {
    id_venta: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, // Especifica que esta es la clave primaria
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tipo_pago: {
      type: DataTypes.ENUM("Efectivo", "Tarjeta", "Credito"),
      allowNull: false,
    },
    devuelto: {
      type: DataTypes.ENUM("y", "n"),
      defaultValue: "n",
    },
    descuento: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    iva: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    timestamps: true,
    tableName: "ventas", // Nombre de la tabla en la base de datos
  }
);

Sale.hasMany(DetalleVenta, {
    foreignKey: "id_venta", // Relación con la clave foránea en detalle ventas
    as: "detallesVenta", // Alias para los detalles de la venta
  });

module.exports = Sale;
