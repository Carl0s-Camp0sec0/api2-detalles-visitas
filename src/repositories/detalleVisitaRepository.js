const pool = require('../config/database');


class DetalleVisitaRepository {
    
    async obtenerTodos() {
        const [rows] = await pool.query('SELECT * FROM detalles_visitas ORDER BY created_at DESC');
        return rows;
    }

    async obtenerPorId(id) {
        const [rows] = await pool.query('SELECT * FROM detalles_visitas WHERE id = ?', [id]);
        return rows[0];
    }

    async crear(detalleVisita) {
        const query = `
            INSERT INTO detalles_visitas 
            (nombre_usuario, aeropuerto_id, fecha, hora, motivo_visita, visita_id) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(query, [
            detalleVisita.nombreUsuario,
            detalleVisita.aeropuertoId,
            detalleVisita.fecha,
            detalleVisita.hora,
            detalleVisita.motivoVisita,
            detalleVisita.visitaId
        ]);
        return result.insertId;
    }

    async obtenerPorUsuarioYAeropuerto(nombreUsuario, aeropuertoId) {
        const query = `
            SELECT * FROM detalles_visitas 
            WHERE nombre_usuario = ? AND aeropuerto_id = ?
            ORDER BY created_at DESC
        `;
        const [rows] = await pool.query(query, [nombreUsuario, aeropuertoId]);
        return rows;
    }
}

module.exports = new DetalleVisitaRepository();