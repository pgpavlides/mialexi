// app/settings/page.jsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TeamList from "./TeamList";
import TeamControls from "./TeamControls";
import CategorySelector from "./CategorySelector";
import MusicVolumeSlider from "./MusicVolumeSlider";
import RoundsSlider from "./RoundsSlider";
import SpecialSettings from "./SpecialSettings";
import AgeVerificationModal from "./AgeVerificationModal";
import useGameStore from "@/store/gameStore";
import { categoryLabels } from "@/constants";
import styles from "./Settings.module.scss";

export default function Settings() {
  const router = useRouter();
  const [showAgeDialog, setShowAgeDialog] = useState(false);
  const [editingTeamId, setEditingTeamId] = useState(null);

  const {
    musicVolume,
    setMusicVolume,
    noAds,
    setNoAds,
    categories,
    toggleCategory,
    roundDuration,
    setRoundDuration,
    numberOfRounds,
    setNumberOfRounds,
    numberOfTeams,
    playersPerTeam,
    teams,
    setNumberOfTeams,
    setPlayersPerTeam,
    updateTeam,
  } = useGameStore();

  const handleCategoryChange = (category) => {
    if (category === "adult") {
      if (!categories.adult) {
        setShowAgeDialog(true);
      } else {
        toggleCategory("adult");
      }
      return;
    }
    toggleCategory(category);
  };

  const handleAgeConfirm = () => {
    toggleCategory("adult");
    setShowAgeDialog(false);
  };

  const handleAgeCancel = () => {
    setShowAgeDialog(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 bg-slate-900">
      <div className="bg-slate-800 backdrop-blur-sm p-6 md:p-8 rounded-xl w-full max-w-[95%] xl:max-w-[1800px]">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">Settings</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Game Controls Section */}
            <div className="bg-slate-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-6 text-white">Game Controls</h3>
              <div className="space-y-8">
                <TeamControls
                  numberOfTeams={numberOfTeams}
                  setNumberOfTeams={setNumberOfTeams}
                  playersPerTeam={playersPerTeam}
                  setPlayersPerTeam={setPlayersPerTeam}
                  roundDuration={roundDuration}
                  setRoundDuration={setRoundDuration}
                  styles={styles}
                />
                <RoundsSlider 
                  numberOfRounds={numberOfRounds}
                  setNumberOfRounds={setNumberOfRounds}
                />
              </div>
            </div>

            {/* Teams Section */}
            <div className="bg-slate-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-6 text-white">Teams</h3>
              <TeamList
                teams={teams}
                editingTeamId={editingTeamId}
                setEditingTeamId={setEditingTeamId}
                updateTeam={updateTeam}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Categories Section */}
            <div className="bg-slate-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-6 text-white">Categories</h3>
              <CategorySelector
                categories={categories}
                toggleCategory={toggleCategory}
                handleCategoryChange={handleCategoryChange}
                categoryLabels={categoryLabels}
                styles={styles}
              />
            </div>

            {/* Audio & Special Settings Section */}
            <div className="bg-slate-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-6 text-white">Audio & Special Settings</h3>
              <div className="space-y-6">
                <MusicVolumeSlider
                  musicVolume={musicVolume}
                  setMusicVolume={setMusicVolume}
                />
                <SpecialSettings
                  noAds={noAds}
                  setNoAds={setNoAds}
                  categories={categories}
                  handleCategoryChange={handleCategoryChange}
                  styles={styles}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="w-full mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Return to Main Menu
        </button>
      </div>

      {/* Age Verification Modal */}
      <AgeVerificationModal
        isOpen={showAgeDialog}
        onClose={handleAgeCancel}
        onConfirm={handleAgeConfirm}
      />
    </div>
  );
}