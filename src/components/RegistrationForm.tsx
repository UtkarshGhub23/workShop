import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Loader2, Sparkles, User, Mail, Phone, Code, Ticket, CheckSquare } from "lucide-react";

// 1. Define Zod validation schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
  experience: z.enum(["beginner", "intermediate", "advanced"]),
  plan: z.enum(["basic", "pro", "vip"]),
  track: z.enum(["threejs", "shaders", "performance"]),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegistrationForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<RegisterFormData | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      experience: "intermediate",
      plan: "pro",
      track: "threejs",
      terms: undefined,
    },
  });

  // Listen to select-plan event from Pricing component
  useEffect(() => {
    const handleSelectPlan = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail === "basic" || customEvent.detail === "pro" || customEvent.detail === "vip") {
        setValue("plan", customEvent.detail);
      }
    };

    window.addEventListener("select-plan", handleSelectPlan);
    return () => window.removeEventListener("select-plan", handleSelectPlan);
  }, [setValue]);

  const onSubmit = async (data: RegisterFormData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmittedData(data);
    setIsSuccess(true);
    // Dispatch custom event to notify PWA successful registration
    window.dispatchEvent(
      new CustomEvent("show-toast", {
        detail: { message: "Pass secured successfully!", type: "success" },
      })
    );
  };

  const handleReset = () => {
    reset();
    setIsSuccess(false);
    setSubmittedData(null);
  };

  return (
    <section id="register" className="py-24 px-4 bg-transparent border-t border-slate-200/50 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-2xl mx-auto relative">
        <div className="glassmorphic border border-slate-200/60 rounded-3xl p-8 sm:p-10 shadow-xl relative">
          
          {/* Shimmer loading border effect */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-orange to-rose rounded-t-3xl"></div>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col text-left"
              >
                {/* Form Header */}
                <div className="mb-8">
                  <h2 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight flex items-center gap-2">
                    Claim Your Pass <Sparkles className="w-6 h-6 text-gold" />
                  </h2>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                    Reserve your interactive developer seat today. Fill in your information, choose 
                    your track focus, and secure your place.
                  </p>

                  {/* Seat meter */}
                  <div className="mt-5 p-3 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col gap-2 shadow-sm">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                      <span>Live Cohort Limit</span>
                      <span className="text-gold">42 / 60 Seats Registered</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full w-[70%] bg-gradient-to-r from-gold to-rose rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Main Form element */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                      <input
                        {...register("name")}
                        placeholder="John Doe"
                        type="text"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all h-[46px] shadow-sm"
                        aria-invalid={errors.name ? "true" : "false"}
                      />
                    </div>
                    {errors.name && (
                      <span className="text-rose text-xs mt-1 block">{errors.name.message}</span>
                    )}
                  </div>

                  {/* Email & Phone side-by-side on desktop */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Email field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                        <input
                          {...register("email")}
                          placeholder="john@example.com"
                          type="email"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all h-[46px] shadow-sm"
                          aria-invalid={errors.email ? "true" : "false"}
                        />
                      </div>
                      {errors.email && (
                        <span className="text-rose text-xs mt-1 block">{errors.email.message}</span>
                      )}
                    </div>

                    {/* Phone field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                        <input
                          {...register("phone")}
                          placeholder="+1 (555) 019-2834"
                          type="tel"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all h-[46px] shadow-sm"
                          aria-invalid={errors.phone ? "true" : "false"}
                        />
                      </div>
                      {errors.phone && (
                        <span className="text-rose text-xs mt-1 block">{errors.phone.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Level & Track Dropdowns */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Experience level */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Experience Level</label>
                      <div className="relative">
                        <Code className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                        <select
                          {...register("experience")}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-850 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all h-[46px] appearance-none cursor-pointer shadow-sm"
                        >
                          <option value="beginner" className="bg-white text-slate-800">Beginner (React Basics)</option>
                          <option value="intermediate" className="bg-white text-slate-800">Intermediate (JS + Code APIs)</option>
                          <option value="advanced" className="bg-white text-slate-800">Advanced (WebGL/Mesh expert)</option>
                        </select>
                      </div>
                      {errors.experience && (
                        <span className="text-rose text-xs mt-1 block">{errors.experience.message}</span>
                      )}
                    </div>

                    {/* Track choice */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Primary Track Focus</label>
                      <div className="relative">
                        <Code className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                        <select
                          {...register("track")}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-855 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all h-[46px] appearance-none cursor-pointer shadow-sm"
                        >
                          <option value="threejs" className="bg-white text-slate-800">WebGL Core (Three.js)</option>
                          <option value="shaders" className="bg-white text-slate-800">GPU Custom shaders (GLSL)</option>
                          <option value="performance" className="bg-white text-slate-800">Responsive Interfaces (React/TS)</option>
                        </select>
                      </div>
                      {errors.track && (
                        <span className="text-rose text-xs mt-1 block">{errors.track.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Plan Choice (linked to pricing selections) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Choose Plan Tier</label>
                    <div className="relative">
                      <Ticket className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                      <select
                        {...register("plan")}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-855 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all h-[46px] appearance-none cursor-pointer shadow-sm"
                      >
                        <option value="basic" className="bg-white text-slate-800">Starter Pass — $99</option>
                        <option value="pro" className="bg-white text-slate-800">Developer Pass — $199</option>
                        <option value="vip" className="bg-white text-slate-800">VIP Elite Pass — $399</option>
                      </select>
                    </div>
                    {errors.plan && (
                      <span className="text-rose text-xs mt-1 block">{errors.plan.message}</span>
                    )}
                  </div>

                  {/* Terms checkbox */}
                  <label className="flex items-start gap-3 mt-2 cursor-pointer select-none">
                    <div className="relative mt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        {...register("terms")}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 rounded-md border border-slate-200 bg-white flex items-center justify-center peer-checked:bg-gold peer-checked:border-gold transition-colors shadow-sm">
                        <CheckSquare className="w-3.5 h-3.5 text-slate-900 opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <span className="text-xs text-slate-500 leading-normal text-left">
                      I agree to the Terms & Conditions and understand all class videos, assets, 
                      and Discord credentials will be emailed to my address prior to class start.
                    </span>
                  </label>
                  {errors.terms && (
                    <span className="text-rose text-xs mt-1 text-left block">{errors.terms.message}</span>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-gold via-orange to-rose text-white text-base font-bold shadow-xl shadow-orange/15 hover:shadow-orange/25 hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 mt-4 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing reservation...
                      </>
                    ) : (
                      "Confirm My Pass"
                    )}
                  </button>

                  {/* Secure connection note */}
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>SSL Secured connection. Your information is 100% private.</span>
                  </div>

                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-10 flex flex-col items-center gap-5"
              >
                {/* Circular success badge */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-gold to-rose flex items-center justify-center shadow-2xl shadow-gold/25 animate-bounce">
                  <ShieldCheck className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="font-display font-extrabold text-3xl text-slate-900 mt-4">
                  Pass Secured!
                </h3>
                <p className="text-slate-600 text-sm max-w-md leading-relaxed">
                  Thank you, <strong className="text-slate-900">{submittedData?.name}</strong>! Your Developer Pass registration is confirmed. We've sent a welcome email with invitation links to your inbox (<strong className="text-slate-900">{submittedData?.email}</strong>).
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 w-full text-left max-w-sm mt-4 flex flex-col gap-2 shadow-sm">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Selected Plan:</span>
                    <span className="font-bold text-slate-800 uppercase">{submittedData?.plan} Pass</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Primary Track:</span>
                    <span className="font-bold text-gold uppercase">{submittedData?.track}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Status:</span>
                    <span className="font-bold text-emerald-600">Active / Paid</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 hover:border-slate-350 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-600 transition-colors mt-6 cursor-pointer"
                >
                  Register Another Seat
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
