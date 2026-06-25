/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║     FRIENDSHIP DAY 2026 — Canvas Background Engine          ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Renders on a full-screen canvas (z-index below everything):
 *  1. Gentle constellation lines connecting star particles
 *  2. Warm-toned star-field with soft twinkle
 *  3. Floating translucent heart shapes
 *  4. Mouse-driven parallax on the CSS glow blobs
 *  5. Soft vignette overlay
 */

(function () {
  'use strict';

  /* ─── Palette (warm friendship tones) ─────────────────────── */
  const P = {
    gold:     [245, 158, 11],
    orange:   [251, 146, 60],
    pink:     [244, 114, 182],
    rose:     [225, 29, 72],
    lavender: [192, 132, 252],
    peach:    [253, 186, 116],
    white:    [254, 243, 226],
  };

  function rgba(color, a) {
    return `rgba(${color[0]},${color[1]},${color[2]},${a})`;
  }

  /* ─── Canvas setup ─────────────────────────────────────────── */
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas-3d';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:0',
    'pointer-events:none',
    'display:block',
  ].join(';');

  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, CX = 0, CY = 0;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    CX = W / 2;
    CY = H / 2;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* ─── Mouse parallax ───────────────────────────────────────── */
  let mx = 0, my = 0;
  let smx = 0, smy = 0;

  window.addEventListener('mousemove', function (e) {
    mx = (e.clientX / W - 0.5) * 2;
    my = (e.clientY / H - 0.5) * 2;
  }, { passive: true });

  function updateCSSParallax() {
    var glows = document.querySelectorAll('.bg-glow');
    glows.forEach(function (g, i) {
      var depth = (i + 1) * 15;
      g.style.transform = 'translate(' + (smx * depth) + 'px, ' + (smy * depth) + 'px)';
    });
  }

  /* ─── 1. CONSTELLATION STARS ─────────────────────────────── */
  var NUM_STARS = 120;
  var CONNECT_DIST = 150;

  function newStar() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.5) * 12,
      size: 1 + Math.random() * 2.5,
      color: [P.gold, P.pink, P.lavender, P.peach, P.white][Math.floor(Math.random() * 5)],
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.5 + Math.random() * 1.5,
    };
  }

  var stars = [];
  for (var si = 0; si < NUM_STARS; si++) stars.push(newStar());

  function drawConstellations(dt) {
    // Update positions
    stars.forEach(function (s) {
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.twinkle += s.twinkleSpeed * dt;

      // Wrap around edges
      if (s.x < 0) s.x = W;
      if (s.x > W) s.x = 0;
      if (s.y < 0) s.y = H;
      if (s.y > H) s.y = 0;
    });

    // Draw connections
    for (var i = 0; i < stars.length; i++) {
      for (var j = i + 1; j < stars.length; j++) {
        var dx = stars[i].x - stars[j].x;
        var dy = stars[i].y - stars[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECT_DIST) {
          var alpha = (1 - dist / CONNECT_DIST) * 0.12;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = rgba(P.gold, alpha);
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // Draw star dots
    stars.forEach(function (s) {
      var alpha = 0.3 + 0.4 * Math.sin(s.twinkle);
      var r = s.size * (0.8 + 0.2 * Math.sin(s.twinkle));

      ctx.beginPath();
      ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
      ctx.fillStyle = rgba(s.color, alpha);
      ctx.fill();

      // Soft glow on larger stars
      if (s.size > 2) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, r * 3, 0, Math.PI * 2);
        var grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 3);
        grad.addColorStop(0, rgba(s.color, alpha * 0.3));
        grad.addColorStop(1, rgba(s.color, 0));
        ctx.fillStyle = grad;
        ctx.fill();
      }
    });
  }

  /* ─── 2. FLOATING HEARTS (Canvas) ──────────────────────────── */
  var NUM_HEARTS = 8;
  var hearts = [];

  function newHeart() {
    return {
      x: Math.random() * W,
      y: H + 50 + Math.random() * 200,
      size: 8 + Math.random() * 18,
      speed: 20 + Math.random() * 35,
      wobble: Math.random() * Math.PI * 2,
      wobbleAmp: 20 + Math.random() * 40,
      wobbleSpeed: 0.3 + Math.random() * 0.6,
      rotation: (Math.random() - 0.5) * 0.5,
      color: [P.gold, P.pink, P.lavender, P.rose, P.peach][Math.floor(Math.random() * 5)],
      alpha: 0.08 + Math.random() * 0.12,
    };
  }

  for (var hi = 0; hi < NUM_HEARTS; hi++) {
    var h = newHeart();
    h.y = Math.random() * H; // randomize starting position
    hearts.push(h);
  }

  function drawHeartShape(cx, cy, size, rotation) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.beginPath();
    var s = size / 16;
    ctx.moveTo(0, -s * 4);
    ctx.bezierCurveTo(s * 8, -s * 16, s * 20, -s * 4, 0, s * 12);
    ctx.moveTo(0, -s * 4);
    ctx.bezierCurveTo(-s * 8, -s * 16, -s * 20, -s * 4, 0, s * 12);
    ctx.restore();
  }

  function drawFloatingHearts(dt, t) {
    hearts.forEach(function (h) {
      h.y -= h.speed * dt;
      h.wobble += h.wobbleSpeed * dt;

      if (h.y < -60) {
        Object.assign(h, newHeart());
      }

      var wx = h.x + Math.sin(h.wobble) * h.wobbleAmp;
      var rot = h.rotation + Math.sin(t * 0.5) * 0.15;

      drawHeartShape(wx, h.y, h.size, rot);
      ctx.fillStyle = rgba(h.color, h.alpha);
      ctx.fill();
    });
  }

  /* ─── 3. GENTLE RINGS (friendship circles) ─────────────────── */
  var NUM_RINGS = 3;
  var rings = [];
  for (var ri = 0; ri < NUM_RINGS; ri++) {
    rings.push({
      x: W * (0.2 + Math.random() * 0.6),
      y: H * (0.2 + Math.random() * 0.6),
      radius: 80 + Math.random() * 160,
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.3,
      color: [P.gold, P.pink, P.lavender][ri],
    });
  }

  function drawRings(t) {
    rings.forEach(function (ring) {
      var pulse = 1 + Math.sin(t * ring.speed + ring.phase) * 0.15;
      var r = ring.radius * pulse;
      var alpha = 0.04 + Math.sin(t * ring.speed * 0.5 + ring.phase) * 0.02;

      ctx.beginPath();
      ctx.arc(ring.x + smx * 20, ring.y + smy * 20, r, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(ring.color, alpha);
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Second concentric ring
      ctx.beginPath();
      ctx.arc(ring.x + smx * 20, ring.y + smy * 20, r * 0.7, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(ring.color, alpha * 0.5);
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });
  }

  /* ─── 4. VIGNETTE ───────────────────────────────────────────── */
  function drawOverlay() {
    var vg = ctx.createRadialGradient(CX, CY, 0, CX, CY, Math.max(W, H) * 0.75);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(0.65, 'rgba(15,10,20,0)');
    vg.addColorStop(1, 'rgba(15,10,20,0.75)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);
  }

  /* ─── Animation loop ────────────────────────────────────────── */
  var lastTime = 0;

  function animate(ts) {
    var dt = Math.min((ts - lastTime) / 1000, 0.05);
    lastTime = ts;
    var t = ts / 1000;

    smx += (mx - smx) * 0.04;
    smy += (my - smy) * 0.04;
    updateCSSParallax();

    ctx.clearRect(0, 0, W, H);

    drawRings(t);
    drawConstellations(dt);
    drawFloatingHearts(dt, t);
    drawOverlay();

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(function (ts) {
    lastTime = ts;
    requestAnimationFrame(animate);
  });

})();
