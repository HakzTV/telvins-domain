/* Hero: living arch + pipeline. Starts after the splash screen is gone. */
(function () {
  var hero = document.querySelector('.hero');
  if (!hero) return;

  var root = document.documentElement;
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stage = hero.querySelector('.hero-arch-stage');

  hero.classList.add('hx-ready');

  function watch() {
    if (!('IntersectionObserver' in window)) {
      hero.classList.add('hx-go');
      return;
    }
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        hero.classList.toggle('hx-go', e.isIntersecting);
      });
    }, { threshold: 0.35 }).observe(stage);
  }

  // Wait for the splash (html.sp) to finish so the intro isn't played behind it
  if (!root.classList.contains('sp')) {
    watch();
  } else {
    var mo = new MutationObserver(function () {
      if (!root.classList.contains('sp')) {
        mo.disconnect();
        watch();
      }
    });
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });
  }

  // Cursor parallax (desktop only)
  if (!still && window.matchMedia('(hover: hover)').matches) {
    var busy = false;
    hero.addEventListener('mousemove', function (ev) {
      if (busy) return;
      busy = true;
      requestAnimationFrame(function () {
        var r = hero.getBoundingClientRect();
        hero.style.setProperty('--hx-mx', ((ev.clientX - r.left) / r.width - 0.5) * 2);
        hero.style.setProperty('--hx-my', ((ev.clientY - r.top) / r.height - 0.5) * 2);
        busy = false;
      });
    });
  }
})();