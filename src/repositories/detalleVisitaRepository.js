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

    async actualizar(id, datos) {
        // Mapear campos del frontend a nombres de base de datos
        const mapeo = {
            'nombreUsuario': 'nombre_usuario',
            'aeropuertoId': 'aeropuerto_id',
            'fecha': 'fecha',
            'hora': 'hora',
            'motivoVisita': 'motivo_visita'
        };

        const updates = [];
        const valores = [];

        // Construir query dinámicamente solo con campos enviados
        Object.keys(datos).forEach(key => {
            const campoDb = mapeo[key] || key;
            if (mapeo[key] || ['fecha', 'hora'].includes(key)) {
                updates.push(`${campoDb} = ?`);
                valores.push(datos[key]);
            }
        });

        if (updates.length === 0) {
            throw new Error('No hay campos válidos para actualizar');
        }

        valores.push(id); // Agregar ID para el WHERE
        
        const query = `UPDATE detalles_visitas SET ${updates.join(', ')} WHERE id = ?`;
        const [result] = await pool.query(query, valores);
        
        if (result.affectedRows === 0) {
            throw new Error('No se pudo actualizar el detalle de visita');
        }
        
        return result;
    }

    async eliminar(id) {
        const query = 'DELETE FROM detalles_visitas WHERE id = ?';
        const [result] = await pool.query(query, [id]);
        
        if (result.affectedRows === 0) {
            throw new Error('No se pudo eliminar el detalle de visita');
        }
        
        return result;
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