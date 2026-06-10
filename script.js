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
  const activePath = path.endsWith("-checklist.html") ? "checklists.html" : path;

  links.forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === activePath) a.classList.add("is-active");
  });

  // AJAX contact form enhancement for Netlify Forms.
  const contactForm = document.querySelector('form[name="contact"]');

  if (contactForm) {
    const statusEl = contactForm.querySelector(".form-status");
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const submitText = submitBtn ? submitBtn.textContent : "";

    const showStatus = (message, type) => {
      if (!statusEl) return;

      statusEl.textContent = message;
      statusEl.classList.remove("is-success", "is-error");
      statusEl.classList.add(type === "success" ? "is-success" : "is-error");
      statusEl.hidden = false;
    };

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      contactForm.setAttribute("aria-busy", "true");

      try {
        const formData = new FormData(contactForm);
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        });

        if (!response.ok) throw new Error("Form submission failed.");

        contactForm.reset();
        showStatus("Thanks, your message was sent. We’ll get back to you by email.", "success");
      } catch (error) {
        showStatus(
          "Sorry, your message couldn’t be sent. Please try again or email us directly.",
          "error"
        );
      } finally {
        contactForm.removeAttribute("aria-busy");

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitText;
        }
      }
    });
  }
})();
