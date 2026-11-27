// Language switch (2026-11-27). A three-position slide switch, order VI, EN, 日本語. English is the default.
// Keys follow the WAI-ARIA Authoring Practices radio group: Tab enters on the chosen one, arrows move and choose, Space chooses.
// <html data-lang> is first set by the small script in _includes/head/custom.html (before paint); this file handles the buttons,
// remembers the choice in localStorage, keeps <html lang> in step, and translates the tab title when the page title has an entry.
(function () {
  var root = document.documentElement;
  var original = document.title;
  var tt = window.PAGE_TITLES;           // [vi, ja] for page.title, or null
  var st = window.SITE_TITLES;           // [vi, ja] for the site title, or null
  var meta = document.querySelector('meta[property="og:site_name"]');
  var siteEn = meta ? meta.getAttribute('content') : null;
  // seo.html builds "<page title> <separator> <site title>"; the page title is the first part
  var m = original.match(/^(.*?)\s+[|\-–·]\s+/);
  var enTitle = m ? m[1] : null;

  function pick(arr, l) { return l === 'vi' ? arr[0] : arr[1]; }

  function setTitle(l) {
    var t = original;
    if (l !== 'en') {
      if (tt && enTitle) t = t.replace(enTitle, pick(tt, l));
      if (st && siteEn) {
        var i = t.lastIndexOf(siteEn);
        if (i >= 0) t = t.slice(0, i) + pick(st, l) + t.slice(i + siteEn.length);
      }
    }
    document.title = t;
  }

  // The thumb is an empty span; put it under the chosen label by measuring that label (CSS reads --x and --w).
  function place() {
    var track = document.querySelector('.lang-track');
    if (!track) return;
    var on = track.querySelector('[aria-checked="true"]');
    if (!on || !on.offsetWidth) return;            // the bar is hidden, nothing to measure
    track.style.setProperty('--x', on.offsetLeft + 'px');
    track.style.setProperty('--w', on.offsetWidth + 'px');
    track.classList.add('is-ready');
  }

  // The greedy-nav script (jquery.greedy-navigation.js) decides which links fold into the menu from their widths, but it only runs at load and
  // on window resize. The Japanese, Vietnamese and English labels have different widths, so ask it to measure again (it listens for 'resize').
  function refit() { try { window.dispatchEvent(new Event('resize')); } catch (e) {} }

  function apply(l, save) {
    root.setAttribute('data-lang', l);
    root.setAttribute('lang', l);
    if (save) { try { localStorage.setItem('lang', l); } catch (e) {} }
    var btns = document.querySelectorAll('.lang-switch [data-lang]');
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute('data-lang') === l;
      btns[i].setAttribute('aria-checked', on ? 'true' : 'false');
      btns[i].setAttribute('tabindex', on ? '0' : '-1');   // roving tabindex: Tab enters the group on the chosen language
    }
    setTitle(l);
    place();
    refit();
    if (window.requestAnimationFrame) requestAnimationFrame(function () { place(); refit(); });   // the Japanese font changes the label widths one frame later
  }

  function init() {
    var track = document.querySelector('.lang-track');
    if (track) track.classList.add('no-anim');       // first placement must not slide in from the left
    apply(root.getAttribute('data-lang') || 'en', false);
    if (track) {
      void track.offsetWidth;
      setTimeout(function () { track.classList.remove('no-anim'); }, 60);
      if (window.ResizeObserver) new ResizeObserver(place).observe(track); else window.addEventListener('resize', place);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { place(); refit(); });
    }
    var box = document.querySelector('.lang-switch');
    if (!box) return;
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-lang]');
      if (!b) return;
      e.preventDefault();
      apply(b.getAttribute('data-lang'), true);
    });
    box.addEventListener('keydown', function (e) {
      var b = e.target.closest('[data-lang]');
      if (!b) return;
      var all = Array.prototype.slice.call(box.querySelectorAll('[data-lang]'));
      var at = all.indexOf(b), to = -1;
      if (e.key === ' ' || e.key === 'Spacebar') to = at;                                    // Space: choose the focused one
      else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') to = (at + 1) % all.length;  // next, last wraps to first
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') to = (at + all.length - 1) % all.length;
      if (to < 0) return;
      e.preventDefault();
      all[to].focus();
      apply(all[to].getAttribute('data-lang'), true);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
