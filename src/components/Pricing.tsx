import { Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface PricingProps {
  onNavigate: (view: "home" | "team" | "faq" | "register") => void;
}

export default function Pricing({ onNavigate }: PricingProps) {

  return (
    <section id="pricing" className="py-24 px-4 bg-transparent border-t border-[#8C6A5C]/15">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex px-3 py-1 rounded-full border border-terracotta/25 bg-terracotta/5 text-xs text-terracotta uppercase tracking-wider font-bold mb-4">
            Workshop Pricing
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2D1E1A] leading-tight">
            Pass Options & Access
          </h2>
          <p className="text-[#8C6A5C] text-base sm:text-lg mt-4 leading-relaxed">
            Register your interest today to receive updates and secure a slot. Early-bird slots are highly limited.
          </p>
        </div>

        {/* Unified pricing card */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[32px] border border-[#8C6A5C]/15 bg-[#FFFDFB] p-8 sm:p-12 shadow-sm text-center flex flex-col items-center gap-6 overflow-hidden"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-olive/10 text-olive text-[10px] font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Limited Slots Available
            </div>

            {/* Price range */}
            <div className="flex flex-col items-center gap-1 mt-2">
              <span className="text-[11px] uppercase tracking-widest text-[#8C6A5C] font-semibold">Passes Starting From</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-5xl sm:text-6xl font-extrabold text-[#2D1E1A] tracking-tight">₹599–₹699</span>
                <span className="text-xs text-[#8C6A5C] font-medium">/ person</span>
              </div>
            </div>

            <p className="text-xs text-[#8C6A5C] leading-relaxed max-w-lg">
              Final pricing tiers and duo discounts will be announced soon. Register your interest below to lock in priority access and receive notification the moment ticket sales go live.
            </p>

            {/* Features preview */}
            <div className="w-full max-w-lg border-y border-[#8C6A5C]/10 py-6 my-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {[
                "All premium craft materials provided",
                "Customize pouch or waist bag",
                "Make two friendship bracelets",
                "Access to interactive mini games",
                "Aesthetic photography corner",
                "Complimentary take-home keepsakes",
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-terracotta/5 flex items-center justify-center shrink-0 border border-terracotta/15">
                    <Check className="w-3 h-3 text-terracotta" />
                  </div>
                  <span className="text-xs text-[#3C2E2A] font-semibold">{feat}</span>
                </div>
              ))}
            </div>

            {/* Select Action */}
            <button
              onClick={() => onNavigate("register")}
              className="px-8 py-4 rounded-full bg-terracotta hover:bg-brown text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-terracotta/15 hover:shadow-terracotta/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer w-full sm:w-auto mt-4"
            >
              Notify Me When Registrations Open
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
