// Importamos el framework Express y creamos la aplicación.
const express = require('express');
const app = express();

// Definimos el puerto de escucha (típico para desarrollo local).
const PORT = 3000;

// Configuración de Middleware: permite procesar datos JSON en solicitudes.
app.use(express.json());

// Definición de la ruta principal (Home) para solicitudes GET.
// Cuando se accede a http://localhost:3000/, se envía esta respuesta.
app.get('/', (req, res) => {
    // res.send() envía una respuesta al cliente (navegador).
    res.send('Servidor Khipu activo. Listo para la integración.'); 
});

// El servidor comienza a escuchar en el puerto.
app.listen(PORT, () => {
    // Se muestra este mensaje en la terminal (consola de VSC).
    console.log(`El servidor está escuchando en el puerto ${PORT}...`);
});