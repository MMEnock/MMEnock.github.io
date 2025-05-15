// Language handling
let currentLang = localStorage.getItem('preferredLanguage') || 
                 (window.location.pathname.startsWith('/de/') ? 'de' : 
                 navigator.language.split('-')[0] || 'en');

// Theme handling
function toggleTheme() {
    const isDarkTheme = document.body.classList.toggle('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
    
    // Update theme toggle button icons
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const sunIcon = themeToggle.querySelector('.fa-sun');
        const moonIcon = themeToggle.querySelector('.fa-moon');
        if (sunIcon && moonIcon) {
            sunIcon.style.opacity = isDarkTheme ? '1' : '0';
            moonIcon.style.opacity = isDarkTheme ? '0' : '1';
        }
    }
}

// Initialize theme on page load
function initTheme() {
    const savedTheme = localStorage.getItem('darkTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme !== null) {
        document.body.classList.toggle('dark-theme', savedTheme === 'true');
    } else if (prefersDark) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('darkTheme', 'true');
    }

    // Update theme toggle button state
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        const sunIcon = themeToggle.querySelector('.fa-sun');
        const moonIcon = themeToggle.querySelector('.fa-moon');
        if (sunIcon && moonIcon) {
            sunIcon.style.opacity = isDarkTheme ? '1' : '0';
            moonIcon.style.opacity = isDarkTheme ? '0' : '1';
        }
    }
}

// Initialize Typed.js
function initTyped() {
    try {
        const typedElement = document.querySelector('.typed');
        if (!typedElement) {
            console.error('Typed.js element not found');
            return;
        }

        if (typeof Typed === 'undefined') {
            console.error('Typed.js library not loaded');
            return;
        }

        const options = {
            strings: ["Data Analyst", "Machine Learning Engineer", "Business Analyst"],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            onComplete: (self) => {
                console.log('Typed.js animation completed');
            },
            onStringTyped: (arrayPos, self) => {
                console.log('Typed.js string typed:', arrayPos);
            }
        };

        console.log('Initializing Typed.js with options:', options);
        new Typed(typedElement, options);
    } catch (error) {
        console.error('Error initializing Typed.js:', error);
    }
}

// Initialize ScrollReveal
function initScrollReveal() {
    try {
        if (typeof ScrollReveal === 'undefined') {
            console.error('ScrollReveal library not loaded');
            return;
        }

        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 200,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            reset: false,
            beforeReveal: (el) => {
                console.log('Element about to be revealed:', el);
            },
            afterReveal: (el) => {
                console.log('Element revealed:', el);
            }
        });

        // Hero section
        sr.reveal('.hero-content', { delay: 200 });
        sr.reveal('.hero-image', { delay: 400 });

        // Skills section
        sr.reveal('.section-header', { delay: 200 });
        sr.reveal('.skill-category', { interval: 200 });

        // Portfolio section
        sr.reveal('.portfolio-item', { interval: 200 });

        // Contact section
        sr.reveal('.contact-content', { delay: 200 });

        console.log('ScrollReveal initialized successfully');
    } catch (error) {
        console.error('Error initializing ScrollReveal:', error);
    }
}

function changeLanguage(lang) {
    try {
        currentLang = lang;
        document.documentElement.lang = lang;
        localStorage.setItem('preferredLanguage', lang);
        
        // Update URL if needed
        const currentPath = window.location.pathname;
        const baseUrl = window.location.origin;
        
        if (lang === 'de' && !currentPath.startsWith('/de/')) {
            // Create a new URL with /de/ prefix
            const newPath = '/de' + currentPath;
            window.location.href = baseUrl + newPath;
        } else if (lang === 'en' && currentPath.startsWith('/de/')) {
            // Remove /de/ prefix
            const newPath = currentPath.replace('/de/', '/');
            window.location.href = baseUrl + newPath;
        } else {
            updateContent();
        }
    } catch (error) {
        console.error('Error changing language:', error);
    }
}

function updateContent() {
    try {
        document.querySelectorAll('[data-lang]').forEach(element => {
            const keys = element.getAttribute('data-lang').split('.');
            let value = languages[currentLang];
            for (const key of keys) {
                value = value[key];
            }
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        });

        // Update meta tags for SEO
        const metaDescription = document.querySelector('meta[name="description"]');
        const metaTitle = document.querySelector('title');
        
        if (metaDescription) {
            metaDescription.setAttribute('content', 
                currentLang === 'de' 
                    ? 'Erfahrener Datenanalyst und ML-Ingenieur mit Expertise in Datenvisualisierung und Analyse.'
                    : 'Experienced Data Analyst and Machine Learning Engineer with expertise in data visualization and analysis.'
            );
        }

        if (metaTitle) {
            metaTitle.textContent = currentLang === 'de'
                ? 'Mugisha Enock - Datenanalyst & ML-Ingenieur | Portfolio'
                : 'Mugisha Enock - Data Analyst & ML Engineer | Portfolio';
        }

        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        
        if (ogTitle) {
            ogTitle.setAttribute('content', metaTitle.textContent);
        }
        if (ogDescription) {
            ogDescription.setAttribute('content', metaDescription.getAttribute('content'));
        }

        // Update canonical URL
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
            const baseUrl = window.location.origin;
            const path = window.location.pathname;
            const newPath = currentLang === 'de' ? '/de' + path : path.replace('/de/', '/');
            canonicalLink.setAttribute('href', baseUrl + newPath);
        }

        // Reinitialize Typed.js with new language
        initTyped();
    } catch (error) {
        console.error('Error updating content:', error);
    }
}

// Initialize language and animations on page load
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('DOM Content Loaded');
        
        // Set the language selector to the current language
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.value = currentLang;
        }
        
        // Initialize theme
        initTheme();
        
        // Add theme toggle event listener
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        
        // Initialize animations
        console.log('Initializing animations...');
        initTyped();
        initScrollReveal();
        
        // Update content
        console.log('Updating content...');
        updateContent();
        
        console.log('Initialization complete');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}); 