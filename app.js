// Importamos el framework Express y creamos la aplicación.
const express = require('express');
const app = express();
const path = require('path');

// Definimos el puerto de escucha (típico para desarrollo local).
const PORT = 3000;

// Configuración de Middleware: permite procesar datos JSON en solicitudes.
app.use(express.json());

// Middleware para servir los archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal -> redirige automáticamente a index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// (Opcional) Endpoint para crear el pago con Khipu (cuando lo tengas listo)
app.post('/create-payment', (req, res) => {
  // Simulación (en producción acá iría la API real de Khipu)
  const { amount, subject } = req.body;
  console.log(`Solicitud de pago recibida: ${subject} - $${amount}`);

  // Respuesta simulada
  res.json({
    payment_url: 'https://khipu.com/payment/simulado'
  });
});

// El servidor comienza a escuchar en el puerto.
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
