import React, { useState } from 'react';
import { FiChevronUp, FiChevronDown, FiChevronRight, FiSliders, FiCheck, FiX } from 'react-icons/fi';

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  color: string;
  size: string;
  dressStyle: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onCloseMobile,
}) => {
  // Accordion collapse state
  const [openSections, setOpenSections] = useState({
    price: true,
    colors: true,
    size: true,
    dressStyle: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const categories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];

  const colorSwatches = [
    { name: 'Green', hex: '#00C12B' },
    { name: 'Red', hex: '#F50606' },
    { name: 'Yellow', hex: '#F5DD06' },
    { name: 'Orange', hex: '#F57906' },
    { name: 'Cyan', hex: '#06CAF5' },
    { name: 'Blue', hex: '#063AF5' },
    { name: 'Purple', hex: '#7D06F5' },
    { name: 'Pink', hex: '#F506A4' },
    { name: 'White', hex: '#FFFFFF', border: true },
    { name: 'Dark Coffee', hex: '#432818' },
  ];

  const sizeOptions = [
    'XX-Small',
    'X-Small',
    'Small',
    'Medium',
    'Large',
    'X-Large',
    'XX-Large',
    '3X-Large',
    '4X-Large',
  ];

  const dressStyles = ['Casual', 'Formal', 'Party', 'Gym'];

  const handleCategoryClick = (cat: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === cat ? '' : cat,
    });
  };

  const handleColorClick = (hex: string) => {
    onFilterChange({
      ...filters,
      color: filters.color === hex ? '' : hex,
    });
  };

  const handleSizeClick = (size: string) => {
    onFilterChange({
      ...filters,
      size: filters.size === size ? '' : size,
    });
  };

  const handleStyleClick = (style: string) => {
    onFilterChange({
      ...filters,
      dressStyle: filters.dressStyle === style ? '' : style,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      maxPrice: Number(e.target.value),
    });
  };

  return (
    <aside className="w-full bg-white border border-theme-border rounded-[20px] p-5 sm:p-6 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-theme-border">
        <div className="flex items-center gap-2">
          <h3 className="font-extrabold text-xl text-theme-text-main font-display">
            Filters
          </h3>
          <FiSliders size={18} className="text-theme-text-muted rotate-90" />
        </div>

        {/* Mobile close button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 text-theme-text-muted hover:text-theme-primary cursor-pointer"
            aria-label="Close filters"
          >
            <FiX size={20} />
          </button>
        )}
      </div>

      {/* Category Links */}
      <div className="py-4 space-y-2.5 border-b border-theme-border">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`w-full flex items-center justify-between py-1 text-sm transition-colors cursor-pointer text-left ${
              filters.category === cat
                ? 'font-bold text-theme-primary'
                : 'text-theme-text-muted hover:text-theme-primary'
            }`}
          >
            <span>{cat}</span>
            <FiChevronRight size={15} className="text-theme-text-muted/60" />
          </button>
        ))}
      </div>

      {/* Price Accordion */}
      <div className="py-4 border-b border-theme-border">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between py-1 font-bold text-base text-theme-text-main cursor-pointer"
        >
          <span>Price</span>
          {openSections.price ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
        </button>

        {openSections.price && (
          <div className="mt-4 px-1">
            {/* Visual Slider */}
            <input
              type="range"
              min="50"
              max="300"
              value={filters.maxPrice}
              onChange={handlePriceChange}
              className="w-full accent-theme-primary cursor-pointer h-1.5 bg-coffee-100 rounded-lg appearance-none"
            />

            <div className="flex items-center justify-between text-xs font-semibold text-theme-text-main mt-2">
              <span>${filters.minPrice}</span>
              <span>${filters.maxPrice}</span>
            </div>
          </div>
        )}
      </div>

      {/* Colors Accordion */}
      <div className="py-4 border-b border-theme-border">
        <button
          onClick={() => toggleSection('colors')}
          className="w-full flex items-center justify-between py-1 font-bold text-base text-theme-text-main cursor-pointer"
        >
          <span>Colors</span>
          {openSections.colors ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
        </button>

        {openSections.colors && (
          <div className="mt-4 grid grid-cols-5 gap-3 justify-items-center">
            {colorSwatches.map((swatch) => {
              const isSelected = filters.color === swatch.hex;
              return (
                <button
                  key={swatch.name}
                  onClick={() => handleColorClick(swatch.hex)}
                  style={{ backgroundColor: swatch.hex }}
                  aria-label={swatch.name}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform cursor-pointer relative ${
                    swatch.border ? 'border border-gray-300' : ''
                  } ${isSelected ? 'ring-2 ring-offset-2 ring-theme-primary scale-105' : 'hover:scale-105'}`}
                >
                  {isSelected && (
                    <FiCheck
                      size={14}
                      className={swatch.hex === '#FFFFFF' ? 'text-black' : 'text-white'}
                      strokeWidth={3}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Size Accordion */}
      <div className="py-4 border-b border-theme-border">
        <button
          onClick={() => toggleSection('size')}
          className="w-full flex items-center justify-between py-1 font-bold text-base text-theme-text-main cursor-pointer"
        >
          <span>Size</span>
          {openSections.size ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
        </button>

        {openSections.size && (
          <div className="mt-4 flex flex-wrap gap-2">
            {sizeOptions.map((size) => {
              const isSelected = filters.size === size;
              return (
                <button
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={`px-4 py-2 text-xs font-medium rounded-full transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-theme-primary text-white shadow-xs font-semibold'
                      : 'bg-theme-bg-light text-theme-text-muted hover:bg-coffee-100 hover:text-theme-primary'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Dress Style Accordion */}
      <div className="py-4 border-b border-theme-border">
        <button
          onClick={() => toggleSection('dressStyle')}
          className="w-full flex items-center justify-between py-1 font-bold text-base text-theme-text-main cursor-pointer"
        >
          <span>Dress Style</span>
          {openSections.dressStyle ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
        </button>

        {openSections.dressStyle && (
          <div className="mt-3 space-y-2">
            {dressStyles.map((style) => (
              <button
                key={style}
                onClick={() => handleStyleClick(style)}
                className={`w-full flex items-center justify-between py-1 text-sm transition-colors cursor-pointer text-left ${
                  filters.dressStyle === style
                    ? 'font-bold text-theme-primary'
                    : 'text-theme-text-muted hover:text-theme-primary'
                }`}
              >
                <span>{style}</span>
                <FiChevronRight size={15} className="text-theme-text-muted/60" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Apply Filter Button */}
      <div className="pt-6">
        <button
          onClick={() => onCloseMobile && onCloseMobile()}
          className="w-full bg-theme-primary text-white hover:bg-theme-primary-hover active:scale-98 transition-all font-semibold text-sm rounded-full py-3.5 shadow-sm cursor-pointer text-center"
        >
          Apply Filter
        </button>
      </div>
    </aside>
  );
};
