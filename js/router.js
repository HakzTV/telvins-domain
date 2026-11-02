/**
 * SPA Router & View Transitions
 * Handles hash changes (#home, #work, etc.), view transitions, text splitting, and scroll reveal animations.
 */
(function() {
  var views = document.querySelectorAll('.view'),
      links = document.querySelectorAll('#links a, #menu .mn a'),
      names = ['home', 'work', 'about', 'expertise', 'certs', 'system', 'contact'];

  var GS = !!window.gsap && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion:reduce)').matches,
      busy = null;

  function route(o) {
    var h = o || (location.hash || '#home').slice(1);
    if (names.indexOf(h) < 0) h = 'home';

    links.forEach(function(a) {
      a.classList.toggle('on', a.getAttribute('href') === '#' + h);
    });

    document.title = 'Telvin Varfley · ' + h.charAt(0).toUpperCase() + h.slice(1);

    var prev = document.querySelector('.view.on'),
        next = document.getElementById(h);

    function swap() {
      views.forEach(function(v) {
        v.classList.toggle('on', v.id === h);
      });
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (GS) {
        gsap.fromTo(next, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .6, ease: 'power3.out', clearProps: 'opacity,transform' });
      }
      setTimeout(reveal, 60);
    }

    if (busy) {
      busy.kill();
      busy = null;
      if (prev) gsap.set(prev, { clearProps: 'opacity,transform' });
    }

    if (GS && prev && prev !== next) {
      busy = gsap.to(prev, {
        opacity: 0,
        y: -10,
        duration: .2,
        ease: 'power2.in',
        onComplete: function() {
          busy = null;
          gsap.set(prev, { clearProps: 'opacity,transform' });
          swap();
        }
      });
    } else if (prev && prev === next) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      swap();
    }
  }

  var io = null;
  function reveal() {
    var els = document.querySelectorAll('.view.on .rv:not(.in)');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function(e) { e.classList.add('in'); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function(es) {
        es.forEach(function(x) {
          if (x.isIntersecting) {
            x.target.classList.add('in');
            io.unobserve(x.target);
          }
        });
      }, { threshold: .12 });
    }
    els.forEach(function(e) { io.observe(e); });
  }

  function ord(a, b) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1;
  }

  function split(n, out) {
    Array.prototype.slice.call(n.childNodes).forEach(function(c) {
      if (c.nodeType === 3) {
        var f = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(function(p) {
          if (!p) return;
          if (/^\s+$/.test(p)) {
            f.appendChild(document.createTextNode(' '));
            return;
          }
          var w = document.createElement('span'),
              i = document.createElement('span');
          w.className = 'w';
          i.className = 'wi';
          i.textContent = p;
          w.appendChild(i);
          f.appendChild(w);
          out.push(i);
        });
        c.parentNode.replaceChild(f, c);
      } else if (c.nodeType === 1 && c.tagName !== 'BR') {
        split(c, out);
      }
    });
  }

  if (GS) {
    document.documentElement.classList.add('gs');

    var hio = new IntersectionObserver(function(es) {
      es.forEach(function(x) {
        if (!x.isIntersecting) return;
        hio.unobserve(x.target);
        gsap.to(x.target._w, { yPercent: 0, duration: .9, ease: 'power3.out', stagger: .06 });
      });
    }, { threshold: .35 });

    document.querySelectorAll('main h2,footer h2').forEach(function(h) {
      var out = [];
      split(h, out);
      if (!out.length) return;
      h.classList.remove('rv');
      h._w = out;
      gsap.set(out, { yPercent: 115 });
      hio.observe(h);
    });

    var q = [], tm = 0,
        rio = new IntersectionObserver(function(es) {
          es.forEach(function(x) {
            if (x.isIntersecting) {
              rio.unobserve(x.target);
              q.push(x.target);
            }
          });
          if (q.length && !tm) {
            tm = setTimeout(function() {
              tm = 0;
              gsap.to(q.splice(0).sort(ord), { opacity: 1, y: 0, duration: .8, ease: 'power3.out', stagger: .09, clearProps: 'opacity,transform,transition' });
            }, 30);
          }
        }, { threshold: .12 });

    document.querySelectorAll('.rv').forEach(function(e) {
      e.classList.remove('rv');
      e.style.transition = 'none';
      gsap.set(e, { opacity: 0, y: 24 });
      rio.observe(e);
    });
  }

  function go(h) {
    if (('#' + h) !== location.hash) {
      try {
        history.pushState(null, '', '#' + h);
      } catch(e) {
        try { location.hash = h; } catch(e2) {}
      }
    }
    route(h);
  }

  document.addEventListener('click', function(e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var h = a.getAttribute('href').slice(1);
    if (names.indexOf(h) < 0) return;
    e.preventDefault();
    go(h);
  });

  window.addEventListener('hashchange', function() { route(); });
  window.addEventListener('popstate', function() { route(); });
  route();
})();
