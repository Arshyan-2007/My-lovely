import React, { useEffect, useRef, useState } from 'react';
import { X, Sparkles, Heart, ArrowDown, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LoveLetterData } from '../types';

interface LoveLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  letterData: LoveLetterData;
}

export const LoveLetterModal: React.FC<LoveLetterModalProps> = ({
  isOpen,
  onClose,
  letterData
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const autoScrollTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 55,
        spread: 80,
        origin: { y: 0.4 },
        colors: ['#F472B6', '#E11D48', '#FDE047', '#FDA4AF']
      });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsAutoScrolling(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isAutoScrolling && scrollRef.current) {
      autoScrollTimerRef.current = window.setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop += 1;
          if (
            scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
            scrollRef.current.scrollHeight - 5
          ) {
            setIsAutoScrolling(false);
          }
        }
      }, 35);
    } else {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    }
    return () => {
      if (autoScrollTimerRef.current) clearInterval(autoScrollTimerRef.current);
    };
  }, [isAutoScrolling]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#1E1624]/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-3xl rounded-3xl border-2 border-[#FBCFE8] bg-white p-6 sm:p-12 shadow-2xl overflow-hidden fairy-glow">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-[#FCE7F3] pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[#BE123C] uppercase tracking-wider">
            <Sparkles className="h-4 w-4 text-[#E11D48]" />
            <span>Royal Love Letter</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-sans font-medium transition-all ${
                isAutoScrolling
                  ? 'bg-[#E11D48] text-white shadow-xs'
                  : 'border border-[#FBCFE8] bg-white text-[#1E1624] hover:bg-[#FFF1F5]'
              }`}
            >
              <ArrowDown className={`h-3 w-3 ${isAutoScrolling ? 'animate-bounce' : ''}`} />
              <span>{isAutoScrolling ? 'Pause Scroll' : 'Auto Scroll'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1 rounded-full border border-[#FBCFE8] bg-white px-3 py-1 text-xs font-sans font-medium text-[#1E1624] hover:bg-[#FFF1F5] transition-all"
              title="Print as Keepsake"
            >
              <Printer className="h-3 w-3" />
              <span>Print Keepsake</span>
            </button>

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF1F5] text-[#BE123C] hover:bg-[#FCE7F3] transition-colors"
              aria-label="Close Love Letter"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Letter Area */}
        <div
          ref={scrollRef}
          className="max-h-[68vh] overflow-y-auto pr-2 space-y-6 text-[#1E1624] leading-relaxed font-serif-luxury"
        >
          <div className="text-center pt-2 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2 px-3.5 py-1 rounded-full bg-rose-50 text-[#BE123C]">
              <Heart className="h-3 w-3 fill-current" />
              <span>Royal Love Letter</span>
            </div>
            <h2 className="mt-1 font-romantic text-2xl sm:text-4xl text-[#BE123C] leading-relaxed tracking-wide">
              {letterData.greeting}
            </h2>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold text-[#1E1624]">
              {letterData.letterTitle}
            </h3>
            <div className="mx-auto mt-3 h-0.5 w-24 bg-gradient-to-r from-transparent via-[#F472B6] to-transparent" />
          </div>

          <div className="space-y-5 text-base sm:text-xl text-[#2B1B27] leading-[1.85] text-justify sm:text-left">
            {letterData.paragraphs.map((p, idx) => (
              <p key={idx} className="first-letter:text-4xl first-letter:font-script first-letter:font-bold first-letter:text-[#E11D48] first-letter:mr-1.5">
                {p}
              </p>
            ))}
          </div>

          {/* Urdu Couplet */}
          <div className="my-8 rounded-2xl border-2 border-[#FBCFE8] bg-[#FFF5F8] p-6 text-center">
            <div className="space-y-2 text-xl sm:text-2xl font-serif-luxury italic font-medium text-[#BE123C]">
              {letterData.urduPoem.lines.map((l, i) => (
                <p key={i}>{l}</p>
              ))}
            </div>
            <p className="mt-3 text-sm font-sans text-[#4C2838] italic font-medium">
              {letterData.urduPoem.translation}
            </p>
          </div>

          {/* Footnote */}
          <div className="pt-8 border-t border-[#FCE7F3] flex items-center justify-between pb-6">
            <div>
              <p className="text-sm font-serif-luxury italic text-[#4C2838]">{letterData.closingMessage}</p>
              <p className="font-script text-3xl sm:text-4xl text-[#E11D48] mt-1">
                {letterData.signature}
              </p>
              <p className="text-xs text-[#BE123C] font-sans font-medium mt-0.5">{letterData.husbandName}</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#E11D48] to-[#9D174D] text-white shadow-md">
              <Heart className="h-6 w-6 fill-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
