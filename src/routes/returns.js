const express = require('express');
const router = express.Router();
const returnsController = require('../controllers/returnsController');

// Define rutas aquí
router.post(`/createDevolucion`, returnsController.createDevolucion);
router.get(`/getDevoluciones`, returnsController.getDevoluciones);

module.exports = router;