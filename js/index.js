// DOM Elements
const certImgButtons = document.querySelectorAll('.cert-img-button');
const certModals = document.querySelectorAll('.cert-modal');
const scrollerInner = document.getElementById('skills-container');
const cursor = document.querySelector('.blob');
const currentYear = document.getElementById('current-year');
const homeLink = document.getElementById('home-link');
const aboutLink = document.getElementById('about-link');
const contactLink = document.getElementById('contact-link');
const certsLink = document.getElementById('certs-link');
const projectsLink = document.getElementById('projects-link');
const closeModalBtns = document.querySelectorAll('.close-modal-btn');
const navToggle = document.getElementById('nav-toggle');
const navToggleLabel = document.getElementById('nav-toggle-label');

const navLinks = [homeLink, aboutLink, contactLink, certsLink, projectsLink];


// Add event listener to cert images
certImgButtons.forEach((button) => {
  button.addEventListener('click', function () {
    // First, close all other modals
    certModals.forEach((modal) => {
      if (modal !== button.nextElementSibling) {
        modal.classList.remove('modal-active');
      }
    });
    // Then open the clicked button's modal
    const modal = button.nextElementSibling;
    modal.classList.add('modal-active');
  });
});

// Add event listener to close modal windows
closeModalBtns.forEach((button) => {
  button.addEventListener('click', function () {
    const modal = button.parentElement;
    modal.classList.remove('modal-active');
  });
});

// Add event listener to close modal windows if clicked outside of modal
document.addEventListener('click', function (e) {
  if (
    !e.target.closest('.cert-modal') &&
    !e.target.closest('.cert-img-button')
  ) {
    certModals.forEach((modal) => {
      modal.classList.remove('modal-active');
    });
  }
});

// Add event listener to close modal windows if clicking on another cert image

// Move cursor effect
document.addEventListener('mousemove', function (e) {
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
});

// Get active link and add active class
window.addEventListener('scroll', function () {
  // Get all sections
  const sections = document.querySelectorAll('section, main');

  // Get the current scroll position
  const scrollPosition = window.scrollY + 200;

  // Find the current section
  let currentSection = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSection = section.id;
    }
  });

  // Update active link based on current section
  navLinks.forEach((link) => {
    const href = link.getAttribute('href').replace('#', '');
    if (href === currentSection) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  });
});

// Update current year
currentYear.textContent = new Date().getFullYear();

// Duplicate content function for scrolling elements
function duplicatedContent() {
  const scrollerContent = Array.from(scrollerInner.children);

  scrollerContent.forEach((item) => {
    const duplicatedItem = item.cloneNode(true);
    duplicatedItem.setAttribute('aria-hidden', true);
    scrollerInner.appendChild(duplicatedItem);
  });
}

// Duplicate the scrolling content
duplicatedContent();

// Project variables
const projectCards = document.querySelectorAll('.project-card');
const projectsGrid = document.querySelector('.projects-grid');
const gridSizer = document.querySelector('.grid-sizer');
const gutterSizer = document.querySelector('.gutter-sizer');

// Add event listener to project cards to remove overlay if clicked outside of card
// and add overlay if clicked on card
projectCards.forEach((card) => {
  // Add click event to show overlay when clicking on the card
  card.addEventListener('click', (e) => {
    // Only toggle if clicking directly on the card or its children
    if (e.target === card || card.contains(e.target)) {
      card.classList.add('card-overlay-visible');
    }
  });

  // Add click event to document to hide overlay when clicking outside
  document.addEventListener('click', (e) => {
    if (!card.contains(e.target)) {
      card.classList.remove('card-overlay-visible');
    }
  });
});

// Remove grid class from projects-grid at window width of 1300px
const grid = document.querySelector('.projects-grid');
      const masonry = new Masonry('.grid', {
        fitWidth: true, // Center the layout
        gutter: 80, // Space between cards
        itemSelector: '.project-card',
        columnWidth: 320, // Match the card width
        transitionDuration: '0.2s', // Smooth transitions
        resize: true,
        percentPosition: true,
      });

      // Ensure images load before layout
      imagesLoaded(grid, () => {
        masonry.layout();
});

navToggle.addEventListener('click', () => {
  navToggleLabel.classList.toggle('menu-open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.checked = false;
    navToggleLabel.classList.remove('menu-open');
  });
});
