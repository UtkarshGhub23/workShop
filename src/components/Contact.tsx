import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [msgSent, setMsgSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsgSent(true);
    setTimeout(() => setMsgSent(false), 3000);
  };

  return (
    <section id="contact" className="py-24 px-4 bg-transparent border-t border-slate-200/50 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-slate-200 bg-slate-100 text-xs text-slate-600 uppercase tracking-widest font-semibold mb-4">
            Connect
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Have Questions? Reach Out
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
            Need help choosing a plan or verifying your prerequisites? Our support team is online 
            to help you get registered.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Details & Quick Contact form */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div className="p-8 rounded-3xl border border-slate-200/60 bg-white/60 shadow-sm flex flex-col gap-6">
              <h3 className="font-display font-bold text-2xl text-slate-900">Contact Info</h3>
              
              <div className="flex flex-col gap-4">
                {[
                  { icon: <Mail className="w-5 h-5 text-gold" />, label: "Support Email", val: "hello@creativedev.io" },
                  { icon: <MessageCircle className="w-5 h-5 text-pink" />, label: "Discord Server", val: "discord.gg/creativedev" },
                  { icon: <MapPin className="w-5 h-5 text-lavender" />, label: "Main Office", val: "100 Pine St, San Francisco, CA" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200/50 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <span className="block text-xs text-slate-500 font-medium">{item.label}</span>
                      <span className="block text-sm font-bold text-slate-800 mt-0.5">{item.val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick message form */}
            <form onSubmit={handleSubmit} className="p-8 rounded-3xl border border-slate-200/60 bg-white/60 shadow-sm flex flex-col gap-4">
              <h4 className="font-display font-bold text-lg text-slate-900">Quick Message</h4>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Your Name"
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all shadow-sm"
                />
                <input
                  required
                  placeholder="Your Email"
                  type="email"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all shadow-sm"
                />
              </div>
              <textarea
                required
                rows={3}
                placeholder="How can we help you?"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all resize-none shadow-sm"
              ></textarea>
              
              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {msgSent ? (
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

          {/* Right Column: Embedded Google Map with Dark Mode Filters */}
          <div className="lg:col-span-6 min-h-[300px] relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-gold to-rose opacity-10 blur-xl"></div>
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xl">
              {/* Google Maps embed code, filtered slightly for a premium layout */}
              <iframe
                title="Google Office Map"
                src="https://maps.google.com/maps?q=100%20Pine%20St,%20San%20Francisco,%20CA&t=&z=14&ie=UTF8&iwloc=&output=embed"
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
