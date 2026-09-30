import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  Moon, 
  Sun, 
  ShieldCheck, 
  Coffee, 
  Gift, 
  BookmarkCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LoveReason, AppTheme } from '../types';
import { THEME_CONFIGS } from '../utils/theme';
import { BirthdayCakeInteractive } from './BirthdayCakeInteractive';

interface InteractiveSurprisesProps {
  reasons: LoveReason[];
  recipientName: string;
  currentTheme: AppTheme;
}

export const InteractiveSurprises: React.FC<InteractiveSurprisesProps> = ({
  reasons,
  recipientName,
  currentTheme
}) => {
  const theme = THEME_CONFIGS[currentTheme] || THEME_CONFIGS.rose;
  const [openedBox, setOpenedBox] = useState<boolean>(false);
  const [activeReasonId, setActiveReasonId] = useState<number | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="h-5 w-5 text-amber-500" />;
      case 'Heart':
        return <Heart className="h-5 w-5" style={{ color: theme.primary }} />;
      case 'Moon':
        return <Moon className="h-5 w-5 text-indigo-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-5 w-5" style={{ color: theme.primary }} />;
      case 'Coffee':
        return <Coffee className="h-5 w-5 text-amber-700" />;
      case 'Sun':
        return <Sun className="h-5 w-5 text-amber-500" />;
      default:
        return <Heart className="h-5 w-5" style={{ color: theme.primary }} />;
    }
  };

  const handleOpenGiftBox = () => {
    setOpenedBox(true);
    confetti({
      particleCount: 65,
      spread: 75,
      origin: { y: 0.7 },
      colors: [theme.primary, '#F59E0B', '#FFF']
    });
  };

  return (
    <div className="space-y-24 py-12">
      {/* SECTION: Reasons Why I Love You */}
      <section id="reasons-section" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest px-3.5 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} mb-3`}>
            <span>Whispers of Devotion</span>
            <span aria-hidden="true">·</span>
            <span>Little Things That Make You Rare</span>
          </div>

          <h2 className={`text-3xl sm:text-5xl font-bold tracking-tight ${theme.headingColor}`}>
            Reasons My Heart Chose You
          </h2>
          <p className={`mt-2 text-sm sm:text-base font-medium max-w-xl mx-auto ${theme.subtextColor}`}>
            “Thousands of reasons, but here are a few gentle truths that make me fall in love every day.”
          </p>
        </div>

        {/* Reasons Grid with Interactive Expand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => {
            const isSelected = activeReasonId === reason.id;
            return (
              <div
                key={reason.id}
                onClick={() => setActiveReasonId(isSelected ? null : reason.id)}
                className={`group cursor-pointer rounded-2xl border-2 transition-all duration-300 p-6 ${
                  isSelected
                    ? `shadow-xl -translate-y-1 ${theme.borderColor} ${theme.lightBg}`
                    : `bg-white hover:shadow-md border-gray-100 hover:${theme.borderColor}`
                }`}
                style={{
                  borderColor: isSelected ? theme.primary : undefined
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${theme.badgeBg}`}>
                    {getIcon(reason.iconName)}
                  </div>
                  <span className="font-numbers font-bold text-sm tabular-nums" style={{ color: theme.primary }}>
                    #{reason.id.toString().padStart(2, '0')}
                  </span>
                </div>

                <h3 className={`text-lg font-bold ${theme.headingColor} transition-colors group-hover:opacity-90`}>
                  {reason.title}
                </h3>

                <p className={`mt-2 text-xs leading-relaxed font-normal ${theme.subtextColor}`}>
                  {reason.description}
                </p>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <span className={`font-medium ${theme.subtextColor}`}>Always & truly</span>
                  <Heart
                    className={`h-4 w-4 transition-transform ${isSelected ? 'scale-125' : ''}`}
                    style={{
                      fill: isSelected ? theme.primary : 'none',
                      color: theme.primary
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION: Make a Birthday Wish & Realistic Custom-Coded Birthday Cake */}
      <section id="wish-section" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div 
          className="rounded-3xl border-2 bg-gradient-to-b from-white to-gray-50/50 p-6 sm:p-10 shadow-xl text-center overflow-hidden fairy-glow relative"
          style={{ borderColor: theme.primary + '33' }}
        >
          <div className={`inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest px-3.5 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} mb-2`}>
            <span>A Sacred Moment</span>
            <span aria-hidden="true">·</span>
            <span>Make Your Birthday Wish</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${theme.headingColor}`}>
            Close Your Eyes & Make A Wish
          </h2>
          <p className={`mt-2 text-sm sm:text-base font-normal max-w-lg mx-auto ${theme.subtextColor}`}>
            Whisper your most cherished dream into the universe. Today, all the angels are listening for your voice.
          </p>

          {/* Dedicated Programmatically Coded Vector 3D Cake (Zero static pictures) */}
          <BirthdayCakeInteractive recipientName={recipientName} theme={theme} />
        </div>
      </section>

      {/* SECTION: Birthday Gift Box Surprise (NO sharp cone fonts!) */}
      <section id="surprise-box" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div 
          className="rounded-3xl border-2 bg-white p-8 sm:p-12 shadow-lg text-center"
          style={{ borderColor: theme.primary + '33' }}
        >
          <div className={`inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest px-3.5 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} mb-2`}>
            <span>Special Delivery</span>
            <span aria-hidden="true">·</span>
            <span>A Golden Promise</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${theme.headingColor}`}>
            The Birthday Surprise Vault
          </h2>
          <p className={`mt-2 text-sm sm:text-base font-normal ${theme.subtextColor}`}>
            Untie the satin ribbon to reveal your exclusive husband promise coupons.
          </p>

          <div className="my-8 flex justify-center">
            {!openedBox ? (
              <button
                onClick={handleOpenGiftBox}
                className="group relative flex flex-col items-center justify-center p-8 sm:p-10 rounded-3xl border-2 border-dashed transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                style={{
                  borderColor: theme.primary,
                  backgroundColor: theme.id === 'rose' ? '#FFF5F8' : theme.id === 'lavender' ? '#F5F3FF' : '#FFFDF0'
                }}
              >
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-2xl text-white shadow-lg group-hover:rotate-3 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryHover} 100%)`
                  }}
                >
                  <Gift className="h-10 w-10 text-white" />
                </div>

                {/* Round, solid, friendly font - ZERO pointy cone serifs! */}
                <span className={`mt-4 font-bold text-xl sm:text-2xl tracking-tight ${theme.headingColor}`}>
                  Tap to Untie the Ribbon
                </span>
                <span className={`text-xs font-medium mt-1 ${theme.subtextColor}`}>
                  Prepared with love for your birthday
                </span>
              </button>
            ) : (
              <div
                className="rounded-3xl border-2 p-6 sm:p-8 max-w-xl text-left shadow-lg bg-white"
                style={{ borderColor: theme.primary + '44' }}
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <BookmarkCheck className="h-5 w-5" style={{ color: theme.primary }} />
                    <span className={`font-bold text-lg ${theme.headingColor}`}>
                      Lifetime Love Guarantee
                    </span>
                  </div>
                  <span className="text-xs font-numbers font-bold" style={{ color: theme.primary }}>
                    No Expiry Date
                  </span>
                </div>

                <div className="space-y-3 text-sm leading-relaxed" style={{ color: '#2B1B27' }}>
                  <div className="flex items-start gap-2.5">
                    <Heart className="h-4 w-4 mt-1 shrink-0" style={{ fill: theme.primary, color: theme.primary }} />
                    <span><strong>Unconditional Pampering:</strong> You never have to apologize for having a rough day; I will always be your soft place to land.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Heart className="h-4 w-4 mt-1 shrink-0" style={{ fill: theme.primary, color: theme.primary }} />
                    <span><strong>A Special Birthday Treat:</strong> Redeemable for your favourite dinner, dessert date, and shopping spree without asking twice!</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Heart className="h-4 w-4 mt-1 shrink-0" style={{ fill: theme.primary, color: theme.primary }} />
                    <span><strong>Infinite Listening Vow:</strong> Whatever is on your mind, I am here to listen, support, and protect your happiness forever.</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-script text-3xl" style={{ color: theme.primary }}>
                    Signed with eternal love
                  </span>
                  <button
                    onClick={() => setOpenedBox(false)}
                    className="font-bold underline cursor-pointer"
                    style={{ color: theme.primary }}
                  >
                    Close box
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
