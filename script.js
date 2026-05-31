/* ============================================================
   LA BRASSINE — interactions (vanilla JS, zéro dépendance)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Année footer ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Nav : état scrollé ---------- */
  var nav = document.getElementById("nav");
  function onScrollNav() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- Menu mobile ---------- */
  var burger = document.getElementById("burger");
  var mobileMenu = document.getElementById("mobileMenu");
  function closeMobile() {
    if (!burger || !mobileMenu) return;
    burger.classList.remove("open");
    mobileMenu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }
  if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
      var open = burger.classList.toggle("open");
      mobileMenu.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMobile);
    });
  }

  /* ---------- Smooth scroll (avec offset nav) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  /* ---------- Carrousel hero (fondu) ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll(".hero-slide"));
  if (slides.length > 1) {
    var idx = 0;
    setInterval(function () {
      slides[idx].classList.remove("active");
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add("active");
    }, 5000);
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Reveal titres mot par mot ---------- */
  document.querySelectorAll(".reveal-words").forEach(function (el) {
    var words = el.textContent.trim().split(/(\s+)/);
    el.innerHTML = words.map(function (w, i) {
      if (/^\s+$/.test(w)) return w;
      return '<span class="word" style="--i:' + i + '">' + w + "</span>";
    }).join("");
  });

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll(".reveal-words").forEach(function (el) { revealObserver.observe(el); });

  /* ---------- Fade-up générique ---------- */
  var fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll("[data-fade]").forEach(function (el) { fadeObserver.observe(el); });

  /* ---------- Compteurs animés ---------- */
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
  function animateCounter(el) {
    var target = parseFloat(el.dataset.target);
    var duration = parseInt(el.dataset.duration) || 1800;
    var suffix = el.dataset.suffix || "";
    var prefix = el.dataset.prefix || "";
    var start = performance.now();
    function frame(now) {
      var progress = Math.min((now - start) / duration, 1);
      var current = target * easeOutCubic(progress);
      el.textContent = prefix + Math.round(current) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = "true";
        if (reduceMotion) {
          entry.target.textContent = (entry.target.dataset.prefix || "") + entry.target.dataset.target + (entry.target.dataset.suffix || "");
        } else {
          animateCounter(entry.target);
        }
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll(".counter[data-target]").forEach(function (c) {
    if (!reduceMotion) c.textContent = (c.dataset.prefix || "") + "0" + (c.dataset.suffix || "");
    counterObserver.observe(c);
  });

  /* ---------- Parallax hero (léger) ---------- */
  var heroSlides = document.getElementById("heroSlides");
  var hero = document.querySelector(".hero");
  if (heroSlides && hero && !reduceMotion) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var sy = window.scrollY;
          if (sy < hero.offsetHeight) {
            heroSlides.style.transform = "translateY(" + sy * 0.25 + "px) scale(" + (1 + sy * 0.0002) + ")";
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

})();
