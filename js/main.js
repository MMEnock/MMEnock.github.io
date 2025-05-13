// Language handling
let currentLang = localStorage.getItem('preferredLanguage') || 
                 (window.location.pathname.startsWith('/de/') ? 'de' : 
                 navigator.language.split('-')[0] || 'en');

function changeLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('preferredLanguage', lang);
    
    // Update URL if needed
    const currentPath = window.location.pathname;
    if (lang === 'de' && !currentPath.startsWith('/de/')) {
        window.location.pathname = '/de' + currentPath;
    } else if (lang === 'en' && currentPath.startsWith('/de/')) {
        window.location.pathname = currentPath.replace('/de/', '/');
    } else {
        updateContent();
    }
}

function updateContent() {
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
                ? 'Erfahrener Datenanalyst und Business Intelligence Entwickler mit Expertise in Datenvisualisierung, Analyse und Business Intelligence Lösungen.'
                : 'Experienced Data Analyst and Business Intelligence Developer with expertise in data visualization, analysis, and business intelligence solutions.'
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
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set the language selector to the current language
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = currentLang;
    }
    updateContent();
}); 