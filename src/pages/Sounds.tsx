
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import AudioPlayer from '@/components/AudioPlayer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Moon, Leaf } from 'lucide-react';

interface AudioSession {
  id: string;
  title: string;
  category: 'focus' | 'relax' | 'sleep';
  duration: number;
  url: string;
  description: string;
}

const Sounds = () => {
  const [selectedSession, setSelectedSession] = useState<AudioSession | null>(null);

  // Sample audio sessions - in production these would come from Supabase
  const audioSessions: AudioSession[] = [
    {
      id: '1',
      title: 'Deep Focus Flow',
      category: 'focus',
      duration: 1800, // 30 minutes
      url: '/audio/focus-flow.mp3',
      description: 'Binaural beats designed to enhance concentration and productivity'
    },
    {
      id: '2',
      title: 'Creative Concentration',
      category: 'focus',
      duration: 2400, // 40 minutes
      url: '/audio/creative-focus.mp3',
      description: 'Ambient sounds to boost creative thinking and problem-solving'
    },
    {
      id: '3',
      title: 'Ocean Waves Meditation',
      category: 'relax',
      duration: 1200, // 20 minutes
      url: '/audio/ocean-waves.mp3',
      description: 'Gentle ocean sounds for deep relaxation and stress relief'
    },
    {
      id: '4',
      title: 'Forest Rain Therapy',
      category: 'relax',
      duration: 1500, // 25 minutes
      url: '/audio/forest-rain.mp3',
      description: 'Calming forest rainfall to wash away tension and anxiety'
    },
    {
      id: '5',
      title: 'Deep Sleep Induction',
      category: 'sleep',
      duration: 3600, // 60 minutes
      url: '/audio/deep-sleep.mp3',
      description: 'Low-frequency tones to guide you into restful sleep'
    },
    {
      id: '6',
      title: 'Peaceful Dreams',
      category: 'sleep',
      duration: 2700, // 45 minutes
      url: '/audio/peaceful-dreams.mp3',
      description: 'Gentle melodies and nature sounds for better sleep quality'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'focus': return <Brain className="w-5 h-5" />;
      case 'relax': return <Leaf className="w-5 h-5" />;
      case 'sleep': return <Moon className="w-5 h-5" />;
      default: return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'focus': return 'bg-blue-500';
      case 'relax': return 'bg-green-500';
      case 'sleep': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  const sessionsByCategory = {
    focus: audioSessions.filter(s => s.category === 'focus'),
    relax: audioSessions.filter(s => s.category === 'relax'),
    sleep: audioSessions.filter(s => s.category === 'sleep')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Sound Therapy
            </h1>
            <p className="text-gray-600 text-lg">
              Immerse yourself in healing sounds designed for focus, relaxation, and sleep
            </p>
          </div>

          {selectedSession && (
            <div className="mb-8">
              <AudioPlayer session={selectedSession} />
            </div>
          )}

          <Tabs defaultValue="focus" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="focus" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Focus
              </TabsTrigger>
              <TabsTrigger value="relax" className="flex items-center gap-2">
                <Leaf className="w-4 h-4" />
                Relax
              </TabsTrigger>
              <TabsTrigger value="sleep" className="flex items-center gap-2">
                <Moon className="w-4 h-4" />
                Sleep
              </TabsTrigger>
            </TabsList>

            <TabsContent value="focus">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sessionsByCategory.focus.map((session) => (
                  <Card key={session.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-10 h-10 ${getCategoryColor(session.category)} rounded-lg flex items-center justify-center text-white`}>
                          {getCategoryIcon(session.category)}
                        </div>
                        <Badge variant="secondary">{formatDuration(session.duration)}</Badge>
                      </div>
                      <CardTitle className="text-lg">{session.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{session.description}</p>
                      <Button 
                        onClick={() => setSelectedSession(session)}
                        className="w-full"
                        variant={selectedSession?.id === session.id ? "default" : "outline"}
                      >
                        {selectedSession?.id === session.id ? 'Now Playing' : 'Play Session'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="relax">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sessionsByCategory.relax.map((session) => (
                  <Card key={session.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-10 h-10 ${getCategoryColor(session.category)} rounded-lg flex items-center justify-center text-white`}>
                          {getCategoryIcon(session.category)}
                        </div>
                        <Badge variant="secondary">{formatDuration(session.duration)}</Badge>
                      </div>
                      <CardTitle className="text-lg">{session.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{session.description}</p>
                      <Button 
                        onClick={() => setSelectedSession(session)}
                        className="w-full"
                        variant={selectedSession?.id === session.id ? "default" : "outline"}
                      >
                        {selectedSession?.id === session.id ? 'Now Playing' : 'Play Session'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sleep">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sessionsByCategory.sleep.map((session) => (
                  <Card key={session.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-10 h-10 ${getCategoryColor(session.category)} rounded-lg flex items-center justify-center text-white`}>
                          {getCategoryIcon(session.category)}
                        </div>
                        <Badge variant="secondary">{formatDuration(session.duration)}</Badge>
                      </div>
                      <CardTitle className="text-lg">{session.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{session.description}</p>
                      <Button 
                        onClick={() => setSelectedSession(session)}
                        className="w-full"
                        variant={selectedSession?.id === session.id ? "default" : "outline"}
                      >
                        {selectedSession?.id === session.id ? 'Now Playing' : 'Play Session'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Sounds;
