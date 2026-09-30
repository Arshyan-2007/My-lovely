import React, { useState } from 'react';
import { Feather, Heart, BookOpen, Copy, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LoveLetterData, AppTheme } from '../types';
import { THEME_CONFIGS } from '../utils/theme';

interface LoveLetterSectionProps {
  letterData: LoveLetterData;
  currentTheme: AppTheme;
  onOpenModal: () => void;
}

export const LoveLetterSection: React.FC<LoveLetterSectionProps> = ({
  letterData,
  currentTheme,
  onOpenModal
}) => {
  const theme = THEME_CONFIGS[currentTheme] || THEME_CONFIGS.rose;
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyText = () => {
    const fullText = `${letterData.greeting}\n\n${letterData.letterTitle}\n\n${letterData.paragraphs.join(
      '\n\n'
    )}\n\n${letterData.urduPoem.lines.join('\n')}\n${letterData.urduPoem.translation}\n\n${
      letterData.closingMessage
    }\n${letterData.signature}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWaxSealClick = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: [theme.primary, '#F59E0B', '#FFF']
    });
  };

  return (
    <section id="letter-section" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest px-3.5 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} mb-3`}>
            <span>Royal Parchment</span>
            <span aria-hidden="true">·</span>
            <span>From My Heart To Yours</span>
            <span aria-hidden="true">·</span>
            <span>Birthday Edition</span>
          </div>

          <h2 className={`mt-2 text-3xl sm:text-5xl font-bold tracking-tight ${theme.headingColor}`}>
            The Digital Love Letter
          </h2>
          <p className={`mt-2 text-sm sm:text-base font-normal max-w-xl mx-auto ${theme.subtextColor}`}>
            “Har lafz me meri mohabbat aur har dua me tera zikr hai.”
          </p>
        </div>

        {/* Vintage Parchment Container (Clean, Highly Legible Modern Typography) */}
        <div 
          className="relative mx-auto rounded-3xl border-2 bg-white p-6 sm:p-10 md:p-14 shadow-2xl overflow-hidden fairy-glow"
          style={{ borderColor: theme.primary + '44' }}
        >
          {/* Corner decorations */}
          <div className="pointer-events-none absolute top-3 left-4 text-2xl select-none" style={{ color: theme.primary + '33' }}>
            ❦
          </div>
          <div className="pointer-events-none absolute top-3 right-4 text-2xl select-none" style={{ color: theme.primary + '33' }}>
            ❦
          </div>
          <div className="pointer-events-none absolute bottom-3 left-4 text-2xl select-none" style={{ color: theme.primary + '33' }}>
            ❦
          </div>
          <div className="pointer-events-none absolute bottom-3 right-4 text-2xl select-none" style={{ color: theme.primary + '33' }}>
            ❦
          </div>

          {/* Letter Top Controls */}
          <div className="flex items-center justify-between border-b pb-5 mb-8 text-xs" style={{ borderColor: theme.primary + '22' }}>
            <div className="flex items-center gap-2">
              <Feather className="h-4 w-4" style={{ color: theme.primary }} />
              <span className={`font-semibold text-sm ${theme.subtextColor}`}>{letterData.anniversaryOrDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="inline-flex items-center gap-1 rounded-full border bg-white px-3 py-1.5 text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                style={{ borderColor: theme.primary + '44', color: theme.headingColor }}
                title="Copy love letter text"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" style={{ color: theme.primary }} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={onOpenModal}
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:opacity-95 transition-all cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryHover} 100%)`
                }}
                title="Open illuminated full-screen reading scroll"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Fullscreen Scroll</span>
              </button>
            </div>
          </div>

          {/* Letter Body - 100% Clean, Readable, Elegant Typography */}
          <div className="space-y-6 leading-relaxed" style={{ color: '#1F1728' }}>
            {/* Salutation & Dedication Luxury Cartouche */}
            <div 
              className="relative rounded-2xl border-2 p-5 sm:p-7 shadow-xs overflow-hidden"
              style={{
                borderColor: theme.primary + '35',
                background: theme.id === 'rose'
                  ? 'linear-gradient(135deg, #FFF5F8 0%, #FFFFFF 50%, #FFF0F5 100%)'
                  : theme.id === 'lavender'
                  ? 'linear-gradient(135deg, #F5F3FF 0%, #FFFFFF 50%, #EDE9FE 100%)'
                  : 'linear-gradient(135deg, #FFFDF0 0%, #FFFFFF 50%, #FEF3C7 100%)'
              }}
            >
              {/* Decorative top kicker with sparkling filigree */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-amber-500 text-xs">✦</span>
                <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full"
                  style={{ backgroundColor: theme.primary + '18', color: theme.primary }}
                >
                  Dedicated to My Beloved Queen
                </span>
                <span className="text-amber-500 text-xs">✦</span>
              </div>

              {/* Romantic, soft, handwritten calligraphic greeting with 100% crisp legibility */}
              <h2 
                className="font-romantic text-2xl sm:text-3xl md:text-4xl leading-relaxed tracking-wide"
                style={{ 
                  color: theme.primary,
                  textShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              >
                {letterData.greeting}
              </h2>

              <div className="my-2.5 h-0.5 w-24 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${theme.primary}, #F59E0B, transparent)`
                }}
              />

              <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${theme.headingColor}`}>
                {letterData.letterTitle}
              </h3>
            </div>

            {/* Paragraphs with clean Poppins typography */}
            <div className="space-y-5 text-base sm:text-lg leading-[1.85] text-justify sm:text-left font-normal" style={{ color: '#33202E' }}>
              {letterData.paragraphs.map((p, idx) => (
                <p key={idx} className="first-letter:text-3xl first-letter:font-bold first-letter:mr-1" style={{ color: '#2B1A28' }}>
                  {p}
                </p>
              ))}
            </div>

            {/* Urdu Poetry Highlight Box */}
            <div 
              className="my-8 rounded-2xl border-2 p-6 text-center shadow-xs"
              style={{
                borderColor: theme.primary + '44',
                backgroundColor: theme.id === 'rose' ? '#FFF5F8' : theme.id === 'lavender' ? '#F5F3FF' : '#FFFDF0'
              }}
            >
              <div 
                className="mx-auto flex h-9 w-9 items-center justify-center rounded-full mb-3"
                style={{ backgroundColor: theme.primary + '20', color: theme.primary }}
              >
                <Heart className="h-5 w-5 fill-current" />
              </div>
              <div className="space-y-2 text-xl sm:text-2xl font-bold italic leading-relaxed" style={{ color: theme.primary }}>
                {letterData.urduPoem.lines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
              <p className={`mt-3 text-xs sm:text-sm font-medium ${theme.subtextColor}`}>
                {letterData.urduPoem.translation}
              </p>
              {letterData.urduPoem.poet && (
                <span className="block mt-2 text-[11px] font-bold uppercase tracking-wider" style={{ color: theme.primary }}>
                  — {letterData.urduPoem.poet}
                </span>
              )}
            </div>

            {/* Closing & Signature */}
            <div className="pt-6 border-t flex flex-col sm:flex-row sm:items-end justify-between gap-4" style={{ borderColor: theme.primary + '22' }}>
              <div>
                <p className={`text-sm font-medium ${theme.subtextColor}`}>
                  {letterData.closingMessage}
                </p>
                <p className="mt-1.5 text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: theme.primary }}>
                  {letterData.signature}
                </p>
                <p className="text-xs font-semibold mt-1" style={{ color: theme.subtextColor }}>
                  {letterData.husbandName}
                </p>
              </div>

              {/* Decorative Wax Seal Stamp Graphic */}
              <div className="self-end sm:self-auto flex items-center gap-3">
                <button
                  onClick={handleWaxSealClick}
                  className="group relative flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryHover} 100%)`
                  }}
                  title="Click the royal wax seal!"
                >
                  <div className="absolute inset-1 rounded-full border border-white/40" />
                  <Heart className="h-7 w-7 fill-white text-white group-hover:scale-115 transition-transform" />
                  <span className="sr-only">Royal Wax Seal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
