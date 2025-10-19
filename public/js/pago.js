// Cargar datos del carrito y comprador
document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const buyerData = JSON.parse(localStorage.getItem('buyerData')) || {};

  // Validar que hay productos en el carrito
  if (cart.length === 0) {
    alert('No hay productos en el carrito');
    window.location.href = 'index.html';
    return;
  }

  // Validar que hay datos del comprador
  if (!buyerData.correo) {
    alert('Faltan datos del comprador');
    window.location.href = 'datos.html';
    return;
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const subject = `Compra en Nassimba Store - ${cart.length} producto(s)`;
  const pagarBtn = document.getElementById('btnPagar');

  // Mostrar información del comprador
  console.log('[v0] Datos del comprador:', buyerData);
  console.log('[v0] Total a pagar:', total);

  pagarBtn.addEventListener('click', async () => {
    try {
      // Deshabilitar botón y mostrar estado de carga
      pagarBtn.disabled = true;
      pagarBtn.innerHTML = '<span>⏳</span> Procesando...';

      console.log('[v0] Iniciando creación de pago...');

      // Crear el pago en el servidor
      const res = await fetch('/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: total, 
          subject: subject,
          buyerData: buyerData 
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al crear el pago');
      }

      console.log('[v0] Pago creado exitosamente:', data.payment_id);

      // Guardar payment_id en localStorage para verificación posterior
      localStorage.setItem('current_payment_id', data.payment_id);
      localStorage.setItem('current_transaction_id', data.transaction_id);

      // Redirigir a Khipu
      if (data.payment_url) {
        console.log('[v0] Redirigiendo a Khipu...');
        window.location.href = data.payment_url;
      } else {
        throw new Error('No se recibió URL de pago');
      }

    } catch (error) {
      console.error('[v0] Error al procesar pago:', error);
      
      // Mostrar mensaje de error al usuario
      alert(`Error: ${error.message}\n\nPor favor, intenta nuevamente o contacta a soporte.`);
      
      // Restaurar botón
      pagarBtn.disabled = false;
      pagarBtn.innerHTML = 'Pagar con Khipu';
    }
  });
});