import React from 'react';
import { motion } from 'framer-motion';
import { CategoryProduct } from '../../data/categoryProducts';
import { StarRating } from '../common/StarRating';
import { AddToBagButton } from '../common/AddToBagButton';
import { useCart } from '../../context/CartContext';

interface CategoryProductCardProps {
  product: CategoryProduct;
  index?: number;
}

export const CategoryProductCard: React.FC<CategoryProductCardProps> = ({
  product,
  index = 0,
}) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      discountBadge: product.discountBadge,
      image: product.image,
      size: product.sizes[0] || 'Large',
      color: 'Default',
      quantity: 1,
    });
  };

  return (
    <a href={`/product/${product.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: index * 0.04 }}
        className="group flex flex-col cursor-pointer"
      >
        {/* Product Image Container */}
        <div className="relative aspect-square w-full rounded-[20px] bg-theme-bg-card overflow-hidden flex items-center justify-center mb-3 md:mb-4 transition-all duration-300 group-hover:shadow-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Quick Add to Bag on hover */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-10 pointer-events-auto">
            <AddToBagButton
              size="sm"
              fullWidth
              className="shadow-md"
              onClick={handleQuickAdd}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-1.5">
          {/* Name */}
          <h3 className="font-bold text-sm sm:text-base text-theme-text-main group-hover:text-theme-primary transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Rating */}
          <StarRating rating={product.rating} size={15} />

          {/* Price Row */}
          <div className="flex items-center gap-2.5 mt-0.5">
            <span className="text-lg sm:text-xl font-bold text-theme-text-main">
              ${product.price}
            </span>

            {product.originalPrice && (
              <span className="text-lg sm:text-xl font-bold text-theme-text-muted/60 line-through">
                ${product.originalPrice}
              </span>
            )}

            {product.discountBadge && (
              <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-theme-discount-bg text-theme-discount-fg">
                {product.discountBadge}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </a>
  );
};
