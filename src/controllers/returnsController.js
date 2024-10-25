const { sequelize } = require("../db"); // Importa la conexión a la base de datos
const Devolucion = require("../models/returnsModel");

// Controlador para insertar una devolución
exports.createDevolucion = async (req, res) => {
  try {
    const { id_venta, ProductId, motivo } = req.body;

    await sequelize.query(
      "CALL InsertarDevolucion(:id_venta, :ProductId, :motivo)", 
      {
        replacements: {
          id_venta,
          ProductId,
          motivo,
        },
      }
    );

    res.status(201).json({ message: "Devolución creada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la devolución", error });
  }
};

// Controlador para listar devoluciones
exports.getDevoluciones = async (req, res) => {
  try {
    const devoluciones = await sequelize.query("CALL ListarDevoluciones()");

    res.json(devoluciones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las devoluciones", error });
  }
};
