import React from 'react';
import { Breadcrumb } from '../components/shop/Breadcrumb';
import { CartItemRow } from '../components/cart/CartItemRow';
import { OrderSummary } from '../components/cart/OrderSummary';
import { useCart } from '../context/CartContext';
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { AnimatePresence } from 'framer-motion';

export const CartPage: React.FC = () => {
  const { items, clearCart } = useCart();

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Cart' },
          ]}
        />

        {/* Page Title & Clear Bag Action */}
        <div className="flex items-baseline justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-theme-text-main font-display tracking-tight">
            YOUR CART
          </h1>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs sm:text-sm font-semibold text-theme-text-muted hover:text-red-500 transition-colors cursor-pointer"
            >
              Clear Bag
            </button>
          )}
        </div>

        {/* Main Cart Content */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-7 bg-white border border-theme-border rounded-[20px] p-4 sm:p-6 shadow-2xs divide-y divide-theme-border">
              <AnimatePresence>
                {items.map((item, index) => (
                  <CartItemRow key={item.id} item={item} index={index} />
                ))}
              </AnimatePresence>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 sticky top-24">
              <OrderSummary />
            </div>

          </div>
        ) : (
          /* Empty Bag State */
          <div className="bg-white border border-theme-border rounded-[24px] p-10 sm:p-16 text-center max-w-xl mx-auto my-8 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-theme-bg-light flex items-center justify-center text-theme-primary mb-5 shadow-2xs">
              <FiShoppingBag size={36} />
            </div>

            <h2 className="text-2xl font-black uppercase text-theme-text-main font-display mb-2">
              Your Bag is Empty
            </h2>

            <p className="text-xs sm:text-sm text-theme-text-muted max-w-sm mb-6 leading-relaxed">
              Looks like you haven&apos;t added any pieces yet. Explore our curated streetwear collections and discover your style.
            </p>

            <a
              href="/shop"
              className="bg-theme-primary text-white hover:bg-theme-primary-hover px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>Explore Shop</span>
              <FiArrowRight size={16} />
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
