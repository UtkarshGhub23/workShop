import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MESSAGES = [
  "Unpacking premium craft kits...",
  "Selecting vibrant thread colors...",
  "Setting up the custom photo corner...",
  "Sorting beads, bags & charms...",
  "Preparing the DIY workshop space...",
];

export default function Loader() {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const brandName1 = "Trayyaai";
  const brandName2 = "Ayra";

  const letterContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  };

  const letterChild = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 150,
        damping: 15
      } 
    }
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center select-none"
      style={{
        zIndex: 1000,
        backgroundColor: "#FAF6F0",
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 253, 251, 0.6), rgba(250, 246, 240, 1)), url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.035'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="flex flex-col items-center gap-8 max-w-sm px-6">
        
        {/* DIY Aesthetic Embroidery Hoop & Beads Loader */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full drop-shadow-xl"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="bead-shadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#8C6A5C" floodOpacity="0.25" />
              </filter>
              <linearGradient id="clay-pink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E5A691" />
                <stop offset="100%" stopColor="#C87A53" />
              </linearGradient>
              <linearGradient id="clay-olive" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A4B579" />
                <stop offset="100%" stopColor="#606C38" />
              </linearGradient>
              <linearGradient id="clay-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FCDA8B" />
                <stop offset="100%" stopColor="#DCA037" />
              </linearGradient>
              <linearGradient id="clay-brown" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A88B7D" />
                <stop offset="100%" stopColor="#735245" />
              </linearGradient>
              <linearGradient id="hoop-wood" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E5D8CF" />
                <stop offset="50%" stopColor="#CDAFA0" />
                <stop offset="100%" stopColor="#9C7F72" />
              </linearGradient>
              <linearGradient id="metal-screw" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E6D3A0" />
                <stop offset="50%" stopColor="#C0A258" />
                <stop offset="100%" stopColor="#8A7030" />
              </linearGradient>
            </defs>

            {/* Embroidery Hoop Group with Swaying Animation */}
            <motion.g
              animate={{ transform: ["translate(0px, 0px) rotate(0deg)", "translate(0px, -3px) rotate(1.5deg)", "translate(0px, 3px) rotate(-1.5deg)", "translate(0px, 0px) rotate(0deg)"] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              {/* Outer Wood Hoop */}
              <circle cx="80" cy="80" r="70" stroke="url(#hoop-wood)" strokeWidth="6" fill="none" />
              
              {/* Inner Wood Hoop */}
              <circle cx="80" cy="80" r="65" stroke="#FAF6F0" strokeWidth="1" fill="none" opacity="0.6" />
              
              {/* Hoop Tension Adjuster Hardware */}
              {/* Wooden clamp blocks */}
              <rect x="73" y="2" width="6" height="8" fill="#9C7F72" rx="1" />
              <rect x="81" y="2" width="6" height="8" fill="#9C7F72" rx="1" />
              {/* Screw Bolt */}
              <rect x="66" y="4" width="28" height="3" fill="url(#metal-screw)" rx="0.5" />
              {/* Knurled Thumb Nut */}
              <circle cx="66" cy="5.5" r="4" fill="url(#metal-screw)" />
              <circle cx="94" cy="5.5" r="2.5" fill="url(#metal-screw)" />

              {/* Fabric/Canvas Background inside hoop */}
              <circle cx="80" cy="80" r="64.5" fill="#FFFDFB" opacity="0.85" />

              {/* Background Guideline Circle (Lightly penciled) */}
              <circle cx="80" cy="80" r="54" stroke="#8C6A5C" strokeWidth="0.5" strokeDasharray="2 4" fill="none" opacity="0.2" />

              {/* Stitched Heart - drawing outline */}
              <motion.path
                d="M 80,116 C 52,93 38,75 38,57 C 38,45 47,36 59,36 C 67.5,36 75,40.5 80,47 C 85,40.5 92.5,36 101,36 C 113,36 122,45 122,57 C 122,75 108,93 80,116 Z"
                fill="none"
                stroke="#C87A53"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 4.5, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
              />

              {/* Secondary Olive Thread Line (Horizontal Bracelet String) */}
              <line x1="22" y1="80" x2="138" y2="80" stroke="#606C38" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />

              {/* Weaving Threads SVG Motion Paths */}
              {/* Thread 1 (Terracotta) */}
              <motion.path
                d="M 22,80 C 45,68 55,92 80,80 C 105,68 115,92 138,80"
                fill="none"
                stroke="#C87A53"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                opacity="0.8"
              />
              
              {/* Thread 2 (Olive) */}
              <motion.path
                d="M 22,80 C 45,92 55,68 80,80 C 105,92 115,68 138,80"
                fill="none"
                stroke="#606C38"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                opacity="0.8"
              />

              {/* Bracelet Beads sliding in and floating */}
              
              {/* Bead 1: Pink/Terracotta Round Bead */}
              <motion.g
                initial={{ transform: "translate(-100px, 0px) scale(0)" }}
                animate={{ transform: "translate(0px, 0px) scale(1)" }}
                transition={{
                  transform: { type: "spring", stiffness: 60, damping: 15, delay: 0.2 }
                }}
              >
                <motion.g
                  animate={{ transform: ["translate(0px, -1.5px)", "translate(0px, 1.5px)", "translate(0px, -1.5px)"] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                >
                  <circle cx="52" cy="80" r="7.5" fill="url(#clay-pink)" filter="url(#bead-shadow)" />
                  <circle cx="52" cy="80" r="1.8" fill="#FFFDFB" />
                </motion.g>
              </motion.g>

              {/* Bead 2: Gold Star Bead */}
              <motion.g
                initial={{ transform: "translate(-120px, 0px) scale(0)" }}
                animate={{ transform: "translate(0px, 0px) scale(1)" }}
                transition={{
                  transform: { type: "spring", stiffness: 60, damping: 15, delay: 0.5 }
                }}
              >
                <motion.g
                  animate={{ transform: ["translate(0px, 1.5px) rotate(0deg)", "translate(0px, -1.5px) rotate(5deg)", "translate(0px, 1.5px) rotate(0deg)"] }}
                  transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
                >
                  {/* Star centered at 70,80 */}
                  <path 
                    d="M 70,72 L 72.3,77 L 77.8,77.8 L 73.8,81.7 L 74.8,87.2 L 70,84.6 L 65.2,87.2 L 66.2,81.7 L 62.2,77.8 L 67.7,77 Z" 
                    fill="url(#clay-gold)" 
                    filter="url(#bead-shadow)" 
                  />
                  <circle cx="70" cy="80" r="1.5" fill="#FFFDFB" />
                </motion.g>
              </motion.g>

              {/* Bead 3: Olive Flower Bead */}
              <motion.g
                initial={{ transform: "translate(-140px, 0px) scale(0)" }}
                animate={{ transform: "translate(0px, 0px) scale(1)" }}
                transition={{
                  transform: { type: "spring", stiffness: 60, damping: 15, delay: 0.8 }
                }}
              >
                <motion.g
                  animate={{ transform: ["translate(0px, -1.2px) rotate(0deg)", "translate(0px, 1.2px) rotate(-15deg)", "translate(0px, -1.2px) rotate(0deg)"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  {/* 5-Petal Flower centered at 90,80 */}
                  <circle cx="90" cy="74.5" r="3.5" fill="url(#clay-olive)" />
                  <circle cx="95.2" cy="78.3" r="3.5" fill="url(#clay-olive)" />
                  <circle cx="93.2" cy="84.5" r="3.5" fill="url(#clay-olive)" />
                  <circle cx="86.8" cy="84.5" r="3.5" fill="url(#clay-olive)" />
                  <circle cx="84.8" cy="78.3" r="3.5" fill="url(#clay-olive)" />
                  <circle cx="90" cy="80" r="4.5" fill="url(#clay-olive)" filter="url(#bead-shadow)" />
                  <circle cx="90" cy="80" r="1.8" fill="#FFFDFB" />
                </motion.g>
              </motion.g>

              {/* Bead 4: Terracotta Small Heart Charm */}
              <motion.g
                initial={{ transform: "translate(-160px, 0px) scale(0)" }}
                animate={{ transform: "translate(0px, 0px) scale(1)" }}
                transition={{
                  transform: { type: "spring", stiffness: 60, damping: 15, delay: 1.1 }
                }}
              >
                <motion.g
                  animate={{ transform: ["translate(0px, 1.8px) rotate(0deg)", "translate(0px, -1.8px) rotate(8deg)", "translate(0px, 1.8px) rotate(0deg)"] }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                >
                  {/* Small Heart Charm hanging down slightly, centered around 108, 83 */}
                  <path 
                    d="M 108,89 C 105,86.5 102,84.3 102,81.3 C 102,78.8 103.7,77.1 106.3,77.1 C 107.5,77.1 108,78 108,78 C 108,78 108.5,77.1 109.7,77.1 C 112.3,77.1 114,78.8 114,81.3 C 114,84.3 111,86.5 108,89 Z" 
                    fill="url(#clay-pink)" 
                    filter="url(#bead-shadow)" 
                  />
                  {/* Hanging loop line */}
                  <line x1="108" y1="80" x2="108" y2="77.5" stroke="#606C38" strokeWidth="1" />
                  <circle cx="108" cy="80" r="1" fill="#FFFDFB" />
                </motion.g>
              </motion.g>

            </motion.g>

            {/* Sewing Needle Group doing stitching motion at the top edge of the heart */}
            <motion.g
              initial={{ transform: "translate(80px, 35px) rotate(-20deg)" }}
              animate={{
                transform: [
                  "translate(80px, 35px) rotate(-20deg)",
                  "translate(84px, 18px) rotate(-5deg)",
                  "translate(76px, 38px) rotate(-35deg)",
                  "translate(80px, 35px) rotate(-20deg)"
                ]
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Needle shaft pointing downwards */}
              <path
                d="M 0,-35 L 0,15 L -0.8,17 L 0,20 L 0.8,17 L 0,15"
                fill="#B69E90"
                stroke="#8C6A5C"
                strokeWidth="1"
              />
              {/* Needle Eye */}
              <ellipse cx="0" cy="-25" rx="0.6" ry="2.5" fill="#FFFDFB" />
              {/* Sewing Thread coming out of eye */}
              <path
                d="M 0,-25 C 10,-25 18,-15 15,5"
                fill="none"
                stroke="#C87A53"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.85"
              />
            </motion.g>

          </svg>
        </div>

        {/* Brand details with Staggered Fade-in */}
        <div className="text-center">
          <motion.div
            variants={letterContainer}
            initial="hidden"
            animate="show"
            className="font-display font-extrabold text-2xl tracking-widest text-[#2D1E1A] uppercase inline-flex items-center"
          >
            {brandName1.split("").map((char, index) => (
              <motion.span key={`b1-${index}`} variants={letterChild}>
                {char}
              </motion.span>
            ))}
            <motion.span variants={letterChild} className="text-terracotta font-light mx-2.5">
              ×
            </motion.span>
            {brandName2.split("").map((char, index) => (
              <motion.span key={`b2-${index}`} variants={letterChild}>
                {char}
              </motion.span>
            ))}
          </motion.div>
          <motion.span 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="block text-[10px] text-[#8C6A5C] font-bold uppercase tracking-widest mt-2"
          >
            Friendship Day DIY Studio
          </motion.span>
        </div>

        {/* Cycling Status message */}
        <div className="h-7 overflow-hidden mt-1 flex items-center justify-center">
          <motion.p
            key={msgIdx}
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -22, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-xs text-[#8C6A5C]/90 font-bold tracking-wide italic"
          >
            {MESSAGES[msgIdx]}
          </motion.p>
        </div>

      </div>
    </motion.div>
  );
}
