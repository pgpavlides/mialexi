// app/settings/RoundsSlider.jsx
"use client";

import React from "react";

const RoundsSlider = ({ numberOfRounds, setNumberOfRounds }) => {
  return (
    <div className="mb-8 w-full">
      <label className="block text-sm font-medium mb-2">
        Number of Rounds: {numberOfRounds}
      </label>
      <div className="relative">
        <input
          type="range"
          min="1"
          max="20"
          value={numberOfRounds}
          onChange={(e) => setNumberOfRounds(Number(e.target.value))}
          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${
              (numberOfRounds / 20) * 100
            }%, #e9d5ff ${(numberOfRounds / 20) * 100}%, #e9d5ff 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-400 px-1 mt-1">
          <span>1</span>
          <span>5</span>
          <span>10</span>
          <span>15</span>
          <span>20</span>
        </div>
      </div>
    </div>
  );
};

export default RoundsSlider;