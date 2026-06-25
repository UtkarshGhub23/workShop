import { motion } from "framer-motion";
import { MessageSquareCode, Award, Flame, Globe2 } from "lucide-react";

const CARDS = [
  {
    icon: <MessageSquareCode className="w-8 h-8 text-gold" />,
    title: "1-on-1 Feedback Loops",
    desc: "Submit your code directly to Aarav & Tara for personalized design critiques, performance profiling, and code reviews.",
  },
  {
    icon: <Flame className="w-8 h-8 text-orange" />,
    title: "Project-Based Coding",
    desc: "No boring slides. You'll build and publish three fully-functioning, high-end 3D landing pages step-by-step.",
  },
  {
    icon: <Globe2 className="w-8 h-8 text-pink" />,
    title: "WebGL & WebGPU Specs",
    desc: "Master asset compression (GLTF/DRACO), camera paths, light baking, and basic custom glsl fragment shaders.",
  },
  {
    icon: <Award className="w-8 h-8 text-lavender" />,
    title: "Official Developer Badge",
    desc: "Obtain a verified WebGL & Interaction Developer Certificate and add it to your LinkedIn / resume.",
  },
];

export default function Highlights() {
  return (
    <section id="highlights" className="py-24 px-4 bg-transparent border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-slate-200 bg-slate-100 text-xs text-slate-600 uppercase tracking-widest font-semibold mb-4">
            Highlights
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Designed for Active Growth
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Everything you need to level up your development capabilities. Get hands-on mentorship, 
            learn modern performance practices, and build a standout creative portfolio.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group p-6 rounded-3xl border border-slate-200/60 bg-white/60 hover:bg-white shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-300 flex flex-col gap-4 text-left"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200/50 group-hover:scale-105 group-hover:bg-slate-200/55 transition-all duration-300">
                {card.icon}
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-gold transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
