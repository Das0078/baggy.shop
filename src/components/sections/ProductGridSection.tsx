import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Product } from '../../types';
import { SectionHeader } from '../common/SectionHeader';
import { ProductCard } from '../ui/ProductCard';
import { Button } from '../common/Button';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ProductGridSectionProps {
  id?: string;
  title: string;
  products: Product[];
  showDivider?: boolean;
}

export const ProductGridSection: React.FC<ProductGridSectionProps> = ({
  id,
  title,
  products,
  showDivider = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [dynamicPadding, setDynamicPadding] = useState<number | null>(null);

  // Measure title's exact left offset on the page to align first card perfectly
  const updateOffset = useCallback(() => {
    if (titleContainerRef.current) {
      const rect = titleContainerRef.current.getBoundingClientRect();
      if (rect.left > 0) {
        setDynamicPadding(rect.left);
      }
    }
  }, []);

  // Check scroll position to enable/disable arrow buttons
  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  }, []);

  useEffect(() => {
    updateOffset();
    checkScroll();

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScroll, { passive: true });
    }
    window.addEventListener('resize', updateOffset);
    window.addEventListener('resize', checkScroll);

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', updateOffset);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, updateOffset]);

  // Scroll by card width + gap (~330px)
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 330;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Mouse Drag to Scroll (Apple-style smooth grab interaction)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section id={id} className="product-grid-section font-jakarta font-sans py-12 md:py-18 overflow-hidden select-none w-full">
      {/* Top Header Row with Title and Explore link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div ref={titleContainerRef}>
            <SectionHeader title={title} align="left" className="font-jakarta tracking-tight" />
          </div>

          <a
            href="#compare"
            className="text-xs sm:text-sm font-semibold text-theme-primary hover:text-coffee-600 transition-colors flex items-center gap-1 group self-start sm:self-auto font-jakarta"
          >
            <span>Explore all {title.toLowerCase()}</span>
            <FiChevronRight
              size={15}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </a>
        </div>
      </div>

      {/* FULL-WIDTH Full-Bleed Apple-style Scrollable Cards Lineup */}
      {/* Notice: No max-w-7xl constraint here so cards flow all the way to screen edges on scroll! */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={
            dynamicPadding !== null
              ? {
                  paddingLeft: `${dynamicPadding}px`,
                  paddingRight: `${dynamicPadding}px`,
                }
              : undefined
          }
          className={`full-bleed-carousel flex gap-5 sm:gap-7 overflow-x-auto no-scrollbar scroll-smooth w-full pb-6 pt-2 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom Controls Row: Apple-style Arrows & Center View All Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Subtle spacer for centering on desktop */}
          <div className="hidden sm:block w-24" />

          {/* Centered View All Button */}
          <Button
            variant="outline"
            size="md"
            className="w-full sm:w-auto min-w-[218px] py-3.5 text-sm sm:text-base font-semibold rounded-full shadow-2xs font-jakarta"
          >
            View All
          </Button>

          {/* Bottom Apple-style Navigation Arrows */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="w-9 h-9 rounded-full bg-[#f2f0f1] hover:bg-coffee-100 disabled:opacity-30 disabled:hover:bg-[#f2f0f1] disabled:cursor-not-allowed flex items-center justify-center text-theme-text-main transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <FiChevronLeft size={19} />
            </button>

            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="w-9 h-9 rounded-full bg-[#f2f0f1] hover:bg-coffee-100 disabled:opacity-30 disabled:hover:bg-[#f2f0f1] disabled:cursor-not-allowed flex items-center justify-center text-theme-text-main transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <FiChevronRight size={19} />
            </button>
          </div>

        </div>

        {/* Section Divider */}
        {showDivider && (
          <div className="mt-14 md:mt-18 border-b border-theme-border" />
        )}
      </div>
    </section>
  );
};
