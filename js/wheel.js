/**
 * Values Orbit Wheel
 * Generates and animates the rotating wheel of values, synced to page scroll.
 */
(function() {
  var wheel = document.getElementById('wheel');
  if (!wheel) return;

  var vals = [
    ['Honest advice', '01 · HONESTY', 'I hear the idea first. If I think it won’t work, I say so calmly and explain why.'],
    ['Vision first', '02 · CLARITY', 'I don’t build until I understand most of what the client truly sees in their head.'],
    ['Only what you need', '03 · FIT', 'Most small businesses don’t need a full suite. I build the one module that matters.'],
    ['Transparency', '04 · TRUST', 'I build systems that make the truth easy to see, so nobody has to guess.'],
    ['Ownership', '05 · FOLLOW-THROUGH', 'From wireframe to production monitoring, I stay with it.']
  ];

  var vcur = -1,
      cap = document.getElementById('vcap'),
      cards = [],
      cur = 0,
      home = document.getElementById('home');

  function setVal(v) {
    if (v === vcur || !cap) return;
    vcur = v;
    var c = vals[v];
    cap.innerHTML = '<span class="mono">' + c[1] + '</span><h3>' + c[0] + '</h3><p>' + c[2] + '</p>';
    cap.classList.remove('vin');
    void cap.offsetWidth;
    cap.classList.add('vin');
  }

  for (var i = 0; i < 15; i++) {
    var v = (i + 3) % 5,
        c = vals[v],
        d = document.createElement('div');
    d.className = 'oc';
    d.innerHTML = c[0] + '<small>' + c[1] + '</small>';
    d.setAttribute('data-v', v);
    d.setAttribute('data-a', i * 24 - 48);
    wheel.appendChild(d);
    cards.push(d);
  }

  function draw() {
    wheel.style.transform = 'rotate(' + cur + 'deg)';
    cards.forEach(function(d) {
      var a = ((((+d.getAttribute('data-a')) + cur) % 360) + 540) % 360 - 180;
      d.style.setProperty('--a', (+d.getAttribute('data-a')) + 'deg');
      var h = Math.abs(a) < 12;
      d.classList.toggle('hot', h);
      if (h) setVal(+d.getAttribute('data-v'));
    });
  }

  function tick() {
    if (home && home.classList.contains('on')) {
      cur += (-window.scrollY * .045 - cur) * .08;
      draw();
    }
    requestAnimationFrame(tick);
  }

  draw();
  if (!window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    requestAnimationFrame(tick);
  }
})();
