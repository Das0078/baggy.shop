import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiCheck, FiX } from 'react-icons/fi';

interface DecorItem {
  id: string;
  name: string;
  image: string;
  tagline: string;
}

const decorCategories: DecorItem[] = [
  {
    id: 'sofa',
    name: 'Sofa',
    image: '/images/home-decor/sofa.png',
    tagline: 'Sculptural modular seating designed for everyday comfort.',
  },
  {
    id: 'chair',
    name: 'Chair',
    image: '/images/home-decor/chair.png',
    tagline: 'Contoured lounge armchairs in warm earth-tone fabrics.',
  },
  {
    id: 'table',
    name: 'Table',
    image: '/images/home-decor/table.png',
    tagline: 'Minimalist fluted travertine and stone coffee tables.',
  },
  {
    id: 'bed',
    name: 'Bed',
    image: '/images/home-decor/bed.png',
    tagline: 'Upholstered platform beds with tailored geometric headboards.',
  },
  {
    id: 'storage',
    name: 'Storage',
    image: '/images/home-decor/storage.png',
    tagline: 'Mid-century wood credenzas with slender architectural stilt legs.',
  },
  {
    id: 'lighting',
    name: 'Lighting',
    image: '/images/home-decor/lighting.png',
    tagline: 'Brushed metal task spotlights and ambient sculptural lamps.',
  },
];

// Repeat 4x for continuous, seamless infinite marquee looping
const marqueeItems = [
  ...decorCategories,
  ...decorCategories,
  ...decorCategories,
  ...decorCategories,
];

export const HomeDecorSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<DecorItem | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setSelectedItem(null);
      setEmail('');
    }, 2200);
  };

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 overflow-hidden relative select-none border-b border-theme-border/60">
      
      {/* Centered Title (matches screenshot reference with dark coffee typography) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#432818] font-sans tracking-tight">
          Home decors coming soon
        </h2>
        {/* <p className="mt-2 text-xs sm:text-sm text-coffee-600/80 max-w-md mx-auto">
          Elevate your living space with our upcoming curated architectural furniture collection.
        </p> */}
      </div>

      {/* Auto-scrolling Horizontal Marquee Track with Soft Gradient Vignettes */}
      <div className="relative w-full overflow-hidden">
        
        {/* Left & Right Soft Fade Vignettes for high-end aesthetic */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* Continuous Slow Marquee Row */}
        <div className="animate-decor-marquee flex items-end gap-10 sm:gap-14 md:gap-20 py-4">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => setSelectedItem(item)}
              className="group flex flex-col items-center justify-end flex-shrink-0 cursor-pointer transition-all duration-300 w-28 sm:w-36 md:w-44"
            >
              {/* Transparent Furniture Image Container */}
              <div className="h-20 sm:h-24 md:h-28 w-full flex items-center justify-center p-1">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-xs group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Category Label in Dark Coffee Color */}
              <span className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-[#432818] group-hover:text-coffee-600 transition-colors text-center font-sans tracking-normal">
                {item.name}
              </span>

              {/* Subtle hover indicator dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-coffee-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Coming Soon / Notify Me Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white border border-theme-border rounded-[24px] p-6 sm:p-8 shadow-2xl text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-coffee-600/70 hover:text-[#432818] p-1.5 rounded-full hover:bg-theme-bg-light transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <FiX size={20} />
              </button>

              {/* Item Preview */}
              <div className="w-28 h-24 mx-auto mb-4 flex items-center justify-center bg-theme-bg-light rounded-2xl p-2">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Status Badge */}
              <span className="inline-block px-3 py-1 rounded-full bg-coffee-100 text-[#432818] text-[11px] font-bold uppercase tracking-wider mb-2">
                Coming Soon
              </span>

              <h3 className="text-xl sm:text-2xl font-bold text-[#432818] font-sans">
                baGGy Home • {selectedItem.name}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-theme-text-muted leading-relaxed">
                {selectedItem.tagline}
              </p>

              {/* Notify Form */}
              <form onSubmit={handleNotifySubmit} className="mt-6 flex flex-col gap-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email to get notified"
                    required
                    className="w-full bg-theme-input-bg text-[#432818] placeholder-theme-text-muted/70 text-xs sm:text-sm rounded-full px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#432818]/30 transition-all border border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#432818] text-white hover:bg-[#2e1a0f] py-3.5 px-6 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm active:scale-98"
                >
                  {subscribed ? (
                    <>
                      <FiCheck size={16} strokeWidth={3} />
                      <span>You&apos;re on the VIP waitlist!</span>
                    </>
                  ) : (
                    <>
                      <FiBell size={15} />
                      <span>Notify Me at Launch</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default HomeDecorSection;