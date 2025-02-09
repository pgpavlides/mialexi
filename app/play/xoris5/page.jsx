"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import useGameStore from "@/store/gameStore";

// Import card data
import adultCards from "@/data/cards/adult.json";
import animalCards from "@/data/cards/animal.json";
import celebrityCards from "@/data/cards/celebrity.json";
import foodCards from "@/data/cards/food.json";
import geographyCards from "@/data/cards/geography.json";
import plantCards from "@/data/cards/plant.json";
import professionCards from "@/data/cards/profession.json";
import seriesCards from "@/data/cards/series.json";
import songCards from "@/data/cards/song.json";

const cardsData = {
  adult: adultCards,
  animal: animalCards,
  celebrity: celebrityCards,
  food: foodCards,
  geography: geographyCards,
  plant: plantCards,
  profession: professionCards,
  series: seriesCards,
  song: songCards,
};

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

const BackButton = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-purple-500 
               transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full z-50"
  >
    <ArrowLeft size={20} />
    <span>Back</span>
  </motion.button>
);

export default function Xoris5Game() {
  const { teams, categories, roundDuration, numberOfRounds, updateTeam } = useGameStore();
  const router = useRouter();

  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [phase, setPhase] = useState("ready");
  const [timeLeft, setTimeLeft] = useState(roundDuration);
  const [currentCard, setCurrentCard] = useState(null);
  const totalRounds = teams.length * numberOfRounds;
  const [roundsLeft, setRoundsLeft] = useState(totalRounds);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  useEffect(() => {
    let timer;
    if (phase === "playing") {
      setTimeLeft(roundDuration);
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setPhase("timeup");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => timer && clearInterval(timer);
  }, [phase, roundDuration]);

  const getRandomCard = () => {
    const enabledCategories = Object.entries(categories)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    let availableCards = [];
    enabledCategories.forEach((cat) => {
      if (cardsData[cat]) {
        availableCards = availableCards.concat(cardsData[cat]);
      }
    });
    if (availableCards.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    return availableCards[randomIndex];
  };

  const handleStartRound = () => {
    const card = getRandomCard();
    if (!card) {
      alert("No enabled categories or available cards!");
      return;
    }
    setCurrentCard(card);
    setPhase("playing");
    if (document.documentElement.requestFullscreen) {
      document.documentElement
        .requestFullscreen()
        .catch((err) =>
          console.error("Error attempting to enable full-screen mode:", err)
        );
    }
  };

  const handleSkip = () => {
    const card = getRandomCard();
    if (!card) {
      alert("No enabled categories or available cards!");
      return;
    }
    setCurrentCard(card);
  };

  const handleScore = () => {
    const currentTeam = teams[currentTeamIndex];
    const currentScore = currentTeam.score || 0;
    updateTeam(currentTeam.id, { score: currentScore + 1 });
    const card = getRandomCard();
    if (!card) {
      alert("No enabled categories or available cards!");
      return;
    }
    setCurrentCard(card);
  };

  const handleNextTeam = () => {
    setRoundsLeft((prev) => prev - 1);
    if (roundsLeft - 1 <= 0) {
      setPhase("finished");
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } else {
      setCurrentTeamIndex((prev) => (prev + 1) % teams.length);
      setPhase("ready");
    }
  };

  const handleBackClick = () => {
    setShowConfirmPopup(true);
  };

  const handleConfirmBack = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    router.push('/play');
  };

  const handleCancelBack = () => {
    setShowConfirmPopup(false);
  };

  const getTitleFontSize = (word) => {
    const len = word.length;
    if (len <= 5) return "3rem";
    if (len <= 8) return "2.4rem";
    if (len <= 12) return "2rem";
    if (len <= 16) return "2rem";
    return "1.5rem";
  };

  const titleFontSize =
    currentCard && currentCard.word ? getTitleFontSize(currentCard.word) : "4rem";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full relative flex flex-col items-center justify-center p-4 bg-slate-900"
    >
      <BackButton onClick={handleBackClick} />

      <AnimatePresence mode="wait">
        {showConfirmPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-black rounded-lg p-6 max-w-sm w-full text-white"
            >
              <h2 className="text-xl font-bold mb-4">Warning</h2>
              <p className="mb-6">
                Leaving now will lose your game progress. Are you sure you want
                to leave?
              </p>
              <div className="flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancelBack}
                  className="px-4 py-2 text-white hover:bg-gray-700 rounded"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirmBack}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Leave
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {phase === "ready" && (
          <motion.div
            key="ready"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="text-center"
          >
            <motion.h1
              variants={slideUp}
              className="text-4xl text-white font-bold mb-4"
            >
              Team {teams[currentTeamIndex].name} get ready!
            </motion.h1>
            <motion.button
              variants={slideUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartRound}
              className="px-8 py-4 text-2xl bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Start Round
            </motion.button>
          </motion.div>
        )}

        {phase === "playing" && currentCard && (
          <motion.div
            key="playing"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="w-full max-w-2xl h-[calc(100vh-120px)] flex flex-col justify-between px-4"
          >
            {/* Top Section with Timer */}
            <motion.div
              className="h-1.5 rounded-full bg-indigo-500 mb-4 origin-left"
              initial={{ width: "100%" }}
              animate={{ width: `${(timeLeft / roundDuration) * 100}%` }}
              transition={{ ease: "linear", duration: 1 }}
            />

            {/* Middle Section with Card */}
            <motion.div
              variants={scaleIn}
              className="bg-white bg-opacity-10 p-6 rounded-xl text-center text-white flex flex-col gap-4 min-h-[300px] mb-4"
            >
              {/* Main Word Section */}
              <motion.div
                variants={slideUp}
                className="border-b-2 border-white pb-4 mb-4"
              >
                <h1
                  className="font-bold leading-tight"
                  style={{ fontSize: titleFontSize }}
                >
                  {currentCard.word}
                </h1>
              </motion.div>

              {/* Forbidden Words Section */}
              <motion.div className="flex flex-col gap-3">
                {currentCard.forbidden.map((word, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-2xl"
                  >
                    {word}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>

            {/* Bottom Section with Timer and Buttons */}
            <motion.div
              variants={slideUp}
              className="flex flex-col gap-4 mt-auto"
            >
              <div className="text-center">
                <motion.span
                  animate={{ scale: timeLeft <= 10 ? [1, 1.1, 1] : 1 }}
                  transition={{ repeat: timeLeft <= 10 ? Infinity : 0, duration: 0.5 }}
                  className="text-2xl text-white"
                >
                  Time Left: {timeLeft}s
                </motion.span>
              </div>

              <div className="w-full flex justify-around items-center h-[15vh]">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSkip}
                  className="w-2/5 h-full text-3xl bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Skip
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleScore}
                  className="w-2/5 h-full text-3xl bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Got It!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {phase === "timeup" && (
          <motion.div
            key="timeup"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="text-center"
          >
            <motion.h1
              variants={slideUp}
              className="text-5xl text-white mb-4"
            >
              TIME'S UP!
            </motion.h1>
            <motion.button
              variants={slideUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextTeam}
              className="px-8 py-4 text-2xl bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Next Team
            </motion.button>
          </motion.div>
        )}

        {phase === "finished" && (
          <motion.div
            key="finished"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="text-center"
          >
            <motion.h1
              variants={slideUp}
              className="text-5xl text-white mb-4"
            >
              Game Over
            </motion.h1>
            <motion.h2
              variants={slideUp}
              className="text-3xl text-white mb-4"
            >
              Final Scores
            </motion.h2>
            <motion.ul
              variants={slideUp}
              className="list-none p-0 text-white mb-8"
            >
              {teams.map((team, index) => (
                <motion.li
                  key={team.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-2xl mb-2"
                >
                   {team.name}: {team.score || 0} points
                </motion.li>
              ))}
            </motion.ul>
            <motion.button
              variants={slideUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (document.exitFullscreen) {
                  document.exitFullscreen();
                }
                window.location.reload();
              }}
              className="px-8 py-4 text-2xl bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Play Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}