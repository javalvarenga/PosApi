const Product = require("../models/productModel");
const { sequelize } = require("../db");
const { decodeBase64Image, isBase64DataUrl } = require("../utils");
const { uploadImage } = require("../utils/s3");

exports.createProduct = async (req, res) => {
  try {
    const { productName, price, quantity, description,categoryId, image  } =
      req.body;

    if (image && image.length > 0) {
      const isBase64 = isBase64DataUrl(image);
      const ImageUrl = isBase64
        ? await uploadImage(await decodeBase64Image(image))
            .then(async (s3Url) => s3Url)
            .catch((error) => {
              console.log("error", error);
              throw new Error("Error al guardar la imagen");
            })
        : null;

      // Crear un nuevo producto
      const newProduct = await Product.create({
        ProductName: productName,
        Price: price,
        Quantity: quantity,
        Description: description,
        ImageUrl: ImageUrl,
        CategoryId: categoryId,
      });

      res.status(201).json(newProduct); // 201 indica que el recurso fue creado exitosamente
    } else {
      res
        .status(400)
        .json({ message: "datos insuficientes para crear el producto" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const productList = await Product.findAll();
    /* order desc product by id */
    res.json(productList.sort((a, b) => b.ProductId - a.ProductId));
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
    const { productName, price, quantity, description,categoryId, image, productId } =
      req.body;

    // Verificar que todos los datos necesarios estén presentes
    if (!productName || !price || !quantity || !description) {
      return res
        .status(400)
        .json({ message: "Datos insuficientes para actualizar el producto" });
    }

    let imageUrl = null;

    // Si se proporciona una imagen, manejamos si es Base64 o URL
    if (image && image.length > 0) {
      const isBase64 = isBase64DataUrl(image); // función que verifica si la imagen es Base64
      imageUrl = isBase64
        ? await uploadImage(await decodeBase64Image(image)).catch((error) => {
            console.error("Error al guardar la imagen en S3", error);
            throw new Error("Error al guardar la imagen");
          })
        : image; // Si es URL, la utilizamos directamente
    }

    // Actualizar el producto usando Sequelize
    const [rowsUpdated] = await Product.update(
      {
        ProductName: productName,
        Price: price,
        Quantity: quantity,
        Description: description,
        ImageUrl: imageUrl, // Se actualiza solo si se proporciona la imagen
        CategoryId: categoryId
      },
      {
        where: { ProductId: productId },
        returning: true, // Solo necesario si usas Postgres y quieres el producto actualizado
      }
    );

    // Verificar si se actualizó al menos una fila
    if (rowsUpdated === 0) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado o no actualizado" });
    }

    // Si todo va bien, responde con el producto actualizado
    const updatedProduct = await Product.findByPk(productId);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar el producto", error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // ProductId recibido como parámetro en la URL
    console.log("params", req.params);
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
  const { productId, cantidad, descripcion } = req.body; // O obtener los parámetros de req.query o req.params

  try {
    const results = await sequelize.query(
      "CALL reportByProduct(:productId,:cantidad,:descripcion)", // Llamada al procedimiento almacenado
      {
        replacements: { productId, cantidad, descripcion }, // Parámetros de la llamada
        type: sequelize.QueryTypes.RAW, // Tipo de consulta RAW
      }
    );

    res.json(results); // Enviar los resultados como respuesta
  } catch (error) {
    res.status(500).json({ message: "Error al ejecutar el reporte", error });
  }
};
