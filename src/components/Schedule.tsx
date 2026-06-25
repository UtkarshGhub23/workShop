import { motion } from "framer-motion";
import { Clock, Play, FileCode, CheckCircle, Package, Palette, Sparkles, Smile, Scissors, Heart, Award } from "lucide-react";

const SESSIONS = [
  {
    time: "09:00 AM - 09:30 AM",
    title: "Registration & Welcome",
    icon: <Play className="w-4 h-4 text-gold" />,
    desc: "Check-in at the creative lounge, receive your name tag, and meet your fellow crafters.",
  },
  {
    time: "09:30 AM - 10:00 AM",
    title: "Introduction",
    icon: <Smile className="w-4 h-4 text-orange" />,
    desc: "Meet the instructors and review the crafting plan, layouts, and design inspirations for the day.",
  },
  {
    time: "10:00 AM - 10:30 AM",
    title: "Material Distribution",
    icon: <Package className="w-4 h-4 text-pink" />,
    desc: "Collect your custom DIY kit containing premium fabrics, charms, beads, and special decorative pieces.",
  },
  {
    time: "10:30 AM - 12:30 PM",
    title: "DIY Session",
    icon: <Scissors className="w-4 h-4 text-lavender" />,
    desc: "Get hands-on! Start crafting, stitching, or assembling your chosen base products under expert guidance.",
  },
  {
    time: "12:30 PM - 01:00 PM",
    title: "Creative Guidance",
    icon: <Sparkles className="w-4 h-4 text-rose" />,
    desc: "Work one-on-one with instructors to refine your designs and learn specialized craft secrets.",
  },
  {
    time: "01:00 PM - 02:30 PM",
    title: "Decoration & Finishing",
    icon: <Palette className="w-4 h-4 text-gold" />,
    desc: "Apply personalized accessories, letters, coatings, and finishing polish for a clean, store-bought look.",
  },
  {
    time: "02:30 PM - 03:00 PM",
    title: "Showcase Your Creation",
    icon: <Heart className="w-4 h-4 text-orange" />,
    desc: "Display your handmade items on the showcase table and share your creative journey with the group.",
  },
  {
    time: "03:00 PM - 03:30 PM",
    title: "Photography",
    icon: <FileCode className="w-4 h-4 text-pink" />, // using FileCode as placeholder or replace with Camera if we want. Let's use FileCode/Camera? Wait, we can use Clock/CheckCircle, or let's import Camera. Wait, Camera is imported! Let's render <Camera />
    desc: "Capture professional photos of your creations at our dedicated aesthetic photography corner.",
  },
  {
    time: "03:30 PM - 04:00 PM",
    title: "Certificate Distribution",
    icon: <Award className="w-4 h-4 text-lavender" />,
    desc: "Receive your custom DIY Workshop Completion Certificate and pack your beautiful creations to take home!",
  },
];

export default function Schedule() {
  return (
    <section id="schedule" className="py-24 px-4 bg-transparent border-t border-slate-200/50">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-slate-200 bg-slate-100 text-xs text-slate-600 uppercase tracking-widest font-semibold mb-4">
            Workshop Schedule
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Hourly Workshop Routine
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Here's what our fun-filled DIY session looks like. We balance structure, 
            creative exploration, and personalized guidance.
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
