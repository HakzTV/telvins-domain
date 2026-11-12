/**
 * Contact Form — Formspree submission
 * Endpoint: https://formspree.io/f/xgaapvor
 */
(function () {
  var chooser = document.getElementById('contactChooser');
  var choiceButtons = document.querySelectorAll('[data-contact-choice]');
  var panels = document.querySelectorAll('[data-contact-panel]');
  var activeChoice = null;

  function showPanel(button) {
    var panelId = button.getAttribute('aria-controls');
    var panel = document.getElementById(panelId);

    if (!panel) return;

    activeChoice = button;
    chooser.hidden = true;

    panels.forEach(function (item) {
      item.hidden = item !== panel;
    });

    choiceButtons.forEach(function (item) {
      item.setAttribute('aria-expanded', item === button ? 'true' : 'false');
    });

    var heading = panel.querySelector('h3');
    if (heading) heading.focus();
  }

  choiceButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      showPanel(button);
    });
  });

  document.querySelectorAll('[data-contact-back]').forEach(function (button) {
    button.addEventListener('click', function () {
      panels.forEach(function (panel) {
        panel.hidden = true;
      });
      chooser.hidden = false;
      choiceButtons.forEach(function (choice) {
        choice.setAttribute('aria-expanded', 'false');
      });
      if (activeChoice) activeChoice.focus();
    });
  });

  var form   = document.getElementById('f');
  var btn    = document.getElementById('fsb');
  var status = document.getElementById('fs');

  if (!form) return;

  function showStatus(type, message) {
    status.removeAttribute('hidden');
    status.className = 'form-status form-status--' + type;
    status.textContent = message;
  }

  function setLoading(loading) {
    if (loading) {
      btn.disabled = true;
      btn.innerHTML = '<b>…</b>Sending…';
    } else {
      btn.disabled = false;
      btn.innerHTML = '<b>↗</b>Send message';
    }
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setLoading(true);
    status.setAttribute('hidden', '');

    var data = new FormData(form);

    fetch('https://formspree.io/f/xgaapvor', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(function (res) {
      if (res.ok) {
        showStatus('success', '✓ Message sent — I\'ll get back to you shortly.');
        form.reset();
      } else {
        return res.json().then(function (body) {
          var msg = (body && body.errors && body.errors[0] && body.errors[0].message)
            ? body.errors[0].message
            : 'Something went wrong. Try emailing me directly.';
          showStatus('error', '✕ ' + msg);
        });
      }
    })
    .catch(function () {
      showStatus('error', '✕ Network error — check your connection and try again.');
    })
    .finally(function () {
      setLoading(false);
    });
  });
})();
