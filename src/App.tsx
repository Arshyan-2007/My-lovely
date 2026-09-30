/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PetalCanvas } from './components/PetalCanvas';
import { RomanticAudioPlayer } from './components/RomanticAudioPlayer';
import { TopNavbar } from './components/TopNavbar';
import { HeroSection } from './components/HeroSection';
import { LoveLetterSection } from './components/LoveLetterSection';
import { LoveLetterModal } from './components/LoveLetterModal';
import { AnimatedGallery } from './components/AnimatedGallery';
import { PhotoLightbox } from './components/PhotoLightbox';
import { InteractiveSurprises } from './components/InteractiveSurprises';
import { FooterSection } from './components/FooterSection';
import { INITIAL_LOVE_LETTER, INITIAL_MEMORIES, LOVE_REASONS } from './data/initialData';
import { PhotoMemory, LoveLetterData, AppTheme } from './types';
import { THEME_CONFIGS } from './utils/theme';
import { saveMemoriesToStorage, loadMemoriesFromStorage } from './utils/imageStorage';

const STORAGE_KEY_LETTER = 'fairytale_birthday_letter_v4';
const STORAGE_KEY_MEMORIES = 'fairytale_birthday_memories_v4';
const STORAGE_KEY_THEME = 'fairytale_birthday_theme_v4';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<AppTheme>(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) as AppTheme;
      if (savedTheme === 'rose' || savedTheme === 'lavender' || savedTheme === 'champagne') {
        return savedTheme;
      }
    } catch {
      // ignore
    }
    return 'rose';
  });

  const [letterData, setLetterData] = useState<LoveLetterData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LETTER);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_LOVE_LETTER;
  });

  const [memories, setMemories] = useState<PhotoMemory[]>(INITIAL_MEMORIES);

  const [isLetterModalOpen, setIsLetterModalOpen] = useState<boolean>(false);
  const [selectedLightboxPhoto, setSelectedLightboxPhoto] = useState<PhotoMemory | null>(null);

  const handleThemeChange = (theme: AppTheme) => {
    setCurrentTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch {
      // ignore
    }
  };

  const handleSaveMemories = (newMemories: PhotoMemory[]) => {
    setMemories(newMemories);
    saveMemoriesToStorage(newMemories);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextLightbox = () => {
    if (!selectedLightboxPhoto) return;
    const currentIdx = memories.findIndex((m) => m.id === selectedLightboxPhoto.id);
    if (currentIdx !== -1) {
      const nextIdx = (currentIdx + 1) % memories.length;
      setSelectedLightboxPhoto(memories[nextIdx]);
    }
  };

  const handlePrevLightbox = () => {
    if (!selectedLightboxPhoto) return;
    const currentIdx = memories.findIndex((m) => m.id === selectedLightboxPhoto.id);
    if (currentIdx !== -1) {
      const prevIdx = (currentIdx - 1 + memories.length) % memories.length;
      setSelectedLightboxPhoto(memories[prevIdx]);
    }
  };

  const themeConfig = THEME_CONFIGS[currentTheme] || THEME_CONFIGS.rose;

  const bgStyles = {
    rose: 'bg-[#FFF8FA]',
    lavender: 'bg-[#FAF7FD]',
    champagne: 'bg-[#FCFAF5]'
  }[currentTheme];

  return (
    <div 
      data-theme={currentTheme}
      className={`min-h-screen relative font-sans ${bgStyles} transition-colors duration-500`}
    >
      {/* 60fps Falling Rose Petals & Golden Starlight Sparks */}
      <PetalCanvas />

      {/* Romantic Audio Soundscape Synthesizer */}
      <RomanticAudioPlayer />

      {/* Top Bar with 3-zone contract & Active Theme Switcher */}
      <TopNavbar
        currentTheme={currentTheme}
        onChangeTheme={handleThemeChange}
        onOpenLetter={() => setIsLetterModalOpen(true)}
        onScrollToSection={scrollToSection}
      />

      <main>
        {/* Fairy Tale Hero Section */}
        <HeroSection
          recipientName={letterData.recipientName}
          currentTheme={currentTheme}
          onOpenLetter={() => setIsLetterModalOpen(true)}
          onScrollToGallery={() => scrollToSection('gallery-section')}
          onScrollToReasons={() => scrollToSection('reasons-section')}
          onScrollToWish={() => scrollToSection('wish-section')}
        />

        {/* Heartfelt Scrolling Digital Love Letter */}
        <LoveLetterSection
          letterData={letterData}
          currentTheme={currentTheme}
          onOpenModal={() => setIsLetterModalOpen(true)}
        />

        {/* Highly Animated Photo Gallery with Auto-Playing 3D Carousel & Flowing Filmstrip */}
        <AnimatedGallery
          memories={memories}
          currentTheme={currentTheme}
          onSelectPhotoForLightbox={(photo) => setSelectedLightboxPhoto(photo)}
          onDeleteMemory={(id) => {
            const updated = memories.filter((m) => m.id !== id);
            handleSaveMemories(updated);
          }}
        />

        {/* Interactive Surprises: Reasons I Love You, Real Cake Candle Blow & Gift Box */}
        <InteractiveSurprises
          reasons={LOVE_REASONS}
          recipientName={letterData.recipientName}
          currentTheme={currentTheme}
        />
      </main>

      {/* Dedication Footer */}
      <FooterSection
        recipientName={letterData.recipientName}
        husbandName={letterData.husbandName}
        onOpenLetter={() => setIsLetterModalOpen(true)}
      />

      {/* Fullscreen Reading Scroll Modal */}
      <LoveLetterModal
        isOpen={isLetterModalOpen}
        onClose={() => setIsLetterModalOpen(false)}
        letterData={letterData}
      />

      {/* High-Resolution Cinematic Lightbox */}
      <PhotoLightbox
        photo={selectedLightboxPhoto}
        onClose={() => setSelectedLightboxPhoto(null)}
        onNext={handleNextLightbox}
        onPrev={handlePrevLightbox}
      />
    </div>
  );
}
