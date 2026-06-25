import { motion } from "framer-motion";
import { Brush, Palette, Sparkles, Scissors, Smile, CheckCircle2, Users, Lightbulb } from "lucide-react";

const MODULES = [
  {
    step: "Skills 01",
    title: "Creative Designing",
    icon: <Brush className="w-5 h-5 text-gold" />,
    desc: "Learn to visualize and plan your handcrafted pieces, sketching initial layouts and structures before picking your materials.",
  },
  {
    step: "Skills 02",
    title: "Color Matching",
    icon: <Palette className="w-5 h-5 text-orange" />,
    desc: "Understand complementary color palettes, textures, and shading patterns to make your personalized creations visually stunning.",
  },
  {
    step: "Skills 03",
    title: "Decorative Techniques",
    icon: <Sparkles className="w-5 h-5 text-pink" />,
    desc: "Master the application of accessories, glitter, embroidery, ribbons, and decals to add detail and personality.",
  },
  {
    step: "Skills 04",
    title: "DIY Craft Skills",
    icon: <Scissors className="w-5 h-5 text-lavender" />,
    desc: "Get hands-on training with crafting tools, safe adhesives, molding materials, and assembly procedures.",
  },
  {
    step: "Skills 05",
    title: "Personalization Techniques",
    icon: <Smile className="w-5 h-5 text-rose" />,
    desc: "Learn how to embed names, initials, custom quotes, and bespoke design assets into your handmade bags or charms.",
  },
  {
    step: "Skills 06",
    title: "Finishing & Presentation",
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
    desc: "Discover sealing, coating, and polishing methods that protect your accessories and give them a professional, store-bought look.",
  },
  {
    step: "Skills 07",
    title: "Team Collaboration",
    icon: <Users className="w-5 h-5 text-blue-500" />,
    desc: "Engage in group crafting projects, sharing ideas and resources with fellow participants in a cooperative workshop environment.",
  },
  {
    step: "Skills 08",
    title: "Creative Thinking",
    icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
    desc: "Unleash your imagination by solving design challenges and exploring unconventional crafting materials.",
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
            Gain concrete, reusable crafting skills. Our comprehensive schedule guides you from initial planning 
            and design concepts to professional finishing techniques.
          </p>
        </div>

        {/* Learning Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((mod, idx) => (
            <motion.div
              key={mod.step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 rounded-3xl border border-slate-200/60 bg-white/60 hover:bg-white shadow-sm hover:shadow-md hover:border-gold/20 transition-all duration-300 flex flex-col gap-4 text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gold uppercase tracking-wider bg-gold/5 border border-gold/10 px-2.5 py-1 rounded-full">
                  {mod.step}
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
