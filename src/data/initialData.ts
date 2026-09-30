import { PhotoMemory, LoveLetterData, LoveReason } from '../types';
import { ALL_WIFE_PHOTOS } from './photos';

export const INITIAL_LOVE_LETTER: LoveLetterData = {
  recipientName: 'Meri Jaan',
  husbandName: 'Aapka Humsafar',
  greeting: 'Meri Pyari Biwi, Meri Zindagi,',
  letterTitle: 'To The Woman Who Turned My Life Into A Fairy Tale',
  paragraphs: [
    'Today is not just another day on the calendar; it is the day the most beautiful soul graced this world. From the moment you walked into my life, every grey shadow turned into golden sunlight, and every heartbeat found its true rhythm.',
    'You are my morning peace and my midnight comfort. In your eyes, I found a home where my soul finally feels at rest. Your gentle laugh is my favourite melody, and your kindness inspires me to be a better person each day.',
    'Thank you for standing by me through every storm and every sunshine, for holding my hand when paths were uncertain, and for filling our little corner of the world with warmth, laughter, and endless grace.',
    'Happy Birthday, my beloved queen. May this new year bring you all the magic, joy, and starlight that you so effortlessly bestow upon everyone around you. I love you deeper today than yesterday, and forever more tomorrow.'
  ],
  urduPoem: {
    lines: [
      '“Tere hone se hi meri zindagi gulzar hai,',
      'Tu hi meri manzil, tu hi mera aitbaar hai.',
      'Dua hai rab se har khushi mile tujhe jahan ki,',
      'Mera har ek lamha ab sirf tera talabgar hai.”'
    ],
    translation: '“Because of your presence, my entire life blooms like an eternal garden; You are my destination, you are my deepest faith.”',
    poet: 'Written from the bottom of my heart'
  },
  closingMessage: 'With all my soul and endless love, always and forever,',
  signature: 'Your Husband & Eternal Admirer',
  anniversaryOrDate: 'On Your Special Day'
};

// All wife photos compiled directly into code for 100% reliable deployment on Netlify, Vercel, and GitHub
export const INITIAL_MEMORIES: PhotoMemory[] = ALL_WIFE_PHOTOS.map((photoUrl, index) => ({
  id: `wife-memory-${index + 1}`,
  url: photoUrl,
  title: 'My Beautiful Queen',
  caption: 'Forever cherished in my heart.',
  date: '',
  location: '',
  chapter: '',
  rotation: 0
}));

export const LOVE_REASONS: LoveReason[] = [
  {
    id: 1,
    title: 'Your Radiant Smile',
    description: 'The way your whole face lights up when you smile, instantly wiping away any tiredness or worry from my world.',
    iconName: 'Sparkles'
  },
  {
    id: 2,
    title: 'Your Pure Heart',
    description: 'Your tenderness and empathy towards everyone. You make this cruel world feel gentle and full of hope.',
    iconName: 'Heart'
  },
  {
    id: 3,
    title: 'Our Midnight Talks',
    description: 'The late-night conversations about everything and nothing, sharing laughter and silly thoughts in the quiet dark.',
    iconName: 'Moon'
  },
  {
    id: 4,
    title: 'Your Unwavering Belief',
    description: 'When the world doubts me, your eyes always tell me that I am capable of moving mountains. You are my greatest strength.',
    iconName: 'ShieldCheck'
  },
  {
    id: 5,
    title: 'How You Care For Me',
    description: 'The countless little ways you show love without saying a word — a warm cup, a gentle touch, a concerned gaze.',
    iconName: 'Coffee'
  },
  {
    id: 6,
    title: 'The Peace in Your Hugs',
    description: 'In your embrace, the noise of the entire universe fades away and only calmness remains.',
    iconName: 'Sun'
  }
];

export const BIRTHDAY_WISHES_LIST = [
  "May your laughter always echo in our home.",
  "May all your secret dreams and silent prayers come true.",
  "May you be blessed with blooming health and peace of mind.",
  "May our love grow sweeter and deeper with each passing season.",
  "May you always feel cherished, respected, and endlessly adored."
];
