import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";

export default function Schedule() {
  const INCLUSIONS = [
    "1 Canvas Pouch",
    "Materials to Make 2 Bracelets",
    "Acrylic Paints & Brushes",
    "Charms, Beads & Ribbons",
    "Guidance Throughout the Workshop",
    "Take Home Everything You Create",
    "Games & Prize Opportunities"
  ];

  return (
    <section id="schedule" className="py-16 px-4 bg-transparent border-t border-[#8C6A5C]/15">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex px-3 py-1 rounded-full border border-terracotta/25 bg-terracotta/5 text-xs text-terracotta uppercase tracking-wider font-bold mb-4">
            Why Join Us?
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2D1E1A] leading-tight">
            What's Included
          </h2>
          <p className="text-[#8C6A5C] text-base sm:text-lg mt-4 leading-relaxed">
            Every pass includes a complete kit of premium supplies, access to all activities, and custom items to take home.
          </p>
        </div>

        {/* What's Included Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto rounded-3xl border border-[#8C6A5C]/15 bg-[#FFFDFB] p-8 shadow-md relative overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-terracotta/5 blur-2xl pointer-events-none" />
          
          <h3 className="font-display font-bold text-lg text-[#2D1E1A] mb-6 flex items-center gap-2 border-b border-[#8C6A5C]/10 pb-4">
            <Sparkles className="w-5 h-5 text-terracotta" />
            Your Experience Package
          </h3>
          
          <div className="flex flex-col gap-4 text-left">
            {INCLUSIONS.map((item) => (
              <div key={item} className="flex items-center gap-3.5 text-xs sm:text-sm font-semibold text-[#3C2E2A]">
                <div className="w-5 h-5 rounded-full bg-emerald-100/80 flex items-center justify-center shrink-0 border border-emerald-500/10">
                  <Check className="w-3.5 h-3.5 text-emerald-700 stroke-[3]" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
