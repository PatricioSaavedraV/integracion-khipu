// --- pago.js ---
document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const subject = 'Compra en Nassimba Store';

  const pagarBtn = document.getElementById('btnPagar');

  pagarBtn.addEventListener('click', async () => {
    try {
      pagarBtn.disabled = true;
      pagarBtn.textContent = 'Creando pago...';

      const res = await fetch('/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total, subject })
      });

      const data = await res.json();

      if (data.payment_url) {
        // Redirige al flujo de pago de Khipu
        window.location.href = data.payment_url;
      } else {
        alert('No se pudo iniciar el pago con Khipu.');
        console.error(data);
      }
    } catch (error) {
      console.error('Error al procesar pago:', error);
      alert('Error al conectar con el servidor de pago.');
    } finally {
      pagarBtn.disabled = false;
      pagarBtn.textContent = 'Pagar con Khipu';
    }
  });
});
