const Venta = require("../models/saleModel");
const DetalleVenta = require("../models/detalleVentaModel");
const Product = require("../models/productModel");

const  sequelize  = require("../db");

exports.createSales = async (req, res) => {
  const {
    nombre, direccion, telefono, correo, nit, cui,
    fecha, tipo_pago, descuento, saldo, productos
  } = req.body;

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
      "CALL insertarClienteVenta3(:nombre, :direccion, :telefono, :correo, :nit, :cui, :fecha, :tipo_pago, :descuento, :saldo, :detallesVentaJSON)",
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

exports.getSales = async (req, res) => {
    try {
      // Llamada al procedimiento almacenado reporte_facturas
      const [sales] = await sequelize.query("CALL reporte_facturas()");
  
      res.status(200).json(sales);  // Devolver los resultados en formato JSON
    } catch (error) {
      console.error("Error al obtener el reporte de facturas:", error);
      res.status(500).json({ message: "Error al obtener el reporte de facturas", error });
    }
  };
