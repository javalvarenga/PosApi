const sequelize = require("../db"); // Importa la conexión a la base de datos
const Devolucion = require("../models/returnsModel");

// Controlador para insertar una devolución
exports.createDevolucion = async (req, res) => {
  const { id_venta, ProductId, motivo } = req.body;
  try {
    const results = await sequelize.query(
      "CALL InsertarDevolucion(:id_venta, :ProductId, :motivo)", 
      {
        replacements: { id_venta, ProductId, motivo }, 
        type: sequelize.QueryTypes.RAW, 
      }
    );

    // Enviar respuesta de éxito
    res.status(201).json({ message: "Devolución creada correctamente", data: results });
  } catch (error) {
    console.error("Error al crear la devolución:", error); 
    res.status(500).json({ message: "Error al crear la devolución", error: error.message || error });
  }
};

// Controlador para listar devoluciones
exports.getDevoluciones = async (req, res) => {
  try {
    // Llama al procedimiento almacenado ListarDevoluciones
    const results = await sequelize.query(
      "CALL ListarDevoluciones()", 
      {
        type: sequelize.QueryTypes.RAW,
      }
    );

    const devoluciones = results

    if (devoluciones.length === 0) {
      return res.status(404).json({ message: "No se encontraron devoluciones." });
    }

    // Enviar respuesta con las devoluciones
    res.json(devoluciones);
  } catch (error) {
    console.error("Error al obtener las devoluciones:", error); // Muestra el error en la consola
    res.status(500).json({ message: "Error al obtener las devoluciones", error: error.message || error });
  }
};