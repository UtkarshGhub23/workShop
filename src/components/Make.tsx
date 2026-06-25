import { motion } from "framer-motion";
import { ExternalLink, Layers, Orbit, Palette, LucideIcon } from "lucide-react";

interface Project {
  title: string;
  icon: LucideIcon;
  iconColor: string;
  gradient: string;
  tech: string;
  desc: string;
}

const PROJECTS: Project[] = [
  {
    title: "Interactive 3D Product Customizer",
    icon: Palette,
    iconColor: "text-gold",
    gradient: "from-amber-500 to-orange-600",
    tech: "React + Three.js + OrbitControls",
    desc: "A premium product showcase where users can customize parts, trigger animated assembly explosions, and interact with realistic metallic reflections.",
  },
  {
    title: "Dynamic Particle Portal Landing Page",
    icon: Orbit,
    iconColor: "text-pink",
    gradient: "from-pink-500 to-rose-600",
    tech: "GLSL Shaders + Points Material",
    desc: "A responsive homepage featuring an interactive black-hole particle vortex that sways and expands dynamically with cursor speed and scrolling.",
  },
  {
    title: "Immersive Glassmorphic Portfolio",
    icon: Layers,
    iconColor: "text-lavender",
    gradient: "from-purple-500 to-indigo-600",
    tech: "TypeScript + Tailwind v4 + Framer Motion",
    desc: "A state-of-the-art developer portfolio combining full-screen view transitions, elastic slide animations, and responsive bento grid layouts.",
  },
];

export default function Make() {
  return (
    <section id="make" className="py-24 px-4 bg-transparent border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-slate-200 bg-slate-100 text-xs text-slate-600 uppercase tracking-widest font-semibold mb-4">
            Projects
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            What You'll Build
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Gain practical experience by coding real-world premium interfaces. No placeholder 
            assignments — you will finish with three production-ready web assets.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group rounded-3xl border border-slate-200/60 bg-white/60 hover:bg-white shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 flex flex-col text-left hover:border-gold/30"
            >
              {/* Card visual showcase */}
              <div className={`h-48 bg-gradient-to-br ${proj.gradient} flex items-center justify-center relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-300`}>
                {/* Visual grid backdrop inside card visual */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
                <proj.icon className="w-20 h-20 text-white/90 filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 select-none" />
                
                {/* Tech tag floating */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-700">
                  {proj.tech}
                </div>
              </div>

              {/* Card content details */}
              <div className="p-6 flex flex-col gap-3 flex-grow justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-gold">
                    <proj.icon className={`w-6 h-6 ${proj.iconColor}`} />
                    <span className="text-xs font-bold uppercase tracking-wider">Project {idx + 1}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-gold transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mt-2">
                    {proj.desc}
                  </p>
                </div>
                
                <div className="border-t border-slate-100 pt-4 mt-4 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                  <span>View Project Specs</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
