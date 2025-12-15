/*  PÁGINA DE EQUIPOS - JAVASCRIPT  */

const teamsData = [
    {
        id: 1,
        name: "Camiseta Azulgrana Premium",
        desc: "Diseño clásico con rayas tradicionales. Calidad profesional, tecnología Dri-FIT y máxima comodidad.",
        price: "€89.99",
        image: "img/barza.png",
        category: "españa",
        badge: "Popular"
    },
    {
        id: 2,
        name: "Camiseta Blanca Elegante",
        desc: "La icónica camiseta blanca. Materiales premium, diseño atemporal y tecnología avanzada.",
        price: "€89.99",
        image: "img/real madrid.png",
        category: "españa",
        badge: "Top"
    },
    {
        id: 3,
        name: "Camiseta Azul Marino Premium",
        desc: "Estilo parisino moderno con detalles en rojo. Tecnología de última generación.",
        price: "€89.99",
        image: "img/psg.png",
        category: "europa",
        badge: "Nuevo"
    },
    {
        id: 4,
        name: "Camiseta Celeste Sport",
        desc: "Color distintivo de los campeones. Diseño innovador con detalles modernos.",
        price: "€89.99",
        image: "img/Manchester City.png",
        category: "premier",
        badge: "Oferta"
    },
    {
        id: 5,
        name: "Camiseta Roja Legendaria",
        desc: "Pasión y tradición en rojo intenso. Diseño icónico con detalles dorados.",
        price: "€89.99",
        image: "img/liverpool.png",
        category: "premier",
        badge: "Popular"
    },
    {
        id: 6,
        name: "Camiseta Rayas Blanco/Negro",
        desc: "Diseño italiano clásico con rayas verticales icónicas. Estilo atemporal.",
        price: "€89.99",
        image: "img/juventus.png",
        category: "europa",
        badge: "Clásico"
    }
];

let currentFilter = 'all';
let selectedTeam = null;

const teamsGrid = document.getElementById('teamsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modalOverlay = document.getElementById('modalOverlay');

function renderTeams(filter = 'all') {
    teamsGrid.innerHTML = '';
    
    const filteredTeams = filter === 'all' 
        ? teamsData 
        : teamsData.filter(team => team.category === filter);
    
    filteredTeams.forEach(team => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.onclick = () => openModal(team);
        
        card.innerHTML = `
            <div class="team-badge">${team.badge}</div>
            <div class="team-image">
                <img src="${team.image}" alt="${team.name}">
            </div>
            <div class="team-info">
                <h3 class="team-name">${team.name}</h3>
                <p class="team-desc">${team.desc}</p>
                <div class="team-footer">
                    <span class="team-price">${team.price}</span>
                    <button class="btn-view">
                        Ver Detalles
                    </button>
                </div>
            </div>
        `;
        
        teamsGrid.appendChild(card);
    });
    
    const cards = document.querySelectorAll('.team-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function openModal(team) {
    selectedTeam = team;
    
    document.getElementById('modalImg').src = team.image;
    document.getElementById('modalTitle').textContent = team.name;
    document.getElementById('modalDesc').textContent = team.desc;
    
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    document.querySelectorAll('.size-option').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.size-option[data-size="M"]').classList.add('active');
}

function addToCartFromModal() {
    const selectedSize = document.querySelector('.size-option.active');
    
    if (!selectedSize) {
        alert('Por favor, selecciona una talla');
        return;
    }
    
    const size = selectedSize.dataset.size;
    
    console.log('Agregado al carrito:', {
        product: selectedTeam,
        size: size
    });
    
    alert(`✓ ${selectedTeam.name}\nTalla: ${size}\nAgregado al carrito exitosamente!`);
    
    closeModal();
}

function toggleWishlist(button) {
    button.classList.toggle('active');
    const icon = button.querySelector('i');
    
    if (button.classList.contains('active')) {
        icon.className = 'fas fa-heart';
        console.log('Agregado a favoritos:', selectedTeam);
    } else {
        icon.className = 'far fa-heart';
        console.log('Removido de favoritos:', selectedTeam);
    }
}



filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        currentFilter = filter;
        renderTeams(filter);
    });
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

document.querySelectorAll('.size-option').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.size-option').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('⚽ Página de Equipos cargada');
    renderTeams();
});