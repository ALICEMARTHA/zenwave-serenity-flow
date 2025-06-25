
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        {/* Animated zen circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-6xl text-white"
          >
            🧘‍♀️
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-6xl font-bold text-gray-800 mb-4"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-semibold text-gray-700 mb-4"
        >
          Let's Recenter
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 mb-8 leading-relaxed"
        >
          Sometimes we wander off our path, and that's okay. 
          Take a deep breath and let's guide you back to your wellness journey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <Link to="/dashboard">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl">
              <Home className="mr-2" size={18} />
              Return Home
            </Button>
          </Link>
          
          <div>
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-purple-600"
            >
              <ArrowLeft className="mr-2" size={18} />
              Go Back
            </Button>
          </div>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              animate={{ 
                opacity: [0, 1, 0],
                y: [-100, -200, -300],
                x: [0, Math.sin(i) * 100, Math.cos(i) * 50]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut"
              }}
              className="absolute text-purple-300 text-2xl"
              style={{
                left: `${10 + i * 15}%`,
                bottom: '10%'
              }}
            >
              {['✨', '🌸', '🍃', '💫', '🌙', '⭐'][i]}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
