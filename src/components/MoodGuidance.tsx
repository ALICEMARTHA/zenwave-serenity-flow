
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Music, BookOpen, Wind, Coffee, Moon, Sparkles, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MoodGuidanceProps {
  mood: {
    name: string;
    emoji: string;
  };
  onClose: () => void;
}

const MoodGuidance: React.FC<MoodGuidanceProps> = ({ mood, onClose }) => {
  const getMoodGuidance = (moodName: string) => {
    switch (moodName.toLowerCase()) {
      case 'happy':
        return {
          title: "You're feeling great! ✨",
          description: "Your positive energy is wonderful. Let's help you maintain and share this joy.",
          color: "from-yellow-400 to-orange-400",
          recommendations: [
            { icon: Heart, title: "Share Gratitude", description: "Write about what made you happy today", action: "/journal", type: "Journal" },
            { icon: Music, title: "Uplifting Sounds", description: "Energizing music to match your mood", action: "/sounds", type: "Audio" },
            { icon: Sparkles, title: "Positive Affirmations", description: "Amplify your joy with empowering words", action: "/affirmations", type: "Mindset" }
          ]
        };
      
      case 'peaceful':
        return {
          title: "Inner peace is beautiful 🕊️",
          description: "You've found your center. Let's help you deepen this tranquil state.",
          color: "from-blue-400 to-cyan-400",
          recommendations: [
            { icon: Wind, title: "Breathing Session", description: "Coherent breathing to maintain balance", action: "/breathing", type: "Breathwork" },
            { icon: Music, title: "Nature Sounds", description: "Ocean waves and forest sounds", action: "/sounds", type: "Audio" },
            { icon: BookOpen, title: "Mindful Journaling", description: "Reflect on this peaceful moment", action: "/journal", type: "Reflection" }
          ]
        };
      
      case 'sad':
        return {
          title: "It's okay to feel sad 💙",
          description: "Your feelings are valid. Let's gently support you through this moment.",
          color: "from-blue-500 to-indigo-500",
          recommendations: [
            { icon: Heart, title: "Comfort Affirmations", description: "Gentle, nurturing words for healing", action: "/affirmations", type: "Support" },
            { icon: BookOpen, title: "Express Yourself", description: "Writing can help process emotions", action: "/journal", type: "Expression" },
            { icon: Music, title: "Soothing Sounds", description: "Calming audio for emotional comfort", action: "/sounds", type: "Comfort" }
          ]
        };
      
      case 'anxious':
        return {
          title: "Let's calm those worries 🌸",
          description: "Anxiety is temporary. Here are some tools to help you find peace.",
          color: "from-purple-500 to-pink-500",
          recommendations: [
            { icon: Wind, title: "4-7-8 Breathing", description: "Proven technique to reduce anxiety", action: "/breathing", type: "Urgent" },
            { icon: Music, title: "Calming Sounds", description: "Binaural beats for relaxation", action: "/sounds", type: "Relief" },
            { icon: Heart, title: "Calming Affirmations", description: "Reassuring words to ease your mind", action: "/affirmations", type: "Comfort" }
          ]
        };
      
      case 'tired':
        return {
          title: "Rest is productive too 😴",
          description: "Your body and mind need restoration. Let's help you recharge.",
          color: "from-indigo-500 to-purple-500",
          recommendations: [
            { icon: Moon, title: "Sleep Sounds", description: "Gentle audio to help you rest", action: "/sounds", type: "Sleep" },
            { icon: Wind, title: "Relaxing Breathwork", description: "Slow breathing to prepare for rest", action: "/breathing", type: "Relaxation" },
            { icon: BookOpen, title: "Gentle Reflection", description: "Light journaling before rest", action: "/journal", type: "Wind-down" }
          ]
        };
      
      case 'grateful':
        return {
          title: "Gratitude lights up the soul ✨",
          description: "Your appreciation creates positive energy. Let's nurture this beautiful feeling.",
          color: "from-green-400 to-emerald-400",
          recommendations: [
            { icon: BookOpen, title: "Gratitude Journal", description: "Write about what you're thankful for", action: "/journal", type: "Gratitude" },
            { icon: Heart, title: "Appreciation Affirmations", description: "Words that celebrate abundance", action: "/affirmations", type: "Celebration" },
            { icon: Music, title: "Uplifting Music", description: "Sounds that match your grateful heart", action: "/sounds", type: "Joy" }
          ]
        };
      
      case 'frustrated':
        return {
          title: "Let's transform this energy 🔥",
          description: "Frustration shows you care. Let's channel this energy positively.",
          color: "from-red-500 to-orange-500",
          recommendations: [
            { icon: Wind, title: "Box Breathing", description: "Structured breathing to regain control", action: "/breathing", type: "Reset" },
            { icon: BookOpen, title: "Vent in Journal", description: "Express your feelings safely", action: "/journal", type: "Release" },
            { icon: Heart, title: "Strength Affirmations", description: "Remind yourself of your resilience", action: "/affirmations", type: "Empowerment" }
          ]
        };
      
      case 'thoughtful':
        return {
          title: "Deep thinking is valuable 🤔",
          description: "Your reflective nature is a gift. Let's support your contemplation.",
          color: "from-teal-500 to-blue-500",
          recommendations: [
            { icon: BookOpen, title: "Deep Journaling", description: "Explore your thoughts thoroughly", action: "/journal", type: "Reflection" },
            { icon: Music, title: "Focus Sounds", description: "Audio to enhance concentration", action: "/sounds", type: "Focus" },
            { icon: Wind, title: "Mindful Breathing", description: "Breathwork to clarify thoughts", action: "/breathing", type: "Clarity" }
          ]
        };
      
      default:
        return {
          title: "Every feeling matters 💫",
          description: "Thank you for checking in with yourself. Here are some supportive options.",
          color: "from-gray-500 to-slate-500",
          recommendations: [
            { icon: Heart, title: "Daily Affirmations", description: "Start with positive thoughts", action: "/affirmations", type: "Support" },
            { icon: BookOpen, title: "Free Writing", description: "Express whatever comes to mind", action: "/journal", type: "Expression" },
            { icon: Wind, title: "Breathing Practice", description: "Connect with your breath", action: "/breathing", type: "Grounding" }
          ]
        };
    }
  };

  const guidance = getMoodGuidance(mood.name);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <Card className="border-0 shadow-2xl">
          <CardHeader className={`bg-gradient-to-r ${guidance.color} text-white`}>
            <CardTitle className="text-center">
              <div className="text-4xl mb-2">{mood.emoji}</div>
              <h2 className="text-2xl font-bold">{guidance.title}</h2>
              <p className="text-white/90 mt-2">{guidance.description}</p>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Recommended for you right now:
              </h3>
              <div className="grid gap-4">
                {guidance.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={rec.action} onClick={onClose}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer border-gray-200 hover:border-purple-300">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                              <rec.icon className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                                <Badge variant="outline" className="text-xs">{rec.type}</Badge>
                              </div>
                              <p className="text-sm text-gray-600">{rec.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button onClick={onClose} variant="outline">
                I'll explore on my own
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default MoodGuidance;
