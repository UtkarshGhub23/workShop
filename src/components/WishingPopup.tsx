import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function WishingPopup() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="fixed top-4 left-0 right-0 mx-auto z-[100] flex items-center gap-3 rounded-xl bg-white border border-brown/10 shadow-lg px-5 py-3 w-fit animate-[slideDown_0.4s_ease-out]">
      <span className="text-xl">🎉</span>
      <p className="text-sm text-[#2D1E1A]">
        <span className="font-semibold text-terracotta">{greeting}!</span>{" "}
        So glad you're here 💛
      </p>
      <button
        onClick={() => setVisible(false)}
        className="shrink-0 text-brown/40 hover:text-brown"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
