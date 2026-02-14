// Language handling
let currentLang = (() => {
    // First, check if we're on a German-specific page
    if (window.location.pathname.includes('lebenslauf.html') || 
        window.location.pathname.includes('/de/')) {
        return 'de';
    }
    
    // Then check localStorage for user preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        return savedLang;
    }
    
    // Default to English for English pages
    return 'en';
})();

// Single Typed instance so we can destroy before reinit (e.g. on language change)
let typedInstance = null;

// Initialize Typed.js for "I'm a [Data Analyst | Machine Learning Engineer | Business Analyst]"
// Works on all viewports; respects reduced-motion; fallback static text if Typed.js fails to load
function initTyped() {
    try {
        const typedElement = document.querySelector('.typed');
        if (!typedElement) return;

        const strings = (typeof languages !== 'undefined' && languages[currentLang]?.home?.typedText)
            ? languages[currentLang].home.typedText
            : ['Data Analyst', 'Machine Learning Engineer', 'Business Analyst'];
        const firstString = strings[0];

        if (typedInstance && typeof typedInstance.destroy === 'function') {
            typedInstance.destroy();
            typedInstance = null;
        }

        // Respect user preference for reduced motion (accessibility + some devices)
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            typedElement.textContent = firstString;
            return;
        }

        if (typeof Typed === 'undefined') {
            typedElement.textContent = firstString;
            return;
        }

        typedInstance = new Typed(typedElement, {
            strings: strings,
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    } catch (error) {
        const el = document.querySelector('.typed');
        if (el) el.textContent = (typeof languages !== 'undefined' && languages[currentLang]?.home?.typedText?.[0]) || 'Data Analyst';
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
                'portfolio.html': '/de/portfolio.html',
                'index.html': 'index.html'
            },
            'en': {
                'lebenslauf.html': 'resume.html',
                'portfolio.html': 'portfolio.html',
                'index.html': 'index.html'
            }
        };
        
        if (lang === 'de' && !currentPath.includes('lebenslauf.html') && !currentPath.includes('/de/')) {
            // Map to German URLs
            const fileName = currentPath.split('/').pop() || 'index.html';
            const mappedFile = urlMappings.de[fileName] || fileName;
            const newPath = mappedFile.startsWith('/') ? mappedFile : '/' + mappedFile;
            window.location.href = baseUrl + newPath;
        } else if (lang === 'en' && currentPath.includes('lebenslauf.html')) {
            // Handle direct lebenslauf.html to resume.html mapping
            window.location.href = baseUrl + '/resume.html';
        } else if (lang === 'de' && currentPath.includes('resume.html')) {
            // Handle direct resume.html to lebenslauf.html mapping
            window.location.href = baseUrl + '/lebenslauf.html';
        } else if (lang === 'en' && currentPath.includes('/de/portfolio.html')) {
            // Handle German portfolio to English portfolio mapping
            window.location.href = baseUrl + '/portfolio.html';
        } else if (lang === 'de' && currentPath.includes('portfolio.html') && !currentPath.includes('/de/')) {
            // Handle English portfolio to German portfolio mapping
            window.location.href = baseUrl + '/de/portfolio.html';
        } else {
            updateContent();
        }
    } catch (error) {
        console.error('Error changing language:', error);
    }
}

function updateContent() {
    try {
        if (typeof languages === 'undefined' || !languages[currentLang]) return;
        document.querySelectorAll('[data-lang]').forEach(element => {
            const keys = element.getAttribute('data-lang').split('.');
            let value = languages[currentLang];
            for (const key of keys) {
                if (value == null) break;
                value = value[key];
            }
            if (value == null || typeof value !== 'string') return;
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
            // No need to modify path since we're using root-level URLs now
            canonicalLink.setAttribute('href', baseUrl + path);
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
        
        // Ensure the page language attribute matches the current language
        document.documentElement.lang = currentLang;
        
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