const baseUrl = 'http://localhost:8081/';

exports.obtenerTodos = async (req, res) => {
    try {
        const response = await fetch(baseUrl+'aeropuertos/todos')
        const todos = await response.json()
        res.json(todos)
    } catch (error) {
        console.error(error.message)
    }
}

exports.obtenerPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(baseUrl + `aeropuertos/${id}`);
        const aeropuerto = await response.json();
        res.json(aeropuerto);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.crear = async (req, res) => {
    try {
        const response = await fetch(baseUrl + 'aeropuertos/crear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const nuevoAeropuerto = await response.json();
        res.json(nuevoAeropuerto);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.actualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await fetch(baseUrl + `aeropuertos/actualizar/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const aeropuertoActualizado = await response.json();
        res.json(aeropuertoActualizado);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.eliminar = async (req, res) => {
    try {
        const { id } = req.params;
        await fetch(baseUrl + `aeropuertos/eliminar/${id}`, { method: 'DELETE' });
        res.json({ message: `Aeropuerto ${id} eliminado` });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
};