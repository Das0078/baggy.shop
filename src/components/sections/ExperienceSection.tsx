import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseItem {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
}

interface FrameData {
  id: string;
  category: string;
  titleLine1: string;
  titleAccent: string;
  titleLine2: string;
  subtitleLines: string[];
  theme: 'dark' | 'light';
  solidBg: string;
  accentColor: string;
  bgImage: string;
  imgPosition: string;
  cards: ShowcaseItem[];
  ctaText: string;
  targetUrl: string;
}

const FRAMES: FrameData[] = [
  {
    id: 'frame-clothes',
    category: 'baGGy Couture',
    titleLine1: 'TAILORED',
    titleAccent: 'DEFINES',
    titleLine2: 'YOU',
    subtitleLines: [
      'Wool and Cashmere',
      'Cut and Silhouette',
      'Thread and Texture',
      'Bold and Timeless',
      'Style and Identity',
    ],
    theme: 'dark',
    solidBg: '#2b1810', // Dark Coffee
    accentColor: '#dfc2ad',
    bgImage: '/images/experience/exp-clothes-coffee.jpg', // TOTALLY NEW IMAGE
    imgPosition: 'object-[center_top]',
    cards: [
      {
        image: '/images/exclusive-club/riding-jacket.jpg',
        badge: 'SIGNATURE COAT',
        title: 'Heritage Wool',
        subtitle: 'Italian Double-Faced Tailoring',
      },
      {
        image: '/images/exclusive-club/suit-for-men.jpg',
        badge: 'BESPOKE BLAZER',
        title: 'Modern Cut',
        subtitle: 'Structured Espresso Weave',
      },
      {
        image: '/images/exclusive-club/winter-jacket.jpg',
        badge: 'THERMAL LUXE',
        title: 'Parka Edition',
        subtitle: 'Cashmere-Lined Warmth',
      },
    ],
    ctaText: 'Explore Couture',
    targetUrl: '/shop',
  },
  {
    id: 'frame-furniture',
    category: 'baGGy Living',
    titleLine1: 'SPACES',
    titleAccent: 'ELEVATES',
    titleLine2: 'YOU',
    subtitleLines: [
      'Form and Function',
      'Curve and Silhouette',
      'Travertine and Boucle',
      'Quiet Luxury',
      'Modern Sanctuary',
    ],
    theme: 'light',
    solidBg: '#f5f5f7', // Secondary bg white/grey
    accentColor: '#26150b',
    bgImage: '/images/experience/exp-furniture-grey.jpg', // TOTALLY NEW IMAGE
    imgPosition: 'object-center',
    cards: [
      {
        image: '/images/home-decor/sofa.png',
        badge: 'CURVED LOUNGE',
        title: 'Boucle Sofa',
        subtitle: 'Sculptural Organic Silhouette',
      },
      {
        image: '/images/home-decor/table.png',
        badge: 'TRAVERTINE STONE',
        title: 'Low Plinth Table',
        subtitle: 'Hand-Finished Natural Marble',
      },
      {
        image: '/images/home-decor/chair.png',
        badge: 'SCULPTURAL CAST',
        title: 'Accent Chair',
        subtitle: 'Matte Charcoal Architecture',
      },
    ],
    ctaText: 'Explore Living',
    targetUrl: '/shop',
  },
  {
    id: 'frame-jewellery',
    category: 'baGGy Atelier',
    titleLine1: 'BRILLIANCE',
    titleAccent: 'ENCHANTS',
    titleLine2: 'YOU',
    subtitleLines: [
      'Gold and Emerald',
      'Cut and Clarity',
      'Handcrafted Legacy',
      'Spark and Fire',
      'Pure and Radiant',
    ],
    theme: 'dark',
    solidBg: '#0d1b2a', // Royal Matte Blue
    accentColor: '#e6c887',
    bgImage: '/images/experience/exp-jewellery-blue.jpg', // TOTALLY NEW IMAGE WITH AMPLE HEADROOM
    imgPosition: 'object-[center_top]',
    cards: [
      {
        image: '/images/jewellery/jewel-necklace.jpg',
        badge: 'HIGH ATELIER',
        title: 'Emerald Collar',
        subtitle: 'Colombian Gems & Baguettes',
      },
      {
        image: '/images/jewellery/jewel-ring.jpg',
        badge: 'SOLITAIRE HALO',
        title: 'Cocktail Ring',
        subtitle: '18K Gold & Pavé Diamonds',
      },
      {
        image: '/images/jewellery/jewel-earrings.jpg',
        badge: 'CHANDELIER DROPS',
        title: 'Teardrop Earrings',
        subtitle: 'Articulated Platinum Drops',
      },
    ],
    ctaText: 'Explore Atelier',
    targetUrl: '/shop',
  },
];

export const ExperienceSection: React.FC = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const workItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ghostItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Smooth scroll provider
    let lenis: Lenis | null = null;
    try {
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.08,
        wheelMultiplier: 0.85,
      });
      lenis.on('scroll', ScrollTrigger.update);
    } catch {
      // Fallback cleanly if Lenis cannot initialize
    }

    const workItems = workItemsRef.current.filter(Boolean) as HTMLDivElement[];
    const ghostItems = ghostItemsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!sectionRef.current || !workItems.length || !ghostItems.length) return;

    // Use gsap.context for complete memory safety and clean scoping
    const ctx = gsap.context(() => {
      // Initial state: hide items with clip-path wipe from bottom
      workItems.forEach((item, index) => {
        gsap.set(item, {
          clipPath: index === 0 ? 'inset(0% 0 0% 0)' : 'inset(100% 0 0% 0)',
        });
      });

      // Animate each frame based on its ghost trigger
      workItems.forEach((element, index) => {
        const lines = element.querySelectorAll('[data-line]');
        const workImage = element.querySelector('[data-work="image"]');
        const cardContainers = element.querySelectorAll('[data-work="card"]');
        const overlay = element.querySelectorAll('[data-work="item-overlay"]');

        // Anchor background image transform-origin to top so heads are NEVER cut off
        if (workImage) {
          gsap.set(workImage, {
            transformOrigin: 'center top',
            scale: 1.12,
            yPercent: 0,
          });
        }

        const ghostTrigger = ghostItems[index];

        // 1. ClipPath curtain reveal (for frames 1 & 2 wiping over previous)
        if (index > 0) {
          gsap.to(element, {
            clipPath: 'inset(0% 0 0 0)',
            ease: 'none',
            scrollTrigger: {
              trigger: ghostTrigger,
              scrub: true,
              start: 'top bottom',
              end: '+75vh top',
            },
          });
        }

        // 2. Background image subtle parallax zoom (anchored to top)
        if (workImage) {
          gsap.to(workImage, {
            scale: 1.02,
            ease: 'none',
            scrollTrigger: {
              trigger: ghostTrigger,
              scrub: true,
              start: 'top bottom',
              end: '+75vh top',
            },
          });

          // Soft ambient blur and slight fade as user scrolls deep into the frame
          gsap.to(workImage, {
            filter: 'blur(6px)',
            opacity: 0.42,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: ghostTrigger,
              scrub: true,
              start: '0 top',
              end: '38% top',
            },
          });
        }

        // 3. Editorial typography line reveal with subtle tilt & rotation
        if (lines.length > 0) {
          gsap.fromTo(
            lines,
            {
              yPercent: 125,
              rotate: 2.5,
              opacity: 0,
            },
            {
              yPercent: 0,
              rotate: 0,
              opacity: 1,
              ease: 'power3.out',
              duration: 1.1,
              stagger: 0.12,
              scrollTrigger: {
                trigger: ghostTrigger,
                start: 'top 75%',
                toggleActions: 'play reverse restart reverse',
              },
            }
          );
        }

        // 4. Floating showcase cards sliding horizontally across the frame
        if (cardContainers.length > 0) {
          gsap.fromTo(
            cardContainers,
            {
              x: index % 2 === 0 ? '80vw' : '-80vw',
              opacity: 0.2,
            },
            {
              x: '0vw',
              opacity: 1,
              ease: 'power2.out',
              stagger: 0.08,
              scrollTrigger: {
                trigger: ghostTrigger,
                scrub: 1.2,
                start: '0 top',
                end: '65% top',
              },
            }
          );
        }

        // 5. Final exit transition before next frame wipes over
        const stFinal = {
          trigger: ghostTrigger,
          scrub: true,
          start: '105% bottom',
          toggleActions: 'play reverse play reverse',
        };

        if (overlay.length > 0) {
          gsap.fromTo(
            overlay,
            { opacity: 0 },
            {
              opacity: 0.75,
              scrollTrigger: stFinal,
            }
          );
        }

        if (cardContainers.length > 0) {
          gsap.to(cardContainers, {
            yPercent: 10,
            scrollTrigger: stFinal,
          });
        }

        gsap.to(element, {
          filter: 'blur(1.5px)',
          scrollTrigger: stFinal,
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      lenis?.destroy();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="baGGy Immersive Scroll Experience"
      className="relative w-full bg-black select-none"
    >
      {/* Pinned Viewport Container (Sticky 100vh) */}
      <div className="sticky top-0 w-full h-screen overflow-hidden z-10">
        <div className="relative w-full h-full">
          {FRAMES.map((frame, frameIndex) => {
            const isDark = frame.theme === 'dark';

            return (
              <div
                key={frame.id}
                ref={(el) => {
                  workItemsRef.current[frameIndex] = el;
                }}
                style={{ backgroundColor: frame.solidBg }}
                className="absolute inset-0 w-full h-full flex items-stretch overflow-hidden will-change-[clip-path]"
              >
                {/* Background Hero Image with Top Anchoring & Subtle Parallax */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={frame.bgImage}
                    alt={frame.category}
                    loading={frameIndex === 0 ? 'eager' : 'lazy'}
                    data-work="image"
                    className={`w-full h-full object-cover ${frame.imgPosition} pointer-events-none will-change-transform opacity-80`}
                  />
                  {/* Subtle radial and linear gradient vignette for perfect contrast */}
                  <div
                    className={`absolute inset-0 pointer-events-none ${
                      isDark
                        ? 'bg-gradient-to-t from-black/85 via-black/30 to-black/50'
                        : 'bg-gradient-to-t from-[#f5f5f7]/90 via-[#f5f5f7]/25 to-[#f5f5f7]/60'
                    }`}
                  />
                </div>

                {/* Main Foreground Content Layer */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between p-5 sm:p-8 md:p-12 lg:p-14">
                  {/* Top Bar: Brand Identifier and Quick Action */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase px-3.5 py-1 rounded-full border backdrop-blur-sm ${
                          isDark
                            ? 'text-white/85 border-white/20 bg-white/10'
                            : 'text-[#26150b]/85 border-black/15 bg-black/5'
                        }`}
                      >
                        {frame.category}
                      </span>
                      <span
                        className={`hidden sm:inline-block text-xs font-mono tracking-widest ${
                          isDark ? 'text-white/45' : 'text-black/45'
                        }`}
                      >
                        0{frameIndex + 1} / 03
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate(frame.targetUrl)}
                      className={`group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wide uppercase px-4 sm:px-5 py-2 rounded-full transition-all duration-300 cursor-pointer active:scale-95 shadow-md ${
                        isDark
                          ? 'bg-white text-black hover:bg-neutral-200'
                          : 'bg-[#26150b] text-white hover:bg-[#432818]'
                      }`}
                    >
                      <span>{frame.ctaText}</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                  {/* Middle: Floating Showcase Cards (Sliding in via GSAP) */}
                  <div className="w-full my-auto py-3">
                    <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
                      {frame.cards.map((card) => (
                        <div
                          key={card.title}
                          data-work="card"
                          onClick={() => navigate(frame.targetUrl)}
                          className={`relative flex-1 aspect-[16/10] sm:aspect-[16/9] min-w-[200px] sm:min-w-[240px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group shadow-2xl transition-all duration-500 will-change-transform ${
                            isDark
                              ? 'bg-white/5 border border-white/15 hover:border-white/40'
                              : 'bg-black/5 border border-black/10 hover:border-black/30'
                          }`}
                        >
                          {/* Card Image */}
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                          />

                          {/* Soft bottom gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

                          {/* Card Text Content */}
                          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 text-white flex flex-col justify-end">
                            <span
                              style={{ color: frame.accentColor }}
                              className="text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-0.5"
                            >
                              {card.badge}
                            </span>
                            <h4 className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-white leading-tight">
                              {card.title}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-white/70 font-normal line-clamp-1 mt-0.5">
                              {card.subtitle}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Editorial Typography Title on Left, Subtitles on Right */}
                  <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 border-t border-white/10">
                    {/* Big Bold Headline with Masked Line Wrappers */}
                    <div className="flex flex-col">
                      <div className="overflow-hidden">
                        <h3
                          data-line="true"
                          className={`font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight leading-[0.92] uppercase will-change-transform ${
                            isDark ? 'text-white' : 'text-[#1d1d1f]'
                          }`}
                        >
                          {frame.titleLine1}
                        </h3>
                      </div>
                      <div className="overflow-hidden">
                        <h3
                          data-line="true"
                          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight leading-[0.92] uppercase will-change-transform"
                        >
                          <span style={{ color: frame.accentColor }}>
                            {frame.titleAccent}&nbsp;
                          </span>
                          <span className={isDark ? 'text-white' : 'text-[#1d1d1f]'}>
                            {frame.titleLine2}
                          </span>
                        </h3>
                      </div>
                    </div>

                    {/* Poetic / Spec Subtitle Lines */}
                    <div className="flex flex-col gap-1 md:text-right">
                      {frame.subtitleLines.map((line) => (
                        <div key={line} className="overflow-hidden">
                          <p
                            data-line="true"
                            className={`text-xs sm:text-sm font-mono tracking-widest uppercase will-change-transform ${
                              isDark ? 'text-white/60' : 'text-black/60'
                            }`}
                          >
                            {line}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Transition Dimming Overlay */}
                <div
                  data-work="item-overlay"
                  className="absolute inset-0 pointer-events-none bg-black transition-opacity duration-300 opacity-0"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Ghost Scroll Track (Provides 3 full scroll frames of scrub distance) */}
      <div className="relative w-full pointer-events-none">
        <div
          ref={(el) => {
            ghostItemsRef.current[0] = el;
          }}
          className="h-[220vh] w-full"
        />
        <div
          ref={(el) => {
            ghostItemsRef.current[1] = el;
          }}
          className="h-[220vh] w-full"
        />
        <div
          ref={(el) => {
            ghostItemsRef.current[2] = el;
          }}
          className="h-[220vh] w-full"
        />
      </div>
    </section>
  );
};
