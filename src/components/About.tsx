import { CheckCircle2, Lightbulb, ShieldCheck, Zap } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 px-4 bg-transparent relative border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Illustration / Image block */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-gold via-pink to-rose opacity-10 blur-xl"></div>
          <div className="relative rounded-3xl border border-slate-200/60 bg-white/80 p-8 glassmorphic flex flex-col gap-6">
            <Lightbulb className="w-8 h-8 text-gold" />
            <h3 className="font-display font-bold text-2xl text-slate-900">Why Creative Development?</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Standard flat websites are becoming a thing of the past. The web is moving to 3D and 
              highly spatial interaction. Brands are paying top dollar for developers who can curate 
              immersive virtual spaces and fluid motions.
            </p>
            <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
              {[
                { icon: <Zap className="w-4 h-4 text-gold" />, txt: "Accelerated learning curve" },
                { icon: <ShieldCheck className="w-4 h-4 text-pink" />, txt: "Production-ready templates provided" },
              ].map((item) => (
                <div key={item.txt} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  {item.icon}
                  {item.txt}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Copy block */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <div className="inline-flex max-w-fit px-3 py-1 rounded-full border border-slate-200 bg-slate-100 text-xs text-slate-600 uppercase tracking-widest font-semibold">
            About the Workshop
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Bridging Design, Code, &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-pink">
              Immersive Mathematics
            </span>
          </h2>
          <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
            This workshop isn't just about reading documentation. It's an intensive, five-day sprint 
            designed to teach you the visual engineering skills required to build premium portfolios, 
            e-commerce showcases, and landing pages.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {[
              "Complete 3 WebGL projects during class",
              "Understand matrix transformations & vectors",
              "Learn GPU optimization & asset loading",
              "Build custom shaders & render passes",
              "Lifetime access to Discord community",
              "Certificate of Completion",
            ].map((perk) => (
              <div key={perk} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm sm:text-base">{perk}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
