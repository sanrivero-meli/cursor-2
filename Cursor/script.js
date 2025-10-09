// Animated Words Rotation
class AnimatedWords {
    constructor() {
        this.words = document.querySelectorAll('.word');
        this.currentIndex = 0;
        this.init();
    }

    init() {
        if (this.words.length === 0) return;
        
        // Start the rotation
        setInterval(() => {
            this.rotateWords();
        }, 3000);
    }

    rotateWords() {
        // Remove active class from current word
        this.words[this.currentIndex].classList.remove('active');
        
        // Move to next word
        this.currentIndex = (this.currentIndex + 1) % this.words.length;
        
        // Add active class to new word
        this.words[this.currentIndex].classList.add('active');
    }
}

// FAQ Accordion
class Accordion {
    constructor() {
        this.accordionItems = document.querySelectorAll('.accordion-item');
        this.init();
    }

    init() {
        this.accordionItems.forEach((item, index) => {
            const header = item.querySelector('.accordion-header');
            
            header.addEventListener('click', () => {
                this.toggleAccordion(item);
            });
        });
    }

    toggleAccordion(item) {
        const isActive = item.classList.contains('active');
        
        // Close all accordions
        this.accordionItems.forEach(accordionItem => {
            accordionItem.classList.remove('active');
        });
        
        // If the clicked item wasn't active, open it
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// Smooth Scrolling for CTA buttons
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const ctaButtons = document.querySelectorAll('.cta-button');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCTAClick();
            });
        });

        // Handle card clicks
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('click', () => {
                this.handleProductCardClick(card);
            });
        });
    }

    handleCTAClick() {
        // Simulate opening credit application
        this.showNotification('¡Redirigiendo a la solicitud de crédito!', 'success');
        
        // In a real application, this would redirect to the credit application form
        setTimeout(() => {
            console.log('Redirecting to credit application...');
        }, 1500);
    }

    handleProductCardClick(card) {
        const productBadge = card.querySelector('.product-badge');
        const productName = productBadge ? productBadge.textContent : 'Producto';
        
        this.showNotification(`Más información sobre ${productName}`, 'info');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            backgroundColor: type === 'success' ? '#4CAF50' : '#2196F3',
            color: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            fontSize: '14px',
            fontWeight: '600'
        });
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Intersection Observer for animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.card, .product-card, .section-title, .hero-title, .phone-mockup'
        );

        animatedElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }
}

// Header scroll effect
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScrollTop = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            this.header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            this.header.style.backdropFilter = 'blur(10px)';
        } else {
            this.header.style.backgroundColor = 'white';
            this.header.style.backdropFilter = 'none';
        }
        
        this.lastScrollTop = scrollTop;
    }
}

// Steps interaction
class StepsInteraction {
    constructor() {
        this.tabs = document.querySelectorAll('.tab');
        this.currentStep = 0;
        this.init();
    }

    init() {
        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                this.setActiveStep(index);
            });
        });

        // Auto-advance steps
        setInterval(() => {
            this.autoAdvanceStep();
        }, 4000);
    }

    setActiveStep(index) {
        // Remove active class from all tabs
        this.tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // Add active class to selected tab
        this.tabs[index].classList.add('active');
        this.currentStep = index;

        // Update step info
        this.updateStepInfo(index);
    }

    autoAdvanceStep() {
        const nextStep = (this.currentStep + 1) % this.tabs.length;
        this.setActiveStep(nextStep);
    }

    updateStepInfo(index) {
        const stepInfo = document.querySelector('.step-info h4');
        const steps = [
            '1. Ingresa un monto',
            '2. Elige el plazo',
            '3. Recibe el dinero'
        ];

        if (stepInfo && steps[index]) {
            stepInfo.textContent = steps[index];
        }
    }
}

// Mobile menu toggle
class MobileMenu {
    constructor() {
        this.init();
    }

    init() {
        // Create mobile menu button
        const headerContainer = document.querySelector('.header-container');
        const nav = document.querySelector('.header-nav');
        
        if (window.innerWidth <= 768) {
            this.createMobileMenuButton(headerContainer, nav);
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                this.createMobileMenuButton(headerContainer, nav);
            } else {
                this.removeMobileMenuButton();
            }
        });
    }

    createMobileMenuButton(headerContainer, nav) {
        // Check if button already exists
        if (document.querySelector('.mobile-menu-button')) return;

        const button = document.createElement('button');
        button.className = 'mobile-menu-button';
        button.innerHTML = '☰';
        
        Object.assign(button.style, {
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px',
            display: 'block'
        });

        button.addEventListener('click', () => {
            nav.classList.toggle('mobile-nav-open');
        });

        headerContainer.appendChild(button);
    }

    removeMobileMenuButton() {
        const button = document.querySelector('.mobile-menu-button');
        if (button) {
            button.remove();
        }
    }
}

// Performance optimization - Lazy loading for images
class LazyLoading {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all interactive components
    new AnimatedWords();
    new Accordion();
    new SmoothScroll();
    new ScrollAnimations();
    new HeaderScroll();
    new StepsInteraction();
    new MobileMenu();
    new LazyLoading();

    // Add animation styles
    const animationStyles = `
        <style>
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .animate-on-scroll.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .mobile-nav-open {
                display: flex !important;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 20px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                z-index: 1000;
            }
            
            @media (max-width: 768px) {
                .header-nav {
                    display: none;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', animationStyles);
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Remove any loading indicators
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }
    });
});

// Utility functions
const utils = {
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format currency
    formatCurrency: (amount, currency = '$') => {
        return `${currency} ${amount.toLocaleString()}`;
    }
};

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AnimatedWords,
        Accordion,
        SmoothScroll,
        ScrollAnimations,
        HeaderScroll,
        StepsInteraction,
        MobileMenu,
        LazyLoading,
        utils
    };
}
