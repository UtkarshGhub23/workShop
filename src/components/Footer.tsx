import { Code2, Download } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);
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
    <footer className="bg-[#f5f3f7] border-t border-slate-200/50 py-16 px-4 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Left Column: Brand details */}
        <div className="md:col-span-5 flex flex-col items-start gap-4 text-left">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-gold to-rose flex items-center justify-center">
              <Code2 className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-display font-extrabold text-lg tracking-wider text-slate-900">
              TRAYYA<span className="text-gold">AI</span>
            </span>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm">
            Educating the next generation of creative web developers. Mastering WebGL, 
            Three.js, custom fragment shaders, and performant React systems.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-2">
            {[
              { 
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                ), 
                href: "#",
                label: "Twitter"
              },
              { 
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                ), 
                href: "#",
                label: "GitHub"
              },
              { 
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                ), 
                href: "#",
                label: "YouTube"
              },
            ].map((soc, idx) => (
              <a
                key={idx}
                href={soc.href}
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors shadow-sm"
                aria-label={soc.label}
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Center Column: Quick Links */}
        <div className="md:col-span-4 flex flex-col items-start gap-3 text-left">
          <h4 className="font-display font-bold text-sm text-slate-900 uppercase tracking-wider mb-1">
            Quick Links
          </h4>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {[
              { id: "about", lbl: "About" },
              { id: "highlights", lbl: "Highlights" },
              { id: "learn", lbl: "Curriculum" },
              { id: "make", lbl: "Projects" },
              { id: "pricing", lbl: "Plans" },
              { id: "schedule", lbl: "Timeline" },
              { id: "gallery", lbl: "Gallery" },
              { id: "faq", lbl: "FAQs" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer text-left focus:outline-none"
              >
                {item.lbl}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Legals */}
        <div className="md:col-span-3 flex flex-col items-start gap-3 text-left">
          <h4 className="font-display font-bold text-sm text-slate-900 uppercase tracking-wider mb-1">
            Legal & Support
          </h4>
          <button
            onClick={() => setModalType("privacy")}
            className="text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer text-left focus:outline-none"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setModalType("terms")}
            className="text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer text-left focus:outline-none"
          >
            Terms & Conditions
          </button>
          
          {showInstallBtn && (
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("trigger-install"))}
              className="text-xs sm:text-sm text-gold font-bold hover:text-slate-900 transition-colors cursor-pointer text-left focus:outline-none flex items-center gap-1.5 mt-2"
            >
              <Download className="w-3.5 h-3.5" />
              Install App Shortcut
            </button>
          )}

          <span className="text-[11px] text-slate-400 font-medium mt-4">
            © 2026 TrayyaAI. All rights reserved.
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
            className="bg-[#fcfbfd] border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-left relative cursor-default shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display font-bold text-2xl text-slate-900 mb-4">
              {modalType === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
            </h3>
            
            <div className="max-h-[300px] overflow-y-auto text-slate-600 text-xs leading-relaxed pr-2 flex flex-col gap-3">
              <p>
                Welcome to TrayyaAI. We prioritize your privacy and intellectual growth. 
                Your name, email address, and phone details are encrypted during registration.
              </p>
              <p>
                <strong>Information Sharing:</strong> We do not sell or lease registration inputs 
                to third-party tracking services. All materials and source codes provided during 
                the class are copyrighted for individual educational use.
              </p>
              <p>
                <strong>Workspace Access:</strong> Lifetime recording credentials and Discord 
                invitations are tied to a single user account and cannot be redistributed.
              </p>
            </div>

            <button
              onClick={() => setModalType(null)}
              className="mt-6 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold w-full cursor-pointer focus:outline-none"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
