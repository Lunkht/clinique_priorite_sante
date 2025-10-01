// Navigation mobile et fonctionnalités communes
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initSmoothScrolling();
    initActiveNavigation();
});

// Initialiser la navigation mobile
function initMobileNavigation() {
    // Créer le bouton hamburger s'il n'existe pas
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!document.querySelector('.hamburger')) {
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        // Insérer le hamburger avant le bouton d'urgence
        const emergencyBtn = document.querySelector('.emergency-btn');
        navContainer.insertBefore(hamburger, emergencyBtn);
        
        // Ajouter l'événement de clic
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Fermer le menu mobile lors du clic sur un lien
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            document.querySelector('.hamburger')?.classList.remove('active');
        });
    });
    
    // Fermer le menu mobile lors du clic en dehors
    document.addEventListener('click', function(e) {
        if (!navContainer.contains(e.target)) {
            navMenu.classList.remove('active');
            document.querySelector('.hamburger')?.classList.remove('active');
        }
    });
}

// Initialiser le défilement fluide
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorer les liens vides ou juste "#"
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Calculer l'offset pour le header fixe
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialiser la navigation active
function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkPage = linkHref.split('#')[0] || 'index.html';
        
        // Retirer toutes les classes active
        link.classList.remove('active');
        
        // Ajouter la classe active au lien correspondant
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === '') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Fonction utilitaire pour créer des notifications
function showNotification(message, type = 'info', duration = 5000) {
    // Supprimer toute notification existante
    const existingNotification = document.getElementById('page-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.id = 'page-notification';
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 350px;
        animation: slideInRight 0.3s ease-out;
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
    `;
    
    document.body.appendChild(notification);
    
    // Auto-supprimer après la durée spécifiée
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
}

// Fonction pour gérer les liens externes
function handleExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Ajouter target="_blank" aux liens externes
            if (!this.hasAttribute('target')) {
                this.setAttribute('target', '_blank');
                this.setAttribute('rel', 'noopener noreferrer');
            }
        });
    });
}

// Fonction pour gérer le scroll du header
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll vers le bas - cacher le header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll vers le haut - montrer le header
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Fonction pour gérer les formulaires
function initFormHandling() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"], input[type="submit"]');
            
            if (submitBtn && !submitBtn.disabled) {
                const originalText = submitBtn.textContent || submitBtn.value;
                
                // Désactiver le bouton et changer le texte
                submitBtn.disabled = true;
                if (submitBtn.textContent !== undefined) {
                    submitBtn.textContent = '⏳ Traitement...';
                } else {
                    submitBtn.value = '⏳ Traitement...';
                }
                
                // Restaurer après 3 secondes si pas de gestion personnalisée
                setTimeout(() => {
                    if (submitBtn.disabled) {
                        submitBtn.disabled = false;
                        if (submitBtn.textContent !== undefined) {
                            submitBtn.textContent = originalText;
                        } else {
                            submitBtn.value = originalText;
                        }
                    }
                }, 3000);
            }
        });
    });
}

// Initialiser toutes les fonctionnalités
document.addEventListener('DOMContentLoaded', function() {
    handleExternalLinks();
    initHeaderScroll();
    initFormHandling();
});

// Fonction utilitaire pour formater les numéros de téléphone
function formatPhoneNumber(phone) {
    // Supprimer tous les caractères non numériques sauf le +
    const cleaned = phone.replace(/[^\d+]/g, '');
    
    // Format pour les numéros guinéens
    if (cleaned.startsWith('+224')) {
        const number = cleaned.substring(4);
        if (number.length === 9) {
            return `+224 ${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6)}`;
        }
    }
    
    return phone;
}

// Fonction pour valider les emails
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fonction pour valider les numéros de téléphone guinéens
function isValidGuineanPhone(phone) {
    const cleaned = phone.replace(/[^\d+]/g, '');
    return cleaned.startsWith('+224') && cleaned.length === 13;
}

// Export des fonctions utilitaires pour utilisation dans d'autres scripts
window.NavigationUtils = {
    showNotification,
    formatPhoneNumber,
    isValidEmail,
    isValidGuineanPhone
};