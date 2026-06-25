import { useState, useEffect, useCallback } from "react";
import { Menu, X, Code2, Download, Share, Plus, MoreVertical, Monitor, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { id: "about", label: "About" },
  { id: "highlights", label: "Highlights" },
  { id: "learn", label: "Curriculum" },
  { id: "make", label: "Projects" },
  { id: "pricing", label: "Pricing" },
  { id: "schedule", label: "Schedule" },
  { id: "gallery", label: "Gallery" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
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
          detail: { message: "TrayyaAI App installed successfully!", type: "success" },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#fcfbfd]/85 backdrop-blur-md border-b border-slate-200/50 py-3 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold to-rose flex items-center justify-center shadow-md shadow-orange/10 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-wider text-slate-900">
              TRAYYA<span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-pink">AI</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-slate-600 hover:text-slate-950 cursor-pointer transition-colors focus:outline-none"
              >
                {link.label}
              </button>
            ))}

            {/* PWA Install Button in Desktop Nav */}
            {showInstallBtn && (
              <button
                onClick={handleInstallApp}
                className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 text-sm font-bold transition-all cursor-pointer focus:outline-none"
              >
                <Download className="w-4 h-4 text-gold" />
                Install App
              </button>
            )}

            <button
              onClick={() => scrollTo("register")}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-gold via-orange to-rose text-white text-sm font-bold shadow-md shadow-orange/15 hover:shadow-orange/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer transition-all duration-200"
            >
              Register Now
            </button>
          </nav>

          {/* Mobile Hamburger toggle */}
          <div className="lg:hidden flex items-center gap-2">
            {showInstallBtn && (
              <button
                onClick={handleInstallApp}
                className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 transition-colors focus:outline-none cursor-pointer"
                aria-label="Install App"
              >
                <Download className="w-5 h-5 text-gold" />
              </button>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 transition-colors focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-in Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-x-0 top-[70px] bg-[#fcfbfd]/98 backdrop-blur-xl border-b border-slate-200/80 py-6 px-4 flex flex-col gap-5 shadow-2xl z-40 max-h-[calc(100vh-70px)] overflow-y-auto"
            >
              {LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left py-2.5 text-base font-semibold text-slate-700 hover:text-slate-900 border-b border-slate-100 focus:outline-none"
                >
                  {link.label}
                </button>
              ))}
              
              {showInstallBtn && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleInstallApp();
                  }}
                  className="w-full py-3 rounded-xl border border-slate-200 text-slate-800 font-bold flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5 text-gold" />
                  Install App Shortcut
                </button>
              )}

              <button
                onClick={() => scrollTo("register")}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-gold via-orange to-rose text-white font-bold text-center shadow-lg shadow-orange/15 focus:outline-none"
              >
                Register Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

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
              className="bg-[#fcfbfd] border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full text-left relative cursor-default shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowInstallInstructions(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-display font-extrabold text-xl text-slate-900 mb-2 flex items-center gap-2">
                Install TrayyaAI App <Download className="w-5 h-5 text-gold" />
              </h3>
              <p className="text-slate-500 text-xs mb-6">
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
                      className={`flex-1 pb-3 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 cursor-pointer transition-colors ${
                        active
                          ? "border-gold text-slate-900"
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
