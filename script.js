/**
 * PORTAFOLIO ERICK ARIAS - JAVASCRIPT PRINCIPAL
 * Animaciones: Typewriter, Spotlight Glow, Count-Up, Scroll Reveal, Filtros y Formulario
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initProfileVideo();
  initTypewriter();
  initSpotlightGlow();
  initCountUp();
  initScrollAnimations();
  initProjectFilter();
  initContactForm();
  initBackToTop();
});

/* 1. Video de Perfil en Movimiento (Autoplay & Loop) */
function initProfileVideo() {
  const video = document.getElementById("profileMedia");
  if (!video) return;

  // Asegurar reproducción automática silenciada
  video.muted = true;
  video.playsInline = true;

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Si el navegador bloquea autoplay, se activa con el primer scroll o click
      const startPlay = () => {
        video.play();
        window.removeEventListener("click", startPlay);
        window.removeEventListener("scroll", startPlay);
      };
      window.addEventListener("click", startPlay, { once: true });
      window.addEventListener("scroll", startPlay, { once: true });
    });
  }

  // Permitir pausar/reanudar haciendo clic en el video
  video.addEventListener("click", () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
}

/* 1. Navegación Móvil y Navbar con Scroll */
function initNavigation() {
  const hamburger = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("open");
      });
    });
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });
}

/* 2. Efecto Mecanografiado Dinámico (Typewriter Effect) */
function initTypewriter() {
  const el = document.getElementById("typewriterText");
  if (!el) return;

  const phrases = [
    "soluciones tecnológicas para el fútbol y torneos.",
    "dashboards y analítica en Growth Marketing.",
    "plataformas web Full Stack y software a medida.",
    "ecosistemas digitales con Futea Sports Tech."
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      el.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pausa al terminar de escribir la frase
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      // Pasar a la siguiente frase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* 3. Efecto Spotlight (Iluminación que sigue al Cursor en las Tarjetas) */
function initSpotlightGlow() {
  const cards = document.querySelectorAll(".spotlight-card");
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

/* 4. Contadores Numéricos Animados (Count-Up) */
function initCountUp() {
  const counters = document.querySelectorAll(".count-up");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-target"), 10) || 0;
          let current = 0;
          const step = Math.ceil(target / 45) || 1;
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              el.textContent = target;
              clearInterval(interval);
            } else {
              el.textContent = current;
            }
          }, 30);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.2 }
  );

  counters.forEach((c) => observer.observe(c));
}

/* 5. Animaciones de Entrada con Scroll (Reveal) */
function initScrollAnimations() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* 6. Filtro Interactivo de Proyectos */
function initProjectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category") || "";

        if (filterValue === "all" || categories.includes(filterValue)) {
          card.classList.remove("hidden");
          card.style.opacity = "0";
          card.style.transform = "translateY(12px)";
          setTimeout(() => {
            card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 30);
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

/* 7. Formulario de Contacto Funcional & Accesible */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");
  const submitBtn = document.getElementById("submitBtn");

  if (!form || !statusEl) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector("#form-name")?.value.trim();
    const email = form.querySelector("#form-email")?.value.trim();
    const message = form.querySelector("#form-message")?.value.trim();

    if (!name || !email || !message) {
      showStatus("Por favor completa los campos requeridos.", "error");
      return;
    }

    const originalBtn = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Enviando...</span>';
    statusEl.style.display = "none";

    try {
      const formData = new FormData(form);
      const res = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        showStatus("¡Mensaje enviado con éxito! Erick te responderá pronto.", "success");
        form.reset();
      } else {
        throw new Error("Error en servidor");
      }
    } catch {
      showStatus(
        "No se pudo enviar automáticamente. Por favor escríbeme directamente a tatanarias13@gmail.com o a WhatsApp.",
        "error"
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtn;
    }
  });

  function showStatus(msg, type) {
    statusEl.textContent = msg;
    statusEl.className = `form-status-message ${type}`;
    statusEl.style.display = "block";
  }
}

/* 8. Botón Volver Arriba */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
