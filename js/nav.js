const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("header.site-header nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const open = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}
