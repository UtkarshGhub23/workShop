import { motion } from "framer-motion";

export default function Loader() {
  // Thread colors matching the brand palette
  const threads = [
    { color: "#C87A53", label: "T" },  // Terracotta
    { color: "#606C38", label: "×" },  // Olive
    { color: "#DCA037", label: "A" },  // Gold
    { color: "#8C6A5C", label: "♥" },  // Brown
  ];

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 flex flex-col items-center justify-center select-none overflow-hidden"
      style={{
        zIndex: 1000,
        background: "linear-gradient(145deg, #FAF6F0 0%, #F5EFEB 50%, #FAF6F0 100%)",
      }}
    >
      {/* Subtle paper texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating craft particles */}
      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.15; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.35; }
        }
        @keyframes weave-left {
          0% { transform: translateX(-120%) scaleX(0); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateX(0) scaleX(1); opacity: 1; }
        }
        @keyframes weave-right {
          0% { transform: translateX(120%) scaleX(0); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateX(0) scaleX(1); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes bead-pop {
          0% { transform: scale(0) rotate(-20deg); }
          60% { transform: scale(1.15) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes gentle-sway {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }
        @keyframes stitch-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes letter-rise {
          0% { transform: translateY(8px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
        }
      `}</style>

      {/* Scattered decorative particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${4 + i * 2}px`,
            height: `${4 + i * 2}px`,
            background: threads[i % 4].color,
            top: `${15 + i * 13}%`,
            left: `${10 + i * 15}%`,
            animation: `float-particle ${2 + i * 0.3}s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-7">

        {/* Main craft animation container */}
        <div
          className="relative w-52 h-52 flex items-center justify-center"
          style={{ animation: "gentle-sway 3s ease-in-out infinite" }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Glow filter for the center */}
              <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="bead-drop" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#5C4033" floodOpacity="0.2" />
              </filter>
              {/* Thread gradients */}
              <linearGradient id="thread-terra" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C87A53" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#C87A53" />
                <stop offset="100%" stopColor="#C87A53" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="thread-olive" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#606C38" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#606C38" />
                <stop offset="100%" stopColor="#606C38" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="thread-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#DCA037" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#DCA037" />
                <stop offset="100%" stopColor="#DCA037" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="thread-brown" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8C6A5C" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#8C6A5C" />
                <stop offset="100%" stopColor="#8C6A5C" stopOpacity="0.3" />
              </linearGradient>
              {/* Bead gradients */}
              <radialGradient id="bead-terra" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#E5A691" />
                <stop offset="100%" stopColor="#C87A53" />
              </radialGradient>
              <radialGradient id="bead-olive" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#B8C98D" />
                <stop offset="100%" stopColor="#606C38" />
              </radialGradient>
              <radialGradient id="bead-gold" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#FCE4A8" />
                <stop offset="100%" stopColor="#DCA037" />
              </radialGradient>
              <radialGradient id="bead-brown" cx="35%" cy="35%">
                <stop offset="0%" stopColor="#C4A99D" />
                <stop offset="100%" stopColor="#8C6A5C" />
              </radialGradient>
            </defs>

            {/* Outer decorative ring - stitched circle */}
            <circle
              cx="100" cy="100" r="90"
              fill="none"
              stroke="#C87A53"
              strokeWidth="1.5"
              strokeDasharray="3 6"
              opacity="0.2"
            />

            {/* Inner glow circle */}
            <circle
              cx="100" cy="100" r="70"
              fill="none"
              stroke="#DCA037"
              strokeWidth="0.5"
              opacity="0.15"
              style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
            />

            {/* === WEAVING THREADS === */}
            {/* Horizontal threads weaving from left */}
            {[72, 84, 96, 108, 120].map((y, i) => (
              <path
                key={`h-${i}`}
                d={`M 20,${y} C 55,${y + (i % 2 === 0 ? -8 : 8)} 80,${y + (i % 2 === 0 ? 6 : -6)} 100,${y} C 120,${y + (i % 2 === 0 ? -6 : 6)} 145,${y + (i % 2 === 0 ? 8 : -8)} 180,${y}`}
                fill="none"
                stroke={[
                  "url(#thread-terra)",
                  "url(#thread-olive)",
                  "url(#thread-gold)",
                  "url(#thread-brown)",
                  "url(#thread-terra)",
                ][i]}
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  animation: `weave-left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.08}s both`,
                  transformOrigin: "center",
                }}
              />
            ))}

            {/* Vertical threads weaving from top */}
            {[72, 88, 104, 120].map((x, i) => (
              <path
                key={`v-${i}`}
                d={`M ${x},30 C ${x + (i % 2 === 0 ? 6 : -6)},60 ${x + (i % 2 === 0 ? -6 : 6)},90 ${x},100 C ${x + (i % 2 === 0 ? 6 : -6)},110 ${x + (i % 2 === 0 ? -6 : 6)},140 ${x},170`}
                fill="none"
                stroke={[
                  "url(#thread-olive)",
                  "url(#thread-gold)",
                  "url(#thread-terra)",
                  "url(#thread-brown)",
                ][i]}
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  animation: `weave-right 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.3 + i * 0.08}s both`,
                  transformOrigin: "center",
                }}
              />
            ))}

            {/* === CRAFT BEADS at intersections === */}
            {/* Center bead cluster */}
            {[
              { cx: 80, cy: 85, r: 7, fill: "url(#bead-terra)", delay: 0.7 },
              { cx: 100, cy: 100, r: 9, fill: "url(#bead-gold)", delay: 0.85 },
              { cx: 120, cy: 85, r: 7, fill: "url(#bead-olive)", delay: 0.75 },
              { cx: 90, cy: 108, r: 6, fill: "url(#bead-brown)", delay: 0.9 },
              { cx: 110, cy: 108, r: 6, fill: "url(#bead-terra)", delay: 0.95 },
            ].map((b, i) => (
              <g key={`bead-${i}`} style={{ animation: `bead-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) ${b.delay}s both` }}>
                <circle cx={b.cx} cy={b.cy} r={b.r} fill={b.fill} filter="url(#bead-drop)" />
                <circle cx={b.cx - b.r * 0.25} cy={b.cy - b.r * 0.25} r={b.r * 0.2} fill="white" opacity="0.5" />
              </g>
            ))}

            {/* Central heart stitched path */}
            <path
              d="M 100,118 C 89,110 82,103 82,96 C 82,91 85,88 89,88 C 92,88 95,90 100,94 C 105,90 108,88 111,88 C 115,88 118,91 118,96 C 118,103 111,110 100,118 Z"
              fill="none"
              stroke="#C87A53"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="130"
              strokeDashoffset="130"
              style={{
                animation: "stitch-draw 0.8s ease-out 1s forwards",
              }}
            />
          </svg>
        </div>

        {/* Brand Name with letter-by-letter rise */}
        <div className="text-center">
          <div className="font-display font-extrabold text-2xl tracking-[0.2em] text-[#2D1E1A] uppercase flex items-center justify-center">
            {"Trayyaai".split("").map((char, i) => (
              <span
                key={`a-${i}`}
                style={{
                  display: "inline-block",
                  animation: `letter-rise 0.3s ease-out ${0.6 + i * 0.04}s both`,
                }}
              >
                {char}
              </span>
            ))}
            <span
              className="text-[#C87A53] font-light mx-2"
              style={{
                display: "inline-block",
                animation: `letter-rise 0.3s ease-out ${0.6 + 8 * 0.04}s both`,
              }}
            >
              ×
            </span>
            {"Ayra".split("").map((char, i) => (
              <span
                key={`b-${i}`}
                style={{
                  display: "inline-block",
                  animation: `letter-rise 0.3s ease-out ${0.6 + (9 + i) * 0.04}s both`,
                }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Shimmer subtitle */}
          <div
            className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg, #8C6A5C 0%, #C87A53 25%, #DCA037 50%, #C87A53 75%, #8C6A5C 100%)",
              backgroundSize: "200% auto",
              animation: "shimmer 2s linear infinite, letter-rise 0.3s ease-out 1.1s both",
            }}
          >
            Friendship Day DIY Studio
          </div>
        </div>

        {/* Bouncing craft dots */}
        <div className="flex gap-2 items-center mt-1">
          {threads.map((t, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: t.color,
                animation: `dot-bounce 1s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
