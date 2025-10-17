// --- carrito.js ---
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Renderizar los productos en el carrito
function renderCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalEl = document.getElementById('total');
  const carrito = obtenerCarrito();

  lista.innerHTML = '';

  if (carrito.length === 0) {
    lista.innerHTML = '<p>Tu carrito está vacío.</p>';
    totalEl.textContent = '';
    return;
  }

  let total = 0;

  carrito.forEach((prod, index) => {
    const item = document.createElement('div');
    item.classList.add('producto');
    item.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio.toLocaleString('es-CL')}</p>
      <p>Cantidad: 
        <button onclick="cambiarCantidad(${index}, -1)">-</button>
        ${prod.cantidad}
        <button onclick="cambiarCantidad(${index}, 1)">+</button>
      </p>
      <button onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    lista.appendChild(item);
    total += prod.precio * prod.cantidad;
  });

  totalEl.textContent = `Total: $${total.toLocaleString('es-CL')}`;
}

// Cambiar cantidad
function cambiarCantidad(index, delta) {
  const carrito = obtenerCarrito();
  carrito[index].cantidad += delta;

  if (carrito[index].cantidad <= 0) carrito.splice(index, 1);

  guardarCarrito(carrito);
  renderCarrito();
}

// Eliminar producto
function eliminarProducto(index) {
  const carrito = obtenerCarrito();
  carrito.splice(index, 1);
  guardarCarrito(carrito);
  renderCarrito();
}

// Continuar al formulario
document.getElementById('btnContinuar').addEventListener('click', () => {
  const carrito = obtenerCarrito();
  if (carrito.length === 0) {
    alert('Agrega al menos un producto antes de continuar.');
    return;
  }
  window.location.href = 'datos.html';
});

document.addEventListener('DOMContentLoaded', renderCarrito);
