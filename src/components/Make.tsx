import { motion } from "framer-motion";
import { ShoppingBag, Heart, Users, Sparkles, Layers, Gift } from "lucide-react";

const PROJECTS = [
  {
    title: "Personalized Pouch or Waist Bag",
    icon: ShoppingBag,
    iconColor: "text-terracotta",
    bgClass: "bg-[#FFFDFB]",
    tech: "Canvas Customization",
    desc: "Design and personalize your own aesthetic canvas pouch or multi-purpose waist bag using modern textile paints, custom patches, and minimalist accents.",
  },
  {
    title: "Two Friendship Bracelets",
    icon: Heart,
    iconColor: "text-terracotta",
    bgClass: "bg-[#FFFDFB]",
    tech: "Weaving & Beading",
    desc: "Craft two unique friendship bracelets using a collection of premium lettering beads, colorful threads, metallic spacers, and tassels to wear or share.",
  },
  {
    title: "Fun Interactive Mini Games",
    icon: Users,
    iconColor: "text-olive",
    bgClass: "bg-[#FFFDFB]",
    tech: "Teamwork & Icebreakers",
    desc: "Participate in engaging teamwork games and quick-fire creative tasks designed to help you connect and celebrate together.",
  },
  {
    title: "Surprise Creative Activities",
    icon: Sparkles,
    iconColor: "text-olive",
    bgClass: "bg-[#FFFDFB]",
    tech: "Special Collaborations",
    desc: "Enjoy mystery design rounds and cooperative crafting activities that spark spontaneous joy and laughter.",
  },
  {
    title: "Aesthetic Photo Corner",
    icon: Layers,
    iconColor: "text-brown",
    bgClass: "bg-[#FFFDFB]",
    tech: "Pinterest Photo Booth",
    desc: "Capture beautiful polaroids and aesthetic social photos of your handiwork and memories at our custom-designed photogenic corner.",
  },
  {
    title: "Complimentary Surprises",
    icon: Gift,
    iconColor: "text-terracotta",
    bgClass: "bg-[#FFFDFB]",
    tech: "All Materials Included",
    desc: "Every registration includes premium craft materials, step-by-step guidance, and lovely complimentary surprise gifts to take home.",
  },
];

export default function Make() {
  return (
    <section id="make" className="py-24 px-4 bg-transparent border-t border-[#8C6A5C]/15">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-terracotta/25 bg-terracotta/5 text-xs text-terracotta uppercase tracking-wider font-bold mb-4">
            Creative Keepsakes
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2D1E1A] leading-tight">
            What You'll Create
          </h2>
          <p className="text-[#8C6A5C] text-base sm:text-lg mt-4 leading-relaxed">
            Every participant will receive a complete kit of premium supplies, detailed instructions, and guidance to design aesthetic items you'll take home.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group rounded-3xl border border-[#8C6A5C]/10 bg-[#FFFDFB] hover:bg-[#FFFDFB] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col text-left hover:border-terracotta/30 overflow-hidden"
            >
              {/* Card visual showcase */}
              <div className="h-44 bg-[#F5EFEB] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(140,106,92,0.1)_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
                <proj.icon className={`w-16 h-16 ${proj.iconColor} filter drop-shadow-sm group-hover:scale-110 transition-transform duration-500`} />
                
                {/* Tech tag floating */}
                <div className="absolute bottom-3 left-3 bg-[#FFFDFB] px-3 py-1 rounded-lg border border-[#8C6A5C]/10 text-[10px] font-bold text-[#8C6A5C] uppercase tracking-wider">
                  {proj.tech}
                </div>
              </div>

              {/* Card content details */}
              <div className="p-6 flex flex-col gap-3 flex-grow justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-terracotta uppercase tracking-wider">Activity {idx + 1}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#2D1E1A] group-hover:text-terracotta transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-[#8C6A5C] leading-relaxed mt-1">
                    {proj.desc}
                  </p>
                </div>
                
                <div className="border-t border-[#8C6A5C]/5 pt-4 mt-2 flex items-center justify-between text-[11px] font-semibold text-[#8C6A5C] group-hover:text-terracotta transition-colors">
                  <span>Take Home Creations</span>
                  <span className="text-[9px] uppercase tracking-wider text-olive bg-olive/5 px-2 py-0.5 rounded-full font-bold">Included</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
