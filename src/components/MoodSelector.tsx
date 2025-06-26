
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import MoodGuidance from './MoodGuidance';

interface Mood {
  id: string;
  emoji: string;
  name: string;
  timestamp: string;
}

const moods = [
  { emoji: '😊', name: 'Happy', color: 'bg-yellow-100 hover:bg-yellow-200' },
  { emoji: '😌', name: 'Peaceful', color: 'bg-blue-100 hover:bg-blue-200' },
  { emoji: '😔', name: 'Sad', color: 'bg-gray-100 hover:bg-gray-200' },
  { emoji: '😰', name: 'Anxious', color: 'bg-orange-100 hover:bg-orange-200' },
  { emoji: '😴', name: 'Tired', color: 'bg-purple-100 hover:bg-purple-200' },
  { emoji: '🤗', name: 'Grateful', color: 'bg-green-100 hover:bg-green-200' },
  { emoji: '😤', name: 'Frustrated', color: 'bg-red-100 hover:bg-red-200' },
  { emoji: '🤔', name: 'Thoughtful', color: 'bg-indigo-100 hover:bg-indigo-200' }
];

interface MoodSelectorProps {
  onMoodSelect?: (mood: Mood) => void;
  compact?: boolean;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect, compact = false }) => {
  const { setCurrentMood } = useApp();
  const [selectedMood, setSelectedMood] = useState(null);
  const [showGuidance, setShowGuidance] = useState(false);

  const handleMoodSelect = (moodData: typeof moods[0]) => {
    const mood: Mood = {
      id: Date.now().toString(),
      emoji: moodData.emoji,
      name: moodData.name,
      timestamp: new Date().toISOString()
    };
    
    setCurrentMood(mood);
    setSelectedMood(mood);
    setShowGuidance(true);
    onMoodSelect?.(mood);
  };

  const closeGuidance = () => {
    setShowGuidance(false);
    setSelectedMood(null);
  };

  return (
    <>
      <div className="space-y-4">
        {!compact && (
          <h3 className="text-lg font-semibold text-gray-800">How are you feeling?</h3>
        )}
        <div className={`grid ${compact ? 'grid-cols-4 gap-2' : 'grid-cols-4 md:grid-cols-8 gap-4'}`}>
          {moods.map((mood) => (
            <motion.button
              key={mood.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodSelect(mood)}
              className={`${mood.color} rounded-xl p-3 flex flex-col items-center space-y-2 transition-colors border border-transparent hover:border-purple-200`}
            >
              <span className={compact ? 'text-2xl' : 'text-3xl'}>{mood.emoji}</span>
              {!compact && <span className="text-xs font-medium text-gray-700">{mood.name}</span>}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showGuidance && selectedMood && (
          <MoodGuidance mood={selectedMood} onClose={closeGuidance} />
        )}
      </AnimatePresence>
    </>
  );
};

export default MoodSelector;
