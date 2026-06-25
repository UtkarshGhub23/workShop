import { CheckCircle2, Lightbulb, ShieldCheck, Zap, Users } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 px-4 bg-transparent relative border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Who Can Join card */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-gold via-pink to-rose opacity-10 blur-xl"></div>
          <div className="relative rounded-3xl border border-slate-200/60 bg-white/80 p-8 glassmorphic flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-gold" />
              <h3 className="font-display font-bold text-2xl text-slate-900">Who Can Join?</h3>
            </div>
            
            <div className="flex flex-col gap-3 text-slate-600 text-sm font-semibold border-t border-slate-100 pt-4">
              {[
                "Kids (Age 8+)",
                "Teenagers",
                "College Students",
                "Adults",
                "Friends",
                "Couples",
                "Families"
              ].map((group) => (
                <div key={group} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-gold shrink-0" />
                  <span>{group}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-4 text-xs font-bold text-slate-500 italic">
              No previous crafting experience required.
            </div>
          </div>
        </div>

        {/* Right Side: Copy block */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <div className="inline-flex max-w-fit px-3 py-1 rounded-full border border-slate-200 bg-slate-100 text-xs text-slate-600 uppercase tracking-widest font-semibold">
            About the Workshop
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Welcome to our DIY Workshop, where<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-pink">
              Imagination Meets Creativity
            </span>
          </h2>
          <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
            This workshop is designed for people of all ages who enjoy creating unique handcrafted products. 
            Whether you’re coming with friends, family, or individually, you’ll experience a fun-filled 
            session guided by experienced instructors. No prior experience is required—just bring your creativity!
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {[
              "Complete DIY Kit provided on entry",
              "Professional guidance from craft experts",
              "Take home every single creation you make",
              "Enjoy fun activities and games",
              "Personalized DIY accessories setup",
              "Verified Workshop Certificate of Completion",
            ].map((perk) => (
              <div key={perk} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm font-semibold">{perk}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
