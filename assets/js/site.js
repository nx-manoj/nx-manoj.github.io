/* =========================================================================
   site.js — navigation only. No preloader, no custom cursor, no scroll hijack.
   Everything the page needs is visible without this file.
   ========================================================================= */
(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('menu');

  /* sticky nav background once the page moves */
  if (nav) {
    var ticking = false;
    var sync = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(sync); }
    }, { passive: true });
    sync();
  }

  /* appearance — follows the OS until the person picks one, then remembers it */
  var themeBtn = document.querySelector('.theme-btn');
  if (themeBtn) {
    var dark = window.matchMedia('(prefers-color-scheme: dark)');
    var current = function () {
      return document.documentElement.getAttribute('data-theme') ||
        (dark.matches ? 'dark' : 'light');
    };
    var syncTheme = function () {
      var t = current();
      themeBtn.setAttribute('aria-label',
        t === 'dark' ? 'Switch to light appearance' : 'Switch to dark appearance');
      themeBtn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        meta.removeAttribute('media');
        meta.setAttribute('content', t === 'dark' ? '#000000' : '#FFFFFF');
      }
    };
    themeBtn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncTheme();
    });
    dark.addEventListener('change', function () {
      if (!document.documentElement.hasAttribute('data-theme')) syncTheme();
    });
    syncTheme();
  }

  /* mobile menu — a plain disclosure, keyboard and Escape included */
  if (toggle && menu) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('is-open')) return;
      if (e.target.closest('.nav')) return;
      setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 820) setOpen(false);
    });
  }
})();
