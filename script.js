/* ═══════════════════════════════════════════════════════════════
   script.js — Personal Portfolio
   
   PURPOSE: UI interactions only. No content management.
   All portfolio content lives in index.html — edit that file
   directly and push to GitHub to update the live site.
   
   Handles:
   ─ Mobile navigation menu (open / close)
   ─ Header scroll state (adds .scrolled class)
   ─ Active nav link highlighting as you scroll
   ─ Scroll-reveal animations (fade-up on enter)
   ─ Smooth anchor scrolling with nav offset
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';


  /* ── DOM References ─────────────────────────────────────── */
  const header        = document.getElementById('site-header');
  const navToggle     = document.getElementById('nav-toggle');
  const mobileMenu    = document.getElementById('mobile-menu');
  const navLinks      = document.querySelectorAll('.nav-link');
  const mobileLinks   = document.querySelectorAll('.mobile-nav-link');
  const revealEls     = document.querySelectorAll('[data-reveal]');
  const sections      = document.querySelectorAll('section[id]');


  /* ── Header: Scroll State ───────────────────────────────── */
  function handleScroll() {
    header.classList.toggle('scrolled', window.scrollY > 16);
    highlightActiveSection();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Run once on load so the header state is correct immediately
  handleScroll();


  /* ── Mobile Menu: Toggle ────────────────────────────────── */
  function setMenuOpen(open) {
    mobileMenu.classList.toggle('open', open);
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));

    // Prevent background scroll while menu is open
    document.body.style.overflow = open ? 'hidden' : '';
  }

  navToggle.addEventListener('click', function () {
    const isCurrentlyOpen = mobileMenu.classList.contains('open');
    setMenuOpen(!isCurrentlyOpen);
  });

  // Close when any mobile link is tapped
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      setMenuOpen(false);
    });
  });

  // Close when clicking outside the menu or toggle
  document.addEventListener('click', function (e) {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      setMenuOpen(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      setMenuOpen(false);
      navToggle.focus();
    }
  });


  /* ── Active Nav Link ────────────────────────────────────── */
  function highlightActiveSection() {
    var scrollPos = window.scrollY + 120; // offset so link activates a bit before the section
    var currentId = '';

    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === currentId);
    });
  }


  /* ── Scroll-Reveal: IntersectionObserver ────────────────── */
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -48px 0px'
      }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });

  } else {
    // Fallback for browsers without IntersectionObserver
    revealEls.forEach(function (el) {
      el.classList.add('revealed');
    });
  }


  /* ── Smooth Anchor Scroll (with nav offset) ─────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var navHeight    = header ? header.offsetHeight : 70;
      var targetTop    = target.getBoundingClientRect().top + window.scrollY;
      var scrollTarget = targetTop - navHeight - 8;

      window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
      });

      // Update URL hash without jumping
      if (history.pushState) {
        history.pushState(null, '', targetId);
      }
    });
  });


  /* ── NOTE: No localStorage used for portfolio content ─────
     All content is hardcoded in index.html.
     To update your portfolio:
       1. Edit the relevant section in index.html
       2. Commit and push to your GitHub repository
       3. GitHub Pages will rebuild and deploy automatically
     ──────────────────────────────────────────────────────── */

})();
