import React from 'react';

export const BrandMarquee: React.FC = () => {
  const brands = [
    {
      name: 'VERSACE',
      fontStyle: 'font-serif tracking-[0.25em] font-bold text-xl sm:text-2xl lg:text-3xl',
    },
    {
      name: 'ZARA',
      fontStyle: 'font-serif tracking-tight font-black text-2xl sm:text-3xl lg:text-4xl italic scale-y-110',
    },
    {
      name: 'GUCCI',
      fontStyle: 'font-serif tracking-[0.3em] font-bold text-xl sm:text-2xl lg:text-3xl',
    },
    {
      name: 'PRADA',
      fontStyle: 'font-serif tracking-[0.2em] font-black text-2xl sm:text-3xl lg:text-4xl',
    },
    {
      name: 'Calvin Klein',
      fontStyle: 'font-sans tracking-wide font-normal text-lg sm:text-xl lg:text-2xl lowercase capitalize',
    },
  ];

  // Repeat items for seamless, continuous infinite horizontal marquee
  const marqueeItems = [...brands, ...brands];

  return (
    <div className="bg-theme-primary text-white py-7 sm:py-9 border-y border-white/10 select-none overflow-hidden relative">
      {/* Edge Vignette / Gradient Mask for high-end luxury feel */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-theme-primary to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-theme-primary to-transparent z-10" />

      {/* Auto-scrolling Infinite Marquee Track */}
      <div className="animate-marquee flex items-center">
        {marqueeItems.map((brand, index) => (
          <div
            key={`${brand.name}-${index}`}
            className="flex items-center justify-center px-8 sm:px-12 md:px-16 flex-shrink-0 opacity-85 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <span className={`${brand.fontStyle} text-white whitespace-nowrap`}>
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
