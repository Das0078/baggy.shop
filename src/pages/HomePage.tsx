import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { BrandMarquee } from '../components/sections/BrandMarquee';
import { ExclusiveClubSection } from '../components/sections/ExclusiveClubSection';
import { HomeDecorSection } from '../components/sections/HomeDecorSection';
import { ProductGridSection } from '../components/sections/ProductGridSection';
import { DressStyleSection } from '../components/sections/DressStyleSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { newArrivals, topSelling } from '../data/products';

export const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section with GSAP & Typewriter */}
      <HeroSection />

      {/* Luxury Brand Marquee */}
      <BrandMarquee />

      {/* Exclusive Club Showcase */}
      <ExclusiveClubSection />

      {/* Home Decors Coming Soon Showcase */}
      <HomeDecorSection />

      {/* New Arrivals Apple-style Lineup */}
      <ProductGridSection
        id="new-arrivals"
        title="NEW ARRIVALS"
        products={newArrivals}
        showDivider={true}
      />

      {/* Top Selling Apple-style Lineup */}
      <ProductGridSection
        id="top-selling"
        title="TOP SELLING"
        products={topSelling}
        showDivider={false}
      />

      {/* Browse By Dress Style Section */}
      <DressStyleSection />

      {/* Immersive GSAP ScrollTrigger Experience (Clothes, Furniture, Jewellery) */}
      <ExperienceSection />

      {/* Happy Customers Reviews */}
      <TestimonialsSection />
    </>
  );
};
