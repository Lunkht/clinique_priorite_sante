// Configuration de l'API
const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5001/api' : '/api';

// Variables globales
let currentTestimonialIndex = 0;
let specialtiesData = [];
let testimonialsData = [];

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    loadSpecialties();
    loadStats();
    loadTestimonials();
    generateAlphabet();
    initScrollAnimations();
    initActionButtons();
});

// Initialiser les boutons d'action
function initActionButtons() {
    const actionButtons = document.querySelectorAll('.action-button');

    actionButtons.forEach((button, index) => {
        // Animation d'entrée décalée
        setTimeout(() => {
            button.style.animation = 'slideInRight 0.6s ease-out forwards';
        }, index * 200);
    });
}

// Gérer les clics sur les cartes d'action
function handleActionClick(type) {
    const messages = {
        emergency: {
            title: "Emergency Call",
            message: "Calling emergency line: +62-XXX-XXXX-XXXX\n\nOur 24/7 emergency team is ready to assist you.",
            icon: "/images/emergency_call-02.svg"
        },
        doctor: {
            title: "Find Doctor",
            message: "Redirecting to doctor search...\n\nYou can search by specialty, name, or availability.",
            icon: "👨‍⚕️"
        },
        appointment: {
            title: "Make Appointment",
            message: "Opening appointment booking system...\n\nChoose your preferred date and time.",
            icon: "📅"
        }
    };

    const msg = messages[type];

    // Créer une notification personnalisée
    createCustomNotification(msg.title, msg.message, msg.icon);
}

// Créer une notification personnalisée
function createCustomNotification(title, message, icon) {
    // Supprimer toute notification existante
    const existingNotification = document.getElementById('custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.id = 'custom-notification';
    notification.innerHTML = `
                <div class="notification-content">
                    <div class="notification-icon">${icon}</div>
                    <div class="notification-text">
                        <h4>${title}</h4>
                        <p>${message}</p>
                    </div>
                    <button class="notification-close" onclick="closeNotification()">×</button>
                </div>
            `;

    notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                z-index: 10000;
                min-width: 300px;
                max-width: 400px;
                animation: slideInRight 0.3s ease-out;
                border-left: 4px solid var(--primary-color);
            `;

    // Ajouter les styles pour le contenu
    const style = document.createElement('style');
    style.textContent = `
                .notification-content {
                    display: flex;
                    align-items: flex-start;
                    padding: 1.5rem;
                    gap: 1rem;
                }
                .notification-icon {
                    font-size: 2rem;
                    flex-shrink: 0;
                }
                .notification-text h4 {
                    margin: 0 0 0.5rem 0;
                    color: var(--secondary-color);
                    font-size: 1.1rem;
                }
                .notification-text p {
                    margin: 0;
                    color: var(--text-light);
                    font-size: 0.9rem;
                    line-height: 1.4;
                    white-space: pre-line;
                }
                .notification-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: var(--text-light);
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: var(--transition);
                }
                .notification-close:hover {
                    background: var(--border-light);
                }
            `;

    document.head.appendChild(style);
    document.body.appendChild(notification);

    // Auto-fermer après 5 secondes
    setTimeout(() => {
        closeNotification();
    }, 5000);
}

// Fermer la notification
function closeNotification() {
    const notification = document.getElementById('custom-notification');
    if (notification) {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}

// Animation de scroll pour les nouvelles sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('partner-logo')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                } else {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            }
        });
    }, observerOptions);

    // Observer tous les éléments animés
    setTimeout(() => {
        document.querySelectorAll('.specialty-card, .stat-card, .testimonial-card, .partner-logo').forEach(el => {
            observer.observe(el);
        });
    }, 100);
}

// Ajouter des animations CSS supplémentaires
const additionalStyles = `
            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(400px);
                }
            }
            
            .partner-logo:hover {
                transform: translateY(-5px) scale(1.05);
                box-shadow: 0 15px 40px var(--partner-color, var(--primary-color))33;
            }
            
            .footer-comprehensive {
                background: linear-gradient(135deg, var(--secondary-color) 0%, #1e3a52 100%);
            }
        `;

// Injecter les styles supplémentaires
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Charger les spécialités
async function loadSpecialties() {
    try {
        const specialties = STATIC_DATA.specialties;
        specialtiesData = specialties;
        renderSpecialities(specialties);
    } catch (error) {
        console.error('Error loading specialties:', error);
        document.getElementById('specialties-grid').innerHTML = '<p>Unable to load specialties at the moment.</p>';
    }
}

// Afficher les spécialités
function renderSpecialities(specialties) {
    const grid = document.getElementById('specialties-grid');
    grid.innerHTML = specialties.map(specialty => `
                <div class="specialty-card fade-in">
                    <span class="specialty-icon">${specialty.icon}</span>
                    <h3>${specialty.name}</h3>
                    <p>${specialty.description}</p>
                </div>
            `).join('');
}

// Charger les statistiques
async function loadStats() {
    try {
        const stats = STATIC_DATA.stats;
        renderStats(stats);
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Afficher les statistiques
function renderStats(stats) {
    const grid = document.getElementById('stats-grid');
    grid.innerHTML = stats.map((stat, index) => `
                <div class="stat-card ${index === 3 ? 'highlight' : ''} fade-in">
                    <h3>${stat.title}</h3>
                    <p>${stat.description}</p>
                </div>
            `).join('');
}

// Charger les témoignages
async function loadTestimonials() {
    try {
        const testimonials = STATIC_DATA.testimonials;
        testimonialsData = testimonials;
        renderTestimonials(testimonials);
    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}

// Afficher les témoignages
function renderTestimonials(testimonials) {
    const slider = document.getElementById('testimonials-slider');
    slider.innerHTML = testimonials.map(testimonial => `
                <div class="testimonial-card">
                    <div class="testimonial-rating">
                        ${'★'.repeat(testimonial.rating)}
                    </div>
                    <h4>Exceptional Care and Support!</h4>
                    <p class="testimonial-text">"${testimonial.comment}"</p>
                    <div class="testimonial-author">
                        ${testimonial.name} - ${testimonial.role}
                    </div>
                </div>
            `).join('');
}

// Navigation des témoignages
function slideTestimonials(direction) {
    const slider = document.getElementById('testimonials-slider');
    const cardWidth = 320; // largeur d'une carte + gap

    if (direction === 'next') {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialsData.length;
    } else {
        currentTestimonialIndex = currentTestimonialIndex === 0 ? testimonialsData.length - 1 : currentTestimonialIndex - 1;
    }

    slider.scrollTo({
        left: currentTestimonialIndex * cardWidth,
        behavior: 'smooth'
    });
}

// Générer l'alphabet pour la recherche de maladies
function generateAlphabet() {
    const alphabetGrid = document.getElementById('alphabet-grid');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    alphabetGrid.innerHTML = letters.map(letter => `
                <button class="alphabet-btn" onclick="selectLetter('${letter}')" data-letter="${letter}">
                    ${letter}
                </button>
            `).join('');
}

// Sélectionner une lettre pour les maladies
function selectLetter(letter) {
    // Retirer la classe active de tous les boutons
    document.querySelectorAll('.alphabet-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Ajouter la classe active au bouton sélectionné
    document.querySelector(`[data-letter="${letter}"]`).classList.add('active');

    // Simuler la recherche de maladies
    console.log(`Searching diseases starting with ${letter}`);

    // Utiliser les données statiques
    const diseasesByLetter = STATIC_DATA.diseases;

    const diseases = diseasesByLetter[letter] || [`No diseases found for letter ${letter}`];

    // Afficher un tooltip ou une liste des maladies
    showDiseaseTooltip(diseases, letter);
}

// Afficher un tooltip avec les maladies
function showDiseaseTooltip(diseases, letter) {
    // Créer ou mettre à jour un tooltip
    let tooltip = document.getElementById('disease-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'disease-tooltip';
        tooltip.style.cssText = `
                    position: fixed;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 1rem;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    z-index: 1000;
                    max-width: 250px;
                `;
        document.body.appendChild(tooltip);
    }

    tooltip.innerHTML = `
                <h4 style="color: #4a90e2; margin-bottom: 0.5rem;">Diseases starting with "${letter}"</h4>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${diseases.map(disease => `<li style="padding: 0.2rem 0; color: #666;">${disease}</li>`).join('')}
                </ul>
            `;

    // Positionner le tooltip près du bouton cliqué
    const button = document.querySelector(`[data-letter="${letter}"]`);
    const rect = button.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.bottom + 10) + 'px';
    tooltip.style.display = 'block';

    // Cacher le tooltip après 3 secondes
    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 3000);
}

// Recherche de médecin
function searchDoctor() {
    const doctorSelect = document.querySelector('.doctor-search select');
    const nameInput = document.querySelector('.doctor-search input');

    const specialty = doctorSelect.value;
    const name = nameInput.value;

    if (!name.trim()) {
        alert('Please enter a doctor name to search');
        return;
    }

    // Simuler une recherche
    console.log(`Searching for ${specialty}: ${name}`);

    // Afficher un message de confirmation
    const searchBtn = document.querySelector('.doctor-search .search-btn');
    const originalText = searchBtn.innerHTML;
    searchBtn.innerHTML = '✓';
    searchBtn.style.background = '#28a745';

    setTimeout(() => {
        searchBtn.innerHTML = originalText;
        searchBtn.style.background = '#4a90e2';
        alert(`Found 3 doctors matching "${name}" in ${specialty}`);
    }, 1000);
}

// Recherche de maladie
function searchDisease() {
    const input = document.getElementById('disease-search-input');
    const query = input.value.trim();

    if (!query) {
        alert('Please enter a disease name to search');
        return;
    }

    console.log(`Searching for disease: ${query}`);

    // Simuler une recherche
    const searchBtn = document.querySelector('.disease-search-box .search-btn');
    const originalText = searchBtn.innerHTML;
    searchBtn.innerHTML = '✓';
    searchBtn.style.background = '#28a745';

    setTimeout(() => {
        searchBtn.innerHTML = originalText;
        searchBtn.style.background = '#4a90e2';
        alert(`Found information about "${query}"`);
    }, 1000);
}

// Animations au scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec la classe fade-in
    setTimeout(() => {
        document.querySelectorAll('.specialty-card, .stat-card, .testimonial-card').forEach(el => {
            observer.observe(el);
        });
    }, 100);
}

// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Auto-slide pour les témoignages
setInterval(() => {
    if (testimonialsData.length > 0) {
        slideTestimonials('next');
    }
}, 5000);

// Gestion du clic en dehors du tooltip
document.addEventListener('click', (e) => {
    const tooltip = document.getElementById('disease-tooltip');
    if (tooltip && !e.target.closest('.alphabet-btn') && !e.target.closest('#disease-tooltip')) {
        tooltip.style.display = 'none';
    }
});

// Recherche en temps réel pour les maladies
document.getElementById('disease-search-input')?.addEventListener('input', function (e) {
    const query = e.target.value.toLowerCase().trim();
    if (query.length > 2) {
        // Simuler une recherche en temps réel
        console.log(`Real-time search for: ${query}`);

        // Exemple de suggestions
        const suggestions = [
            'Diabetes', 'Depression', 'Dermatitis',
            'Heart Disease', 'Hypertension', 'Hepatitis',
            'Cancer', 'Cardiac Disease', 'Cholesterol'
        ].filter(disease => disease.toLowerCase().includes(query));

        if (suggestions.length > 0) {
            console.log('Suggestions:', suggestions);
        }
    }
});

// Gestion responsive du menu mobile
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Ajouter un gestionnaire de redimensionnement pour l'adaptation responsive
window.addEventListener('resize', () => {
    // Réajuster les éléments si nécessaire
    if (window.innerWidth > 768) {
        document.querySelector('.nav-menu')?.classList.remove('active');
    }
});