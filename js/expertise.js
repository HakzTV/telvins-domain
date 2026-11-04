/* Expertise: layered stack + editorial rows + tool ribbons.
   The stack, the rows and the ribbons stay in sync. Ribbons are built from
   the chips inside each row, so add a tool to a row and it appears there too. */
(function () {
  var view = document.getElementById('expertise');
  if (!view) return;

  var slabs = [].slice.call(view.querySelectorAll('.xs-slab'));
  var rows = [].slice.call(view.querySelectorAll('.xs-row'));
  var rib = view.querySelector('#xs-rib');
  var layout = view.querySelector('.xs-layout');
  if (!slabs.length || !rows.length) return;

  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cur = 0;
  var auto = !still;
  var paused = false;

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  }

  function buildRibbons() {
    if (!rib) return;
    var all = [];
    rows.forEach(function (row, i) {
      [].forEach.call(row.querySelectorAll('.chips span'), function (s) {
        all.push({ t: s.textContent, l: i });
      });
    });
    [0, 1].forEach(function (k) {
      var arr = k ? all.slice().reverse() : all;
      var html = arr.map(function (a) {
        return '<span data-l="' + a.l + '">' + esc(a.t) + '</span>';
      }).join('');
      var tr = document.createElement('div');
      tr.className = 'xs-tr' + (k ? ' xs-r' : '');
      tr.innerHTML = '<div class="xs-tk">' + html + html + '</div>';
      rib.appendChild(tr);
    });
  }

  function pick(i, user) {
    if (user) auto = false;
    cur = i;
    slabs.forEach(function (b, j) {
      b.classList.toggle('on', j === i);
      b.setAttribute('aria-pressed', j === i ? 'true' : 'false');
    });
    rows.forEach(function (r, j) {
      r.classList.toggle('on', j === i);
      r.querySelector('.xs-rh').setAttribute('aria-expanded', j === i ? 'true' : 'false');
    });
    if (rib) {
      [].forEach.call(rib.querySelectorAll('span'), function (s) {
        s.classList.toggle('on', +s.getAttribute('data-l') === i);
      });
    }
  }

  slabs.forEach(function (b, i) {
    b.addEventListener('click', function () { pick(i, true); });
  });
  rows.forEach(function (r, i) {
    r.querySelector('.xs-rh').addEventListener('click', function () { pick(i, true); });
  });

  if (layout) {
    layout.addEventListener('pointerenter', function () { paused = true; });
    layout.addEventListener('pointerleave', function () { paused = false; });
    layout.addEventListener('focusin', function () { auto = false; });
  }

  buildRibbons();
  pick(0, false);

  if (!still) {
    setInterval(function () {
      if (!auto || paused || document.hidden || !view.offsetHeight) return;
      pick((cur + 1) % rows.length, false);
    }, 5000);
  }
})();