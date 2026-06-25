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

  return (
    <motion.div
      exit={{ y: "-100vh", opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 bg-[#FAF6F0] flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center gap-6 max-w-sm px-4">
        
        {/* DIY Aesthetic Rotating Loader */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-dashed border-terracotta/40"
          />

          {/* Inner Ring */}
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute inset-2.5 rounded-full border-2 border-olive/60"
          />

          {/* Core Logo Symbol */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="w-10 h-10 text-terracotta flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-transparent stroke-terracotta fill-terracotta/10"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8M8 12h8" />
            </svg>
          </motion.div>
        </div>

        {/* Brand details */}
        <div className="text-center">
          <span className="font-display font-bold text-xl tracking-widest text-[#2D1E1A] uppercase">
            Trayyaai <span className="text-terracotta font-light">×</span> Ayra
          </span>
          <span className="block text-[10px] text-[#8C6A5C] font-semibold uppercase tracking-widest mt-1.5">
            Friendship Day DIY Studio
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
            className="text-xs text-[#8C6A5C] font-semibold"
          >
            {MESSAGES[msgIdx]}
          </motion.p>
        </div>

      </div>
    </motion.div>
  );
}
