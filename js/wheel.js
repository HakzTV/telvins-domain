/**
 * Values Orbit Wheel
 * Generates and animates the rotating wheel of values, synced to page scroll and clickable cards.
 */
(function() {
  var wheel = document.getElementById('wheel');
  if (!wheel) return;

  function getVals() {
    return (window.tvI18n && window.tvI18n.getWheelValues) ? window.tvI18n.getWheelValues() : [
      ['Honest advice', '01 · HONESTY', 'I hear the idea first. If I think it won’t work, I say so calmly and explain why.'],
      ['Vision first', '02 · CLARITY', 'I don’t build until I understand most of what the client truly sees in their head.'],
      ['Only what you need', '03 · FIT', 'Most small businesses don’t need a full suite. I build the one module that matters.'],
      ['Transparency', '04 · TRUST', 'I build systems that make the truth easy to see, so nobody has to guess.'],
      ['Ownership', '05 · FOLLOW-THROUGH', 'From wireframe to production monitoring, I stay with it.']
    ];
  }

  var vals = getVals();

  var vcur = -1,
      cap = document.getElementById('vcap'),
      cards = [],
      cur = 0,
      offset = 0,
      targetVal = null,
      reducedMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches,
      home = document.getElementById('home');

  function setVal(v, force) {
    if ((v === vcur && !force) || !cap) return;
    vcur = v;
    vals = getVals();
    var c = vals[v];
    if (!c) return;
    cap.innerHTML = '<span class="mono">' + c[1] + '</span><h3>' + c[0] + '</h3><p>' + c[2] + '</p>';
    cap.classList.remove('vin');
    void cap.offsetWidth;
    cap.classList.add('vin');
  }

  function selectCard(d) {
    var cardA = +d.getAttribute('data-a');
    // Calculate shortest angular distance from the apex (top center)
    var a = ((((cardA + cur) % 360) + 540) % 360) - 180;
    var targetRotation = cur - a;
    offset = targetRotation - (-window.scrollY * 0.045);
    targetVal = +d.getAttribute('data-v');
    setVal(targetVal);

    if (reducedMotion) {
      cur = targetRotation;
      draw();
    }
  }

  // Clear targeted lock when user manually scrolls or touches
  window.addEventListener('wheel', function() {
    targetVal = null;
  }, { passive: true });

  window.addEventListener('touchmove', function() {
    targetVal = null;
  }, { passive: true });

  for (var i = 0; i < 15; i++) {
    var v = (i + 3) % 5,
        c = vals[v],
        d = document.createElement('div');
    d.className = 'oc';
    d.setAttribute('role', 'button');
    d.setAttribute('tabindex', '0');
    d.setAttribute('aria-label', c[0] + ' - ' + c[1]);
    d.innerHTML = c[0] + '<small>' + c[1] + '</small>';
    d.setAttribute('data-v', v);
    d.setAttribute('data-a', i * 24 - 48);
    d.style.setProperty('--a', (i * 24 - 48) + 'deg');

    (function(cardEl) {
      cardEl.addEventListener('click', function(e) {
        e.stopPropagation();
        selectCard(cardEl);
      });
      cardEl.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectCard(cardEl);
        }
      });
    })(d);

    wheel.appendChild(d);
    cards.push(d);
  }

  function draw() {
    wheel.style.transform = 'rotate(' + cur + 'deg)';
    cards.forEach(function(d) {
      var a = ((((+d.getAttribute('data-a')) + cur) % 360) + 540) % 360 - 180;
      var h = Math.abs(a) < 12;
      d.classList.toggle('hot', h);
      if (h) {
        var v = +d.getAttribute('data-v');
        if (targetVal !== null) {
          if (v === targetVal) {
            targetVal = null;
          }
        } else {
          setVal(v);
        }
      }
    });
  }

  function tick() {
    if (home && home.classList.contains('on')) {
      var scrollTarget = -window.scrollY * 0.045 + offset;
      cur += (scrollTarget - cur) * 0.08;
      if (Math.abs(scrollTarget - cur) < 0.2) {
        targetVal = null;
      }
      draw();
    }
    requestAnimationFrame(tick);
  }

  window.addEventListener('tv:langchange', function() {
    vals = getVals();
    cards.forEach(function(d) {
      var v = +d.getAttribute('data-v');
      var c = vals[v];
      if (c) {
        d.innerHTML = c[0] + '<small>' + c[1] + '</small>';
        d.setAttribute('aria-label', c[0] + ' - ' + c[1]);
      }
    });
    if (vcur >= 0) setVal(vcur, true);
  });

  draw();
  if (!reducedMotion) {
    requestAnimationFrame(tick);
  }
})();
