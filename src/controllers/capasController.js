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

exports.getRolPorId = async (req, res) => {
    try {
        const id  = req.params;
        const response = await fetch(baseUrl+ "role/" + id);
        const rol = await response.json();
        res.json(rol);
    } catch (error) {
        console.error('Error al obtener roles: '.message);
    }
};