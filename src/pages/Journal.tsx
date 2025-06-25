
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, PenTool, Calendar, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Journal = () => {
  const { journalEntries, addJournalEntry } = useApp();
  const { toast } = useToast();
  const [currentEntry, setCurrentEntry] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const dailyPrompts = [
    "What are three things you're grateful for today?",
    "Describe a moment today when you felt truly present.",
    "What challenged you today, and how did you respond?",
    "Write about someone who made your day better.",
    "What would you like to let go of from today?",
    "Describe the most beautiful thing you noticed today.",
    "What did you learn about yourself today?",
    "How did you show kindness to yourself or others today?",
    "What are you looking forward to tomorrow?",
    "Write about a feeling you experienced deeply today."
  ];

  const todaysPrompt = dailyPrompts[new Date().getDate() % dailyPrompts.length];

  const handleSaveEntry = () => {
    if (!currentEntry.trim()) {
      toast({
        title: "Empty Entry",
        description: "Please write something before saving.",
        variant: "destructive"
      });
      return;
    }

    addJournalEntry({
      content: currentEntry,
      prompt: selectedPrompt || undefined
    });

    toast({
      title: "Entry Saved",
      description: "Your journal entry has been saved successfully."
    });

    setCurrentEntry('');
    setSelectedPrompt(null);
  };

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    if (currentEntry.trim() === '') {
      setCurrentEntry(`Prompt: "${prompt}"\n\n`);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Journal
            </h1>
            <p className="text-gray-600 text-lg">
              Reflect, express, and discover through mindful writing
            </p>
          </div>

          <Tabs defaultValue="write" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="write" className="flex items-center gap-2">
                <PenTool className="w-4 h-4" />
                Write
              </TabsTrigger>
              <TabsTrigger value="entries" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Past Entries
              </TabsTrigger>
            </TabsList>

            <TabsContent value="write">
              <div className="space-y-6">
                <Card className="border-orange-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      Today's Reflection
                    </CardTitle>
                    <p className="text-gray-600">Good {getTimeOfDay()}! Take a moment to reflect on your day.</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">Daily Prompt:</h3>
                      <Card className="bg-orange-50 border-orange-200">
                        <CardContent className="pt-4">
                          <p className="text-gray-700 italic">"{todaysPrompt}"</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-3"
                            onClick={() => handlePromptSelect(todaysPrompt)}
                          >
                            Use This Prompt
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-medium mb-2">More Prompts:</h3>
                      <div className="grid gap-2 md:grid-cols-2">
                        {dailyPrompts.slice(0, 4).map((prompt, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="text-left h-auto p-3 justify-start text-wrap"
                            onClick={() => handlePromptSelect(prompt)}
                          >
                            "{prompt}"
                          </Button>
                        ))}
                      </div>
                    </div>

                    {selectedPrompt && (
                      <div className="mb-4">
                        <Badge variant="secondary" className="mb-2">
                          Using prompt: {selectedPrompt.substring(0, 30)}...
                        </Badge>
                      </div>
                    )}

                    <Textarea
                      placeholder="Start writing your thoughts... You can write freely or respond to a prompt above."
                      value={currentEntry}
                      onChange={(e) => setCurrentEntry(e.target.value)}
                      className="min-h-[300px] resize-none"
                    />

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-500">
                        {currentEntry.length} characters
                      </span>
                      <Button onClick={handleSaveEntry} className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Save Entry
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="entries">
              <div className="space-y-6">
                {journalEntries.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">No entries yet</h3>
                      <p className="text-gray-500">Start writing to see your journal entries here.</p>
                    </CardContent>
                  </Card>
                ) : (
                  journalEntries.map((entry) => (
                    <Card key={entry.id} className="border-orange-100">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {formatDate(entry.timestamp)}
                          </CardTitle>
                          <Badge variant="outline">
                            {new Date(entry.timestamp).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Badge>
                        </div>
                        {entry.prompt && (
                          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                            <p className="text-sm font-medium text-orange-800">Prompt:</p>
                            <p className="text-sm text-orange-700 italic">"{entry.prompt}"</p>
                          </div>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-sm max-w-none">
                          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                            {entry.content}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Journal;
