import React from 'react';
import { CartItem, useCart } from '../../context/CartContext';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface CartItemRowProps {
  item: CartItem;
  index: number;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item, index }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const isAtLimit = item.quantity >= item.maxLimit;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="flex gap-3.5 sm:gap-5 py-4 sm:py-5 first:pt-0 last:pb-0 items-start"
    >
      {/* Product Image Thumbnail */}
      <a
        href={`/product/${item.productId}`}
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-[16px] bg-theme-bg-card p-2 flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </a>

      {/* Product Details & Actions */}
      <div className="flex-1 flex flex-col justify-between min-h-[96px] sm:min-h-[112px]">
        
        {/* Top: Name & Red Trash Delete Icon */}
        <div className="flex items-start justify-between gap-2">
          <a
            href={`/product/${item.productId}`}
            className="font-bold text-sm sm:text-base text-theme-text-main hover:text-theme-primary transition-colors line-clamp-1"
          >
            {item.name}
          </a>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:text-red-600 p-1 cursor-pointer transition-colors"
            aria-label={`Remove ${item.name} from bag`}
          >
            <FiTrash2 size={18} />
          </button>
        </div>

        {/* Middle: Size & Color */}
        <div className="space-y-0.5 text-xs text-theme-text-muted mt-1">
          <p>
            Size: <span className="text-theme-text-main font-semibold">{item.size}</span>
          </p>
          <p>
            Color: <span className="text-theme-text-main font-semibold">{item.color}</span>
          </p>
        </div>

        {/* Bottom: Price & Quantity Controls */}
        <div className="flex items-center justify-between mt-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base sm:text-xl text-theme-text-main font-display">
              ${item.price}
            </span>

            {item.originalPrice && (
              <span className="text-xs sm:text-sm font-semibold text-theme-text-muted/60 line-through">
                ${item.originalPrice}
              </span>
            )}
          </div>

          {/* Quantity Selector Pill with Max Limit indicator */}
          <div className="flex items-center gap-2">
            {isAtLimit && (
              <span className="hidden sm:inline-block text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                Max {item.maxLimit} reached
              </span>
            )}

            <div className="flex items-center justify-between bg-theme-bg-light rounded-full px-3 sm:px-4 py-1.5 sm:py-2 gap-3 sm:gap-4">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="text-theme-text-main hover:text-theme-primary p-0.5 cursor-pointer transition-colors"
                aria-label="Decrease quantity"
              >
                <FiMinus size={14} />
              </button>

              <span className="font-bold text-xs sm:text-sm text-theme-text-main min-w-[12px] text-center">
                {item.quantity}
              </span>

              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                disabled={isAtLimit}
                className={`p-0.5 transition-colors ${
                  isAtLimit
                    ? 'text-theme-text-muted/40 cursor-not-allowed'
                    : 'text-theme-text-main hover:text-theme-primary cursor-pointer'
                }`}
                aria-label="Increase quantity"
              >
                <FiPlus size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
