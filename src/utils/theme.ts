import { AppTheme } from '../types';

export interface ThemeConfig {
  id: AppTheme;
  name: string;
  iconColor: string;
  primary: string;
  primaryHover: string;
  primaryGradient: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  cardBg: string;
  lightBg: string;
  subtextColor: string;
  headingColor: string;
  heartColor: string;
}

export const THEME_CONFIGS: Record<AppTheme, ThemeConfig> = {
  rose: {
    id: 'rose',
    name: 'Luminous Rosé',
    iconColor: '#E11D48',
    primary: '#E11D48',
    primaryHover: '#BE123C',
    primaryGradient: 'from-[#BE123C] to-[#E11D48]',
    badgeBg: 'bg-[#FFE4EC]',
    badgeText: 'text-[#BE123C]',
    borderColor: 'border-[#FBCFE8]',
    cardBg: 'bg-white',
    lightBg: 'bg-[#FFF5F8]',
    subtextColor: 'text-[#5F2E45]',
    headingColor: 'text-[#1E1624]',
    heartColor: '#E11D48'
  },
  lavender: {
    id: 'lavender',
    name: 'Lavender Dream',
    iconColor: '#8B5CF6',
    primary: '#8B5CF6',
    primaryHover: '#7C3AED',
    primaryGradient: 'from-[#7C3AED] to-[#8B5CF6]',
    badgeBg: 'bg-[#EDE9FE]',
    badgeText: 'text-[#6D28D9]',
    borderColor: 'border-[#DDD6FE]',
    cardBg: 'bg-white',
    lightBg: 'bg-[#F5F3FF]',
    subtextColor: 'text-[#4A3869]',
    headingColor: 'text-[#181126]',
    heartColor: '#8B5CF6'
  },
  champagne: {
    id: 'champagne',
    name: 'Champagne Gold',
    iconColor: '#D97706',
    primary: '#D97706',
    primaryHover: '#B45309',
    primaryGradient: 'from-[#B45309] to-[#D97706]',
    badgeBg: 'bg-[#FEF3C7]',
    badgeText: 'text-[#92400E]',
    borderColor: 'border-[#FDE68A]',
    cardBg: 'bg-white',
    lightBg: 'bg-[#FFFDF0]',
    subtextColor: 'text-[#594030]',
    headingColor: 'text-[#241A14]',
    heartColor: '#D97706'
  }
};
