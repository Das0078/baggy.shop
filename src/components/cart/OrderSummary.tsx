import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { FiTag, FiArrowRight, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const OrderSummary: React.FC = () => {
  const {
    subtotal,
    discountAmount,
    discountRate,
    deliveryFee,
    total,
    promoCode,
    applyPromoCode,
  } = useCart();

  const [inputCode, setInputCode] = useState(promoCode);
  const [checkedOut, setCheckedOut] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    applyPromoCode(inputCode);
  };

  const handleCheckout = () => {
    setCheckedOut(true);
    setTimeout(() => setCheckedOut(false), 3000);
  };

  const discountPercentDisplay = Math.round(discountRate * 100);

  return (
    <div className="bg-white border border-theme-border rounded-[20px] p-5 sm:p-7 shadow-2xs w-full">
      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-extrabold text-theme-text-main font-display mb-5 sm:mb-6">
        Order Summary
      </h3>

      {/* Breakdown Rows */}
      <div className="space-y-4 text-sm sm:text-base">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-theme-text-muted font-normal">Subtotal</span>
          <span className="font-extrabold text-theme-text-main font-display">
            ${subtotal}
          </span>
        </div>

        {/* Discount (-20%) */}
        <div className="flex items-center justify-between">
          <span className="text-theme-text-muted font-normal">
            Discount (-{discountPercentDisplay}%)
          </span>
          <span className="font-extrabold text-[#FF3333] font-display">
            -${discountAmount}
          </span>
        </div>

        {/* Delivery Fee */}
        <div className="flex items-center justify-between">
          <span className="text-theme-text-muted font-normal">Delivery Fee</span>
          <span className="font-extrabold text-theme-text-main font-display">
            ${deliveryFee}
          </span>
        </div>

        {/* Divider */}
        <div className="pt-2 border-b border-theme-border" />

        {/* Total */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-base sm:text-lg text-theme-text-main font-bold">Total</span>
          <span className="text-xl sm:text-2xl font-black text-theme-text-main font-display">
            ${total}
          </span>
        </div>
      </div>

      {/* Promo Code Input & Apply Button */}
      <form onSubmit={handleApplyPromo} className="mt-6 flex items-center gap-3">
        <div className="relative flex-1">
          <FiTag
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-muted/70 pointer-events-none"
          />
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Add promo code"
            className="w-full bg-theme-input-bg text-theme-text-main placeholder-theme-text-muted/70 text-xs sm:text-sm rounded-full pl-11 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-theme-primary"
          />
        </div>

        <button
          type="submit"
          className="bg-theme-primary text-white hover:bg-theme-primary-hover px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs flex-shrink-0"
        >
          Apply
        </button>
      </form>

      {/* Checkout Button */}
      <div className="mt-5">
        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          onClick={handleCheckout}
          className="w-full bg-theme-primary text-white hover:bg-theme-primary-hover py-4 px-6 rounded-full text-sm sm:text-base font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md text-center"
        >
          {checkedOut ? (
            <>
              <FiCheck size={18} strokeWidth={3} />
              <span>Order Placed Successfully!</span>
            </>
          ) : (
            <>
              <span>Go to Checkout</span>
              <FiArrowRight size={18} />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};
