// store/gameStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { categoryLabels } from '@/constants'

const useGameStore = create(
  persist(
    (set) => ({
      // Team settings
      teamSize: 2,
      teamName: '',
      teamColor: '#6366f1',
      roundDuration: 60,
      musicVolume: 50,
      noAds: false,
      
      // Categories settings (initialized from categoryLabels)
      categories: Object.keys(categoryLabels).reduce((acc, key) => {
        // Don't include 'all' in the initial state
        if (key !== 'all') {
          acc[key] = false;
        }
        return acc;
      }, {}),

      // Actions for team settings
      setTeamSize: (size) => set({ teamSize: size }),
      setTeamName: (name) => set({ teamName: name }),
      setTeamColor: (color) => set({ teamColor: color }),
      setRoundDuration: (duration) => set({ roundDuration: duration }),
      setMusicVolume: (volume) => set({ musicVolume: volume }),
      setNoAds: (value) => set({ noAds: value }),

      // Actions for categories
      toggleCategory: (category) => set((state) => {
        if (category === 'adult') {
          // Handle adult category separately if needed
          return {
            categories: {
              ...state.categories,
              adult: !state.categories.adult
            }
          }
        }

        if (category === 'all') {
          // Toggle all regular categories (excluding adult)
          const newValue = !Object.values(state.categories).every(Boolean)
          const updatedCategories = { ...state.categories }
          Object.keys(state.categories).forEach(key => {
            if (key !== 'adult') {
              updatedCategories[key] = newValue
            }
          })
          return { categories: updatedCategories }
        }

        // Toggle individual category
        return {
          categories: {
            ...state.categories,
            [category]: !state.categories[category]
          }
        }
      }),

      // Reset all settings
      resetSettings: () => set({
        teamSize: 2,
        teamName: '',
        teamColor: '#6366f1',
        roundDuration: 60,
        musicVolume: 50,
        noAds: false,
        categories: Object.keys(categoryLabels).reduce((acc, key) => {
          if (key !== 'all') {
            acc[key] = false;
          }
          return acc;
        }, {})
      }),
    }),
    {
      name: 'game-settings',
      partialize: (state) => ({
        teamSize: state.teamSize,
        teamName: state.teamName,
        teamColor: state.teamColor,
        roundDuration: state.roundDuration,
        musicVolume: state.musicVolume,
        noAds: state.noAds,
        categories: state.categories,
      }),
    }
  )
)

export default useGameStore