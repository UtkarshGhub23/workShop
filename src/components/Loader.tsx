import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MESSAGES = [
  "Unpacking premium craft kits...",
  "Selecting vibrant thread colors...",
  "Polishing miniature canvases...",
  "Sorting decorative beads & charms...",
  "Preparing the DIY workshop studio...",
];

export default function Loader() {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ y: "-100vh", opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 bg-[#fcfbfd] flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center gap-6 max-w-sm px-4">
        
        {/* DIY Aesthetic Rotating Loader */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          
          {/* Thread loop outer ring (dashed border spinning) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-dashed border-gold/40"
          />

          {/* Golden border solid inner ring (pulsing) */}
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute inset-2.5 rounded-full border-2 border-gold/60"
          />

          {/* Core rotating needle/scissors SVG icon */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="w-10 h-10 text-pink flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-transparent stroke-rose-500 fill-rose-500/10"
            >
              {/* Scissors / Needle Custom Shape */}
              <circle cx="6" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <line x1="9.8" y1="8.2" x2="20" y2="18" />
              <line x1="9.8" y1="15.8" x2="20" y2="6" />
            </svg>
          </motion.div>
        </div>

        {/* Brand details */}
        <div className="text-center">
          <span className="font-display font-extrabold text-2xl tracking-wider text-slate-900 uppercase">
            TRAYYA<span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-orange to-rose">AI</span>
          </span>
          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
            Creative DIY Studio
          </span>
        </div>

        {/* Cycling Status message */}
        <div className="h-6 overflow-hidden mt-2">
          <motion.p
            key={msgIdx}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="text-xs text-slate-500 font-semibold"
          >
            {MESSAGES[msgIdx]}
          </motion.p>
        </div>

      </div>
    </motion.div>
  );
}
