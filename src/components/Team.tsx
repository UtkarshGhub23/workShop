import { motion } from "framer-motion";

const InstagramIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TEAM = [
  {
    name: "Shivangi Soni",
    role: "Co-Founder",
    org: "TrayyaAI",
    initials: "SS",
    bgGradient: "from-[#C87A53] to-[#8C6A5C]",
    desc: "Leads the creative vision and business operations of TrayyaAI, ensuring every workshop delivers a unique, engaging, and high-quality creative experience.",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Utkarsh Tripathi",
    role: "Technical Department",
    org: "TrayyaAI",
    initials: "UT",
    bgGradient: "from-[#606C38] to-[#8C6A5C]",
    desc: "Responsible for website development, technical infrastructure, registration management, and providing a seamless digital experience for participants before, during, and after the workshop.",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Khushboo Agrawal",
    role: "Marketing, Promotions & Engagement",
    org: "TrayyaAI",
    initials: "KA",
    bgGradient: "from-[#8C6A5C] to-[#C87A53]",
    desc: "Leads marketing campaigns, promotional strategies, social media presence, audience engagement, and community outreach to maximize workshop visibility and participant engagement.",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Dakshita Arora",
    role: "Founder, Ayra",
    org: "Workshop Planning & Execution",
    initials: "DA",
    bgGradient: "from-[#C87A53] to-[#606C38]",
    desc: "Plans, coordinates, and executes workshop activities while ensuring every session is well-organized, interactive, and delivers an enjoyable experience for all participants.",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 px-4 bg-transparent border-t border-[#8C6A5C]/15 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-terracotta/25 bg-terracotta/5 text-xs text-terracotta uppercase tracking-wider font-bold mb-4">
            Our Organizers
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2D1E1A] leading-tight">
            Meet Our Team
          </h2>
          <p className="text-[#8C6A5C] text-base sm:text-lg mt-4 leading-relaxed">
            The passionate minds behind this workshop, working together to create a fun, creative, and memorable experience for every participant.
          </p>
        </div>

        {/* 4-column responsive team cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group relative rounded-3xl border border-[#8C6A5C]/10 bg-[#FFFDFB] p-6 hover:shadow-xl hover:border-terracotta/35 transition-all duration-300 flex flex-col justify-between items-center text-center cursor-pointer overflow-hidden shadow-sm"
            >
              {/* Background gradient subtle glow */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-tr from-terracotta/10 to-[#FFFDFB]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

              <div className="flex flex-col items-center w-full">
                {/* Circular profile image placeholder */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-6 p-1 border-2 border-dashed border-[#8C6A5C]/35 group-hover:border-terracotta transition-all duration-300">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${member.bgGradient} flex items-center justify-center text-white font-display font-bold text-2xl select-none group-hover:scale-105 transition-transform duration-300`}>
                    {member.initials}
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-display font-bold text-lg text-[#2D1E1A] group-hover:text-terracotta transition-colors duration-300">
                  {member.name}
                </h3>

                {/* Designation */}
                <span className="block text-xs font-bold text-terracotta uppercase tracking-wider mt-1.5">
                  {member.role}
                </span>

                {/* Organization */}
                {member.org && (
                  <span className="block text-[10px] font-semibold text-[#8C6A5C] uppercase tracking-widest mt-1">
                    {member.org}
                  </span>
                )}

                {/* Short Role Description */}
                <p className="text-xs text-[#8C6A5C] leading-relaxed mt-4 border-t border-[#8C6A5C]/5 pt-4">
                  {member.desc}
                </p>
              </div>

              {/* Social links drawer (revealed on hover) */}
              <div className="flex items-center gap-3 mt-6 border-t border-[#8C6A5C]/5 pt-4 w-full justify-center">
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-[#8C6A5C]/10 bg-[#FAF6F0] flex items-center justify-center text-[#8C6A5C] hover:text-terracotta transition-colors hover:border-terracotta/30"
                  aria-label="Instagram Link"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-[#8C6A5C]/10 bg-[#FAF6F0] flex items-center justify-center text-[#8C6A5C] hover:text-terracotta transition-colors hover:border-terracotta/30"
                  aria-label="LinkedIn Link"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
