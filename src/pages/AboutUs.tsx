
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, Users, Target, ArrowLeft } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-purple-600 mr-3" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                About ZenWave
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empowering your journey to mental wellness through mindful technology and personalized care.
            </p>
          </div>

          {/* Mission Section */}
          <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                At ZenWave, we believe that mental wellness should be accessible, personalized, and integrated into daily life. 
                Our mission is to provide you with the tools, insights, and support you need to cultivate mindfulness, 
                manage stress, and enhance your overall well-being through innovative technology and evidence-based practices.
              </p>
            </CardContent>
          </Card>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Heart className="w-8 h-8 text-pink-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">Compassionate Care</h3>
                </div>
                <p className="text-gray-600">
                  We approach mental wellness with empathy and understanding, recognizing that everyone's journey is unique. 
                  Our tools are designed to meet you where you are, without judgment or pressure.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Shield className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">Privacy & Security</h3>
                </div>
                <p className="text-gray-600">
                  Your mental health data is deeply personal. We employ industry-leading security measures to protect 
                  your information and ensure your privacy is always maintained.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="w-8 h-8 text-purple-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">Community Support</h3>
                </div>
                <p className="text-gray-600">
                  While we respect your privacy, we also believe in the power of community. Our platform provides 
                  opportunities for connection and shared growth when you're ready.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-teal-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">Evidence-Based</h3>
                </div>
                <p className="text-gray-600">
                  Our features are grounded in scientific research and proven therapeutic practices, ensuring that 
                  you receive effective tools for your mental wellness journey.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* What We Offer */}
          <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">What We Offer</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">Mood Tracking & Journaling</h4>
                  <p className="text-gray-600 mb-4">
                    Track your emotional patterns and reflect through guided journaling prompts.
                  </p>
                  
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">Personalized Affirmations</h4>
                  <p className="text-gray-600 mb-4">
                    Access positive affirmations tailored to your current mood and goals.
                  </p>
                  
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">Sound Therapy</h4>
                  <p className="text-gray-600">
                    Immerse yourself in calming sounds and music designed to reduce stress and promote relaxation.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">Breathing Exercises</h4>
                  <p className="text-gray-600 mb-4">
                    Practice guided breathing techniques to manage anxiety and improve focus.
                  </p>
                  
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">Wearable Integration</h4>
                  <p className="text-gray-600 mb-4">
                    Connect your fitness trackers to monitor physiological indicators of stress and wellness.
                  </p>
                  
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">Stress Level Analysis</h4>
                  <p className="text-gray-600">
                    Get insights into your stress patterns with personalized recommendations for improvement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Start Your Wellness Journey?</h2>
            <p className="text-gray-600 mb-6">
              Join thousands of users who have found peace and balance with ZenWave.
            </p>
            <div className="space-x-4">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Get Started
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
