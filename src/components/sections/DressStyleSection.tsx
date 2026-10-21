import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const DressStyleSection: React.FC = () => {
  return (
    <section className="w-full bg-white my-8 md:my-14 overflow-hidden">
      {/* Edge-to-edge Full Viewport Width Grid System matching reference */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-2.5 md:gap-3 bg-white">
        
        {/* Left Column: Casual Card (Full Height, ~68% width on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-8 h-[460px] sm:h-[540px] md:h-[620px] lg:h-[720px] xl:h-[780px]"
        >
          <Link
            to="/shop?style=Casual"
            className="group relative block w-full h-full overflow-hidden"
          >
            {/* FHD Background Image */}
            <img
              src="/images/dress-style/casual.jpg"
              alt="Curated Casual for Modern Living"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />

            {/* Contrast Gradients for 100% legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20 pointer-events-none" />

            {/* Content: Top-Left Aligned exactly matching reference screenshot */}
            <div className="absolute top-0 left-0 p-8 sm:p-12 md:p-14 lg:p-16 xl:p-20 z-10 flex flex-col items-start">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[62px] font-normal text-white leading-[1.12] tracking-tight drop-shadow-sm font-sans">
                Curated Casual<br />
                for Modern<br />
                Living
              </h2>

              <span className="inline-block mt-4 sm:mt-5 md:mt-7 text-sm sm:text-base font-medium text-white underline underline-offset-8 decoration-1 group-hover:text-amber-100 group-hover:decoration-amber-100 transition-colors duration-300">
                Shop Casual
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Right Column: Formal & Party Stacked (50/50 vertical split, ~32% width on desktop) */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-2 sm:gap-2.5 md:gap-3">
          
          {/* Top-Right Card: Formal (Organic Textures position) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-[280px] sm:h-[320px] lg:h-full w-full"
          >
            <Link
              to="/shop?style=Formal"
              className="group relative block w-full h-full overflow-hidden"
            >
              {/* FHD Background Image */}
              <img
                src="/images/dress-style/formal.jpg"
                alt="Tailored Formal"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Contrast Overlay */}
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors duration-500 pointer-events-none" />

              {/* Content: Centered Horizontally & Vertically matching reference screenshot */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-normal text-white tracking-tight drop-shadow-sm font-sans">
                  Tailored Formal
                </h3>

                <span className="inline-block mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-medium text-white underline underline-offset-8 decoration-1 group-hover:text-amber-100 group-hover:decoration-amber-100 transition-colors duration-300">
                  Shop Formal
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Bottom-Right Card: Party (Ambient Art position) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[280px] sm:h-[320px] lg:h-full w-full"
          >
            <Link
              to="/shop?style=Party"
              className="group relative block w-full h-full overflow-hidden"
            >
              {/* FHD Background Image */}
              <img
                src="/images/dress-style/party.jpg"
                alt="Ambient Party"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Contrast Overlay */}
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors duration-500 pointer-events-none" />

              {/* Content: Centered Horizontally & Vertically matching reference screenshot */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-normal text-white tracking-tight drop-shadow-sm font-sans">
                  Ambient Party
                </h3>

                <span className="inline-block mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-medium text-white underline underline-offset-8 decoration-1 group-hover:text-amber-100 group-hover:decoration-amber-100 transition-colors duration-300">
                  Shop Party
                </span>
              </div>
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
