/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║       WORKSHOP 2026 — 3D Canvas Background Engine           ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Renders on a full-screen canvas (z-index below everything):
 *  1. Perspective tunnel grid rushing toward the viewer
 *  2. Star-field particles with depth & twinkle
 *  3. Floating wireframe polyhedra (tetra / octa / icosa variants)
 *  4. Mouse-driven parallax on the CSS glow blobs
 *  5. Scanline / vignette overlay for cinematic depth
 */

(function () {
  'use strict';

  /* ─── Palette (matches CSS vars) ──────────────────────────── */
  const P = {
    violet: [124, 58, 237],
    cyan: [6, 182, 212],
    pink: [236, 72, 153],
    amber: [245, 158, 11],
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
      var depth = (i + 1) * 18;
      g.style.transform = 'translate(' + (smx * depth) + 'px, ' + (smy * depth) + 'px)';
    });
  }

  /* ─── 3-D math helpers ─────────────────────────────────────── */
  var FOV = 500;

  function project(x, y, z) {
    var scale = FOV / (FOV + z);
    return { x: CX + x * scale, y: CY + y * scale, scale: scale };
  }

  function rotX(v, a) {
    var c = Math.cos(a), s = Math.sin(a);
    return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
  }
  function rotY(v, a) {
    var c = Math.cos(a), s = Math.sin(a);
    return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
  }
  function rotZ(v, a) {
    var c = Math.cos(a), s = Math.sin(a);
    return [v[0] * c - v[1] * s, v[0] * s + v[1] * c, v[2]];
  }

  /* ─── 1. TUNNEL GRID ───────────────────────────────────────── */
  var GRID = {
    cols: 8,
    rows: 8,
    depth: 1800,
    speed: 90,
    offset: 0,
    cellZ: 225,
  };

  function drawGrid(dt) {
    GRID.offset = (GRID.offset + GRID.speed * dt) % GRID.cellZ;

    var halfW = W * 0.55;
    var halfH = H * 0.55;

    ctx.save();

    for (var slice = 0; slice <= GRID.rows + 1; slice++) {
      var z = GRID.depth - (slice * GRID.cellZ - GRID.offset);
      if (z <= 0) continue;
      var p = FOV / (FOV + z);
      var y1 = CY - halfH * p;
      var y2 = CY + halfH * p;
      var x1 = CX - halfW * p;
      var x2 = CX + halfW * p;

      var fade = Math.min(1, (GRID.depth - z) / GRID.depth * 1.6);
      var brightness = fade * 0.28;

      ctx.beginPath();
      for (var r = 0; r <= GRID.rows; r++) {
        var t = r / GRID.rows;
        var ly = y1 + (y2 - y1) * t;
        ctx.moveTo(x1, ly);
        ctx.lineTo(x2, ly);
      }
      for (var c = 0; c <= GRID.cols; c++) {
        var tc = c / GRID.cols;
        var lx = x1 + (x2 - x1) * tc;
        ctx.moveTo(lx, y1);
        ctx.lineTo(lx, y2);
      }
      ctx.strokeStyle = rgba(P.violet, brightness);
      ctx.lineWidth = 0.7;
      ctx.stroke();
    }

    /* Converging diagonal lines to vanishing point */
    var corners = [[0, 0], [W, 0], [W, H], [0, H]];
    ctx.beginPath();
    corners.forEach(function (corner) {
      ctx.moveTo(corner[0], corner[1]);
      ctx.lineTo(CX, CY);
    });
    ctx.strokeStyle = rgba(P.violet, 0.04);
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.restore();
  }

  /* ─── 2. STAR PARTICLES ─────────────────────────────────────── */
  var NUM_STARS = 180;

  function newStar(randomZ) {
    return {
      x: (Math.random() - 0.5) * 3000,
      y: (Math.random() - 0.5) * 2000,
      z: randomZ ? Math.random() * 1800 : 1800,
      size: 0.5 + Math.random() * 1.5,
      color: [P.violet, P.cyan, P.pink, [255, 255, 255]][Math.floor(Math.random() * 4)],
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.8 + Math.random() * 2,
    };
  }

  var stars = [];
  for (var si = 0; si < NUM_STARS; si++) stars.push(newStar(true));

  var STAR_SPEED = 220;

  function drawStars(dt) {
    stars.forEach(function (s) {
      s.z -= STAR_SPEED * dt;
      s.twinkle += s.twinkleSpeed * dt;

      if (s.z <= 1) { Object.assign(s, newStar(false)); return; }

      var proj = project(s.x, s.y, s.z);
      var sx = proj.x, sy = proj.y, scale = proj.scale;

      if (sx < -10 || sx > W + 10 || sy < -10 || sy > H + 10) {
        Object.assign(s, newStar(false)); return;
      }

      var r = s.size * scale;
      var alpha = Math.min(1, scale * 1.2) * (0.5 + 0.5 * Math.sin(s.twinkle));

      ctx.beginPath();
      ctx.arc(sx, sy, Math.max(0.3, r), 0, Math.PI * 2);
      ctx.fillStyle = rgba(s.color, alpha);
      ctx.fill();

      if (scale > 0.55) {
        var prevZ = s.z + STAR_SPEED * dt;
        var pp = project(s.x, s.y, prevZ);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(pp.x, pp.y);
        ctx.strokeStyle = rgba(s.color, alpha * 0.35);
        ctx.lineWidth = r * 0.6;
        ctx.stroke();
      }
    });
  }

  /* ─── 3. WIREFRAME POLYHEDRA ────────────────────────────────── */
  function makeOctahedron(r) {
    var v = [
      [r, 0, 0], [-r, 0, 0], [0, r, 0], [0, -r, 0], [0, 0, r], [0, 0, -r]
    ];
    var e = [
      [0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [2, 5], [3, 4], [3, 5]
    ];
    return { v: v, e: e };
  }

  function makeIcosahedron(r) {
    var t = (1 + Math.sqrt(5)) / 2;
    var n = Math.sqrt(1 + t * t);
    var a = r / n, b = r * t / n;
    var v = [
      [-a, b, 0], [a, b, 0], [-a, -b, 0], [a, -b, 0],
      [0, -a, b], [0, a, b], [0, -a, -b], [0, a, -b],
      [b, 0, -a], [b, 0, a], [-b, 0, -a], [-b, 0, a]
    ];
    var e = [
      [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
      [1, 5], [1, 9], [1, 8], [1, 7],
      [2, 11], [2, 3], [2, 6], [2, 10],
      [3, 4], [3, 9], [3, 6],
      [4, 5], [4, 11], [4, 9],
      [5, 11],
      [6, 7], [6, 10], [6, 8],
      [7, 8], [8, 9], [9, 4],
      [10, 2], [10, 11]
    ];
    return { v: v, e: e };
  }

  function makeCube(r) {
    var h = r * 0.7;
    var v = [
      [-h, -h, -h], [h, -h, -h], [h, h, -h], [-h, h, -h],
      [-h, -h, h], [h, -h, h], [h, h, h], [-h, h, h]
    ];
    var e = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];
    return { v: v, e: e };
  }

  function makeTetrahedron(r) {
    var s = r;
    var v = [[s, s, s], [-s, -s, s], [-s, s, -s], [s, -s, -s]];
    var e = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
    return { v: v, e: e };
  }

  var SHAPE_FACTORIES = [makeIcosahedron, makeOctahedron, makeCube, makeTetrahedron, makeIcosahedron, makeCube];
  var SHAPE_COLORS = [P.violet, P.cyan, P.pink, P.cyan, P.violet, P.pink];

  var NUM_POLY = 6;
  var polyhedra = [];
  for (var pi = 0; pi < NUM_POLY; pi++) {
    var size = 55 + Math.random() * 80;
    polyhedra.push({
      mesh: SHAPE_FACTORIES[pi % SHAPE_FACTORIES.length](size),
      color: SHAPE_COLORS[pi % SHAPE_COLORS.length],
      wx: (Math.random() - 0.5) * W * 1.4,
      wy: (Math.random() - 0.5) * H * 1.2,
      wz: 200 + Math.random() * 1400,
      rx: Math.random() * Math.PI * 2,
      ry: Math.random() * Math.PI * 2,
      rz: Math.random() * Math.PI * 2,
      vrx: (Math.random() - 0.5) * 0.6,
      vry: (Math.random() - 0.5) * 0.8,
      vrz: (Math.random() - 0.5) * 0.4,
      floatPhase: Math.random() * Math.PI * 2,
      floatAmp: 15 + Math.random() * 25,
      floatSpeed: 0.3 + Math.random() * 0.5,
      driftZ: 25 + Math.random() * 40,
    });
  }

  function drawPolyhedra(dt, t) {
    polyhedra.forEach(function (poly) {
      poly.wz -= poly.driftZ * dt;
      if (poly.wz < -200) {
        poly.wz = 1500 + Math.random() * 300;
        poly.wx = (Math.random() - 0.5) * W * 1.4;
        poly.wy = (Math.random() - 0.5) * H * 1.2;
      }

      poly.rx += poly.vrx * dt;
      poly.ry += poly.vry * dt;
      poly.rz += poly.vrz * dt;

      var floatY = Math.sin(t * poly.floatSpeed + poly.floatPhase) * poly.floatAmp;

      var projected = poly.mesh.v.map(function (vert) {
        var rv = rotX(vert, poly.rx);
        rv = rotY(rv, poly.ry);
        rv = rotZ(rv, poly.rz);
        var wz = poly.wz + rv[2];
        if (wz <= 0) return null;
        return project(poly.wx + rv[0], poly.wy + rv[1] + floatY, wz);
      });

      var baseAlpha = Math.min(0.7, FOV / (FOV + poly.wz) * 2.5);
      if (baseAlpha < 0.02) return;

      var lw = 0.8 * (FOV / (FOV + poly.wz)) * 2.2;

      ctx.save();
      ctx.strokeStyle = rgba(poly.color, baseAlpha * 0.9);
      ctx.lineWidth = lw;
      ctx.shadowColor = rgba(poly.color, baseAlpha * 0.6);
      ctx.shadowBlur = 8;

      poly.mesh.e.forEach(function (edge) {
        var a = projected[edge[0]];
        var b = projected[edge[1]];
        if (!a || !b) return;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      ctx.shadowBlur = 0;
      projected.forEach(function (pp) {
        if (!pp) return;
        var r = Math.max(0.5, 2 * pp.scale);
        ctx.beginPath();
        ctx.arc(pp.x, pp.y, r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(poly.color, baseAlpha);
        ctx.fill();
      });

      ctx.restore();
    });
  }

  /* ─── 4. ENERGY RINGS ──────────────────────────────────────── */
  var NUM_RINGS = 5;
  var rings = [];
  for (var ri = 0; ri < NUM_RINGS; ri++) {
    rings.push({
      z: ri * (1800 / NUM_RINGS),
      radius: 250 + ri * 80,
      color: ri % 2 === 0 ? P.cyan : P.violet,
      speed: 120,
    });
  }

  function drawRings(dt) {
    rings.forEach(function (ring) {
      ring.z -= ring.speed * dt;
      if (ring.z < 0) ring.z = 1800;

      var proj = project(0, 0, ring.z);
      if (proj.scale <= 0) return;

      var rx2 = ring.radius * proj.scale;
      var ry2 = ring.radius * proj.scale * 0.35;
      var alpha = Math.min(0.4, proj.scale * 0.6);

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(proj.x, proj.y, rx2, ry2, 0, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(ring.color, alpha);
      ctx.lineWidth = 1.2 * proj.scale;
      ctx.shadowColor = rgba(ring.color, alpha * 0.8);
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.restore();
    });
  }

  /* ─── 5. VIGNETTE ───────────────────────────────────────────── */
  function drawOverlay() {
    var vg = ctx.createRadialGradient(CX, CY, 0, CX, CY, Math.max(W, H) * 0.75);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(0.6, 'rgba(4,4,15,0)');
    vg.addColorStop(1, 'rgba(4,4,15,0.80)');
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

    drawGrid(dt);
    drawRings(dt);
    drawStars(dt);
    drawPolyhedra(dt, t);
    drawOverlay();

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(function (ts) {
    lastTime = ts;
    requestAnimationFrame(animate);
  });

})();
