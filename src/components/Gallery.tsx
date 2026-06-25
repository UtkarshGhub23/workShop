import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";

const GALLERY_ITEMS = [
  { id: 1, title: "Mini Leather Bags", category: "Handmade Creations", gradient: "from-orange-400 to-amber-500", aspect: "aspect-video" },
  { id: 2, title: "Personalized Tote Bags", category: "Fabric Painting", gradient: "from-pink-400 to-rose-500", aspect: "aspect-square" },
  { id: 3, title: "Aesthetic Phone Charms", category: "DIY Accessories", gradient: "from-purple-400 to-indigo-500", aspect: "aspect-square" },
  { id: 4, title: "Woven Friendship Bracelets", category: "Group Crafts", gradient: "from-emerald-400 to-teal-500", aspect: "aspect-video" },
  { id: 5, title: "Mini Canvas Easel Art", category: "Painting Session", gradient: "from-blue-400 to-cyan-500", aspect: "aspect-square" },
  { id: 6, title: "Custom Acrylic Keychains", category: "Resin & Acrylic", gradient: "from-rose-400 to-purple-500", aspect: "aspect-video" },
];

export default function Gallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const activeItem = GALLERY_ITEMS.find((item) => item.id === selectedId);

  return (
    <section id="gallery" className="py-24 px-4 bg-transparent border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex px-3 py-1 rounded-full border border-slate-200 bg-slate-100 text-xs text-slate-600 uppercase tracking-widest font-semibold mb-4">
            Workshop Gallery
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Glimpse of Past Work
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            See the beautiful handcrafted accessories, bags, canvases, and bracelets created by our workshop participants.
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
              className={`break-inside-avoid relative rounded-3xl overflow-hidden border border-slate-200/60 bg-white/60 hover:border-gold/30 hover:shadow-2xl transition-all duration-300 cursor-pointer group ${item.aspect}`}
              onClick={() => setSelectedId(item.id)}
            >
              {/* Visual Card Gradient */}
              <div className={`w-full h-full bg-gradient-to-tr ${item.gradient} flex flex-col items-center justify-center p-6 relative`}>
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:16px_16px] opacity-35"></div>
                
                {/* Visual Category tag */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200/40 text-[9px] font-bold text-slate-700 uppercase tracking-wider shadow-sm">
                  {item.category}
                </div>
                
                {/* Zoom icon */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center border border-slate-200/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-slate-800" />
                </div>

                <div className="text-center">
                  <span className="block text-2xl font-bold font-display text-white filter drop-shadow-md">
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
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedId(null)}
          >
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full border border-slate-200 bg-white/90 hover:bg-white flex items-center justify-center text-slate-800 focus:outline-none shadow-lg cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden border border-slate-200 aspect-video bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`w-full h-full bg-gradient-to-tr ${activeItem.gradient} flex items-center justify-center relative p-8`}>
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:16px_16px] opacity-35"></div>
                <div className="text-center z-10">
                  <span className="block text-xs font-bold text-white/80 uppercase tracking-widest mb-2">{activeItem.category}</span>
                  <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-white filter drop-shadow-lg">{activeItem.title}</h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
