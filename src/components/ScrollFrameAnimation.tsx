import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, Calendar, MessageCircle } from 'lucide-react';
import { AppPage } from '../types';

// Import all 42 frame images from Frames folder in alphabetical order
const frameModules = import.meta.glob<{ default: string }>('../assets/images/Frames/*.webp', {
  eager: true,
});

const frameUrls: string[] = Object.entries(frameModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true, sensitivity: 'base' }))
  .map(([_, mod]) => mod.default);

interface ScrollFrameAnimationProps {
  onNavigate?: (page: AppPage) => void;
  onBookTourClick?: () => void;
  onScrollComplete?: () => void;
  className?: string;
}

export const ScrollFrameAnimation: React.FC<ScrollFrameAnimationProps> = ({
  onNavigate,
  onBookTourClick,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const [, setLoadedCount] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const isLoadedRef = useRef<boolean>(false);

  // Preload all frame images
  useEffect(() => {
    let count = 0;
    const total = frameUrls.length;
    const loadedImgs: HTMLImageElement[] = [];

    frameUrls.forEach((url, idx) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        count++;
        setLoadedCount(count);
        if (count === 1) {
          // Draw the first frame as soon as it's ready
          renderFrame(0);
        }
        if (count === total) {
          isLoadedRef.current = true;
          renderFrame(currentFrameRef.current);
        }
      };
      loadedImgs[idx] = img;
    });

    imagesRef.current = loadedImgs;
  }, []);

  // Cover math for drawing image on canvas
  const drawImageCover = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;
    if (!imgWidth || !imgHeight) return;

    const canvasAspect = canvasWidth / canvasHeight;
    const imgAspect = imgWidth / imgHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgAspect > canvasAspect) {
      drawWidth = canvasHeight * imgAspect;
      offsetX = (canvasWidth - drawWidth) / 2;
    } else {
      drawHeight = canvasWidth / imgAspect;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const renderFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const total = frameUrls.length;
    const safeIdx = Math.max(0, Math.min(total - 1, frameIdx));
    const img = imagesRef.current[safeIdx];

    if (img && img.complete && img.naturalWidth > 0) {
      drawImageCover(ctx, img, canvas.width, canvas.height);
      currentFrameRef.current = safeIdx;
    }
  }, []);

  // Handle Resize and High DPI display
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      renderFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // Scroll listener for scrubbing through the animation frames
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const totalScrollDistance = containerRef.current.offsetHeight - window.innerHeight;

          if (totalScrollDistance <= 0) {
            ticking = false;
            return;
          }

          // Compute progress: 0 when container reaches top of viewport, 1 when scrolled to bottom of container
          const currentScroll = -rect.top;
          const progress = Math.max(0, Math.min(1, currentScroll / totalScrollDistance));

          setScrollProgress(progress);

          const totalFrames = frameUrls.length;
          const targetIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));

          if (targetIndex !== currentFrameRef.current) {
            renderFrame(targetIndex);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger initial calculation
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [renderFrame]);

  // Show the hero overlay as the scroll sequence reaches the final frames
  const isFinalSequence = scrollProgress >= 0.75;
  const fadeProgress = Math.max(0, Math.min(1, (scrollProgress - 0.7) / 0.25));

  return (
    <div
      ref={containerRef}
      id="scroll-scrubbed-frame-section"
      className={`relative w-full h-[220vh] sm:h-[250vh] ${className}`}
    >
      {/* Sticky Frame Viewport */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
        
        {/* Canvas for zero-lag smooth frame playback */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block"
          style={{ imageRendering: 'auto' }}
        />

        {/* Ambient Dark Overlay to preserve depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/30 to-zinc-950/65 pointer-events-none" />

        {/* End of animation: Text & Actions fade in on the last frame */}
        <div
          className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 z-20 transition-all duration-700 ease-out"
          style={{
            opacity: fadeProgress,
            pointerEvents: isFinalSequence ? 'auto' : 'none',
            transform: `translateY(${(1 - fadeProgress) * 24}px)`,
          }}
        >
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-4 sm:mb-6 drop-shadow-md">
              Your Comfort, Our Priority
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-zinc-200 font-normal leading-relaxed max-w-3xl mx-auto mb-8 drop-shadow-sm">
              Easy House Cameroon is a Real Estate Company Based in Buea, Cameroon and operational in Doula, Limbe & Yde with the goal of bridging the gap between property owners (Landlords, Landladies) and Potential Clients in need of their Properties to Rent or Buy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <button
                onClick={() => onNavigate?.('properties')}
                id="frame-browse-properties-btn"
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 text-xs sm:text-sm font-bold transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer group"
              >
                <span>Browse All Properties</span>
                <ArrowRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onBookTourClick?.()}
                id="frame-schedule-tour-btn"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/25 text-xs sm:text-sm font-semibold transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-zinc-200" />
                <span>Schedule Tour</span>
              </button>

              <a
                href="https://wa.me/237674121117"
                target="_blank"
                rel="noreferrer"
                id="frame-whatsapp-btn"
                className="inline-flex items-center gap-2 px-5 py-3.5 sm:py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>WhatsApp: 674121117</span>
              </a>
            </div>

          </div>
        </div>

        {/* Scrub Progress Bar along bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-sky-400 transition-all duration-75"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>

      </div>
    </div>
  );
};

