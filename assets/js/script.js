// Theme initialization and management
const initializeTheme = () => {
    const savedTheme = localStorage.getItem('darkTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme based on localStorage or system preference
    if (savedTheme !== null) {
        document.body.classList.toggle('dark-theme', savedTheme === 'true');
    } else if (prefersDark) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('darkTheme', 'true');
    }

    // Update theme toggle button state
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', document.body.classList.contains('dark-theme'));
    }
};

// Initialize theme immediately
document.addEventListener('DOMContentLoaded', initializeTheme);
initializeTheme(); // Also call immediately in case DOM is already loaded

// Theme toggle functionality
const toggleTheme = () => {
    const isDarkTheme = document.body.classList.toggle('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
    
    // Update button state and add animation class
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', isDarkTheme);
        
        // Add animation feedback
        themeToggle.classList.add('theme-toggle-active');
        setTimeout(() => {
            themeToggle.classList.remove('theme-toggle-active');
        }, 300);

        // Update icons
        const sunIcon = themeToggle.querySelector('.fa-sun');
        const moonIcon = themeToggle.querySelector('.fa-moon');
        
        if (isDarkTheme) {
            sunIcon.style.transform = 'rotate(180deg) scale(1)';
            sunIcon.style.opacity = '1';
            moonIcon.style.transform = 'rotate(-180deg) scale(0)';
            moonIcon.style.opacity = '0';
        } else {
            sunIcon.style.transform = 'rotate(-180deg) scale(0)';
            sunIcon.style.opacity = '0';
            moonIcon.style.transform = 'rotate(180deg) scale(1)';
            moonIcon.style.opacity = '1';
        }
    }

    // Dispatch custom event for theme change
    window.dispatchEvent(new CustomEvent('themechange', { detail: { isDark: isDarkTheme } }));
};

// Add theme toggle event listener with improved touch handling
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // Handle both click and touch events
        const handleToggle = (e) => {
            e.preventDefault();
            toggleTheme();
            
            // Add tactile feedback for touch devices
            if (document.body.classList.contains('has-touch')) {
                navigator.vibrate && navigator.vibrate(50);
            }
        };

        themeToggle.addEventListener('click', handleToggle);
        themeToggle.addEventListener('touchend', handleToggle);
        
        // Prevent ghost clicks on touch devices
        themeToggle.addEventListener('touchstart', (e) => {
            e.preventDefault();
        });
    }
});

// Listen for system color scheme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('darkTheme') === null) {
        document.body.classList.toggle('dark-theme', e.matches);
        localStorage.setItem('darkTheme', e.matches);
    }
});

// Enhanced device detection
const detectDevice = () => {
    const ua = navigator.userAgent;
    const width = window.innerWidth;
    
    // Remove any existing device classes
    document.body.classList.remove('is-mobile', 'is-tablet', 'is-laptop', 'is-desktop');
    
    // Device detection based on screen width and user agent
    if (width < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
        document.body.classList.add('is-mobile');
    } else if (width >= 768 && width < 1024) {
        document.body.classList.add('is-tablet');
    } else if (width >= 1024 && width < 1366) {
        document.body.classList.add('is-laptop');
    } else {
        document.body.classList.add('is-desktop');
    }

    // Touch capability detection
    if (('ontouchstart' in window) || 
        (navigator.maxTouchPoints > 0) || 
        (navigator.msMaxTouchPoints > 0)) {
        document.body.classList.add('has-touch');
    } else {
        document.body.classList.add('no-touch');
    }

    // Orientation detection for mobile/tablet
    if (width < 1024) {
        if (window.innerHeight > window.innerWidth) {
            document.body.classList.add('portrait');
            document.body.classList.remove('landscape');
        } else {
            document.body.classList.add('landscape');
            document.body.classList.remove('portrait');
        }
    }
};

// Call device detection on load and resize
window.addEventListener('load', detectDevice);
window.addEventListener('resize', debounce(detectDevice, 250));

// Debounce function to limit resize event calls
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

// Typed.js for typing animation
const typed = new Typed('.typed', {
    strings: ['Data Analyst', 'Machine Learning Engineer', 'Business Analyst', 'WordPress Developer'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
    backDelay: 2000
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
