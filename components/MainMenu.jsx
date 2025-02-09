"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useVantaBackground } from '@/hooks/useVantaBackground';
import { Play, Settings, Info, Maximize, Minimize } from 'lucide-react';

export default function MainMenu() {
  const backgroundRef = useVantaBackground();
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
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const menuItems = [
    { href: '/play', text: 'Play', icon: Play },
    { href: '/settings', text: 'Settings', icon: Settings },
    { href: '/credits', text: 'Credits', icon: Info }
  ];

  return (
    <div ref={backgroundRef} className="relative min-h-screen overflow-hidden">
      <motion.button
        onClick={toggleFullscreen}
        className="fixed top-4 right-4 z-50 w-12 h-12 flex items-center justify-center 
                   bg-purple-500/20 hover:bg-purple-500/30 backdrop-blur-sm 
                   rounded-full transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {isFullscreen ? (
          <Minimize className="w-6 h-6 text-purple-200" />
        ) : (
          <Maximize className="w-6 h-6 text-purple-200" />
        )}
      </motion.button>

      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={logoVariants}
          className="mb-16 relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src="/logo/logo_mialexi_test.png"
            alt="Mialexi Logo"
            width={400}
            height={400}
            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
            priority
          />
        </motion.div>

        <motion.ul 
          className="space-y-6 md:space-y-8 w-full max-w-sm"
          variants={containerVariants}
        >
          {menuItems.map(({ href, text, icon: Icon }) => (
            <motion.li key={href} variants={itemVariants}>
              <Link href={href} className="w-full">
                <motion.div
                  className="group flex items-center justify-center space-x-4 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl cursor-pointer
                            hover:bg-white/20 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-6 h-6 text-blue-300 group-hover:text-blue-200" />
                  <span className="text-blue-300 group-hover:text-blue-200 text-2xl md:text-3xl font-medium">
                    {text}
                  </span>
                </motion.div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}