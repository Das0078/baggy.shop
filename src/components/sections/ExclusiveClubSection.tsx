import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FiCheck, FiArrowUpRight } from 'react-icons/fi';
import { AddToBagButton } from '../common/AddToBagButton';
import { exclusiveClubItems, ExclusiveClubItem } from '../../data/exclusiveClub';

export const ExclusiveClubSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ExclusiveClubItem | null>(null);
  const [boughtNow, setBoughtNow] = useState(false);

  // Duplicate for seamless 360-degree infinite marquee loop
  const marqueeItems = [...exclusiveClubItems, ...exclusiveClubItems];

  const handleBuy = () => {
    setBoughtNow(true);
    setTimeout(() => setBoughtNow(false), 2000);
  };

  return (
    <section className="bg-theme-primary text-white py-14 sm:py-20 overflow-hidden relative border-y border-white/10 select-none">
      
      {/* Top Header: Left-aligned title with luxury dark coffee styling */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-coffee-300 uppercase block mb-2">
              Curated Runway Drops
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-display text-left">
              Exclusive club
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-coffee-200/80 max-w-md sm:text-right leading-relaxed">
            Handcrafted luxury silhouettes and limited-run designer pieces. Click any piece to inspect details.
          </p>
        </div>
      </div>

      {/* Smooth Auto-Scrolling Marquee Track with Edge Vignettes */}
      <div className="relative w-full">
        {/* Soft Vignette Edge Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-theme-primary to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-theme-primary to-transparent z-10" />

        {/* Continuous Horizontal Marquee Track */}
        <div className="animate-club-scroll flex items-center gap-5 sm:gap-6 py-2">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => setSelectedItem(item)}
              className="group relative w-[240px] sm:w-[270px] md:w-[290px] h-[390px] sm:h-[440px] md:h-[470px] rounded-[18px] sm:rounded-[22px] overflow-hidden flex-shrink-0 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Full-bleed Portrait Card Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Dark Gradient Overlay for typography readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Bottom Card Typography (matches video frame 00:00-00:03) */}
              <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex flex-col justify-end">
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white/70 uppercase">
                  {item.category}
                </span>
                <div className="flex items-center justify-between mt-1">
                  <h3 className="font-extrabold text-base sm:text-lg text-white font-display uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiArrowUpRight size={15} />
                  </span>
                </div>
              </div>

              {/* Hover Highlight Border */}
              <div className="absolute inset-0 border border-white/10 group-hover:border-white/30 rounded-[18px] sm:rounded-[22px] transition-colors pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Split-Screen Modal View (matches exact animation at 00:04-00:06 of video) */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#1c1b1f] border border-white/15 rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <IoClose size={20} />
              </button>

              {/* Left Column: Full-height High-Res Portrait Image */}
              <div className="relative h-[320px] md:h-[480px] w-full bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedItem.largeImage || selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Right Column: Luxury Product Info & Actions (matches video at 00:04) */}
              <div className="p-6 sm:p-10 flex flex-col justify-center text-white bg-[#1a191d]">
                {/* Category kicker */}
                <span className="text-xs font-bold tracking-[0.25em] text-white/60 uppercase mb-2">
                  {selectedItem.category}
                </span>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight font-display mb-2">
                  {selectedItem.title}
                </h3>

                {/* Price */}
                <div className="text-xl sm:text-2xl font-bold text-coffee-300 font-display mb-6">
                  {selectedItem.price}
                </div>

                {/* Description Paragraph */}
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-8">
                  {selectedItem.description}
                </p>

                {/* Dual Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                  <AddToBagButton size="md" className="flex-1 rounded border border-white/20" />

                  <button
                    onClick={handleBuy}
                    className="flex-1 py-3 px-6 rounded bg-[#F4F1EA] text-black hover:bg-white active:scale-95 transition-all text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                  >
                    {boughtNow ? (
                      <>
                        <FiCheck size={16} />
                        Purchased
                      </>
                    ) : (
                      'BUY'
                    )}
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
