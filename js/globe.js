/**
 * Interactive Global Reach Map & UTC Clock
 * Decompresses landmass bitmap, paints dotted world map, renders animated flight paths from Accra, and keeps live UTC time.
 */
(function() {
  var cv = document.getElementById('globe');
  if (!cv) return;

  var MAP = 'AAAAAAIe8P///wAA8AAAAAA0AAAAAAAAAAAwADw////4AAIAAAAAAHAAAAAAAAAAALivwAf//wAAAAADAAP/wAHIAAAAAADsj38AH/+gAAAAAEAH///OAAAAgBgAAfw3/gB/+gAAAgAMHe///+/9gBAP/7/nbdrwD/+AAAH/Ag7H////////8H//////g8H/gAAAf/6//f////////Mf/////9H4D4A+AA+ev///////////AP/////4A0B4AAAD5/////////////Af1////gHgA4AAAP5///////////LwAHgD///gH0AAAAAG4/////////+AMAABAC///4D+AAAAGCx/////////4A4AAAAB////n/gAAAOCR/////////4A4AAAAAf///3/wAAAbH//////////9AgAAAAAP/////gAAADf//////////9AAAAAAAF////0YAAAB///////////8AAAAAAAD////8EAAAB///v///////5AAAAAAAD////+AAAAB/f5f///////wAAAAAAAD////gAAAAfxnwP///////jgAAAAAAD///+AAAAAPCb3///////+AAAAAAAAD///8AAAAAfCJf//////+ECAAAAAAAB///8AAAAAGDRf///////mMAAAAAAAA///8AAAAAH+Ai///////E8AAAAAAAAf//wAAAAAP/AA///////BgAAAAAAAAP//gAAAAAf/73///////gAAAAAAAAAD/AQAAAAAf//9/f/////gAAAAAAAAAF+AQAAAAB///+/n/////AAAAAAAAAAC+AAAAAAB///+fwH///+AAAAAAAAAAAeAwAAAAD////f/D///8gAAAAAAAAAAeGEAAAAD////v+B/j/AAAAAAAAAAAAPMAwAAAD////n+AfB+gAAAAAAAAAAAD8AAAAAD////34AeBfAgAAAAAAAAAAAPAAAAAH////3gAcAfAgAAAAAAAAAAADAAAAAD////6AAcAfgwAAAAAAAAAAABBwAAAD////8wAMATAIAAAAAAAAAAAAr/AAAB/////gAIASAAAAAAAAAAAAAAH/gAAA/////gACAAAIAAAAAAAAAAAAH/8AAAYH///AAAAsGAAAAAAAAAAAAAH/+AAAAB//+AAAAUOAAAAAAAAAAAAAP/+AAAAB//8AAAAc+gAAAAAAAAAAAAP//gAAAD//4AAAAMeBgAAAAAAAAAAAP//8AAAB//wAAAAGdCuAAAAAAAAAAAf///AAAA//wAAAACAAHgAAAAAAAAAAP///gAAA//wAAAAB4AHggAAAAAAAAAH///AAAAf/wAAAAACIDQIAAAAAAAAAH//+AAAAf/wAAAAAAAAAAAAAAAAAAAD//+AAAA//wgAAAAABxAAAAAAAAAAAD//8AAAA//wgAAAAAHxgBAAAAAAAAAA//8AAAA//zgAAAAAf/gAAAAAAAAAAAf/8AAAA//DgAAAAAf/gAAAAAAAAAAAf/8AAAAf/DAAAAAD//4CAAAAAAAAAAf/wAAAAf/DAAAAAH//4AAAAAAAAAAAf/AAAAAf+DAAAAAH//8AAAAAAAAAAAf/AAAAAP8AAAAAAH//+AAAAAAAAAAA/+AAAAAP8AAAAAAH//+AAAAAAAAAAA/8AAAAAH4AAAAAAD//+AAAAAAAAAAA/8AAAAAHwAAAAAADwf8AAAAAAAAAAA/gAAAAAAAAAAAAACAP4AAAAAAAAAAB/wAAAAAAAAAAAAAAAD4AEAAAAAAAAB+AAAAAAAAAAAAAAAAAAAGAAAAAAAAB6AAAAAAAAAAAAAAAAAwAMAAAAAAAAA8AAAAAAAAAAAAAAAAAQAYAAAAAAAAB4AAAAAAAAAAAAAAAAAAAwAAAAAAAAB4AAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAACAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      COLS = 180,
      ROWS = 69,
      STEP = 2,
      LAT0 = 80,
      bin = atob(MAP),
      land = [];

  for (var r = 0; r < ROWS; r++) {
    for (var c = 0; c < COLS; c++) {
      var k = r * COLS + c;
      land.push((bin.charCodeAt(k >> 3) >> (7 - (k & 7))) & 1);
    }
  }

  var cx = cv.getContext('2d'),
      base = document.createElement('canvas'),
      bx = base.getContext('2d'),
      W = 0,
      H = 0,
      running = false,
      t0 = 0,
      HUB = { la: 5.56, lo: -.2 },
      DEST = [
        { n: 'Ivory Coast', la: 5.36, lo: -4.01, dx: -9, dy: 15, al: 'right' },
        { n: 'Kenya', la: -1.29, lo: 36.82, dx: 9, dy: 4, al: 'left' },
        { n: 'London', la: 51.5, lo: -.13, dx: -9, dy: -8, al: 'right' },
        { n: 'France', la: 48.86, lo: 2.35, dx: 9, dy: 16, al: 'left' },
        { n: 'Netherlands', la: 52.37, lo: 4.9, dx: 9, dy: -8, al: 'left' },
        { n: 'Canada', la: 45.42, lo: -75.7, dx: 9, dy: -7, al: 'left' },
        { n: 'USA', la: 38, lo: -97, dx: 9, dy: 15, al: 'left' },
        { n: 'Australia', la: -33.87, lo: 151.21, dx: -9, dy: 16, al: 'right' }
      ],
      LEG = 1000,
      HOLD = 3000,
      TOTAL = DEST.length * LEG + HOLD,
      still = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  function xy(la, lo) {
    return [(lo + 180) / 360 * W, (LAT0 - la) / (ROWS * STEP) * H];
  }

  function size() {
    var d = window.devicePixelRatio || 1;
    W = cv.clientWidth;
    H = cv.clientHeight;
    if (!W) return;
    cv.width = base.width = W * d;
    cv.height = base.height = H * d;
    cx.setTransform(d, 0, 0, d, 0, 0);
    bx.setTransform(d, 0, 0, d, 0, 0);

    var cw = W / COLS,
        rh = H / ROWS,
        rad = Math.min(cw, rh) * .36;
    bx.fillStyle = 'rgba(255,255,255,.28)';

    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        if (land[r * COLS + c]) {
          bx.beginPath();
          bx.arc((c + .5) * cw, (r + .5) * rh, rad, 0, 6.2832);
          bx.fill();
        }
      }
    }
  }

  function glow(x, y, rad, a) {
    var g = cx.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, 'rgba(255,138,77,' + a + ')');
    g.addColorStop(1, 'rgba(255,90,31,0)');
    cx.fillStyle = g;
    cx.beginPath();
    cx.arc(x, y, rad, 0, 6.2832);
    cx.fill();
  }

  function ease(x) {
    return x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  }

  function paint(t) {
    if (!W) return;
    cx.clearRect(0, 0, W, H);
    cx.drawImage(base, 0, 0, W, H);

    var s = Math.max(W / 700, .6),
        a = xy(HUB.la, HUB.lo),
        T = still ? TOTAL - HOLD / 2 : t % TOTAL,
        f = (!still && T > TOTAL - 700) ? (TOTAL - T) / 700 : 1;

    cx.font = '500 ' + Math.max(9, 9.5 * s) + 'px "JetBrains Mono",ui-monospace,monospace';

    DEST.forEach(function(d, i) {
      var loc = T - i * LEG;
      if (loc <= 0) return;
      var b = xy(d.la, d.lo),
          mx = (a[0] + b[0]) / 2,
          my = (a[1] + b[1]) / 2 - Math.abs(b[0] - a[0]) * .28 - 6 * s,
          pr = Math.min(loc / (LEG * .8), 1),
          e = ease(pr);

      function at(u) {
        var q = 1 - u;
        return [q * q * a[0] + 2 * q * u * mx + u * u * b[0], q * q * a[1] + 2 * q * u * my + u * u * b[1]];
      }

      cx.strokeStyle = 'rgba(255,90,31,' + .5 * f + ')';
      cx.lineWidth = 1.2;
      cx.beginPath();
      cx.moveTo(a[0], a[1]);
      for (var k = 1; k <= 40; k++) {
        var p = at(e * k / 40);
        cx.lineTo(p[0], p[1]);
      }
      cx.stroke();

      if (pr < 1) {
        var h = at(e);
        glow(h[0], h[1], 12 * s, .95 * f);
        return;
      }

      var age = loc - LEG * .8,
          sc = 1 + .9 * Math.exp(-age / 260) * Math.cos(age / 55);

      glow(b[0], b[1], 16 * s, .55 * f);

      if (!still) {
        var ph = ((t / 1800) + i * .33) % 1;
        cx.strokeStyle = 'rgba(255,90,31,' + (1 - ph) * .6 * f + ')';
        cx.lineWidth = 1.2;
        cx.beginPath();
        cx.arc(b[0], b[1], (3 + ph * 24) * s, 0, 6.2832);
        cx.stroke();
      }

      cx.fillStyle = 'rgba(255,255,255,' + f + ')';
      cx.beginPath();
      cx.arc(b[0], b[1], 2.4 * s * sc, 0, 6.2832);
      cx.fill();

      cx.textAlign = d.al;
      cx.fillStyle = 'rgba(255,255,255,' + .85 * f + ')';
      cx.fillText(d.n.toUpperCase(), b[0] + d.dx * s, b[1] + d.dy * s);
    });

    var hp = still ? 0 : (t / 1800) % 1;
    glow(a[0], a[1], 18 * s, .7);

    if (!still) {
      cx.strokeStyle = 'rgba(255,90,31,' + (1 - hp) * .6 + ')';
      cx.lineWidth = 1.2;
      cx.beginPath();
      cx.arc(a[0], a[1], (3 + hp * 24) * s, 0, 6.2832);
      cx.stroke();
    }

    cx.fillStyle = '#fff';
    cx.beginPath();
    cx.arc(a[0], a[1], 3 * s, 0, 6.2832);
    cx.fill();

    cx.textAlign = 'left';
    cx.fillStyle = 'rgba(255,138,77,1)';
    cx.fillText('GHANA', a[0] + 9 * s, a[1] + 17 * s);
  }

  function loop(t) {
    if (!running) return;
    paint(t - t0);
    requestAnimationFrame(loop);
  }

  size();
  paint(0);

  var rt;
  window.addEventListener('resize', function() {
    clearTimeout(rt);
    rt = setTimeout(function() {
      size();
      paint(0);
    }, 150);
  });

  if ('IntersectionObserver' in window && !still) {
    new IntersectionObserver(function(es) {
      var v = es[0].isIntersecting;
      if (v && !running) {
        running = true;
        t0 = performance.now();
        requestAnimationFrame(loop);
      } else if (!v) {
        running = false;
      }
    }).observe(cv);
  }

  // --- Live UTC Clock ---
  var clk = document.getElementById('clk');
  function tickClock() {
    if (!clk) return;
    var d = new Date();
    clk.textContent = ('0' + d.getUTCHours()).slice(-2) + ':' + ('0' + d.getUTCMinutes()).slice(-2) + ' GMT';
  }
  tickClock();
  setInterval(tickClock, 30000);
})();
