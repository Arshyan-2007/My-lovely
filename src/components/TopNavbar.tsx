import React, { useState } from 'react';
import { Feather, Palette, Check, Menu, X, Heart, Sparkles, Image as ImageIcon, Gift } from 'lucide-react';
import { AppTheme } from '../types';
import { THEME_CONFIGS } from '../utils/theme';

interface TopNavbarProps {
  currentTheme: AppTheme;
  onChangeTheme: (theme: AppTheme) => void;
  onOpenLetter: () => void;
  onScrollToSection: (id: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentTheme,
  onChangeTheme,
  onOpenLetter,
  onScrollToSection
}) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = THEME_CONFIGS[currentTheme] || THEME_CONFIGS.rose;

  const handleMobileNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onScrollToSection(sectionId);
  };

  return (
    <header 
      className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur-md transition-colors duration-300"
      style={{ borderColor: theme.primary + '25' }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark with generous right spacing (NEVER collides) */}
        <div className="flex items-center shrink-0 mr-6 lg:mr-10">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`text-lg sm:text-2xl font-bold tracking-tight ${theme.headingColor} transition-colors whitespace-nowrap`}
          >
            Forever With You
          </a>
        </div>

        {/* Zone 2: Clean, concise text navigation links with generous gaps (Hidden below xl to avoid crowding) */}
        <nav className="hidden xl:flex items-center gap-7 text-sm font-semibold text-gray-700 mx-auto px-4">
          <button
            onClick={() => onScrollToSection('letter-section')}
            className="hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap py-1"
            style={{ color: theme.headingColor }}
          >
            Love Letter
          </button>
          <button
            onClick={() => onScrollToSection('gallery-section')}
            className="hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap py-1"
            style={{ color: theme.headingColor }}
          >
            Memories
          </button>
          <button
            onClick={() => onScrollToSection('reasons-section')}
            className="hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap py-1"
            style={{ color: theme.headingColor }}
          >
            Reasons I Love You
          </button>
          <button
            onClick={() => onScrollToSection('wish-section')}
            className="hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap py-1"
            style={{ color: theme.headingColor }}
          >
            Birthday Wish
          </button>
          <button
            onClick={() => onScrollToSection('surprise-box')}
            className="hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap py-1"
            style={{ color: theme.headingColor }}
          >
            Surprise Vault
          </button>
        </nav>

        {/* Zone 3: 2 Primary actions with dedicated left separation and generous gaps */}
        <div className="flex items-center gap-3 shrink-0 ml-4 lg:ml-8">
          {/* Theme Selector Popover */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex items-center gap-2 rounded-full border bg-white px-3.5 py-1.5 text-xs font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0 hover:bg-gray-50"
              style={{
                borderColor: theme.primary + '44',
                color: theme.primary
              }}
              title="Change Color Theme"
            >
              <Palette className="h-4 w-4 shrink-0" style={{ color: theme.primary }} />
              <span className="hidden sm:inline whitespace-nowrap">{theme.name}</span>
            </button>

            {showThemeMenu && (
              <div 
                className="absolute right-0 mt-2 w-48 rounded-2xl border bg-white p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150"
                style={{ borderColor: theme.primary + '33' }}
              >
                <span className="block px-2.5 py-1 text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Pick Theme
                </span>
                
                <button
                  onClick={() => {
                    onChangeTheme('rose');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    currentTheme === 'rose' ? 'bg-rose-50 text-rose-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-3.5 w-3.5 rounded-full bg-[#E11D48] shrink-0" />
                    <span className="whitespace-nowrap">Luminous Rosé</span>
                  </div>
                  {currentTheme === 'rose' && <Check className="h-3.5 w-3.5 text-rose-600 shrink-0" />}
                </button>

                <button
                  onClick={() => {
                    onChangeTheme('lavender');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    currentTheme === 'lavender' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-3.5 w-3.5 rounded-full bg-[#8B5CF6] shrink-0" />
                    <span className="whitespace-nowrap">Lavender Dream</span>
                  </div>
                  {currentTheme === 'lavender' && <Check className="h-3.5 w-3.5 text-purple-600 shrink-0" />}
                </button>

                <button
                  onClick={() => {
                    onChangeTheme('champagne');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    currentTheme === 'champagne' ? 'bg-amber-50 text-amber-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-3.5 w-3.5 rounded-full bg-[#D97706] shrink-0" />
                    <span className="whitespace-nowrap">Champagne Gold</span>
                  </div>
                  {currentTheme === 'champagne' && <Check className="h-3.5 w-3.5 text-amber-600 shrink-0" />}
                </button>
              </div>
            )}
          </div>

          {/* Primary Action Button: The Letter */}
          <button
            onClick={onOpenLetter}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-xs transition-all cursor-pointer hover:opacity-95 whitespace-nowrap shrink-0"
            style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryHover} 100%)`
            }}
          >
            <Feather className="h-3.5 w-3.5 text-white shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">The Letter</span>
          </button>

          {/* Mobile Hamburger Menu Button (shown on screens < xl) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden flex h-9 w-9 items-center justify-center rounded-full border bg-white shadow-xs cursor-pointer ml-1 shrink-0"
            style={{
              borderColor: theme.primary + '33',
              color: theme.primary
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer / Navigation Dropdown */}
      {mobileMenuOpen && (
        <div 
          className="xl:hidden border-t bg-white/98 backdrop-blur-lg px-4 pt-3 pb-5 shadow-2xl animate-in slide-in-from-top-2 duration-200"
          style={{ borderColor: theme.primary + '25' }}
        >
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-800">
            <button
              onClick={() => handleMobileNavClick('letter-section')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
              <Feather className="h-4 w-4 shrink-0" style={{ color: theme.primary }} />
              <span className="whitespace-nowrap">Love Letter</span>
            </button>

            <button
              onClick={() => handleMobileNavClick('gallery-section')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
              <ImageIcon className="h-4 w-4 shrink-0" style={{ color: theme.primary }} />
              <span className="whitespace-nowrap">Memories</span>
            </button>

            <button
              onClick={() => handleMobileNavClick('reasons-section')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
              <Heart className="h-4 w-4 shrink-0" style={{ color: theme.primary }} />
              <span className="whitespace-nowrap">Reasons I Love You</span>
            </button>

            <button
              onClick={() => handleMobileNavClick('wish-section')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
              <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
              <span className="whitespace-nowrap">Birthday Wish & Cake</span>
            </button>

            <button
              onClick={() => handleMobileNavClick('surprise-box')}
              className="col-span-2 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-center"
            >
              <Gift className="h-4 w-4 shrink-0" style={{ color: theme.primary }} />
              <span className="whitespace-nowrap">Birthday Surprise Vault</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
