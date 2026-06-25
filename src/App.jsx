import "./App.css";
import { ToastProvider } from "./hooks/useToast.jsx";
import Background3D from "./components/Background3D";
import FloatingHearts from "./components/FloatingHearts";
import TopBar from "./components/TopBar";
import DetailsPanel from "./components/DetailsPanel";
import RegistrationForm from "./components/RegistrationForm";

export default function App() {
  return (
    <ToastProvider>
      <Background3D />

      {/* CSS glow blobs */}
      <div className="bg-scene" aria-hidden="true">
        <div className="bg-grid"></div>
        <div className="bg-glow glow-1"></div>
        <div className="bg-glow glow-2"></div>
        <div className="bg-glow glow-3"></div>
      </div>

      <FloatingHearts />
      <TopBar />

      <main className="page-layout">
        <DetailsPanel />
        <RegistrationForm />
      </main>
    </ToastProvider>
  );
}
