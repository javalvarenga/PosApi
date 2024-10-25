const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Define rutas aquí
router.post(`/login`, usersController.loginUser);
router.post(`/register`, usersController.createUser);



module.exports = router;