// Detect mobile/tablet devices
const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
};

// Add touch device class to body if needed
if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}

// Typed.js for typing animation
const typed = new Typed('.typed', {
    strings: ['Data Analyst', 'Machine Learning Engineer', 'Business Analyst'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const nav = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Enhanced mobile menu toggle with touch support
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navList = document.querySelector('.nav-list');
const header = document.querySelector('.header');

const toggleMobileMenu = (event) => {
    event.stopPropagation();
    mobileMenuToggle.classList.toggle('active');
    navList.classList.toggle('active');
    document.body.classList.toggle('menu-open');
};

mobileMenuToggle.addEventListener('click', toggleMobileMenu);
mobileMenuToggle.addEventListener('touchend', toggleMobileMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navList.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        navList.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Portfolio filters functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    const filterPortfolio = (filter) => {
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
                item.style.display = 'block';
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    };

    // Initialize all items to be visible
    filterPortfolio('all');

    // Add click event listeners to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            filterPortfolio(filter);
        });
    });
});

// Scroll reveal animation
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
});

// Scroll reveal animations for different sections
sr.reveal('.hero-content', {});
sr.reveal('.hero-image', { delay: 200 });
sr.reveal('.about-content', { delay: 200 });
sr.reveal('.skills-container', { delay: 200 });
sr.reveal('.portfolio-grid', { delay: 200 });
sr.reveal('.contact-container', { delay: 200 });

// Enhanced theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const toggleTheme = () => {
    document.body.classList.toggle('dark-theme');
    const isDarkTheme = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
};

// Initialize theme based on user preference or system preference
const initializeTheme = () => {
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme !== null) {
        document.body.classList.toggle('dark-theme', savedTheme === 'true');
    } else if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-theme');
    }
};

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}
initializeTheme();

// Scroll to top functionality
const scrollToTopBtn = document.querySelector('.scroll-to-top');
let isScrolling = false;

const toggleScrollToTopButton = () => {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    scrollToTopBtn.classList.toggle('visible', scrollPosition > 300);
};

const scrollToTop = () => {
    if (isScrolling) return;
    
    isScrolling = true;
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Reset isScrolling after animation
    setTimeout(() => {
        isScrolling = false;
    }, 1000);
};

window.addEventListener('scroll', () => {
    toggleScrollToTopButton();
    
    // Add scrolled class to header
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    header.classList.toggle('scrolled', scrollPosition > 100);
});

scrollToTopBtn.addEventListener('click', scrollToTop);
if (isTouchDevice()) {
    scrollToTopBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        scrollToTop();
    });
} 
