
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/Footer';
import { Heart, Music, BookOpen, Wind, TrendingUp, Watch, Sparkles, Shield, Users } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="w-8 h-8 text-purple-600 mr-2" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              ZenWave
            </h1>
          </div>
          <div className="flex space-x-4">
            <Link to="/about">
              <Button variant="ghost">About Us</Button>
            </Link>
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Your Mindful Wellness
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              {" "}Journey Starts Here
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover peace, balance, and well-being through personalized mindfulness tools, 
            mood tracking, guided meditations, and holistic wellness features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Everything You Need for Wellness
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Heart className="w-8 h-8 text-pink-600 mr-3" />
                  <h4 className="text-xl font-semibold">Mood Tracking</h4>
                </div>
                <p className="text-gray-600">
                  Track your emotional patterns and receive personalized insights to improve your mental well-being.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <BookOpen className="w-8 h-8 text-orange-600 mr-3" />
                  <h4 className="text-xl font-semibold">Smart Journaling</h4>
                </div>
                <p className="text-gray-600">
                  Reflect on your thoughts with guided prompts and build healthy mental habits through journaling.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Music className="w-8 h-8 text-green-600 mr-3" />
                  <h4 className="text-xl font-semibold">Sound Therapy</h4>
                </div>
                <p className="text-gray-600">
                  Immerse yourself in calming sounds, nature recordings, and binaural beats for deep relaxation.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Wind className="w-8 h-8 text-teal-600 mr-3" />
                  <h4 className="text-xl font-semibold">Breathing Exercises</h4>
                </div>
                <p className="text-gray-600">
                  Practice guided breathing techniques to reduce anxiety, improve focus, and find inner calm.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Watch className="w-8 h-8 text-indigo-600 mr-3" />
                  <h4 className="text-xl font-semibold">Wearable Integration</h4>
                </div>
                <p className="text-gray-600">
                  Connect your fitness trackers to monitor heart rate variability, skin temperature, and stress levels.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-8 h-8 text-red-600 mr-3" />
                  <h4 className="text-xl font-semibold">Stress Analysis</h4>
                </div>
                <p className="text-gray-600">
                  Get personalized stress level insights and recommendations based on your patterns and behaviors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-8">Why Choose ZenWave?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Personalized Experience</h4>
                <p className="text-gray-600">
                  AI-powered recommendations tailored to your unique wellness journey and preferences.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-100 to-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Privacy & Security</h4>
                <p className="text-gray-600">
                  Your wellness data is encrypted and secure. We prioritize your privacy above everything else.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Evidence-Based</h4>
                <p className="text-gray-600">
                  All features are grounded in scientific research and proven therapeutic practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Transform Your Wellness Journey?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who have found peace, balance, and happiness with ZenWave.
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
