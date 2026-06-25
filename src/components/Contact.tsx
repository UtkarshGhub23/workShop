import { Mail, MapPin, MessageCircle, Phone, Send, Loader2 } from "lucide-react";
import { useState } from "react";

const Instagram = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Contact() {
  const [msgSent, setMsgSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const message = formData.get("message") as string;

      const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";
      if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.startsWith("https://script.google.com")) {
        const params = new URLSearchParams();
        params.append("formType", "contact");
        params.append("name", name);
        params.append("email", email);
        params.append("message", message);

        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        });
      } else {
        // Simulate API delay locally if script URL not set
        console.warn("Google Script URL is not configured. Simulating API request locally.");
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      setMsgSent(true);
      e.currentTarget.reset();

      // Dispatch toast notification
      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: { message: "Message sent successfully!", type: "success" },
        })
      );

      setTimeout(() => setMsgSent(false), 3000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: { message: "Failed to send message. Please try again.", type: "error" },
        })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 bg-transparent border-t border-[#8C6A5C]/15 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-terracotta/25 bg-terracotta/5 text-xs text-terracotta uppercase tracking-wider font-bold mb-4">
            Get In Touch
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2D1E1A] leading-tight">
            Location & Contact Details
          </h2>
          <p className="text-[#8C6A5C] text-xs sm:text-sm mt-4 leading-relaxed">
            Have questions about registrations or slot confirmations? Send us a quick email, direct message us on Instagram, or chat with us on WhatsApp.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Details & Quick Contact form */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div className="p-8 rounded-3xl border border-[#8C6A5C]/10 bg-[#FFFDFB] shadow-sm flex flex-col gap-6">
              <h3 className="font-display font-bold text-2xl text-[#2D1E1A]">Contact Information</h3>
              
              <div className="flex flex-col gap-4">
                {[
                  { icon: <Phone className="w-5 h-5 text-olive" />, label: "Phone & WhatsApp Support", val: "+91 98765 43210" },
                  { icon: <Mail className="w-5 h-5 text-terracotta" />, label: "Support Email Address", val: "hello@trayyaai.com" },
                  { icon: <Instagram className="w-5 h-5 text-brown" />, label: "Instagram Links", val: "@trayyaai · @ayra" },
                  { icon: <MapPin className="w-5 h-5 text-olive" />, label: "Workshop Location", val: "Mathura, Uttar Pradesh (Venue details shared post-registration)" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center border border-[#8C6A5C]/5 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <span className="block text-[10px] text-[#8C6A5C] font-semibold uppercase tracking-wider">{item.label}</span>
                      <span className="block text-xs font-bold text-[#3C2E2A] mt-0.5">{item.val}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm w-full mt-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Quick message form */}
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl border border-[#8C6A5C]/10 bg-[#FFFDFB] shadow-sm flex flex-col gap-4">
              <h4 className="font-display font-bold text-lg text-[#2D1E1A]">Quick Message</h4>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  required
                  name="name"
                  placeholder="Your Name"
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition-all shadow-sm"
                />
                <input
                  required
                  name="email"
                  placeholder="Your Email"
                  type="email"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition-all shadow-sm"
                />
              </div>
              <textarea
                required
                name="message"
                rows={3}
                placeholder="How can we help you?"
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#8C6A5C]/20 text-[#2D1E1A] placeholder-[#8C6A5C]/40 text-xs focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/15 transition-all resize-none shadow-sm"
              ></textarea>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-6 rounded-xl bg-[#FAF6F0] hover:bg-[#F5EFEB] border border-[#8C6A5C]/15 text-[#8C6A5C] hover:text-[#2D1E1A] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Sending...
                  </>
                ) : msgSent ? (
                  <span className="text-emerald-600 font-bold">Message Sent!</span>
                ) : (
                  <>
                    Send Message
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Embedded Google Map with Filters */}
          <div className="lg:col-span-6 min-h-[300px] relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-terracotta to-olive opacity-5 blur-xl"></div>
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-[#8C6A5C]/15 bg-slate-100 shadow-sm">
              <iframe
                title="Mathura Location Map"
                src="https://maps.google.com/maps?q=Mathura,%20Uttar%20Pradesh,%20India&t=&z=12&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[350px] border-0 opacity-90 select-none"
                style={{
                  filter: "contrast(1.05) brightness(0.98) saturate(0.9)",
                }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
