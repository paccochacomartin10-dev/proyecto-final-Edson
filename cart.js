/*   CARRITO DE COMPRAS - JAVASCRIPT */

let cart = [];

//  ELEMENTOS DEL DOM 
const cartPanel = document.getElementById('cartPanel');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const cartCount = document.getElementById('cartCount');
const totalAmount = document.getElementById('totalAmount');
const notification = document.getElementById('notification');
const addToCartBtn = document.getElementById('addToCartBtn');

//  FUNCIÓN: CARGAR CARRITO DESDE LOCALSTORAGE 
function loadCart() {
    const savedCart = localStorage.getItem('futbolshop_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

//  FUNCIÓN: GUARDAR CARRITO EN LOCALSTORAGE 
function saveCart() {
    localStorage.setItem('futbolshop_cart', JSON.stringify(cart));
}

//  FUNCIÓN: TOGGLE CARRITO 
function toggleCart() {
    cartPanel.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

//  FUNCIÓN: AGREGAR AL CARRITO 
function addToCart(productData = null) {
    let product;
    
    if (productData) {
        product = {
            id: Date.now(),
            name: productData.name,
            price: productData.price,
            size: productData.size || 'M',
            img: productData.img,
            quantity: 1
        };
    } else {
        const productName = document.getElementById('productName').textContent;
        const price = parseFloat(document.getElementById('currentPrice').textContent);
        const selectedSizeBtn = document.querySelector('.size-btn.active');
        const size = selectedSizeBtn ? selectedSizeBtn.getAttribute('data-size') : 'M';
        const productImg = document.getElementById('mainProductImg').src;
        
        product = {
            id: Date.now(),
            name: productName,
            price: price,
            size: size,
            img: productImg,
            quantity: 1
        };
    }
    
    const existingProduct = cart.find(item => 
        item.name === product.name && item.size === product.size
    );
    
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }
    
    // Guardar y actualizar
    saveCart();
    updateCart();
    showNotification('Producto agregado al carrito');
    
    // Animación del botón
    if (addToCartBtn) {
        addToCartBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            addToCartBtn.style.transform = '';
        }, 200);
    }
}

//  FUNCIÓN: ACTUALIZAR CARRITO 
function updateCart() {
    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    // Mostrar/ocultar carrito vacío
    if (cart.length === 0) {
        if (cartEmpty) cartEmpty.style.display = 'flex';
        if (cartFooter) cartFooter.style.display = 'none';
        if (cartItems) cartItems.innerHTML = '';
        if (cartCount) cartCount.textContent = '0';
        return;
    }
    
    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartFooter) cartFooter.style.display = 'block';
    
    if (cartItems) {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-size">Talla: ${item.size}</div>
                    <div class="cart-item-price">€${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                        ×
                    </button>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="decreaseQuantity(${item.id})">-</button>
                        <span class="qty-number">${item.quantity}</span>
                        <button class="qty-btn" onclick="increaseQuantity(${item.id})">+</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (totalAmount) {
        totalAmount.textContent = total.toFixed(2);
    }
}

//  FUNCIÓN ELIMINAR DEL CARRITO 
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCart();
    showNotification('Producto eliminado', 'error');
}

//  FUNCIÓN AUMENTAR CANTIDAD 
function increaseQuantity(id) {
    const product = cart.find(item => item.id === id);
    if (product) {
        product.quantity++;
        saveCart();
        updateCart();
    }
}

//  FUNCIÓN DISMINUIR CANTIDAD 
function decreaseQuantity(id) {
    const product = cart.find(item => item.id === id);
    if (product) {
        if (product.quantity > 1) {
            product.quantity--;
            saveCart();
            updateCart();
        } else {
            removeFromCart(id);
        }
    }
}

//  FUNCIÓN VACIAR CARRITO 
function clearCart() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        cart = [];
        saveCart();
        updateCart();
        showNotification('Carrito vaciado', 'info');
    }
}

//  FUNCIÓN MOSTRAR NOTIFICACIÓN 
function showNotification(message, type = 'success') {
    if (!notification) return;
    
    const notificationText = notification.querySelector('.notification-text');
    const notificationIcon = notification.querySelector('.notification-icon');
    
    notificationText.textContent = message;
    

    if (type === 'success') {
        notificationIcon.textContent = '✓';
        notification.style.background = '#4ade80';
    } else if (type === 'error') {
        notificationIcon.textContent = '×';
        notification.style.background = '#ff4757';
    } else {
        notificationIcon.textContent = 'ℹ';
        notification.style.background = '#667eea';
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => addToCart());
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartPanel && cartPanel.classList.contains('active')) {
        toggleCart();
    }
});

const checkoutBtn = document.querySelector('.btn-checkout');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        alert(`🎉 ¡Gracias por tu compra!\n\nProductos: ${itemCount}\nTotal: €${total.toFixed(2)}\n\nProcedaremos al pago...`);
    });
}

loadCart();

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.clearCart = clearCart;
window.toggleCart = toggleCart;

console.log('🛒 Sistema de carrito cargado correctamente');