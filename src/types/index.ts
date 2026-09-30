export type AppTheme = 'rose' | 'lavender' | 'champagne';

export interface PhotoMemory {
  id: string;
  url: string;
  title: string;
  caption: string;
  date?: string;
  location?: string;
  chapter?: string;
  rotation?: number;
}

export interface LoveLetterData {
  recipientName: string;
  husbandName: string;
  greeting: string;
  letterTitle: string;
  paragraphs: string[];
  urduPoem: {
    lines: string[];
    translation: string;
    poet?: string;
  };
  closingMessage: string;
  signature: string;
  anniversaryOrDate: string;
}

export interface LoveReason {
  id: number;
  title: string;
  description: string;
  iconName: string;
}
