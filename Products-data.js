/*  DATOS DE PRODUCTO */

const products = {
    barcelona: {
        name: "Camiseta Premium Azulgrana",
        desc: "Diseño exclusivo con rayas clásicas. Calidad profesional, tecnología Dri-FIT y comodidad excepcional para los verdaderos aficionados.",
        price: 89.99,
        gradient: "linear-gradient(135deg, #004D98 0%, #A50044 50%, #EDBB00 100%)",
        img: "img/barza.png"
    },
    realmadrid: {
        name: "Camiseta Blanca Elegante",
        desc: "La icónica camiseta blanca. Materiales premium, diseño atemporal y tecnología de ventilación avanzada.",
        price: 89.99,
        gradient: "linear-gradient(135deg, #FDFEFF 0%, #1e3a8a 50%, #FDB913 100%)",
        img: "img/real madrid.png"
    },
    psg: {
        name: "Camiseta Azul Marino Premium",
        desc: "Estilo parisino moderno con detalles en rojo. Tecnología de última generación para máximo confort y rendimiento.",
        price: 89.99,
        gradient: "linear-gradient(135deg, #004170 0%, #DA291C 50%, #1E90FF 100%)",
        img: "img/psg.png"
    },
    mancity: {
        name: "Camiseta Celeste Sport",
        desc: "Color distintivo de los campeones. Diseño innovador con detalles modernos y tecnología profesional.",
        price: 89.99,
        gradient: "linear-gradient(135deg, #6CABDD 0%, #1C2C5B 50%, #97C1E7 100%)",
        img: "img/Manchester City.png"
    },
    liverpool: {
        name: "Camiseta Roja Legendaria",
        desc: "Pasión y tradición en rojo intenso. Diseño icónico con detalles dorados y máxima calidad profesional.",
        price: 89.99,
        gradient: "linear-gradient(135deg, #C8102E 0%, #00B2A9 50%, #F6EB61 100%)",
        img: "img/liverpool.png"
    },
    juventus: {
        name: "Camiseta Rayas Blanco/Negro",
        desc: "Diseño italiano clásico con rayas verticales icónicas. Estilo atemporal con tecnología moderna.",
        price: 89.99,
        gradient: "linear-gradient(135deg, #000000 0%, #FFFFFF 50%, #D4AF37 100%)",
        img: "img/juventus.png"
    }
};

let currentProduct = 'barcelona';