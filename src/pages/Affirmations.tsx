
import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Volume2, Globe, Sparkles, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Affirmations = () => {
  const { affirmations, toggleFavoriteAffirmation, language, setLanguage } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);

  const categories = [
    { value: 'all', label: 'All Categories', color: 'from-gray-500 to-gray-600', bgColor: 'bg-gray-100' },
    { value: 'calm', label: 'Calm', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50' },
    { value: 'courage', label: 'Courage', color: 'from-red-500 to-orange-500', bgColor: 'bg-red-50' },
    { value: 'clarity', label: 'Clarity', color: 'from-yellow-500 to-amber-500', bgColor: 'bg-yellow-50' },
    { value: 'confidence', label: 'Confidence', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50' }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'sw', name: 'Swahili', flag: '🇰🇪' },
    { code: 'lg', name: 'Luganda', flag: '🇺🇬' },
    { code: 'fr', name: 'French', flag: '🇫🇷' }
  ];

  const filteredAffirmations = affirmations.filter(affirmation => 
    selectedCategory === 'all' || affirmation.category === selectedCategory
  );

  const handleTextToSpeech = (text: string, id: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking === id) {
        speechSynthesis.cancel();
        setIsSpeaking(null);
        return;
      }
      
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      // Set language for speech synthesis
      const langCodes = { en: 'en-US', sw: 'sw-KE', lg: 'en-UG', fr: 'fr-FR' };
      utterance.lang = langCodes[language as keyof typeof langCodes] || 'en-US';
      
      utterance.onstart = () => setIsSpeaking(id);
      utterance.onend = () => setIsSpeaking(null);
      utterance.onerror = () => setIsSpeaking(null);
      
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const getCategoryColor = (category: string) => {
    const categoryData = categories.find(cat => cat.value === category);
    return categoryData ? categoryData.color : 'from-gray-500 to-gray-600';
  };

  const getCategoryBgColor = (category: string) => {
    const categoryData = categories.find(cat => cat.value === category);
    return categoryData ? categoryData.bgColor : 'bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 via-blue-50 to-teal-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-purple-500 mr-2" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                Daily Affirmations
              </h1>
              <Sparkles className="w-8 h-8 text-teal-500 ml-2" />
            </div>
            <p className="text-gray-600 text-xl">
              Empower your mind with positive thoughts and intentions in your chosen language
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Filter className="w-4 h-4 mr-1" />
                Filter by Category
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full bg-white/80 border-purple-200 focus:border-purple-400">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm">
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color} mr-2`}></div>
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                Choose Language
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full bg-white/80 border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm">
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center">
                        <span className="mr-2 text-lg">{lang.flag}</span>
                        {lang.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAffirmations.map((affirmation) => (
              <Card key={affirmation.id} className={`hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200 ${getCategoryBgColor(affirmation.category)} backdrop-blur-sm hover:scale-105`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className={`bg-gradient-to-r ${getCategoryColor(affirmation.category)} text-white border-0 shadow-lg`}>
                      {affirmation.category.charAt(0).toUpperCase() + affirmation.category.slice(1)}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavoriteAffirmation(affirmation.id)}
                      className={`${affirmation.isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-400'} hover:bg-red-50`}
                    >
                      <Heart className={`w-5 h-5 ${affirmation.isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-800 text-lg leading-relaxed mb-4 font-medium min-h-[3rem] flex items-center">
                    "{affirmation.text}"
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTextToSpeech(affirmation.text, affirmation.id)}
                    className={`w-full bg-gradient-to-r ${getCategoryColor(affirmation.category)} text-white border-0 hover:opacity-90 shadow-md`}
                    disabled={isSpeaking === affirmation.id}
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    {isSpeaking === affirmation.id ? 'Speaking...' : 'Listen'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAffirmations.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-md mx-auto">
                <p className="text-gray-500 text-lg mb-4">No affirmations found for the selected category.</p>
                <Button
                  onClick={() => setSelectedCategory('all')}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90"
                >
                  Show All Affirmations
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Affirmations;
