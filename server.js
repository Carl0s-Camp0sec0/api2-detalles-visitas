require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

console.log('🔍 Iniciando servidor...');
console.log('🔍 Puerto configurado:', PORT);

app.listen(PORT, () => {
    console.log('═══════════════════════════════════════════════════');
    console.log('🚀 API 2 - Detalles de Visitas');
    console.log(`📍 Servidor corriendo en: http://localhost:${PORT}`);
    console.log('🏗️  Arquitectura: Capas');
    console.log('⚙️  Tecnología: Node.js + Express + MySQL');
    console.log('═══════════════════════════════════════════════════');
}).on('error', (err) => {
    console.error('❌ Error al iniciar el servidor:', err.message);
});