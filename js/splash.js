/**
 * Splash Screen Animation
 * Renders the introductory SVG mark and zooms into the dot to reveal the portfolio.
 */
(function() {
  var sp = document.getElementById('splash'),
      root = document.documentElement,
      resumed = false;

  function resume() {
    if (!resumed) {
      resumed = true;
      if (window.gsap) gsap.globalTimeline.resume();
    }
  }

  function done() {
    if (sp && sp.parentNode) sp.parentNode.removeChild(sp);
    root.classList.remove('sp');
    resume();
  }

  if (!sp) return;
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    done();
    return;
  }

  try {
    if (window.gsap) gsap.globalTimeline.pause();
    var NS = 'http://www.w3.org/2000/svg',
        W = window.innerWidth,
        H = window.innerHeight,
        loaded = document.readyState === 'complete',
        built = false;

    window.addEventListener('load', function() { loaded = true; });
    setTimeout(function() { loaded = true; }, 5000);

    function go() {
      try { build(); } catch(e) { done(); }
    }

    function build() {
      if (built) return;
      built = true;

      var fs = Math.max(96, Math.min(W * .3, 200)),
          svg = document.createElementNS(NS, 'svg');

      svg.setAttribute('width', W);
      svg.setAttribute('height', H);
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      svg.style.cssText = 'position:absolute;left:0;top:0;display:block';
      svg.innerHTML = '<defs><mask id="spm" maskUnits="userSpaceOnUse" x="0" y="0" width="' + W + '" height="' + H + '">'
        + '<rect width="' + W + '" height="' + H + '" fill="#fff"/>'
        + '<circle id="sph" cx="0" cy="0" r="0" fill="#000"/>'
        + '</mask></defs>'
        + '<rect width="' + W + '" height="' + H + '" fill="#000" mask="url(#spm)"/>'
        + '<circle id="spr" cx="0" cy="0" r="0" fill="none" stroke="#f4f3f0" stroke-width="2" opacity="0"/>'
        + '<g id="spk" opacity="0"><text id="spt" x="0" y="0" font-family="Inter Tight,system-ui,sans-serif" font-size="' + fs + '" font-weight="600" letter-spacing="-0.055em" fill="#f4f3f0">tv</text></g>'
        + '<circle id="spd" cx="0" cy="0" r="0" fill="#f4f3f0" opacity="0"/>';

      sp.appendChild(svg);
      sp.style.background = 'transparent';

      var k = svg.querySelector('#spk'),
          t = svg.querySelector('#spt'),
          d = svg.querySelector('#spd'),
          h = svg.querySelector('#sph'),
          r = svg.querySelector('#spr');

      var bw = t.getBBox().width,
          dr = fs * .095,
          gap = fs * .045,
          x0 = (W - (bw + gap + dr * 2)) / 2,
          y0 = H / 2 + fs * .26,
          cx = x0 + bw + gap + dr,
          cy = y0 - dr;

      t.setAttribute('x', x0);
      t.setAttribute('y', y0);
      d.setAttribute('cx', cx);
      d.setAttribute('cy', cy);
      d.setAttribute('r', dr);
      h.setAttribute('cx', cx);
      h.setAttribute('cy', cy);
      r.setAttribute('cx', cx);
      r.setAttribute('cy', cy);

      var K = Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy)) / dr * 1.1,
          lk = Math.log(K),
          t0 = performance.now(),
          tz = 0,
          phase = 0;

      function frame(now) {
        try {
          if (phase === 0) {
            var a = Math.min(1, (now - t0) / 700);
            a = 1 - Math.pow(1 - a, 3);
            var tr = 'translate(0 ' + (12 * (1 - a)).toFixed(2) + ')';
            k.setAttribute('opacity', a);
            d.setAttribute('opacity', a);
            k.setAttribute('transform', tr);
            d.setAttribute('transform', tr);
            if (now - t0 >= 1400 && loaded) {
              phase = 1;
              tz = now;
              d.style.display = 'none';
              resume();
            }
          } else {
            var u = Math.min(1, (now - tz) / 1300),
                p = u * u * u * (u * (u * 6 - 15) + 10),
                sc = Math.exp(p * lk),
                o = Math.max(0, 1 - u / .3);
            h.setAttribute('r', (dr * sc).toFixed(2));
            r.setAttribute('r', (dr * sc).toFixed(2));
            r.setAttribute('opacity', (1 - u).toFixed(3));
            k.setAttribute('transform', 'translate(' + cx + ' ' + cy + ') scale(' + sc.toFixed(4) + ') translate(' + (-cx) + ' ' + (-cy) + ')');
            k.setAttribute('opacity', o);
            if (o === 0) k.style.display = 'none';
            if (u >= 1) {
              done();
              return;
            }
          }
          requestAnimationFrame(frame);
        } catch(e) {
          done();
        }
      }
      requestAnimationFrame(frame);
    }

    if (document.fonts && document.fonts.load) {
      Promise.race([
        document.fonts.load('600 100px "Inter Tight"'),
        new Promise(function(r) { setTimeout(r, 1200); })
      ]).then(go, go);
    } else {
      go();
    }
  } catch(e) {
    done();
  }
})();
