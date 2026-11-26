// Motion layer, added 2026-11-25 from the picks on the "Portfolio Motion Menu" page. Styles: assets/css/motion.css.
// Each block does nothing when its elements are missing, so this file loads on every page.
// Reduced motion (prefers-reduced-motion): no theme circle, no pointer light, no JS-driven line; content stays the same.
(function () {
  var root = document.documentElement;
  var mq = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  function still() { return mq.matches; }
  function supports(p, v) { return !!(window.CSS && CSS.supports && CSS.supports(p, v)); }

  // ---------- theme switch: new theme spreads as a circle from the button (view transition) ----------
  // The theme's own toggle (assets/js/_main.js, bundled in main.min.js) still does the switch: we catch the click
  // first, start a view transition, and replay the click inside it so the DOM change is captured.
  var passing = false;
  if (document.getElementById('theme-toggle') && document.startViewTransition) {
    document.addEventListener('click', function (e) {
      if (passing || still()) return;
      var t = e.target && e.target.closest && e.target.closest('#theme-toggle');
      if (!t) return;
      e.stopPropagation(); e.preventDefault();
      var x = e.clientX, y = e.clientY;
      if (!x && !y) { var r = t.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top + r.height / 2; }
      var rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      root.style.setProperty('--mo-x', x + 'px'); root.style.setProperty('--mo-y', y + 'px'); root.style.setProperty('--mo-r', rad + 'px');
      root.classList.add('mo-theme');
      var vt = document.startViewTransition(function () { passing = true; try { t.click(); } finally { passing = false; } });
      vt.finished.then(done, done);
      function done() { root.classList.remove('mo-theme'); }
    }, true);
  }

  // ---------- reading progress on posts: JS fallback where scroll-driven animations are missing ----------
  var bar = document.querySelector('.mo-progress');
  if (bar && !supports('animation-timeline', 'scroll()')) {
    var queued = false;
    var upd = function () {
      queued = false;
      var max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, scrollY / max) : 0) + ')';
    };
    addEventListener('scroll', function () { if (!queued) { queued = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  // ---------- local time next to the location (no animation) ----------
  var clocks = document.querySelectorAll('.rs-clock');
  if (clocks.length && window.Intl) {
    var tick = function () {
      clocks.forEach(function (c) {
        try {
          // 2026-11-26: "17:32 GMT+7" next to a clock icon; the wrapper (.rs-clock-wrap) stays hidden without JS
          var parts = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: c.dataset.tz, timeZoneName: 'short' }).formatToParts(new Date());
          var get = function (t) { var p = parts.filter(function (x) { return x.type === t; })[0]; return p ? p.value : ''; };
          c.textContent = get('hour') + ':' + get('minute') + (get('timeZoneName') ? ' ' + get('timeZoneName') : '');
          var w = c.closest('.rs-clock-wrap'); if (w) w.hidden = false; c.hidden = false;
        } catch (err) {}
      });
    };
    tick(); setInterval(tick, 30000);
  }

  // ---------- soft light following the mouse over the three summary cells ----------
  var glance = document.querySelector('.rs-glance');
  if (glance && window.matchMedia && matchMedia('(hover: hover)').matches) {
    glance.addEventListener('pointermove', function (e) {
      if (still()) return;
      [].forEach.call(glance.children, function (d) {
        var r = d.getBoundingClientRect();
        d.style.setProperty('--mo-mx', (e.clientX - r.left) + 'px'); d.style.setProperty('--mo-my', (e.clientY - r.top) + 'px');
      });
    });
    glance.addEventListener('pointerleave', function () {
      [].forEach.call(glance.children, function (d) { d.style.setProperty('--mo-mx', '-400px'); });
    });
  }

  // ---------- timeline line: JS fallback where view() timelines are missing ----------
  var tls = document.querySelectorAll('.rs-tl--draw');
  if (tls.length && !supports('animation-timeline', 'view()') && !still()) {
    root.classList.add('mo-js');
    var q2 = false;
    var draw = function () {
      q2 = false;
      tls.forEach(function (ol) {
        var r = ol.getBoundingClientRect();
        var p = (innerHeight * 0.8 - r.top) / Math.max(1, r.height * 0.9);
        ol.style.setProperty('--mo-p', String(Math.max(0, Math.min(1, p))));
      });
    };
    addEventListener('scroll', function () { if (!q2) { q2 = true; requestAnimationFrame(draw); } }, { passive: true });
    addEventListener('resize', draw); draw();
  }

  // ---------- preview card on About links to papers / projects / posts ----------
  var pv = document.getElementById('mo-previews');
  if (pv) {
    var data = {};
    try { data = JSON.parse(pv.textContent); } catch (err) {}
    var norm = function (u) { return u.replace(/\/+$/, '') || '/'; };
    var map = {};
    Object.keys(data).forEach(function (k) { map[norm(k)] = data[k]; });
    var card = document.createElement('div');
    card.className = 'mo-card'; card.id = 'mo-card'; card.setAttribute('role', 'tooltip');
    document.body.appendChild(card);
    var timer = 0;
    var hide = function () { clearTimeout(timer); card.classList.remove('is-on'); };
    var showFor = function (a, it) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        card.innerHTML = '';
        var b = document.createElement('b'); b.textContent = it.title; card.appendChild(b);
        if (it.text) { var s = document.createElement('span'); s.textContent = it.text; card.appendChild(s); }
        if (it.kind) { var k = document.createElement('small'); k.textContent = it.kind; card.appendChild(k); }
        var r = a.getBoundingClientRect(), w = Math.min(340, innerWidth - 32);
        card.style.left = Math.max(16, Math.min(r.left + scrollX, scrollX + innerWidth - w - 16)) + 'px';
        card.style.top = (r.bottom + scrollY + 8) + 'px';
        card.classList.add('is-on');
      }, still() ? 0 : 250);
    };
    document.querySelectorAll('.rs-prose a[href]').forEach(function (a) {
      var u;
      try { u = new URL(a.href, location.href); } catch (err) { return; }
      if (u.origin !== location.origin) return;
      var it = map[norm(u.pathname)];
      if (!it) return;
      a.setAttribute('aria-describedby', 'mo-card');
      a.addEventListener('pointerenter', function (e) { if (e.pointerType !== 'touch') showFor(a, it); });
      a.addEventListener('pointerleave', hide);
      a.addEventListener('focus', function () { showFor(a, it); });
      a.addEventListener('blur', hide);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
  }

  // ---------- skills ↔ projects ----------
  var used = document.querySelector('.rs-used');
  if (used) {
    var chips = used.querySelectorAll('a[data-skills]');
    var rows = document.querySelectorAll('.rs-kv [data-skill]');
    var on = function (key) {
      used.classList.add('is-dim');
      rows.forEach(function (r) { r.classList.toggle('is-hot', r.dataset.skill === key); });
      chips.forEach(function (c) { c.classList.toggle('is-hit', (' ' + c.dataset.skills + ' ').indexOf(' ' + key + ' ') >= 0); });
    };
    var off = function () {
      used.classList.remove('is-dim');
      rows.forEach(function (r) { r.classList.remove('is-hot'); });
      chips.forEach(function (c) { c.classList.remove('is-hit'); });
    };
    rows.forEach(function (r) {
      var key = r.dataset.skill;
      if (!used.querySelector('a[data-skills~="' + key + '"]')) return;   // no project tagged with it: leave the row inert
      r.addEventListener('pointerenter', function () { on(key); });
      r.addEventListener('pointerleave', off);
      if (r.tagName === 'DT') { r.tabIndex = 0; r.addEventListener('focus', function () { on(key); }); r.addEventListener('blur', off); }
    });
  }

  // ---------- fisheye post: pinhole vs equidistant, drag the field of view ----------
  document.querySelectorAll('.fe-demo').forEach(function (fig) {
    var cvs = fig.querySelectorAll('canvas[data-model]'), range = fig.querySelector('input'), out = fig.querySelector('output');
    var css = function (v) { return getComputedStyle(fig).getPropertyValue(v).trim(); };
    var render = function () {
      var deg = +range.value, tm = deg / 2 * Math.PI / 180;
      out.textContent = deg + '°';
      cvs.forEach(function (c) {
        var x = c.getContext('2d'), W = c.width, R = W * 0.46, model = c.dataset.model, f;
        x.clearRect(0, 0, W, W);
        x.fillStyle = css('--st-muted'); x.font = Math.round(W / 22) + 'px ' + (css('--st-sans') || 'sans-serif'); x.textAlign = 'center';
        if (model === 'pinhole' && tm >= Math.PI / 2 - 1e-3) {
          x.fillText('No image past 90° off-axis:', W / 2, W / 2 - W / 30);
          x.fillText('tan 90° is infinite', W / 2, W / 2 + W / 20);
          return;
        }
        f = model === 'pinhole' ? R / Math.tan(tm) : R / tm;   // both images fill the same circle at the edge of the view
        x.strokeStyle = css('--st-line'); x.lineWidth = W / 320; x.beginPath(); x.arc(W / 2, W / 2, R, 0, 7); x.stroke();
        x.save(); x.beginPath(); x.arc(W / 2, W / 2, R, 0, 7); x.clip();
        x.strokeStyle = css('--st-kicker'); x.lineWidth = W / 220;
        // a square grid on the plane Z = 1 in front of the camera, lines 0.5 apart
        for (var k = -8; k <= 8; k++) for (var dir = 0; dir < 2; dir++) {
          x.beginPath(); var pen = false;
          for (var s = -80; s <= 80; s += 0.04) {
            var X = dir ? k * 0.5 : s, Y = dir ? s : k * 0.5, th = Math.atan(Math.hypot(X, Y));
            if (th > tm + 0.02) { pen = false; continue; }
            var r = model === 'pinhole' ? f * Math.tan(th) : f * th, ph = Math.atan2(Y, X);
            var u = W / 2 + r * Math.cos(ph), v = W / 2 - r * Math.sin(ph);
            if (pen) x.lineTo(u, v); else { x.moveTo(u, v); pen = true; }
          }
          x.stroke();
        }
        x.restore();
      });
    };
    range.addEventListener('input', render);
    new MutationObserver(render).observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-palette'] });
    render();
  });
})();
