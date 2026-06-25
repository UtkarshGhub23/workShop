import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Who can participate?",
    a: "Anyone! This experience is open to individuals, friends, couples, siblings, and families. Everyone is welcome regardless of age or crafting background.",
  },
  {
    q: "Do I need previous experience?",
    a: "Not at all. The workshop is designed to be fully beginner-friendly. Our instructors will provide step-by-step guidance to help you craft your items with ease.",
  },
  {
    q: "Will materials be provided?",
    a: "Yes. Every participant receives a complete crafting kit. We provide the canvas pouches, waist bags, threads, beads, tassels, paints, stencils, and all necessary tools.",
  },
  {
    q: "Can I take my creations home?",
    a: "Absolutely! Every item you design, craft, and personalize during the session is yours to keep and take home.",
  },
  {
    q: "How long will the workshop last?",
    a: "The workshop lasts approximately 2.5 to 3 hours. This leaves plenty of time for hands-on crafting, playing mini games, taking photos, and relaxing.",
  },
  {
    q: "Can children participate?",
    a: "Yes! Children of all ages are welcome to join. It is a fantastic offline creative weekend activity for kids and families.",
  },
  {
    q: "Will there be prizes?",
    a: "Yes. We have fun interactive mini games and creative challenges throughout the session, with exciting surprise prizes for the winners.",
  },
];

interface FAQProps {
  onBackToHome: () => void;
}

export default function FAQ({ onBackToHome }: FAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-4 bg-transparent border-t border-[#8C6A5C]/15">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Button */}
        <div className="mb-10 text-left">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-terracotta/25 hover:border-terracotta/55 bg-[#FFFDFB] hover:bg-white text-terracotta text-xs font-bold uppercase tracking-wider transition-all cursor-pointer focus:outline-none"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </button>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-terracotta/25 bg-terracotta/5 text-xs text-terracotta uppercase tracking-wider font-bold mb-4">
            Common Questions
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2D1E1A] leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[#8C6A5C] text-xs sm:text-sm mt-4 leading-relaxed">
            Need more details? Feel free to reach out to us on WhatsApp or Instagram in our location and contact section.
          </p>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-[#8C6A5C]/10 bg-[#FFFDFB] hover:border-terracotta/20 shadow-sm transition-all duration-300 overflow-hidden text-left"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-[#2D1E1A] font-bold text-base sm:text-lg focus:outline-none cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8C6A5C] transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-terracotta" : ""
                    }`}
                  />
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 text-xs sm:text-sm text-[#8C6A5C] leading-relaxed border-t border-[#8C6A5C]/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
