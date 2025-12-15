/*   FUTBOLSHOP - HOME JAVASCRIPT
   Funcionalidad interactiva de la página   */

const galleryItems = document.querySelectorAll('.gallery-item');
const mainProductImg = document.getElementById('mainProductImg');
const productName = document.getElementById('productName');
const productDesc = document.getElementById('productDesc');
const background = document.getElementById('background');
const sizeButtons = document.querySelectorAll('.size-btn');
const favoriteBtn = document.getElementById('favoriteBtn');

function changeProduct(team, product) {
    currentProduct = team;
    
    mainProductImg.style.opacity = '0';
    mainProductImg.style.transform = 'scale(0.85) rotate(-15deg)';
    
    setTimeout(() => {
        mainProductImg.src = product.img;
        productName.textContent = product.name;
        productDesc.textContent = product.desc;
        background.style.background = product.gradient;
        
        setTimeout(() => {
            mainProductImg.style.opacity = '1';
            mainProductImg.style.transform = 'scale(1) rotate(-10deg)';
        }, 50);
    }, 400);
}

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        galleryItems.forEach(i => i.classList.remove('active'));
        
        item.classList.add('active');
        
        const team = item.dataset.team;
        const product = products[team];
        changeProduct(team, product);
    });
});

sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        sizeButtons.forEach(b => b.classList.remove('active'));
        
        btn.classList.add('active');
        
        btn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 200);
    });
});

let isFavorite = false;
favoriteBtn.addEventListener('click', () => {
    isFavorite = !isFavorite;
    
    if (isFavorite) {
        favoriteBtn.querySelector('.btn-icon').textContent = '♥';
        favoriteBtn.style.background = 'white';
        favoriteBtn.style.color = '#ff4757';
        
        favoriteBtn.style.transform = 'scale(1.3)';
        setTimeout(() => {
            favoriteBtn.style.transform = '';
        }, 300);
        
        showNotification('Agregado a favoritos ♥', 'success');
    } else {
        favoriteBtn.querySelector('.btn-icon').textContent = '♡';
        favoriteBtn.style.background = 'rgba(255, 255, 255, 0.12)';
        favoriteBtn.style.color = 'white';
        
        showNotification('Removido de favoritos', 'info');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    console.log(' FutbolShop cargado correctamente');
    
    setTimeout(() => {
        mainProductImg.style.opacity = '1';
    }, 100);

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.endsWith('.html')) {
                return;
            }
            
            e.preventDefault();
            const section = href.replace('#', '');
            
            if (section === 'home') {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            } else {
                navLinks.forEach(l => l.classList.remove('active'));
                alert(`La sección "${section.toUpperCase()}" estará disponible próximamente.\n\n¡Estamos trabajando en ello! 🚀`);
                document.querySelector('.nav-link[href="#home"]').classList.add('active');
            }
        });
    });
});

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const productShowcase = document.querySelector('.product-showcase');
    if (productShowcase && window.innerWidth > 1024) {
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        productShowcase.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});