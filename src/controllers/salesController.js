const Venta = require("../models/salesModel");
const DetalleVenta = require("../models/detalleVentaModel");
const Product = require("../models/productModel");
const PDFDocument = require('pdfkit');

const  sequelize  = require("../db");

exports.createSales = async (req, res) => {
  const {
    nombre, direccion, telefono, correo, nit, cui,
    fecha, tipo_pago, descuento, saldo, productos
  } = req.body;
 console.log('req.body',req.body);
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

exports.getSalesByIdPDF = async (req, res) => {
  try {
    const { id } = req.params;

    // Llamada al procedimiento almacenado para obtener los datos de la venta
    const [sales] = await sequelize.query("CALL factura(:id_venta)", {
      replacements: { id_venta: id }
    });

    if (!sales) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    const saleData = sales; // Datos de la venta
    const productos = saleData.producto.split(', ');  // Asumimos productos separados por coma
    const cantidades = saleData.cantidad.split(', ');  // Asumimos cantidades separadas por coma

    const doc = new PDFDocument({ margin: 50 });

    // Establecer los encabezados para el PDF
    res.setHeader('Content-Disposition', `attachment; filename=factura_${saleData.id_venta}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');

    // Conectar el documento PDF con la respuesta
    doc.pipe(res);

    // ======= Encabezado principal =======
    doc
      .fontSize(20)
      .fillColor('#0A74DA') // Color del encabezado
      .text('SEVENPOS', { align: 'center' })
      .moveDown(2);

    // ======= Datos de la factura =======
    doc.fontSize(12).fillColor('black');
    doc
      .text(`Factura # ${saleData.id_venta}`, 50, 100, { align: 'left' })
      .text(`Fecha: ${new Date(saleData.fecha).toLocaleDateString()}`, 450, 100, { align: 'right' })
      .moveDown(1);

    // ======= Datos del cliente =======
    doc
      .fontSize(12)
      .text(`Cliente: ${saleData.nombre}`, 50, 130)
      .text(`NIT: ${saleData.nit}`, 450, 130, { align: 'right' })
      .text(`Dirección: ${saleData.direccion}`, 50, 145)
      .text(`Teléfono: ${saleData.telefono}`, 450, 145, { align: 'right' })
      .moveDown(2);

    // ======= Detalle de productos (Tabla) =======
    // Dibujar encabezado de la tabla
    const tableTop = 200;
    const itemStartX = 50;
    const itemStartY = tableTop;
    const columnWidths = [60, 240, 100, 100];

    // Colores del encabezado
    doc
      .fillColor('#0A74DA')
      .fontSize(12)
      .text('Cant.', itemStartX, itemStartY)
      .text('Producto', itemStartX + columnWidths[0], itemStartY)
      .text('Descuento', itemStartX + columnWidths[0] + columnWidths[1], itemStartY)
      .text('Total', itemStartX + columnWidths[0] + columnWidths[1] + columnWidths[2], itemStartY);

    // Dibujar línea debajo del encabezado
    doc
      .moveTo(itemStartX, itemStartY + 15)
      .lineTo(550, itemStartY + 15)
      .stroke();

    // Filas de productos
    let positionY = itemStartY + 25; // Posición inicial de las filas
    productos.forEach((producto, i) => {
      // Alternar color de fondo para cada fila
      if (i % 2 === 0) {
        doc.rect(itemStartX, positionY - 5, 500, 20).fill('#F0F0F0').stroke();  // Fondo gris claro
      }

      // Dibujar contenido de la fila
      doc
        .fillColor('black')
        .fontSize(10)
        .text(cantidades[i], itemStartX, positionY)
        .text(producto, itemStartX + columnWidths[0], positionY)
        .text(saleData.descuento, itemStartX + columnWidths[0] + columnWidths[1], positionY)
        .text(saleData.total, itemStartX + columnWidths[0] + columnWidths[1] + columnWidths[2], positionY);

      positionY += 20; // Espacio entre filas
    });

    // Mover hacia abajo para la sección de resumen
    positionY += 15;

    // ======= Resumen (Subtotal, IVA, Total) =======
    doc
      .fontSize(12)
      .text(`Subtotal: ${saleData.subtotal}`, 400, positionY, { align: 'right' })
      .text(`IVA: ${saleData.iva}`, 400, positionY + 15, { align: 'right' })
      .text(`Total: ${saleData.total}`, 400, positionY + 30, { align: 'right' });

    // Finalizar el PDF y enviarlo
    doc.end();

  } catch (error) {
    console.error("Error al generar el PDF:", error);
    res.status(500).json({ message: "Error al generar el PDF", error });
  }
};

