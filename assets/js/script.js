document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navList.classList.toggle('active');
      menuToggle.classList.toggle('active');
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
