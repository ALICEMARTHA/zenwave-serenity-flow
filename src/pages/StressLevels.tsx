
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Heart, TrendingUp, Lightbulb } from 'lucide-react';

const StressLevels = () => {
  const { getStressLevel, moods, journalEntries } = useApp();
  const stressData = getStressLevel();

  const getStressColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStressIcon = (level: string) => {
    switch (level) {
      case 'low': return <Heart className="w-6 h-6 text-green-600" />;
      case 'moderate': return <TrendingUp className="w-6 h-6 text-yellow-600" />;
      case 'high': return <AlertTriangle className="w-6 h-6 text-red-600" />;
      default: return <Heart className="w-6 h-6 text-gray-600" />;
    }
  };

  const recentMoodCounts = moods.slice(0, 7).reduce((acc, mood) => {
    acc[mood.name] = (acc[mood.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Stress Level Analysis
            </h1>
            <p className="text-gray-600 text-lg">
              Understanding your emotional patterns for better wellness
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="border-teal-100">
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-2">
                  {getStressIcon(stressData.level)}
                </div>
                <CardTitle className="text-xl">Current Stress Level</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Badge className={`${getStressColor(stressData.level)} text-lg px-4 py-2 mb-4`}>
                  {stressData.level.charAt(0).toUpperCase() + stressData.level.slice(1)}
                </Badge>
                <div className="mb-4">
                  <Progress value={stressData.score} className="w-full h-3" />
                  <p className="text-sm text-gray-600 mt-2">Score: {stressData.score}/100</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-teal-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-teal-600" />
                  Recent Mood Pattern
                </CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(recentMoodCounts).length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(recentMoodCounts)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 3)
                      .map(([mood, count]) => (
                        <div key={mood} className="flex justify-between items-center">
                          <span className="text-sm">{mood}</span>
                          <Badge variant="secondary">{count}</Badge>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No recent mood data available</p>
                )}
              </CardContent>
            </Card>

            <Card className="border-teal-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-teal-600" />
                  Journal Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-2">
                    {journalEntries.length}
                  </div>
                  <p className="text-sm text-gray-600">Total Entries</p>
                  <div className="mt-4">
                    <div className="text-lg font-semibold text-gray-700">
                      {journalEntries.slice(0, 7).length}
                    </div>
                    <p className="text-xs text-gray-500">This Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {stressData.factors.length > 0 && (
            <Card className="mb-6 border-orange-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Contributing Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {stressData.factors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{factor}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {stressData.recommendations.map((recommendation, index) => (
                  <div 
                    key={index} 
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                  >
                    <p className="text-gray-700 text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              This analysis is based on your recent mood tracking and journal entries. 
              For professional mental health support, please consult a qualified healthcare provider.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressLevels;
