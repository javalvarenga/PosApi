const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

// Define rutas aquí
router.post('/createSales', salesController.createSales);
router.get('/getSales', salesController.getSales);
router




module.exports = router;