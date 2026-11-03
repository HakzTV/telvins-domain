/* About: eclipse + chapters. Scroll progress drives the rail, the chapter
   dots and the eclipse (the moon slides away as the story unfolds). */
(function () {
  var about = document.getElementById('about');
  if (!about) return;

  var g = about.querySelector('.ab-g');
  var tl = about.querySelector('.ab-tl');
  var chs = [].slice.call(about.querySelectorAll('.ab-ch'));
  var cn = about.querySelector('#ab-cn');
  var cl = about.querySelector('#ab-cl');
  if (!g || !tl || !chs.length) return;

  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var busy = false;

   function update() {
    busy = false;
    if (!tl.offsetHeight) return; // About view is hidden

    if (still) {
      g.style.setProperty('--p', 1);
      g.style.setProperty('--q', 1);
      chs.forEach(function (c) { c.classList.add('lit'); });
      return;
    }

    var y = window.innerHeight * 0.62;
    var r = tl.getBoundingClientRect();

    // Rail progress (unchanged)
    var p = Math.max(0, Math.min(1, (y - r.top) / r.height));
    g.style.setProperty('--p', p);

    // Eclipse progress: 0 at the top of the page, 1 at the end of the rail
    var p0 = Math.max(0, Math.min(0.5, (y - (r.top + window.scrollY)) / r.height));
    var q = Math.max(0, Math.min(1, (p - p0) / (1 - p0)));
    g.style.setProperty('--q', q);

    var n = 0;
    chs.forEach(function (c, i) {
      var lit = c.getBoundingClientRect().top < y;
      c.classList.toggle('lit', lit);
      if (lit) n = i;
    });
    cn.textContent = '0' + (n + 1);
    cl.textContent = chs[n].getAttribute('data-l');
  }

  function request() {
    if (!busy) { busy = true; requestAnimationFrame(update); }
  }

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  window.addEventListener('hashchange', function () { setTimeout(update, 120); });
  update();
})();