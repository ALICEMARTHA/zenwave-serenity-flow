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

  const [allAffirmations] = useState<Record<string, Affirmation[]>>({
    en: [
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
    ],
    sw: [
      // Calm affirmations in Swahili
      { id: '1', text: 'Niko katika amani na mimi mwenyewe na ulimwengu wote', category: 'calm', language: 'sw' },
      { id: '2', text: 'Akili yangu ni tulivu na mwili wangu umepumzika', category: 'calm', language: 'sw' },
      { id: '3', text: 'Najibu amani na kupumua nje mvutano wote', category: 'calm', language: 'sw' },
      { id: '4', text: 'Niko katikati na imara katika wakati huu', category: 'calm', language: 'sw' },
      { id: '5', text: 'Utulivu unatiririsha kupitia kiumbe changu chote', category: 'calm', language: 'sw' },
      { id: '6', text: 'Nachagua amani badala ya wasiwasi katika kila hali', category: 'calm', language: 'sw' },
      
      // Courage affirmations in Swahili
      { id: '7', text: 'Nina ujasiri wa kukabiliana na changamoto yoyote', category: 'courage', language: 'sw' },
      { id: '8', text: 'Mimi ni jasiri na mkuu katika kufuata ndoto zangu', category: 'courage', language: 'sw' },
      { id: '9', text: 'Hofu haidhibiti maamuzi yangu', category: 'courage', language: 'sw' },
      { id: '10', text: 'Natoka nje ya eneo langu la starehe kwa ujasiri', category: 'courage', language: 'sw' },
      { id: '11', text: 'Kila changamoto hunifanya kuwa mwenye nguvu na hekima zaidi', category: 'courage', language: 'sw' },
      { id: '12', text: 'Nakabiliana na kutokujua kwa moyo wazi', category: 'courage', language: 'sw' },
      
      // Clarity affirmations in Swahili
      { id: '13', text: 'Akili yangu ni wazi na imelenga', category: 'clarity', language: 'sw' },
      { id: '14', text: 'Naona suluhisho ambapo wengine wanaona matatizo', category: 'clarity', language: 'sw' },
      { id: '15', text: 'Mawazo yangu yamepangwa na yana lengo', category: 'clarity', language: 'sw' },
      { id: '16', text: 'Natumaini hekima yangu ya ndani kuniongoza', category: 'clarity', language: 'sw' },
      { id: '17', text: 'Njia ya mbele inakuwa wazi zaidi na kila hatua', category: 'clarity', language: 'sw' },
      { id: '18', text: 'Naachilia mkanganyiko na kukumbatia uelewa', category: 'clarity', language: 'sw' },
      
      // Confidence affirmations in Swahili
      { id: '19', text: 'Najiamini na kutumaini maamuzi yangu', category: 'confidence', language: 'sw' },
      { id: '20', text: 'Ninastahili mafanikio na furaha', category: 'confidence', language: 'sw' },
      { id: '21', text: 'Uwezo wangu hauna kikomo na maisha yangu ya baadaye ni mazuri', category: 'confidence', language: 'sw' },
      { id: '22', text: 'Nazungumza kwa ajili yangu kwa neema na imani', category: 'confidence', language: 'sw' },
      { id: '23', text: 'Ni wa kutosha hasa kama nilivyo sasa hivi', category: 'confidence', language: 'sw' },
      { id: '24', text: 'Mafanikio yanakuja kwangu kwa asili', category: 'confidence', language: 'sw' },
    ],
    fr: [
      // Calm affirmations in French
      { id: '1', text: 'Je suis en paix avec moi-même et le monde qui m\'entoure', category: 'calm', language: 'fr' },
      { id: '2', text: 'Mon esprit est calme et mon corps est détendu', category: 'calm', language: 'fr' },
      { id: '3', text: 'J\'inspire la paix et j\'expire toute tension', category: 'calm', language: 'fr' },
      { id: '4', text: 'Je suis centré et ancré dans ce moment', category: 'calm', language: 'fr' },
      { id: '5', text: 'La sérénité coule à travers tout mon être', category: 'calm', language: 'fr' },
      { id: '6', text: 'Je choisis la paix plutôt que l\'inquiétude dans chaque situation', category: 'calm', language: 'fr' },
      
      // Courage affirmations in French
      { id: '7', text: 'J\'ai le courage de faire face à tout défi', category: 'courage', language: 'fr' },
      { id: '8', text: 'Je suis brave et audacieux dans la poursuite de mes rêves', category: 'courage', language: 'fr' },
      { id: '9', text: 'La peur ne contrôle pas mes décisions', category: 'courage', language: 'fr' },
      { id: '10', text: 'Je sors de ma zone de confort avec confiance', category: 'courage', language: 'fr' },
      { id: '11', text: 'Chaque défi me rend plus fort et plus sage', category: 'courage', language: 'fr' },
      { id: '12', text: 'Je fais face à l\'incertitude avec un cœur ouvert', category: 'courage', language: 'fr' },
      
      // Clarity affirmations in French
      { id: '13', text: 'Mon esprit est clair et concentré', category: 'clarity', language: 'fr' },
      { id: '14', text: 'Je vois des solutions là où d\'autres voient des problèmes', category: 'clarity', language: 'fr' },
      { id: '15', text: 'Mes pensées sont organisées et intentionnelles', category: 'clarity', language: 'fr' },
      { id: '16', text: 'Je fais confiance à ma sagesse intérieure pour me guider', category: 'clarity', language: 'fr' },
      { id: '17', text: 'Le chemin à suivre devient plus clair à chaque étape', category: 'clarity', language: 'fr' },
      { id: '18', text: 'Je libère la confusion et j\'embrasse la compréhension', category: 'clarity', language: 'fr' },
      
      // Confidence affirmations in French
      { id: '19', text: 'Je crois en mes capacités et fais confiance à mes décisions', category: 'confidence', language: 'fr' },
      { id: '20', text: 'Je mérite le succès et le bonheur', category: 'confidence', language: 'fr' },
      { id: '21', text: 'Mon potentiel est illimité et mon avenir est brillant', category: 'confidence', language: 'fr' },
      { id: '22', text: 'Je parle pour moi avec grâce et conviction', category: 'confidence', language: 'fr' },
      { id: '23', text: 'Je suis suffisant exactement comme je suis maintenant', category: 'confidence', language: 'fr' },
      { id: '24', text: 'Le succès vient naturellement à moi', category: 'confidence', language: 'fr' },
    ],
    lg: [
      // Calm affirmations in Luganda
      { id: '1', text: 'Ndi mu mirembe nange ne nsi yonna', category: 'calm', language: 'lg' },
      { id: '2', text: 'Omutwe gwange guli mu mirembe n\'omubiri gwange guwummudde', category: 'calm', language: 'lg' },
      { id: '3', text: 'Nfuuwa emirembe ne nfulumya okutabukatabuka kwonna', category: 'calm', language: 'lg' },
      { id: '4', text: 'Nnyimiridde era nkakkiriziganya mu kiseera kino', category: 'calm', language: 'lg' },
      { id: '5', text: 'Obuteefu bukulukuta mu mubiri gwange gwonna', category: 'calm', language: 'lg' },
      { id: '6', text: 'Nlonda emirembe okusinga okweraliikiriira mu mbeera yonna', category: 'calm', language: 'lg' },
      
      // Courage affirmations in Luganda
      { id: '7', text: 'Nnina obuvumu okwolekaganya n\'okusoomooza kwonna', category: 'courage', language: 'lg' },
      { id: '8', text: 'Ndi muzira era nga munyiikivu mu kugoberera ebirooto byange', category: 'courage', language: 'lg' },
      { id: '9', text: 'Entiisa teekolera nsalawo zange', category: 'courage', language: 'lg' },
      { id: '10', text: 'Nfuluma mu kifo kyange eky\'emirembe n\'obwesigye', category: 'courage', language: 'lg' },
      { id: '11', text: 'Buli kusoomooza kunfuula omusanyufu era omugezi', category: 'courage', language: 'lg' },
      { id: '12', text: 'Nkwolekaganya n\'obutamanya n\'omutima ogw\'amazima', category: 'courage', language: 'lg' },
      
      // Clarity affirmations in Luganda
      { id: '13', text: 'Omutwe gwange guli ku mutindo era gussa essira', category: 'clarity', language: 'lg' },
      { id: '14', text: 'Nlaba ebisaasululo we balala balaba ebizibu', category: 'clarity', language: 'lg' },
      { id: '15', text: 'Ebirowoozo byange bitegekeddwa era birina ekigendererwa', category: 'clarity', language: 'lg' },
      { id: '16', text: 'Neesiga amagezi gange ag\'omunda okunkulembera', category: 'clarity', language: 'lg' },
      { id: '17', text: 'Ekkubo ery\'omu maaso liyita nga lyetegereka buli mulinganye', category: 'clarity', language: 'lg' },
      { id: '18', text: 'Nzigyamu okutabulatabula ne nkwatako okutegeera', category: 'clarity', language: 'lg' },
      
      // Confidence affirmations in Luganda
      { id: '19', text: 'Nzikiriza mu busobozi bwange era neesiga ensalawo zange', category: 'confidence', language: 'lg' },
      { id: '20', text: 'Nsaanira okuwangula n\'essanyu', category: 'confidence', language: 'lg' },
      { id: '21', text: 'Amasobozi gange tegalina kkomo era ebiseera byange eby\'omu maaso birungi', category: 'confidence', language: 'lg' },
      { id: '22', text: 'Njogera ku lwange n\'ekisa n\'okukakasa', category: 'confidence', language: 'lg' },
      { id: '23', text: 'Mmala nga bwe ndi kati', category: 'confidence', language: 'lg' },
      { id: '24', text: 'Obuwanguzi bujja gyendi mu butonde', category: 'confidence', language: 'lg' },
    ]
  });

  // Get affirmations based on current language
  const affirmations = allAffirmations[language] || allAffirmations.en;

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
