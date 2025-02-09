import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Maximize, Minimize } from 'lucide-react';

const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Detect iOS only on client side
    const ios = typeof navigator !== 'undefined' 
      ? /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream 
      : false;
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
      const root = document.documentElement;
      if (!isFullscreen) {
        root.classList.add('ios-fullscreen');
        window.scrollTo(0, 0);
        setIsFullscreen(true);
      } else {
        root.classList.remove('ios-fullscreen');
        setIsFullscreen(false);
      }
    } else {
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
    if (!isMounted) return null; // Don't render button until client-side

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
    isIOS: isMounted && isIOS // Only return isIOS when mounted
  };
};

export default useFullscreen;