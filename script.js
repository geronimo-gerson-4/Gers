/* ==========================================================
   Portfolio interactivity
   1. Hamburger menu (mobile navigation)
   2. Dark / light mode toggle (remembers your choice)
   ========================================================== */

// ---------- Element references ----------
const navToggle = document.getElementById("navToggle");     // hamburger button
const navLinks = document.getElementById("navLinks");       // list of links
const themeToggle = document.getElementById("themeToggle"); // theme button
const root = document.documentElement;                      // <html> element

/* ---------- 1. Hamburger menu ---------- */

// Opens or closes the mobile menu and updates the aria attribute
function toggleMenu() {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

// Closes the menu (used after a link is clicked)
function closeMenu() {
  navLinks.classList.remove("open");
  navToggle.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", toggleMenu);

// Close the menu when any navigation link is clicked
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

/* ---------- 2. Dark / light mode ---------- */

// Applies a theme ("light" or "dark") to the page and updates the button text
function applyTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
    themeToggle.textContent = "Light mode";
    themeToggle.setAttribute("aria-label", "Switch to light mode");
  } else {
    root.removeAttribute("data-theme");
    themeToggle.textContent = "Dark mode";
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
  }
}

// Reads the saved theme, or falls back to the visitor's system setting
function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) {
    return saved;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Switches between themes and saves the choice in the browser
function toggleTheme() {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
}

themeToggle.addEventListener("click", toggleTheme);

// Set the theme as soon as the page loads
applyTheme(getInitialTheme());
