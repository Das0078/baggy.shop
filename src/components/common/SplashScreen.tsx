import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

// Critical home page assets that must be fully cached before the splash can dismiss
const CRITICAL_HOME_ASSETS = [
  '/images/hero/hero-models.png',
  '/images/dress-style/casual.png',
  '/images/dress-style/formal.png',
  '/images/dress-style/party.png',
  '/images/dress-style/gym.png',
  '/images/products/onelife-main.png',
  '/images/products/tshirt-tape.png',
  '/images/products/skinny-jeans.png',
  '/images/products/checkered-shirt.png',
  '/images/products/sleeve-striped.png',
  '/images/products/vertical-striped.png',
  '/images/products/courage-tshirt.png',
  '/images/exclusive-club/sunglass-45vr-large.jpg',
  '/images/exclusive-club/riding-jacket.jpg',
  '/images/home-decor/sofa.png',
];

export const SplashScreen: React.FC = () => {
  const [isActive, setIsActive] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [statusText, setStatusText] = useState('LOADING ASSETS');

  // References to separate background and foreground layers
  const rootRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const vibeContainerRef = useRef<HTMLDivElement>(null);
  const brandContainerRef = useRef<HTMLDivElement>(null);
  const brandTextRef = useRef<HTMLSpanElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);

  // Asset tracking state
  const rawProgressRef = useRef(0);
  const displayProgressRef = useRef(0);
  const isAssetsReadyRef = useRef(false);
  const isAnimationTriggeredRef = useRef(false);
  const hasStartedBrandPhaseRef = useRef(false);

  // Register global flag
  if (typeof window !== 'undefined') {
    window.__splashActive = isActive;
  }

  // Preload an image safely with promise
  const preloadImage = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      if (img.complete) {
        resolve(true);
      } else {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false); // resolve anyway to avoid hanging
      }
    });
  };

  // Exit & Morph FLIP transition
  const triggerExitMorph = useCallback(() => {
    if (isAnimationTriggeredRef.current) return;
    isAnimationTriggeredRef.current = true;

    const navLogo = document.getElementById('navbar-brand-logo');
    const brandText = brandTextRef.current;
    const bg = backgroundRef.current;
    const root = rootRef.current;
    const progressEl = progressContainerRef.current;

    if (!brandText || !root || !bg) {
      if (typeof window !== 'undefined') {
        window.__splashActive = false;
        window.dispatchEvent(new CustomEvent('splash-complete'));
      }
      setIsActive(false);
      return;
    }

    // Step 1: Quick fade out of the progress bar
    gsap.to(progressEl, {
      opacity: 0,
      y: 12,
      duration: 0.2,
      ease: 'power2.in',
    });

    // Step 2: Measure FLIP coordinates
    if (navLogo) {
      const targetRect = navLogo.getBoundingClientRect();
      const sourceRect = brandText.getBoundingClientRect();

      // Precise scales and translation deltas
      const deltaX = targetRect.left - sourceRect.left;
      const deltaY = targetRect.top - sourceRect.top;
      const scaleX = targetRect.width / sourceRect.width;
      const scaleY = targetRect.height / sourceRect.height;

      // Set anchor point to top-left for mathematical alignment
      gsap.set(brandText, { transformOrigin: '0% 0%' });

      const tl = gsap.timeline({
        onComplete: () => {
          // Hand off to the real navbar logo
          navLogo.style.opacity = '1';
          document.body.style.overflow = '';
          if (typeof window !== 'undefined') {
            window.__splashActive = false;
            window.__splashCompleted = true;
            window.dispatchEvent(new CustomEvent('splash-complete'));
          }
          setIsActive(false);
        },
      });

      // Cinematic morph: float & glide to top-left navbar logo position
      tl.to(
        brandText,
        {
          x: deltaX,
          y: deltaY,
          scaleX: scaleX,
          scaleY: scaleY,
          color: '#432818', // smoothly shifts from white to brand dark coffee
          duration: 0.85,
          ease: 'power3.inOut',
        },
        0.05
      );

      // Simultaneously dissolve the dark coffee background layer into the loaded home screen
      // (brandText remains in foreground and does NOT get faded out by the background opacity!)
      tl.to(
        bg,
        {
          opacity: 0,
          duration: 0.75,
          ease: 'power2.inOut',
        },
        0.1
      );
    } else {
      // Graceful fallback if navbar logo is somehow missing
      gsap.to(bg, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          document.body.style.overflow = '';
          if (typeof window !== 'undefined') {
            window.__splashActive = false;
            window.__splashCompleted = true;
            window.dispatchEvent(new CustomEvent('splash-complete'));
          }
          setIsActive(false);
        },
      });
    }
  }, []);

  // Main preloading and kinetic sequence
  useEffect(() => {
    // Lock body scrolling during splash screen
    document.body.style.overflow = 'hidden';

    // Hide real navbar logo while splash is orchestrating
    const navLogo = document.getElementById('navbar-brand-logo');
    if (navLogo) {
      navLogo.style.opacity = '0';
    }

    // 1. Kick off Parallel Asset Loading
    let loadedCount = 0;
    const totalAssets = CRITICAL_HOME_ASSETS.length + 2; // +1 fonts, +1 window/DOM

    const onItemLoaded = () => {
      loadedCount++;
      const currentPct = Math.round((loadedCount / totalAssets) * 100);
      rawProgressRef.current = currentPct;
      if (loadedCount >= totalAssets) {
        isAssetsReadyRef.current = true;
      }
    };

    // Preload all critical images
    CRITICAL_HOME_ASSETS.forEach((src) => {
      preloadImage(src).then(onItemLoaded);
    });

    // Check font readiness
    if (document.fonts) {
      document.fonts.ready.then(onItemLoaded).catch(onItemLoaded);
    } else {
      onItemLoaded();
    }

    // Check DOM / Window readiness
    if (document.readyState === 'complete') {
      onItemLoaded();
    } else {
      const handleLoad = () => {
        onItemLoaded();
        window.removeEventListener('load', handleLoad);
      };
      window.addEventListener('load', handleLoad);
    }

    // Safety fallback: Never trap user longer than 6 seconds even on slow networks
    const safetyTimeout = setTimeout(() => {
      isAssetsReadyRef.current = true;
      rawProgressRef.current = 100;
    }, 6000);

    // 2. Orchestrate Visual Motion Timeline
    const vibeWords = rootRef.current?.querySelectorAll('.vibe-word');
    const brandContainer = brandContainerRef.current;
    const progressContainer = progressContainerRef.current;

    // Reset initial states
    if (vibeWords) {
      gsap.set(vibeWords, { y: '110%', opacity: 1 });
    }
    if (brandContainer) {
      gsap.set(brandContainer, { y: 40, opacity: 0 });
    }
    if (progressContainer) {
      gsap.set(progressContainer, { opacity: 0, y: 15 });
    }

    const masterTimeline = gsap.timeline();

    // Scene 1: "Find your vibe" staggered reveal
    masterTimeline
      .to(vibeWords || [], {
        y: '0%',
        stagger: 0.14,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.15,
      })
      // Hold "Find your vibe" briefly for readability
      .to({}, { duration: 0.95 })
      // Scene 1 Exit: Words slide up and out
      .to(vibeWords || [], {
        y: '-110%',
        opacity: 0,
        stagger: 0.08,
        duration: 0.45,
        ease: 'power3.in',
      })
      // Scene 2: "baGGy" rises up into the center
      .to(
        brandContainer,
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power3.out',
          onStart: () => {
            hasStartedBrandPhaseRef.current = true;
          },
        },
        '-=0.1'
      )
      // Scene 3: Dynamic progress bar smoothly fades & rises into place below "baGGy"
      .to(
        progressContainer,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.2'
      );

    // 3. Smooth Dynamic Progress Ticker
    let animationFrameId: number;
    const updateProgress = () => {
      if (hasStartedBrandPhaseRef.current) {
        // While assets are loading, pace up towards the actual raw progress
        const target = isAssetsReadyRef.current
          ? 100
          : Math.min(rawProgressRef.current, 92);

        // Natural smooth ease towards target
        const diff = target - displayProgressRef.current;
        if (diff > 0.1) {
          displayProgressRef.current += Math.max(0.6, diff * 0.12);
        } else if (isAssetsReadyRef.current) {
          displayProgressRef.current = 100;
        }

        const currentVal = Math.min(100, displayProgressRef.current);
        setDisplayProgress(currentVal);

        // Update luxury status labels
        if (currentVal < 35) {
          setStatusText('LOADING ASSETS');
        } else if (currentVal < 70) {
          setStatusText('CURATING COLLECTION');
        } else if (currentVal < 99) {
          setStatusText('FINALIZING STYLE');
        } else {
          setStatusText('READY');
        }

        // Trigger morph once 100% and assets confirmed fully ready
        if (currentVal >= 99.8 && isAssetsReadyRef.current) {
          cancelAnimationFrame(animationFrameId);
          setTimeout(() => {
            triggerExitMorph();
          }, 240);
          return;
        }
      }

      animationFrameId = requestAnimationFrame(updateProgress);
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      clearTimeout(safetyTimeout);
      cancelAnimationFrame(animationFrameId);
      masterTimeline.kill();
    };
  }, [triggerExitMorph]);

  if (!isActive) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden"
      aria-label="Loading baGGy experience"
      role="progressbar"
      aria-valuenow={Math.round(displayProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Background Layer: Rich Dark Coffee Gradient with Ambient Glow */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 z-0 will-change-opacity"
        style={{
          background:
            'radial-gradient(ellipse at 50% 48%, #522f1b 0%, #432818 65%, #27160c 100%)',
        }}
      >
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#75452f]/15 blur-3xl pointer-events-none -translate-y-12 left-1/2 -translate-x-1/2 top-1/2" />
      </div>

      {/* Foreground Stage Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        {/* Phase 1: "Find your vibe" Kinetic Words */}
        <div
          ref={vibeContainerRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="flex items-center justify-center gap-2.5 sm:gap-4 md:gap-6">
            {['Find', 'your', 'vibe'].map((word) => (
              <span key={word} className="overflow-hidden inline-block py-1">
                <span className="vibe-word inline-block font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white transform translate-y-full will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Phase 2 & 3: "baGGy" Brand Label and Dynamic Progress Bar */}
        <div
          ref={brandContainerRef}
          className="flex flex-col items-center justify-center"
        >
          {/* Main Brand Text - Will Morph & Float to Navbar Logo */}
          <span
            ref={brandTextRef}
            className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight leading-none text-white select-none inline-flex items-center will-change-transform"
          >
            baGGy
          </span>

          {/* Dynamic Progress Bar below baGGy label */}
          <div
            ref={progressContainerRef}
            className="w-56 sm:w-72 md:w-80 mt-8 sm:mt-10 flex flex-col items-center gap-2.5"
          >
            {/* Smooth Track */}
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-md relative shadow-inner">
              <div
                className="h-full bg-white rounded-full relative transition-[width] duration-100 ease-out shadow-[0_0_12px_rgba(255,255,255,0.85)]"
                style={{ width: `${Math.min(100, Math.max(0, displayProgress))}%` }}
              />
            </div>

            {/* Status and Percentage Indicator */}
            <div className="flex items-center justify-between w-full text-[10px] sm:text-xs font-mono text-white/70 tracking-widest uppercase">
              <span className="font-semibold">{statusText}</span>
              <span className="font-bold text-white">
                {Math.round(displayProgress)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
