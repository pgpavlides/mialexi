import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Maximize, Minimize } from 'lucide-react';
import screenfull from 'screenfull';

const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsSupported(screenfull.isEnabled);

    const handleChange = () => {
      setIsFullscreen(screenfull.isFullscreen);
    };

    if (screenfull.isEnabled) {
      screenfull.on('change', handleChange);
      return () => {
        screenfull.off('change', handleChange);
      };
    }
  }, []);

  const toggleFullscreen = async () => {
    if (screenfull.isEnabled) {
      try {
        await screenfull.toggle();
      } catch (err) {
        console.error('Error toggling fullscreen:', err);
      }
    }
  };

  const FullscreenButton = ({ className = '', iconClassName = '' }) => {
    if (!isMounted || !isSupported) return null;

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
    isSupported
  };
};

export default useFullscreen;