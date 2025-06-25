
import React, { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Volume2, Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Affirmations = () => {
  const { affirmations, toggleFavoriteAffirmation, language, setLanguage } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'calm', label: 'Calm' },
    { value: 'courage', label: 'Courage' },
    { value: 'clarity', label: 'Clarity' },
    { value: 'confidence', label: 'Confidence' }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'sw', name: 'Swahili' },
    { code: 'lg', name: 'Luganda' },
    { code: 'fr', name: 'French' }
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
    switch (category) {
      case 'calm': return 'bg-blue-100 text-blue-800';
      case 'courage': return 'bg-red-100 text-red-800';
      case 'clarity': return 'bg-yellow-100 text-yellow-800';
      case 'confidence': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Daily Affirmations
            </h1>
            <p className="text-gray-600 text-lg">
              Empower your mind with positive thoughts and intentions
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full md:w-48">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAffirmations.map((affirmation) => (
              <Card key={affirmation.id} className="hover:shadow-lg transition-all duration-300 border-purple-100">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(affirmation.category)}>
                      {affirmation.category.charAt(0).toUpperCase() + affirmation.category.slice(1)}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavoriteAffirmation(affirmation.id)}
                      className={affirmation.isFavorite ? 'text-red-500' : 'text-gray-400'}
                    >
                      <Heart className={`w-4 h-4 ${affirmation.isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4 font-medium">
                    "{affirmation.text}"
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTextToSpeech(affirmation.text, affirmation.id)}
                    className="w-full"
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
              <p className="text-gray-500 text-lg">No affirmations found for the selected category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Affirmations;
