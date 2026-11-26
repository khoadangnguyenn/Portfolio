// Point cloud of the profile photo (depth from Depth Anything V2 Small, relative depth only).
// Data: assets/data/face-cloud.bin = uint32 N, int16 xyz[N*3] (scale 1/20000), uint8 rgb[N*3].
//
// 2026-11-25 (user request): the full-screen arrival intro is OFF (intro = false below; code kept).
// Homepage (.face-stage) now: clicking the avatar plays the same assembly INSIDE the avatar circle
// (assemble 1.4 s, one sway 1.2 s, fade back to the photo 0.3 s). Old full-screen version, for reference:
// the cloud assembles full screen on an overlay, sways once,
// then flies down and shrinks onto the avatar circle; the overlay fades and the photo takes its place.
// Click / key / wheel skips to the end. Plays once per browser session; clicking the avatar replays it.
// Sidebar avatar (.avatar-swap, old layout): the cloud plays inside the avatar on hover.
// Homepage: hovering the avatar with a mouse swaps the photo for the cloud, which turns
// toward the pointer (max ~20° yaw, ~14° pitch) on a light spring; leaving turns it back and the photo returns.
// Reduced motion: photo only.
// 2026-11-25: intro cut from 6.1 s to 2.5 s (assemble 1.4, no sway, fly home 0.8, fade 0.3). Sources:
// NN/g, Laubheimer 2020 ("At 500ms, animations start to feel like a real drag"); Comeau 2025 (novelty wears off fast);
// TheLadders 2012 (a CV gets ~6 s). The sway moved to the hover tilt above. The 2.5 s total is our own choice.
(function () {
  var box = document.querySelector('.face-stage') || document.querySelector('.avatar-swap');
  if (!box) return;
  var img = box.querySelector('img');
  var homeCanvas = box.querySelector('canvas');
  if (!img || !homeCanvas) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var home = box.classList.contains('face-stage'), intro = false;

  var N = 0, tx, ty, tz, sx, sy, sz, cr, cg, cb, delay;
  var canvas, ctx, W = 0, H = 0, dpr = 1, buf = null, zbuf = null, overlay = null;
  var running = false, t0 = 0, skipAt = -1;
  // seconds
  var ASSEMBLE = home ? 1.4 : 2.4, SWAY = home ? 1.2 : 3.2, SHRINK = intro ? 0.8 : 0, FADE = home ? 0.3 : 0.6;
  var LAG = home ? 0.5 : 0.8;   // latest start of a point's flight; each point then flies for ASSEMBLE - LAG

  function load() {
    return fetch(homeCanvas.getAttribute('data-src')).then(function (r) { return r.arrayBuffer(); }).then(function (ab) {
      N = new Uint32Array(ab, 0, 1)[0];
      var q = new Int16Array(ab, 4, N * 3), c = new Uint8Array(ab, 4 + N * 6, N * 3);
      tx = new Float32Array(N); ty = new Float32Array(N); tz = new Float32Array(N);
      sx = new Float32Array(N); sy = new Float32Array(N); sz = new Float32Array(N);
      cr = new Uint8Array(N); cg = new Uint8Array(N); cb = new Uint8Array(N); delay = new Float32Array(N);
      for (var i = 0; i < N; i++) {
        tx[i] = q[3 * i] / 20000; ty[i] = q[3 * i + 1] / 20000; tz[i] = q[3 * i + 2] / 20000 - 0.16;
        var dn = Math.max(0, Math.min(1, (tz[i] + 0.16) / 0.32)), sh = 0.62 + 0.38 * Math.pow(dn, 0.6);
        cr[i] = Math.min(255, c[3 * i] * sh); cg[i] = Math.min(255, c[3 * i + 1] * sh); cb[i] = Math.min(255, c[3 * i + 2] * sh);
      }
    });
  }

  function setup() {
    if (intro) {
      overlay = document.createElement('div');
      overlay.className = 'face-intro';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.innerHTML = '<canvas></canvas><span class="face-intro__skip">click to skip</span>';
      document.body.appendChild(overlay);
      canvas = overlay.querySelector('canvas');
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);   // full-screen buffer: cap the pixel count
      W = Math.round(innerWidth * dpr); H = Math.round(innerHeight * dpr);
      var end = function () { if (running && skipAt < 0) skipAt = 1; };
      overlay.addEventListener('click', end);
      window.addEventListener('keydown', end, { once: true });
      window.addEventListener('wheel', end, { once: true, passive: true });
      window.addEventListener('touchmove', end, { once: true, passive: true });
    } else {
      canvas = homeCanvas;
      var r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(2, Math.round(r.width * dpr)); H = Math.max(2, Math.round(r.height * dpr));
    }
    canvas.width = W; canvas.height = H;
    ctx = canvas.getContext('2d');
    buf = ctx.createImageData(W, H); zbuf = new Float32Array(W * H);
  }

  function scatter() {
    for (var i = 0; i < N; i++) {
      // start on a loose shell around the head, so points sweep inward from every side
      var u = Math.random() * 2 - 1, a = Math.random() * 6.2832, r = 0.9 + Math.random() * 0.9, s = Math.sqrt(1 - u * u);
      sx[i] = r * s * Math.cos(a); sy[i] = r * u; sz[i] = r * s * Math.sin(a);
      delay[i] = (0.55 * Math.min(1, Math.hypot(tx[i], ty[i]) / 0.55) + Math.random() * 0.25) * LAG / 0.8;   // centre lands first
    }
  }

  function easeOut(x) { return x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.pow(1 - x, 3); }
  function easeInOut(x) { return x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

  // where the cloud is drawn: projection scale S (canvas pixels per unit) and centre (cx, cy)
  function view(t) {
    if (!intro) return { S: W, cx: W / 2, cy: H / 2, k: 0 };
    var big = Math.min(W, H) * 0.92;
    var r = img.getBoundingClientRect();                       // the avatar circle, in viewport pixels
    var sS = r.width * dpr, sx0 = (r.left + r.width / 2) * dpr, sy0 = (r.top + r.height / 2) * dpr;
    var k = easeInOut((t - ASSEMBLE - SWAY) / SHRINK);
    return { S: big + (sS - big) * k, cx: W / 2 + (sx0 - W / 2) * k, cy: H / 2 + (sy0 - H / 2) * k, k: k };
  }

  function frame(now) {
    if (!running) return;
    var t = (now - t0) / 1000, end = ASSEMBLE + SWAY + SHRINK;
    if (skipAt > 0 && t < end) { t0 -= (end - t) * 1000; t = end; skipAt = 0; }   // jump to the landed state
    var d = buf.data; d.fill(0); zbuf.fill(-1e9);
    var sway = t - ASSEMBLE;
    var yaw = SWAY <= 0 || sway <= 0 || sway >= SWAY ? 0 : 0.45 * Math.sin(sway / SWAY * 6.2832);
    var cy = Math.cos(yaw), syw = Math.sin(yaw), v = view(t), S = v.S;
    // splat size follows the point spacing (the cloud was sampled about 280 points across)
    var dot = Math.max(2, Math.ceil(S / 280));
    for (var i = 0; i < N; i++) {
      var k = easeOut((t - delay[i]) / (ASSEMBLE - LAG));
      var swirl = (1 - k) * 2.2, cs = Math.cos(swirl), sn = Math.sin(swirl);
      var x0 = sx[i] * cs - sz[i] * sn, z0 = sx[i] * sn + sz[i] * cs;   // spiral in around the vertical axis
      var x = x0 + (tx[i] - x0) * k, y = sy[i] + (ty[i] - sy[i]) * k, z = z0 + (tz[i] - z0) * k;
      var xr = x * cy + z * syw, zr = -x * syw + z * cy;
      var u = (v.cx + xr * S) | 0, w = (v.cy - y * S) | 0;
      for (var dy = 0; dy < dot; dy++) for (var dx = 0; dx < dot; dx++) {
        var px = u + dx, py = w + dy;
        if (px < 0 || py < 0 || px >= W || py >= H) continue;
        var p = py * W + px;
        if (zr <= zbuf[p]) continue;
        zbuf[p] = zr; p *= 4;
        d[p] = cr[i]; d[p + 1] = cg[i]; d[p + 2] = cb[i]; d[p + 3] = 255;
      }
    }
    ctx.putImageData(buf, 0, 0);

    var f = Math.min(1, Math.max(0, (t - end) / FADE));
    if (intro) {
      overlay.style.setProperty('--bg-alpha', String(1 - v.k));   // backdrop clears while the face flies home
      img.style.opacity = f; canvas.style.opacity = 1 - f;
    } else {
      canvas.style.opacity = t < end ? 1 : 1 - f; img.style.opacity = t < end ? 0 : f;
    }
    if (t < end + FADE) requestAnimationFrame(frame);
    else { running = false; if (overlay) { overlay.remove(); overlay = null; } img.style.opacity = ''; }
  }

  function play() {
    if (running || !N) return;
    tiltStop(true);
    if (intro) window.scrollTo(0, 0);
    setup(); scatter(); skipAt = -1; running = true; t0 = performance.now();
    if (intro) img.style.opacity = 0;
    requestAnimationFrame(frame);
  }

  // ---------- hover tilt on the homepage avatar (mouse / pen only) ----------
  var tc = homeCanvas, tctx = null, tW = 0, tbuf = null, tzb = null, tRaf = 0, tOn = false;
  var yawT = 0, pitT = 0, yawV = 0, pitV = 0, yawS = 0, pitS = 0;
  function tiltSize() {
    var r = tc.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2), s = Math.max(2, Math.round(r.width * d));
    if (s !== tW) { tW = s; tc.width = tc.height = s; tctx = tc.getContext('2d'); tbuf = tctx.createImageData(s, s); tzb = new Float32Array(s * s); }
  }
  function tiltDraw() {
    var d = tbuf.data, S = tW, cyw = Math.cos(yawS), syw = Math.sin(yawS), cp = Math.cos(pitS), sp = Math.sin(pitS);
    var dot = Math.max(2, Math.ceil(S / 280));
    d.fill(0); tzb.fill(-1e9);
    for (var i = 0; i < N; i++) {
      var xr = tx[i] * cyw + tz[i] * syw, zr = -tx[i] * syw + tz[i] * cyw, yr = ty[i] * cp - zr * sp, zz = ty[i] * sp + zr * cp;
      var u = (S / 2 + xr * S) | 0, w = (S / 2 - yr * S) | 0;
      for (var dy = 0; dy < dot; dy++) for (var dx = 0; dx < dot; dx++) {
        var px = u + dx, py = w + dy;
        if (px < 0 || py < 0 || px >= S || py >= S) continue;
        var p = py * S + px;
        if (zz <= tzb[p]) continue;
        tzb[p] = zz; p *= 4;
        d[p] = cr[i]; d[p + 1] = cg[i]; d[p + 2] = cb[i]; d[p + 3] = 255;
      }
    }
    tctx.putImageData(tbuf, 0, 0);
  }
  function tiltLoop() {
    // spring toward the pointer target: stiffness 0.12, damping 0.72 per frame (~0.3 s to settle)
    yawV = (yawV + (yawT - yawS) * 0.12) * 0.72; pitV = (pitV + (pitT - pitS) * 0.12) * 0.72;
    yawS += yawV; pitS += pitV;
    tiltDraw();
    var moving = Math.abs(yawT - yawS) + Math.abs(pitT - pitS) + Math.abs(yawV) + Math.abs(pitV) > 1e-3;
    if (tOn || moving) tRaf = requestAnimationFrame(tiltLoop);
    else tiltStop(false);
  }
  function tiltStop(now) {
    if (tRaf) cancelAnimationFrame(tRaf);
    tRaf = 0; tOn = false; yawS = pitS = yawV = pitV = 0;
    if (home && !running) { tc.style.opacity = ''; img.style.opacity = ''; }
  }
  function tiltInit() {
    box.addEventListener('pointermove', function (e) {
      if (running || (e.pointerType && e.pointerType === 'touch')) return;
      var r = box.getBoundingClientRect();
      yawT = Math.max(-1, Math.min(1, (e.clientX - r.left) / r.width * 2 - 1)) * 0.35;
      pitT = Math.max(-1, Math.min(1, (e.clientY - r.top) / r.height * 2 - 1)) * -0.25;
      if (!tOn) {
        tOn = true; tiltSize();
        tc.style.transition = img.style.transition = 'opacity 200ms ease-out';
        tc.style.opacity = 1; img.style.opacity = 0;
        if (!tRaf) tRaf = requestAnimationFrame(tiltLoop);
      }
    });
    box.addEventListener('pointerleave', function () { tOn = false; yawT = pitT = 0; });
  }

  var seen = false;
  try { seen = sessionStorage.getItem('faceCloudSeen') === '1'; sessionStorage.setItem('faceCloudSeen', '1'); } catch (e) {}
  if (/[?&]intro\b/.test(location.search)) seen = false;   // ?intro forces the intro (testing / sharing)
  if (intro && !seen) document.documentElement.classList.add('face-intro-pending');   // cover the page until the cloud is ready

  load().then(function () {
    if (intro && !seen) play();   // never on the homepage now: the cloud plays only when the avatar is clicked
    if (!home) box.addEventListener('mouseenter', play);
    box.addEventListener('click', play);
    if (home) tiltInit();
  }).catch(function () {}).then(function () {
    document.documentElement.classList.remove('face-intro-pending');
  });
})();
