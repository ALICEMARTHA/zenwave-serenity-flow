
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

interface StressLevel {
  level: 'low' | 'moderate' | 'high';
  score: number;
  factors: string[];
  recommendations: string[];
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
  getStressLevel: () => StressLevel;
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
    // Calm affirmations
    { id: '1', text: 'I am at peace with myself and the world around me', category: 'calm', language: 'en' },
    { id: '2', text: 'My mind is calm and my body is relaxed', category: 'calm', language: 'en' },
    { id: '3', text: 'I breathe in peace and exhale all tension', category: 'calm', language: 'en' },
    { id: '4', text: 'I am centered and grounded in this moment', category: 'calm', language: 'en' },
    { id: '5', text: 'Serenity flows through my entire being', category: 'calm', language: 'en' },
    { id: '6', text: 'I choose peace over worry in every situation', category: 'calm', language: 'en' },
    
    // Courage affirmations
    { id: '7', text: 'I have the courage to face any challenge', category: 'courage', language: 'en' },
    { id: '8', text: 'I am brave and bold in pursuing my dreams', category: 'courage', language: 'en' },
    { id: '9', text: 'Fear does not control my decisions', category: 'courage', language: 'en' },
    { id: '10', text: 'I step out of my comfort zone with confidence', category: 'courage', language: 'en' },
    { id: '11', text: 'Every challenge makes me stronger and wiser', category: 'courage', language: 'en' },
    { id: '12', text: 'I face uncertainty with an open heart', category: 'courage', language: 'en' },
    
    // Clarity affirmations
    { id: '13', text: 'My mind is clear and focused', category: 'clarity', language: 'en' },
    { id: '14', text: 'I see solutions where others see problems', category: 'clarity', language: 'en' },
    { id: '15', text: 'My thoughts are organized and purposeful', category: 'clarity', language: 'en' },
    { id: '16', text: 'I trust my inner wisdom to guide me', category: 'clarity', language: 'en' },
    { id: '17', text: 'The path forward becomes clearer with each step', category: 'clarity', language: 'en' },
    { id: '18', text: 'I release confusion and embrace understanding', category: 'clarity', language: 'en' },
    
    // Confidence affirmations
    { id: '19', text: 'I believe in my abilities and trust my decisions', category: 'confidence', language: 'en' },
    { id: '20', text: 'I am worthy of success and happiness', category: 'confidence', language: 'en' },
    { id: '21', text: 'My potential is limitless and my future is bright', category: 'confidence', language: 'en' },
    { id: '22', text: 'I speak up for myself with grace and conviction', category: 'confidence', language: 'en' },
    { id: '23', text: 'I am enough exactly as I am right now', category: 'confidence', language: 'en' },
    { id: '24', text: 'Success flows naturally to me', category: 'confidence', language: 'en' },
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

  const getStressLevel = (): StressLevel => {
    const recentMoods = moods.slice(0, 7); // Last 7 moods
    const recentJournals = journalEntries.slice(0, 5); // Last 5 journal entries
    
    let stressScore = 0;
    const factors: string[] = [];
    const recommendations: string[] = [];

    // Analyze moods
    const stressfulMoods = recentMoods.filter(mood => 
      ['Anxious', 'Frustrated', 'Sad'].includes(mood.name)
    );
    
    if (stressfulMoods.length > recentMoods.length * 0.6) {
      stressScore += 40;
      factors.push('Frequent negative moods detected');
    }

    // Analyze journal content for stress indicators
    const stressKeywords = ['stress', 'anxious', 'worried', 'overwhelmed', 'tired', 'frustrated', 'difficult', 'hard'];
    const journalStressCount = recentJournals.reduce((count, entry) => {
      const lowerContent = entry.content.toLowerCase();
      return count + stressKeywords.filter(keyword => lowerContent.includes(keyword)).length;
    }, 0);

    if (journalStressCount > 3) {
      stressScore += 30;
      factors.push('Stress-related themes in journal entries');
    }

    // Check for mood consistency
    if (recentMoods.length > 3) {
      const moodVariety = new Set(recentMoods.map(m => m.name)).size;
      if (moodVariety < 2) {
        stressScore += 20;
        factors.push('Limited emotional range');
      }
    }

    // Determine stress level and recommendations
    let level: 'low' | 'moderate' | 'high';
    if (stressScore < 30) {
      level = 'low';
      recommendations.push('Keep up your positive wellness routine');
      recommendations.push('Try gratitude journaling to maintain balance');
    } else if (stressScore < 60) {
      level = 'moderate';
      recommendations.push('Consider stress-reduction techniques like deep breathing');
      recommendations.push('Try calming affirmations and sound therapy');
      recommendations.push('Maintain regular journaling for emotional awareness');
    } else {
      level = 'high';
      recommendations.push('Focus on calming activities and mindfulness');
      recommendations.push('Consider speaking with a mental health professional');
      recommendations.push('Use courage affirmations to build resilience');
      recommendations.push('Practice regular self-care and stress management');
    }

    return { level, score: stressScore, factors, recommendations };
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
      toggleTheme,
      getStressLevel
    }}>
      {children}
    </AppContext.Provider>
  );
};
