const Product = require("../models/productModel");
const { sequelize } = require("../db");
const { decodeBase64Image, isBase64DataUrl } = require("../utils");
const { uploadImage } = require("../utils/s3");

exports.createProduct = async (req, res) => {
  try {
    const { ProductName, Price, Quantity, Description, Image } = req.body;
    
    if (Image && Image.length > 0) {
      const isBase64 = isBase64DataUrl(Image);
      const ImageUrl = isBase64
        ? await uploadImage(await decodeBase64Image(Image))
            .then(async (s3Url) => s3Url)
            .catch((error) => {
              console.log("error", error);
              throw new Error("Error al guardar la imagen");
            })
        : null;
        console.log('ImageUrl', ImageUrl);

      // Crear un nuevo producto
      const newProduct = await Product.create({
        ProductName,
        Price,
        Quantity,
        Description,
        ImageUrl,
      });

      res.status(201).json(newProduct); // 201 indica que el recurso fue creado exitosamente
    }
  } catch (error) {
        console.log('error',error);
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const productList = await Product.findAll();
    res.json(productList);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params; // ProductId recibido como parámetro en la URL

    // Encontrar el producto por su ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(product); // Devolver el producto
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // ProductId recibido como parámetro en la URL
    const { ProductName, Price, Quantity, Description } = req.body;

    // Encontrar el producto por su ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Actualizar los campos
    product.ProductName = ProductName || product.ProductName;
    product.Price = Price || product.Price;
    product.Quantity = Quantity || product.Quantity;
    product.Description = Description || product.Description;

    // Guardar los cambios
    await product.save();

    res.json(product); // Devolver el producto actualizado
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // ProductId recibido como parámetro en la URL

    // Buscar el producto por su ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Eliminar el producto
    await product.destroy();

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};

exports.reportByProduct = async (req, res) => {
  const { productId } = req.body; // O obtener los parámetros de req.query o req.params

  try {
    const results = await sequelize.query(
      "CALL reportByProduct(:productId)", // Llamada al procedimiento almacenado
      {
        replacements: { productId }, // Pasar los parámetros
        type: sequelize.QueryTypes.RAW, // Tipo de consulta RAW
      }
    );

    res.json(results); // Enviar los resultados como respuesta
  } catch (error) {
    res.status(500).json({ message: "Error al ejecutar el reporte", error });
  }
};
