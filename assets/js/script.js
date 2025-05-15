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
        updateThemeIcons(document.body.classList.contains('dark-theme'));
    }
};

// Update theme icons with smooth transitions
const updateThemeIcons = (isDark) => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');
    
    if (isDark) {
        sunIcon.style.opacity = '1';
        moonIcon.style.opacity = '0';
    } else {
        sunIcon.style.opacity = '0';
        moonIcon.style.opacity = '1';
    }
};

// Theme toggle functionality with improved animations
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
        }, 500);

        // Update icons with improved transitions
        updateThemeIcons(isDarkTheme);
    }

    // Dispatch custom event for theme change
    window.dispatchEvent(new CustomEvent('themechange', { detail: { isDark: isDarkTheme } }));
};

// Add theme toggle event listener with improved touch handling
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        let touchStartTime = 0;
        let touchStartX = 0;
        let touchStartY = 0;
        let isTouching = false;
        let hasMoved = false;

        const handleTouchStart = (e) => {
            isTouching = true;
            hasMoved = false;
            touchStartTime = Date.now();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            if (!isTouching) return;
            
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const moveX = Math.abs(touchX - touchStartX);
            const moveY = Math.abs(touchY - touchStartY);
            
            // If moved more than 10px, mark as moved
            if (moveX > 10 || moveY > 10) {
                hasMoved = true;
            }
        };

        const handleTouchEnd = (e) => {
            if (!isTouching) return;
            isTouching = false;

            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;
            
            // Only trigger if it's a quick tap (less than 200ms) and hasn't moved
            if (touchDuration < 200 && !hasMoved) {
                e.preventDefault();
                toggleTheme();
                
                // Add tactile feedback if available
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }
        };

        // Handle both click and touch events
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleTheme();
        });

        themeToggle.addEventListener('touchstart', handleTouchStart, { passive: true });
        themeToggle.addEventListener('touchmove', handleTouchMove, { passive: true });
        themeToggle.addEventListener('touchend', handleTouchEnd, { passive: false });
        
        // Prevent ghost clicks
        themeToggle.addEventListener('touchcancel', () => {
            isTouching = false;
        }, { passive: true });
    }
});

// Initialize theme immediately
document.addEventListener('DOMContentLoaded', initializeTheme);
initializeTheme(); // Also call immediately in case DOM is already loaded

// Listen for system color scheme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('darkTheme') === null) {
        document.body.classList.toggle('dark-theme', e.matches);
        localStorage.setItem('darkTheme', e.matches);
        updateThemeIcons(e.matches);
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
    backDelay: 1000
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
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    // Toggle classes
    mobileMenuToggle.classList.toggle('active');
    navList.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Prevent body scroll when menu is open
    if (document.body.classList.contains('menu-open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
};

// Add event listeners for both click and touch events
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    mobileMenuToggle.addEventListener('touchend', (e) => {
        e.preventDefault();
        toggleMobileMenu(e);
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navList.classList.contains('active') && 
        !e.target.closest('.nav-list') && 
        !e.target.closest('.mobile-menu-toggle')) {
        toggleMobileMenu();
    }
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navList.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Close mobile menu on window resize if open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navList.classList.contains('active')) {
        toggleMobileMenu();
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

// Optimize scroll reveal animation
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1000,
    reset: false,
    mobile: true,
    viewFactor: 0.3
});

// Optimize scroll reveal animations
sr.reveal('.hero-content', { delay: 200 });
sr.reveal('.hero-image', { delay: 300 });
sr.reveal('.section-header', { delay: 200 });
sr.reveal('.skill-category', { interval: 100 });

// Optimize scroll to top functionality
const scrollToTopBtn = document.querySelector('.scroll-to-top');
let lastScrollPosition = 0;
let ticking = false;

const updateScrollButtonAppearance = (scrollPosition) => {
    if (!scrollToTopBtn) return;
    
    // Only update if scrolled more than 100px
    if (Math.abs(scrollPosition - lastScrollPosition) < 100) return;
    
    lastScrollPosition = scrollPosition;
    
    // Simple visibility toggle
    scrollToTopBtn.classList.toggle('visible', scrollPosition > 300);
};

// Use requestAnimationFrame for smooth scrolling
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateScrollButtonAppearance(window.pageYOffset);
            ticking = false;
        });
        ticking = true;
    }
});

// Initialize the scroll button on page load
document.addEventListener('DOMContentLoaded', () => {
    if (scrollToTopBtn) {
        updateScrollButtonAppearance(window.pageYOffset);
    }
});

window.addEventListener('scroll', () => {
    // Add scrolled class to header
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (header) {
        header.classList.toggle('scrolled', scrollPosition > 100);
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    if (isTouchDevice()) {
        scrollToTopBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
} 
