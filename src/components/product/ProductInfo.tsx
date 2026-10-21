import React, { useState } from 'react';
import { ProductDetail } from '../../data/allProducts';
import { StarRating } from '../common/StarRating';
import { AddToBagButton } from '../common/AddToBagButton';
import { FiMinus, FiPlus, FiCheck } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

interface ProductInfoProps {
  product: ProductDetail;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Large');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const hasDiscount = Boolean(
    product.discountBadge || (product.originalPrice && product.originalPrice > product.price)
  );
  const maxLimit = hasDiscount ? 6 : 5;

  const handleAddToBag = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      discountBadge: product.discountBadge,
      image: product.images[0] || '/images/products/onelife-main.png',
      size: selectedSize,
      color: product.colors[selectedColor]?.name || 'Default',
      quantity,
    });
  };

  return (
    <div className="flex flex-col select-none">
      {/* Product Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-theme-text-main font-display leading-tight tracking-tight">
        {product.name}
      </h1>

      {/* Rating Row */}
      <div className="flex items-center gap-2 mt-2.5">
        <StarRating rating={product.rating} size={17} />
      </div>

      {/* Price Row */}
      <div className="flex items-center gap-3.5 mt-3 sm:mt-4">
        <span className="text-2xl sm:text-3xl font-extrabold text-theme-text-main font-display">
          ${product.price}
        </span>

        {product.originalPrice && (
          <span className="text-2xl sm:text-3xl font-bold text-theme-text-muted/50 line-through">
            ${product.originalPrice}
          </span>
        )}

        {product.discountBadge && (
          <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-theme-discount-bg text-theme-discount-fg">
            {product.discountBadge}
          </span>
        )}
      </div>

      {/* Description Paragraph */}
      <p className="mt-4 text-xs sm:text-sm text-theme-text-muted leading-relaxed font-normal">
        {product.description}
      </p>

      {/* Order Limit Notice */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-[11px] font-semibold text-coffee-700 bg-coffee-50 px-2.5 py-1 rounded-full border border-coffee-200/60">
          Limit: {maxLimit} items max {hasDiscount ? '(Sale promotion bonus)' : ''}
        </span>
      </div>

      {/* Divider */}
      <div className="my-5 sm:my-6 border-b border-theme-border" />

      {/* Select Colors */}
      <div>
        <span className="text-xs sm:text-sm text-theme-text-muted font-normal block mb-3">
          Select Colors
        </span>
        <div className="flex items-center gap-3">
          {product.colors.map((color, index) => {
            const isSelected = selectedColor === index;
            return (
              <button
                key={color.name}
                onClick={() => setSelectedColor(index)}
                style={{ backgroundColor: color.hex }}
                aria-label={`Select color ${color.name}`}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-offset-2 ring-theme-primary scale-105'
                    : 'opacity-85 hover:opacity-100 hover:scale-105'
                }`}
              >
                {isSelected && (
                  <FiCheck size={16} className="text-white" strokeWidth={3} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 sm:my-6 border-b border-theme-border" />

      {/* Choose Size */}
      <div>
        <span className="text-xs sm:text-sm text-theme-text-muted font-normal block mb-3">
          Choose Size
        </span>
        <div className="flex flex-wrap gap-2.5">
          {product.sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-theme-primary text-white shadow-xs'
                    : 'bg-theme-bg-light text-theme-text-muted hover:bg-coffee-100 hover:text-theme-primary'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 sm:my-6 border-b border-theme-border" />

      {/* Quantity & Add to Cart Row */}
      <div className="flex items-center gap-4 sm:gap-5">
        {/* Quantity Controls */}
        <div className="flex items-center justify-between bg-theme-bg-light rounded-full px-4 sm:px-5 py-3 sm:py-3.5 w-32 sm:w-36">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="text-theme-text-main hover:text-theme-primary p-1 cursor-pointer transition-colors"
            aria-label="Decrease quantity"
          >
            <FiMinus size={16} />
          </button>
          <span className="font-bold text-sm sm:text-base text-theme-text-main">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(maxLimit, q + 1))}
            disabled={quantity >= maxLimit}
            className={`p-1 transition-colors ${
              quantity >= maxLimit
                ? 'text-theme-text-muted/40 cursor-not-allowed'
                : 'text-theme-text-main hover:text-theme-primary cursor-pointer'
            }`}
            aria-label="Increase quantity"
          >
            <FiPlus size={16} />
          </button>
        </div>

        {/* Add to Bag CTA */}
        <AddToBagButton
          size="lg"
          className="flex-1 shadow-sm"
          onAdd={handleAddToBag}
        />
      </div>
    </div>
  );
};
