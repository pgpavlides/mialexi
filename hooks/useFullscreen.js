// hooks/useFullscreen.js
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Maximize, Minimize } from 'lucide-react';

const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error('Error attempting to exit fullscreen:', err);
      });
    }
  };

  const FullscreenButton = ({ className = '', iconClassName = '' }) => {
    return (
      <motion.button
        onClick={toggleFullscreen}
        className={`fixed right-4 top-4 z-50 w-12 h-12 flex items-center justify-center 
                   bg-purple-500/20 hover:bg-purple-500/30 backdrop-blur-sm 
                   rounded-full transition-colors duration-300 
                   ${className}`.trim()}
        style={{ position: 'fixed', right: '1rem', top: '1rem' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {isFullscreen ? (
          <Minimize className={`w-6 h-6 text-purple-200 ${iconClassName}`.trim()} />
        ) : (
          <Maximize className={`w-6 h-6 text-purple-200 ${iconClassName}`.trim()} />
        )}
      </motion.button>
    );
  };

  return {
    isFullscreen,
    toggleFullscreen,
    FullscreenButton
  };
};

export default useFullscreen;