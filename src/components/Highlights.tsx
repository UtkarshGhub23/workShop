import { motion } from "framer-motion";
import { Package, Palette, Sparkles, Heart, Award, Gift, Smile, Camera } from "lucide-react";

const CARDS = [
  {
    icon: <Package className="w-8 h-8 text-gold" />,
    title: "Complete DIY Kit",
    desc: "Every attendee receives a curated craft kit with all necessary bases, adhesives, tools, and stencils.",
  },
  {
    icon: <Palette className="w-8 h-8 text-orange" />,
    title: "Premium Craft Materials",
    desc: "Access a wide selection of leather, canvas, paints, fabric dyes, resins, and structural components.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-pink" />,
    title: "Professional Guidance",
    desc: "Learn from professional artisans and experienced craft creators who assist you throughout the process.",
  },
  {
    icon: <Heart className="w-8 h-8 text-lavender" />,
    title: "Decorative Accessories",
    desc: "Thousands of beads, custom letter tiles, glitters, ribbons, tassels, and charms to style your pieces.",
  },
  {
    icon: <Award className="w-8 h-8 text-gold" />,
    title: "Workshop Certificate",
    desc: "Receive an elegant printed DIY Creative Workshop Badge and Certificate of Completion.",
  },
  {
    icon: <Gift className="w-8 h-8 text-orange" />,
    title: "Take Home Your Creations",
    desc: "Everything you design, stitch, paint, or assemble is yours to take home in our aesthetic paper bags.",
  },
  {
    icon: <Smile className="w-8 h-8 text-pink" />,
    title: "Fun Activities & Games",
    desc: "Break the ice with social crafting rounds, community design challenges, and music.",
  },
  {
    icon: <Camera className="w-8 h-8 text-lavender" />,
    title: "Photography Corner",
    desc: "Shoot aesthetic high-resolution photos of your crafted accessories at our ring-lit photo backdrops.",
  },
];

export default function Highlights() {
  return (
    <section id="highlights" className="py-24 px-4 bg-transparent border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-slate-200 bg-slate-100 text-xs text-slate-600 uppercase tracking-widest font-semibold mb-4">
            What's Included
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Premium Crafting Experience
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            We provide everything required to unlock your imagination. Check out the perks, supplies, and 
            creative facilities included in your registration ticket.
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
