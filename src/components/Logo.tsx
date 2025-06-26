
import React from 'react';
import { Wind, Heart, Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        {/* Gradient background circle */}
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 p-2 shadow-lg`}>
          {/* Inner circle with wave pattern */}
          <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
            <Wind className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-8 h-8'} text-white z-10`} />
            {/* Decorative elements */}
            <div className="absolute top-0 right-0">
              <Heart className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} text-pink-300 opacity-70`} />
            </div>
            <div className="absolute bottom-0 left-0">
              <Sparkles className={`${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'} text-yellow-300 opacity-70`} />
            </div>
          </div>
        </div>
        {/* Outer glow effect */}
        <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-gradient-to-br from-purple-400 via-blue-400 to-teal-400 opacity-20 blur-md -z-10`}></div>
      </div>
      
      {showText && (
        <span className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent`}>
          ZenWave
        </span>
      )}
    </div>
  );
};

export default Logo;
