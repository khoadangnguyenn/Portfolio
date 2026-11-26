// Palette preview panel. Runs only on localhost, so the published site never shows it.
// The live palette is set by `palette:` in _config.yml; this panel only previews the others.
(function () {
  var host = location.hostname;
  if (host !== 'localhost' && host !== '127.0.0.1') return;
  var list = window.PALETTES || [];
  var root = document.documentElement, KEY = 'palettePreview';
  try { var saved = localStorage.getItem(KEY); if (saved) root.setAttribute('data-palette', saved); } catch (e) {}
  function build() {
    var box = document.createElement('div');
    box.className = 'palette-picker';
    box.innerHTML = '<b>Palette (preview, localhost only)</b>';
    list.forEach(function (p) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = p[1]; b.setAttribute('data-p', p[0]);
      b.addEventListener('click', function () {
        root.setAttribute('data-palette', p[0]);
        try { localStorage.setItem(KEY, p[0]); } catch (e) {}
        mark();
      });
      box.appendChild(b);
    });
    var hide = document.createElement('button');
    hide.type = 'button'; hide.className = 'pp-hide'; hide.textContent = 'hide';
    hide.addEventListener('click', function () { box.classList.toggle('pp-min'); });
    box.appendChild(hide);
    document.body.appendChild(box); mark();
    function mark() { box.querySelectorAll('[data-p]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-p') === root.getAttribute('data-palette')); }); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
