// Break Makers — simple UI helpers

(function () {
  // Set footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const toggleBtn = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  if (toggleBtn && nav) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
      toggleBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    // Close menu when a link is clicked (mobile)
    nav.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.matches("a.nav-link")) {
        nav.classList.remove("is-open");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.setAttribute("aria-label", "Open menu");
      }
    });
  }

  // Active nav link highlighting (works for multi-page site)
  const links = Array.from(document.querySelectorAll(".nav-link"));
  const path = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

  links.forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("is-active");
  });
})();
