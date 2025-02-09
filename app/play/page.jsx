"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useVantaBackground } from "@/hooks/useVantaBackground";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

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

// Sample data for demonstration purposes.
const cards = [
  {
    id: 1,
    title: "Χωρίς 5",
    imageUrl: "/taboopes.webp",
    route: "/play/xoris5",
  },
  { id: 2, title: "Με Στίχους", imageUrl: null, route: "/play/lyrics" },
  { id: 3, title: "Με μια λέξη", imageUrl: null, route: "/play/oneword" },
  { id: 4, title: "Game 4", imageUrl: null, route: "#" },
  { id: 5, title: "Game 5", imageUrl: null, route: "#" },
  { id: 6, title: "Game 6", imageUrl: null, route: "#" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Play() {
  const backgroundRef = useVantaBackground();

  return (
    <div
      ref={backgroundRef}
      className="min-h-screen w-full p-4 md:p-8 relative"
    >
      <BackButton />

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
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {cards.map((card) => (
          <motion.div key={card.id} variants={item}>
            <Link href={card.route}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg cursor-pointer
                         border border-white/20 hover:border-purple-500/50 transition-colors"
              >
                <div
                  className={`relative w-full h-48 ${
                    !card.imageUrl ? "bg-gray-200" : ""
                  }`}
                >
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
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
