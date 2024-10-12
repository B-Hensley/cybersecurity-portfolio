const scroller = document.querySelector(".scroller");
const scrollerInner = document.querySelector(".scroller-track");

// Function to handle reduced motion preference
function handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion.matches) {
        // Disable animations for reduced motion
        scroller.classList.add("reduce-motion");
        scrollerInner.style.animation = 'none'; // Stop animation entirely
        scrollerInner.style.display = 'flex'; // Static layout
        scrollerInner.style.flexWrap = 'wrap'; // Wrap content in multiple rows
    } else {
        // Enable scrolling animation when reduced motion is off
        scroller.classList.remove("reduce-motion");
        scrollerInner.style.animation = ''; // Re-enable animation
        duplicatedContent(); // Call function to duplicate content for smooth scrolling
    }
}

// Function to duplicate content in the scroller for smooth looping
function duplicatedContent() {
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute('aria-hidden', true); // Hide from screen readers
        scrollerInner.appendChild(duplicatedItem);
    });
}

// Call the handleReducedMotion function on page load to adjust behavior
document.addEventListener('DOMContentLoaded', handleReducedMotion);

// Listen for changes in the 'prefers-reduced-motion' setting
window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener((e) => {
    handleReducedMotion();  // Re-run reduced motion handling if setting changes
});
