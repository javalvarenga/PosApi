const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    const { ProductName, Price, Quantity, Description } = req.body;

    // Crear un nuevo producto
    const newProduct = await Product.create({
      ProductName,
      Price,
      Quantity,
      Description,
    });

    res.status(201).json(newProduct); // 201 indica que el recurso fue creado exitosamente
  } catch (error) {
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
