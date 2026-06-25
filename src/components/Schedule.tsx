import { motion } from "framer-motion";
import { Heart, Sparkles, Clock, Gift, Users, Palette, Award } from "lucide-react";

const WHY_JOIN_ITEMS = [
  {
    title: "Celebrate Friendship Day Differently",
    icon: <Heart className="w-6 h-6 text-terracotta" />,
    desc: "Move past the standard weekend text message or cafe plans. Spend a creative afternoon crafting side-by-side with your favorite people.",
  },
  {
    title: "Create Memories Together",
    icon: <Sparkles className="w-6 h-6 text-terracotta" />,
    desc: "Build strong emotional bonds with your friend, partner, or sibling through collaborative art and shared design decisions.",
  },
  {
    title: "Enjoy Quality Offline Time",
    icon: <Clock className="w-6 h-6 text-olive" />,
    desc: "Disconnect from screens, notifications, and work stress. Ground yourself in the calming, tactile process of physical creation.",
  },
  {
    title: "Take Home Handmade Creations",
    icon: <Gift className="w-6 h-6 text-olive" />,
    desc: "Carry home your custom canvas pouches and woven friendship bands as tangible tokens of a special afternoon.",
  },
  {
    title: "Meet Creative People",
    icon: <Users className="w-6 h-6 text-brown" />,
    desc: "Connect with Mathura's welcoming local art community. Share stories, ideas, and laughs in a warm creative environment.",
  },
  {
    title: "Try Something New",
    icon: <Palette className="w-6 h-6 text-terracotta" />,
    desc: "Step outside your comfort zone. Learn how to weave custom beads and paint fabric under the care of supportive organizers.",
  },
  {
    title: "Win Exciting Prizes",
    icon: <Award className="w-6 h-6 text-brown" />,
    desc: "Show off your teamwork skills during our mini games and surprise activities to take home beautiful bonus rewards.",
  },
];

export default function Schedule() {
  return (
    <section id="schedule" className="py-24 px-4 bg-transparent border-t border-[#8C6A5C]/15">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-terracotta/25 bg-terracotta/5 text-xs text-terracotta uppercase tracking-wider font-bold mb-4">
            Why Join Us?
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2D1E1A] leading-tight">
            An Experience Made for Connection
          </h2>
          <p className="text-[#8C6A5C] text-base sm:text-lg mt-4 leading-relaxed">
            Our workshop is designed from the ground up to feel warm, inclusive, and deeply memorable. Here is why you should spend your afternoon with us.
          </p>
        </div>

        {/* Why Join Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_JOIN_ITEMS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`p-8 rounded-3xl border border-[#8C6A5C]/10 bg-[#FFFDFB] hover:border-terracotta/30 transition-all duration-300 flex flex-col gap-4 text-left shadow-sm hover:shadow-md ${
                idx === 6 ? "md:col-span-2 lg:col-span-3 lg:max-w-md lg:mx-auto" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] border border-[#8C6A5C]/5 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-[#2D1E1A] mt-2">
                {item.title}
              </h3>
              <p className="text-xs text-[#8C6A5C] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
