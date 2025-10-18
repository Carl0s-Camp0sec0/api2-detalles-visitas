const express = require('express');
const router = express.Router();
const capasController = require('../controllers/capasController');

// Definir las rutas y asociarlas con los métodos del controlador
router.get('/todos', capasController.obtenerTodos);

module.exports = router;