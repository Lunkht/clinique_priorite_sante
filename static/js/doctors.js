// Données des médecins
const DOCTORS_DATA = [
    {
        id: 1,
        name: "Dr. Aminata Traoré",
        specialty: "Cardiologie",
        description: "Spécialiste en cardiologie avec plus de 15 ans d'expérience. Expert en chirurgie cardiaque et soins intensifs.",
        experience: "15 ans",
        education: "Université de Conakry, Spécialisation Paris",
        languages: ["Français", "Anglais", "Soussou"],
        phone: "+224 123 456 789",
        email: "a.traore@prioritesante.gn",
        avatar: "👩‍⚕️"
    },
    {
        id: 2,
        name: "Dr. Mamadou Diallo",
        specialty: "Neurologie",
        description: "Neurologue expérimenté spécialisé dans le traitement des troubles neurologiques complexes et la neurochirurgie.",
        experience: "12 ans",
        education: "Université Gamal Abdel Nasser, Spécialisation Lyon",
        languages: ["Français", "Anglais", "Peul"],
        phone: "+224 123 456 790",
        email: "m.diallo@prioritesante.gn",
        avatar: "👨‍⚕️"
    },
    {
        id: 3,
        name: "Dr. Fatoumata Camara",
        specialty: "Pédiatrie",
        description: "Pédiatre dévoué avec une expertise en soins néonatals et développement de l'enfant. Approche bienveillante avec les familles.",
        experience: "10 ans",
        education: "Université de Conakry, Formation Canada",
        languages: ["Français", "Anglais", "Malinké"],
        phone: "+224 123 456 791",
        email: "f.camara@prioritesante.gn",
        avatar: "👩‍⚕️"
    },
    {
        id: 4,
        name: "Dr. Ibrahima Sow",
        specialty: "Orthopédie",
        description: "Chirurgien orthopédiste spécialisé dans la traumatologie et la chirurgie reconstructive. Expert en prothèses articulaires.",
        experience: "18 ans",
        education: "Université Cheikh Anta Diop, Spécialisation Allemagne",
        languages: ["Français", "Anglais", "Allemand"],
        phone: "+224 123 456 792",
        email: "i.sow@prioritesante.gn",
        avatar: "👨‍⚕️"
    },
    {
        id: 5,
        name: "Dr. Mariama Bah",
        specialty: "Gynécologie",
        description: "Gynécologue-obstétricienne avec expertise en santé reproductive et chirurgie gynécologique minimalement invasive.",
        experience: "14 ans",
        education: "Université de Conakry, Spécialisation Maroc",
        languages: ["Français", "Arabe", "Soussou"],
        phone: "+224 123 456 793",
        email: "m.bah@prioritesante.gn",
        avatar: "👩‍⚕️"
    },
    {
        id: 6,
        name: "Dr. Alpha Condé",
        specialty: "Dermatologie",
        description: "Dermatologue spécialisé dans le traitement des affections cutanées tropicales et la dermatologie esthétique.",
        experience: "8 ans",
        education: "Université Gamal Abdel Nasser, Spécialisation France",
        languages: ["Français", "Anglais", "Malinké"],
        phone: "+224 123 456 794",
        email: "a.conde@prioritesante.gn",
        avatar: "👨‍⚕️"
    },
    {
        id: 7,
        name: "Dr. Hadja Kaba",
        specialty: "Médecine Générale",
        description: "Médecin généraliste avec une approche holistique de la santé. Spécialisée en médecine préventive et soins familiaux.",
        experience: "20 ans",
        education: "Université de Conakry, Formation continue Europe",
        languages: ["Français", "Anglais", "Peul", "Soussou"],
        phone: "+224 123 456 795",
        email: "h.kaba@prioritesante.gn",
        avatar: "👩‍⚕️"
    },
    {
        id: 8,
        name: "Dr. Sékou Touré",
        specialty: "Chirurgie Générale",
        description: "Chirurgien général expérimenté en chirurgie d'urgence, laparoscopie et chirurgie digestive.",
        experience: "16 ans",
        education: "Université Cheikh Anta Diop, Spécialisation Belgique",
        languages: ["Français", "Anglais", "Néerlandais"],
        phone: "+224 123 456 796",
        email: "s.toure@prioritesante.gn",
        avatar: "👨‍⚕️"
    }
];

let filteredDoctors = [...DOCTORS_DATA];

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    renderDoctors(DOCTORS_DATA);
    initializeSearch();
});

// Afficher les médecins
function renderDoctors(doctors) {
    const grid = document.getElementById('doctors-grid');
    
    if (doctors.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <h3>Aucun médecin trouvé</h3>
                <p>Essayez de modifier vos critères de recherche.</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = doctors.map(doctor => `
        <div class="doctor-card" data-specialty="${doctor.specialty.toLowerCase()}">
            <div class="doctor-image">
                ${doctor.avatar}
            </div>
            <div class="doctor-info">
                <h3 class="doctor-name">${doctor.name}</h3>
                <div class="doctor-specialty">${doctor.specialty}</div>
                <p class="doctor-description">${doctor.description}</p>
                
                <div style="margin: 1rem 0; font-size: 0.9rem; color: var(--text-light);">
                    <div><strong>Expérience:</strong> ${doctor.experience}</div>
                    <div><strong>Formation:</strong> ${doctor.education}</div>
                    <div><strong>Langues:</strong> ${doctor.languages.join(', ')}</div>
                </div>
                
                <div class="doctor-contact">
                    <a href="tel:${doctor.phone}" class="contact-btn">
                        📞 Appeler
                    </a>
                    <a href="mailto:${doctor.email}" class="contact-btn" style="background: var(--accent-color);">
                        ✉️ Email
                    </a>
                    <a href="contact.html?doctor=${doctor.id}" class="contact-btn" style="background: var(--success-color);">
                        📅 RDV
                    </a>
                </div>
            </div>
        </div>
    `).join('');
    
    // Animation d'entrée
    setTimeout(() => {
        document.querySelectorAll('.doctor-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }, index * 100);
        });
    }, 100);
}

// Initialiser la recherche
function initializeSearch() {
    const searchInput = document.getElementById('doctor-search');
    const specialtyFilter = document.getElementById('specialty-filter');
    
    // Recherche en temps réel
    searchInput.addEventListener('input', debounce(performSearch, 300));
    specialtyFilter.addEventListener('change', performSearch);
}

// Fonction de recherche
function performSearch() {
    const searchTerm = document.getElementById('doctor-search').value.toLowerCase();
    const selectedSpecialty = document.getElementById('specialty-filter').value.toLowerCase();
    
    filteredDoctors = DOCTORS_DATA.filter(doctor => {
        const matchesSearch = searchTerm === '' || 
            doctor.name.toLowerCase().includes(searchTerm) ||
            doctor.specialty.toLowerCase().includes(searchTerm) ||
            doctor.description.toLowerCase().includes(searchTerm);
            
        const matchesSpecialty = selectedSpecialty === '' || 
            doctor.specialty.toLowerCase().includes(selectedSpecialty);
            
        return matchesSearch && matchesSpecialty;
    });
    
    renderDoctors(filteredDoctors);
    
    // Mettre à jour le compteur
    updateResultsCounter();
}

// Fonction de recherche appelée par le bouton
function searchDoctors() {
    performSearch();
    
    // Scroll vers les résultats
    document.getElementById('doctors-grid').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Mettre à jour le compteur de résultats
function updateResultsCounter() {
    const existingCounter = document.getElementById('results-counter');
    if (existingCounter) {
        existingCounter.remove();
    }
    
    const counter = document.createElement('div');
    counter.id = 'results-counter';
    counter.style.cssText = `
        text-align: center;
        margin: 2rem 0;
        padding: 1rem;
        background: var(--light-bg);
        border-radius: var(--border-radius-small);
        color: var(--text-light);
        font-weight: 500;
    `;
    
    const total = DOCTORS_DATA.length;
    const filtered = filteredDoctors.length;
    
    if (filtered === total) {
        counter.innerHTML = `<span style="color: var(--primary-color);">${total} médecins</span> disponibles`;
    } else {
        counter.innerHTML = `<span style="color: var(--primary-color);">${filtered}</span> médecin${filtered > 1 ? 's' : ''} trouvé${filtered > 1 ? 's' : ''} sur ${total}`;
    }
    
    const grid = document.getElementById('doctors-grid');
    grid.parentNode.insertBefore(counter, grid);
}

// Fonction debounce pour optimiser la recherche
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Animations CSS supplémentaires
const additionalStyles = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .doctor-card {
        opacity: 0;
    }
    
    .nav-menu a.active {
        color: var(--accent-color) !important;
        font-weight: 600;
    }
    
    .nav-menu a.active::after {
        width: 100%;
        background: var(--accent-color);
    }
    
    @media (max-width: 768px) {
        .doctors-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        .search-form {
            flex-direction: column;
        }
        
        .doctor-contact {
            justify-content: center;
        }
        
        .contact-btn {
            flex: 1;
            justify-content: center;
            min-width: 100px;
        }
    }
`;

// Injecter les styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialiser le compteur au chargement
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(updateResultsCounter, 500);
});