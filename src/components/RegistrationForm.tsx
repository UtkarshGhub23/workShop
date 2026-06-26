import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Loader2, Sparkles, User, Mail, Phone, Calendar, Users, HelpCircle, Check, ChevronDown, Copy, CheckCheck } from "lucide-react";

// Define Zod validation schema for the Interest Form
const interestSchema = z.object({
  name: z.string().min(2, "Full Name must be at least 2 characters"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  age: z.coerce.number().min(5, "Please enter a valid age").max(100, "Please enter a valid age"),
  joiningAs: z.enum(["Solo", "Duo"]),
  partnerName: z.string().optional(),
  partnerAge: z.union([z.coerce.number(), z.literal("")]).optional(),
  hearAboutUs: z.string().min(1, "Please let us know how you heard about us"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms to receive notifications",
  }),
}).refine((data) => {
  if (data.joiningAs === "Duo") {
    return !!data.partnerName && data.partnerName.trim().length >= 2;
  }
  return true;
}, {
  message: "Partner's Name must be at least 2 characters",
  path: ["partnerName"],
}).refine((data) => {
  if (data.joiningAs === "Duo") {
    const age = Number(data.partnerAge);
    return !isNaN(age) && age >= 5 && age <= 100;
  }
  return true;
}, {
  message: "Partner's Age must be between 5 and 100",
  path: ["partnerAge"],
});

// Replace this URL with your deployed Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";

type InterestFormData = z.infer<typeof interestSchema>;

interface RegistrationFormProps {
  onBackToHome: () => void;
}

export default function RegistrationForm({ onBackToHome }: RegistrationFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<(InterestFormData & { registrationId?: string }) | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    if (submittedData?.registrationId) {
      navigator.clipboard.writeText(submittedData.registrationId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: { message: "Registration ID copied to clipboard!", type: "success" },
        })
      );
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InterestFormData>({
    resolver: zodResolver(interestSchema) as any,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: undefined as any,
      joiningAs: "Solo",
      partnerName: "",
      partnerAge: "" as any,
      hearAboutUs: "",
      terms: false,
    },
  });

  const joiningAs = watch("joiningAs");

  const onSubmit = async (data: InterestFormData) => {
    try {
      // Generate a unique 6-character ID prefixed with TAY- (e.g. TAY-K2H8P1)
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let registrationId = "TAY-";
      for (let i = 0; i < 6; i++) {
        registrationId += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.startsWith("https://script.google.com")) {
        // Send data using URLSearchParams to avoid CORS preflight check errors with no-cors mode
        const params = new URLSearchParams();
        params.append("formType", "registration");
        params.append("registrationId", registrationId);
        params.append("name", data.name);
        params.append("email", data.email);
        params.append("phone", data.phone);
        params.append("age", String(data.age));
        params.append("joiningAs", data.joiningAs);
        if (data.joiningAs === "Duo") {
          params.append("partnerName", data.partnerName || "");
          params.append("partnerAge", String(data.partnerAge || ""));
        } else {
          params.append("partnerName", "");
          params.append("partnerAge", "");
        }
        params.append("hearAboutUs", data.hearAboutUs);

        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        });
      } else {
        // Simulate API delay for demo/testing when URL is not configured
        console.warn("Google Script URL is not configured. Simulating API request locally.");
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      setSubmittedData({ ...data, registrationId });
      setIsSuccess(true);

      // Dispatch toast notification
      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: { message: "Interest registered successfully!", type: "success" },
        })
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: { message: "Failed to submit interest. Please try again.", type: "error" },
        })
      );
    }
  };

  const handleReset = () => {
    reset();
    setIsSuccess(false);
    setSubmittedData(null);
  };

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <section id="register" className="py-24 px-4 bg-transparent border-t border-[#8C6A5C]/15 relative overflow-hidden">
      {/* Dynamic Background Blurry Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-terracotta/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-gold/5 blur-[90px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-terracotta/3 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-2xl mx-auto relative">
        {/* Back Button */}
        <div className="mb-10 text-left">
          <motion.button
            whileHover={{ scale: 1.03, x: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#8C6A5C]/20 hover:border-terracotta/40 bg-[#FFFDFB]/80 hover:bg-white text-terracotta text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-sm focus:outline-none"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </motion.button>
        </div>

        <div className="rounded-[36px] border border-[#8C6A5C]/15 bg-[#FFFDFB]/90 backdrop-blur-md p-8 sm:p-12 shadow-[0_24px_60px_-15px_rgba(140,106,92,0.08)] relative overflow-visible">
          
          {/* Accent Line */}
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-terracotta via-[#DCA037] to-brown rounded-t-[36px]"></div>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col text-left"
              >
                {/* Form Header */}
                <div className="mb-10 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-terracotta/20 bg-terracotta/5 text-terracotta text-[10px] font-extrabold uppercase tracking-widest mb-4 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse"></span>
                    ✨ {getGreeting()}, Creator!
                  </div>
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-[#2D1E1A] tracking-tight leading-tight flex items-center gap-2">
                    Register Your Interest 
                    <motion.span 
                      animate={{ rotate: [0, 15, -15, 0] }} 
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                      <Sparkles className="w-6 h-6 text-terracotta" />
                    </motion.span>
                  </h2>
                  <p className="text-[#8C6A5C] text-xs sm:text-sm mt-3 leading-relaxed">
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
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#FAF6F0]/40 border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:bg-white focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all h-[48px] shadow-sm"
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
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#FAF6F0]/40 border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:bg-white focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all h-[48px] shadow-sm"
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
                          {...register("phone", {
                            onChange: (e) => {
                              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
                            }
                          })}
                          placeholder="10-digit mobile number"
                          type="tel"
                          maxLength={10}
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#FAF6F0]/40 border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:bg-white focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all h-[48px] shadow-sm"
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
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#FAF6F0]/40 border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:bg-white focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all h-[48px] shadow-sm"
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
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60 pointer-events-none" />
                        <select
                          {...register("joiningAs")}
                          className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#FAF6F0]/40 border border-[#8C6A5C]/20 text-[#2D1E1A] text-xs focus:bg-white focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all h-[48px] appearance-none cursor-pointer shadow-sm"
                        >
                          <option value="Solo">Solo</option>
                          <option value="Duo">Duo (With a Friend/Partner)</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60 pointer-events-none" />
                      </div>
                      {errors.joiningAs && (
                        <span className="text-rose-600 text-xs mt-1 block">{errors.joiningAs.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Dynamic Partner Details Section (rendered for Duo) */}
                  <AnimatePresence>
                    {joiningAs === "Duo" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden flex flex-col gap-4 border-t border-[#8C6A5C]/15 pt-5 mt-2"
                      >
                        <h4 className="text-xs font-bold uppercase tracking-wider text-terracotta flex items-center gap-1.5">
                          <Users className="w-4 h-4" /> Partner Details (Second Person)
                        </h4>
                        <div className="grid md:grid-cols-2 gap-5">
                          {/* Partner Name */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A5C]">Partner's Full Name</label>
                            <div className="relative">
                              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60" />
                              <input
                                {...register("partnerName")}
                                placeholder="Partner's full name"
                                type="text"
                                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#FAF6F0]/40 border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:bg-white focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all h-[48px] shadow-sm"
                                aria-invalid={errors.partnerName ? "true" : "false"}
                              />
                            </div>
                            {errors.partnerName && (
                              <span className="text-rose-600 text-xs mt-1 block">{errors.partnerName.message}</span>
                            )}
                          </div>

                          {/* Partner Age */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A5C]">Partner's Age</label>
                            <div className="relative">
                              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60" />
                              <input
                                {...register("partnerAge")}
                                placeholder="Partner's age"
                                type="number"
                                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#FAF6F0]/40 border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:bg-white focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all h-[48px] shadow-sm"
                                aria-invalid={errors.partnerAge ? "true" : "false"}
                              />
                            </div>
                            {errors.partnerAge && (
                              <span className="text-rose-600 text-xs mt-1 block">{errors.partnerAge.message}</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* How did you hear about us */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A5C]">How did you hear about us?</label>
                    <div className="relative">
                      <HelpCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60 pointer-events-none" />
                      <select
                        {...register("hearAboutUs")}
                        className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#FAF6F0]/40 border border-[#8C6A5C]/20 text-[#2D1E1A] text-xs focus:bg-white focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all h-[48px] appearance-none cursor-pointer shadow-sm"
                      >
                        <option value="">Choose Options</option>
                        <option value="Instagram">Instagram</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Friend/Family">Friends / Family</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60 pointer-events-none" />
                    </div>
                    {errors.hearAboutUs && (
                      <span className="text-rose-600 text-xs mt-1 block">{errors.hearAboutUs.message}</span>
                    )}
                  </div>

                  {/* Terms checkbox */}
                  <label className="flex items-start gap-3 mt-3 cursor-pointer select-none">
                    <div className="relative mt-0.5 shrink-0 w-5 h-5">
                      <input
                        type="checkbox"
                        {...register("terms")}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 rounded-md border border-[#8C6A5C]/25 bg-white transition-colors shadow-sm peer-checked:bg-terracotta peer-checked:border-terracotta"></div>
                      <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                    <span className="text-xs text-[#8C6A5C] leading-relaxed text-left">
                      I agree to receive booking opening alerts and updates regarding the Trayyaai × Ayra workshop.
                    </span>
                  </label>
                  {errors.terms && (
                    <span className="text-rose-600 text-xs mt-1 text-left block">{errors.terms.message}</span>
                  )}

                  {/* Submit button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-terracotta via-[#DCA037] to-terracotta bg-[length:200%_auto] hover:bg-[right_center] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-terracotta/15 hover:shadow-terracotta/25 hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-500 mt-4 cursor-pointer flex items-center justify-center gap-2 border-0"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving Preferences...
                      </>
                    ) : (
                      "Notify Me When Registrations Open"
                    )}
                  </motion.button>

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
                className="text-center py-6 flex flex-col items-center gap-5"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-terracotta to-brown flex items-center justify-center shadow-lg shadow-terracotta/15 animate-bounce">
                  <ShieldCheck className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="font-display font-extrabold text-3xl text-[#2D1E1A] mt-2">
                  Interest Registered!
                </h3>
                <p className="text-[#8C6A5C] text-xs sm:text-sm max-w-md leading-relaxed mb-2">
                  Thank you, <strong className="text-[#2D1E1A]">{submittedData?.name}</strong>! Your preference details have been saved securely. We will contact you the moment ticket bookings launch!
                </p>

                {/* VIP Pass Ticket Card */}
                <div className="w-full max-w-sm bg-[#FFFDFB] border border-[#8C6A5C]/15 rounded-3xl shadow-lg relative overflow-visible mt-2">
                  
                  {/* Top Ticket Stub */}
                  <div className="p-5 text-left bg-gradient-to-br from-[#FAF6F0] to-[#FAF6F0]/50 rounded-t-3xl border-b border-[#8C6A5C]/10 relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#8C6A5C] font-extrabold">Workshop Ticket Waitlist</span>
                        <h4 className="font-display font-black text-base text-[#2D1E1A] tracking-wider uppercase mt-1">TRAYYAAI × AYRA</h4>
                      </div>
                      <span className="text-[9px] font-extrabold uppercase bg-olive/15 text-olive px-2.5 py-1 rounded-full tracking-wider">
                        Priority Pass
                      </span>
                    </div>
                  </div>

                  {/* Perforated Divider (Notches outside border) */}
                  <div className="relative my-1 -mx-[1px] h-0 select-none pointer-events-none">
                    {/* Left notch */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#fcfbfd] border-r border-[#8C6A5C]/15 rounded-full z-10"></div>
                    {/* Right notch */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-[#fcfbfd] border-l border-[#8C6A5C]/15 rounded-full z-10"></div>
                    {/* Dashed line */}
                    <div className="w-full border-t-2 border-dashed border-[#8C6A5C]/20"></div>
                  </div>

                  {/* Main Ticket Body */}
                  <div className="p-5 text-left flex flex-col gap-4">
                    {/* ID Row with Copy button */}
                    <div className="flex flex-col gap-1 p-3 rounded-2xl bg-[#FAF6F0] border border-[#8C6A5C]/10">
                      <span className="text-[8px] uppercase tracking-widest text-[#8C6A5C] font-extrabold">Your Registration ID</span>
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-extrabold text-base sm:text-lg text-terracotta tracking-wider">
                          {submittedData?.registrationId}
                        </span>
                        <button
                          onClick={handleCopyId}
                          className="p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-[#8C6A5C]/15 text-[#8C6A5C] hover:text-terracotta transition-all cursor-pointer focus:outline-none flex items-center gap-1 text-[10px] font-bold"
                          title="Copy ID"
                        >
                          {copied ? (
                            <>
                              <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-[9px] text-emerald-600 uppercase">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[9px] uppercase">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Detail Grid */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs border-b border-[#8C6A5C]/10 pb-3">
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-[#8C6A5C]/70 font-semibold mb-0.5">Attendee</span>
                        <strong className="text-[#2D1E1A] font-bold text-xs block truncate">{submittedData?.name}</strong>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-[#8C6A5C]/70 font-semibold mb-0.5">Format Option</span>
                        <strong className="text-[#2D1E1A] font-bold text-xs block truncate">{submittedData?.joiningAs}</strong>
                      </div>
                      {submittedData?.joiningAs === "Duo" && (
                        <div className="col-span-2">
                          <span className="block text-[8px] uppercase tracking-wider text-[#8C6A5C]/70 font-semibold mb-0.5">Partner</span>
                          <strong className="text-[#2D1E1A] font-bold text-xs block truncate">{submittedData?.partnerName} ({submittedData?.partnerAge} Yrs)</strong>
                        </div>
                      )}
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-[#8C6A5C]/70 font-semibold mb-0.5">Age</span>
                        <strong className="text-[#2D1E1A] font-bold text-xs block">{submittedData?.age} Years</strong>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-[#8C6A5C]/70 font-semibold mb-0.5">Date</span>
                        <strong className="text-[#2D1E1A] font-bold text-xs block">August 2, 2026</strong>
                      </div>
                    </div>

                    {/* Ticket Footer / Venue info */}
                    <div className="text-[9px] text-[#8C6A5C]/80 leading-relaxed flex flex-col gap-1">
                      <p>📍 <strong>Venue:</strong> Mathura, Uttar Pradesh (Exact location shared upon booking)</p>
                      <p>✉️ <strong>Confirmation Sent To:</strong> {submittedData?.email}</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  className="mt-6 px-6 py-3 rounded-xl border border-[#8C6A5C]/20 bg-white text-[#8C6A5C] hover:text-[#2D1E1A] hover:bg-slate-50 font-semibold text-xs transition-colors shadow-sm cursor-pointer"
                >
                  Register Another Interest Form
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
