
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { Home, User, BookOpen, Music, Heart, Settings, LogOut, Wind, TrendingUp } from 'lucide-react';

const Navigation = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard', color: 'text-blue-600 hover:bg-blue-50' },
    { to: '/affirmations', icon: Heart, label: 'Affirmations', color: 'text-pink-600 hover:bg-pink-50' },
    { to: '/sounds', icon: Music, label: 'Sound Therapy', color: 'text-green-600 hover:bg-green-50' },
    { to: '/breathing', icon: Wind, label: 'Breathing', color: 'text-teal-600 hover:bg-teal-50' },
    { to: '/journal', icon: BookOpen, label: 'Journal', color: 'text-orange-600 hover:bg-orange-50' },
    { to: '/stress-levels', icon: TrendingUp, label: 'Stress Levels', color: 'text-red-600 hover:bg-red-50' },
    { to: '/profile', icon: Settings, label: 'Profile', color: 'text-purple-600 hover:bg-purple-50' }
  ];

  if (user.isAdmin) {
    navItems.push({ to: '/admin', icon: User, label: 'Admin', color: 'text-gray-600 hover:bg-gray-50' });
  }

  return (
    <nav className="bg-white/90 backdrop-blur-lg border-b border-gradient-to-r from-purple-200 via-blue-200 to-teal-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center">
            <Logo size="md" showText={true} />
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(({ to, icon: Icon, label, color }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium ${
                  location.pathname === to
                    ? 'bg-gradient-to-r from-purple-100 via-blue-100 to-teal-100 text-gray-800 shadow-md'
                    : `text-gray-600 hover:text-gray-800 ${color.split(' ')[1]} hover:shadow-sm`
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <span className="text-sm text-gray-600 bg-gradient-to-r from-purple-50 to-blue-50 px-3 py-1 rounded-full">
                Hello, {user.displayName || 'Guest'}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={16} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
