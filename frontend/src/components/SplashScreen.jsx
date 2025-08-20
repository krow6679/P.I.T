import React, { useEffect, useState } from 'react';
import { Ghost, Zap, Radar } from 'lucide-react';

const SplashScreen = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            onComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-green-900/20"></div>
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-500/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Logo and title */}
      <div className="relative z-10 text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Ghost className="w-16 h-16 text-green-500 mr-2" />
          <Zap className="w-12 h-12 text-purple-500" />
          <Radar className="w-16 h-16 text-green-500 ml-2" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 tracking-wider">
          GHOST<span className="text-green-500">HUNTER</span>
        </h1>
        <p className="text-green-400 text-lg font-mono">Paranormal Investigation Suite</p>
      </div>

      {/* Loading bar */}
      <div className="relative w-80 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-purple-500 rounded-full transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Loading text */}
      <p className="text-green-400 text-sm mt-4 font-mono">
        Initializing sensors... {progress}%
      </p>

      {/* Glitch effect */}
      {loading && (
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px] animate-pulse" 
             style={{ animationDuration: '0.1s' }}></div>
      )}
    </div>
  );
};

export default SplashScreen;