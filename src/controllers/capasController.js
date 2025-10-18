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