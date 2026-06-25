import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MapPin, Users, Download } from "lucide-react";
import { useState, useEffect } from "react";

interface HeroProps {
  onNavigate: (view: "home" | "team" | "faq" | "register") => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [showStickyBtn, setShowStickyBtn] = useState(false);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone;
    setShowInstallBtn(!isStandalone);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-28 pb-20 md:py-32 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Content (Grid span 7) */}
        <div className="lg:col-span-7 text-left flex flex-col items-start">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-terracotta/25 bg-terracotta/5 text-terracotta text-xs sm:text-sm font-bold uppercase tracking-wider mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse"></span>
            Trayyaai × Ayra Friendship Day Special
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#2D1E1A] leading-[1.12] mb-6"
          >
            This Friendship Day,<br />
            <span className="text-[#C87A53] italic">
              Make Memories,
            </span>{" "}
            Not Just Plans.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-[#8C6A5C] leading-relaxed mb-8 max-w-xl"
          >
            Spend a creative afternoon customizing your own accessories, playing fun games, meeting new people and taking home memories you'll keep forever.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12"
          >
            <button
              onClick={() => onNavigate("register")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C87A53] hover:bg-[#8C6A5C] text-white text-sm font-bold uppercase tracking-wider shadow-lg shadow-terracotta/10 hover:shadow-terracotta/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
            >
              I'm Interested
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-terracotta/25 bg-white/70 hover:bg-white text-terracotta text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center"
            >
              Learn More
            </button>

            {showInstallBtn && (
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("trigger-install"))}
                className="w-full sm:w-auto px-6 py-4 rounded-full border border-dashed border-[#8C6A5C]/40 text-[#8C6A5C] hover:text-[#C87A53] text-sm font-bold uppercase tracking-wider cursor-pointer transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Install App
              </button>
            )}
          </motion.div>

          {/* Metrics / Specs Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full border-t border-[#8C6A5C]/15 pt-8"
          >
            {[
              { icon: <Sparkles className="w-5 h-5 text-terracotta" />, label: "Kit Included", val: "Aesthetic Craft Kit" },
              { icon: <Users className="w-5 h-5 text-olive" />, label: "Interactive", val: "Mini Games & Surprises" },
              { icon: <MapPin className="w-5 h-5 text-brown" />, label: "Location", val: "Mathura, UP" },
            ].map((spec) => (
              <div key={spec.label} className="flex items-center gap-3 p-4 rounded-2xl bg-[#FFFDFB] border border-[#8C6A5C]/10 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center border border-[#8C6A5C]/5">
                  {spec.icon}
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#8C6A5C]/65 font-medium">{spec.label}</span>
                  <span className="block text-xs font-bold text-[#2D1E1A] mt-0.5">{spec.val}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Visual Image (Grid span 5) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center w-full relative"
        >
          {/* Decorative Backdrops */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-terracotta/20 to-olive/15 rounded-[40px] blur-2xl -z-10 opacity-70"></div>
          
          <div className="relative rounded-[32px] overflow-hidden border border-white bg-white/80 p-3 shadow-xl max-w-md w-full">
            <img
              src="/hero-crafts.png"
              alt="Friendship Day DIY Workshop Crafts"
              className="w-full h-auto rounded-[24px] object-cover aspect-[4/5] hover:scale-[1.02] transition-transform duration-500"
            />
            {/* Small Floating Details Badge */}
            <div className="absolute bottom-6 right-6 bg-[#FFFDFB]/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-terracotta/15 shadow-lg flex flex-col items-start">
              <span className="text-[9px] font-bold text-terracotta uppercase tracking-widest">Organized By</span>
              <span className="text-xs font-bold text-[#2D1E1A] font-display">Trayyaai × Ayra</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll Down */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-40 select-none">
        <span className="text-[9px] uppercase tracking-widest text-[#8C6A5C] font-semibold">Scroll to Discover</span>
        <div className="w-5 h-8 rounded-full border border-[#8C6A5C] flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full bg-terracotta"
          />
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div
        className={`fixed bottom-4 left-4 right-4 z-40 transition-all duration-300 transform lg:hidden ${
          showStickyBtn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"
        }`}
      >
        <button
          onClick={() => onNavigate("register")}
          className="w-full py-4 rounded-2xl bg-[#C87A53] hover:bg-[#8C6A5C] text-white text-sm font-bold uppercase tracking-wider shadow-2xl flex items-center justify-center gap-2"
        >
          I'm Interested
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
