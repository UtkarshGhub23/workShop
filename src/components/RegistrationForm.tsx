import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Loader2, 
  Sparkles, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Users, 
  HelpCircle, 
  Check, 
  ChevronDown, 
  Copy, 
  CheckCheck, 
  MapPin, 
  UploadCloud, 
  ArrowLeft,
  Printer,
  Ticket
} from "lucide-react";

// Define Zod validation schema for the Interest Form
const interestSchema = z.object({
  name: z.string().min(2, "Full Name must be at least 2 characters"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  age: z.coerce.number().min(5, "Please enter a valid age").max(100, "Please enter a valid age"),
  address: z.string().min(3, "Address must be at least 3 characters"),
  joiningAs: z.enum(["Solo", "Duo", "Trio", "Group"]),
  hearAboutUs: z.string().min(1, "Please let us know how you heard about us"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms to receive notifications",
  }),
});

// Replace this URL with your deployed Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";

type InterestFormData = z.infer<typeof interestSchema>;

interface RegistrationFormProps {
  onBackToHome: () => void;
}

export default function RegistrationForm({ onBackToHome }: RegistrationFormProps) {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      setIsMobileDevice(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent));
    };
    checkMobile();
  }, []);

  const [step, setStep] = useState<1 | 2>(1);
  const [tempFormData, setTempFormData] = useState<InterestFormData | null>(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState<string | null>(null);
  const [paymentScreenshotName, setPaymentScreenshotName] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isSubmittingFinal, setIsSubmittingFinal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [submittedData, setSubmittedData] = useState<(InterestFormData & { 
    registrationId?: string; 
    partnerName?: string; 
    partnerAge?: string;
    partnerEmail?: string;
    partnerPhone?: string;
    partnerAddress?: string;
  }) | null>(null);
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

  // Partners state for Duo/Trio/Group
  const [partners, setPartners] = useState<{ name: string; age: string; email: string; phone: string; address: string }[]>([]);
  const [partnerErrors, setPartnerErrors] = useState<{ [key: number]: { name?: string; age?: string; email?: string; phone?: string; address?: string } }>({});

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
      address: "",
      joiningAs: "Solo",
      hearAboutUs: "",
      terms: false,
    },
  });

  const joiningAs = watch("joiningAs");

  // Sync partners array based on selection
  useEffect(() => {
    if (joiningAs === "Solo") {
      setPartners([]);
    } else if (joiningAs === "Duo") {
      setPartners([{ name: "", age: "", email: "", phone: "", address: "" }]);
    } else if (joiningAs === "Trio") {
      setPartners([
        { name: "", age: "", email: "", phone: "", address: "" },
        { name: "", age: "", email: "", phone: "", address: "" },
      ]);
    } else if (joiningAs === "Group") {
      setPartners([
        { name: "", age: "", email: "", phone: "", address: "" },
        { name: "", age: "", email: "", phone: "", address: "" },
        { name: "", age: "", email: "", phone: "", address: "" },
      ]);
    }
    setPartnerErrors({});
  }, [joiningAs]);

  const addPartner = () => {
    setPartners([...partners, { name: "", age: "", email: "", phone: "", address: "" }]);
  };

  const removePartner = (index: number) => {
    setPartners(partners.filter((_, i) => i !== index));
    const newErrors = { ...partnerErrors };
    delete newErrors[index];
    const adjustedErrors: typeof partnerErrors = {};
    Object.keys(newErrors).forEach((key) => {
      const idx = Number(key);
      if (idx > index) {
        adjustedErrors[idx - 1] = newErrors[idx];
      } else if (idx < index) {
        adjustedErrors[idx] = newErrors[idx];
      }
    });
    setPartnerErrors(adjustedErrors);
  };

  const validatePartners = (): boolean => {
    if (joiningAs === "Solo") return true;

    const newErrors: typeof partnerErrors = {};
    let isValid = true;

    partners.forEach((partner, index) => {
      const errorsForPartner: { name?: string; age?: string; email?: string; phone?: string; address?: string } = {};

      if (!partner.name.trim()) {
        errorsForPartner.name = "Full Name is required";
        isValid = false;
      } else if (partner.name.trim().length < 2) {
        errorsForPartner.name = "Full Name must be at least 2 characters";
        isValid = false;
      }

      const ageNum = Number(partner.age);
      if (!partner.age) {
        errorsForPartner.age = "Age is required";
        isValid = false;
      } else if (isNaN(ageNum) || ageNum < 5 || ageNum > 100) {
        errorsForPartner.age = "Age must be between 5 and 100";
        isValid = false;
      }

      if (!partner.email.trim()) {
        errorsForPartner.email = "Email is required";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(partner.email.trim())) {
        errorsForPartner.email = "Please enter a valid email address";
        isValid = false;
      }

      if (!partner.phone.trim()) {
        errorsForPartner.phone = "Phone is required";
        isValid = false;
      } else if (!/^[0-9]{10}$/.test(partner.phone.trim())) {
        errorsForPartner.phone = "Phone must be exactly 10 digits";
        isValid = false;
      }

      if (!partner.address.trim()) {
        errorsForPartner.address = "Address is required";
        isValid = false;
      } else if (partner.address.trim().length < 3) {
        errorsForPartner.address = "Address must be at least 3 characters";
        isValid = false;
      }

      if (Object.keys(errorsForPartner).length > 0) {
        newErrors[index] = errorsForPartner;
      }
    });

    setPartnerErrors(newErrors);
    return isValid;
  };

  const getTicketCount = () => {
    if (joiningAs === "Solo") return 1;
    return 1 + partners.length;
  };

  const calculateTotalPrice = () => {
    const count = getTicketCount();
    if (joiningAs === "Solo") {
      return 699;
    }
    return count * 599;
  };

  const onSubmit = (data: InterestFormData) => {
    if (!validatePartners()) {
      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: { message: "Please correct the errors in member details.", type: "error" },
        })
      );
      return;
    }
    setTempFormData(data);
    setStep(2);
    
    // Scroll the register section into view
    const formElement = document.getElementById("register");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFileChange = (file: File) => {
    const isImage = file.type.startsWith("image/");
    const isPdf = file.type === "application/pdf";
    if (!isImage && !isPdf) {
      setUploadError("Only image files (PNG, JPG, JPEG) or PDF files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size must be less than 5MB.");
      return;
    }
    setUploadError(null);
    setPaymentScreenshotName(file.name);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPaymentScreenshot(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempFormData) return;

    if (!paymentScreenshot) {
      setUploadError("Payment screenshot is required to complete registration.");
      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: { message: "Please upload your payment screenshot.", type: "error" },
        })
      );
      return;
    }

    setIsSubmittingFinal(true);
    try {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let registrationId = "TAY-";
      for (let i = 0; i < 6; i++) {
        registrationId += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      const partnerNames = partners.map((p) => p.name.trim()).join(", ");
      const partnerAges = partners.map((p) => p.age.trim()).join(", ");
      const partnerEmails = partners.map((p) => p.email.trim()).join(", ");
      const partnerPhones = partners.map((p) => p.phone.trim()).join(", ");
      const partnerAddresses = partners.map((p) => p.address.trim()).join(", ");

      if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.startsWith("https://script.google.com")) {
        const params = new URLSearchParams();
        params.append("formType", "registration");
        params.append("registrationId", registrationId);
        params.append("name", tempFormData.name);
        params.append("email", tempFormData.email);
        params.append("phone", tempFormData.phone);
        params.append("age", String(tempFormData.age));
        params.append("address", tempFormData.address);
        params.append("joiningAs", tempFormData.joiningAs);
        params.append("partnerName", partnerNames);
        params.append("partnerAge", partnerAges);
        params.append("partnerEmail", partnerEmails);
        params.append("partnerPhone", partnerPhones);
        params.append("partnerAddress", partnerAddresses);
        params.append("hearAboutUs", tempFormData.hearAboutUs);
        params.append("paymentScreenshot", paymentScreenshot);

        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        });
      } else {
        console.warn("Google Script URL is not configured. Simulating API request locally.");
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      setSubmittedData({
        ...tempFormData,
        registrationId,
        partnerName: partnerNames,
        partnerAge: partnerAges,
        partnerEmail: partnerEmails,
        partnerPhone: partnerPhones,
        partnerAddress: partnerAddresses,
      });
      setIsSuccess(true);

      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: { message: "Registration completed successfully!", type: "success" },
        })
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: { message: "Failed to complete registration. Please try again.", type: "error" },
        })
      );
    } finally {
      setIsSubmittingFinal(false);
    }
  };

  const handleReset = () => {
    reset();
    setPartners([]);
    setPartnerErrors({});
    setIsSuccess(false);
    setSubmittedData(null);
    setStep(1);
    setTempFormData(null);
    setPaymentScreenshot(null);
    setPaymentScreenshotName(null);
    setUploadError(null);
  };

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <section id="register" className="py-24 px-4 bg-transparent border-t border-[#8C6A5C]/15 relative overflow-hidden">
      {/* Subtle Background Blurry Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-terracotta/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-gold/5 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-terracotta/3 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-2xl mx-auto relative">
        {/* Back Button */}
        <div className="mb-8 text-left">
          <motion.button
            whileHover={{ scale: 1.02, x: -2 }}
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
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-terracotta via-[#DCA037] to-terracotta rounded-t-[36px]" />

          {/* Step Progress Indicator */}
          {!isSuccess && (
            <div className="flex items-center justify-center gap-4 mb-8 pb-6 border-b border-[#8C6A5C]/10">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  step === 1 
                    ? "bg-terracotta text-white ring-4 ring-terracotta/25" 
                    : "bg-emerald-600 text-white"
                }`}>
                  {step > 1 ? <Check className="w-4 h-4" /> : "1"}
                </div>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider transition-colors duration-300 ${
                  step === 1 ? "text-[#2D1E1A]" : "text-[#8C6A5C]/60"
                }`}>
                  Details
                </span>
              </div>
              
              <div className="w-8 h-px bg-[#8C6A5C]/20" />
              
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  step === 2 
                    ? "bg-terracotta text-white ring-4 ring-terracotta/25" 
                    : "bg-[#FAF6F0] text-[#8C6A5C]/40 border border-[#8C6A5C]/25"
                }`}>
                  2
                </div>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider transition-colors duration-300 ${
                  step === 2 ? "text-[#2D1E1A]" : "text-[#8C6A5C]/40"
                }`}>
                  Payment
                </span>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-6 flex flex-col items-center gap-5"
              >
                {/* Success Sparkle Glow */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-terracotta/20 blur-xl animate-pulse" />
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-terracotta to-brown flex items-center justify-center shadow-lg shadow-terracotta/15 relative z-10 animate-bounce">
                    <ShieldCheck className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                <h3 className="font-display font-extrabold text-3xl text-[#2D1E1A] mt-2">
                  Registration Received!
                </h3>
                <p className="text-[#8C6A5C] text-xs sm:text-sm max-w-md leading-relaxed mb-2">
                  Thank you, <strong className="text-[#2D1E1A]">{submittedData?.name}</strong>! Your registration and payment details have been successfully received. We will verify your transaction screenshot and send a confirmation email shortly.
                </p>

                {/* Premium Detachable-Stub Ticket Card */}
                <div className="print-ticket w-full max-w-2xl bg-[#FAF6F0] border-2 border-[#8C6A5C]/25 rounded-3xl shadow-xl relative overflow-visible mt-4 flex flex-col md:flex-row text-left">
                  
                  {/* Left Side: Main Pass */}
                  <div className="flex-1 p-6 flex flex-col justify-between relative overflow-hidden min-h-[300px]">
                    {/* Watermark Logo */}
                    <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 text-[#8C6A5C]/5 pointer-events-none select-none">
                      <svg className="w-64 h-64" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10 0-5.523-4.477-10-10-10 5.523 0 10-4.477 10-10z" />
                      </svg>
                    </div>

                    <div>
                      {/* Ticket Brand Header */}
                      <div className="flex justify-between items-start border-b border-[#8C6A5C]/15 pb-4 mb-5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center">
                            <svg className="w-4.5 h-4.5 text-terracotta" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10 0-5.523-4.477-10-10-10 5.523 0 10-4.477 10-10z" />
                            </svg>
                          </div>
                          <div>
                            <span className="text-[8px] uppercase tracking-widest text-[#8C6A5C] font-extrabold block">Official Entry Pass</span>
                            <h4 className="font-display font-black text-sm text-[#2D1E1A] tracking-wider uppercase">TRAYYAAI × AYRA</h4>
                          </div>
                        </div>
                        <span className="text-[9px] font-extrabold uppercase bg-emerald-600/10 text-emerald-700 px-3 py-1 rounded-full tracking-wider border border-emerald-600/15">
                          Reserved
                        </span>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-y-4 gap-x-5 text-xs">
                        <div>
                          <span className="flex items-center gap-1 text-[8.5px] uppercase tracking-wider text-[#8C6A5C]/80 font-bold mb-0.5">
                            <User className="w-3.5 h-3.5 text-terracotta" /> Attendee
                          </span>
                          <strong className="text-[#2D1E1A] font-black text-sm block truncate">{submittedData?.name}</strong>
                        </div>
                        <div>
                          <span className="flex items-center gap-1 text-[8.5px] uppercase tracking-wider text-[#8C6A5C]/80 font-bold mb-0.5">
                            <Ticket className="w-3.5 h-3.5 text-terracotta" /> Format
                          </span>
                          <strong className="text-[#2D1E1A] font-black text-sm block truncate">{submittedData?.joiningAs}</strong>
                        </div>
                        <div>
                          <span className="flex items-center gap-1 text-[8.5px] uppercase tracking-wider text-[#8C6A5C]/80 font-bold mb-0.5">
                            <Calendar className="w-3.5 h-3.5 text-terracotta" /> Date & Time
                          </span>
                          <strong className="text-[#2D1E1A] font-black text-sm block">Aug 2, 2026 • 2:00 PM</strong>
                        </div>
                        <div>
                          <span className="flex items-center gap-1 text-[8.5px] uppercase tracking-wider text-[#8C6A5C]/80 font-bold mb-0.5">
                            💰 Amount
                          </span>
                          <strong className="text-emerald-700 font-black text-sm block">₹{calculateTotalPrice()}</strong>
                        </div>
                        <div className="col-span-2">
                          <span className="flex items-center gap-1 text-[8.5px] uppercase tracking-wider text-[#8C6A5C]/80 font-bold mb-0.5">
                            <MapPin className="w-3.5 h-3.5 text-terracotta" /> Venue
                          </span>
                          <strong className="text-[#2D1E1A] font-bold text-xs block">
                            Mathura, UP (Details sent to {submittedData?.email})
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Footnote */}
                    <div className="mt-6 pt-3 border-t border-[#8C6A5C]/10 flex justify-between items-center text-[9px] text-[#8C6A5C]/80 font-medium">
                      <span>Verification: <strong className="text-amber-600 uppercase">Pending</strong></span>
                      <span>Show this ticket at entrance</span>
                    </div>
                  </div>

                  {/* Detachable Stub Perforation Line */}
                  <div className="relative w-full md:w-0 h-0 md:h-auto select-none pointer-events-none">
                    {/* Horizontal notches (for mobile) */}
                    <div className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#fcfbfd] border-r border-[#8C6A5C]/25 rounded-full z-10"></div>
                    <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-[#fcfbfd] border-l border-[#8C6A5C]/25 rounded-full z-10"></div>
                    <div className="md:hidden w-full border-t-2 border-dashed border-[#8C6A5C]/25"></div>

                    {/* Vertical notches (for desktop) */}
                    <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#fcfbfd] border-b border-[#8C6A5C]/25 rounded-full z-10"></div>
                    <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-[#fcfbfd] border-t border-[#8C6A5C]/25 rounded-full z-10"></div>
                    <div className="hidden md:block h-full border-l-2 border-dashed border-[#8C6A5C]/25 absolute left-1/2 -translate-x-1/2"></div>
                  </div>

                  {/* Right Side: Detachable Stub */}
                  <div className="w-full md:w-[220px] bg-[#FFFDFB] p-6 flex flex-col justify-between items-center text-center relative shrink-0 min-h-[300px]">
                    <div className="flex flex-col items-center w-full">
                      <span className="text-[8px] uppercase tracking-widest text-[#8C6A5C]/70 font-extrabold mb-4 block">Detachable Entry Coupon</span>
                      
                      {/* Ticket QR Code */}
                      <div className="p-2 bg-white rounded-xl border border-[#8C6A5C]/15 shadow-sm mb-3">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(submittedData?.registrationId || "")}`}
                          alt="Ticket Code"
                          className="w-[90px] h-[90px] object-contain"
                        />
                      </div>

                      {/* Reg ID label */}
                      <span className="text-[8px] uppercase tracking-widest text-[#8C6A5C] font-extrabold">Registration Code</span>
                      <div className="flex items-center gap-1.5 mt-0.5 mb-3 bg-[#FAF6F0] px-2.5 py-1 rounded-lg border border-[#8C6A5C]/10">
                        <strong className="font-mono text-xs text-terracotta tracking-wider uppercase">{submittedData?.registrationId}</strong>
                        <button
                          onClick={handleCopyId}
                          className="p-0.5 text-[#8C6A5C] hover:text-terracotta transition-colors focus:outline-none cursor-pointer border-0 bg-transparent"
                          title="Copy ID"
                        >
                          {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>

                    {/* Barcode */}
                    <div className="w-full flex flex-col items-center gap-1">
                      <svg className="h-8 w-40 opacity-80" viewBox="0 0 100 36" preserveAspectRatio="none">
                        {(() => {
                          let currentX = 0;
                          const pattern = [1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 1, 2, 3, 1, 4, 2, 1, 3, 1, 2, 1, 3, 2, 1, 4];
                          return pattern.map((width, idx) => {
                            const rectX = currentX;
                            currentX += width + 2; // width + gap
                            return (
                              <rect
                                key={idx}
                                x={rectX}
                                y="0"
                                width={width}
                                height="36"
                                fill="#2D1E1A"
                              />
                            );
                          });
                        })()}
                      </svg>
                      <span className="font-mono text-[7.5px] tracking-[0.2em] text-[#8C6A5C]/80">SCAN TO DETACH</span>
                    </div>
                  </div>

                </div>

                {/* Print/Save and Reset buttons */}
                <div className="no-print flex flex-col sm:flex-row gap-3 mt-6 w-full max-w-sm">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-3 rounded-xl bg-terracotta hover:bg-brown text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-terracotta/15 flex items-center justify-center gap-2 cursor-pointer transition-all duration-200"
                  >
                    <Printer className="w-4 h-4" />
                    Print / Save Pass
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 py-3 rounded-xl border border-[#8C6A5C]/20 bg-white text-[#8C6A5C] hover:text-[#2D1E1A] hover:bg-slate-50 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    Register Another
                  </button>
                </div>
              </motion.div>
            ) : step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col text-left"
              >
                {/* Form Header */}
                <div className="mb-10 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-terracotta/20 bg-terracotta/5 text-terracotta text-[10px] font-extrabold uppercase tracking-widest mb-4 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse"></span>
                    {getGreeting()}, Welcome
                  </div>
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-[#2D1E1A] tracking-tight leading-tight">
                    Register Your Interest
                  </h2>
                  <p className="text-[#8C6A5C] text-xs sm:text-sm mt-3 leading-relaxed">
                    Be the first to know when official registrations open. Fill in your details below to lock in priority ticket bookings and early-bird notifications.
                  </p>

                  {/* Event details strip */}
                  <div className="mt-5 p-3.5 rounded-2xl bg-[#FAF6F0]/60 border border-[#8C6A5C]/8 flex items-center gap-4 text-[10px] text-[#8C6A5C]">
                    <span className="font-bold text-terracotta uppercase tracking-wider">Friendship Day DIY Workshop</span>
                    <span className="w-px h-3.5 bg-[#8C6A5C]/15" />
                    <span>Aug 2, 2026</span>
                    <span className="w-px h-3.5 bg-[#8C6A5C]/15" />
                    <span>Mathura, UP</span>
                  </div>
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
                          <option value="Solo">Solo (1 Person)</option>
                          <option value="Duo">Duo (2 People - Besties / Partners)</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60 pointer-events-none" />
                      </div>
                      {errors.joiningAs && (
                        <span className="text-rose-600 text-xs mt-1 block">{errors.joiningAs.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Address field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A5C]">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60" />
                      <input
                        {...register("address")}
                        placeholder="Your residential address"
                        type="text"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#FAF6F0]/40 border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:bg-white focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all h-[48px] shadow-sm"
                        aria-invalid={errors.address ? "true" : "false"}
                      />
                    </div>
                    {errors.address && (
                      <span className="text-rose-600 text-xs mt-1 block">{errors.address.message}</span>
                    )}
                  </div>

                  {/* Dynamic Partner Details Section */}
                  <AnimatePresence>
                    {joiningAs !== "Solo" && partners.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden flex flex-col gap-4 border-t border-[#8C6A5C]/15 pt-5 mt-2"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-terracotta flex items-center gap-1.5">
                            <Users className="w-4 h-4" /> 
                            {joiningAs === "Duo" 
                              ? "Partner Details (Second Person)" 
                              : joiningAs === "Trio" 
                              ? "Member Details" 
                              : "Group Members Details"}
                          </h4>
                          {joiningAs === "Group" && (
                            <button
                              type="button"
                              onClick={addPartner}
                              className="px-3.5 py-1 rounded-full border border-terracotta/30 hover:border-terracotta bg-white text-terracotta text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer focus:outline-none"
                            >
                              + Add Member
                            </button>
                          )}
                        </div>

                        <div className="flex flex-col gap-4 max-h-[360px] overflow-y-auto pr-1">
                          {partners.map((partner, index) => (
                            <div key={index} className="p-4 rounded-2xl bg-[#FAF6F0]/50 border border-[#8C6A5C]/10 flex flex-col gap-3 relative">
                              {/* Header for each member */}
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-extrabold uppercase tracking-wide text-[#8C6A5C]">
                                  Person #{index + 2}
                                </span>
                                {joiningAs === "Group" && partners.length > 3 && (
                                  <button
                                    type="button"
                                    onClick={() => removePartner(index)}
                                    className="text-[10px] font-bold uppercase text-rose-600 hover:text-rose-800 transition-colors focus:outline-none cursor-pointer"
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>

                              <div className="grid md:grid-cols-2 gap-4">
                                {/* Partner Name */}
                                <div className="flex flex-col gap-1.5 text-left">
                                  <label className="text-[9px] font-bold uppercase tracking-wider text-[#8C6A5C]">Full Name</label>
                                  <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60" />
                                    <input
                                      value={partner.name}
                                      onChange={(e) => {
                                        const newPartners = [...partners];
                                        newPartners[index].name = e.target.value;
                                        setPartners(newPartners);
                                        // Clear error on change
                                        if (partnerErrors[index]?.name) {
                                          const newErrors = { ...partnerErrors };
                                          delete newErrors[index].name;
                                          setPartnerErrors(newErrors);
                                        }
                                      }}
                                      placeholder="Full name"
                                      type="text"
                                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all h-[42px] shadow-sm"
                                    />
                                  </div>
                                  {partnerErrors[index]?.name && (
                                    <span className="text-rose-600 text-[10px] mt-1 block">{partnerErrors[index].name}</span>
                                  )}
                                </div>

                                {/* Partner Age */}
                                <div className="flex flex-col gap-1.5 text-left">
                                  <label className="text-[9px] font-bold uppercase tracking-wider text-[#8C6A5C]">Age</label>
                                  <div className="relative">
                                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60" />
                                    <input
                                      value={partner.age}
                                      onChange={(e) => {
                                        const newPartners = [...partners];
                                        newPartners[index].age = e.target.value;
                                        setPartners(newPartners);
                                        // Clear error on change
                                        if (partnerErrors[index]?.age) {
                                          const newErrors = { ...partnerErrors };
                                          delete newErrors[index].age;
                                          setPartnerErrors(newErrors);
                                        }
                                      }}
                                      placeholder="Age"
                                      type="number"
                                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all h-[42px] shadow-sm"
                                    />
                                  </div>
                                  {partnerErrors[index]?.age && (
                                    <span className="text-rose-600 text-[10px] mt-1 block">{partnerErrors[index].age}</span>
                                  )}
                                </div>
                              </div>

                              <div className="grid md:grid-cols-2 gap-4">
                                {/* Partner Email */}
                                <div className="flex flex-col gap-1.5 text-left">
                                  <label className="text-[9px] font-bold uppercase tracking-wider text-[#8C6A5C]">Email Address</label>
                                  <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60" />
                                    <input
                                      value={partner.email}
                                      onChange={(e) => {
                                        const newPartners = [...partners];
                                        newPartners[index].email = e.target.value;
                                        setPartners(newPartners);
                                        if (partnerErrors[index]?.email) {
                                          const newErrors = { ...partnerErrors };
                                          delete newErrors[index].email;
                                          setPartnerErrors(newErrors);
                                        }
                                      }}
                                      placeholder="name@domain.com"
                                      type="email"
                                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all h-[42px] shadow-sm"
                                    />
                                  </div>
                                  {partnerErrors[index]?.email && (
                                    <span className="text-rose-600 text-[10px] mt-1 block">{partnerErrors[index].email}</span>
                                  )}
                                </div>

                                {/* Partner Phone */}
                                <div className="flex flex-col gap-1.5 text-left">
                                  <label className="text-[9px] font-bold uppercase tracking-wider text-[#8C6A5C]">Phone Number</label>
                                  <div className="relative">
                                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60" />
                                    <input
                                      value={partner.phone}
                                      onChange={(e) => {
                                        const newPartners = [...partners];
                                        newPartners[index].phone = e.target.value.replace(/\D/g, "").slice(0, 10);
                                        setPartners(newPartners);
                                        if (partnerErrors[index]?.phone) {
                                          const newErrors = { ...partnerErrors };
                                          delete newErrors[index].phone;
                                          setPartnerErrors(newErrors);
                                        }
                                      }}
                                      placeholder="10-digit mobile number"
                                      type="tel"
                                      maxLength={10}
                                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all h-[42px] shadow-sm"
                                    />
                                  </div>
                                  {partnerErrors[index]?.phone && (
                                    <span className="text-rose-600 text-[10px] mt-1 block">{partnerErrors[index].phone}</span>
                                  )}
                                </div>
                              </div>

                              {/* Partner Address */}
                              <div className="flex flex-col gap-1.5 text-left">
                                <label className="text-[9px] font-bold uppercase tracking-wider text-[#8C6A5C]">Address</label>
                                <div className="relative">
                                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6A5C]/60" />
                                  <input
                                    value={partner.address}
                                    onChange={(e) => {
                                      const newPartners = [...partners];
                                      newPartners[index].address = e.target.value;
                                      setPartners(newPartners);
                                      if (partnerErrors[index]?.address) {
                                        const newErrors = { ...partnerErrors };
                                        delete newErrors[index].address;
                                        setPartnerErrors(newErrors);
                                      }
                                    }}
                                    placeholder="Residential address"
                                    type="text"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all h-[42px] shadow-sm"
                                  />
                                </div>
                                {partnerErrors[index]?.address && (
                                  <span className="text-rose-600 text-[10px] mt-1 block">{partnerErrors[index].address}</span>
                                )}
                              </div>
                            </div>
                          ))}
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
                        Validating details...
                      </>
                    ) : (
                      `Proceed to Payment (₹${calculateTotalPrice()})`
                    )}
                  </motion.button>

                  {/* Secure connection note */}
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8C6A5C]/60 mt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-olive" />
                    <span>Your information is private and secure.</span>
                  </div>

                </form>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col text-left"
              >
                {/* Payment Header */}
                <div className="mb-8 text-left">
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-[#2D1E1A] tracking-tight leading-tight">
                    Secure Your Tickets
                  </h2>
                  <p className="text-[#8C6A5C] text-xs sm:text-sm mt-3 leading-relaxed">
                    Scan the QR code below using any UPI-enabled app (Google Pay, PhonePe, Paytm, BHIM) to make the payment and upload your receipt screenshot.
                  </p>
                </div>

                {/* Summary Box */}
                <div className="mb-6 p-5 rounded-2xl bg-[#FAF6F0]/80 border border-[#8C6A5C]/15 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs text-[#8C6A5C] border-b border-[#8C6A5C]/10 pb-2.5">
                    <span className="font-bold uppercase tracking-wider">Registration Summary</span>
                    <span className="font-bold text-terracotta bg-terracotta/5 px-2.5 py-0.5 rounded-full uppercase text-[9px] tracking-widest">
                      {tempFormData?.joiningAs} Option
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-2 text-xs">
                    <div className="text-[#8C6A5C]">Attendee:</div>
                    <div className="text-[#2D1E1A] font-bold text-right truncate">{tempFormData?.name}</div>
                    
                    <div className="text-[#8C6A5C]">Number of Persons:</div>
                    <div className="text-[#2D1E1A] font-bold text-right">{getTicketCount()}</div>

                    {joiningAs !== "Solo" && (
                      <>
                        <div className="text-[#8C6A5C]">Group Members:</div>
                        <div className="text-[#2D1E1A] font-bold text-right truncate">
                          {partners.map(p => p.name).join(", ")}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="border-t border-dashed border-[#8C6A5C]/20 pt-2.5 flex justify-between items-center">
                    <span className="text-xs font-extrabold uppercase text-[#2D1E1A]">Total Payable</span>
                    <span className="text-xl font-black text-terracotta">₹{calculateTotalPrice()}</span>
                  </div>
                </div>

                {/* QR Code / Direct UPI App Container */}
                {isMobileDevice ? (
                  <div className="flex flex-col items-center justify-center p-6 rounded-3xl border border-[#8C6A5C]/15 bg-white shadow-sm mb-6 gap-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta animate-pulse">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-[#2D1E1A]">Pay Directly via UPI Apps</h4>
                      <p className="text-[11px] text-[#8C6A5C] mt-1.5 leading-relaxed">
                        Tap the button below to pay directly using Google Pay, PhonePe, Paytm, or BHIM installed on your phone.
                      </p>
                    </div>

                    <a
                      href={`upi://pay?pa=utkarshtripathi.rpt-1@oksbi&pn=Utkarsh Tripathi&am=${calculateTotalPrice()}&cu=INR`}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-terracotta to-rose text-white text-xs font-extrabold uppercase tracking-widest shadow-md shadow-terracotta/10 hover:shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-all text-center"
                    >
                      Open UPI App & Pay
                    </a>

                    <div className="w-full flex items-center justify-center gap-2 mt-2">
                      <span className="w-full h-px bg-slate-100" />
                      <span className="text-[9px] uppercase tracking-wider text-[#8C6A5C]/50 font-bold shrink-0">Or manual copy</span>
                      <span className="w-full h-px bg-slate-100" />
                    </div>

                    <div className="flex flex-col items-center gap-1 w-full">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#8C6A5C]/70">UPI ID</span>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF6F0] border border-[#8C6A5C]/10 text-xs font-mono font-bold text-[#2D1E1A]">
                        <span>utkarshtripathi.rpt-1@oksbi</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText("utkarshtripathi.rpt-1@oksbi");
                            setCopiedUpi(true);
                            setTimeout(() => setCopiedUpi(false), 2000);
                            window.dispatchEvent(
                              new CustomEvent("show-toast", {
                                  detail: { message: "UPI ID copied!", type: "success" },
                              })
                            );
                          }}
                          className="p-1 hover:bg-white rounded transition-colors text-terracotta hover:text-[#2D1E1A] focus:outline-none cursor-pointer border-0 bg-transparent"
                          title="Copy UPI ID"
                        >
                          {copiedUpi ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Collapsible reference QR */}
                    <details className="w-full border-t border-slate-100 pt-3 mt-1">
                      <summary className="text-[9px] font-extrabold uppercase tracking-widest text-[#8C6A5C] cursor-pointer hover:text-terracotta transition-colors select-none">
                        Show QR Code (For another device)
                      </summary>
                      <div className="flex flex-col items-center justify-center mt-3 gap-2">
                        <div className="relative p-2 bg-white rounded-xl border border-slate-100 shadow-inner">
                          <img
                            src="/payment-qr.png"
                            alt="UPI QR Code"
                            className="w-[130px] h-[130px] object-contain"
                          />
                        </div>
                      </div>
                    </details>
                  </div>
                ) : (
                  /* Standard QR Code Container for Desktop */
                  <div className="flex flex-col items-center justify-center p-6 rounded-3xl border border-[#8C6A5C]/15 bg-white shadow-sm mb-6 gap-4">
                    <div className="relative p-3 bg-white rounded-2xl border-2 border-[#FAF6F0] shadow-inner select-none">
                      <img
                        src="/payment-qr.png"
                        alt="UPI QR Code"
                        className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] object-contain"
                      />
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8C6A5C]">UPI ID for Manual Transfer</span>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF6F0] border border-[#8C6A5C]/10 text-xs font-mono font-bold text-[#2D1E1A]">
                        <span>utkarshtripathi.rpt-1@oksbi</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText("utkarshtripathi.rpt-1@oksbi");
                            setCopiedUpi(true);
                            setTimeout(() => setCopiedUpi(false), 2000);
                            window.dispatchEvent(
                              new CustomEvent("show-toast", {
                                detail: { message: "UPI ID copied!", type: "success" },
                              })
                            );
                          }}
                          className="p-1 hover:bg-white rounded transition-colors text-terracotta hover:text-[#2D1E1A] focus:outline-none cursor-pointer border-0 bg-transparent"
                          title="Copy UPI ID"
                        >
                          {copiedUpi ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* File Uploader Container */}
                <div className="flex flex-col gap-2 mb-6">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A5C] text-left">
                    Upload Payment Screenshot <span className="text-rose-600">*</span>
                  </label>
                  
                  <div
                    onDragOver={(e) => { e.preventDefault(); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleFileChange(e.dataTransfer.files[0]);
                      }
                    }}
                    className={`relative border-2 border-dashed rounded-2xl p-6 transition-all flex flex-col items-center justify-center gap-3 bg-[#FAF6F0]/20 hover:bg-[#FAF6F0]/40 cursor-pointer ${
                      uploadError 
                        ? "border-rose-500 bg-rose-50/10" 
                        : paymentScreenshot 
                        ? "border-emerald-500 bg-emerald-50/5" 
                        : "border-[#8C6A5C]/25 hover:border-terracotta/50"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      id="screenshot-input"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileChange(e.target.files[0]);
                        }
                      }}
                    />

                    {paymentScreenshot ? (
                      <div className="flex flex-col items-center gap-2.5">
                        <div className="relative w-16 h-16 rounded-xl border border-emerald-500/30 overflow-hidden shadow-sm bg-white flex items-center justify-center">
                          {paymentScreenshotName?.toLowerCase().endsWith(".pdf") ? (
                            <div className="text-rose-600 font-extrabold text-xs flex flex-col items-center gap-1 select-none">
                              <span className="text-xl">📄</span>
                              <span>PDF</span>
                            </div>
                          ) : (
                            <img
                              src={paymentScreenshot}
                              alt="Screenshot Preview"
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="text-center z-10">
                          <span className="block text-xs font-bold text-[#2D1E1A] max-w-[200px] truncate">
                            {paymentScreenshotName}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setPaymentScreenshot(null);
                              setPaymentScreenshotName(null);
                            }}
                            className="text-[10px] text-rose-600 hover:text-rose-800 font-bold uppercase tracking-wide mt-1.5 focus:outline-none cursor-pointer inline-flex items-center gap-1 border-0 bg-transparent"
                          >
                            Remove File
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="w-8 h-8 text-[#8C6A5C]/50" />
                        <div className="text-center">
                          <span className="block text-xs font-bold text-[#2D1E1A]">
                            Drag & drop screenshot here, or <span className="text-terracotta">browse</span>
                          </span>
                          <span className="block text-[10px] text-[#8C6A5C]/60 mt-1">
                            Supports JPG, JPEG, PNG, PDF (Max 5MB)
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {uploadError && (
                    <span className="text-rose-600 text-xs text-left font-semibold mt-1 block">
                      ⚠️ {uploadError}
                    </span>
                  )}
                </div>

                {/* Back and Confirm Buttons */}
                <div className="flex gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setUploadError(null);
                    }}
                    className="flex-1 py-4 rounded-xl border border-[#8C6A5C]/20 hover:border-terracotta/40 bg-white hover:bg-slate-50 text-[#8C6A5C] hover:text-terracotta text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 focus:outline-none"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    disabled={isSubmittingFinal || !paymentScreenshot}
                    className="flex-[2] py-4 rounded-xl bg-gradient-to-r from-terracotta via-[#DCA037] to-terracotta bg-[length:200%_auto] hover:bg-[right_center] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-terracotta/15 hover:shadow-terracotta/25 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-500 cursor-pointer flex items-center justify-center gap-2 border-0 focus:outline-none"
                  >
                    {isSubmittingFinal ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      "Register & Submit"
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
