// ===== MAIN.JS =====

// ===== TOGGLE MOBILE MENU =====
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navList = document.querySelector('.nav-list');
const body = document.body;

mobileMenuToggle.addEventListener('click', () => {
  navList.classList.toggle('active');
  body.classList.toggle('no-scroll');
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// ===== STICKY HEADER =====
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== FORM HANDLING =====
const contactForm = document.querySelector('.contact-form');
const submitBtn = document.querySelector('.submit-btn');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  
  try {
    await fetch(contactForm.getAttribute('action'), {
      method: 'POST',
      body: new URLSearchParams(new FormData(contactForm)),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    // Reset form and show success message
    contactForm.reset();
    showToast('Message sent successfully!', 'success');
  } catch (error) {
    showToast('Error sending message. Please try again.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  }
});

// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ===== CLOSE MOBILE MENU WHEN CLICKING OUTSIDE =====
document.addEventListener('click', (e) => {
  if (!navList.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
    navList.classList.remove('active');
    body.classList.remove('no-scroll');
  }
});

// ===== ANIMATIONS =====
// Add scroll animations here if needed

// ===== INIT =====
function init() {
  // Initialize any other JavaScript features here
}

// ===== RUN ON LOAD =====
window.addEventListener('load', init);
