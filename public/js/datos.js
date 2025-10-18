// Formatear RUT mientras se escribe
document.getElementById('rut').addEventListener('input', function(e) {
    let value = e.target.value.replace(/[^0-9kK]/g, '');
    
    if (value.length > 1) {
        const dv = value.slice(-1);
        const numbers = value.slice(0, -1);
        const formatted = numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv;
        e.target.value = formatted;
    }
});

// Formatear teléfono
document.getElementById('telefono').addEventListener('input', function(e) {
    let value = e.target.value.replace(/[^0-9+]/g, '');
    e.target.value = value;
});

// Manejar envío del formulario
document.getElementById('buyerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validar que todos los campos estén completos
    const formData = new FormData(e.target);
    const data = {};
    let isValid = true;
    
    for (let [key, value] of formData.entries()) {
        if (!value.trim()) {
            isValid = false;
            break;
        }
        data[key] = value.trim();
    }
    
    if (!isValid) {
        alert('Por favor, complete todos los campos obligatorios');
        return;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.correo)) {
        alert('Por favor, ingrese un correo electrónico válido');
        return;
    }
    
    // Validar formato de RUT (básico)
    if (data.rut.length < 9) {
        alert('Por favor, ingrese un RUT válido');
        return;
    }
    
    // Guardar datos del comprador
    localStorage.setItem('buyerData', JSON.stringify(data));
    
    // Redirigir a página de pago
    window.location.href = 'pago.html';
});

// Verificar que hay productos en el carrito
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('No hay productos en el carrito');
        window.location.href = 'index.html';
    }
});