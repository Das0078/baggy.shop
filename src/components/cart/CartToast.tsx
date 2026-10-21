import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertCircle, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

export const CartToast: React.FC = () => {
  const { toastMessage, clearToast } = useCart();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full bg-[#1c1b1f] text-white p-4 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2.5">
            <FiAlertCircle size={20} className="text-coffee-300 flex-shrink-0" />
            <p className="text-xs sm:text-sm font-medium leading-snug">{toastMessage}</p>
          </div>

          <button
            onClick={clearToast}
            className="text-white/60 hover:text-white p-1 cursor-pointer transition-colors"
            aria-label="Close notification"
          >
            <FiX size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
