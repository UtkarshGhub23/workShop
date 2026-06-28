import { useState, useEffect, useCallback } from "react";
import { Menu, X, Download, Share, Plus, MoreVertical, Monitor, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { id: "about", label: "About" },
  { id: "make", label: "What You'll Create" },
  { id: "highlights", label: "Highlights" },
  { id: "learn", label: "Mini Games" },
  { id: "schedule", label: "Why Join" },
  { id: "team", label: "Team" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Location" },
];

const CORE_LINKS = [
  { id: "about", label: "About" },
  { id: "highlights", label: "Highlights" },
  { id: "schedule", label: "Why Join" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } },
};

interface HeaderProps {
  currentView: "home" | "team" | "faq" | "register";
  onNavigate: (view: "home" | "team" | "faq" | "register") => void;
}

export default function Header({ currentView, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // PWA Installation State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);
  const [showInstallInstructions, setShowInstallInstructions] = useState(false);
  const [modalTab, setModalTab] = useState<"android" | "ios" | "desktop">("android");
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // iOS Detection
    const iosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iosDevice);

    // Standalone Check
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone;

    if (isStandalone) {
      setShowInstallBtn(false);
    } else {
      setShowInstallBtn(true);
    }

    // Android/Chrome beforeinstallprompt handler
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowInstallBtn(false);
      // Trigger a custom toast for PWA installed successfully
      window.dispatchEvent(
        new CustomEvent("show-toast", {
          detail: { message: "Trayyaai × Ayra App installed successfully!", type: "success" },
        })
      );
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallApp = useCallback(async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User choice result: ${outcome}`);
        setDeferredPrompt(null);
        return;
      } catch (err) {
        console.error("Installation prompt error:", err);
      }
    }

    // Fallback: show instructions modal
    let detectTab: "android" | "ios" | "desktop" = "android";
    if (isIOS) {
      detectTab = "ios";
    } else if (!/Mobi|Android/i.test(navigator.userAgent)) {
      detectTab = "desktop";
    }
    setModalTab(detectTab);
    setShowInstallInstructions(true);
  }, [deferredPrompt, isIOS]);

  useEffect(() => {
    const handleTriggerInstall = () => {
      handleInstallApp();
    };
    window.addEventListener("trigger-install", handleTriggerInstall);
    return () => {
      window.removeEventListener("trigger-install", handleTriggerInstall);
    };
  }, [handleInstallApp]);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    if (id === "team" || id === "faq" || id === "register") {
      onNavigate(id as any);
      return;
    }

    if (currentView !== "home") {
      onNavigate("home");
      setTimeout(() => {
        const element = document.getElementById(id);
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
      }, 150);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 70; // Header height offset
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
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl transition-all duration-300 rounded-full ${scrolled
          ? "bg-[#FAF6F0]/80 backdrop-blur-xl border border-[#8C6A5C]/20 py-2.5 shadow-lg shadow-[#8C6A5C]/5"
          : "bg-[#FAF6F0]/45 backdrop-blur-md border border-[#8C6A5C]/10 py-3.5 shadow-sm"
          }`}
      >
        <div className="px-5 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none shrink-0"
          >
            <div className="w-8 h-8 rounded-full bg-terracotta/5 border border-terracotta/25 flex items-center justify-center group-hover:bg-terracotta/10 group-hover:border-terracotta/40 transition-all duration-500 shadow-sm">
              <svg className="w-4 h-4 text-terracotta group-hover:rotate-45 transition-transform duration-500" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10 0-5.523-4.477-10-10-10 5.523 0 10-4.477 10-10z" />
              </svg>
            </div>
            <span className="font-display font-medium text-sm sm:text-base tracking-[0.18em] sm:tracking-[0.22em] text-[#2D1E1A] uppercase whitespace-nowrap">
              Trayyaai<span className="text-terracotta/75 font-light mx-1 sm:mx-1.5">×</span>Ayra
            </span>
          </button>

          {/* Right Section (Core Links + Register + Hamburger Menu) */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Core Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-5 mr-1">
              {CORE_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-xs font-semibold uppercase tracking-wider text-[#8C6A5C] hover:text-[#C87A53] cursor-pointer transition-colors focus:outline-none"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Register Now CTA */}
            <button
              onClick={() => scrollTo("register")}
              className="px-4.5 py-2 rounded-full bg-terracotta hover:bg-brown text-white text-[11px] font-bold uppercase tracking-wider shadow-md shadow-terracotta/15 hover:shadow-terracotta/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer transition-all duration-200"
            >
              Register
            </button>

            {/* Premium Minimal Hamburger Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-[#8C6A5C]/20 hover:border-terracotta bg-white/40 hover:bg-white text-terracotta transition-all duration-300 focus:outline-none cursor-pointer shadow-sm"
              aria-label="Toggle menu"
            >
              <Menu className="w-4.5 h-4.5" />
            </button>

          </div>
        </div>
      </header>

      {/* Sleek Slide-over Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#2D1E1A]/20 backdrop-blur-md z-45 cursor-pointer"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#FAF6F0] border-l border-[#8C6A5C]/15 z-50 p-8 flex flex-col justify-between shadow-2xl overflow-y-auto"
            >
              <div>
                {/* Header inside Panel */}
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-terracotta/5 border border-terracotta/25 flex items-center justify-center">
                      <svg className="w-4 h-4 text-terracotta" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                        <path d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10 0-5.523-4.477-10-10-10 5.523 0 10-4.477 10-10z" />
                      </svg>
                    </div>
                    <span className="font-display font-medium text-sm tracking-[0.2em] text-[#2D1E1A] uppercase">
                      Trayyaai<span className="text-terracotta/75 font-light mx-1">×</span>Ayra
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-9 h-9 rounded-full flex items-center justify-center border border-[#8C6A5C]/20 hover:border-terracotta bg-white text-[#8C6A5C] hover:text-terracotta transition-all duration-300 focus:outline-none cursor-pointer shadow-sm"
                    aria-label="Close menu"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* Staggered Navigation Links */}
                <motion.nav
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col gap-6"
                >
                  {LINKS.map((link) => (
                    <motion.button
                      key={link.id}
                      variants={itemVariants}
                      onClick={() => {
                        setIsOpen(false);
                        scrollTo(link.id);
                      }}
                      className="text-left font-display text-2xl sm:text-3xl text-[#2D1E1A] hover:text-terracotta transition-all duration-300 flex items-center gap-3.5 group cursor-pointer focus:outline-none"
                    >
                      <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-terracotta font-serif text-lg leading-none">✦</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 font-medium">{link.label}</span>
                    </motion.button>
                  ))}
                </motion.nav>
              </div>

              {/* Bottom Section with PWA button & Event Info */}
              <div className="mt-12 pt-8 border-t border-[#8C6A5C]/10 flex flex-col gap-6">
                {showInstallBtn && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleInstallApp();
                    }}
                    className="w-full py-3 rounded-full border border-terracotta/25 hover:border-terracotta/55 bg-white hover:bg-[#FAF6F0] text-terracotta font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    Install App Shortcut
                  </button>
                )}

                <div className="flex flex-col gap-1 text-[11px] text-[#8C6A5C]/80 font-medium tracking-wide">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
                    <span>Friendship Day DIY Workshop</span>
                  </div>
                  <span>Mathura • Sunday, Aug 2, 2026</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Unified PWA Instructions Modal */}
      <AnimatePresence>
        {showInstallInstructions && (
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setShowInstallInstructions(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FAF6F0] border border-terracotta/20 rounded-3xl p-6 sm:p-8 max-w-md w-full text-left relative cursor-default shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowInstallInstructions(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-display font-extrabold text-xl text-[#2D1E1A] mb-2 flex items-center gap-2">
                Install Trayyaai × Ayra App <Download className="w-5 h-5 text-terracotta" />
              </h3>
              <p className="text-[#8C6A5C] text-xs mb-6">
                Add this application to your home screen or desktop to browse instantly and work offline.
              </p>

              {/* Tabs */}
              <div className="flex border-b border-slate-200 mb-6">
                {[
                  { id: "android", label: "Android", icon: Smartphone },
                  { id: "ios", label: "iPhone/iPad", icon: Smartphone },
                  { id: "desktop", label: "Desktop", icon: Monitor }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = modalTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setModalTab(tab.id as any)}
                      className={`flex-1 pb-3 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 cursor-pointer transition-colors ${active
                        ? "border-terracotta text-slate-900"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 text-slate-700 text-sm leading-relaxed">
                {modalTab === "android" && (
                  <>
                    <div className="flex gap-3.5 items-start">
                      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 font-bold text-slate-900 text-xs">1</div>
                      <p className="text-xs">
                        Tap the browser menu button (three vertical dots <MoreVertical className="w-4 h-4 inline text-slate-500 mx-0.5" /> in Chrome's address bar).
                      </p>
                    </div>
                    <div className="flex gap-3.5 items-start">
                      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 font-bold text-slate-900 text-xs">2</div>
                      <p className="text-xs">
                        Select <strong>Install app</strong> or <strong>Add to Home screen</strong> from the list.
                      </p>
                    </div>
                    <div className="flex gap-3.5 items-start">
                      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 font-bold text-slate-900 text-xs">3</div>
                      <p className="text-xs">
                        Tap <strong>Install</strong> or <strong>Add</strong> in the pop-up to place the launcher icon on your Home Screen.
                      </p>
                    </div>
                  </>
                )}

                {modalTab === "ios" && (
                  <>
                    <div className="flex gap-3.5 items-start">
                      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 font-bold text-slate-900 text-xs">1</div>
                      <p className="text-xs">
                        Tap the <strong>Share</strong> button in Safari's bottom toolbar <Share className="w-4 h-4 inline text-blue-500 mx-1" />.
                      </p>
                    </div>
                    <div className="flex gap-3.5 items-start">
                      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 font-bold text-slate-900 text-xs">2</div>
                      <p className="text-xs">
                        Scroll down and select <strong>Add to Home Screen</strong> <Plus className="w-4 h-4 inline text-slate-900 mx-1" />.
                      </p>
                    </div>
                    <div className="flex gap-3.5 items-start">
                      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 font-bold text-slate-900 text-xs">3</div>
                      <p className="text-xs">
                        Tap <strong>Add</strong> in the top-right corner to complete the installation.
                      </p>
                    </div>
                  </>
                )}

                {modalTab === "desktop" && (
                  <>
                    <div className="flex gap-3.5 items-start">
                      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 font-bold text-slate-900 text-xs">1</div>
                      <p className="text-xs">
                        Look at the right-hand side of your browser's address bar at the top of this window.
                      </p>
                    </div>
                    <div className="flex gap-3.5 items-start">
                      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 font-bold text-slate-900 text-xs">2</div>
                      <p className="text-xs">
                        Click the <strong>Install</strong> icon (typically a computer screen with an arrow, or a plus icon next to the bookmark star).
                      </p>
                    </div>
                    <div className="flex gap-3.5 items-start">
                      <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 font-bold text-slate-900 text-xs">3</div>
                      <p className="text-xs">
                        Click <strong>Install</strong> to launch the application as a standalone desktop shortcut.
                      </p>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => setShowInstallInstructions(false)}
                className="mt-8 w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-center text-xs cursor-pointer transition-colors"
              >
                Okay, I Got It
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
