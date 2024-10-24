const Category = require("../models/categoryModel");

exports.createCategory = async (req, res) => {

  console.log("parametros", req.body);

  try {
    const { categoryName } = req.body;

    // Crear una nueva categoría
    const newCategory = await Category.create({
      CategoryName: categoryName,
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la categoría", error });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categoryList = await Category.findAll();
    res.json(categoryList);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las categorías", error });
  }
};
