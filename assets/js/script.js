/**
 * Portfolio Website JavaScript
 * Main functionality for interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
  // ===== MOBILE MENU FUNCTIONALITY =====
  const initMobileMenu = () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list') || document.querySelector('header nav ul');
    const header = document.querySelector('.header') || document.querySelector('header');
    
    // Check if we're on a mobile device
    const isMobileOrTablet = () => window.innerWidth <= 1024;
    
    // Toggle menu visibility
    const toggleMenu = (event) => {
      if (event) event.stopPropagation();
      navList.classList.toggle('active');
      if (menuToggle) menuToggle.classList.toggle('active');
      
      // Prevent body scrolling when menu is open
      if (navList.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };
    
    // Set initial state based on screen size
    const updateMenuState = () => {
      if (isMobileOrTablet()) {
        if (menuToggle) menuToggle.style.display = 'block';
        navList.classList.add('mobile-nav');
      } else {
        if (menuToggle) menuToggle.style.display = 'none';
        navList.classList.remove('mobile-nav', 'active');
        if (menuToggle) menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    };
    
    // Initialize
    if (navList && header) {
      updateMenuState();
      
      // Event listeners
      if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
      }
      
      // Close menu when clicking outside
      document.addEventListener('click', (event) => {
        if (navList.classList.contains('active') && 
            !event.target.closest('.nav-list') && 
            !event.target.closest('header nav ul') && 
            !event.target.closest('.mobile-menu-toggle')) {
          toggleMenu();
        }
      });
      
      // Close menu when clicking on a nav link
      const navLinks = navList.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (isMobileOrTablet() && navList.classList.contains('active')) {
            toggleMenu();
          }
        });
      });
      
      // Update on resize
      window.addEventListener('resize', updateMenuState);
    }
  };
  
  // ===== PORTFOLIO FILTERING =====
  const initPortfolioFilters = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0 && portfolioItems.length > 0) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          // Update active button
          filterBtns.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          const filterValue = this.getAttribute('data-filter');
          
          // Filter items with animation
          portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
              item.style.display = 'block';
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              }, 50);
            } else {
              item.style.opacity = '0';
              item.style.transform = 'scale(0.8)';
              setTimeout(() => {
                item.style.display = 'none';
              }, 300);
            }
          });
        });
      });
    }
  };
  
  // ===== SMOOTH SCROLLING =====
  const initSmoothScrolling = () => {
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    const header = document.querySelector('.header') || document.querySelector('header');
    
    scrollLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };
  
  // ===== ACTIVE NAVIGATION HIGHLIGHTING =====
  const initActiveNavHighlighting = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, header nav ul li a');
    const header = document.querySelector('.header') || document.querySelector('header');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const highlightNavigation = () => {
      const scrollPosition = window.scrollY;
      const headerHeight = header ? header.offsetHeight : 0;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
      
      // Handle case when scrolled to the top
      if (scrollPosition < 100) {
        const homeLink = document.querySelector('.nav-link[href="#home"], header nav ul li a[href="#home"]');
        if (homeLink) {
          navLinks.forEach(link => link.classList.remove('active'));
          homeLink.classList.add('active');
        }
      }
      
      // Add shadow to header on scroll
      if (header) {
        if (scrollPosition > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Run once on page load
  };
  
  // ===== FORM VALIDATION =====
  const initFormValidation = () => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            
            // Add error message if it doesn't exist
            let errorMsg = field.parentNode.querySelector('.error-message');
            if (!errorMsg) {
              errorMsg = document.createElement('div');
              errorMsg.className = 'error-message';
              errorMsg.textContent = 'This field is required';
              field.parentNode.appendChild(errorMsg);
            }
          } else {
            field.classList.remove('error');
            const errorMsg = field.parentNode.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
          }
        });
        
        if (!isValid) {
          e.preventDefault();
        }
      });
      
      // Live validation as user types
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('input', function() {
          if (this.hasAttribute('required') && this.value.trim()) {
            this.classList.remove('error');
            const errorMsg = this.parentNode.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
          }
        });
      });
    });
  };
  
  // ===== ANIMATIONS =====
  const initAnimations = () => {
    // Simple reveal animation for sections
    const revealElements = document.querySelectorAll('.section');
    
    const revealOnScroll = () => {
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.classList.add('revealed');
        }
      });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Add the revealed class to all sections initially visible
    setTimeout(revealOnScroll, 100);
  };
  
  // ===== INITIALIZE ALL FUNCTIONALITY =====
  initMobileMenu();
  initPortfolioFilters();
  initSmoothScrolling();
  initActiveNavHighlighting();
  initFormValidation();
  initAnimations();
});
