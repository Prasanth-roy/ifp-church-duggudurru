import { BIBLE_VERSES, VERSE_BACKGROUNDS } from './constants';

// Generate a unique verse for each day
export const getDailyVerse = () => {
  const today = new Date();
  const startDate = new Date('2024-01-01'); // Start from a fixed date
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Use the day difference to select a verse (cycles through all verses)
  const verseIndex = diffDays % BIBLE_VERSES.length;
  const backgroundIndex = diffDays % VERSE_BACKGROUNDS.length;
  
  const selectedVerse = BIBLE_VERSES[verseIndex];
  const selectedBackground = VERSE_BACKGROUNDS[backgroundIndex];
  
  return {
    id: diffDays + 1,
    date: today.toISOString().split('T')[0],
    ref: selectedVerse.ref,
    telugu_text: selectedVerse.telugu_text,
    english_text: selectedVerse.english_text,
    tags: selectedVerse.tags,
    bg_image_url: selectedBackground
  };
};

// Get verse for a specific date
export const getVerseForDate = (dateString) => {
  const date = new Date(dateString);
  const startDate = new Date('2024-01-01');
  const diffTime = Math.abs(date - startDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const verseIndex = diffDays % BIBLE_VERSES.length;
  const backgroundIndex = diffDays % VERSE_BACKGROUNDS.length;
  
  const selectedVerse = BIBLE_VERSES[verseIndex];
  const selectedBackground = VERSE_BACKGROUNDS[backgroundIndex];
  
  return {
    id: diffDays + 1,
    date: dateString,
    ref: selectedVerse.ref,
    telugu_text: selectedVerse.telugu_text,
    english_text: selectedVerse.english_text,
    tags: selectedVerse.tags,
    bg_image_url: selectedBackground
  };
};

// Generate multiple verses for display
export const generateVerses = (count = 30) => {
  const verses = [];
  const today = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const verse = getVerseForDate(date.toISOString().split('T')[0]);
    verses.push(verse);
  }
  
  return verses;
};