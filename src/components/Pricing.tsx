import { Check } from "lucide-react";
import { motion } from "framer-motion";

const PLANS = [
  {
    id: "basic",
    name: "Starter Pass",
    price: "$99",
    billing: "One-time payment",
    popular: false,
    color: "border-slate-200/60 shadow-sm",
    features: [
      "Access to all 5 days of live classes",
      "Standard project repository template files",
      "Public Discord server text channels access",
      "Digital Certificate of attendance",
    ],
  },
  {
    id: "pro",
    name: "Developer Pass",
    price: "$199",
    billing: "One-time payment",
    popular: true,
    color: "border-gold/60 shadow-xl shadow-gold/10",
    features: [
      "Access to all live classes + lifetime recordings",
      "Advanced Draco-compressed GLTF assets",
      "Two 1-on-1 code critiques with mentors",
      "Priority Discord channel & direct DM access",
      "Official WebGL Developer Badge Certificate",
      "Resume & Portfolio review support",
    ],
  },
  {
    id: "vip",
    name: "VIP Elite Pass",
    price: "$399",
    billing: "One-time payment",
    popular: false,
    color: "border-slate-200/60 shadow-sm",
    features: [
      "Everything in Developer Pass",
      "Two private 45-minute mentoring calls",
      "Tailored UI/UX portfolio mockup design",
      "Vercel serverless deployment setup consult",
      "1-on-1 career mapping & mock interview",
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
            Select the ticket tier that fits your learning style. Get lifetime benefits, code reviews, 
            and verified certificates.
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
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-gold to-orange px-4 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>
              )}

              <div>
                <span className="block text-slate-500 text-xs font-bold uppercase tracking-wider">{plan.name}</span>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900">{plan.price}</span>
                  <span className="text-xs text-slate-500 font-medium">{plan.billing}</span>
                </div>
                
                {/* Divider */}
                <div className="w-full h-px bg-slate-100 my-6"></div>

                <ul className="flex flex-col gap-3.5 text-left mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-gold/10">
                        <Check className="w-3 h-3 text-gold" />
                      </div>
                      <span className="text-slate-600 text-xs sm:text-sm">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-3 rounded-2xl font-bold text-sm tracking-wide transition-all cursor-pointer ${
                  plan.popular
                    ? "bg-gradient-to-r from-gold via-orange to-rose text-white shadow-lg shadow-orange/15 hover:shadow-orange/25 hover:-translate-y-0.5 active:translate-y-0"
                    : "border border-slate-200 hover:border-slate-350 text-slate-800 bg-slate-50 hover:bg-slate-100"
                }`}
              >
                Choose Ticket
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
