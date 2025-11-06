const detalleVisitaService = require('../services/detalleVisitaService');

class DetalleVisitaController {
    
    async obtenerTodos(req, res) {
        try {
            const detalles = await detalleVisitaService.obtenerTodos();
            res.json(detalles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async obtenerPorId(req, res) {
        try {
            const detalle = await detalleVisitaService.obtenerPorId(req.params.id);
            res.json(detalle);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async registrarDetalleVisita(req, res) {
        try {
            const detalle = await detalleVisitaService.registrarDetalleVisita(req.body);
            res.status(201).json(detalle);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async actualizar(req, res) {
        try {
            const detalle = await detalleVisitaService.actualizar(req.params.id, req.body);
            res.json(detalle);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async eliminar(req, res) {
        try {
            await detalleVisitaService.eliminar(req.params.id);
            res.json({ message: `Detalle de visita ${req.params.id} eliminado correctamente` });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async obtenerPorUsuarioYAeropuerto(req, res) {
        try {
            const { nombreUsuario, aeropuertoId } = req.query;
            const detalles = await detalleVisitaService.obtenerPorUsuarioYAeropuerto(
                nombreUsuario, 
                aeropuertoId
            );
            res.json(detalles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new DetalleVisitaController();