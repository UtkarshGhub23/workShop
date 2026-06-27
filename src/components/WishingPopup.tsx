import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function WishingPopup() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="fixed top-24 left-0 right-0 mx-auto z-[200] flex items-center gap-3 rounded-2xl bg-[#FFFDFB]/95 border border-terracotta/20 shadow-xl px-4.5 py-3 w-fit max-w-[90%] animate-[slideDown_0.45s_cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] transition-transform duration-300">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-terracotta/15 to-olive/10 ring-2 ring-terracotta/10 text-lg shadow-inner">
        🎉
      </div>
      <div className="flex-1 text-left min-w-0 pr-2">
        <span className="block text-[9px] font-extrabold uppercase tracking-widest text-terracotta/90 leading-none mb-1">
          {greeting}
        </span>
        <p className="text-xs sm:text-sm font-medium text-slate-800 leading-snug truncate">
          So glad you're here 💛
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="shrink-0 p-1 rounded-full text-brown/40 hover:text-brown hover:bg-brown/5 transition-all"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
