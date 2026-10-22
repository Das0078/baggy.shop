import React, { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiCheck, FiPause, FiPlay } from 'react-icons/fi';
import { testimonials } from '../../data/testimonials';
import { StarRating } from '../common/StarRating';
import { SectionHeader } from '../common/SectionHeader';

// Repeat 4x for continuous, seamless infinite marquee looping across all viewport widths
const marqueeTestimonials = [
  ...testimonials,
  ...testimonials,
  ...testimonials,
  ...testimonials,
];

export const TestimonialsSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'normal' | 'reverse'>('normal');

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-10">
        {/* Header Row: Title on Left, Controls on Right */}
        <div className="flex items-center justify-between">
          <SectionHeader title="OUR HAPPY CUSTOMERS" align="left" />

          {/* Marquee Navigation & Autoplay Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                setDirection('reverse');
                setIsPaused(false);
              }}
              className={`p-2 sm:p-2.5 rounded-full border transition-all cursor-pointer active:scale-95 ${
                direction === 'reverse' && !isPaused
                  ? 'border-theme-primary bg-theme-primary text-white shadow-sm'
                  : 'border-theme-border hover:border-theme-primary/50 text-theme-text-main hover:bg-theme-bg-light'
              }`}
              aria-label="Scroll testimonials left"
              title="Scroll left"
            >
              <FiArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className={`p-2 sm:p-2.5 rounded-full border transition-all cursor-pointer active:scale-95 ${
                isPaused
                  ? 'border-theme-primary bg-theme-primary text-white shadow-sm'
                  : 'border-theme-border hover:border-theme-primary/50 text-theme-text-main hover:bg-theme-bg-light'
              }`}
              aria-label={isPaused ? 'Resume auto scroll' : 'Pause auto scroll'}
              title={isPaused ? 'Resume auto scroll' : 'Pause auto scroll'}
            >
              {isPaused ? <FiPlay size={16} /> : <FiPause size={16} />}
            </button>
            <button
              type="button"
              onClick={() => {
                setDirection('normal');
                setIsPaused(false);
              }}
              className={`p-2 sm:p-2.5 rounded-full border transition-all cursor-pointer active:scale-95 ${
                direction === 'normal' && !isPaused
                  ? 'border-theme-primary bg-theme-primary text-white shadow-sm'
                  : 'border-theme-border hover:border-theme-primary/50 text-theme-text-main hover:bg-theme-bg-light'
              }`}
              aria-label="Scroll testimonials right"
              title="Scroll right"
            >
              <FiArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Auto-scrolling Horizontal Marquee Track with Soft Gradient Vignettes */}
      <div className="relative w-full overflow-hidden select-none">
        {/* Left & Right Soft Fade Vignettes for high-end aesthetic */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* Continuous Horizontal Marquee Row */}
        <div
          className="animate-testimonials-marquee flex items-stretch gap-5 sm:gap-6 py-3"
          style={{
            animationDirection: direction,
            animationPlayState: isPaused ? 'paused' : undefined,
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {marqueeTestimonials.map((t, index) => (
            <div
              key={`${t.id}-${index}`}
              className="w-[300px] sm:w-[350px] md:w-[380px] flex-shrink-0 bg-white rounded-[20px] p-6 sm:p-7 border border-theme-border flex flex-col justify-between hover:shadow-md hover:border-theme-primary/30 hover:-translate-y-1 transition-all duration-300 select-text cursor-default"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
