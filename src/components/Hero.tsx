import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [showStickyBtn, setShowStickyBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky mobile CTA after user scrolls past 300px
      setShowStickyBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToRegister = () => {
    const element = document.getElementById("register");
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
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center z-10">
        
        {/* Date and Format Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs sm:text-sm font-bold uppercase tracking-wider mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
          Masterclass · Aug 24-28, 2026 · Online + Interactive
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-6"
        >
          Master the Art of<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-pink to-rose">
            Creative 3D Development
          </span>
        </motion.h1>

        {/* Short Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Build jaw-dropping interactive web experiences. Learn to blend WebGL, Three.js, 
          Tailwind, and Framer Motion into immersive interfaces that captivate users.
        </motion.p>

        {/* Action Button & Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <button
            onClick={scrollToRegister}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold via-orange to-rose text-white text-base font-extrabold shadow-xl shadow-orange/20 hover:shadow-orange/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
          >
            Register Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById("about");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold cursor-pointer transition-colors"
          >
            Explore Workshop
          </button>
        </motion.div>

        {/* Fast Specs Badge grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-20 border-t border-slate-200 pt-10"
        >
          {[
            { icon: <Calendar className="w-5 h-5 text-gold" />, label: "Duration", val: "5 Intensive Days" },
            { icon: <MapPin className="w-5 h-5 text-pink" />, label: "Access", val: "Live + Recordings" },
            { icon: <Users className="w-5 h-5 text-lavender" />, label: "Seats Left", val: "18 / 60 Available" },
          ].map((spec, i) => (
            <div
              key={spec.label}
              className={`flex items-center gap-3 p-4 rounded-2xl glassmorphic text-left ${
                i === 2 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200/50">
                {spec.icon}
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-medium">{spec.label}</span>
                <span className="block text-sm font-bold text-slate-800 mt-0.5">{spec.val}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dynamic Scroll Indicator */}
      <div className="absolute bottom-8 left-50% -translate-x-50% flex flex-col items-center gap-2 opacity-50 select-none">
        <span className="text-[10px] uppercase tracking-widest text-slate-400">Scroll Down</span>
        <div className="w-5 h-8 rounded-full border-2 border-slate-400 flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 rounded-full bg-slate-700"
          />
        </div>
      </div>

      {/* Sticky Mobile "Register Now" Button (hidden on desktop) */}
      <div
        className={`fixed bottom-4 left-4 right-4 z-40 transition-all duration-300 transform lg:hidden ${
          showStickyBtn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"
        }`}
      >
        <button
          onClick={scrollToRegister}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold via-orange to-rose text-white font-extrabold shadow-2xl flex items-center justify-center gap-2"
        >
          Register Now for Workshop
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
