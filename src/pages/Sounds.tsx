
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  Play, Pause, Volume2, Heart, Waves, TreePine, 
  Music, Coffee, Flower2, Leaf, Sparkles, Wind
} from 'lucide-react';
import { toast } from 'sonner';

interface Sound {
  id: string;
  name: string;
  category: 'nature' | 'ambient' | 'binaural' | 'guided';
  icon: any;
  duration: string;
  description: string;
  benefits: string[];
  audioUrl?: string;
}

interface Scent {
  id: string;
  name: string;
  category: 'calming' | 'energizing' | 'focus' | 'sleep';
  icon: any;
  description: string;
  benefits: string[];
  moodRecommendations: string[];
  ingredients: string[];
}

const Sounds = () => {
  const { user } = useAuth();
  const { currentMood } = useApp();
  const [currentSound, setCurrentSound] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [userPreferences, setUserPreferences] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sounds: Sound[] = [
    {
      id: '1',
      name: 'Ocean Waves',
      category: 'nature',
      icon: Waves,
      duration: '30 min',
      description: 'Gentle ocean waves for deep relaxation',
      benefits: ['Reduces stress', 'Improves sleep', 'Calms anxiety'],
      audioUrl: '/sounds/ocean-waves.mp3'
    },
    {
      id: '2',
      name: 'Forest Rain',
      category: 'nature',
      icon: TreePine,
      duration: '45 min',
      description: 'Peaceful rainfall in a lush forest',
      benefits: ['Enhances concentration', 'Reduces tension', 'Natural white noise'],
    },
    {
      id: '3',
      name: 'Mountain Stream',
      category: 'nature',
      icon: Waves,
      duration: '60 min',
      description: 'Babbling brook sounds from mountain highlands',
      benefits: ['Promotes mindfulness', 'Aids meditation', 'Stress relief'],
    },
    {
      id: '4',
      name: 'Tibetan Bowls',
      category: 'ambient',
      icon: Music,
      duration: '20 min',
      description: 'Traditional singing bowls for meditation',
      benefits: ['Deep meditation', 'Chakra balancing', 'Spiritual healing'],
    },
    {
      id: '5',
      name: 'Binaural Beats - Focus',
      category: 'binaural',
      icon: Sparkles,
      duration: '25 min',
      description: 'Alpha waves for enhanced concentration',
      benefits: ['Improves focus', 'Enhances creativity', 'Cognitive boost'],
    },
    {
      id: '6',
      name: 'Binaural Beats - Sleep',
      category: 'binaural',
      icon: Sparkles,
      duration: '60 min',
      description: 'Delta waves for deep sleep induction',
      benefits: ['Better sleep quality', 'Faster sleep onset', 'Deeper rest'],
    },
    {
      id: '7',
      name: 'Guided Breathing',
      category: 'guided',
      icon: Wind,
      duration: '10 min',
      description: 'Guided breathing exercise for anxiety relief',
      benefits: ['Reduces anxiety', 'Lowers heart rate', 'Immediate calm'],
    },
    {
      id: '8',
      name: 'Body Scan Meditation',
      category: 'guided',
      icon: Heart,
      duration: '15 min',
      description: 'Progressive body relaxation guide',
      benefits: ['Physical relaxation', 'Pain relief', 'Body awareness'],
    }
  ];

  const scents: Scent[] = [
    {
      id: '1',
      name: 'Lavender Dreams',
      category: 'calming',
      icon: Flower2,
      description: 'Pure lavender essential oil blend for ultimate relaxation',
      benefits: ['Reduces anxiety', 'Improves sleep quality', 'Calms nervous system'],
      moodRecommendations: ['anxious', 'stressed', 'tired'],
      ingredients: ['French Lavender', 'English Lavender', 'Bergamot']
    },
    {
      id: '2',
      name: 'Eucalyptus Fresh',
      category: 'energizing',
      icon: Leaf,
      description: 'Invigorating eucalyptus to clear mind and boost energy',
      benefits: ['Increases alertness', 'Clears congestion', 'Mental clarity'],
      moodRecommendations: ['tired', 'sluggish', 'foggy'],
      ingredients: ['Eucalyptus Globulus', 'Peppermint', 'Lemon']
    },
    {
      id: '3',
      name: 'Citrus Burst',
      category: 'energizing',
      icon: Sparkles,
      description: 'Energizing citrus blend to uplift mood and increase focus',
      benefits: ['Boosts mood', 'Increases energy', 'Enhances positivity'],
      moodRecommendations: ['sad', 'low energy', 'unmotivated'],
      ingredients: ['Sweet Orange', 'Grapefruit', 'Lime', 'Bergamot']
    },
    {
      id: '4',
      name: 'Rosemary Focus',
      category: 'focus',
      icon: TreePine,
      description: 'Herb blend designed to enhance concentration and memory',
      benefits: ['Improves memory', 'Enhances focus', 'Mental stimulation'],
      moodRecommendations: ['distracted', 'unfocused', 'studying'],
      ingredients: ['Rosemary', 'Basil', 'Sage', 'Thyme']
    },
    {
      id: '5',
      name: 'Chamomile Calm',
      category: 'calming',
      icon: Flower2,
      description: 'Gentle chamomile blend for stress relief and tranquility',
      benefits: ['Reduces stress', 'Promotes peace', 'Eases tension'],
      moodRecommendations: ['stressed', 'overwhelmed', 'irritated'],
      ingredients: ['Roman Chamomile', 'German Chamomile', 'Vanilla']
    },
    {
      id: '6',
      name: 'Vanilla Comfort',
      category: 'sleep',
      icon: Coffee,
      description: 'Warm vanilla scent for comfort and bedtime relaxation',
      benefits: ['Promotes sleep', 'Creates comfort', 'Reduces restlessness'],
      moodRecommendations: ['anxious', 'restless', 'homesick'],
      ingredients: ['Madagascar Vanilla', 'Sandalwood', 'Amber']
    },
    {
      id: '7',
      name: 'Pine Forest',
      category: 'calming',
      icon: TreePine,
      description: 'Fresh pine scent to bring nature indoors',
      benefits: ['Reduces stress', 'Connects with nature', 'Purifies air'],
      moodRecommendations: ['stressed', 'disconnected', 'indoor fatigue'],
      ingredients: ['Scots Pine', 'Fir Needle', 'Cedarwood']
    },
    {
      id: '8',
      name: 'Jasmine Night',
      category: 'sleep',
      icon: Flower2,
      description: 'Exotic jasmine for evening relaxation and romantic ambiance',
      benefits: ['Promotes deep sleep', 'Enhances mood', 'Aphrodisiac properties'],
      moodRecommendations: ['restless', 'romantic', 'evening wind-down'],
      ingredients: ['Jasmine Absolute', 'Rose', 'Ylang-ylang']
    }
  ];

  useEffect(() => {
    if (user) {
      fetchUserPreferences();
    }
  }, [user]);

  const fetchUserPreferences = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (data) {
      setUserPreferences(data);
    }
  };

  const updatePreferences = async (type: 'sounds' | 'scents', item: string) => {
    if (!user) return;

    const currentPrefs = userPreferences || {};
    const key = type === 'sounds' ? 'preferred_sounds' : 'preferred_scents';
    const currentList = currentPrefs[key] || [];
    
    const updatedList = currentList.includes(item)
      ? currentList.filter((i: string) => i !== item)
      : [...currentList, item];

    const updatedPrefs = {
      ...currentPrefs,
      [key]: updatedList,
      user_id: user.id,
    };

    const { error } = await supabase
      .from('user_preferences')
      .upsert([updatedPrefs]);

    if (!error) {
      setUserPreferences(updatedPrefs);
      toast.success(`${type === 'sounds' ? 'Sound' : 'Scent'} preference updated!`);
    }
  };

  const playSound = (soundId: string) => {
    if (currentSound === soundId && isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      setCurrentSound(soundId);
      setIsPlaying(true);
      // In a real app, you would load and play the actual audio file
      toast.success('Playing sound...');
    }
  };

  const getRecommendedScents = () => {
    if (!currentMood) return [];
    
    return scents.filter(scent => 
      scent.moodRecommendations.includes(currentMood.name.toLowerCase())
    );
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      nature: 'bg-green-100 text-green-800',
      ambient: 'bg-purple-100 text-purple-800',
      binaural: 'bg-blue-100 text-blue-800',
      guided: 'bg-orange-100 text-orange-800',
      calming: 'bg-blue-100 text-blue-800',
      energizing: 'bg-yellow-100 text-yellow-800',
      focus: 'bg-green-100 text-green-800',
      sleep: 'bg-purple-100 text-purple-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const isPreferred = (type: 'sounds' | 'scents', item: string) => {
    if (!userPreferences) return false;
    const key = type === 'sounds' ? 'preferred_sounds' : 'preferred_scents';
    return userPreferences[key]?.includes(item) || false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Sound Therapy & Aromatherapy</h1>
            <p className="text-gray-600">Immerse yourself in calming sounds and soothing scents</p>
          </div>

          <Tabs defaultValue="sounds" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="sounds" className="flex items-center">
                <Music className="w-4 h-4 mr-2" />
                Sounds
              </TabsTrigger>
              <TabsTrigger value="scents" className="flex items-center">
                <Flower2 className="w-4 h-4 mr-2" />
                Scents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sounds" className="space-y-6">
              {/* Volume Control */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Volume2 className="w-5 h-5 mr-2" />
                    Volume Control
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Volume2 className="w-4 h-4 text-gray-500" />
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">{volume[0]}%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Sound Categories */}
              {['nature', 'ambient', 'binaural', 'guided'].map(category => (
                <div key={category}>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 capitalize">
                    {category} Sounds
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {sounds
                      .filter(sound => sound.category === category)
                      .map((sound) => {
                        const IconComponent = sound.icon;
                        return (
                          <Card key={sound.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <IconComponent className="w-6 h-6 text-purple-600 mr-2" />
                                  <CardTitle className="text-lg">{sound.name}</CardTitle>
                                </div>
                                <Badge className={getCategoryColor(sound.category)}>
                                  {sound.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">{sound.description}</p>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-500">Duration: {sound.duration}</span>
                                  <Button
                                    variant={isPreferred('sounds', sound.name) ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => updatePreferences('sounds', sound.name)}
                                  >
                                    <Heart className={`w-4 h-4 ${isPreferred('sounds', sound.name) ? 'fill-current' : ''}`} />
                                  </Button>
                                </div>
                                
                                <div className="space-y-1">
                                  {sound.benefits.map((benefit, index) => (
                                    <div key={index} className="text-xs text-gray-600 flex items-center">
                                      <div className="w-1 h-1 bg-purple-400 rounded-full mr-2"></div>
                                      {benefit}
                                    </div>
                                  ))}
                                </div>

                                <Button
                                  className="w-full"
                                  onClick={() => playSound(sound.id)}
                                  variant={currentSound === sound.id && isPlaying ? "secondary" : "default"}
                                >
                                  {currentSound === sound.id && isPlaying ? (
                                    <>
                                      <Pause className="w-4 h-4 mr-2" />
                                      Pause
                                    </>
                                  ) : (
                                    <>
                                      <Play className="w-4 h-4 mr-2" />
                                      Play
                                    </>
                                  )}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="scents" className="space-y-6">
              {/* Mood-based Recommendations */}
              {currentMood && getRecommendedScents().length > 0 && (
                <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-100 to-blue-100">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <span className="text-2xl mr-2">{currentMood.emoji}</span>
                      Recommended for your {currentMood.name} mood
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getRecommendedScents().map((scent) => {
                        const IconComponent = scent.icon;
                        return (
                          <div key={scent.id} className="bg-white/80 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                              <IconComponent className="w-5 h-5 text-purple-600 mr-2" />
                              <h4 className="font-semibold">{scent.name}</h4>
                            </div>
                            <p className="text-sm text-gray-600">{scent.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Scent Categories */}
              {['calming', 'energizing', 'focus', 'sleep'].map(category => (
                <div key={category}>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 capitalize">
                    {category} Scents
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {scents
                      .filter(scent => scent.category === category)
                      .map((scent) => {
                        const IconComponent = scent.icon;
                        return (
                          <Card key={scent.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <IconComponent className="w-6 h-6 text-purple-600 mr-2" />
                                  <CardTitle className="text-lg">{scent.name}</CardTitle>
                                </div>
                                <Badge className={getCategoryColor(scent.category)}>
                                  {scent.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">{scent.description}</p>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">Ingredients:</span>
                                  <Button
                                    variant={isPreferred('scents', scent.name) ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => updatePreferences('scents', scent.name)}
                                  >
                                    <Heart className={`w-4 h-4 ${isPreferred('scents', scent.name) ? 'fill-current' : ''}`} />
                                  </Button>
                                </div>
                                
                                <div className="text-xs text-gray-600">
                                  {scent.ingredients.join(', ')}
                                </div>

                                <div className="space-y-1">
                                  <span className="text-sm font-medium">Benefits:</span>
                                  {scent.benefits.map((benefit, index) => (
                                    <div key={index} className="text-xs text-gray-600 flex items-center">
                                      <div className="w-1 h-1 bg-purple-400 rounded-full mr-2"></div>
                                      {benefit}
                                    </div>
                                  ))}
                                </div>

                                <Button className="w-full" variant="outline">
                                  <Sparkles className="w-4 h-4 mr-2" />
                                  Learn More
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Sounds;
