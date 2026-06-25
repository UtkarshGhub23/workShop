import { motion } from "framer-motion";
import { Clock, Play, Coffee, FileCode, CheckCircle } from "lucide-react";

const SESSIONS = [
  {
    time: "09:00 AM - 09:30 AM",
    title: "Setup Check & Morning Huddle",
    icon: <Play className="w-4 h-4 text-gold" />,
    desc: "Verify Node versions, Three.js installations, packages, and check-in to Discord server tracks.",
  },
  {
    time: "09:30 AM - 12:30 PM",
    title: "Core Lecture & Concept Breakdown",
    icon: <FileCode className="w-4 h-4 text-orange" />,
    desc: "Live code demonstration detailing the day's math equations, WebGL buffers, and React state binding models.",
  },
  {
    time: "12:30 PM - 01:30 PM",
    title: "Lunch & Networking Lounge",
    icon: <Coffee className="w-4 h-4 text-pink" />,
    desc: "Relax, chat with peer developers, and discuss ideas in the Virtual Potluck Discord voice lobbies.",
  },
  {
    time: "01:30 PM - 04:30 PM",
    title: "Hands-on Lab & Pair Programming",
    icon: <FileCode className="w-4 h-4 text-lavender" />,
    desc: "Time to code. You will build and debug the day's assignment templates alongside direct mentor guidance.",
  },
  {
    time: "04:30 PM - 05:00 PM",
    title: "Project Review & Closing Sync",
    icon: <CheckCircle className="w-4 h-4 text-rose" />,
    desc: "Review stand-out code submissions, grade homework requirements, and introduce tomorrow's topics.",
  },
];

export default function Schedule() {
  return (
    <section id="schedule" className="py-24 px-4 bg-transparent border-t border-slate-200/50">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-slate-200 bg-slate-100 text-xs text-slate-600 uppercase tracking-widest font-semibold mb-4">
            Daily Timeline
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Hourly Workshop Routine
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Here's what a typical day looks like during the workshop. We balance structure, 
            hands-on lab time, and community networking.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-slate-200 ml-3 md:ml-32 pl-8 flex flex-col gap-10">
          {SESSIONS.map((session, idx) => (
            <motion.div
              key={session.title}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-8 group text-left"
            >
              {/* Timeline marker node */}
              <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-gold group-hover:scale-110 transition-all duration-300 shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-gold/50 group-hover:bg-gold transition-colors"></div>
              </div>

              {/* Time display left aligned for desktop */}
              <div className="md:w-32 md:-ml-[160px] md:text-right shrink-0 flex items-center gap-1.5 text-xs font-bold text-slate-500 group-hover:text-gold transition-colors">
                <Clock className="w-3.5 h-3.5 inline md:hidden" />
                <span>{session.time.split(" - ")[0]}</span>
              </div>

              {/* Card Container */}
              <div className="flex-grow p-6 rounded-2xl border border-slate-200/50 bg-white/60 group-hover:bg-white transition-colors shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gold/70 group-hover:text-gold transition-colors">
                  {session.icon}
                  <span>{session.time}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  {session.title}
                </h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {session.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
