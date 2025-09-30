// Language handling
let currentLang = localStorage.getItem('preferredLanguage') || 
                 (window.location.pathname.startsWith('/de/') ? 'de' : 
                 navigator.language.split('-')[0] || 'en');

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
        
        // Define URL mappings for different languages
        const urlMappings = {
            'de': {
                'resume.html': 'lebenslauf.html',
                'portfolio.html': 'portfolio.html',
                'index.html': 'index.html'
            },
            'en': {
                'lebenslauf.html': 'resume.html',
                'portfolio.html': 'portfolio.html',
                'index.html': 'index.html'
            }
        };
        
        if (lang === 'de' && !currentPath.startsWith('/de/')) {
            // Map to German URLs
            const fileName = currentPath.split('/').pop() || 'index.html';
            const mappedFile = urlMappings.de[fileName] || fileName;
            const newPath = '/' + mappedFile;
            window.location.href = baseUrl + newPath;
        } else if (lang === 'en' && currentPath.startsWith('/de/')) {
            // Map from German URLs to English URLs
            const fileName = currentPath.split('/').pop() || 'index.html';
            const mappedFile = urlMappings.en[fileName] || fileName;
            const newPath = '/' + mappedFile;
            window.location.href = baseUrl + newPath;
        } else if (lang === 'en' && currentPath.includes('lebenslauf.html')) {
            // Handle direct lebenslauf.html to resume.html mapping
            window.location.href = baseUrl + '/resume.html';
        } else if (lang === 'de' && currentPath.includes('resume.html')) {
            // Handle direct resume.html to lebenslauf.html mapping
            window.location.href = baseUrl + '/lebenslauf.html';
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