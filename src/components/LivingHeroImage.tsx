import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function LivingHeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Motion values for tracking normalized mouse position [-1, 1]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring config for premium, Apple-like smooth parallax tilt
  const springConfig = { damping: 45, stiffness: 100, mass: 0.7 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Maps mouse movement to distinct parallax offsets (Layered Depth Effect)
  const bgX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const bgY = useTransform(smoothY, [-1, 1], [-6, 6]);

  const midX = useTransform(smoothX, [-1, 1], [-2.5, 2.5]);
  const midY = useTransform(smoothY, [-1, 1], [-2.5, 2.5]);

  const fgX = useTransform(smoothX, [-1, 1], [5, -5]);
  const fgY = useTransform(smoothY, [-1, 1], [5, -5]);

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

  // Helper for generating Slide Indicators
  const handleDotClick = (idx: number) => {
    setCurrentSlide(idx);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-auto rounded-[24px] overflow-hidden aspect-[4/5] bg-stone-900 select-none shadow-inner group/container"
      style={{ isolation: "isolate" }}
    >
      {/* Stylesheet for custom cinemagraph animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes cinematicZoom {
              0% { transform: scale(1.02) translate(0px, 0px); }
              50% { transform: scale(1.05) translate(-1.5px, -1px); }
              100% { transform: scale(1.02) translate(0px, 0px); }
            }
            @keyframes swayPlant {
              0%, 100% { transform: rotate(0deg) skewX(0deg); }
              50% { transform: rotate(0.3deg) skewX(0.12deg); }
            }
            @keyframes swayFlowers {
              0%, 100% { transform: rotate(0deg) skewY(0deg); }
              50% { transform: rotate(-0.35deg) skewY(-0.12deg); }
            }
            @keyframes slowBreathing {
              0%, 100% { transform: translateY(0px) scaleY(1); }
              50% { transform: translateY(-0.6px) scaleY(1.002); }
            }
            @keyframes handMoveLeft {
              0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
              50% { transform: translate(0.3px, -0.12px) rotate(0.18deg); }
            }
            @keyframes handMoveMiddle {
              0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
              50% { transform: translate(-0.2px, 0.3px) rotate(-0.12deg); }
            }
            @keyframes handMoveRight {
              0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
              50% { transform: translate(0.2px, 0.2px) rotate(0.1deg); }
            }
            @keyframes smileLeft {
              0%, 100% { transform: scale(1); }
              50% { transform: scaleX(1.015) scaleY(1.008); }
            }
            @keyframes smileMiddle {
              0%, 100% { transform: scale(1); }
              50% { transform: scaleX(1.015) scaleY(1.01); }
            }
            @keyframes smileRight {
              0%, 100% { transform: scale(1); }
              50% { transform: scaleX(1.015) scaleY(1.008); }
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
              0%, 100% { opacity: 0.4; transform: scale(1); }
              50% { opacity: 0.65; transform: scale(1.03) translate(1.5px, 1.5px); }
            }
            @keyframes floatParticle {
              0% { transform: translateY(105%) translateX(0px); opacity: 0; }
              15% { opacity: 0.6; }
              85% { opacity: 0.6; }
              100% { transform: translateY(-5%) translateX(15px); opacity: 0; }
            }
            .animate-zoom {
              animation: cinematicZoom 20s ease-in-out infinite;
            }
            .animate-sway-plant {
              animation: swayPlant 7.0s ease-in-out infinite;
            }
            .animate-sway-flowers {
              animation: swayFlowers 6.0s ease-in-out infinite;
            }
            .animate-breathing {
              animation: slowBreathing 4.5s ease-in-out infinite;
            }
            .animate-hand-left {
              animation: handMoveLeft 5.2s ease-in-out infinite;
            }
            .animate-hand-middle {
              animation: handMoveMiddle 4.8s ease-in-out infinite;
            }
            .animate-hand-right {
              animation: handMoveRight 5.0s ease-in-out infinite;
            }
            .animate-smile-left {
              animation: smileLeft 5.2s ease-in-out infinite;
            }
            .animate-smile-middle {
              animation: smileMiddle 4.8s ease-in-out infinite;
            }
            .animate-smile-right {
              animation: smileRight 5.0s ease-in-out infinite;
            }
            .animate-blink-left {
              animation: blinkCycleLeft 5.6s infinite;
            }
            .animate-blink-middle {
              animation: blinkCycleMiddle 6.2s infinite;
            }
            .animate-blink-right {
              animation: blinkCycleRight 5.9s infinite;
            }
            .animate-sunlight {
              animation: sunlightPulse 10s ease-in-out infinite;
            }
            .dust-particle {
              position: absolute;
              background-color: rgba(255, 225, 175, 0.35);
              border-radius: 50%;
              pointer-events: none;
              mix-blend-mode: screen;
            }
          `,
        }}
      />

      <AnimatePresence mode="wait">
        {currentSlide === 0 && (
          <motion.div
            key="slide0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Cinematic Zoom Container */}
            <div className="absolute inset-[-12px] w-[calc(100%+24px)] h-[calc(100%+24px)] animate-zoom">
              
              {/* Layer A: Base Image */}
              <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 w-full h-full">
                <img
                  src="/hero-crafts.png"
                  alt="Friendship Day DIY Workshop Crafts"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Layer B: Swaying Dried Flowers */}
              <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 w-full h-full pointer-events-none">
                <img
                  src="/hero-crafts.png"
                  className="w-full h-full object-cover animate-sway-flowers"
                  style={{
                    clipPath: "polygon(4% 20%, 25% 20%, 28% 42%, 22% 52%, 10% 50%, 4% 38%)",
                    transformOrigin: "15% 55%",
                  }}
                />
              </motion.div>

              {/* Layer C: Swaying Fiddle Leaf Plant */}
              <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 w-full h-full pointer-events-none">
                <img
                  src="/hero-crafts.png"
                  className="w-full h-full object-cover animate-sway-plant"
                  style={{
                    clipPath: "polygon(68% 15%, 85% 12%, 88% 30%, 86% 50%, 82% 60%, 72% 58%, 66% 40%)",
                    transformOrigin: "75% 60%",
                  }}
                />
              </motion.div>

              {/* Layer D: Breathing Characters */}
              <motion.div style={{ x: midX, y: midY }} className="absolute inset-0 w-full h-full pointer-events-none">
                <img
                  src="/hero-crafts.png"
                  className="w-full h-full object-cover animate-breathing"
                  style={{
                    clipPath: "polygon(10% 38%, 98% 38%, 98% 100%, 10% 100%)",
                  }}
                />
              </motion.div>

              {/* Layer E: Left Woman's Hand */}
              <motion.div style={{ x: midX, y: midY }} className="absolute inset-0 w-full h-full pointer-events-none">
                <img
                  src="/hero-crafts.png"
                  className="w-full h-full object-cover animate-hand-left animate-breathing"
                  style={{
                    clipPath: "polygon(18% 58%, 38% 58%, 38% 74%, 18% 74%)",
                    transformOrigin: "28% 66%",
                  }}
                />
              </motion.div>

              {/* Layer F: Middle Woman's Hand */}
              <motion.div style={{ x: midX, y: midY }} className="absolute inset-0 w-full h-full pointer-events-none">
                <img
                  src="/hero-crafts.png"
                  className="w-full h-full object-cover animate-hand-middle animate-breathing"
                  style={{
                    clipPath: "polygon(44% 56%, 64% 56%, 64% 74%, 44% 74%)",
                    transformOrigin: "54% 65%",
                  }}
                />
              </motion.div>

              {/* Layer G: Right Woman's Hand */}
              <motion.div style={{ x: midX, y: midY }} className="absolute inset-0 w-full h-full pointer-events-none">
                <img
                  src="/hero-crafts.png"
                  className="w-full h-full object-cover animate-hand-right animate-breathing"
                  style={{
                    clipPath: "polygon(76% 58%, 96% 58%, 96% 76%, 76% 76%)",
                    transformOrigin: "86% 67%",
                  }}
                />
              </motion.div>

              {/* Layer H: Smiling Mouths */}
              <motion.div style={{ x: midX, y: midY }} className="absolute inset-0 w-full h-full pointer-events-none">
                <img
                  src="/hero-crafts.png"
                  className="absolute inset-0 w-full h-full object-cover animate-smile-left animate-breathing"
                  style={{
                    clipPath: "polygon(26% 49%, 31% 49%, 31% 53%, 26% 53%)",
                    transformOrigin: "28.5% 51%",
                  }}
                />
                <img
                  src="/hero-crafts.png"
                  className="absolute inset-0 w-full h-full object-cover animate-smile-middle animate-breathing"
                  style={{
                    clipPath: "polygon(54% 47.5%, 59% 47.5%, 59% 51.5%, 54% 51.5%)",
                    transformOrigin: "56.5% 49.5%",
                  }}
                />
                <img
                  src="/hero-crafts.png"
                  className="absolute inset-0 w-full h-full object-cover animate-smile-right animate-breathing"
                  style={{
                    clipPath: "polygon(81% 49.5%, 86% 49.5%, 86% 53.5%, 81% 53.5%)",
                    transformOrigin: "83.5% 51.5%",
                  }}
                />
              </motion.div>

              {/* Layer I: Eyelids Blinking */}
              <motion.div style={{ x: midX, y: midY }} className="absolute inset-0 w-full h-full pointer-events-none animate-breathing">
                <div className="absolute bg-[#D2B29F]/90 shadow-sm animate-blink-left blur-[0.4px]" style={{ top: "47.7%", left: "26.5%", width: "1.2%", height: "0.25%", borderRadius: "50%", transform: "rotate(4deg)" }} />
                <div className="absolute bg-[#D2B29F]/90 shadow-sm animate-blink-left blur-[0.4px]" style={{ top: "47.6%", left: "28.2%", width: "1.2%", height: "0.25%", borderRadius: "50%", transform: "rotate(2deg)" }} />
                <div className="absolute bg-[#C89B84]/95 shadow-sm animate-blink-middle blur-[0.4px]" style={{ top: "46.2%", left: "55.3%", width: "1.1%", height: "0.25%", borderRadius: "50%", transform: "rotate(-1deg)" }} />
                <div className="absolute bg-[#C89B84]/95 shadow-sm animate-blink-middle blur-[0.4px]" style={{ top: "46.2%", left: "57.2%", width: "1.1%", height: "0.25%", borderRadius: "50%", transform: "rotate(-3deg)" }} />
                <div className="absolute bg-[#DAB7A3]/90 shadow-sm animate-blink-right blur-[0.4px]" style={{ top: "48.2%", left: "82.2%", width: "1.1%", height: "0.25%", borderRadius: "50%", transform: "rotate(5deg)" }} />
                <div className="absolute bg-[#DAB7A3]/90 shadow-sm animate-blink-right blur-[0.4px]" style={{ top: "48.2%", left: "84.1%", width: "1.1%", height: "0.25%", borderRadius: "50%", transform: "rotate(3deg)" }} />
              </motion.div>

              {/* Layer J: Warm Moving Sunlight */}
              <motion.div
                style={{ x: fgX, y: fgY, background: "linear-gradient(135deg, rgba(255, 235, 195, 0.45) 0%, rgba(255, 195, 135, 0.15) 35%, rgba(255, 160, 90, 0) 70%)" }}
                className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-60 animate-sunlight"
              />

              {/* Layer K: Floating Dust Particles */}
              <motion.div style={{ x: fgX, y: fgY }} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                {[
                  { size: "3px", left: "10%", top: "40%", delay: "0s", dur: "18s" },
                  { size: "2px", left: "18%", top: "25%", delay: "4s", dur: "15s" },
                  { size: "4px", left: "28%", top: "50%", delay: "8s", dur: "22s" },
                  { size: "1.5px", left: "15%", top: "60%", delay: "2s", dur: "16s" },
                  { size: "2.5px", left: "35%", top: "30%", delay: "6s", dur: "20s" },
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
          </motion.div>
        )}

        {currentSlide === 1 && (
          <motion.div
            key="slide1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Cinematic Zoom Container */}
            <div className="absolute inset-[-12px] w-[calc(100%+24px)] h-[calc(100%+24px)] animate-zoom">
              
              {/* Layer A: Base Image */}
              <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 w-full h-full">
                <img
                  src="/hero-slide-2.png"
                  alt="Aesthetic Crafting Hands"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Layer B: Swaying Dried Flowers (Upper Right) */}
              <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 w-full h-full pointer-events-none">
                <img
                  src="/hero-slide-2.png"
                  className="w-full h-full object-cover animate-sway-flowers"
                  style={{
                    clipPath: "polygon(36% 0%, 86% 0%, 86% 32%, 52% 32%, 36% 25%)",
                    transformOrigin: "61% 32%",
                  }}
                />
              </motion.div>

              {/* Layer C: Left Hands (Breathing/Micro-movements) */}
              <motion.div style={{ x: midX, y: midY }} className="absolute inset-0 w-full h-full pointer-events-none">
                <img
                  src="/hero-slide-2.png"
                  className="w-full h-full object-cover animate-breathing animate-hand-left"
                  style={{
                    clipPath: "polygon(0% 40%, 40% 40%, 40% 75%, 0% 75%)",
                    transformOrigin: "20% 60%",
                  }}
                />
              </motion.div>

              {/* Layer D: Right Hands (Breathing/Micro-movements) */}
              <motion.div style={{ x: midX, y: midY }} className="absolute inset-0 w-full h-full pointer-events-none">
                <img
                  src="/hero-slide-2.png"
                  className="w-full h-full object-cover animate-breathing animate-hand-right"
                  style={{
                    clipPath: "polygon(68% 30%, 100% 30%, 100% 85%, 68% 85%)",
                    transformOrigin: "84% 58%",
                  }}
                />
              </motion.div>

              {/* Layer E: Warm Moving Sunlight */}
              <motion.div
                style={{ x: fgX, y: fgY, background: "linear-gradient(135deg, rgba(255, 235, 195, 0.45) 0%, rgba(255, 195, 135, 0.15) 35%, rgba(255, 160, 90, 0) 70%)" }}
                className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-60 animate-sunlight"
              />

              {/* Layer F: Floating Dust Particles */}
              <motion.div style={{ x: fgX, y: fgY }} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                {[
                  { size: "2px", left: "15%", top: "35%", delay: "1s", dur: "16s" },
                  { size: "3.5px", left: "25%", top: "55%", delay: "5s", dur: "20s" },
                  { size: "1.5px", left: "8%", top: "20%", delay: "3s", dur: "14s" },
                  { size: "2.5px", left: "45%", top: "40%", delay: "7s", dur: "18s" },
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
          </motion.div>
        )}

        {currentSlide === 2 && (
          <motion.div
            key="slide2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Cinematic Zoom Container */}
            <div className="absolute inset-[-12px] w-[calc(100%+24px)] h-[calc(100%+24px)] animate-zoom">
              
              {/* Layer A: Base Image */}
              <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 w-full h-full">
                <img
                  src="/hero-slide-3.png"
                  alt="Cozy Material Shelf"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Layer B: Swaying Hanging Plant (Left Hanger) */}
              <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 w-full h-full pointer-events-none">
                <img
                  src="/hero-slide-3.png"
                  className="w-full h-full object-cover animate-sway-plant"
                  style={{
                    clipPath: "polygon(5% 20%, 20% 20%, 20% 50%, 5% 50%)",
                    transformOrigin: "12.5% 20%",
                  }}
                />
              </motion.div>

              {/* Layer C: Swaying Potted Plant (Shelf Top Left) */}
              <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 w-full h-full pointer-events-none">
                <img
                  src="/hero-slide-3.png"
                  className="w-full h-full object-cover animate-sway-flowers"
                  style={{
                    clipPath: "polygon(34% 5%, 45% 5%, 45% 22%, 34% 22%)",
                    transformOrigin: "39.5% 20%",
                  }}
                />
              </motion.div>

              {/* Layer D: Swaying Fern Plant (Shelf Top Right) */}
              <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 w-full h-full pointer-events-none">
                <img
                  src="/hero-slide-3.png"
                  className="w-full h-full object-cover animate-sway-plant"
                  style={{
                    clipPath: "polygon(56% 5%, 78% 5%, 78% 25%, 56% 25%)",
                    transformOrigin: "67% 22%",
                  }}
                />
              </motion.div>

              {/* Layer E: Warm Moving Sunlight */}
              <motion.div
                style={{ x: fgX, y: fgY, background: "linear-gradient(135deg, rgba(255, 235, 195, 0.45) 0%, rgba(255, 195, 135, 0.15) 35%, rgba(255, 160, 90, 0) 70%)" }}
                className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-60 animate-sunlight"
              />

              {/* Layer F: Floating Dust Particles */}
              <motion.div style={{ x: fgX, y: fgY }} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                {[
                  { size: "3px", left: "20%", top: "45%", delay: "0s", dur: "18s" },
                  { size: "2px", left: "30%", top: "30%", delay: "4s", dur: "15s" },
                  { size: "4px", left: "12%", top: "50%", delay: "8s", dur: "22s" },
                  { size: "2.5px", left: "38%", top: "25%", delay: "6s", dur: "20s" },
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide Navigation Indicators (Floating Dots) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 px-3 py-1.5 rounded-full bg-slate-950/20 backdrop-blur-sm border border-white/5 opacity-0 group-hover/container:opacity-100 transition-opacity duration-300">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
              currentSlide === idx 
                ? "bg-white scale-125 shadow-sm" 
                : "bg-white/45 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
