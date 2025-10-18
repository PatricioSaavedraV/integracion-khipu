// Importar productos desde el archivo compartido
import { products } from './products.js';

// Cargar carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Renderizar items del carrito
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                <p style="font-size: 1.2rem; margin-bottom: 1rem;">Tu carrito está vacío</p>
                <a href="index.html" class="btn btn-primary">Ir a comprar</a>
            </div>
        `;
        updateCartSummary();
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        // Buscar la imagen actual del producto desde el array compartido
        const product = products.find(p => p.id === item.id);
        const currentImage = product ? product.image : item.image;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${currentImage}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.title}</h3>
                <p class="cart-item-price">$${item.price.toLocaleString('es-CL')}</p>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="btn-quantity" onclick="decreaseQuantity(${item.id})">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="btn-quantity" onclick="increaseQuantity(${item.id})">+</button>
                </div>
                <button class="btn-remove" onclick="removeItem(${item.id})">Eliminar</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    updateCartSummary();
}

// Aumentar cantidad
window.increaseQuantity = function(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity++;
        saveCart();
        renderCartItems();
    }
}

// Disminuir cantidad
window.decreaseQuantity = function(productId) {
    const item = cart.find(i => i.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        saveCart();
        renderCartItems();
    }
}

// Eliminar item
window.removeItem = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCartItems();
}

// Actualizar resumen
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString('es-CL')}`;
    document.getElementById('total').textContent = `$${subtotal.toLocaleString('es-CL')}`;
}

// Guardar carrito
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
});