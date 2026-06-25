import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Loader2, Sparkles, User, Mail, Phone, Calendar, Users, HelpCircle, CheckSquare } from "lucide-react";

// Define Zod validation schema for the Interest Form
const interestSchema = z.object({
  name: z.string().min(2, "Full Name must be at least 2 characters"),
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
  email: z.string().email("Please enter a valid email address"),
  age: z.coerce.number().min(5, "Please enter a valid age").max(100, "Please enter a valid age"),
  joiningAs: z.enum(["Solo", "Duo"]),
  timeSlot: z.string().min(1, "Preferred Time Slot is required"),
  hearAboutUs: z.string().min(1, "Please let us know how you heard about us"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms to receive notifications",
  }),
});

type InterestFormData = z.infer<typeof interestSchema>;

interface RegistrationFormProps {
  onBackToHome: () => void;
}

export default function RegistrationForm({ onBackToHome }: RegistrationFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<InterestFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InterestFormData>({
    resolver: zodResolver(interestSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: undefined as any,
      joiningAs: "Solo",
      timeSlot: "",
      hearAboutUs: "",
      terms: false,
    },
  });

  const onSubmit = async (data: InterestFormData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmittedData(data);
    setIsSuccess(true);

    // Dispatch toast notification
    window.dispatchEvent(
      new CustomEvent("show-toast", {
        detail: { message: "Interest registered successfully!", type: "success" },
      })
    );
  };

  const handleReset = () => {
    reset();
    setIsSuccess(false);
    setSubmittedData(null);
  };

  return (
    <section id="register" className="py-24 px-4 bg-transparent border-t border-[#8C6A5C]/15 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-terracotta/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-2xl mx-auto relative">
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

        <div className="rounded-[32px] border border-[#8C6A5C]/15 bg-[#FFFDFB] p-8 sm:p-10 shadow-sm relative">
          
          {/* Accent Line */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-terracotta to-brown rounded-t-[32px]"></div>

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
                  <h2 className="font-display font-extrabold text-3xl text-[#2D1E1A] tracking-tight flex items-center gap-2">
                    Register Your Interest <Sparkles className="w-6 h-6 text-terracotta" />
                  </h2>
                  <p className="text-[#8C6A5C] text-xs sm:text-sm mt-2 leading-relaxed">
                    Be the first to know when official registrations open. Fill in your details below to lock in priority ticket bookings and early-bird notifications.
                  </p>
                </div>

                {/* Main Form element */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A5C]">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60" />
                      <input
                        {...register("name")}
                        placeholder="Your full name"
                        type="text"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition-all h-[46px] shadow-sm"
                        aria-invalid={errors.name ? "true" : "false"}
                      />
                    </div>
                    {errors.name && (
                      <span className="text-rose-600 text-xs mt-1 block">{errors.name.message}</span>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Email field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A5C]">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60" />
                        <input
                          {...register("email")}
                          placeholder="name@domain.com"
                          type="email"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition-all h-[46px] shadow-sm"
                          aria-invalid={errors.email ? "true" : "false"}
                        />
                      </div>
                      {errors.email && (
                        <span className="text-rose-600 text-xs mt-1 block">{errors.email.message}</span>
                      )}
                    </div>

                    {/* Phone field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A5C]">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60" />
                        <input
                          {...register("phone")}
                          placeholder="Phone number"
                          type="tel"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition-all h-[46px] shadow-sm"
                          aria-invalid={errors.phone ? "true" : "false"}
                        />
                      </div>
                      {errors.phone && (
                        <span className="text-rose-600 text-xs mt-1 block">{errors.phone.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Age & Joining As */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Age field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A5C]">Age</label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60" />
                        <input
                          {...register("age")}
                          placeholder="Age (e.g. 24)"
                          type="number"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition-all h-[46px] shadow-sm"
                          aria-invalid={errors.age ? "true" : "false"}
                        />
                      </div>
                      {errors.age && (
                        <span className="text-rose-600 text-xs mt-1 block">{errors.age.message}</span>
                      )}
                    </div>

                    {/* Joining As */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A5C]">Joining As</label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60" />
                        <select
                          {...register("joiningAs")}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#8C6A5C]/20 text-[#2D1E1A] text-xs focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition-all h-[46px] appearance-none cursor-pointer shadow-sm"
                        >
                          <option value="Solo">Solo</option>
                          <option value="Duo">Duo (With a Friend/Partner)</option>
                        </select>
                      </div>
                      {errors.joiningAs && (
                        <span className="text-rose-600 text-xs mt-1 block">{errors.joiningAs.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Preferred Time Slot & Hear About Us */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Preferred Time Slot */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A5C]">Preferred Time Slot</label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60" />
                        <select
                          {...register("timeSlot")}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#8C6A5C]/20 text-[#2D1E1A] text-xs focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition-all h-[46px] appearance-none cursor-pointer shadow-sm"
                        >
                          <option value="">Select Time Slot</option>
                          <option value="morning">Morning Session (11:00 AM - 02:00 PM)</option>
                          <option value="afternoon">Afternoon Session (03:00 PM - 06:00 PM)</option>
                        </select>
                      </div>
                      {errors.timeSlot && (
                        <span className="text-rose-600 text-xs mt-1 block">{errors.timeSlot.message}</span>
                      )}
                    </div>

                    {/* How did you hear about us */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A5C]">How did you hear about us?</label>
                      <div className="relative">
                        <HelpCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60" />
                        <select
                          {...register("hearAboutUs")}
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#8C6A5C]/20 text-[#2D1E1A] text-xs focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition-all h-[46px] appearance-none cursor-pointer shadow-sm"
                        >
                          <option value="">Choose Options</option>
                          <option value="Instagram">Instagram</option>
                          <option value="WhatsApp">WhatsApp</option>
                          <option value="Friend/Family">Friends / Family</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      {errors.hearAboutUs && (
                        <span className="text-rose-600 text-xs mt-1 block">{errors.hearAboutUs.message}</span>
                      )}
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
                      <div className="w-5 h-5 rounded-md border border-[#8C6A5C]/25 bg-white flex items-center justify-center peer-checked:bg-terracotta peer-checked:border-terracotta transition-colors shadow-sm">
                        <CheckSquare className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <span className="text-xs text-[#8C6A5C] leading-normal text-left">
                      I agree to receive booking opening alerts and updates regarding the Trayyaai × Ayra workshop.
                    </span>
                  </label>
                  {errors.terms && (
                    <span className="text-rose-600 text-xs mt-1 text-left block">{errors.terms.message}</span>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-terracotta hover:bg-[#8C6A5C] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-terracotta/15 hover:shadow-terracotta/25 hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 mt-4 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving Preferences...
                      </>
                    ) : (
                      "Notify Me When Registrations Open"
                    )}
                  </button>

                  {/* Secure connection note */}
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8C6A5C]/60 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-olive" />
                    <span>Your contact information is strictly private and secure.</span>
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
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-terracotta to-brown flex items-center justify-center shadow-lg shadow-terracotta/15 animate-bounce">
                  <ShieldCheck className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="font-display font-extrabold text-3xl text-[#2D1E1A] mt-4">
                  Interest Registered!
                </h3>
                <p className="text-[#8C6A5C] text-xs sm:text-sm max-w-md leading-relaxed">
                  Thank you, <strong className="text-[#2D1E1A]">{submittedData?.name}</strong>! Your preference details have been saved. We will contact you at <strong className="text-[#2D1E1A]">{submittedData?.email}</strong> or <strong className="text-[#2D1E1A]">{submittedData?.phone}</strong> the moment ticket bookings launch!
                </p>

                <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#8C6A5C]/10 w-full text-left max-w-sm mt-4 flex flex-col gap-2 shadow-sm">
                  <div className="flex justify-between text-xs text-[#8C6A5C]">
                    <span>Format Option:</span>
                    <span className="font-bold text-[#2D1E1A]">{submittedData?.joiningAs}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#8C6A5C]">
                    <span>Preferred Slot:</span>
                    <span className="font-bold text-terracotta uppercase">{submittedData?.timeSlot}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#8C6A5C]">
                    <span>Age:</span>
                    <span className="font-bold text-[#2D1E1A]">{submittedData?.age} Years</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#8C6A5C]">
                    <span>Status:</span>
                    <span className="font-bold text-olive uppercase">Priority Waitlist</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="mt-6 px-6 py-2.5 rounded-xl border border-[#8C6A5C]/20 bg-white text-[#8C6A5C] hover:text-[#2D1E1A] hover:bg-slate-50 font-semibold text-xs transition-colors shadow-sm cursor-pointer"
                >
                  Register Another Interest Form
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
