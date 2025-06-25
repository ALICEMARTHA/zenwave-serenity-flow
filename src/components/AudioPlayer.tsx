
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react';

interface AudioSession {
  id: string;
  title: string;
  category: 'focus' | 'relax' | 'sleep';
  duration: number;
  url: string;
  description: string;
}

interface AudioPlayerProps {
  session: AudioSession;
  autoPlay?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ session, autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'focus': return 'bg-blue-500';
      case 'relax': return 'bg-green-500';
      case 'sleep': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
      <audio ref={audioRef} src={session.url} preload="metadata" />
      
      <div className="flex items-start space-x-4 mb-6">
        <div className={`w-16 h-16 ${getCategoryColor(session.category)} rounded-xl flex items-center justify-center`}>
          <span className="text-white text-2xl">🎵</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-1">{session.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{session.description}</p>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(session.category).replace('bg-', 'bg-opacity-80 bg-')}`}>
            {session.category.charAt(0).toUpperCase() + session.category.slice(1)}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500 w-12">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={session.duration}
            step={1}
            className="flex-1"
            onValueChange={handleSeek}
          />
          <span className="text-sm text-gray-500 w-12">{formatTime(session.duration)}</span>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Button variant="ghost" size="sm">
            <SkipBack size={20} />
          </Button>
          <Button
            onClick={togglePlayPause}
            className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>
          <Button variant="ghost" size="sm">
            <SkipForward size={20} />
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Volume2 size={16} className="text-gray-500" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            className="flex-1"
            onValueChange={(value) => setVolume(value[0])}
          />
          <span className="text-sm text-gray-500 w-8">{volume}%</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
