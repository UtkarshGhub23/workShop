import { motion } from "framer-motion";
import { BookOpen, Layers, Terminal, Compass, Zap } from "lucide-react";

const MODULES = [
  {
    day: "Day 01",
    title: "Three.js Foundations & Math",
    icon: <Compass className="w-5 h-5 text-gold" />,
    desc: "Understand vectors, trigonometry, camera setups, lights, and standard geometries. Set up a responsive WebGL rendering loop.",
  },
  {
    day: "Day 02",
    title: "Advanced Interactions & Scroll Controls",
    icon: <Layers className="w-5 h-5 text-orange" />,
    desc: "Build smooth scroll-driven 3D animations, bind interactions to mouse coordinates, and create tactile hover tilts.",
  },
  {
    day: "Day 03",
    title: "Shaders, Materials, & Particle Portals",
    icon: <Terminal className="w-5 h-5 text-pink" />,
    desc: "Dive into GLSL (Vertex and Fragment shaders). Write custom animations for thousands of floating particles on the GPU.",
  },
  {
    day: "Day 04",
    title: "Responsive Interface Engineering",
    icon: <BookOpen className="w-5 h-5 text-lavender" />,
    desc: "Connect React state, build responsive layouts with Tailwind v4, handle input validation with React Hook Form & Zod.",
  },
  {
    day: "Day 05",
    title: "LCP, SEO, & Production Deployment",
    icon: <Zap className="w-5 h-5 text-rose" />,
    desc: "Compress GLTF meshes via Draco. Optimize Cumulative Layout Shift (CLS) and LCP. Deploy seamlessly to Vercel.",
  },
];

export default function Learn() {
  return (
    <section id="learn" className="py-24 px-4 bg-transparent border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-slate-200 bg-slate-100 text-xs text-slate-600 uppercase tracking-widest font-semibold mb-4">
            Curriculum
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            What You'll Learn
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            A comprehensive, step-by-step track taking you from standard React development 
            to high-performance interactive web design.
          </p>
        </div>

        {/* Learning Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((mod, idx) => (
            <motion.div
              key={mod.day}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`p-6 rounded-3xl border border-slate-200/60 bg-white/60 hover:bg-white shadow-sm hover:shadow-md hover:border-gold/20 transition-all duration-300 flex flex-col gap-4 text-left ${
                idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gold uppercase tracking-wider bg-gold/5 border border-gold/10 px-2.5 py-1 rounded-full">
                  {mod.day}
                </span>
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                  {mod.icon}
                </div>
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 mt-2">
                {mod.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {mod.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
