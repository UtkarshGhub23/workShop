import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WifiOff, Wifi, RefreshCw, X } from "lucide-react";
import Loader from "./components/Loader";
import BackgroundThree from "./components/BackgroundThree";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Highlights from "./components/Highlights";
import Learn from "./components/Learn";
import Make from "./components/Make";
import Pricing from "./components/Pricing";
import Schedule from "./components/Schedule";
import Team from "./components/Team";
import FAQ from "./components/FAQ";
import RegistrationForm from "./components/RegistrationForm";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Toast Type
interface ToastState {
  message: string;
  type: "success" | "error" | "info";
  id: number;
}

export default function App() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Service Worker Update State
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // 1. Network Status Observers
    const handleOnline = () => {
      setIsOffline(false);
      triggerToast("Back Online! Connection restored.", "success");
    };

    const handleOffline = () => {
      setIsOffline(true);
      triggerToast("Operating in Offline Mode. Cached pages are available.", "info");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 2. Custom Toast Event Listener
    const handleCustomToast = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        triggerToast(customEvent.detail.message, customEvent.detail.type || "success");
      }
    };
    window.addEventListener("show-toast", handleCustomToast);

    // 3. Service Worker Registration & Update checks
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          setSwRegistration(reg);

          // Check if there is already a waiting service worker
          if (reg.waiting) {
            setUpdateAvailable(true);
          }

          // Listen for new service workers installing
          reg.addEventListener("updatefound", () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  setUpdateAvailable(true);
                }
              });
            }
          });
        })
        .catch((err) => {
          console.error("Service worker registration failed:", err);
        });

      // Reload page once new service worker takes control
      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    }

    // 4. Loading state timeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("show-toast", handleCustomToast);
      clearTimeout(timer);
    };
  }, []);

  const triggerToast = (message: string, type: ToastState["type"] = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { message, type, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleUpdateRefresh = () => {
    if (swRegistration && swRegistration.waiting) {
      // Send skipWaiting command to waiting service worker
      swRegistration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-gold/30 selection:text-white bg-[#fcfbfd] text-slate-800">
      
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>

      {/* 3D WebGL Background (adjusted for Light Mode) */}
      <BackgroundThree />

      {/* Navigation Header (includes PWA prompt) */}
      <Header />

      {/* Main Page Layout */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Highlights />
        <Learn />
        <Make />
        <Pricing />
        <Schedule />
        <Team />
        <FAQ />
        <RegistrationForm />
        <Contact />
      </main>

      {/* Footer Block */}
      <Footer />

      {/* Dynamic Offline / Connection Toast */}
      {isOffline && (
        <div className="fixed bottom-6 left-6 z-50 p-4.5 rounded-2xl bg-slate-900 border border-white/10 text-white shadow-2xl flex items-center gap-3 animate-bounce">
          <WifiOff className="w-5 h-5 text-amber-500" />
          <div className="text-left">
            <span className="block text-xs font-extrabold uppercase tracking-wide">Offline Mode</span>
            <span className="block text-[10px] text-slate-400">Cached pages are serving</span>
          </div>
        </div>
      )}

      {/* PWA Version Update Banner */}
      {updateAvailable && (
        <div className="fixed top-20 right-6 z-50 p-5 rounded-2xl bg-slate-900 border border-white/10 text-white shadow-2xl max-w-sm text-left flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-gold animate-spin" />
              <span className="text-sm font-extrabold">New Version Available!</span>
            </div>
            <button 
              onClick={() => setUpdateAvailable(false)} 
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            We have published updates and performance fixes to the TrayyaAI Workshop. Refresh to load the latest builds.
          </p>
          <button
            onClick={handleUpdateRefresh}
            className="w-full py-2 rounded-xl bg-gradient-to-r from-gold to-rose text-white text-xs font-bold shadow-lg"
          >
            Refresh & Update
          </button>
        </div>
      )}

      {/* Toast Portal/Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-xs sm:max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-xl border flex items-center justify-between gap-3 shadow-xl transition-all duration-300 ${
              toast.type === "success"
                ? "bg-slate-950 border-emerald-500/35 text-white"
                : toast.type === "error"
                ? "bg-slate-950 border-rose/35 text-white"
                : "bg-slate-950 border-gold/35 text-white"
            }`}
          >
            <div className="flex items-center gap-2 text-left">
              {toast.type === "success" ? (
                <Wifi className="w-4 h-4 text-emerald-400" />
              ) : (
                <WifiOff className="w-4 h-4 text-amber-400" />
              )}
              <span className="text-xs font-semibold">{toast.message}</span>
            </div>
            <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-white shrink-0">
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
