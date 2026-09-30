import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Feather, Image as ImageIcon, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AppTheme } from '../types';
import { THEME_CONFIGS } from '../utils/theme';

interface HeroSectionProps {
  recipientName: string;
  currentTheme: AppTheme;
  onOpenLetter: () => void;
  onScrollToGallery: () => void;
  onScrollToReasons: () => void;
  onScrollToWish: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  recipientName,
  currentTheme,
  onOpenLetter,
  onScrollToGallery,
  onScrollToReasons,
  onScrollToWish
}) => {
  const theme = THEME_CONFIGS[currentTheme] || THEME_CONFIGS.rose;
  const [secondsTogether, setSecondsTogether] = useState<number>(0);

  useEffect(() => {
    const baseSeconds = 78912474;
    setSecondsTogether(baseSeconds);
    const interval = setInterval(() => {
      setSecondsTogether((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerCelebration = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: [theme.primary, '#F59E0B', '#FFF', '#FBCFE8']
    });
    onOpenLetter();
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:pt-14 md:pb-24">
      {/* Background with Generated Fairytale Garden Image */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/src/assets/images/hero_fairytale_garden_1790737636756.jpg"
          alt="Dreamy fairytale morning garden with blooming blush roses and golden sunrise"
          className="h-full w-full object-cover object-center scale-105 transition-transform duration-10000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Soft, Fresh Gradient Overlay */}
        <div 
          className="absolute inset-0 transition-colors duration-500" 
          style={{
            background: theme.id === 'rose'
              ? 'linear-gradient(to bottom, rgba(255,245,248,0.92) 0%, rgba(255,250,252,0.85) 60%, rgba(255,248,250,1) 100%)'
              : theme.id === 'lavender'
              ? 'linear-gradient(to bottom, rgba(245,243,255,0.92) 0%, rgba(250,248,255,0.85) 60%, rgba(250,247,253,1) 100%)'
              : 'linear-gradient(to bottom, rgba(254,252,232,0.92) 0%, rgba(255,253,245,0.85) 60%, rgba(252,250,245,1) 100%)'
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Editorial Kicker */}
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: theme.primary }}
          >
            <span>A Love Written In The Stars</span>
            <span aria-hidden="true">·</span>
            <span>Happy Birthday To My Queen</span>
            <span aria-hidden="true">·</span>
            <span>Forever & Always</span>
          </div>

          {/* Main Romantic Headline - Thick, Bold, Solid Rounded Sans! */}
          <h1 className="mt-2 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.15]"
            style={{ color: theme.headingColor }}
          >
            Happy Birthday,{' '}
            <span 
              className="font-romantic text-5xl sm:text-7xl md:text-8xl block sm:inline ml-2"
              style={{ 
                color: theme.primary,
                textShadow: `0 3px 12px ${theme.primary}25`
              }}
            >
              {recipientName || 'Meri Jaan'}
            </span>
          </h1>

          {/* Romantic Poetic Kicker */}
          <p className="mt-4 text-lg sm:text-2xl font-medium max-w-3xl mx-auto"
            style={{ color: theme.subtextColor }}
          >
            “Tu meri zindagi ka sabse khoobsurat hissa hai, jise paakar mujhe puri kayenaat mil gayi.”
          </p>

          <p className="mt-3 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed"
            style={{ color: theme.subtextColor }}
          >
            Today is a celebration of your radiant soul, your gentle heart, and the timeless fairytale you have gifted my life.
            Every moment by your side is a treasure beyond compare.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={triggerCelebration}
              className="group relative inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryHover} 100%)`,
                boxShadow: `0 10px 25px -5px ${theme.primary}66`
              }}
            >
              <Feather className="h-4 w-4 text-white transition-transform group-hover:-rotate-12" />
              <span>Open Your Love Letter</span>
              <span className="flex h-2 w-2 rounded-full bg-white animate-ping" />
            </button>

            <button
              onClick={onScrollToGallery}
              className="inline-flex items-center gap-2 rounded-full border-2 bg-white px-5 py-3.5 text-sm font-bold shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                borderColor: theme.primary + '55',
                color: theme.headingColor
              }}
            >
              <ImageIcon className="h-4 w-4" style={{ color: theme.primary }} />
              <span>Walk Our Memories</span>
            </button>

            <button
              onClick={onScrollToWish}
              className="inline-flex items-center gap-2 rounded-full border-2 bg-white px-5 py-3.5 text-sm font-bold text-amber-700 border-amber-200 shadow-xs transition-all hover:scale-105 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Make A Wish</span>
            </button>
          </div>

          {/* Clean, Modern Emotional Love Metrics Strip with Round Solid Figures */}
          <div className="mt-14 pt-8 border-t grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center"
            style={{ borderColor: theme.primary + '25' }}
          >
            <div className="px-3">
              <span className="block text-2xl sm:text-3xl font-numbers font-bold tracking-tight tabular-nums"
                style={{ color: theme.primary }}
              >
                {secondsTogether > 0 ? secondsTogether.toLocaleString() : '78,912,474'}
              </span>
              <span className="text-xs font-semibold tracking-wide mt-1 block"
                style={{ color: theme.subtextColor }}
              >
                Heartbeats Cherishing You
              </span>
            </div>

            <div className="px-3">
              <span className="block text-2xl sm:text-3xl font-numbers font-bold tracking-tight"
                style={{ color: theme.primary }}
              >
                10,000+
              </span>
              <span className="text-xs font-semibold tracking-wide mt-1 block"
                style={{ color: theme.subtextColor }}
              >
                Smiles You Brought Me
              </span>
            </div>

            <div className="px-3">
              <span className="block text-2xl sm:text-3xl font-numbers font-bold tracking-tight"
                style={{ color: theme.primary }}
              >
                Countless
              </span>
              <span className="text-xs font-semibold tracking-wide mt-1 block"
                style={{ color: theme.subtextColor }}
              >
                Silent Prayers for You
              </span>
            </div>

            <div className="px-3">
              <span className="block text-2xl sm:text-3xl font-numbers font-bold tracking-tight"
                style={{ color: theme.primary }}
              >
                Infinity
              </span>
              <span className="text-xs font-semibold tracking-wide mt-1 block"
                style={{ color: theme.subtextColor }}
              >
                Lifetime Vows To Love You
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
