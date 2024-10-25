const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Importa la conexión a la base de datos

const User = sequelize.define(
  "User",
  {
    id_empleado: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "empleados",
  }
);

module.exports = User;
