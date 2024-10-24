const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Define rutas aquí
router.get(`/getProducts`, productsController.getProducts);
router.post(`/createProduct`, productsController.createProduct);
router.put(`/updateProduct`, productsController.updateProduct);
router.delete(`/deleteProduct/:id`, productsController.deleteProduct);
router.get(`/getProduct/:id`, productsController.getProduct);


module.exports = router;