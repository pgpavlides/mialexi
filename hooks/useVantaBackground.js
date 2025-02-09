import { useEffect, useRef } from 'react';
import { VANTA_CONFIG } from '../constants';

export const useVantaBackground = () => {
  const vantaRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Dynamically load Three.js
    const threeScript = document.createElement('script');
    threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    document.head.appendChild(threeScript);

    threeScript.onload = () => {
      // Load Vanta Birds after Three.js is loaded
      const vantaScript = document.createElement('script');
      vantaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.birds.min.js';
      document.head.appendChild(vantaScript);

      vantaScript.onload = () => {
        if (!vantaRef.current && containerRef.current) {
          vantaRef.current = window.VANTA.BIRDS({
            el: containerRef.current,
            ...VANTA_CONFIG,
          });
        }
      };
    };

    // Cleanup function: destroy the Vanta instance and remove the scripts
    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
      }
      document.head.removeChild(threeScript);
      const vantaScript = document.querySelector('script[src*="vanta.birds.min.js"]');
      if (vantaScript) {
        document.head.removeChild(vantaScript);
      }
    };
  }, []);

  return containerRef;
};
