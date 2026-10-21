import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Keyboard, A11y } from 'swiper/modules';
import { ChevronRight, Pause, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import Swiper core styles
import 'swiper/css';
import 'swiper/css/autoplay';

interface SlideData {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  theme: 'light' | 'dark';
  solidBg: string;
  image: string;
  alt: string;
  targetUrl: string;
  primaryBtnClass: string;
  secondaryLinkClass: string;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 'baggy-clothes',
    category: 'baGGy Couture',
    title: 'baGGy Apparel',
    subtitle: 'Find clothes that match your style.',
    primaryCta: 'Shop Collection',
    secondaryCta: 'New Arrivals',
    theme: 'dark',
    solidBg: '#2b1810', // Rich dark coffee backup
    image: '/images/hero/slide-clothes-coffee.jpg',
    alt: 'baGGy high fashion luxury collection models posing in tailored coats and designer knitwear against deep coffee backdrop',
    targetUrl: '/shop',
    primaryBtnClass:
      'bg-[#dfc2ad] hover:bg-[#eddcd0] active:bg-[#cd9f82] text-[#26150b] font-medium shadow-md hover:shadow-lg',
    secondaryLinkClass:
      'text-[#dfc2ad] hover:text-[#f6f0ea]',
  },
  {
    id: 'baggy-furniture',
    category: 'baGGy Living',
    title: 'Modern Living',
    subtitle: 'Architectural furniture for elevated spaces.',
    primaryCta: 'Explore Living',
    secondaryCta: 'View Pieces',
    theme: 'light',
    solidBg: '#f5f5f7', // Secondary bg white/grey backup
    image: '/images/hero/slide-furniture-grey.jpg',
    alt: 'baGGy modern architectural curved boucle lounge sofa and marble table in minimalist studio light',
    targetUrl: '/shop',
    primaryBtnClass:
      'bg-[#26150b] hover:bg-[#432818] active:bg-[#1a0e07] text-white font-medium shadow-md hover:shadow-lg',
    secondaryLinkClass:
      'text-[#26150b] hover:text-[#75452f]',
  },
  {
    id: 'baggy-jewellery',
    category: 'baGGy Atelier',
    title: 'Fine Jewellery',
    subtitle: 'Handcrafted brilliance. Pure timeless luxury.',
    primaryCta: 'Discover Jewels',
    secondaryCta: 'View Atelier',
    theme: 'dark',
    solidBg: '#0d1b2a', // Royal matte blue backup
    image: '/images/hero/slide-jewellery-blue.jpg',
    alt: 'baGGy high jewellery model adorned in emerald and diamond handcrafted necklace and fine rings against royal matte blue',
    targetUrl: '/shop',
    primaryBtnClass:
      'bg-[#e6c887] hover:bg-[#f3dc9f] active:bg-[#d4af37] text-[#0d1b2a] font-medium shadow-md hover:shadow-lg',
    secondaryLinkClass:
      'text-[#e6c887] hover:text-[#fff2cc]',
  },
];

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Preload slide images for flicker-free transitions
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const toggleAutoplay = useCallback(() => {
    if (!swiperRef.current) return;
    if (isPlaying) {
      swiperRef.current.autoplay.stop();
      setIsPlaying(false);
    } else {
      swiperRef.current.autoplay.start();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const goToSlide = useCallback((index: number) => {
    if (!swiperRef.current) return;
    swiperRef.current.slideToLoop(index);
  }, []);

  const handleNavigation = (url: string) => {
    if (url.startsWith('#')) {
      const el = document.querySelector(url);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      navigate('/shop');
    } else {
      navigate(url);
    }
  };

  const handleCtaClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    handleNavigation(url);
  };

  const handleCardClick = (url: string) => {
    handleNavigation(url);
  };

  return (
    <section
      aria-label="baGGy Featured Collections Carousel"
      className="relative w-full overflow-hidden bg-white pt-3 pb-8 sm:pt-6 sm:pb-12 select-none"
    >
      <div className="w-full">
        {/* Main Swiper Carousel Container */}
        <Swiper
          modules={[Autoplay, Keyboard, A11y]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          loop={true}
          centeredSlides={true}
          slidesPerView="auto"
          spaceBetween={16}
          speed={850}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          keyboard={{
            enabled: true,
          }}
          grabCursor={true}
          className="w-full !overflow-visible !px-0"
          breakpoints={{
            640: {
              spaceBetween: 20,
            },
            1024: {
              spaceBetween: 28,
            },
          }}
        >
          {HERO_SLIDES.map((slide, index) => {
            const isDark = slide.theme === 'dark';

            return (
              <SwiperSlide
                key={slide.id}
                className="!w-[92vw] sm:!w-[88vw] lg:!w-[82vw] max-w-[1258px] transition-all duration-500 ease-out"
              >
                {({ isActive }) => (
                  <div
                    onClick={() => handleCardClick(slide.targetUrl)}
                    style={{ backgroundColor: slide.solidBg }}
                    className={`relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[1.85/1] max-h-[680px] rounded-[24px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden cursor-pointer transition-all duration-700 ease-out ${
                      isActive
                        ? 'opacity-100 scale-100 shadow-xl sm:shadow-2xl'
                        : 'opacity-70 sm:opacity-80 scale-[0.985] hover:opacity-90'
                    }`}
                  >
                    {/* Background Hero Graphic with Solid Color Fallback */}
                    <div className="absolute inset-0 w-full h-full">
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Subtle top ambient gradient for superior text contrast */}
                    <div
                      className={`absolute top-0 inset-x-0 h-40 sm:h-52 pointer-events-none bg-gradient-to-b ${
                        isDark
                          ? 'from-black/60 via-black/25 to-transparent'
                          : 'from-white/60 via-white/20 to-transparent'
                      }`}
                    />

                    {/* Subtle border outline for ultra-crisp edges */}
                    <div
                      className={`absolute inset-0 rounded-[24px] sm:rounded-[32px] md:rounded-[36px] pointer-events-none ring-1 ${
                        isDark ? 'ring-white/10' : 'ring-black/5'
                      }`}
                    />

                    {/* Top Content Bar: Brand Category, Headline, Subtitle, and CTAs */}
                    <div className="absolute top-0 inset-x-0 p-5 sm:p-8 md:p-11 lg:p-12 flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6 z-10 pointer-events-none">
                      {/* Left: Brand Tagline, Headline & Subtitle */}
                      <div className="pointer-events-auto">
                        <span
                          className={`inline-block text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-1 ${
                            isDark ? 'text-white/70' : 'text-black/60'
                          }`}
                        >
                          {slide.category}
                        </span>
                        <h2
                          className={`text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold tracking-tight leading-[1.08] font-display ${
                            isDark ? 'text-white' : 'text-[#1d1d1f]'
                          }`}
                        >
                          {slide.title}
                        </h2>
                        <p
                          className={`text-sm sm:text-lg md:text-xl lg:text-2xl font-normal mt-1 sm:mt-1.5 ${
                            isDark ? 'text-white/85' : 'text-[#424245]'
                          }`}
                        >
                          {slide.subtitle}
                        </p>
                      </div>

                      {/* Right: baGGy Style CTAs */}
                      <div className="pointer-events-auto flex items-center gap-3 sm:gap-4 md:gap-5 self-start sm:self-auto sm:mt-2">
                        <button
                          type="button"
                          onClick={(e) => handleCtaClick(e, slide.targetUrl)}
                          className={`inline-flex items-center justify-center text-[13px] sm:text-[14px] md:text-[15px] px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-200 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${slide.primaryBtnClass}`}
                        >
                          {slide.primaryCta}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleCtaClick(e, slide.targetUrl)}
                          className={`group inline-flex items-center gap-1 text-[13px] sm:text-[14px] md:text-[15px] font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 rounded-full py-1 ${slide.secondaryLinkClass}`}
                        >
                          <span className="group-hover:underline">{slide.secondaryCta}</span>
                          <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Carousel Bottom Controls: Pagination Pill + Play/Pause Button */}
        <div className="mt-5 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4">
          {/* Pagination Pill */}
          <div
            role="tablist"
            aria-label="Carousel slide controls"
            className="flex items-center gap-2 sm:gap-2.5 bg-[#e8e8ed] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
          >
            {HERO_SLIDES.map((slide, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-400 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26150b] ${
                    isActive
                      ? 'w-7 sm:w-9 bg-[#26150b]'
                      : 'w-2 bg-[#86868b] hover:bg-[#26150b] hover:scale-110 opacity-70 hover:opacity-100'
                  }`}
                />
              );
            })}
          </div>

          {/* Autoplay Play/Pause Button */}
          <button
            type="button"
            onClick={toggleAutoplay}
            aria-label={isPlaying ? 'Pause carousel autoplay' : 'Start carousel autoplay'}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#e8e8ed] hover:bg-[#dcdce2] active:bg-[#d0d0d7] active:scale-95 flex items-center justify-center text-[#26150b] transition-all duration-200 cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26150b]"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current stroke-none" />
            ) : (
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current stroke-none ml-0.5" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
