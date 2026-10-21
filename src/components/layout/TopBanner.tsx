import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

export const TopBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-theme-primary text-white text-xs sm:text-sm font-normal py-2.5 px-4 relative z-50 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center text-center relative pr-8">
            <p className="tracking-wide">
              Sign up and get 20% off to your first order.{' '}
              <a
                href="#signup"
                className="font-semibold underline underline-offset-4 hover:text-coffee-200 transition-colors ml-1"
              >
                Sign Up Now
              </a>
            </p>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              aria-label="Close announcement banner"
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <IoClose size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
