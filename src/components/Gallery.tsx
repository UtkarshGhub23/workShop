import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";

const GALLERY_ITEMS = [
  { id: 1, title: "Personalized Canvas Pouches", category: "Handmade Bags", gradient: "from-[#C87A53]/30 to-[#C87A53]/70", aspect: "aspect-video" },
  { id: 2, title: "Custom Waist Bags", category: "Fabric Painting", gradient: "from-[#606C38]/30 to-[#606C38]/70", aspect: "aspect-square" },
  { id: 3, title: "Woven Friendship Bands", category: "Thread Weaving", gradient: "from-[#8C6A5C]/30 to-[#8C6A5C]/70", aspect: "aspect-square" },
  { id: 4, title: "Beaded Letter Bracelets", category: "Group Crafts", gradient: "from-[#C87A53]/30 to-[#606C38]/50", aspect: "aspect-video" },
  { id: 5, title: "Collaborative Team Art", category: "Mini Games", gradient: "from-[#606C38]/30 to-[#8C6A5C]/50", aspect: "aspect-square" },
  { id: 6, title: "Aesthetic Corner Snapshots", category: "Photo Moments", gradient: "from-[#8C6A5C]/30 to-[#C87A53]/50", aspect: "aspect-video" },
];

export default function Gallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const activeItem = GALLERY_ITEMS.find((item) => item.id === selectedId);

  return (
    <section id="gallery" className="py-24 px-4 bg-transparent border-t border-[#8C6A5C]/15">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-terracotta/25 bg-terracotta/5 text-xs text-terracotta uppercase tracking-wider font-bold mb-4">
            Workshop Gallery
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2D1E1A] leading-tight">
            Glimpse of Past Work
          </h2>
          <p className="text-[#8C6A5C] text-base sm:text-lg mt-4 leading-relaxed">
            See the beautiful handcrafted accessories, pouches, and bracelets created by our workshop participants.
          </p>
        </div>

        {/* Gallery Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className={`break-inside-avoid relative rounded-3xl overflow-hidden border border-[#8C6A5C]/10 bg-[#FFFDFB]/60 hover:border-terracotta/30 hover:shadow-xl transition-all duration-300 cursor-pointer group ${item.aspect}`}
              onClick={() => setSelectedId(item.id)}
            >
              {/* Visual Card Gradient */}
              <div className={`w-full h-full bg-gradient-to-tr ${item.gradient} flex flex-col items-center justify-center p-6 relative`}>
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:16px_16px] opacity-35"></div>
                
                {/* Visual Category tag */}
                <div className="absolute top-4 left-4 bg-[#FFFDFB]/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#8C6A5C]/10 text-[9px] font-bold text-[#8C6A5C] uppercase tracking-wider shadow-sm">
                  {item.category}
                </div>
                
                {/* Zoom icon */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FFFDFB]/90 backdrop-blur-md flex items-center justify-center border border-[#8C6A5C]/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-[#2D1E1A]" />
                </div>

                <div className="text-center">
                  <span className="block text-2xl font-bold font-display text-[#2D1E1A] filter drop-shadow-sm px-2">
                    {item.title}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedId && activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedId(null)}
          >
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full border border-[#8C6A5C]/20 bg-[#FFFDFB]/90 hover:bg-[#FFFDFB] flex items-center justify-center text-[#2D1E1A] focus:outline-none shadow-lg cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden border border-[#8C6A5C]/20 aspect-video bg-[#FFFDFB] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`w-full h-full bg-gradient-to-tr ${activeItem.gradient} flex items-center justify-center relative p-8`}>
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:16px_16px] opacity-35"></div>
                <div className="text-center z-10">
                  <span className="block text-xs font-bold text-[#8C6A5C] uppercase tracking-widest mb-2">{activeItem.category}</span>
                  <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-[#2D1E1A] filter drop-shadow-sm">{activeItem.title}</h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
