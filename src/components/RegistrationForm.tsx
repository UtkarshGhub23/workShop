import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Loader2, Sparkles, User, Mail, Phone, Ticket, CheckSquare, Calendar, Users, MapPin, AlignLeft } from "lucide-react";

// 1. Define Zod validation schema
const registerSchema = z.object({
  name: z.string().min(2, "Full Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
  age: z.coerce.number({ invalid_type_error: "Age is required" }).min(8, "Participants must be at least 8 years old").max(120, "Please enter a valid age"),
  gender: z.string().min(1, "Please select a gender"),
  city: z.string().min(2, "City must be at least 2 characters"),
  participants: z.coerce.number({ invalid_type_error: "Number of participants is required" }).min(1, "At least 1 participant is required").max(20, "Maximum 20 participants per group"),
  date: z.string().min(1, "Preferred Workshop Date is required"),
  emergencyContact: z.string().min(8, "Emergency Contact must be at least 8 digits"),
  specialRequirements: z.string().optional(),
  plan: z.enum(["basic", "pro", "vip"]),
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
      age: undefined,
      gender: "",
      city: "",
      participants: 1,
      date: "",
      emergencyContact: "",
      specialRequirements: "",
      plan: "pro",
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
                    Reserve your interactive DIY crafting pass. Fill in your details below and secure 
                    your materials package.
                  </p>

                  {/* Seat meter */}
                  <div className="mt-5 p-3 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col gap-2 shadow-sm">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                      <span>Workshop Capacity</span>
                      <span className="text-gold">42 / 60 Slots Booked</span>
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

                  {/* Email & Phone */}
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

                  {/* Age & Gender */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Age field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Age</label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                        <input
                          {...register("age")}
                          placeholder="24"
                          type="number"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all h-[46px] shadow-sm"
                          aria-invalid={errors.age ? "true" : "false"}
                        />
                      </div>
                      {errors.age && (
                        <span className="text-rose text-xs mt-1 block">{errors.age.message}</span>
                      )}
                    </div>

                    {/* Gender dropdown */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Gender</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                        <select
                          {...register("gender")}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all h-[46px] appearance-none cursor-pointer shadow-sm"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>
                      {errors.gender && (
                        <span className="text-rose text-xs mt-1 block">{errors.gender.message}</span>
                      )}
                    </div>
                  </div>

                  {/* City & Number of Participants */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* City field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">City</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                        <input
                          {...register("city")}
                          placeholder="San Francisco"
                          type="text"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all h-[46px] shadow-sm"
                          aria-invalid={errors.city ? "true" : "false"}
                        />
                      </div>
                      {errors.city && (
                        <span className="text-rose text-xs mt-1 block">{errors.city.message}</span>
                      )}
                    </div>

                    {/* Number of Participants */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Number of Participants</label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                        <input
                          {...register("participants")}
                          placeholder="1"
                          type="number"
                          min="1"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all h-[46px] shadow-sm"
                          aria-invalid={errors.participants ? "true" : "false"}
                        />
                      </div>
                      {errors.participants && (
                        <span className="text-rose text-xs mt-1 block">{errors.participants.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Preferred Date & Emergency Contact */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Preferred Workshop Date */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                        <select
                          {...register("date")}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all h-[46px] appearance-none cursor-pointer shadow-sm"
                        >
                          <option value="">Select Preferred Date</option>
                          <option value="aug-24">August 24, 2026</option>
                          <option value="aug-25">August 25, 2026</option>
                          <option value="aug-26">August 26, 2026</option>
                          <option value="aug-27">August 27, 2026</option>
                          <option value="aug-28">August 28, 2026</option>
                        </select>
                      </div>
                      {errors.date && (
                        <span className="text-rose text-xs mt-1 block">{errors.date.message}</span>
                      )}
                    </div>

                    {/* Emergency Contact */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Emergency Contact</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                        <input
                          {...register("emergencyContact")}
                          placeholder="Name & Phone Number"
                          type="text"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all h-[46px] shadow-sm"
                          aria-invalid={errors.emergencyContact ? "true" : "false"}
                        />
                      </div>
                      {errors.emergencyContact && (
                        <span className="text-rose text-xs mt-1 block">{errors.emergencyContact.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Choose Plan Tier */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Choose Ticket Tier</label>
                    <div className="relative">
                      <Ticket className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                      <select
                        {...register("plan")}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all h-[46px] appearance-none cursor-pointer shadow-sm"
                      >
                        <option value="basic">Starter Pass — $29</option>
                        <option value="pro">Creator Pass — $49</option>
                        <option value="vip">VIP Craft Pass — $79</option>
                      </select>
                    </div>
                    {errors.plan && (
                      <span className="text-rose text-xs mt-1 block">{errors.plan.message}</span>
                    )}
                  </div>

                  {/* Special Requirements */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Special Requirements (Optional)</label>
                    <div className="relative">
                      <AlignLeft className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
                      <textarea
                        {...register("specialRequirements")}
                        placeholder="Allergies, access needs, or specific accessory requests..."
                        rows={2}
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all resize-none shadow-sm"
                      ></textarea>
                    </div>
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
                      I agree to the Terms & Conditions and understand that workshop tickets are subject to the Refund Policy.
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
                        Securing Ticket...
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
                  Thank you, <strong className="text-slate-900">{submittedData?.name}</strong>! Your DIY Workshop Pass is confirmed. We've sent a welcome email with preferred date confirmation and workshop guidelines to <strong className="text-slate-900">{submittedData?.email}</strong>.
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 w-full text-left max-w-sm mt-4 flex flex-col gap-2 shadow-sm">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Selected Plan:</span>
                    <span className="font-bold text-slate-800 uppercase">{submittedData?.plan} Pass</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Preferred Date:</span>
                    <span className="font-bold text-gold uppercase">{submittedData?.date}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Participants:</span>
                    <span className="font-bold text-slate-800">{submittedData?.participants}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Status:</span>
                    <span className="font-bold text-emerald-600">Confirmed</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="mt-6 px-6 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-semibold text-xs transition-colors shadow-sm cursor-pointer"
                >
                  Register Another Participant
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
