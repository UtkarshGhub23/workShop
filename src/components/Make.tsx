import { motion } from "framer-motion";
import { ExternalLink, Layers, Palette, ShoppingBag, Briefcase, Heart, Sparkles, Key, Flower, Scissors, LucideIcon } from "lucide-react";

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
    title: "Mini Bags",
    icon: ShoppingBag,
    iconColor: "text-amber-500",
    gradient: "from-amber-400 to-orange-500",
    tech: "Vegan Leather + Stitching",
    desc: "Design, stitch, and decorate your own compact, trendy mini bags using premium vegan leather or heavy felt.",
  },
  {
    title: "Tote Bags",
    icon: Briefcase,
    iconColor: "text-pink",
    gradient: "from-pink-400 to-rose-500",
    tech: "Canvas + Fabric Painting",
    desc: "Customize canvas tote bags with fabric paint, stencils, embroidery, or iron-on custom designs.",
  },
  {
    title: "Pouches",
    icon: Layers,
    iconColor: "text-lavender",
    gradient: "from-purple-400 to-indigo-500",
    tech: "Felt + Zippers",
    desc: "Create beautiful multi-purpose makeup or pencil pouches, fitted with custom zippers and decorative patches.",
  },
  {
    title: "Friendship Bracelets",
    icon: Heart,
    iconColor: "text-blue-500",
    gradient: "from-blue-400 to-cyan-500",
    tech: "Beading + Weaving",
    desc: "Weave intricate thread patterns, customize with lettered beads, and make matching wristbands for friends.",
  },
  {
    title: "Phone Charms",
    icon: Sparkles,
    iconColor: "text-rose-500",
    gradient: "from-rose-400 to-red-500",
    tech: "Beaded Chains + Charms",
    desc: "Assemble colorful, aesthetic beaded phone wristlets with customized lettering and metallic spacers.",
  },
  {
    title: "Keychains",
    icon: Key,
    iconColor: "text-yellow-500",
    gradient: "from-yellow-400 to-amber-500",
    tech: "Acrylic + Resin Art",
    desc: "Design leather or acrylic keychains customized with resin art, metal charms, and personalized initials.",
  },
  {
    title: "Decorative Flowers",
    icon: Flower,
    iconColor: "text-emerald-500",
    gradient: "from-emerald-400 to-teal-500",
    tech: "Crepe Paper + Wire Framing",
    desc: "Handcraft lifelike decorative flowers using felt, crepe paper, wire framing, and fabric sprays.",
  },
  {
    title: "Mini Canvas Art",
    icon: Palette,
    iconColor: "text-indigo-500",
    gradient: "from-indigo-400 to-violet-500",
    tech: "Acrylic Paint + Easels",
    desc: "Paint your own miniature easel canvases using professional acrylics, modeling paste, and gold leaf.",
  },
  {
    title: "Personalized DIY Accessories",
    icon: Scissors,
    iconColor: "text-pink-500",
    gradient: "from-pink-500 to-fuchsia-600",
    tech: "Aesthetic Clips & Mirrors",
    desc: "Bespoke hair clips, custom mirrors, or decorative patches crafted to match your signature aesthetic.",
  },
];

export default function Make() {
  return (
    <section id="make" className="py-24 px-4 bg-transparent border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-slate-200 bg-slate-100 text-xs text-slate-600 uppercase tracking-widest font-semibold mb-4">
            Workshop Items
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            What You'll Create
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Gain practical hands-on experience. Customize and decorate beautiful handcrafted items 
            that you get to take home at the end of the session.
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
                    <span className="text-xs font-bold uppercase tracking-wider">Item {idx + 1}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-gold transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mt-2">
                    {proj.desc}
                  </p>
                </div>
                
                <div className="border-t border-slate-100 pt-4 mt-4 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                  <span>View Material Details</span>
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
