const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Base de datos simple en memoria para almacenar pagos
const payments = new Map();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============================================
// ENDPOINT: Crear un nuevo pago
// ============================================
app.post('/create-payment', async (req, res) => {
  const { amount, subject, buyerData } = req.body;

  // Validaciones
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'El monto debe ser mayor a 0' });
  }

  if (!buyerData || !buyerData.correo) {
    return res.status(400).json({ error: 'El correo del comprador es requerido' });
  }

  const apiKey = process.env.KHIPU_API_KEY;
  const apiUrl = 'https://payment-api.khipu.com/v3/payments';

  // Construir URLs absolutas para el entorno actual
  const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;
  const isLocalhost = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1');

  const paymentData = {
    amount: Math.round(amount),
    currency: 'CLP',
    subject: subject || 'Compra en Nassimba Store',
    
    // URLs de retorno
    return_url: `${baseUrl}/success.html`,
    cancel_url: `${baseUrl}/error.html`,
    
    // Datos del comprador
    payer_email: buyerData.correo,
    payer_name: `${buyerData.nombre} ${buyerData.apellido}`,
    
    // Descripción adicional
    description: `Compra realizada por ${buyerData.nombre} ${buyerData.apellido}`,
    
    // Identificador único de transacción
    transaction_id: `NASSIMBA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };

  // Solo agregar notify_url si NO es localhost (para desarrollo local)
  if (!isLocalhost) {
    paymentData.notify_url = `${baseUrl}/webhook/payment-notification`;
    console.log('✅ Webhook URL configurada:', paymentData.notify_url);
  } else {
    console.log('⚠️  Modo desarrollo: notify_url omitida (localhost no es accesible públicamente)');
    console.log('💡 Para recibir webhooks, usa ngrok o despliega en un servidor real');
  }

  try {
    console.log('📤 Creando pago en Khipu:', {
      amount: paymentData.amount,
      email: paymentData.payer_email,
      transaction_id: paymentData.transaction_id,
      has_webhook: !isLocalhost
    });

    const response = await axios.post(apiUrl, paymentData, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    const paymentInfo = {
      payment_id: response.data.payment_id,
      payment_url: response.data.payment_url,
      transaction_id: paymentData.transaction_id,
      amount: paymentData.amount,
      buyer: buyerData,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    // Guardar en "base de datos" temporal
    payments.set(response.data.payment_id, paymentInfo);

    console.log('✅ Pago creado exitosamente:', response.data.payment_id);

    res.json({ 
      payment_url: response.data.payment_url,
      payment_id: response.data.payment_id,
      transaction_id: paymentData.transaction_id
    });

  } catch (error) {
    console.error('❌ Error al crear pago con Khipu:');
    
    if (error.response) {
      console.error('Código de estado:', error.response.status);
      console.error('Detalle:', error.response.data);
      
      let errorMessage = 'No se pudo crear el pago con Khipu';
      
      if (error.response.status === 401) {
        errorMessage = 'API Key inválida o expirada';
      } else if (error.response.status === 400) {
        errorMessage = 'Datos de pago inválidos: ' + JSON.stringify(error.response.data);
      }
      
      return res.status(error.response.status).json({ error: errorMessage });
    } else {
      console.error('Mensaje:', error.message);
      return res.status(500).json({ error: 'Error de conexión con Khipu' });
    }
  }
});

// ============================================
// ENDPOINT: Webhook para notificaciones de Khipu
// ============================================
app.post('/webhook/payment-notification', async (req, res) => {
  console.log('🔔 Notificación recibida de Khipu');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);

  const { payment_id, notification_token } = req.body;

  if (!payment_id) {
    console.error('❌ Notificación sin payment_id');
    return res.status(400).send('payment_id requerido');
  }

  try {
    const apiKey = process.env.KHIPU_API_KEY;
    const response = await axios.get(
      `https://payment-api.khipu.com/v3/payments/${payment_id}`,
      {
        headers: { 'x-api-key': apiKey }
      }
    );

    const paymentData = response.data;
    console.log('📊 Estado del pago:', paymentData.status);

    if (payments.has(payment_id)) {
      const storedPayment = payments.get(payment_id);
      storedPayment.status = paymentData.status;
      storedPayment.verified_at = new Date().toISOString();
      storedPayment.khipu_data = paymentData;
      payments.set(payment_id, storedPayment);
    }
    
    if (paymentData.status === 'done') {
      console.log('✅ Pago confirmado:', payment_id);
    } else if (paymentData.status === 'rejected') {
      console.log('❌ Pago rechazado:', payment_id);
    }

    res.status(200).send('OK');

  } catch (error) {
    console.error('❌ Error al verificar pago:', error.message);
    res.status(500).send('Error al verificar pago');
  }
});

// ============================================
// ENDPOINT: Consultar estado de un pago
// ============================================
app.get('/payment-status/:paymentId', async (req, res) => {
  const { paymentId } = req.params;
  const apiKey = process.env.KHIPU_API_KEY;

  try {
    console.log('🔍 Consultando estado del pago:', paymentId);

    const response = await axios.get(
      `https://payment-api.khipu.com/v3/payments/${paymentId}`,
      {
        headers: { 'x-api-key': apiKey }
      }
    );
    
    const paymentData = response.data;
    
    if (payments.has(paymentId)) {
      const storedPayment = payments.get(paymentId);
      storedPayment.status = paymentData.status;
      payments.set(paymentId, storedPayment);
    }

    console.log('📊 Estado actual:', paymentData.status);
    
    res.json({
      payment_id: paymentId,
      status: paymentData.status,
      amount: paymentData.amount,
      currency: paymentData.currency,
      subject: paymentData.subject,
      created_at: paymentData.created_at,
      updated_at: paymentData.updated_at,
    });

  } catch (error) {
    console.error('❌ Error al consultar estado del pago:', error.message);
    
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }
    
    res.status(500).json({ error: 'No se pudo consultar el estado del pago' });
  }
});

// ============================================
// ENDPOINT: Listar todos los pagos
// ============================================
app.get('/admin/payments', (req, res) => {
  const allPayments = Array.from(payments.values());
  res.json({
    total: allPayments.length,
    payments: allPayments
  });
});

// ============================================
// ENDPOINT: Obtener detalles de un pago específico
// ============================================
app.get('/admin/payment/:paymentId', (req, res) => {
  const { paymentId } = req.params;
  
  if (payments.has(paymentId)) {
    res.json(payments.get(paymentId));
  } else {
    res.status(404).json({ error: 'Pago no encontrado en la base de datos local' });
  }
});

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('✅ Servidor Nassimba Store corriendo');
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🔑 API Key configurada: ${process.env.KHIPU_API_KEY ? 'Sí' : 'No'}`);
  console.log('='.repeat(50));
});