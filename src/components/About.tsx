import { CheckCircle2, Users } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 px-4 bg-transparent relative border-t border-[#8C6A5C]/15">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Who Can Join card */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-terracotta to-olive opacity-5 blur-xl"></div>
          <div className="relative rounded-3xl border border-[#8C6A5C]/15 bg-[#FFFDFB] p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-terracotta" />
              <h3 className="font-display font-bold text-2xl text-[#2D1E1A]">Who Can Join?</h3>
            </div>
            
            <div className="flex flex-col gap-3 text-[#8C6A5C] text-sm font-semibold border-t border-slate-100 pt-4">
              {[
                "Solo (Meet like-minded creatives)",
                "With a Friend (Create matching designs)",
                "With a Partner (Spend meaningful offline time)",
                "With a Sibling (Share creative ideas)",
                "With Family (A fun weekend activity together)"
              ].map((group) => (
                <div key={group} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-terracotta shrink-0" />
                  <span className="text-[#3C2E2A]">{group}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-[#8C6A5C]/10 pt-4 text-xs text-[#8C6A5C] font-semibold">
              Open for all age groups. Everyone is welcome regardless of experience. No prior crafting skills needed.
            </div>
          </div>
        </div>

        {/* Right Side: Copy block */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <div className="inline-flex max-w-fit px-3 py-1 rounded-full border border-terracotta/25 bg-terracotta/5 text-xs text-terracotta uppercase tracking-wider font-bold">
            About The Experience
          </div>
          
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2D1E1A] leading-tight">
            This is not just a craft workshop.
          </h2>
          
          <p className="text-[#8C6A5C] leading-relaxed text-base sm:text-lg">
            It is a carefully curated environment to step away from the digital noise, slow down, and immerse yourself in the tactile joy of making. Spend a beautiful afternoon in Mathura organizing ideas, playing interactive games, and collaborating with fellow creators.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 mt-2">
            {[
              "Spend quality time with your loved ones",
              "Make something with your own hands",
              "Disconnect entirely from screens",
              "Create lasting offline memories",
              "Enjoy a relaxed creative atmosphere",
              "Take home beautiful customized keepsakes",
            ].map((perk) => (
              <div key={perk} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-olive flex-shrink-0 mt-0.5" />
                <span className="text-[#3C2E2A] text-sm font-semibold">{perk}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
