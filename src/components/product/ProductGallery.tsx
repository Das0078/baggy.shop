import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-3.5 sm:gap-4 md:gap-5 w-full">
      {/* Vertical Thumbnails Column */}
      <div className="flex sm:flex-col gap-2.5 sm:gap-3.5 flex-shrink-0 justify-start overflow-x-auto sm:overflow-visible no-scrollbar pb-1 sm:pb-0">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-[68px] sm:w-[78px] md:w-[92px] h-[68px] sm:h-[78px] md:h-[92px] rounded-[16px] sm:rounded-[18px] bg-theme-bg-card p-1.5 sm:p-2 flex items-center justify-center overflow-hidden transition-all cursor-pointer flex-shrink-0 ${
              selectedImage === index
                ? 'border-2 border-theme-primary shadow-xs'
                : 'border border-theme-border/70 opacity-70 hover:opacity-100 hover:border-theme-primary/40'
            }`}
          >
            <img
              src={img}
              alt={`${productName} thumbnail ${index + 1}`}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </button>
        ))}
      </div>

      {/* Big Main Image Container */}
      <div className="relative flex-1 w-full min-h-[340px] sm:min-h-[420px] md:min-h-[480px] lg:min-h-[530px] rounded-[20px] sm:rounded-[24px] bg-theme-bg-card flex items-center justify-center p-6 sm:p-10 overflow-hidden shadow-2xs">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedImage}
            src={images[selectedImage] || images[0]}
            alt={productName}
            initial={{ opacity: 0.3, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.3, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full max-h-[450px] md:max-h-[500px] object-contain mix-blend-multiply select-none"
          />
        </AnimatePresence>
      </div>
    </div>
  );
};
