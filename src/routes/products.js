const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Define rutas aquí
router.get('/getProducts', productsController.getProducts);
router.get('/createProduct', productsController.createProduct);
router.get('/updateProduct/:id', productsController.updateProduct);
router.get('/deleteProduct/:id', productsController.deleteProduct);
router.get('/getProduct/:id', productsController.getProduct);



module.exports = router;