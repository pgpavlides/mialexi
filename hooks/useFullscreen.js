import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Maximize, Minimize } from 'lucide-react';

const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    const ios = typeof navigator !== 'undefined' 
      ? /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream 
      : false;
    setIsIOS(ios);

    // Handle scroll events for iOS
    if (ios) {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        // If scrolled up more than 50px, trigger the "hide UI" behavior
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          document.documentElement.classList.add('ios-scroll-up');
        } else {
          document.documentElement.classList.remove('ios-scroll-up');
        }
        
        setLastScrollY(currentScrollY);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // Regular fullscreen handling for non-iOS
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    if (!ios) {
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }
  }, [lastScrollY]);

  const toggleFullscreen = async () => {
    if (isIOS) {
      const root = document.documentElement;
      if (!isFullscreen) {
        root.classList.add('ios-fullscreen');
        document.body.classList.add('ios-fullscreen');
        // Keep the scroll position
        const currentScrollY = window.scrollY;
        if (currentScrollY > 50) {
          root.classList.add('ios-scroll-up');
        }
        setIsFullscreen(true);
      } else {
        root.classList.remove('ios-fullscreen');
        root.classList.remove('ios-scroll-up');
        document.body.classList.remove('ios-fullscreen');
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
    if (!isMounted) return null;

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
    isIOS: isMounted && isIOS
  };
};

export default useFullscreen;