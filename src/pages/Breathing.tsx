
import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Wind, Heart, Sparkles, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Breathing = () => {
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('inhale');
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const intervalRef = useRef(null);

  const techniques = [
    {
      id: 'box',
      name: 'Box Breathing',
      description: '4-4-4-4 pattern for focus and calm',
      duration: 300, // 5 minutes
      pattern: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
      benefits: ['Reduces stress', 'Improves focus', 'Calms nervous system'],
      icon: '📦',
      difficulty: 'Beginner'
    },
    {
      id: '478',
      name: '4-7-8 Breathing',
      description: 'Deep relaxation technique',
      duration: 240, // 4 minutes
      pattern: { inhale: 4, hold1: 7, exhale: 8, hold2: 0 },
      benefits: ['Promotes sleep', 'Reduces anxiety', 'Lowers heart rate'],
      icon: '😴',
      difficulty: 'Intermediate'
    },
    {
      id: 'coherent',
      name: 'Coherent Breathing',
      description: '5-5 pattern for balance',
      duration: 600, // 10 minutes
      pattern: { inhale: 5, hold1: 0, exhale: 5, hold2: 0 },
      benefits: ['Heart rate variability', 'Emotional balance', 'Mental clarity'],
      icon: '⚖️',
      difficulty: 'Beginner'
    },
    {
      id: 'energizing',
      name: 'Energizing Breath',
      description: '3-3-3 for energy boost',
      duration: 180, // 3 minutes
      pattern: { inhale: 3, hold1: 3, exhale: 3, hold2: 0 },
      benefits: ['Increases energy', 'Improves alertness', 'Boosts mood'],
      icon: '⚡',
      difficulty: 'Beginner'
    }
  ];

  const startSession = (technique) => {
    setSelectedTechnique(technique);
    setTimeLeft(technique.duration);
    setIsActive(true);
    setCurrentPhase('inhale');
    setProgress(0);
    setSessionComplete(false);
  };

  const toggleSession = () => {
    setIsActive(!isActive);
  };

  const resetSession = () => {
    setIsActive(false);
    setTimeLeft(selectedTechnique?.duration || 0);
    setCurrentPhase('inhale');
    setProgress(0);
    setSessionComplete(false);
  };

  const getPhaseDisplay = () => {
    switch (currentPhase) {
      case 'inhale': return { text: 'Breathe In', color: 'text-blue-600' };
      case 'hold1': return { text: 'Hold', color: 'text-purple-600' };
      case 'exhale': return { text: 'Breathe Out', color: 'text-green-600' };
      case 'hold2': return { text: 'Hold', color: 'text-orange-600' };
      default: return { text: 'Ready', color: 'text-gray-600' };
    }
  };

  useEffect(() => {
    if (isActive && selectedTechnique && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setSessionComplete(true);
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
        
        setProgress(prev => {
          const totalDuration = selectedTechnique.duration;
          const elapsed = totalDuration - timeLeft + 1;
          return (elapsed / totalDuration) * 100;
        });

        // Cycle through breathing phases
        const pattern = selectedTechnique.pattern;
        const cycleTime = pattern.inhale + pattern.hold1 + pattern.exhale + pattern.hold2;
        const currentTime = (selectedTechnique.duration - timeLeft) % cycleTime;
        
        if (currentTime < pattern.inhale) {
          setCurrentPhase('inhale');
        } else if (currentTime < pattern.inhale + pattern.hold1) {
          setCurrentPhase('hold1');
        } else if (currentTime < pattern.inhale + pattern.hold1 + pattern.exhale) {
          setCurrentPhase('exhale');
        } else {
          setCurrentPhase('hold2');
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft, selectedTechnique]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const phaseDisplay = getPhaseDisplay();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
              Breathing Sessions
            </h1>
            <p className="text-gray-600 text-lg">
              Guided breathing techniques for relaxation and focus
            </p>
          </div>

          {!selectedTechnique ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {techniques.map((technique) => (
                <Card key={technique.id} className="border-blue-100 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{technique.icon}</span>
                        <div>
                          <h3 className="text-xl font-semibold">{technique.name}</h3>
                          <Badge variant="outline" className="mt-1">{technique.difficulty}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{Math.floor(technique.duration / 60)}m</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{technique.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-800">Benefits:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {technique.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button 
                      onClick={() => startSession(technique)}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Start Session
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <Card className="border-blue-100">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                    <span className="text-4xl">{selectedTechnique.icon}</span>
                    {selectedTechnique.name}
                  </CardTitle>
                  <p className="text-gray-600">{selectedTechnique.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="relative">
                      <div className="w-48 h-48 mx-auto relative">
                        <motion.div
                          className="w-full h-full rounded-full border-8 border-blue-200 flex items-center justify-center"
                          animate={{
                            scale: currentPhase === 'inhale' ? 1.2 : currentPhase === 'exhale' ? 0.8 : 1,
                            borderColor: currentPhase === 'inhale' ? '#3B82F6' : currentPhase === 'exhale' ? '#10B981' : '#8B5CF6'
                          }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                        >
                          <div className="text-center">
                            <div className={`text-2xl font-bold ${phaseDisplay.color} mb-2`}>
                              {phaseDisplay.text}
                            </div>
                            <div className="text-4xl font-mono text-gray-800">
                              {formatTime(timeLeft)}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    <Progress value={progress} className="w-full h-2" />

                    <div className="flex justify-center gap-4">
                      <Button
                        onClick={toggleSession}
                        variant={isActive ? "destructive" : "default"}
                        size="lg"
                        className="px-8"
                      >
                        {isActive ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                        {isActive ? 'Pause' : 'Resume'}
                      </Button>
                      <Button onClick={resetSession} variant="outline" size="lg">
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Reset
                      </Button>
                    </div>

                    <Button 
                      onClick={() => setSelectedTechnique(null)}
                      variant="ghost"
                      className="mt-4"
                    >
                      Choose Different Technique
                    </Button>
                  </div>

                  <AnimatePresence>
                    {sessionComplete && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center p-6 bg-green-50 rounded-lg border border-green-200"
                      >
                        <Sparkles className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-green-800 mb-2">
                          Session Complete!
                        </h3>
                        <p className="text-green-700">
                          Great job completing your breathing session. How do you feel?
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Breathing;
