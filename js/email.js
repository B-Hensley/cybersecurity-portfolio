// Import EmailJS configuration
import CONFIG from './config.js';

// DOM Element variables
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const messageInput = document.getElementById('message');

// Initialize EmailJS
emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);

// Sanitize input to prevent potential XSS
function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

// Validate input fields
function validateInputs() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // Validate Name
  if (name === '' || name.length > 50) {
    alert('Please enter a valid name (max 50 characters).');
    return false;
  }

  // Validate Email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return false;
  }

  // Validate Message
  if (message === '' || message.length > 500) {
    alert('Please enter a valid message (max 500 characters).');
    return false;
  }

  // Sanitize and return object
  return {
    name: sanitizeInput(name),
    email: sanitizeInput(email),
    message: sanitizeInput(message),
  };
}

// Add event listener to the form
document
  .getElementById('contact-form')
  .addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Validate inputs
    const validInputs = validateInputs();
    if (!validInputs) return;

    // Send the form data using EmailJS
    emailjs
      .send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, {
        name: validInputs.name,
        email: validInputs.email,
        message: validInputs.message,
      })
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        alert('Email sent successfully!');
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
      })
      .catch(function (error) {
        console.log('FAILED...', error);
        alert('Failed to send email. Please try again later.');
      });
  });
