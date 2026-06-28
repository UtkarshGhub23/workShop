import { Download } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [modalType, setModalType] = useState<"privacy" | "terms" | "refund" | null>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone;
    setShowInstallBtn(!isStandalone);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-[#F5EFEB] border-t border-[#8C6A5C]/15 py-16 px-4 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">

        {/* Left Column: Brand details */}
        <div className="md:col-span-5 flex flex-col items-start gap-4 text-left">
          <div className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-terracotta/5 border border-terracotta/25 flex items-center justify-center group-hover:bg-terracotta/10 group-hover:border-terracotta/40 transition-all duration-500 shadow-sm">
              <svg className="w-4.5 h-4.5 text-terracotta group-hover:rotate-45 transition-transform duration-500" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10 0-5.523-4.477-10-10-10 5.523 0 10-4.477 10-10z" />
              </svg>
            </div>
            <span className="font-display font-medium text-base tracking-[0.22em] text-[#2D1E1A] uppercase whitespace-nowrap">
              Trayyaai<span className="text-terracotta/75 font-light mx-1.5">×</span>Ayra
            </span>
          </div>
          <p className="text-[#8C6A5C] text-xs sm:text-sm leading-relaxed max-w-sm">
            Celebrate friendship with creativity. Spend a screen-free afternoon in Mathura customizing accessories, playing fun teamwork games, and taking home memories you'll keep forever.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-2">
            {[
              {
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="2" fill="none" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" stroke="currentColor" strokeWidth="2" />
                  </svg>
                ),
                href: "https://instagram.com",
                label: "Instagram"
              },
            ].map((soc, idx) => (
              <a
                key={idx}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-[#8C6A5C]/20 bg-white hover:bg-[#FAF6F0] flex items-center justify-center text-[#8C6A5C] hover:text-terracotta transition-colors shadow-sm"
                aria-label={soc.label}
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Center Column: Quick Links */}
        <div className="md:col-span-4 flex flex-col items-start gap-3 text-left">
          <h4 className="font-display font-bold text-xs text-[#2D1E1A] uppercase tracking-wider mb-1">
            Quick Links
          </h4>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {[
              { id: "about", lbl: "About" },
              { id: "make", lbl: "Workshop" },
              { id: "register", lbl: "Register" },
              { id: "contact", lbl: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xs sm:text-sm text-[#8C6A5C] hover:text-[#C87A53] transition-colors cursor-pointer text-left focus:outline-none"
              >
                {item.lbl}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Legals */}
        <div className="md:col-span-3 flex flex-col items-start gap-3 text-left">
          <h4 className="font-display font-bold text-xs text-[#2D1E1A] uppercase tracking-wider mb-1">
            Legal & Support
          </h4>
          <button
            onClick={() => setModalType("privacy")}
            className="text-xs sm:text-sm text-[#8C6A5C] hover:text-terracotta transition-colors cursor-pointer text-left focus:outline-none"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setModalType("terms")}
            className="text-xs sm:text-sm text-[#8C6A5C] hover:text-terracotta transition-colors cursor-pointer text-left focus:outline-none"
          >
            Terms & Conditions
          </button>
          <button
            onClick={() => setModalType("refund")}
            className="text-xs sm:text-sm text-[#8C6A5C] hover:text-terracotta transition-colors cursor-pointer text-left focus:outline-none"
          >
            Refund Policy
          </button>

          {showInstallBtn && (
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("trigger-install"))}
              className="text-xs sm:text-sm text-terracotta font-bold hover:text-brown transition-colors cursor-pointer text-left focus:outline-none flex items-center gap-1.5 mt-2"
            >
              <Download className="w-3.5 h-3.5" />
              Install App Shortcut
            </button>
          )}

          <span className="text-[11px] text-[#8C6A5C]/60 font-semibold mt-4">
            © 2026 Trayyaai × Ayra. All rights reserved.
          </span>
        </div>

      </div>

      {/* Legal Popups */}
      {modalType && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setModalType(null)}
        >
          <div
            className="bg-[#FAF6F0] border border-[#8C6A5C]/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-left relative cursor-default shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display font-bold text-2xl text-[#2D1E1A] mb-4">
              {modalType === "privacy" && "Privacy Policy"}
              {modalType === "terms" && "Terms & Conditions"}
              {modalType === "refund" && "Refund Policy"}
            </h3>

            <div className="max-h-[300px] overflow-y-auto text-[#8C6A5C] text-xs leading-relaxed pr-2 flex flex-col gap-3">
              {modalType === "privacy" && (
                <>
                  <p>
                    Welcome to the Trayyaai × Ayra Workshop website. We prioritize your privacy. Your name, email address, age, and phone details are encrypted during registration interest logging.
                  </p>
                  <p>
                    <strong>Information Sharing:</strong> We do not sell or lease registration inputs to third-party advertising or tracking services.
                  </p>
                </>
              )}
              {modalType === "terms" && (
                <>
                  <p>
                    By registering your interest for the Trayyaai × Ayra Friendship Day DIY Experience, you agree to receive notification alerts when ticket bookings open.
                  </p>
                  <p>
                    All materials are supplied on-site, and final customized creations belong to the participant to take home.
                  </p>
                </>
              )}
              {modalType === "refund" && (
                <>
                  <p>
                    <strong>Cancellation & Refunds:</strong> Since this is a specialized experience, final pass purchases are subject to refund policies which will be shared when bookings go live.
                  </p>
                  <p>
                    If you register interest and book an early-bird pass, cancellations can typically be requested up to 48 hours before the workshop for a full refund or rescheduling options.
                  </p>
                </>
              )}
            </div>

            <button
              onClick={() => setModalType(null)}
              className="mt-6 px-6 py-2.5 rounded-xl bg-[#2D1E1A] text-white text-xs font-bold w-full cursor-pointer focus:outline-none"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
