// Portfolio - Reference structure behavior (active nav, smooth scroll, form, observer, parallax)

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const navLinks = document.querySelectorAll(".nav-link");
  const yearEl = document.getElementById("year");

  // Footer year
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile navigation toggle
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      siteNav.classList.toggle("open");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        siteNav.classList.remove("open");
      });
    });

    document.addEventListener("click", (e) => {
      if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove("open");
        siteNav.classList.remove("open");
      }
    });
  }

  // Active nav link highlighting on scroll
  const sections = document.querySelectorAll(".section[id]");

  const highlightNav = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add("active");
      } else if (navLink) {
        navLink.classList.remove("active");
      }
    });
  };

  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
      highlightNav();
    });
  });

  // Smooth scroll with offset
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) {
        return;
      }

      e.preventDefault();
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    });
  });

  // Contact form handling
  if (form && status) {
    form.addEventListener("submit", () => {
      status.textContent = "Sending your message...";
      status.style.color = "#4f9dff";

      setTimeout(() => {
        status.textContent = "";
      }, 5000);
    });
  }

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    ".narrative-block, .timeline-item, .skills-column, .edu-block, .cert-card"
  );

  animateElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Throttled parallax effect for gradient orbs
  let mouseMoveTimeout = null;
  const orbs = document.querySelectorAll(".gradient-orb");

  window.addEventListener("mousemove", (e) => {
    if (mouseMoveTimeout) return;

    mouseMoveTimeout = setTimeout(() => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
      });

      mouseMoveTimeout = null;
    }, 16);
  });
});
