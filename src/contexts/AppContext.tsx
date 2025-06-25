
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Mood {
  id: string;
  emoji: string;
  name: string;
  timestamp: string;
}

interface Affirmation {
  id: string;
  text: string;
  category: 'calm' | 'courage' | 'clarity' | 'confidence';
  language: string;
  isFavorite?: boolean;
}

interface JournalEntry {
  id: string;
  content: string;
  prompt?: string;
  timestamp: string;
}

interface AppContextType {
  currentMood: Mood | null;
  setCurrentMood: (mood: Mood) => void;
  moods: Mood[];
  affirmations: Affirmation[];
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => void;
  toggleFavoriteAffirmation: (id: string) => void;
  isOffline: boolean;
  language: string;
  setLanguage: (lang: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);
  const [moods, setMoods] = useState<Mood[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [affirmations] = useState<Affirmation[]>([
    { id: '1', text: 'I am at peace with myself and the world around me', category: 'calm', language: 'en' },
    { id: '2', text: 'I have the courage to face any challenge', category: 'courage', language: 'en' },
    { id: '3', text: 'My mind is clear and focused', category: 'clarity', language: 'en' },
    { id: '4', text: 'I believe in my abilities and trust my decisions', category: 'confidence', language: 'en' },
  ]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addJournalEntry = (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    setJournalEntries(prev => [newEntry, ...prev]);
  };

  const toggleFavoriteAffirmation = (id: string) => {
    // This would update the affirmation in the database
    console.log('Toggling favorite for affirmation:', id);
  };

  const handleSetCurrentMood = (mood: Mood) => {
    setCurrentMood(mood);
    setMoods(prev => [mood, ...prev.slice(0, 29)]); // Keep last 30 moods
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider value={{
      currentMood,
      setCurrentMood: handleSetCurrentMood,
      moods,
      affirmations,
      journalEntries,
      addJournalEntry,
      toggleFavoriteAffirmation,
      isOffline,
      language,
      setLanguage,
      theme,
      toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
};
