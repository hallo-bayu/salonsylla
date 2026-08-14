/* ==========================================================================
   SALON SYLLA — SCRIPT
   1. Shared helpers
   2. Navbar scroll state + mobile menu
   3. Active navigation link on scroll
   4. Scroll reveal animation
   5. Services category tabs
   6. Gallery filter
   7. Testimonial slider
   8. FAQ accordion
   ========================================================================== */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------ *
   * 2. NAVBAR SCROLL STATE + MOBILE MENU
   * ------------------------------------------------------------------ */
  var navbar = document.getElementById("navbar");
  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primary-nav");
  var navScrim = document.getElementById("navScrim");

  function setNavScrolled() {
    if (!navbar) return;
    navbar.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  setNavScrolled();
  window.addEventListener("scroll", setNavScrolled, { passive: true });

  function openNav() {
    navbar.classList.add("is-nav-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
    navScrim.hidden = false;
  }

  function closeNav() {
    navbar.classList.remove("is-nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    navScrim.hidden = true;
  }

  if (navToggle && navbar) {
    navToggle.addEventListener("click", function () {
      var isOpen = navbar.classList.contains("is-nav-open");
      if (isOpen) { closeNav(); } else { openNav(); }
    });
  }

  if (navScrim) {
    navScrim.addEventListener("click", closeNav);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navbar && navbar.classList.contains("is-nav-open")) {
      closeNav();
      navToggle.focus();
    }
  });

  if (primaryNav) {
    primaryNav.querySelectorAll(".navbar__link").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
  }

  /* ------------------------------------------------------------------ *
   * 3. ACTIVE NAVIGATION LINK ON SCROLL
   * ------------------------------------------------------------------ */
  var navLinks = document.querySelectorAll(".navbar__link");
  var trackedSections = [];
  navLinks.forEach(function (link) {
    var hash = link.getAttribute("href");
    if (hash && hash.charAt(0) === "#" && hash.length > 1) {
      var section = document.querySelector(hash);
      if (section) { trackedSections.push({ id: hash, el: section }); }
    }
  });

  if ("IntersectionObserver" in window && trackedSections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = "#" + entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    trackedSections.forEach(function (item) { navObserver.observe(item.el); });
  }

  /* ------------------------------------------------------------------ *
   * 4. SCROLL REVEAL ANIMATION
   * ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ------------------------------------------------------------------ *
   * 5. SERVICES CATEGORY TABS
   * ------------------------------------------------------------------ */
  var serviceTabs = document.querySelectorAll(".services__tab");
  var servicesImage = document.getElementById("servicesImage");
  var categoryImages = {
    hair: "fotosalon.png",
    facebody: "fotosalon3.png",
    riasmakeup: "riaspengantin.png"
  };

  serviceTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var category = tab.getAttribute("data-category");

      serviceTabs.forEach(function (t) {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", t === tab ? "true" : "false");
      });

      document.querySelectorAll(".services__panel").forEach(function (panel) {
        var isMatch = panel.id === "panel-" + category;
        panel.classList.toggle("is-active", isMatch);
        panel.hidden = !isMatch;
      });

      var categoryLabels = {
        hair: "Hair Treatment",
        facebody: "Face & Body",
        riasmakeup: "Rias & Makeup"
      };

      if (servicesImage && categoryImages[category]) {
        servicesImage.src = categoryImages[category];
        servicesImage.alt = "Layanan " + (categoryLabels[category] || category) + " Sylla Salon";
      }
    });
  });

  /* ------------------------------------------------------------------ *
   * 6. GALLERY FILTER
   * ------------------------------------------------------------------ */
  var galleryFilters = document.querySelectorAll(".gallery__filter");
  var galleryItems = document.querySelectorAll(".gallery__item");

  galleryFilters.forEach(function (filter) {
    filter.addEventListener("click", function () {
      var value = filter.getAttribute("data-filter");

      galleryFilters.forEach(function (f) { f.classList.toggle("is-active", f === filter); });

      galleryItems.forEach(function (item) {
        var match = value === "all" || item.getAttribute("data-category") === value;
        item.classList.toggle("is-hidden", !match);
      });
    });
  });

  /* ------------------------------------------------------------------ *
   * 7. TESTIMONIAL SLIDER
   * ------------------------------------------------------------------ */
  var slides = document.querySelectorAll(".testimonial-slide");
  var dots = document.querySelectorAll(".slider-dot");
  var prevBtn = document.getElementById("testimonialPrev");
  var nextBtn = document.getElementById("testimonialNext");
  var currentSlide = 0;

  function showSlide(index) {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach(function (slide, i) {
      var isActive = i === currentSlide;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === currentSlide);
    });
  }

  if (prevBtn) { prevBtn.addEventListener("click", function () { showSlide(currentSlide - 1); }); }
  if (nextBtn) { nextBtn.addEventListener("click", function () { showSlide(currentSlide + 1); }); }
  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () { showSlide(i); });
  });

  /* ------------------------------------------------------------------ *
   * 8. FAQ ACCORDION (single item open at a time)
   * ------------------------------------------------------------------ */
  var accordionTriggers = document.querySelectorAll(".accordion__trigger");

  function collapsePanel(panel, trigger) {
    trigger.setAttribute("aria-expanded", "false");
    panel.style.maxHeight = panel.scrollHeight + "px"; // lock current height first
    requestAnimationFrame(function () {
      panel.style.maxHeight = "0px";
    });
    var onEnd = function (event) {
      if (event.propertyName !== "max-height") return;
      panel.hidden = true;
      panel.removeEventListener("transitionend", onEnd);
    };
    if (prefersReducedMotion) {
      panel.hidden = true;
    } else {
      panel.addEventListener("transitionend", onEnd);
    }
  }

  function expandPanel(panel, trigger) {
    trigger.setAttribute("aria-expanded", "true");
    panel.hidden = false;
    panel.style.maxHeight = "0px";
    // eslint-disable-next-line no-unused-expressions
    panel.offsetHeight; // force reflow so the transition below actually runs
    panel.style.maxHeight = panel.scrollHeight + "px";
  }

  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      var isOpen = trigger.getAttribute("aria-expanded") === "true";

      accordionTriggers.forEach(function (otherTrigger) {
        if (otherTrigger === trigger) return;
        if (otherTrigger.getAttribute("aria-expanded") === "true") {
          var otherPanel = document.getElementById(otherTrigger.getAttribute("aria-controls"));
          if (otherPanel) { collapsePanel(otherPanel, otherTrigger); }
        }
      });

      if (isOpen) {
        collapsePanel(panel, trigger);
      } else {
        expandPanel(panel, trigger);
      }
    });
  });
  /* ------------------------------------------------------------------ *
   * 9. HERO AUTOMATIC SLIDER
   * ------------------------------------------------------------------ */
  var heroSlides = document.querySelectorAll(".hero__slide");
  var currentSlideIndex = 0;

  if (heroSlides.length > 1) { // Hanya jalan jika gambar lebih dari 1
    setInterval(function () {
      // 1. Hilangkan efek aktif dari gambar saat ini
      heroSlides[currentSlideIndex].classList.remove("is-active");
      
      // 2. Tentukan indeks gambar berikutnya
      currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
      
      // 3. Tambahkan efek aktif ke gambar baru
      heroSlides[currentSlideIndex].classList.add("is-active");
    }, 4000); // 4000 artinya gambar berganti setiap 4 detik
  }
})();
