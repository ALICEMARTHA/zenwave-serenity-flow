
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Music, BookOpen, Sparkles, ArrowRight, Star } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            ZenWave
          </div>
          <div className="space-x-4">
            <Link to="/auth">
              <Button variant="ghost" className="text-gray-600 hover:text-purple-600">
                Sign In
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Find Your
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {" "}Inner Peace
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your mental wellness journey with personalized affirmations, 
              soothing sound therapy, mindful journaling, and calming scent integration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-xl">
                  Start Your Journey
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Button variant="outline" className="px-8 py-4 text-lg rounded-xl border-purple-200 hover:bg-purple-50">
                Explore Features
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Your Wellness Toolkit
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover powerful tools designed to support your mental wellness journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-purple-100 hover:border-purple-200 transition-colors h-full">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-purple-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Daily Affirmations</h3>
                <p className="text-gray-600">
                  Personalized positive affirmations in multiple languages to boost your confidence and mindset.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-blue-100 hover:border-blue-200 transition-colors h-full">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Music className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sound Therapy</h3>
                <p className="text-gray-600">
                  Binaural beats and nature sounds for focus, relaxation, and better sleep quality.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-green-100 hover:border-green-200 transition-colors h-full">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Mindful Journaling</h3>
                <p className="text-gray-600">
                  Guided prompts and free writing to process emotions and track your wellness journey.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-orange-100 hover:border-orange-200 transition-colors h-full">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="text-orange-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Scent Integration</h3>
                <p className="text-gray-600">
                  Aromatherapy guidance with natural scent recommendations for enhanced wellness.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white/50 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Loved by Thousands
            </h2>
            <p className="text-xl text-gray-600">
              Join our community of wellness seekers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "ZenWave has completely transformed my daily routine. The affirmations help me start each day with confidence.",
                author: "Sarah M.",
                rating: 5
              },
              {
                quote: "The sound therapy sessions are incredible. I sleep so much better now and feel more focused during work.",
                author: "David L.",
                rating: 5
              },
              {
                quote: "I love the journaling prompts. They've helped me process my emotions and understand myself better.",
                author: "Maya K.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-purple-100">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={16} />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                  <p className="font-semibold text-gray-800">- {testimonial.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Begin Your Wellness Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of people who have found peace and clarity with ZenWave.
            Start your free journey today.
          </p>
          <Link to="/auth">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 text-lg rounded-xl">
              Get Started Free
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">ZenWave</div>
              <p className="text-gray-400">
                Transform your mental wellness journey with personalized tools and guidance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Daily Affirmations</li>
                <li>Sound Therapy</li>
                <li>Mindful Journaling</li>
                <li>Scent Integration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Community</li>
                <li>Blog</li>
                <li>Newsletter</li>
                <li>Social Media</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ZenWave. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
