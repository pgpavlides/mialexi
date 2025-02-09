import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Maximize, Minimize } from 'lucide-react';

const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(ios);

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    // Only add fullscreen listener for non-iOS devices
    if (!ios) {
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }
  }, []);

  const toggleFullscreen = async () => {
    if (isIOS) {
      // For iOS, toggle a class that uses CSS to make the content fullscreen-like
      const root = document.documentElement;
      if (!isFullscreen) {
        root.classList.add('ios-fullscreen');
        // Scroll to top to ensure proper positioning
        window.scrollTo(0, 0);
        setIsFullscreen(true);
      } else {
        root.classList.remove('ios-fullscreen');
        setIsFullscreen(false);
      }
    } else {
      // Standard fullscreen API for other devices
      if (!document.fullscreenElement) {
        try {
          await document.documentElement.requestFullscreen();
        } catch (err) {
          console.error('Error attempting to enable fullscreen:', err);
        }
      } else {
        try {
          await document.exitFullscreen();
        } catch (err) {
          console.error('Error attempting to exit fullscreen:', err);
        }
      }
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
    FullscreenButton,
    isIOS
  };
};

export default useFullscreen;