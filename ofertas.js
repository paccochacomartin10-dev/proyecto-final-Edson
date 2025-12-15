/*   PÁGINA DE OFERTAS - JAVASCRIPT  */

const productsData = [
    {
        id: 1,
        name: "Camiseta Azulgrana Premium",
        desc: "Edición especial 2024/25 con tecnología Dri-FIT",
        originalPrice: 119.99,
        discountPrice: 89.99,
        discount: 25,
        image: "img/barza.png"
    },
    {
        id: 2,
        name: "Camiseta Blanca Elegante",
        desc: "Diseño clásico con materiales premium",
        originalPrice: 119.99,
        discountPrice: 71.99,
        discount: 40,
        image: "img/real madrid.png"
    },
    {
        id: 3,
        name: "Camiseta Azul Marino Premium",
        desc: "Estilo parisino moderno con detalles únicos",
        originalPrice: 119.99,
        discountPrice: 89.99,
        discount: 25,
        image: "img/psg.png"
    },
    {
        id: 4,
        name: "Camiseta Celeste Sport",
        desc: "Diseño innovador de campeones",
        originalPrice: 119.99,
        discountPrice: 95.99,
        discount: 20,
        image: "img/Manchester City.png"
    },
    {
        id: 5,
        name: "Camiseta Roja Legendaria",
        desc: "Tradición e historia en cada detalle",
        originalPrice: 119.99,
        discountPrice: 71.99,
        discount: 40,
        image: "img/liverpool.png"
    },
    {
        id: 6,
        name: "Camiseta Rayas Blanco/Negro",
        desc: "Estilo italiano clásico atemporal",
        originalPrice: 119.99,
        discountPrice: 89.99,
        discount: 25,
        image: "img/juventus.png"
    }
];

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    productsGrid.innerHTML = productsData.map(product => `
        <div class="product-card">
            <div class="product-discount">-${product.discount}%</div>
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="product-pricing">
                    <span class="product-price-current">€${product.discountPrice}</span>
                    <span class="product-price-old">€${product.originalPrice}</span>
                </div>
                <div class="product-actions">
                    <button class="btn-add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Agregar al Carrito
                    </button>
                    <button class="btn-quick-view" onclick="quickView(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    animateProducts();
}

function scrollToProducts() {
    const productsSection = document.getElementById('productosOfertas');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    
    if (product) {
        const productData = {
            name: product.name,
            price: product.discountPrice,
            size: 'M', 
            img: product.image
        };
        
        let cart = JSON.parse(localStorage.getItem('futbolshop_cart') || '[]');
        
        const newItem = {
            id: Date.now(),
            name: productData.name,
            price: productData.price,
            size: productData.size,
            img: productData.img,
            quantity: 1
        };
        
        const existingProduct = cart.find(item => 
            item.name === newItem.name && item.size === newItem.size
        );
        
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(newItem);
        }
        
        localStorage.setItem('futbolshop_cart', JSON.stringify(cart));
        
        updateCartCount();
        
        showNotification(`¡${product.name} agregado al carrito!`);
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('futbolshop_cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}


function quickView(productId) {
    const product = productsData.find(p => p.id === productId);
    
    if (product) {
        console.log('Vista rápida:', product);
        alert(`Vista Rápida:\n\n${product.name}\n${product.desc}\n\nPrecio: €${product.discountPrice}\nAhorro: €${(product.originalPrice - product.discountPrice).toFixed(2)}`);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: #4ade80;
        color: white;
        padding: 18px 30px;
        border-radius: 50px;
        box-shadow: 0 10px 40px rgba(74, 222, 128, 0.4);
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 700;
        z-index: 10000;
        animation: slideInRight 0.4s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

function animateProducts() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function initMainCountdown() {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    
    function updateCountdown() {
        const now = new Date();
        const difference = targetDate - now;
        
        if (difference <= 0) {
            targetDate.setDate(targetDate.getDate() + 7);
            return;
        }
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function initFlashCountdown() {
    let totalSeconds = 12 * 3600 + 34 * 60 + 56; 
    
    function updateFlashTimer() {
        if (totalSeconds <= 0) {
            totalSeconds = 24 * 3600; 
        }
        
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        document.getElementById('flashHours').textContent = String(hours).padStart(2, '0');
        document.getElementById('flashMinutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('flashSeconds').textContent = String(seconds).padStart(2, '0');
        
        totalSeconds--;
    }
    
    updateFlashTimer();
    setInterval(updateFlashTimer, 1000);
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.offer-card, .benefit-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

function initButtonEffects() {
    const buttons = document.querySelectorAll('.offer-btn, .banner-btn, .cta-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 10) + 'px';
            ripple.style.top = (e.clientY - rect.top - 10) + 'px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

function animateNumbers() {
    const numbers = document.querySelectorAll('.timer-number, .flash-time span');
    
    numbers.forEach(number => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    number.style.animation = 'numberPop 0.3s ease';
                }
            });
        });
        
        observer.observe(number);
    });
}

function initParallax() {
    const bannerImage = document.querySelector('.banner-image img');
    
    if (bannerImage && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) / 50;
            const moveY = (e.clientY - window.innerHeight / 2) / 50;
            
            bannerImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
}

function trackOfferClicks() {
    const offerButtons = document.querySelectorAll('.offer-btn, .banner-btn');
    
    offerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const offerCard = this.closest('.offer-card, .main-banner');
            const offerTitle = offerCard?.querySelector('.offer-title, .banner-title')?.textContent;
            
            console.log('Oferta clickeada:', offerTitle);
            
        });
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes numberPop {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    console.log('🔥 Página de Ofertas cargada');
    
    renderProducts();
    updateCartCount(); 
    initMainCountdown();
    initFlashCountdown();
    initScrollAnimations();
    initButtonEffects();
    animateNumbers();
    initParallax();
    trackOfferClicks();
});

window.addEventListener('load', () => {
    document.body.style.overflowX = 'hidden';
});