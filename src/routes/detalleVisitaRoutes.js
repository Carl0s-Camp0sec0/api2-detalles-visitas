const express = require('express');
const router = express.Router();
const detalleVisitaController = require('../controllers/detalleVisitaController');


// Obtener todos los detalles de visitas
router.get('/todos', detalleVisitaController.obtenerTodos.bind(detalleVisitaController));

// Obtener detalle por ID
router.get('/:id', detalleVisitaController.obtenerPorId.bind(detalleVisitaController));

// Registrar nuevo detalle de visita (se comunica con API 1)
router.post('/registrar', detalleVisitaController.registrarDetalleVisita.bind(detalleVisitaController));

// Obtener detalles por usuario y aeropuerto
router.get('/usuario/historial', detalleVisitaController.obtenerPorUsuarioYAeropuerto.bind(detalleVisitaController));

module.exports = router;