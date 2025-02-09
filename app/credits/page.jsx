"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  
  return (
    <motion.button
      onClick={() => router.back()}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-purple-500 
                 transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full"
    >
      <ArrowLeft size={20} />
      <span>Back</span>
    </motion.button>
  );
};

const ProfileCard = ({ name, title, bio, imageUrl, linkedIn, github, email }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[90vw] md:w-[272px] min-h-[600px] md:min-h-[450px] bg-[#171717] transition-all duration-1000 relative
                 before:content-[''] before:absolute before:top-0 before:left-[30px] before:right-0 before:h-[30px] before:bg-[#171717]
                 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-[30px] after:h-[30px] after:bg-[#171717]
                 [clip-path:polygon(30px_0%,100%_0,100%_calc(100%-30px),calc(100%-30px)_100%,0_100%,0%_30px)]
                 rounded-tr-[20px] rounded-bl-[20px] flex flex-col p-4 md:p-6"
    >
      <div className="relative w-24 h-24 mx-auto mb-6">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover rounded-xl"
          sizes="96px"
        />
      </div>
      
      <span className="font-bold text-white text-center text-xl mb-3">
        {name}
      </span>
      
      <span className="text-gray-400 text-center text-base mb-3">
        {title}
      </span>

      <p className="text-white text-center text-base px-2 md:px-4 mb-8 flex-grow">
        {bio}
      </p>

      <div className="flex justify-center gap-6 mb-8">
        {linkedIn && (
          <a href={linkedIn} target="_blank" rel="noopener noreferrer" 
             className="text-white hover:text-purple-500 transition-colors">
            <Linkedin size={28} />
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer"
             className="text-white hover:text-purple-500 transition-colors">
            <Github size={28} />
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`}
             className="text-white hover:text-purple-500 transition-colors">
            <Mail size={28} />
          </a>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3 mx-auto rounded-full font-bold bg-white text-black
                   hover:bg-purple-500 hover:text-white transition-colors duration-300 mb-4"
      >
        Contact
      </motion.button>
    </motion.div>
  );
};

export default function Credits() {
  const profiles = [
    {
      name: "Giorgos Pavlidis",
      title: "Full Stack Developer",
      bio: "Passionate developer focused on creating intuitive and efficient web applications. Specialized in React, Node.js, and modern web technologies.",
      imageUrl: "/george.jfif",
      linkedIn: "https://www.linkedin.com/in/pgpavlides/",
      github: "https://github.com/pgpavlides",
      email: "pgpavlides@gmail.com"
    },
    {
      name: "Mariana Gianneiou",
      title: "Creative Desinger",
      bio: "Creative designer with a keen eye for user experience and interface design. Specialized in creating beautiful and functional digital experiences.",
      imageUrl: "/marianna.jfif",
      linkedIn: "https://www.linkedin.com/in/mariana-gianneiou/",
      github: "https://github.com/marianagianneiou",
      email: "marianagianneiou@gmail.com"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-slate-900 p-2 md:p-8"
    >
      <BackButton />

      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-12 mt-16 md:mt-0"
      >
        Creators
        
      </motion.h1>

      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="flex flex-col md:flex-row gap-8 md:gap-8 mb-6 md:mb-12"
      >
        {profiles.map((profile, index) => (
          <ProfileCard key={index} {...profile} />
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 text-center max-w-2xl px-2 md:px-4"
      >
        This project was crafted with ❤️ by our dedicated team. Special thanks to all contributors
        who helped make this possible.
      </motion.p>
    </motion.div>
  );
}