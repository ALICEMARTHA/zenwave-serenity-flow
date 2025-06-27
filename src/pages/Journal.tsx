
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MoodSelector from '@/components/MoodSelector';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { BookOpen, Edit, Trash2, Plus, Calendar, Tag, Save } from 'lucide-react';
import { toast } from 'sonner';

interface JournalEntry {
  id: string;
  content: string;
  mood: string;
  tags: string[];
  date: string;
  created_at: string;
  updated_at: string;
}

const Journal = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [newTags, setNewTags] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const journalPrompts = [
    "What are three things you're grateful for today?",
    "How did you handle stress today, and what could you do differently?",
    "What emotions did you experience today, and what triggered them?",
    "What was the highlight of your day and why?",
    "What challenges did you face, and how did you overcome them?",
    "How did you practice self-care today?",
    "What did you learn about yourself today?",
    "How did your relationships impact your mood today?",
    "What would you like to release or let go of?",
    "What intentions do you want to set for tomorrow?"
  ];

  useEffect(() => {
    if (user) {
      fetchEntries();
    }
  }, [user]);

  const fetchEntries = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching journal entries:', error);
      toast.error('Failed to load journal entries');
    } else {
      setEntries(data || []);
    }
  };

  const saveEntry = async () => {
    if (!user || !newEntry.trim()) return;

    setIsLoading(true);

    const entryData = {
      user_id: user.id,
      content: newEntry.trim(),
      mood: selectedMood || 'neutral',
      tags: newTags ? newTags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
      date: new Date().toISOString()
    };

    const { error } = await supabase
      .from('journal_entries')
      .insert([entryData]);

    if (error) {
      console.error('Error saving journal entry:', error);
      toast.error('Failed to save journal entry');
    } else {
      toast.success('Journal entry saved!');
      setNewEntry('');
      setNewTags('');
      setSelectedMood('');
      setIsDialogOpen(false);
      fetchEntries();
    }

    setIsLoading(false);
  };

  const updateEntry = async (entry: JournalEntry) => {
    if (!user) return;

    setIsLoading(true);

    const { error } = await supabase
      .from('journal_entries')
      .update({
        content: entry.content,
        mood: entry.mood,
        tags: entry.tags,
        updated_at: new Date().toISOString()
      })
      .eq('id', entry.id);

    if (error) {
      console.error('Error updating journal entry:', error);
      toast.error('Failed to update journal entry');
    } else {
      toast.success('Journal entry updated!');
      setEditingEntry(null);
      fetchEntries();
    }

    setIsLoading(false);
  };

  const deleteEntry = async (entryId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', entryId);

    if (error) {
      console.error('Error deleting journal entry:', error);
      toast.error('Failed to delete journal entry');
    } else {
      toast.success('Journal entry deleted');
      fetchEntries();
    }
  };

  const getRandomPrompt = () => {
    return journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
  };

  const getMoodEmoji = (mood: string) => {
    const moodMap: { [key: string]: string } = {
      happy: '😊',
      peaceful: '😌',
      sad: '😔',
      anxious: '😰',
      tired: '😴',
      grateful: '🤗',
      frustrated: '😤',
      thoughtful: '🤔',
      neutral: '😐'
    };
    return moodMap[mood.toLowerCase()] || '😐';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Journal</h1>
            <p className="text-gray-600">Reflect on your thoughts and feelings</p>
          </div>

          {/* New Entry Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="mb-6 w-full md:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                New Journal Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Write a Journal Entry</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Writing prompt:</p>
                  <p className="text-sm bg-blue-50 p-3 rounded-lg italic">
                    {getRandomPrompt()}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">How are you feeling?</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['Happy', 'Peaceful', 'Sad', 'Anxious', 'Tired', 'Grateful', 'Frustrated', 'Thoughtful'].map((mood) => (
                      <Button
                        key={mood}
                        variant={selectedMood === mood.toLowerCase() ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedMood(mood.toLowerCase())}
                        className="text-xs"
                      >
                        {getMoodEmoji(mood)} {mood}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Your thoughts</label>
                  <Textarea
                    placeholder="Write your thoughts and reflections here..."
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    rows={8}
                    className="resize-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Tags (comma-separated)</label>
                  <Input
                    placeholder="e.g., work, stress, family, gratitude"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveEntry} disabled={isLoading || !newEntry.trim()}>
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? 'Saving...' : 'Save Entry'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Journal Entries */}
          <div className="space-y-6">
            {entries.length === 0 ? (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No journal entries yet</h3>
                  <p className="text-gray-500">Start writing to track your thoughts and emotions</p>
                </CardContent>
              </Card>
            ) : (
              entries.map((entry) => (
                <Card key={entry.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                        <div>
                          <CardTitle className="text-lg capitalize">{entry.mood} mood</CardTitle>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(entry.date || entry.created_at).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingEntry(entry)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Journal Entry</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this journal entry? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteEntry(entry.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {entry.content}
                      </p>
                    </div>
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex items-center mt-4 space-x-2">
                        <Tag className="w-4 h-4 text-gray-500" />
                        <div className="flex flex-wrap gap-1">
                          {entry.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Edit Entry Dialog */}
          {editingEntry && (
            <Dialog open={!!editingEntry} onOpenChange={() => setEditingEntry(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Journal Entry</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Mood</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['Happy', 'Peaceful', 'Sad', 'Anxious', 'Tired', 'Grateful', 'Frustrated', 'Thoughtful'].map((mood) => (
                        <Button
                          key={mood}
                          variant={editingEntry.mood === mood.toLowerCase() ? "default" : "outline"}
                          size="sm"
                          onClick={() => setEditingEntry({...editingEntry, mood: mood.toLowerCase()})}
                          className="text-xs"
                        >
                          {getMoodEmoji(mood)} {mood}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Content</label>
                    <Textarea
                      value={editingEntry.content}
                      onChange={(e) => setEditingEntry({...editingEntry, content: e.target.value})}
                      rows={8}
                      className="resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Tags (comma-separated)</label>
                    <Input
                      value={editingEntry.tags?.join(', ') || ''}
                      onChange={(e) => setEditingEntry({
                        ...editingEntry,
                        tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                      })}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setEditingEntry(null)}>
                      Cancel
                    </Button>
                    <Button onClick={() => updateEntry(editingEntry)} disabled={isLoading}>
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? 'Updating...' : 'Update Entry'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Journal;
