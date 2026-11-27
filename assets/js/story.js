// Scroll reveal for the homepage chapters: each .reveal block fades and rises once when it enters
// the viewport. Off when the visitor asks for reduced motion (content is then shown as is).
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window) || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  document.documentElement.classList.add('js-reveal');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  // threshold 0: a block taller than about 6 screens never gets 15% of itself on screen, so it would stay hidden.
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (el) { io.observe(el); });
})();

// Homepage work list: filter rows by type. Without JS the buttons stay hidden and every row shows.
(function () {
  var box = document.querySelector('.work__filter');
  if (!box) return;
  var btns = box.querySelectorAll('button'), rows = document.querySelectorAll('.work__row'), years = document.querySelectorAll('.work__year');
  box.hidden = false;
  function show(kind) {
    btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.kind === kind)); });
    rows.forEach(function (r) { r.hidden = !(kind === 'all' || r.dataset.kind === kind); });
    years.forEach(function (y) { y.hidden = !y.querySelector('.work__row:not([hidden])'); });
  }
  // 2026-11-25: rows slide to their new place instead of jumping (same-document view transition, 260 ms in motion.css).
  // Names are set only for the length of the transition, so page-to-page transitions still treat the list as one block.
  // Browsers without view transitions, and reduced motion, filter instantly as before.
  var heads = document.querySelectorAll('.work__y');
  function filter(kind) {
    var calm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || calm) { show(kind); return; }
    var named = [].slice.call(rows).concat([].slice.call(heads));
    named.forEach(function (el, i) { el.style.viewTransitionName = 'mo-row-' + i; el.style.viewTransitionClass = 'mo-row'; });
    var vt = document.startViewTransition(function () { show(kind); });
    function clear() { named.forEach(function (el) { el.style.viewTransitionName = ''; el.style.viewTransitionClass = ''; }); }
    vt.finished.then(clear, clear);
  }
  btns.forEach(function (b) { b.addEventListener('click', function () { filter(b.dataset.kind); }); });
})();


// Honors: a link with class rs-proof opens its certificate image in a dialog (2026-11-26). Without JS the link opens the image.
(function () {
  var links = document.querySelectorAll('a.rs-proof');
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;
  var dlg = document.createElement('dialog'); dlg.className = 'rs-lightbox';
  dlg.innerHTML = '<img alt=""><p><span></span><button type="button">Close</button></p>';
  document.body.appendChild(dlg);
  var img = dlg.querySelector('img'), cap = dlg.querySelector('span');
  dlg.querySelector('button').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault(); img.src = a.href; img.alt = 'Certificate: ' + a.dataset.caption; cap.textContent = a.dataset.caption; dlg.showModal();
    });
  });
})();
