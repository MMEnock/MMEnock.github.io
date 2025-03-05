// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// DOM Elements
const header = document.querySelector('.header');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const portfolioFilters = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const sections = document.querySelectorAll('section[id]');

// Header Scroll Effect
const headerScroll = () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

// Mobile Menu Toggle
const toggleMobileMenu = () => {
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    navList.classList.toggle('active');
    
    // Animate hamburger icon
    const hamburger = document.querySelector('.hamburger');
    hamburger.classList.toggle('active');
};

// Close mobile menu when clicking outside
const closeMobileMenu = (e) => {
    if (!navList.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navList.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.querySelector('.hamburger').classList.remove('active');
    }
};

// Smooth scroll for navigation links
const smoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu after clicking
        if (navList.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
};

// Active navigation link on scroll
const activeNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
};

// Portfolio Filter
const filterPortfolio = (e) => {
    const filter = e.currentTarget.getAttribute('data-filter');
    
    // Update active filter button
    portfolioFilters.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        }
    });

    // Filter portfolio items with animation
    portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
            item.style.display = 'none';
        }
    });
};

// Skill Bars Animation
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('aria-valuenow');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = `${level}%`;
        }, 100);
    });
};

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        
        try {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Notification System
const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
};

// Intersection Observer for Skill Bars
const skillSection = document.querySelector('.skills-section');
if (skillSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillSection);
}

// Event Listeners
window.addEventListener('scroll', () => {
    headerScroll();
    activeNavLink();
});

mobileMenuToggle.addEventListener('click', toggleMobileMenu);
document.addEventListener('click', closeMobileMenu);

navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
});

portfolioFilters.forEach(filter => {
    filter.addEventListener('click', filterPortfolio);
});

// Initialize tooltips for portfolio items
const initTooltips = () => {
    portfolioItems.forEach(item => {
        const links = item.querySelectorAll('.portfolio-link');
        links.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = e.currentTarget.getAttribute('aria-label');
                e.currentTarget.appendChild(tooltip);
            });

            link.addEventListener('mouseleave', () => {
                const tooltip = link.querySelector('.tooltip');
                if (tooltip) tooltip.remove();
            });
        });
    });
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initTooltips();
    headerScroll();
    activeNavLink();
}); 
