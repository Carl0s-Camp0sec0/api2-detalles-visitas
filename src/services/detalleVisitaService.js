const detalleVisitaRepository = require('../repositories/detalleVisitaRepository');
const DetalleVisita = require('../models/detalleVisitaModel');
const axios = require('axios');


class DetalleVisitaService {
    
    async obtenerTodos() {
        return await detalleVisitaRepository.obtenerTodos();
    }

    async obtenerPorId(id) {
        const detalle = await detalleVisitaRepository.obtenerPorId(id);
        if (!detalle) {
            throw new Error('Detalle de visita no encontrado');
        }
        return detalle;
    }

    async registrarDetalleVisita(datos) {
        // Validaciones
        if (!datos.nombreUsuario || !datos.aeropuertoId || !datos.fecha || !datos.hora || !datos.motivoVisita) {
            throw new Error('Faltan datos requeridos');
        }

        if (!['destino_final', 'transito'].includes(datos.motivoVisita)) {
            throw new Error('Motivo de visita inválido. Debe ser: destino_final o transito');
        }

        // PASO 1: Registrar/Actualizar en API 1 (contador de visitas)
        let visitaId = null;
        try {
            const response = await axios.post(
                `${process.env.API1_URL}/visitas/registrar`,
                null,
                {
                    params: {
                        nombreUsuario: datos.nombreUsuario,
                        aeropuertoId: datos.aeropuertoId
                    }
                }
            );
            visitaId = response.data.id;
        } catch (error) {
            console.error('Error al comunicarse con API 1:', error.message);
        }

        // PASO 2: Guardar detalle completo en API 2
        const detalleVisita = new DetalleVisita(
            datos.nombreUsuario,
            datos.aeropuertoId,
            datos.fecha,
            datos.hora,
            datos.motivoVisita,
            visitaId
        );

        const id = await detalleVisitaRepository.crear(detalleVisita);
        return await detalleVisitaRepository.obtenerPorId(id);
    }

    async obtenerPorUsuarioYAeropuerto(nombreUsuario, aeropuertoId) {
        return await detalleVisitaRepository.obtenerPorUsuarioYAeropuerto(nombreUsuario, aeropuertoId);
    }
}

module.exports = new DetalleVisitaService();