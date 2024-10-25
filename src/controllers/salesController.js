<<<<<<< HEAD
const Venta = require("../models/saleModel");
=======
const Venta = require("../models/salesModel");
>>>>>>> origin
const DetalleVenta = require("../models/detalleVentaModel");
const Product = require("../models/productModel");

const  sequelize  = require("../db");

exports.createSales = async (req, res) => {
  const {
    nombre, direccion, telefono, correo, nit, cui,
    fecha, tipo_pago, descuento, saldo, productos
  } = req.body;
<<<<<<< HEAD

=======
 console.log('req.body',req.body);
>>>>>>> origin
  try {
    // Convertimos los productos en un formato JSON adecuado para el procedimiento almacenado
    const detallesVentaJSON = JSON.stringify(
      productos.map((prod) => ({
        ProductId: prod.ProductId,
        cantidad: prod.cantidad,
      }))
    );

    // Llamada al procedimiento almacenado con Sequelize
    const [result] = await sequelize.query(
<<<<<<< HEAD
      "CALL insertarClienteVenta3(:nombre, :direccion, :telefono, :correo, :nit, :cui, :fecha, :tipo_pago, :descuento, :saldo, :detallesVentaJSON)",
=======
      "CALL insertarClienteVenta2(:nombre, :direccion, :telefono, :correo, :nit, :cui, :fecha, :tipo_pago, :descuento, :saldo, :detallesVentaJSON)",
>>>>>>> origin
      {
        replacements: {
          nombre,
          direccion,
          telefono,
          correo,
          nit,
          cui,
          fecha,
          tipo_pago,
          descuento,
          saldo,
          detallesVentaJSON,
        },
      }
    );
    console.log('ventaid',result);
    res.status(201).json({ message: "Venta creada exitosamente", venta_id: result.venta_id });
  } catch (error) {
    console.error("Error al crear la venta:", error);
    res.status(500).json({ message: "Error al crear la venta", error });
  }
};


exports.getSalesById = async (req, res) => {
  try {
    const { id } = req.params; // venta_id recibido como parámetro en la URL

    // Encontrar la venta por su ID
    const sales = await Venta.findByPk(id);

    if (!sales) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    res.json(sales); // Devolver la venta
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la venta", error });
  }
};

exports.getSales = async (req, res) => {
  try {
    const results = await sequelize.query("CALL reporte_facturas()");

    if (Array.isArray(results)) { // Asegúrate de acceder al primer elemento del array
      const sortedResults = results.sort((a, b) => {
        return b.id_venta - a.id_venta; // Cambia "id_venta" por el nombre correcto de la columna que contiene el ID de la venta
      });
      console.log("Reporte de Ventas:", sortedResults);
      res.json(sortedResults); // Enviar los resultados ordenados como respuesta
    } else {
      res.json({ message: "No se encontraron resultados" });
    }
  } catch (error) {
    console.error("Error al ejecutar el reporte:", error);
    res.status(500).json({ message: "Error al ejecutar el reporte", error });
  }
};
