const navToggleInput = document.getElementById("nav-menu-toggle");
const navToggle = document.getElementById("nav-toggle-label");
const navLinkList = document.querySelector(".nav-links");
const scroller = document.querySelector(".scroller");
const scrollerInner = document.querySelector(".scroller-track");
const navLinks = document.querySelectorAll(".nav-link");
navToggleInput.addEventListener("click", () => {
    navToggle.classList.toggle("menu-clicked");
    navLinkList.classList.toggle("links-slide");
});
navLinks.forEach(() => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});
function handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) {
        scroller.classList.add("reduce-motion");
        scrollerInner.style.animation = "none";
        scrollerInner.style.display = "flex";
        scrollerInner.style.flexWrap = "wrap";
        const duplicatedItems = scrollerInner.querySelectorAll('[aria-hidden="true"]');
        duplicatedItems.forEach((item) => item.remove());
    } else {
        scroller.classList.remove("reduce-motion");
        scrollerInner.style.animation = "";
        duplicatedContent();
    }
}
function duplicatedContent() {
    const scrollerContent = Array.from(scrollerInner.children);
    scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(!0);
        duplicatedItem.setAttribute("aria-hidden", !0);
        scrollerInner.appendChild(duplicatedItem);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    handleReducedMotion();
});
window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener((e) => {
    if (e.matches) {
        handleReducedMotion();
    } else {
        handleReducedMotion();
    }
});
function closeMenu() {
    navToggleInput.checked = !1;
    navToggle.classList.remove("menu-clicked");
    navLinkList.classList.remove("links-slide");
}