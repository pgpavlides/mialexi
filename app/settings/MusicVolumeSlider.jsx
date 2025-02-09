"use client";

import React from "react";

const MusicVolumeSlider = ({ musicVolume, setMusicVolume }) => {
  return (
    <div className="mb-8 w-full">
      <label className="block text-sm font-medium mb-2 mt-8">
        Στάθμη μουσικής: {musicVolume}%
      </label>
      <input
        type="range"
        min="0"
        max="100"
        value={musicVolume}
        onChange={(e) => setMusicVolume(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default MusicVolumeSlider;
