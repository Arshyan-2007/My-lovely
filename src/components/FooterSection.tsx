import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

interface FooterSectionProps {
  recipientName: string;
  husbandName: string;
  onOpenLetter: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  recipientName,
  husbandName,
  onOpenLetter
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#FBCFE8] bg-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Dedication */}
        <div className="text-center md:text-left space-y-1">
          <p className="font-display font-medium text-lg text-[#1E1624]">
            Forever With You
          </p>
          <p className="text-xs font-sans text-[#4C2838]">
            Crafted with boundless love for {recipientName || 'Meri Jaan'} by {husbandName || 'Aapka Humsafar'}.
          </p>
        </div>

        {/* Quiet Quick Links */}
        <div className="flex items-center gap-6 text-xs font-sans text-[#4C2838]">
          <button
            onClick={onOpenLetter}
            className="hover:text-[#E11D48] transition-colors underline-offset-4 hover:underline"
          >
            Love Letter
          </button>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-[#E11D48] transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>

        {/* Heart Marker */}
        <div className="flex items-center gap-1.5 text-xs text-[#BE123C] font-sans font-semibold">
          <span>Always & Forever</span>
          <Heart className="h-3.5 w-3.5 fill-[#E11D48] text-[#E11D48]" />
        </div>
      </div>
    </footer>
  );
};
