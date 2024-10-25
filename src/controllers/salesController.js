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
      "CALL insertarClienteVenta2(:nombre, :direccion, :telefono, :correo, :nit, :cui, :fecha, :tipo_pago, :descuento, :saldo, :detallesVentaJSON)",
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