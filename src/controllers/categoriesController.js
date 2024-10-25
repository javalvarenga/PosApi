const Category = require("../models/categoryModel");
const  sequelize  = require("../db");


exports.createCategory = async (req, res) => {

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

exports.getCategoriesReport = async (req, res) => {
  try {
    const results = await sequelize.query(
      "CALL sp_categories_getCategoriesReport()",
    );

    if (Array.isArray(results)) {
      console.log("Reporte de Categorías:", results);
      res.json(results); // Enviar los resultados como respuesta
    } else {
      res.json({ message: "No se encontraron resultados" });
    }
  } catch (error) {
    console.error("Error al ejecutar el reporte:", error);
    res.status(500).json({ message: "Error al ejecutar el reporte", error });
  }
};