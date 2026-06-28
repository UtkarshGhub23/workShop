import { motion } from "framer-motion";
import { Package, Gift, Users, Award } from "lucide-react";

const CARDS = [
  {
    icon: <Package className="w-8 h-8 text-terracotta" />,
    title: "All Materials Included",
    desc: "We supply all bases, canvas pouches, leather bands, needles, yarns, beads, paints, and tools.",
  },
  {
    icon: <Gift className="w-8 h-8 text-terracotta" />,
    title: "Take Home Your Creations",
    desc: "Everything you stitch, paint, bead, or customize goes home with you in our custom premium bags.",
  },
  {
    icon: <Users className="w-8 h-8 text-olive" />,
    title: "Limited Seats",
    desc: "We keep group sizes small to ensure everyone receives personal guidance and a cozy crafting space.",
  },
  {
    icon: <Award className="w-8 h-8 text-brown" />,
    title: "Games & Prizes",
    desc: "Participate in quick-fire creative icebreakers, collaborative teamwork games, and win exciting prizes.",
  },
];

export default function Highlights() {
  return (
    <section id="highlights" className="py-16 px-4 bg-transparent border-t border-[#8C6A5C]/15">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-terracotta/25 bg-terracotta/5 text-xs text-terracotta uppercase tracking-wider font-bold mb-4">
            Workshop Highlights
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2D1E1A] leading-tight">
            Designed For Connection
          </h2>
          <p className="text-[#8C6A5C] text-base sm:text-lg mt-4 leading-relaxed">
            Experience a curated blend of creative hands-on craftwork, friendly interaction, and offline relaxation that goes beyond a standard class.
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
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group p-6 rounded-3xl border border-[#8C6A5C]/10 bg-[#FFFDFB] hover:bg-[#FFFDFB] shadow-sm hover:shadow-md hover:border-terracotta/30 transition-all duration-300 flex flex-col gap-4 text-left"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#FAF6F0] flex items-center justify-center border border-[#8C6A5C]/5 group-hover:scale-105 group-hover:bg-[#F5EFEB] transition-all duration-300">
                {card.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-[#2D1E1A] group-hover:text-terracotta transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-[#8C6A5C] leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
