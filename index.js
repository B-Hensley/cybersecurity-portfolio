import CONFIG from "./config.js";
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const messageInput = document.getElementById('message');

const scrollerInner = document.getElementById("skills-container");
var cursor = document.querySelector('.blob');

emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY); 

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

// Duplicate content function
function duplicatedContent() {
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute('aria-hidden', true); 
        scrollerInner.appendChild(duplicatedItem);
    });
}

// Add event listener to the form
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Send the form data using EmailJS
  emailjs.sendForm(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, this)
      .then(function (response) {
          console.log("SUCCESS!", response.status, response.text);
          alert("Email sent successfully!");
          nameInput.value = '';
          emailInput.value = '';
          messageInput.value = '';
      })
      .catch(function (error) {
          console.log("FAILED...", error);
          alert("Failed to send email. Please try again later.");
      });
});

duplicatedContent();