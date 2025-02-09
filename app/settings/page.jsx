// app/settings/page.jsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import { categoryLabels } from '@/constants';
import * as Icons from 'lucide-react';
import styles from './Settings.module.scss';
import useGameStore from '@/store/gameStore';

const categoryIcons = {
  all: Icons.CheckSquare,
  series: Icons.Tv2,
  song: Icons.Music,
  celebrity: Icons.Users,
  geography: Icons.Globe2,
  animal: Icons.Cat,
  plant: Icons.Flower2,
  food: Icons.UtensilsCrossed,
  profession: Icons.Briefcase,
};

export default function Settings() {
  const router = useRouter();
  const [showAgeDialog, setShowAgeDialog] = React.useState(false);
  
  // Get state and actions from store
  const {
    musicVolume,
    setMusicVolume,
    noAds,
    setNoAds,
    categories,
    toggleCategory,
    teamSize,
    setTeamSize,
    teamColor,
    setTeamColor,
    roundDuration,
    setRoundDuration
  } = useGameStore();

  // List of regular categories (excluding 'adult' and 'all')
  const regularCategories = [
    'series',
    'song',
    'celebrity',
    'geography',
    'animal',
    'plant',
    'food',
    'profession',
  ];

  const handleCategoryChange = (category) => {
    if (category === 'adult') {
      setShowAgeDialog(true);
      return;
    }
    toggleCategory(category);
  };

  const handleAgeConfirm = () => {
    toggleCategory('adult');
    setShowAgeDialog(false);
  };

  const handleAgeCancel = () => {
    setShowAgeDialog(false);
  };

  // Check if all regular categories are selected
  const areAllSelected = regularCategories.every(cat => categories[cat]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-slate-800 backdrop-blur-sm p-8 rounded-xl max-w-7xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Ρυθμίσεις</h2>
        
        {/* Game Settings Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Game Settings</h3>
          <div className="space-y-4">
            {/* Team Size */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Team Size</label>
              <input
                type="number"
                min="1"
                max="10"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600"
              />
            </div>

            {/* Round Duration */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">
                Round Duration: {roundDuration} seconds
              </label>
              <input
                type="range"
                min="30"
                max="180"
                step="10"
                value={roundDuration}
                onChange={(e) => setRoundDuration(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Team Color */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Team Color</label>
              <input
                type="color"
                value={teamColor}
                onChange={(e) => setTeamColor(e.target.value)}
                className="h-10 w-20 bg-transparent cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Music Volume Slider */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
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

        {/* Categories Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <label className="block text-sm font-medium">
              Επιλογή κατηγοριών:
            </label>
            <button
              onClick={() => handleCategoryChange('all')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                areAllSelected 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              <Icons.CheckSquare className="w-5 h-5" />
              <span>Επιλογή Όλων</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryLabels &&
              Object.entries(categoryLabels)
                .filter(([key]) => key !== 'adult' && key !== 'all')
                .map(([key, label]) => {
                  const IconComponent = categoryIcons[key];
                  return (
                    <div 
                      key={key} 
                      className="flex items-center p-6 bg-slate-900 rounded-lg hover:bg-slate-950 transition-colors"
                    >
                      <div className="flex items-center flex-1 space-x-3">
                        {IconComponent && (
                          <IconComponent className="w-8 h-8 text-purple-600" />
                        )}
                        <span className="text-base">{label}</span>
                      </div>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={categories[key]}
                          onChange={() => handleCategoryChange(key)}
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  );
                })}
          </div>
        </div>

        {/* Special Settings Box */}
        <div className="bg-slate-900 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Επιπλέον ρυθμίσεις</h3>
          <div className="space-y-4">
            {/* Adult Content Toggle */}
            <div className="flex items-center justify-between p-2 bg-slate-700 rounded">
              <div>
                <span className="font-medium">Άνω των 18 λέξεις</span>
                <p className="text-sm text-gray-500">
                  Ενεργοποίηση περιεχομένου για ενήλικες
                </p>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={categories.adult}
                  onChange={() => handleCategoryChange('adult')}
                />
                <span className={styles.slider}></span>
              </label>
            </div>

            {/* No Ads Toggle */}
            <div className="flex items-center justify-between p-2 bg-slate-700 rounded">
              <div>
                <span className="font-medium">Χωρίς διαφημίσεις</span>
                <p className="text-sm text-gray-500">
                  Απενεργοποίηση όλων των διαφημίσεων
                </p>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={noAds}
                  onChange={() => setNoAds(!noAds)}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
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