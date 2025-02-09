import { create } from "zustand";
import { persist } from "zustand/middleware";
import { categoryLabels } from "@/constants";

const useGameStore = create(
  persist(
    (set) => ({
      // Game settings
      numberOfTeams: 2,
      playersPerTeam: 2,
      roundDuration: 60, // Default duration
      numberOfRounds: 3, // Default number of rounds
      musicVolume: 50, // Default volume
      noAds: false, // Ads enabled by default

      // Teams array to store team configurations
      teams: [
        { id: 1, name: "Team 1", color: "#6366f1" },
        { id: 2, name: "Team 2", color: "#ec4899" },
      ],

      // Categories settings (initialized from categoryLabels)
      categories: Object.keys(categoryLabels).reduce((acc, key) => {
        if (key !== "all") {
          acc[key] = false; // Default all categories to "false"
        }
        return acc;
      }, {}),

      // Actions for game settings
      setNumberOfTeams: (count) =>
        set((state) => {
          const currentTeams = [...state.teams];

          // If increasing teams, add new teams
          while (currentTeams.length < count) {
            currentTeams.push({
              id: currentTeams.length + 1,
              name: `Team ${currentTeams.length + 1}`,
              color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
            });
          }

          // If decreasing teams, remove excess teams
          while (currentTeams.length > count) {
            currentTeams.pop();
          }

          return {
            numberOfTeams: count,
            teams: currentTeams,
          };
        }),

      setPlayersPerTeam: (count) => set({ playersPerTeam: count }),
      setRoundDuration: (duration) => set({ roundDuration: duration }),
      setNumberOfRounds: (rounds) => set({ numberOfRounds: rounds }),
      setMusicVolume: (volume) => set({ musicVolume: volume }),
      setNoAds: (value) => set({ noAds: value }),

      // Actions for team management
      updateTeam: (teamId, updates) =>
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === teamId ? { ...team, ...updates } : team
          ),
        })),

      // Actions for categories
      toggleCategory: (category) =>
        set((state) => {
          if (category === "adult") {
            // Toggle only the adult category
            return {
              categories: {
                ...state.categories,
                adult: !state.categories.adult,
              },
            };
          }

          if (category === "all") {
            // Toggle all categories (except "adult")
            const newValue = !Object.values(state.categories).every(Boolean);
            const updatedCategories = { ...state.categories };
            Object.keys(state.categories).forEach((key) => {
              if (key !== "adult") {
                updatedCategories[key] = newValue;
              }
            });
            return { categories: updatedCategories };
          }

          // Toggle individual category
          return {
            categories: {
              ...state.categories,
              [category]: !state.categories[category],
            },
          };
        }),

      // Reset all settings
      resetSettings: () =>
        set({
          numberOfTeams: 2,
          playersPerTeam: 2,
          roundDuration: 60,
          numberOfRounds: 3,
          musicVolume: 50,
          noAds: false,
          teams: [
            { id: 1, name: "Team 1", color: "#6366f1" },
            { id: 2, name: "Team 2", color: "#ec4899" },
          ],
          categories: Object.keys(categoryLabels).reduce((acc, key) => {
            if (key !== "all") {
              acc[key] = false;
            }
            return acc;
          }, {}),
        }),
    }),
    {
      name: "game-settings",
      partialize: (state) => ({
        numberOfTeams: state.numberOfTeams,
        playersPerTeam: state.playersPerTeam,
        roundDuration: state.roundDuration,
        numberOfRounds: state.numberOfRounds,
        musicVolume: state.musicVolume,
        noAds: state.noAds,
        teams: state.teams,
        categories: state.categories,
      }),
    }
  )
);

export default useGameStore;