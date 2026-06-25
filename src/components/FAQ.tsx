import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "What are the prerequisites for this workshop?",
    a: "Basic familiarity with React, HTML, and CSS is recommended. Prior mathematical training or WebGL experience is NOT required; we teach coordinate systems, vectors, and rendering pipelines from scratch.",
  },
  {
    q: "Will the live classes be recorded?",
    a: "Yes, all live sessions are recorded and uploaded within 2 hours. Developer Pass and VIP Pass holders get lifetime access to all lecture videos, source code, and assets.",
  },
  {
    q: "Is there a certificate provided?",
    a: "Yes! Everyone who registers and submits the course projects will receive an official WebGL and Creative Developer Badge Certificate signed by Aarav & Tara.",
  },
  {
    q: "What is your refund policy?",
    a: "We offer a full 100% refund up to 48 hours before the workshop launches on August 24, 2026. Send an email and we will process it, no questions asked.",
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
            Can't find what you are looking for? Reach out on our Discord or drop us an 
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
