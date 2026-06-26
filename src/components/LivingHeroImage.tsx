import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function LivingHeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for tracking normalized mouse position [-1, 1]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring config for premium, Apple-like smooth lag
  const springConfig = { damping: 40, stiffness: 120, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Maps mouse movement to distinct parallax offsets (Layered Depth Effect)
  const bgX = useTransform(smoothX, [-1, 1], [-5, 5]);
  const bgY = useTransform(smoothY, [-1, 1], [-5, 5]);

  const midX = useTransform(smoothX, [-1, 1], [-2, 2]);
  const midY = useTransform(smoothY, [-1, 1], [-2, 2]);

  const fgX = useTransform(smoothX, [-1, 1], [4, -4]);
  const fgY = useTransform(smoothY, [-1, 1], [4, -4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-auto rounded-[24px] overflow-hidden aspect-[4/5] bg-stone-900 select-none shadow-inner"
      style={{ isolation: "isolate" }}
    >
      {/* Stylesheet for custom cinemagraph animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes cinematicZoom {
              0% { transform: scale(1.025) translate(0px, 0px); }
              50% { transform: scale(1.055) translate(-2px, -1.5px); }
              100% { transform: scale(1.025) translate(0px, 0px); }
            }
            @keyframes swayPlant {
              0%, 100% { transform: rotate(0deg) skewX(0deg); }
              50% { transform: rotate(0.35deg) skewX(0.15deg); }
            }
            @keyframes swayFlowers {
              0%, 100% { transform: rotate(0deg) skewY(0deg); }
              50% { transform: rotate(-0.45deg) skewY(-0.15deg); }
            }
            @keyframes slowBreathing {
              0%, 100% { transform: translateY(0px) scaleY(1); }
              50% { transform: translateY(-0.7px) scaleY(1.0025); }
            }
            @keyframes handMoveLeft {
              0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
              50% { transform: translate(0.35px, -0.15px) rotate(0.2deg); }
            }
            @keyframes handMoveMiddle {
              0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
              50% { transform: translate(-0.25px, 0.35px) rotate(-0.15deg); }
            }
            @keyframes handMoveRight {
              0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
              50% { transform: translate(0.25px, 0.25px) rotate(0.12deg); }
            }
            @keyframes smileLeft {
              0%, 100% { transform: scale(1); }
              50% { transform: scaleX(1.02) scaleY(1.01); }
            }
            @keyframes smileMiddle {
              0%, 100% { transform: scale(1); }
              50% { transform: scaleX(1.02) scaleY(1.015); }
            }
            @keyframes smileRight {
              0%, 100% { transform: scale(1); }
              50% { transform: scaleX(1.02) scaleY(1.01); }
            }
            @keyframes blinkCycleLeft {
              0%, 93%, 95%, 100% { opacity: 0; }
              94% { opacity: 0.85; }
            }
            @keyframes blinkCycleMiddle {
              0%, 90%, 92%, 100% { opacity: 0; }
              91% { opacity: 0.85; }
            }
            @keyframes blinkCycleRight {
              0%, 95%, 97%, 100% { opacity: 0; }
              96% { opacity: 0.85; }
            }
            @keyframes sunlightPulse {
              0%, 100% { opacity: 0.45; transform: scale(1); }
              50% { opacity: 0.7; transform: scale(1.04) translate(2px, 2px); }
            }
            @keyframes floatParticle {
              0% { transform: translateY(105%) translateX(0px); opacity: 0; }
              15% { opacity: 0.65; }
              85% { opacity: 0.65; }
              100% { transform: translateY(-5%) translateX(20px); opacity: 0; }
            }
            .animate-zoom {
              animation: cinematicZoom 24s ease-in-out infinite;
            }
            .animate-sway-plant {
              animation: swayPlant 7.5s ease-in-out infinite;
            }
            .animate-sway-flowers {
              animation: swayFlowers 6.5s ease-in-out infinite;
            }
            .animate-breathing {
              animation: slowBreathing 4.8s ease-in-out infinite;
            }
            .animate-hand-left {
              animation: handMoveLeft 5.5s ease-in-out infinite;
            }
            .animate-hand-middle {
              animation: handMoveMiddle 5.0s ease-in-out infinite;
            }
            .animate-hand-right {
              animation: handMoveRight 5.2s ease-in-out infinite;
            }
            .animate-smile-left {
              animation: smileLeft 5.5s ease-in-out infinite;
            }
            .animate-smile-middle {
              animation: smileMiddle 5.0s ease-in-out infinite;
            }
            .animate-smile-right {
              animation: smileRight 5.2s ease-in-out infinite;
            }
            .animate-blink-left {
              animation: blinkCycleLeft 5.8s infinite;
            }
            .animate-blink-middle {
              animation: blinkCycleMiddle 6.4s infinite;
            }
            .animate-blink-right {
              animation: blinkCycleRight 6.1s infinite;
            }
            .animate-sunlight {
              animation: sunlightPulse 12s ease-in-out infinite;
            }
            .dust-particle {
              position: absolute;
              background-color: rgba(255, 230, 180, 0.4);
              border-radius: 50%;
              pointer-events: none;
              mix-blend-mode: screen;
            }
          `,
        }}
      />

      {/* 1. Cinematic Zoom Container (Shares camera zoom state across all layers) */}
      <div className="absolute inset-[-12px] w-[calc(100%+24px)] h-[calc(100%+24px)] animate-zoom">
        
        {/* Layer A: Base Image (Background Parallax) */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="/hero-crafts.png"
            alt="Friendship Day DIY Workshop Crafts"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Layer B: Swaying Dried Flowers (Clipped) */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <img
            src="/hero-crafts.png"
            className="w-full h-full object-cover animate-sway-flowers"
            style={{
              clipPath: "polygon(4% 20%, 25% 20%, 28% 42%, 22% 52%, 10% 50%, 4% 38%)",
              transformOrigin: "15% 55%",
            }}
          />
        </motion.div>

        {/* Layer C: Swaying Fiddle Leaf Plant (Clipped) */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <img
            src="/hero-crafts.png"
            className="w-full h-full object-cover animate-sway-plant"
            style={{
              clipPath: "polygon(68% 15%, 85% 12%, 88% 30%, 86% 50%, 82% 60%, 72% 58%, 66% 40%)",
              transformOrigin: "75% 60%",
            }}
          />
        </motion.div>

        {/* Layer D: Breathing Characters (Clipped) */}
        <motion.div
          style={{ x: midX, y: midY }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <img
            src="/hero-crafts.png"
            className="w-full h-full object-cover animate-breathing"
            style={{
              clipPath: "polygon(10% 38%, 98% 38%, 98% 100%, 10% 100%)",
            }}
          />
        </motion.div>

        {/* Layer E: Micro-animations - Left Woman's Hand (Clipped) */}
        <motion.div
          style={{ x: midX, y: midY }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <img
            src="/hero-crafts.png"
            className="w-full h-full object-cover animate-hand-left animate-breathing"
            style={{
              clipPath: "polygon(18% 58%, 38% 58%, 38% 74%, 18% 74%)",
              transformOrigin: "28% 66%",
            }}
          />
        </motion.div>

        {/* Layer F: Micro-animations - Middle Woman's Hand (Clipped) */}
        <motion.div
          style={{ x: midX, y: midY }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <img
            src="/hero-crafts.png"
            className="w-full h-full object-cover animate-hand-middle animate-breathing"
            style={{
              clipPath: "polygon(44% 56%, 64% 56%, 64% 74%, 44% 74%)",
              transformOrigin: "54% 65%",
            }}
          />
        </motion.div>

        {/* Layer G: Micro-animations - Right Woman's Hand (Clipped) */}
        <motion.div
          style={{ x: midX, y: midY }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <img
            src="/hero-crafts.png"
            className="w-full h-full object-cover animate-hand-right animate-breathing"
            style={{
              clipPath: "polygon(76% 58%, 96% 58%, 96% 76%, 76% 76%)",
              transformOrigin: "86% 67%",
            }}
          />
        </motion.div>

        {/* Layer H: Micro-animations - Smiling mouths (Subtle stretch) */}
        <motion.div
          style={{ x: midX, y: midY }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Left woman smile */}
          <img
            src="/hero-crafts.png"
            className="absolute inset-0 w-full h-full object-cover animate-smile-left animate-breathing"
            style={{
              clipPath: "polygon(26% 49%, 31% 49%, 31% 53%, 26% 53%)",
              transformOrigin: "28.5% 51%",
            }}
          />
          {/* Middle woman smile */}
          <img
            src="/hero-crafts.png"
            className="absolute inset-0 w-full h-full object-cover animate-smile-middle animate-breathing"
            style={{
              clipPath: "polygon(54% 47.5%, 59% 47.5%, 59% 51.5%, 54% 51.5%)",
              transformOrigin: "56.5% 49.5%",
            }}
          />
          {/* Right woman smile */}
          <img
            src="/hero-crafts.png"
            className="absolute inset-0 w-full h-full object-cover animate-smile-right animate-breathing"
            style={{
              clipPath: "polygon(81% 49.5%, 86% 49.5%, 86% 53.5%, 81% 53.5%)",
              transformOrigin: "83.5% 51.5%",
            }}
          />
        </motion.div>

        {/* Layer I: Micro-animations - Eyelids for Blinking */}
        <motion.div
          style={{ x: midX, y: midY }}
          className="absolute inset-0 w-full h-full pointer-events-none animate-breathing"
        >
          {/* Left Woman Blinks */}
          <div
            className="absolute bg-[#D2B29F]/90 shadow-sm animate-blink-left blur-[0.4px]"
            style={{
              top: "47.7%",
              left: "26.5%",
              width: "1.2%",
              height: "0.25%",
              borderRadius: "50%",
              transform: "rotate(4deg)",
            }}
          />
          <div
            className="absolute bg-[#D2B29F]/90 shadow-sm animate-blink-left blur-[0.4px]"
            style={{
              top: "47.6%",
              left: "28.2%",
              width: "1.2%",
              height: "0.25%",
              borderRadius: "50%",
              transform: "rotate(2deg)",
            }}
          />

          {/* Middle Woman Blinks */}
          <div
            className="absolute bg-[#C89B84]/95 shadow-sm animate-blink-middle blur-[0.4px]"
            style={{
              top: "46.2%",
              left: "55.3%",
              width: "1.1%",
              height: "0.25%",
              borderRadius: "50%",
              transform: "rotate(-1deg)",
            }}
          />
          <div
            className="absolute bg-[#C89B84]/95 shadow-sm animate-blink-middle blur-[0.4px]"
            style={{
              top: "46.2%",
              left: "57.2%",
              width: "1.1%",
              height: "0.25%",
              borderRadius: "50%",
              transform: "rotate(-3deg)",
            }}
          />

          {/* Right Woman Blinks */}
          <div
            className="absolute bg-[#DAB7A3]/90 shadow-sm animate-blink-right blur-[0.4px]"
            style={{
              top: "48.2%",
              left: "82.2%",
              width: "1.1%",
              height: "0.25%",
              borderRadius: "50%",
              transform: "rotate(5deg)",
            }}
          />
          <div
            className="absolute bg-[#DAB7A3]/90 shadow-sm animate-blink-right blur-[0.4px]"
            style={{
              top: "48.2%",
              left: "84.1%",
              width: "1.1%",
              height: "0.25%",
              borderRadius: "50%",
              transform: "rotate(3deg)",
            }}
          />
        </motion.div>

        {/* Layer J: Warm Moving Sunlight (Foreground Parallax) */}
        <motion.div
          style={{ x: fgX, y: fgY }}
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-60 animate-sunlight"
          style={{
            background: "linear-gradient(135deg, rgba(255, 235, 195, 0.45) 0%, rgba(255, 195, 135, 0.15) 35%, rgba(255, 160, 90, 0) 70%)",
          }}
        />

        {/* Layer K: Floating Dust Particles (Drifting in Sunlight Beam) */}
        <motion.div
          style={{ x: fgX, y: fgY }}
          className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        >
          {[
            { size: "3px", left: "10%", top: "40%", delay: "0s", dur: "18s" },
            { size: "2px", left: "18%", top: "25%", delay: "4s", dur: "15s" },
            { size: "4px", left: "28%", top: "50%", delay: "8s", dur: "22s" },
            { size: "1.5px", left: "15%", top: "60%", delay: "2s", dur: "16s" },
            { size: "2.5px", left: "35%", top: "30%", delay: "6s", dur: "20s" },
            { size: "3px", left: "5%", top: "70%", delay: "11s", dur: "17s" },
            { size: "2px", left: "42%", top: "20%", delay: "1s", dur: "19s" },
            { size: "1px", left: "22%", top: "45%", delay: "9s", dur: "14s" },
            { size: "3.5px", left: "30%", top: "75%", delay: "5s", dur: "21s" },
            { size: "2px", left: "50%", top: "35%", delay: "12s", dur: "16s" },
          ].map((particle, idx) => (
            <span
              key={idx}
              className="dust-particle"
              style={{
                width: particle.size,
                height: particle.size,
                left: particle.left,
                top: particle.top,
                animation: `floatParticle ${particle.dur} linear infinite`,
                animationDelay: particle.delay,
              }}
            />
          ))}
        </motion.div>

      </div>
    </div>
  );
}
