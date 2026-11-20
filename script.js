/**
 * PORTAFOLIO ERICK ARIAS - JAVASCRIPT PRINCIPAL
 * Optimizaciones UI/UX: Scroll Spy dinámico con IntersectionObserver,
 * Typewriter, Spotlight Glow, Count-Up con decimales, Fallback de imágenes y Video Hero.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initScrollSpy();
  initProfileVideo();
  initTypewriter();
  initSpotlightGlow();
  initCountUp();
  initScrollAnimations();
  initProjectFilter();
  initProjectImageFallbacks();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. Navegación Móvil y Navbar con Scroll
   ========================================================================== */
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

  // Sombra y fondo al hacer scroll
  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Scroll Spy con IntersectionObserver (Línea verde esmeralda indicadora)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link:not(.btn-nav-contact)");

  if (!sections.length || !navLinks.length) return;

  // Mapa de id a navLink
  const linkMap = {};
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      const id = href.substring(1);
      linkMap[id] = link;
    }
  });

  const setActiveLink = (id) => {
    navLinks.forEach((link) => link.classList.remove("active"));
    if (linkMap[id]) {
      linkMap[id].classList.add("active");
    }
  };

  // Usar IntersectionObserver con rootMargin para centrar la zona de lectura activa
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0,
  };

  let activeSectionId = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSectionId = entry.target.id;
        setActiveLink(activeSectionId);
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // Fallback complementario en scroll por si se llega al final o inicio absoluto
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY < 100) {
        setActiveLink("home");
      } else if (
        window.innerHeight + Math.round(window.scrollY) >=
        document.body.offsetHeight - 50
      ) {
        // Cerca del footer, activar contacto
        const contactLink = document.querySelector('.nav-link[href="#contact"]');
        if (contactLink) {
          navLinks.forEach((link) => link.classList.remove("active"));
          contactLink.classList.add("active");
        }
      }
    },
    { passive: true }
  );
}

/* ==========================================================================
   3. Video de Perfil en Movimiento (Autoplay, Loop, Muted, Playsinline)
   ========================================================================== */
function initProfileVideo() {
  const video = document.getElementById("profileMedia");
  if (!video) return;

  video.muted = true;
  video.playsInline = true;

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Reintentar en la primera interacción si el navegador tiene bloqueo estricto
      const startPlay = () => {
        video.play().catch(() => {});
        window.removeEventListener("click", startPlay);
        window.removeEventListener("scroll", startPlay);
        window.removeEventListener("touchstart", startPlay);
      };
      window.addEventListener("click", startPlay, { once: true });
      window.addEventListener("scroll", startPlay, { once: true, passive: true });
      window.addEventListener("touchstart", startPlay, { once: true, passive: true });
    });
  }

  // Permitir pausar/reanudar con un toque
  video.addEventListener("click", () => {
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
}

/* ==========================================================================
   4. Efecto Mecanografiado Dinámico (Typewriter Effect)
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById("typewriterText");
  if (!el) return;

  const phrases = [
    "soluciones tecnológicas para el fútbol y torneos.",
    "dashboards y analítica en Growth Marketing.",
    "plataformas web Full Stack con React y Node.js.",
    "ecosistemas digitales de alto impacto."
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 65;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 30;
    } else {
      el.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 65;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1900;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   5. Efecto Spotlight (Iluminación interactiva con el cursor)
   ========================================================================== */
function initSpotlightGlow() {
  const cards = document.querySelectorAll(".spotlight-card");
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener(
      "mousemove",
      (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      },
      { passive: true }
    );
  });
}

/* ==========================================================================
   6. Contadores Numéricos Animados con Decimales Limpios (Count-Up)
   ========================================================================== */
function initCountUp() {
  const counters = document.querySelectorAll(".count-up");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetStr = el.getAttribute("data-target") || "0";
          const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
          const target = parseFloat(targetStr);

          if (isNaN(target)) return;

          const duration = 1200; // ms
          const frameRate = 30; // ms
          const totalSteps = Math.round(duration / frameRate);
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / totalSteps;
            // Easing suave cuadrático hacia el final
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = target * easeOut;

            if (currentStep >= totalSteps) {
              el.textContent = decimals > 0 ? target.toFixed(decimals) : Math.round(target);
              clearInterval(timer);
            } else {
              el.textContent = decimals > 0 ? currentVal.toFixed(decimals) : Math.round(currentVal);
            }
          }, frameRate);

          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.25 }
  );

  counters.forEach((c) => observer.observe(c));
}

/* ==========================================================================
   7. Animaciones de Entrada con Scroll (Reveal)
   ========================================================================== */
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

/* ==========================================================================
   8. Filtro Interactivo de Proyectos
   ========================================================================== */
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

/* ==========================================================================
   9. Fallback visual para imágenes de proyectos
   ========================================================================== */
function initProjectImageFallbacks() {
  const projectImages = document.querySelectorAll(".project-img");
  projectImages.forEach((img) => {
    // Si la imagen falla al cargar, agregar clase que la oculta y activa el fallback
    img.addEventListener("error", () => {
      img.classList.add("img-error");
    });
  });
}

/* ==========================================================================
   10. Formulario de Contacto Funcional & Accesible
   ========================================================================== */
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

/* ==========================================================================
   11. Botón Volver Arriba
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 350) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    },
    { passive: true }
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
