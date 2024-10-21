const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Define rutas aquí
router.get('/getProducts', productsController.getProducts);




module.exports = router;