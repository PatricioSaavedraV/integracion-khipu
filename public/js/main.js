// Importar productos desde el archivo compartido
import { products } from './products.js';

// Cargar carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Renderizar productos
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const cartItem = cart.find(item => item.id === product.id);
        const quantity = cartItem ? cartItem.quantity : 0;
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price.toLocaleString('es-CL')}</p>
            <div class="product-actions">
                <div class="quantity-controls-product">
                    <button class="btn-quantity-product" onclick="decreaseFromProduct(${product.id})" ${quantity === 0 ? 'disabled' : ''}>
                        -
                    </button>
                    <div class="quantity-display-product">${quantity}</div>
                    <button class="btn-quantity-product" onclick="increaseFromProduct(${product.id})">
                        +
                    </button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Aumentar cantidad desde producto
window.increaseFromProduct = function(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    renderProducts();
}

// Disminuir cantidad desde producto
window.decreaseFromProduct = function(productId) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity > 1) {
            existingItem.quantity--;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
        
        saveCart();
        updateCartUI();
        renderProducts();
    }
}

// Actualizar UI del carrito
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartLink = document.getElementById('cartLink');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartLink.classList.remove('disabled');
    } else {
        cartLink.classList.add('disabled');
    }
}

// Guardar carrito
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});