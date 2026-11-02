/**
 * Navigation & Mobile Drawer Controller
 * Handles header elevation on scroll, logo styling switch, and mobile hamburger menu.
 */
(function() {
  var navEl = document.querySelector('nav'),
      navLogo = navEl ? navEl.querySelector('.logo') : null;

  function navState() {
    if (!navEl || !navLogo) return;
    var top = window.scrollY <= 40 && document.documentElement.clientWidth > 820;
    navLogo.classList.toggle('c3', top);
    navEl.classList.toggle('top', top);
    navEl.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', navState, { passive: true });
  window.addEventListener('resize', navState);
  navState();

  var burger = document.getElementById('burger'),
      menu = document.getElementById('menu');

  function setMenu(o) {
    if (!burger || !menu) return;
    document.body.classList.toggle('menu-open', o);
    burger.setAttribute('aria-expanded', o);
    burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', !o);
  }

  if (burger) {
    burger.addEventListener('click', function() {
      setMenu(!document.body.classList.contains('menu-open'));
    });
  }

  if (menu) {
    menu.addEventListener('click', function(e) {
      if (e.target.closest('a')) setMenu(false);
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') setMenu(false);
  });

  window.addEventListener('resize', function() {
    if (document.documentElement.clientWidth > 820) setMenu(false);
  });
})();
