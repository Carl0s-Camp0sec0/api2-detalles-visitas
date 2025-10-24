const express = require('express');
const router = express.Router();
const capasController = require('../controllers/capasController');

// Definir las rutas y asociarlas con los métodos del controlador
router.get('/todos', capasController.obtenerTodos);
router.get('/aeropuertos/:id', capasController.obtenerPorId);
router.post('/aeropuertos/crear', capasController.crear);
router.put('/aeropuertos/actualizar/:id', capasController.actualizar);
router.delete('/aeropuertos/eliminar/:id', capasController.eliminar);

module.exports = router;