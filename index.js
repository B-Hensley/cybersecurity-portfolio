const navToggleInput = document.getElementById("nav-menu-toggle");
const navToggle = document.getElementById("nav-toggle-label");
const navLinkList = document.querySelector(".nav-links");
const scroller = document.querySelector(".scroller");
const scrollerInner = document.querySelector(".scroller-track");
const navLinks = document.querySelectorAll(".nav-link");

// Toggle navigation menu
navToggleInput.addEventListener('click', () => {
    navToggle.classList.toggle("menu-clicked");
    navLinkList.classList.toggle("links-slide");
});

// Add event listener to close the menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

// Function to handle reduced motion preference
function handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion.matches) {
        // Disable animations and ensure a static layout
        scroller.classList.add("reduce-motion");
        scrollerInner.style.animation = 'none'; // Stop animation entirely
        scrollerInner.style.display = 'flex'; // Flexbox for a static layout
        scrollerInner.style.flexWrap = 'wrap'; // Wrap content into multiple rows

        // Clear duplicated content when motion is reduced
        const duplicatedItems = scrollerInner.querySelectorAll('[aria-hidden="true"]');
        duplicatedItems.forEach(item => item.remove()); // Remove duplicated items
    } else {
        // Enable scrolling animation if reduced motion is not enabled
        scroller.classList.remove("reduce-motion");
        scrollerInner.style.animation = ''; // Re-enable the animation

        // Duplicate content for the scrolling effect
        duplicatedContent();
        duplicatedContent();
    }
}

// Duplicate content function
function duplicatedContent() {
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute('aria-hidden', true); // Hide from screen readers
        scrollerInner.appendChild(duplicatedItem);
    });
}

// Call the handleReducedMotion function on page load to adjust behavior
document.addEventListener('DOMContentLoaded', () => {
    handleReducedMotion();
});

// Optional: Add a listener for changes in the 'prefers-reduced-motion' setting
window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener((e) => {
    if (e.matches) {
        handleReducedMotion();  // Handle reduced motion being turned on
    } else {
        handleReducedMotion();  // Handle reduced motion being turned off
    }
});

// Close the menu on nav link click
function closeMenu() {
    navToggleInput.checked = false; // Uncheck the input (if it's a checkbox input controlling the menu)
    navToggle.classList.remove("menu-clicked");
    navLinkList.classList.remove("links-slide");
}


