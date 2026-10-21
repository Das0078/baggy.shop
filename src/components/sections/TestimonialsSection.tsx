import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';
import { testimonials } from '../../data/testimonials';
import { StarRating } from '../common/StarRating';
import { SectionHeader } from '../common/SectionHeader';

export const TestimonialsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row: Title on Left, Controls on Right */}
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <SectionHeader title="OUR HAPPY CUSTOMERS" align="left" />

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-2 sm:p-2.5 rounded-full border border-theme-border hover:border-theme-primary/50 text-theme-text-main hover:bg-theme-bg-light transition-all cursor-pointer active:scale-95"
              aria-label="Previous testimonials"
            >
              <FiArrowLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 sm:p-2.5 rounded-full border border-theme-border hover:border-theme-primary/50 text-theme-text-main hover:bg-theme-bg-light transition-all cursor-pointer active:scale-95"
              aria-label="Next testimonials"
            >
              <FiArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal Testimonials Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 snap-x snap-mandatory"
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="min-w-[300px] sm:min-w-[340px] md:min-w-[380px] max-w-[400px] flex-shrink-0 snap-start bg-white rounded-[20px] p-6 sm:p-7 border border-theme-border flex flex-col justify-between hover:shadow-sm transition-shadow"
            >
              <div>
                {/* 5-Star Rating */}
                <StarRating rating={t.rating} showScore={false} size={17} className="mb-3.5" />

                {/* Author Name + Green Checkmark Badge */}
                <div className="flex items-center gap-1.5 mb-2.5">
                  <h4 className="font-bold text-base sm:text-lg text-theme-text-main">
                    {t.name}
                  </h4>
                  {t.verified && (
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-theme-verified text-white">
                      <FiCheck size={11} strokeWidth={3.5} />
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-theme-text-muted text-sm sm:text-base leading-relaxed">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
