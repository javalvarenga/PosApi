const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// Define rutas aquí
router.get(`/getCategories`, categoriesController.getCategories);
router.get('/getCategoriesReport', categoriesController.getCategoriesReport);
router.post(`/createCategory`, categoriesController.createCategory);



module.exports = router;