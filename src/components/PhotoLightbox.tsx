import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Sparkles, MapPin, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PhotoMemory } from '../types';

interface PhotoLightboxProps {
  photo: PhotoMemory | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  onClose,
  onNext,
  onPrev
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    if (photo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, onClose, onNext, onPrev]);

  if (!photo) return null;

  const triggerHeartBurst = () => {
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F472B6', '#E11D48', '#FDE047']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      <div
        className="fixed inset-0 bg-[#1E1624]/60 backdrop-blur-lg transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-4xl rounded-3xl border-2 border-[#FBCFE8] bg-white shadow-2xl overflow-hidden fairy-glow">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-[#FCE7F3] px-5 py-3.5 bg-white">
          <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[#BE123C] uppercase tracking-wider">
            <Sparkles className="h-4 w-4 text-[#E11D48]" />
            <span>{photo.title || 'Photo View'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={triggerHeartBurst}
              className="flex items-center gap-1.5 rounded-full border border-[#FBCFE8] bg-[#FFF1F5] px-3 py-1 text-xs font-sans font-medium text-[#BE123C] hover:bg-[#FFE4EC] transition-all cursor-pointer"
            >
              <Heart className="h-3.5 w-3.5 fill-[#E11D48] text-[#E11D48]" />
              <span>Send Love</span>
            </button>

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF1F5] text-[#BE123C] hover:bg-[#FCE7F3] transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[80vh] overflow-y-auto">
          {/* Main Visual */}
          <div className="md:col-span-7 bg-[#1E1624] flex items-center justify-center relative min-h-[300px] sm:min-h-[420px] overflow-hidden group">
            <img
              src={photo.url}
              alt={photo.title}
              className="max-h-[70vh] w-full object-contain p-2 transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />

            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#1E1624] shadow-md backdrop-blur-sm hover:bg-white hover:scale-110 transition-all cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#1E1624] shadow-md backdrop-blur-sm hover:bg-white hover:scale-110 transition-all cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Reflection Panel */}
          <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-[#BE123C] font-sans font-medium">
                {photo.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-[#E11D48]" />
                    {photo.date}
                  </span>
                )}
                {photo.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#E11D48]" />
                    {photo.location}
                  </span>
                )}
              </div>

              {photo.title && (
                <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#1E1624] leading-snug">
                  {photo.title}
                </h3>
              )}

              {photo.caption && (
                <p className="font-serif-luxury text-base sm:text-lg text-[#311C2B] leading-relaxed italic">
                  “{photo.caption}”
                </p>
              )}

              <div className="rounded-xl border border-[#FCE7F3] bg-[#FFF5F8] p-4 text-xs text-[#4C2838] font-sans leading-relaxed">
                <span className="font-semibold text-[#BE123C] block mb-1">A Note From Your Husband:</span>
                I look at your beautiful smile and my heart fills with peace. Thank you for making my life so sweet and full of joy.
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#FCE7F3] flex items-center justify-between text-xs text-[#BE123C]">
              <span className="font-sans">Use arrow keys to browse</span>
              <button
                onClick={onClose}
                className="font-medium text-[#E11D48] hover:underline"
              >
                Back to gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
