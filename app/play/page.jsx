"use client";

import React from "react";
import { useVantaBackground } from '@/hooks/useVantaBackground';


// Sample data for demonstration purposes.
// Replace this with your real data or fetch it as needed.
const cards = [
  { id: 1, title: "Χωρίς 5", imageUrl: "/taboopes.webp" },
  { id: 2, title: "Με Στίχους", imageUrl: null },
  { id: 3, title: "Με μια λέξη", imageUrl: null },
  { id: 4, title: "Game 4", imageUrl: null },
  { id: 5, title: "Game 5", imageUrl: null },
  { id: 6, title: "Game 6", imageUrl: null },
  // Add more card objects as needed
];

export default function Play() {
    const backgroundRef = useVantaBackground();
  return (
    <div ref={backgroundRef} className="min-h-screen w-full p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Play</h1>
      <p className="text-center mb-8">
        Get ready to play! The game will start soon. Enjoy the experience!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
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
                  <span className="text-white text-2xl font-bold">
                    Under Construction
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 text-center">
                {card.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a href="/" className="text-blue-500 hover:underline">
          Back to Home
        </a>
      </div>
    </div>
  );
}
