import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Aarav Sharma",
    role: "Attendee, Duo Pass",
    initials: "AS",
    bg: "bg-terracotta/10 text-terracotta border-terracotta/20",
    quote: "This DIY workshop was the highlight of our weekend! My friend and I made matching woven bracelets and customized canvas pouches. The atmosphere in Mathura was so warm and relaxing.",
    rating: 5,
  },
  {
    name: "Divya Kapoor",
    role: "Local Crafter",
    initials: "DK",
    bg: "bg-olive/10 text-olive border-olive/20",
    quote: "I joined Solo and met so many amazing creative people. The materials provided were premium—canvas pouches, beads, lettered charms. I loved the photogenic corner and the complimentary surprise gifts!",
    rating: 5,
  },
  {
    name: "Rohan & Riya",
    role: "Siblings",
    initials: "RR",
    bg: "bg-brown/10 text-brown border-brown/20",
    quote: "A fantastic, screen-free way to spend Friendship Day. We enjoyed the teamwork games and challenges just as much as the accessories design. Celebrating offline was the best decision.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-4 bg-transparent border-t border-[#8C6A5C]/15">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-terracotta/25 bg-terracotta/5 text-xs text-terracotta uppercase tracking-wider font-bold mb-4">
            Testimonials
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2D1E1A] leading-tight">
            Loved by Friends & Families
          </h2>
          <p className="text-[#8C6A5C] text-base sm:text-lg mt-4 leading-relaxed">
            Read how our participants enjoyed their hands-on creative crafting experience and designed their personalized creations.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl border border-[#8C6A5C]/10 bg-[#FFFDFB] hover:border-terracotta/30 shadow-sm hover:shadow-md flex flex-col justify-between text-left transition-all duration-300"
            >
              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-terracotta fill-terracotta" />
                  ))}
                </div>
                
                {/* Quote Icon */}
                <div className="text-[#FAF6F0] mb-4">
                  <MessageSquare className="w-10 h-10 fill-current text-[#8C6A5C]/10" />
                </div>
                
                {/* Quote */}
                <p className="text-[#3C2E2A] text-xs sm:text-sm leading-relaxed italic mb-8">
                  “{t.quote}”
                </p>
              </div>

              {/* Author details */}
              <div className="flex items-center gap-4 border-t border-[#8C6A5C]/10 pt-6 mt-2">
                <div className={`w-11 h-11 rounded-xl ${t.bg} border flex items-center justify-center text-xs font-bold`}>
                  {t.initials}
                </div>
                <div>
                  <span className="block text-sm font-bold text-[#2D1E1A]">{t.name}</span>
                  <span className="block text-[11px] text-[#8C6A5C] font-semibold mt-0.5">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
