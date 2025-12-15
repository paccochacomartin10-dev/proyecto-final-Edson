/* =======================================
   FORMULARIO DE CONTACTO - JAVASCRIPT
   ======================================= */

// === ELEMENTOS DEL DOM ===
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// === VALIDACIÓN Y ENVÍO DEL FORMULARIO ===
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validación básica
    if (!name || !email || !message) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un email válido.');
        return;
    }
    
    // Simular envío (aquí irías a tu backend/API)
    sendContactForm(name, email, message);
});

// === FUNCIÓN: ENVIAR FORMULARIO ===
function sendContactForm(name, email, message) {
    // Mostrar estado de carga (opcional)
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'ENVIANDO...';
    submitBtn.disabled = true;
    
    // Simular llamada a API (reemplaza esto con tu endpoint real)
    setTimeout(() => {
        // Aquí harías tu fetch() o XMLHttpRequest a tu servidor
        console.log('Formulario enviado:', { name, email, message });
        
        // Mostrar mensaje de éxito
        showSuccessMessage();
        
        // Limpiar formulario
        contactForm.reset();
        
        // Restaurar botón
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // EJEMPLO DE INTEGRACIÓN REAL:
        /*
        fetch('https://tu-api.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
        })
        .then(response => response.json())
        .then(data => {
            showSuccessMessage();
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        })
        .catch(error => {
            alert('Error al enviar el mensaje. Por favor, intenta de nuevo.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
        */
        
    }, 1500); // Simula delay de red
}

// === FUNCIÓN: MOSTRAR MENSAJE DE ÉXITO ===
function showSuccessMessage() {
    successMessage.classList.add('show');
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
}

// === ANIMACIONES DE INPUTS AL FOCUS ===
const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// === ENLACES DE REDES SOCIALES ===
const socialLinks = document.querySelectorAll('.social-link');

socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Aquí puedes agregar tracking de analytics si lo necesitas
        console.log('Click en:', this.title);
    });
});

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('✉️ Página de contacto cargada correctamente');
});