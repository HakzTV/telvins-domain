/**
 * Trailing Cursor Spotlight
 * Follows mouse pointer with easing and dynamically adjusts blend modes based on background luminance.
 */
(function() {
  if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;

  var cl = { d: 'cg d', l: 'cg l', k: 'cg k' },
      el = {};

  for (var m in cl) {
    el[m] = document.createElement('div');
    el[m].className = cl[m];
    el[m].setAttribute('aria-hidden', 'true');
    document.body.appendChild(el[m]);
  }

  var tx = 0, ty = 0,
      x = 0, y = 0,
      seen = false,
      n = 0,
      k = window.matchMedia('(prefers-reduced-motion:reduce)').matches ? 1 : .12;

  function mode(e) {
    while (e && e !== document.documentElement) {
      var m = getComputedStyle(e).backgroundColor.match(/[\d.]+/g);
      if (m && (m.length < 4 || +m[3] > .5)) {
        var r = +m[0], g = +m[1], b = +m[2];
        if (r > 200 && g < 140 && b < 90) return 'k';
        if (r * .299 + g * .587 + b * .114 > 150) return 'l';
        return 'd';
      }
      e = e.parentElement;
    }
    return 'd';
  }

  function pick() {
    var md = seen ? mode(document.elementFromPoint(x, y)) : null;
    for (var m in el) {
      el[m].classList.toggle('on', m === md);
    }
  }

  window.addEventListener('mousemove', function(e) {
    tx = e.clientX;
    ty = e.clientY;
    if (!seen) {
      seen = true;
      x = tx;
      y = ty;
      pick();
    }
  }, { passive: true });

  document.documentElement.addEventListener('mouseleave', function() {
    seen = false;
    pick();
  });

  (function f() {
    x += (tx - x) * k;
    y += (ty - y) * k;
    var t = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
    for (var m in el) el[m].style.transform = t;
    if (++n % 6 === 0) pick();
    requestAnimationFrame(f);
  })();
})();
