import { motion } from "framer-motion";
import { Users, Sparkles, Gift } from "lucide-react";

const MODULES = [
  {
    step: "Challenge 01",
    title: "Blind Pair Challenge",
    icon: <Users className="w-5 h-5 text-terracotta" />,
    desc: "Work together to complete a fun creative challenge.",
  },
  {
    step: "Challenge 02",
    title: "Speed Design Challenge",
    icon: <Sparkles className="w-5 h-5 text-olive" />,
    desc: "A timed decoration challenge where creativity meets speed.",
  },
  {
    step: "Challenge 03",
    title: "Lucky Surprise Prize",
    icon: <Gift className="w-5 h-5 text-brown" />,
    desc: "Every participant gets a chance to win exciting prizes through surprise activities during the workshop.",
  },
];

export default function Learn() {
  return (
    <section id="learn" className="py-16 px-4 bg-transparent border-t border-[#8C6A5C]/15">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex px-3 py-1 rounded-full border border-terracotta/25 bg-terracotta/5 text-xs text-terracotta uppercase tracking-wider font-bold mb-4">
            Interactive Play
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2D1E1A] leading-tight">
            Fun Challenges & Prizes
          </h2>
          <p className="text-[#8C6A5C] text-base sm:text-lg mt-4 leading-relaxed">
            Crafting is even better with laughter. Throughout the workshop, we interlace hands-on DIY work with delightful mini challenges to create real memories.
          </p>
        </div>

        {/* Learning Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {MODULES.map((mod, idx) => (
            <motion.div
              key={mod.step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-8 rounded-3xl border border-[#8C6A5C]/10 bg-[#FFFDFB] hover:bg-[#FFFDFB] shadow-sm hover:shadow-md hover:border-terracotta/30 transition-all duration-300 flex flex-col gap-4 text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-terracotta uppercase tracking-wider bg-terracotta/5 border border-terracotta/10 px-2.5 py-1 rounded-full">
                  {mod.step}
                </span>
                <div className="w-9 h-9 rounded-lg bg-[#FAF6F0] flex items-center justify-center border border-[#8C6A5C]/5">
                  {mod.icon}
                </div>
              </div>
              <h3 className="font-display font-bold text-xl text-[#2D1E1A] mt-2">
                {mod.title}
              </h3>
              <p className="text-xs text-[#8C6A5C] leading-relaxed">
                {mod.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
