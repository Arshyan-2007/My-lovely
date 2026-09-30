import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Plus, 
  Layers, 
  Play, 
  Pause, 
  Shuffle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PhotoMemory, AppTheme } from '../types';
import { THEME_CONFIGS } from '../utils/theme';

interface AnimatedGalleryProps {
  memories: PhotoMemory[];
  currentTheme: AppTheme;
  onSelectPhotoForLightbox: (photo: PhotoMemory) => void;
  onDeleteMemory?: (id: string) => void;
}

export const AnimatedGallery: React.FC<AnimatedGalleryProps> = ({
  memories,
  currentTheme,
  onSelectPhotoForLightbox,
  onDeleteMemory
}) => {
  const theme = THEME_CONFIGS[currentTheme] || THEME_CONFIGS.rose;
  const [activeCarouselIdx, setActiveCarouselIdx] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const progressTimerRef = useRef<number | null>(null);
  const durationMs = 3500; // 3.5s per slide

  // Next Carousel: Picks randomly from photos without repeating the current one
  const nextCarousel = useCallback(() => {
    setActiveCarouselIdx((prev) => {
      if (memories.length <= 1) return 0;
      let nextIdx = Math.floor(Math.random() * memories.length);
      if (nextIdx === prev) {
        nextIdx = (prev + 1) % memories.length;
      }
      return nextIdx;
    });
    setProgress(0);
  }, [memories.length]);

  const prevCarousel = useCallback(() => {
    setActiveCarouselIdx((prev) => {
      if (memories.length <= 1) return 0;
      return (prev - 1 + memories.length) % memories.length;
    });
    setProgress(0);
  }, [memories.length]);

  // Smooth Continuous Auto-Play Loop - never stalls on mouse movement
  useEffect(() => {
    if (!isAutoPlaying || memories.length <= 1) {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    const intervalStep = 50;
    const increment = (intervalStep / durationMs) * 100;

    progressTimerRef.current = window.setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          nextCarousel();
          return 0;
        }
        return old + increment;
      });
    }, intervalStep);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isAutoPlaying, memories.length, nextCarousel]);

  const handleCardClick = (mem: PhotoMemory) => {
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.6 },
      colors: [theme.primary, '#F59E0B', '#FFF']
    });
    onSelectPhotoForLightbox(mem);
  };

  return (
    <section id="gallery-section" className="relative pt-10 pb-16 sm:pt-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className={`inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest px-3.5 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} mb-3`}>
            <span>Photo Gallery</span>
            <span aria-hidden="true">·</span>
            <span className="font-numbers">{memories.length}</span>
            <span>Photos</span>
          </div>

          <h2 className={`mt-2 text-3xl sm:text-5xl font-bold tracking-tight ${theme.headingColor}`}>
            Her Beautiful Photos
          </h2>
          <p className={`mt-2 text-sm sm:text-base font-normal max-w-2xl mx-auto ${theme.subtextColor}`}>
            “Har tasveer me tum meri mohabbat aur mera sukoon ho.”
          </p>

          {/* Gallery Header Bar */}
          <div className="mt-8 flex items-center justify-center gap-4 border-b pb-4"
            style={{ borderColor: theme.primary + '25' }}
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold" style={{ color: theme.primary }}>
              <Layers className="h-4 w-4" />
              <span>3D Carousel Gallery</span>
            </div>
          </div>
        </div>

        {/* 3D Carousel Stage */}
        <div className="relative py-6 select-none">
            {/* Visual Progress Bar for Auto-Play */}
            <div className="mx-auto max-w-xs mb-4 flex items-center gap-2 justify-center">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="flex items-center gap-1.5 text-xs font-bold bg-white border px-3 py-1 rounded-full shadow-xs hover:bg-gray-50 transition-all cursor-pointer"
                style={{
                  color: theme.primary,
                  borderColor: theme.primary + '44'
                }}
                title={isAutoPlaying ? 'Pause automatic slideshow' : 'Start automatic slideshow'}
              >
                {isAutoPlaying ? <Pause className="h-3 w-3 fill-current" /> : <Play className="h-3 w-3 fill-current" />}
                <span>{isAutoPlaying ? 'Auto-Playing' : 'Paused'}</span>
              </button>
              
              <div className="flex-1 h-2 rounded-full overflow-hidden bg-gray-100">
                <div 
                  className="h-full transition-all duration-75 rounded-full"
                  style={{ 
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${theme.primary}, #F59E0B)`
                  }}
                />
              </div>
            </div>

            {/* 3D Carousel Stage - Sized to fit 100% within screen height without clipping */}
            <div className="relative mx-auto h-[430px] sm:h-[470px] max-w-4xl flex items-center justify-center overflow-hidden">
              {memories.map((mem, index) => {
                const diff = (index - activeCarouselIdx + memories.length) % memories.length;
                let transform = '';
                let opacity = 0;
                let zIndex = 0;
                let pointerEvents: 'auto' | 'none' = 'none';

                if (diff === 0) {
                  transform = 'translateX(0%) scale(1) rotate(0deg)';
                  opacity = 1;
                  zIndex = 20;
                  pointerEvents = 'auto';
                } else if (diff === 1 || diff === -(memories.length - 1)) {
                  transform = 'translateX(62%) scale(0.85) rotate(2.5deg)';
                  opacity = 0.75;
                  zIndex = 10;
                  pointerEvents = 'auto';
                } else if (diff === memories.length - 1 || diff === -1) {
                  transform = 'translateX(-62%) scale(0.85) rotate(-2.5deg)';
                  opacity = 0.75;
                  zIndex = 10;
                  pointerEvents = 'auto';
                } else {
                  transform = 'translateX(0%) scale(0.5)';
                  opacity = 0;
                  zIndex = 0;
                }

                return (
                  <div
                    key={mem.id}
                    onClick={() => (diff === 0 ? handleCardClick(mem) : setActiveCarouselIdx(index))}
                    className="absolute w-[220px] sm:w-[250px] md:w-[275px] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{
                      transform,
                      opacity,
                      zIndex,
                      pointerEvents,
                      filter: diff === 0 
                        ? `drop-shadow(0 16px 30px ${theme.primary}25)` 
                        : 'blur(0.5px) drop-shadow(0 8px 16px rgba(0,0,0,0.06))'
                    }}
                  >
                    <div 
                      className="group rounded-2xl border-2 bg-white p-2 sm:p-2.5 shadow-xl transition-all duration-300 hover:-translate-y-1.5"
                      style={{ borderColor: diff === 0 ? theme.primary : '#E5E7EB' }}
                    >
                      {/* Portrait 3:4 Frame */}
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-50">
                        <img
                          src={mem.url}
                          alt="Photo"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <span className="inline-flex items-center gap-1.5 text-[11px] text-white font-medium bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                            <Maximize2 className="h-3 w-3" /> Tap to view photo
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Navigation Arrows & Dots */}
            <div className="mt-4 flex items-center justify-center gap-4">
              <button
                onClick={prevCarousel}
                className="flex h-11 w-11 items-center justify-center rounded-full border bg-white shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                style={{
                  color: theme.primary,
                  borderColor: theme.primary + '44'
                }}
                aria-label="Previous Memory"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Clean Elegant Photo Counter Badge (Replaced cluttering long row of dots) */}
              <div 
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border shadow-xs"
                style={{ borderColor: theme.primary + '33' }}
              >
                <Shuffle className="h-3.5 w-3.5" style={{ color: theme.primary }} />
                <span className="text-xs font-bold font-numbers tracking-wide" style={{ color: theme.headingColor }}>
                  Photo {activeCarouselIdx + 1} of {memories.length}
                </span>
                <span className="text-[11px] font-semibold hidden sm:inline" style={{ color: theme.primary }}>
                  ✦ Random Shuffle
                </span>
              </div>

              <button
                onClick={nextCarousel}
                className="flex h-11 w-11 items-center justify-center rounded-full border bg-white shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                style={{
                  color: theme.primary,
                  borderColor: theme.primary + '44'
                }}
                aria-label="Next Memory"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
  );
};
