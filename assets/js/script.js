document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navList.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });document.addEventListener('DOMContentLoaded', function() {
  // Check if device is mobile or tablet
  const isMobileOrTablet = () => {
    return window.innerWidth <= 1024; // Increased breakpoint to include tablets
  };

  // Mobile menu elements
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  const header = document.querySelector('.header');
  
  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    navList.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Add overflow hidden to body when menu is open to prevent scrolling
    if (navList.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  
  // Initialize mobile menu state based on screen size
  const initMobileMenu = () => {
    if (isMobileOrTablet()) {
      // Show the toggle button
      if (menuToggle) menuToggle.style.display = 'block';
      
      // Add mobile class to nav
      navList.classList.add('mobile-nav');
    } else {
      // Hide the toggle button
      if (menuToggle) menuToggle.style.display = 'none';
      
      // Remove mobile class and active states
      navList.classList.remove('mobile-nav', 'active');
      if (menuToggle) menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  };
  
  // Initialize on page load
  initMobileMenu();
  
  // Add click event to menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event bubbling
      toggleMobileMenu();
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navList.classList.contains('active') && 
        !event.target.closest('.nav-list') && 
        !event.target.closest('.mobile-menu-toggle')) {
      toggleMobileMenu();
    }
  });
  
  // Prevent clicks inside the menu from closing it
  navList.addEventListener('click', function(event) {
    event.stopPropagation();
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    initMobileMenu();
  });
  
  // Portfolio filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
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
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (isMobileOrTablet() && navList.classList.contains('active')) {
          toggleMobileMenu();
        }
      }
    });
  });
  
  // Add active class to nav links based on scroll position
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const headerHeight = header ? header.offsetHeight : 0;
    
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          // Remove active class from all nav links
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
          });
          
          // Add active class to current section's nav link
          activeLink.classList.add('active');
        }
      }
    });
    
    // Add shadow to header on scroll
    if (header) {
      if (scrollPosition > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });
});

  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navList.classList.contains('active') && 
        !event.target.closest('.main-nav') && 
        !event.target.closest('.mobile-menu-toggle')) {
      navList.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
  
  // Portfolio filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
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
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navList.classList.contains('active')) {
          navList.classList.remove('active');
          menuToggle.classList.remove('active');
        }
      }
    });
  });
  
  // Add active class to nav links based on scroll position
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
      } else {
        document.querySelector(
