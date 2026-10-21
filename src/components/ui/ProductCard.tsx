import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { StarRating } from '../common/StarRating';
import { AddToBagButton } from '../common/AddToBagButton';
import { FiChevronRight } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const [selectedSwatch, setSelectedSwatch] = useState(0);
  const { addToCart } = useCart();

  const swatches = product.swatches || ['#432818', '#2b2b2b', '#e5e0db'];

  const handleAddToBag = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      discountBadge: product.discountBadge,
      image: product.image,
      size: 'Large',
      color: 'Default',
      quantity: 1,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="group w-[280px] sm:w-[310px] flex-shrink-0 flex flex-col items-center text-center select-none"
    >
      {/* Top Rounded Squircle Card Container */}
      <div className="relative w-full h-[270px] sm:h-[300px] rounded-[28px] sm:rounded-[32px] hover:bg-[#f3efec] transition-colors duration-300 p-6 flex items-center justify-center overflow-hidden shadow-2xs group-hover:shadow-md">
        
        {/* Discount Badge in top-right */}
        {product.discountBadge && (
          <span className="absolute top-4 right-4 text-[11px] font-bold px-2.5 py-1 rounded-full bg-theme-discount-bg text-theme-discount-fg shadow-2xs">
            {product.discountBadge}
          </span>
        )}

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none"
          loading="lazy"
        />
      </div>

      {/* Swatch Color Dots */}
      <div className="flex items-center gap-2 mt-4 mb-2">
        {swatches.map((color, sIndex) => (
          <button
            key={sIndex}
            onClick={() => setSelectedSwatch(sIndex)}
            style={{ backgroundColor: color }}
            aria-label={`Select color variant ${sIndex + 1}`}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
              selectedSwatch === sIndex
                ? 'ring-2 ring-offset-2 ring-theme-primary scale-110 shadow-xs'
                : 'opacity-70 hover:opacity-100'
            }`}
          />
        ))}
      </div>

      {/* Badge / Category Flag */}
      <span className="text-[11px] font-bold uppercase tracking-wider text-coffee-600 mb-1">
        {product.discountBadge ? 'Special Offer' : 'New'}
      </span>

      {/* Product Title */}
      <h3 className="font-extrabold text-lg sm:text-xl text-theme-text-main group-hover:text-theme-primary transition-colors line-clamp-1 px-2 font-display">
        {product.name}
      </h3>

      {/* Tagline / Subtitle */}
      <p className="mt-1 text-xs text-theme-text-muted line-clamp-2 px-3 min-h-[32px] leading-relaxed">
        {product.tagline || 'Designed to elevate your everyday streetwear wardrobe with effortless comfort.'}
      </p>

      {/* Price & Rating */}
      <div className="mt-3 flex flex-col items-center gap-1.5">
        <div className="flex items-baseline gap-2">
          <span className="text-sm text-theme-text-muted font-normal">From</span>
          <span className="text-xl sm:text-2xl font-black text-theme-text-main font-display">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm font-semibold text-theme-text-muted/60 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Star Rating */}
        <StarRating rating={product.rating} size={14} />
      </div>

      {/* Action Buttons: Pill + Text Link */}
      <div className="mt-5 flex items-center justify-center gap-3 w-full">
        <AddToBagButton
          size="sm"
          className="shadow-xs"
          onAdd={handleAddToBag}
        />

        <a
          href={`/product/${product.id}`}
          className="text-theme-primary hover:text-coffee-700 text-xs sm:text-sm font-semibold flex items-center gap-0.5 group/link py-1"
        >
          <span>Details</span>
          <FiChevronRight size={15} className="group-hover/link:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};
