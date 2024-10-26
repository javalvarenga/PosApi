const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../db"); // Importa la conexión a la base de datos

// Define el modelo para la tabla "Example"
const Account = sequelize.define(
  "accounty",
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, // Especifica que esta es la clave primaria
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    CUI: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    saldo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "clientes", // Nombre de la tabla en la base de datos
  }
);

module.exports = Account;
