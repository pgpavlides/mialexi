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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-slate-800 backdrop-blur-sm p-6 rounded-xl w-full max-w-[95%] xl:max-w-[1200px] 2xl:max-w-[1400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Ρυθμίσεις</h2>

        {/* Team Controls */}
        <TeamControls
          numberOfTeams={numberOfTeams}
          setNumberOfTeams={setNumberOfTeams}
          playersPerTeam={playersPerTeam}
          setPlayersPerTeam={setPlayersPerTeam}
          roundDuration={roundDuration}
          setRoundDuration={setRoundDuration}
          styles={styles}
        />

        {/* Rounds Slider */}
        <RoundsSlider 
          numberOfRounds={numberOfRounds}
          setNumberOfRounds={setNumberOfRounds}
        />

        {/* Team List */}
        <TeamList
          teams={teams}
          editingTeamId={editingTeamId}
          setEditingTeamId={setEditingTeamId}
          updateTeam={updateTeam}
        />

        {/* Music Volume Slider */}
        <MusicVolumeSlider
          musicVolume={musicVolume}
          setMusicVolume={setMusicVolume}
        />

        {/* Category Selector */}
        <CategorySelector
          categories={categories}
          toggleCategory={toggleCategory}
          handleCategoryChange={handleCategoryChange}
          categoryLabels={categoryLabels}
          styles={styles}
        />

        {/* Special Settings */}
        <SpecialSettings
          noAds={noAds}
          setNoAds={setNoAds}
          categories={categories}
          handleCategoryChange={handleCategoryChange}
          styles={styles}
        />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Επιστροφή στην αρχική
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