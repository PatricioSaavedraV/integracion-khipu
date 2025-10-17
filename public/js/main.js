// --- main.js ---
// Simulamos productos (en la versión final podrías traerlos de MercadoLibre o una API)
const productos = [
  { id: 1, nombre: "Teclado Mecánico RGB", precio: 49990 },
  { id: 2, nombre: "Mouse Gamer Óptico", precio: 29990 },
  { id: 3, nombre: "Audífonos Surround 7.1", precio: 69990 },
  { id: 4, nombre: "Monitor 27'' Curvo 144Hz", precio: 249990 },
  { id: 5, nombre: "Silla Gamer Reclinable", precio: 159990 },
  { id: 6, nombre: "Micrófono USB Pro", precio: 59990 },
  { id: 7, nombre: "Base Refrigerante Laptop", precio: 19990 },
  { id: 8, nombre: "Control Inalámbrico", precio: 49990 },
  { id: 9, nombre: "Alfombrilla XL RGB", precio: 14990 },
  { id: 10, nombre: "Webcam Full HD", precio: 39990 }
];

// Guarda el carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Obtiene el carrito actual
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

// Agrega un producto
function agregarAlCarrito(nombre, precio) {
  let carrito = obtenerCarrito();
  const productoExistente = carrito.find(p => p.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  guardarCarrito(carrito);
  alert(`${nombre} agregado al carrito.`);
}

// Renderiza productos en la página
document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.querySelector('.productos');
  if (!contenedor) return;

  contenedor.innerHTML = '';
  productos.forEach(prod => {
    const card = document.createElement('div');
    card.classList.add('producto');
    card.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p>$${prod.precio.toLocaleString('es-CL')}</p>
      <button onclick="agregarAlCarrito('${prod.nombre}', ${prod.precio})">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });
});
