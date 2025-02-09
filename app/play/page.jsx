"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useVantaBackground } from "@/hooks/useVantaBackground";
import { ArrowLeft, Book } from "lucide-react";
import { useRouter } from "next/navigation";
import useFullscreen from '@/hooks/useFullscreen';

// Modal Component
const InstructionsModal = ({ isOpen, setIsOpen, gameTitle, instructions }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <Book className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <Book />
              </div>
              <h3 className="text-3xl font-bold text-center mb-4">
                {instructions.title}
              </h3>
              <div className="space-y-4 mb-6">
                <ul className="list-disc list-inside space-y-2">
                  {instructions.steps.map((step, index) => (
                    <li key={index} className="text-white/90">
                      {step}
                    </li>
                  ))}
                </ul>
                {instructions.tips && (
                  <div className="mt-4 p-4 bg-white/10 rounded-lg">
                    <p className="text-white/90 font-medium">💡 Tip: {instructions.tips}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Got it!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Back button component
const BackButton = () => {
  const router = useRouter();
  return (
    <motion.button
      onClick={() => router.push("/")}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-purple-500 
                 transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full z-50"
    >
      <ArrowLeft size={20} />
      <span>Back</span>
    </motion.button>
  );
};

// Sample data with instructions
const cards = [
  {
    id: 1,
    title: "Χωρίς 5",
    imageUrl: "/taboopes.webp",
    route: "/play/xoris5",
    instructions: {
      title: "How to play Χωρίς 5",
      steps: [
        "Divide players into two or more teams",
        "One player from each team takes turns describing a word",
        "The catch: You can't use words containing the number 5",
        "Your team must guess the word within the time limit",
        "If you use a word with 5, you lose you skip the word"
      ],
      tips: "Watch the timer and think carefully before speaking. Some words might be tricky!"
    }
  },
  {
    id: 2,
    title: "Με Στίχους",
    imageUrl: null,
    route: "/play/lyrics",
    instructions: {
      title: "How to play Με Στίχους",
      steps: [
        "Select a category of songs",
        "Listen to the lyrics carefully",
        "Try to complete the missing words",
        "Score points for each correct word",
        "Bonus points for completing entire verses"
      ],
      tips: "Pay attention to the rhythm and context of the song to help guess the words"
    }
  },
  {
    id: 3,
    title: "Με μια λέξη",
    imageUrl: null,
    route: "/play/oneword",
    instructions: {
      title: "How to play Με μια λέξη",
      steps: [
        "Get your one-word clue",
        "Look at the image carefully",
        "Use only one word to describe it",
        "Other players must guess the image",
        "Score points for successful guesses"
      ],
      tips: "Choose your word wisely - it should be specific enough to guide but not too obvious"
    }
  },
  {
    id: 4,
    title: "Game 4",
    imageUrl: null,
    route: "#",
    instructions: {
      title: "Coming Soon",
      steps: ["This game is currently under development"],
      tips: "Stay tuned for updates!"
    }
  },
  {
    id: 5,
    title: "Game 5",
    imageUrl: null,
    route: "#",
    instructions: {
      title: "Coming Soon",
      steps: ["This game is currently under development"],
      tips: "Stay tuned for updates!"
    }
  },
  {
    id: 6,
    title: "Game 6",
    imageUrl: null,
    route: "#",
    instructions: {
      title: "Coming Soon",
      steps: ["This game is currently under development"],
      tips: "Stay tuned for updates!"
    }
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Game Card Component
const GameCard = ({ card, onInfoClick }) => {
  const handleInfoClick = (e) => {
    e.preventDefault();
    onInfoClick(card.title, card.instructions);
  };
  return (
    <div className="relative">
      <motion.button
        onClick={handleInfoClick}
        className="absolute top-4 right-4 z-10 bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors"
      >
        <Book className="w-5 h-5 text-white" />
      </motion.button>
      <Link href={card.route}>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg cursor-pointer
                     border border-white/20 hover:border-purple-500/50 transition-colors"
        >
          <div className={`relative w-full h-48 ${!card.imageUrl ? "bg-gray-200" : ""}`}>
            {card.imageUrl ? (
              <img
                src={`./games/${card.imageUrl}`}
                alt={card.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-900">
                <motion.span
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  className="text-white text-2xl font-bold"
                >
                  Under Construction
                </motion.span>
              </div>
            )}
          </div>
          <motion.div
            className="p-4"
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
          >
            <h3 className="text-xl font-bold text-gray-800 text-center">
              {card.title}
            </h3>
          </motion.div>
        </motion.div>
      </Link>
    </div>
  );
};

export default function Play() {
  const backgroundRef = useVantaBackground();
  const { FullscreenButton, isFullscreen, isIOS } = useFullscreen();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState({ title: "", instructions: null });

  const handleInfoClick = (gameTitle, instructions) => {
    setSelectedGame({ title: gameTitle, instructions });
    setModalOpen(true);
  };

  return (
    <div ref={backgroundRef} className="min-h-screen w-full p-4 md:p-8 relative">
      <BackButton />
      <FullscreenButton />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-16 md:mt-0"
      >
        <h1 className="text-3xl font-bold mb-4 text-center text-white">Play</h1>
        <p className="text-center mb-8 text-white/80">
          Get ready to play! The game will start soon. Enjoy the experience!
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {cards.map((card) => (
          <motion.div key={card.id} variants={itemVariants}>
            <GameCard card={card} onInfoClick={handleInfoClick} />
          </motion.div>
        ))}
      </motion.div>

      <InstructionsModal 
        isOpen={modalOpen} 
        setIsOpen={setModalOpen} 
        gameTitle={selectedGame.title}
        instructions={selectedGame.instructions}
      />
    </div>
  );
}