import { Check } from "lucide-react";
import { motion } from "framer-motion";

const PLANS = [
  {
    id: "basic",
    name: "Starter Pass",
    price: "$29",
    billing: "One-time payment",
    popular: false,
    color: "border-slate-200/60 shadow-sm",
    features: [
      "Access to standard DIY crafting session",
      "Basic crafting kit & decorative items",
      "Guidance from experienced instructors",
      "Take home 2 handmade creations",
    ],
  },
  {
    id: "pro",
    name: "Creator Pass",
    price: "$49",
    billing: "One-time payment",
    popular: true,
    color: "border-gold/60 shadow-xl shadow-gold/10",
    features: [
      "Access to extended DIY session",
      "Premium DIY crafting kit & tools",
      "Access to all premium decorative accessories",
      "Take home 5 handmade creations",
      "Digital workshop completion certificate",
      "Complimentary refreshments",
    ],
  },
  {
    id: "vip",
    name: "VIP Craft Pass",
    price: "$79",
    billing: "One-time payment",
    popular: false,
    color: "border-slate-200/60 shadow-sm",
    features: [
      "Access to full-day creative session",
      "Unlimited DIY crafting materials & kits",
      "1-on-1 guidance & custom personalization support",
      "Take home unlimited handmade creations",
      "Access to VIP photography corner & instant prints",
      "Premium certificate + custom gift pack",
    ],
  },
];

export default function Pricing() {
  const handleSelectPlan = (planId: string) => {
    // Select the plan in form state by firing custom event
    window.dispatchEvent(new CustomEvent("select-plan", { detail: planId }));
    
    // Smooth scroll to register form
    const element = document.getElementById("register");
    if (element) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="pricing" className="py-24 px-4 bg-transparent border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-slate-200 bg-slate-100 text-xs text-slate-600 uppercase tracking-widest font-semibold mb-4">
            Pricing plans
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Flexible Ticket Options
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Select the ticket tier that fits your creative style. All passes include a take-home package of your beautiful creations.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PLANS.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className={`relative rounded-3xl border bg-white/60 hover:bg-white p-8 flex flex-col justify-between transition-all duration-300 ${plan.color}`}
            >
              {plan.popular && (
                <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold via-orange to-rose text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md border border-white/20 select-none">
                  Most Popular
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="text-left mb-6">
                  <h3 className="font-display font-bold text-xl text-slate-900">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">{plan.price}</span>
                    <span className="text-xs text-slate-400 font-medium">/ person</span>
                  </div>
                  <span className="block text-[11px] text-slate-400 mt-1.5 font-semibold uppercase tracking-wider">
                    {plan.billing}
                  </span>
                </div>

                {/* Plan Features */}
                <div className="border-t border-slate-100 pt-6 flex flex-col gap-4 text-left">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-gold/5 flex items-center justify-center shrink-0 border border-gold/15 mt-0.5">
                        <Check className="w-3 h-3 text-gold" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-600 leading-normal font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Select Action */}
              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full mt-8 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-sm ${
                  plan.popular
                    ? "bg-slate-900 hover:bg-slate-800 text-white"
                    : "bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800"
                }`}
              >
                Select Pass Tier
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
