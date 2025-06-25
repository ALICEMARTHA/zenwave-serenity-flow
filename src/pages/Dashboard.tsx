
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import Navigation from '@/components/Navigation';
import MoodSelector from '@/components/MoodSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Music, BookOpen, Sparkles, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { currentMood, affirmations, journalEntries, isOffline } = useApp();
  const [todayAffirmation, setTodayAffirmation] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Set today's affirmation
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    setTodayAffirmation(randomAffirmation?.text || 'You are capable of amazing things.');
  }, [affirmations]);

  const recentMoodTrend = () => {
    if (currentMood?.name === 'Happy' || currentMood?.name === 'Peaceful' || currentMood?.name === 'Grateful') {
      return { trend: 'up', color: 'text-green-600', message: 'positive' };
    }
    return { trend: 'neutral', color: 'text-blue-600', message: 'stable' };
  };

  const moodTrend = recentMoodTrend();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      {isOffline && (
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm">
                You're currently offline. Some features may be limited, but you can still access your cached content.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {greeting}, {user?.displayName || 'Guest'}! ✨
          </h1>
          <p className="text-lg text-gray-600">
            How would you like to nurture your wellness today?
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Affirmation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <Heart className="text-white" size={24} />
                    <h2 className="text-xl font-semibold">Today's Affirmation</h2>
                  </div>
                  <blockquote className="text-lg italic mb-4">
                    "{todayAffirmation}"
                  </blockquote>
                  <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                    Speak Aloud
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-100">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Heart className="text-purple-600" size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">Affirmations</h3>
                    <p className="text-sm text-gray-600">Daily positive thoughts</p>
                    <Badge variant="secondary" className="mt-2">
                      {affirmations.length} available
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-100">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Music className="text-blue-600" size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">Sound Therapy</h3>
                    <p className="text-sm text-gray-600">Binaural beats & nature</p>
                    <Badge variant="secondary" className="mt-2">
                      15 sessions
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-100">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="text-green-600" size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">Journal</h3>
                    <p className="text-sm text-gray-600">Reflect & process</p>
                    <Badge variant="secondary" className="mt-2">
                      {journalEntries.length} entries
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Featured Sound Session */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Music className="text-purple-600" size={20} />
                    <span>Featured Sound Session</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">🌊</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">Ocean Waves & Birds</h3>
                      <p className="text-sm text-gray-600 mb-2">Perfect for morning meditation and focus</p>
                      <Badge className="bg-blue-100 text-blue-800">Relax</Badge>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Play Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mood Check-in */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-purple-100">
                <CardHeader>
                  <CardTitle className="text-lg">How are you feeling?</CardTitle>
                </CardHeader>
                <CardContent>
                  <MoodSelector compact />
                  {currentMood && (
                    <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">Current mood:</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xl">{currentMood.emoji}</span>
                        <span className="font-medium text-gray-800">{currentMood.name}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Wellness Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="text-green-600" size={18} />
                    <span className="text-lg">Your Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Mood trend</span>
                    <span className={`text-sm font-medium ${moodTrend.color}`}>
                      Feeling {moodTrend.message}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Journal entries</span>
                    <span className="text-sm font-medium text-gray-800">{journalEntries.length} this week</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Affirmations heard</span>
                    <span className="text-sm font-medium text-gray-800">12 today</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Scent Suggestion */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-orange-100 bg-gradient-to-br from-orange-50 to-yellow-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="text-orange-600" size={18} />
                    <span className="text-lg">Today's Scent</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🌿</div>
                    <h3 className="font-semibold text-gray-800 mb-1">Lavender</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Perfect for relaxation and stress relief
                    </p>
                    <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
