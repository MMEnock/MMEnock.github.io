// Language handling
let currentLang = localStorage.getItem('preferredLanguage') || navigator.language.split('-')[0] || 'en';

function changeLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('preferredLanguage', lang);
    updateContent();
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
    document.querySelector('meta[name="description"]').setAttribute('content', 
        currentLang === 'de' 
            ? 'Erfahrener Datenanalyst und Business Intelligence Entwickler mit Expertise in Datenvisualisierung, Analyse und Business Intelligence Lösungen.'
            : 'Experienced Data Analyst and Business Intelligence Developer with expertise in data visualization, analysis, and business intelligence solutions.'
    );
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