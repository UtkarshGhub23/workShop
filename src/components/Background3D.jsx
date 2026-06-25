import { useEffect, useRef } from "react";

const P = {
  gold: [245, 158, 11],
  orange: [251, 146, 60],
  pink: [244, 114, 182],
  rose: [225, 29, 72],
  lavender: [192, 132, 252],
  peach: [253, 186, 116],
  white: [254, 243, 226],
};

function rgba(color, a) {
  return `rgba(${color[0]},${color[1]},${color[2]},${a})`;
}

export default function Background3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, CX, CY;
    let mx = 0, my = 0, smx = 0, smy = 0;
    let animId;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      CX = W / 2;
      CY = H / 2;
    }
    resize();

    const onResize = () => resize();
    const onMouse = (e) => {
      mx = (e.clientX / W - 0.5) * 2;
      my = (e.clientY / H - 0.5) * 2;
    };
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });

    function updateCSSParallax() {
      document.querySelectorAll(".bg-glow").forEach((g, i) => {
        const depth = (i + 1) * 15;
        g.style.transform = `translate(${smx * depth}px, ${smy * depth}px)`;
      });
    }

    // ── Constellation Stars ──
    const NUM_STARS = 120;
    const CONNECT_DIST = 150;
    const stars = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.5) * 12,
      size: 1 + Math.random() * 2.5,
      color: [P.gold, P.pink, P.lavender, P.peach, P.white][Math.floor(Math.random() * 5)],
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.5 + Math.random() * 1.5,
    }));

    function drawConstellations(dt) {
      stars.forEach((s) => {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.twinkle += s.twinkleSpeed * dt;
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;
      });

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = rgba(P.gold, (1 - dist / CONNECT_DIST) * 0.12);
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      stars.forEach((s) => {
        const alpha = 0.3 + 0.4 * Math.sin(s.twinkle);
        const r = s.size * (0.8 + 0.2 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(s.color, alpha);
        ctx.fill();
        if (s.size > 2) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, r * 3, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 3);
          grad.addColorStop(0, rgba(s.color, alpha * 0.3));
          grad.addColorStop(1, rgba(s.color, 0));
          ctx.fillStyle = grad;
          ctx.fill();
        }
      });
    }

    // ── Floating Hearts ──
    const NUM_HEARTS = 8;
    function newHeart(randomY) {
      return {
        x: Math.random() * W,
        y: randomY ? Math.random() * H : H + 50 + Math.random() * 200,
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
    const hearts = Array.from({ length: NUM_HEARTS }, () => newHeart(true));

    function drawHeartShape(cx, cy, size, rotation) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.beginPath();
      const s = size / 16;
      ctx.moveTo(0, -s * 4);
      ctx.bezierCurveTo(s * 8, -s * 16, s * 20, -s * 4, 0, s * 12);
      ctx.moveTo(0, -s * 4);
      ctx.bezierCurveTo(-s * 8, -s * 16, -s * 20, -s * 4, 0, s * 12);
      ctx.restore();
    }

    function drawFloatingHearts(dt, t) {
      hearts.forEach((h) => {
        h.y -= h.speed * dt;
        h.wobble += h.wobbleSpeed * dt;
        if (h.y < -60) Object.assign(h, newHeart(false));
        const wx = h.x + Math.sin(h.wobble) * h.wobbleAmp;
        const rot = h.rotation + Math.sin(t * 0.5) * 0.15;
        drawHeartShape(wx, h.y, h.size, rot);
        ctx.fillStyle = rgba(h.color, h.alpha);
        ctx.fill();
      });
    }

    // ── Friendship Rings ──
    const rings = [P.gold, P.pink, P.lavender].map((color) => ({
      x: W * (0.2 + Math.random() * 0.6),
      y: H * (0.2 + Math.random() * 0.6),
      radius: 80 + Math.random() * 160,
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.3,
      color,
    }));

    function drawRings(t) {
      rings.forEach((ring) => {
        const pulse = 1 + Math.sin(t * ring.speed + ring.phase) * 0.15;
        const r = ring.radius * pulse;
        const alpha = 0.04 + Math.sin(t * ring.speed * 0.5 + ring.phase) * 0.02;
        ctx.beginPath();
        ctx.arc(ring.x + smx * 20, ring.y + smy * 20, r, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(ring.color, alpha);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(ring.x + smx * 20, ring.y + smy * 20, r * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(ring.color, alpha * 0.5);
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
    }

    // ── Vignette ──
    function drawOverlay() {
      const vg = ctx.createRadialGradient(CX, CY, 0, CX, CY, Math.max(W, H) * 0.75);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(0.65, "rgba(15,10,20,0)");
      vg.addColorStop(1, "rgba(15,10,20,0.75)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);
    }

    // ── Loop ──
    let lastTime = 0;
    function animate(ts) {
      const dt = Math.min((ts - lastTime) / 1000, 0.05);
      lastTime = ts;
      const t = ts / 1000;
      smx += (mx - smx) * 0.04;
      smy += (my - smy) * 0.04;
      updateCSSParallax();
      ctx.clearRect(0, 0, W, H);
      drawRings(t);
      drawConstellations(dt);
      drawFloatingHearts(dt, t);
      drawOverlay();
      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame((ts) => {
      lastTime = ts;
      animId = requestAnimationFrame(animate);
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas-3d"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
