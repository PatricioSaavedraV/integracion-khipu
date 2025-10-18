const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
require('dotenv').config(); // Para usar variables de entorno

const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint para crear un pago Khipu (API v3.0)
app.post('/create-payment', async (req, res) => {
  const { amount, subject, buyerData } = req.body;

  // Usar variable de entorno para la API Key
  const apiKey = process.env.KHIPU_API_KEY;
  const apiUrl = 'https://payment-api.khipu.com/v3/payments';

  const paymentData = {
    amount: amount,
    currency: 'CLP',
    subject: subject,
    return_url: 'http://localhost:3000/success.html',
    cancel_url: 'http://localhost:3000/error.html',
    // Campos opcionales
    description: 'Compra de productos Nassimba Store',
    payer_email: buyerData?.email || undefined,
    // notify_url: 'http://tu-servidor.com/webhook', // Para recibir notificaciones
  };

  try {
    // Autenticación con API Key en header x-api-key
    const response = await axios.post(apiUrl, paymentData, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    console.log('✅ Pago Khipu creado:', response.data.payment_id);
    res.json({ 
      payment_url: response.data.payment_url,
      payment_id: response.data.payment_id 
    });

  } catch (error) {
    console.error('❌ Error al crear pago con Khipu:');
    if (error.response) {
      console.error('Código de estado:', error.response.status);
      console.error('Detalle:', error.response.data);
    } else {
      console.error('Mensaje:', error.message);
    }
    res.status(500).json({ error: 'No se pudo crear el pago con Khipu' });
  }
});

// Endpoint para verificar estado del pago
app.get('/payment-status/:paymentId', async (req, res) => {
  const { paymentId } = req.params;
  const apiKey = process.env.KHIPU_API_KEY;

  try {
    const response = await axios.get(
      `https://payment-api.khipu.com/v3/payments/${paymentId}`,
      {
        headers: { 'x-api-key': apiKey }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Error al consultar estado del pago:', error.message);
    res.status(500).json({ error: 'No se pudo consultar el estado del pago' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});