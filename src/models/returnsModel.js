const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Importa la conexión a la base de datos

const Devolucion = sequelize.define(
  "Devolucion",
  {
    idDevolucion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_venta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ventas', 
        key: 'id_venta',
      },
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products', 
        key: 'ProductId',
      },
    },
    motivo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    fecha_devolucion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "devoluciones",
  }
);

module.exports = Devolucion;
