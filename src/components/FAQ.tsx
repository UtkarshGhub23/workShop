import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Is the workshop beginner-friendly?",
    a: "Yes, absolutely! No prior crafting or design experience is required. Our experienced instructors will guide you step-by-step through the entire process.",
  },
  {
    q: "What materials are provided?",
    a: "Every registration includes a complete DIY kit containing premium base items (bags, canvases, charms), high-quality paints, safe adhesives, stencils, glitter, and other decorative accessories.",
  },
  {
    q: "Can children participate?",
    a: "Yes, children aged 8 and above are welcome to join. We design our activities to be safe and engaging for all age groups.",
  },
  {
    q: "Can I come with friends?",
    a: "Of course! Crafting is a fantastic social activity. You can register as a group, come with friends, family, or partners to share a fun creative session.",
  },
  {
    q: "Will I take my creations home?",
    a: "Yes, every single handmade item you design and customize during the workshop is yours to take home in our aesthetic paper bags.",
  },
  {
    q: "Is prior experience required?",
    a: "No prior crafting, sewing, or painting experience is required. Just bring your enthusiasm and imagination!",
  },
  {
    q: "Will certificates be provided?",
    a: "Yes, all participants will receive a beautiful DIY Creative Workshop Certificate of Completion upon finishing their handcrafted items.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-4 bg-transparent border-t border-slate-200/50">
      <div className="max-w-3xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-slate-200 bg-slate-100 text-xs text-slate-600 uppercase tracking-widest font-semibold mb-4">
            Common Questions
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
            Can't find what you are looking for? Reach out on our WhatsApp or drop us an 
            email in our contact section.
          </p>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200/60 bg-white/60 hover:bg-white shadow-sm transition-colors overflow-hidden text-left"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-slate-800 font-bold text-base sm:text-lg focus:outline-none cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-gold" : ""
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
                      <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
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
