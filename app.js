const express = require('express');
const detalleVisitaRoutes = require('./src/routes/detalleVisitaRoutes');
const capasRoutes = require('./src/routes/capas.routes')


const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/detalles-visitas', detalleVisitaRoutes);
app.use('/', capasRoutes)

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        message: 'API 2 - Detalles de Visitas a Aeropuertos',
        arquitectura: 'Capas',
        tecnologia: 'Node.js + Express + MySQL',
        endpoints: {
            'GET /detalles-visitas/todos': 'Obtener todos los detalles',
            'GET /detalles-visitas/:id': 'Obtener detalle por ID',
            'POST /detalles-visitas/registrar': 'Registrar nueva visita completa',
            'GET /detalles-visitas/usuario/historial': 'Historial de usuario'
        }
    });
});

module.exports = app;