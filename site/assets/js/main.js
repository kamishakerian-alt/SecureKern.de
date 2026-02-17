// =================================================================
// SecureKern Website - Main JavaScript
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
  
  // -------------------------------------
  // Mobile Navigation Toggle
  // -------------------------------------
  const hamburger = document.querySelector('.nav__hamburger');
  const navMenuContainer = document.querySelector('.nav__menu-container');
  const navLinks = document.querySelectorAll('.nav__link, .nav__dropdown-link');

  if (hamburger && navMenuContainer) {
    hamburger.addEventListener('click', () => {
      // Toggle the 'is-active' class on the hamburger and the menu container
      hamburger.classList.toggle('is-active');
      navMenuContainer.classList.toggle('is-active');
      
      // Toggle body scroll
      if (navMenuContainer.classList.contains('is-active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenuContainer.classList.contains('is-active')) {
        hamburger.classList.remove('is-active');
        navMenuContainer.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    });
  });

  // -------------------------------------
  // Mobile Dropdown Toggle
  // -------------------------------------
  const dropdownToggles = document.querySelectorAll('.nav__item--has-dropdown > .nav__link');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      // On mobile, prevent the default link behavior to show the dropdown
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        const parentItem = toggle.parentElement;
        parentItem.classList.toggle('is-open');
      }
    });
  });

  // -------------------------------------
  // Header Shadow on Scroll
  // -------------------------------------
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

});
