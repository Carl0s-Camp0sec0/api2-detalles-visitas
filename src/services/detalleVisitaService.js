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
            throw new Error('Faltan datos requeridos: nombreUsuario, aeropuertoId, fecha, hora, motivoVisita');
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
            // Continuar sin visitaId si API 1 no está disponible
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

    async actualizar(id, datos) {
        // Validar que el detalle existe
        const detalleExistente = await detalleVisitaRepository.obtenerPorId(id);
        if (!detalleExistente) {
            throw new Error('Detalle de visita no encontrado');
        }

        // Validaciones solo para campos enviados
        if (datos.motivoVisita && !['destino_final', 'transito'].includes(datos.motivoVisita)) {
            throw new Error('Motivo de visita inválido. Debe ser: destino_final o transito');
        }

        // Actualizar en el repositorio
        await detalleVisitaRepository.actualizar(id, datos);
        return await detalleVisitaRepository.obtenerPorId(id);
    }

    async eliminar(id) {
        // Validar que el detalle existe
        const detalleExistente = await detalleVisitaRepository.obtenerPorId(id);
        if (!detalleExistente) {
            throw new Error('Detalle de visita no encontrado');
        }

        return await detalleVisitaRepository.eliminar(id);
    }

    async obtenerPorUsuarioYAeropuerto(nombreUsuario, aeropuertoId) {
        if (!nombreUsuario || !aeropuertoId) {
            throw new Error('Faltan parámetros: nombreUsuario y aeropuertoId son requeridos');
        }
        return await detalleVisitaRepository.obtenerPorUsuarioYAeropuerto(nombreUsuario, aeropuertoId);
    }
}

module.exports = new DetalleVisitaService();