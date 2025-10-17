// --- datos.js ---
document.getElementById('formDatos').addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nombre || !email) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  // Guardamos datos en localStorage
  localStorage.setItem('datosUsuario', JSON.stringify({ nombre, email }));

  // Redirigimos al pago
  window.location.href = 'pago.html';
});
