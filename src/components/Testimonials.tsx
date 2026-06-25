import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Lukas Vance",
    role: "Senior Frontend Engineer, Vercel",
    initials: "LV",
    bg: "from-blue-100 to-indigo-100 text-indigo-700 border-indigo-200/40",
    quote: "This masterclass completely reshaped my approach to interactive programming. Aarav explained 3D vector transformations so clearly that it clicked instantly.",
    rating: 5,
  },
  {
    name: "Jessica Zhang",
    role: "Creative Director, Studio Aura",
    initials: "JZ",
    bg: "from-pink-100 to-rose-100 text-rose-700 border-rose-200/40",
    quote: "Our landing page conversion went up by 45% after implementing the WebGL optimizations and custom particle portals taught in Day 3.",
    rating: 5,
  },
  {
    name: "Devon Patel",
    role: "Freelance Creative Developer",
    initials: "DP",
    bg: "from-amber-100 to-orange-100 text-orange-700 border-orange-200/40",
    quote: "The Pro Pass was worth every penny. The portfolio review and Draco compression walkthrough helped me land an agency client within a month.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-4 bg-transparent border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-slate-200 bg-slate-100 text-xs text-slate-600 uppercase tracking-widest font-semibold mb-4">
            Testimonials
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Loved by Developers & Designers
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Read how developers, designers, and creative directors from around the world 
            have leveled up their visual engineering skills.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl border border-slate-200/60 bg-white/60 hover:bg-white shadow-sm hover:shadow-md flex flex-col justify-between text-left hover:border-gold/25 transition-all duration-300"
            >
              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                
                {/* Quote Icon */}
                <div className="text-slate-200 mb-4">
                  <MessageSquare className="w-10 h-10 fill-current" />
                </div>
                
                {/* Quote */}
                <p className="text-slate-600 text-sm leading-relaxed italic mb-8">
                  “{t.quote}”
                </p>
              </div>

              {/* Author details */}
              <div className="flex items-center gap-4 border-t border-slate-100 pt-6 mt-2">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${t.bg} border flex items-center justify-center text-xs font-bold`}>
                  {t.initials}
                </div>
                <div>
                  <span className="block text-sm font-bold text-slate-800">{t.name}</span>
                  <span className="block text-[11px] text-slate-500 font-medium mt-0.5">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
