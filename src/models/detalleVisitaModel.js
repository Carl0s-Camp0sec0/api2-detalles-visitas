
class DetalleVisita {
    constructor(nombreUsuario, aeropuertoId, fecha, hora, motivoVisita, visitaId = null) {
        this.nombreUsuario = nombreUsuario;
        this.aeropuertoId = aeropuertoId;
        this.fecha = fecha;
        this.hora = hora;
        this.motivoVisita = motivoVisita; // 'destino_final' o 'transito'
        this.visitaId = visitaId; // Relación con API 1
    }
}

module.exports = DetalleVisita;