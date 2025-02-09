"use client";

import React from "react";

const TeamControls = ({
  numberOfTeams,
  setNumberOfTeams,
  playersPerTeam,
  setPlayersPerTeam,
  roundDuration,
  setRoundDuration,
  styles,
}) => {
  // Developer flag: set to true to include the 2s option for testing
  const enableDevOption = false; // Change to true to enable the 2s option

  // Create the durations array: include 2s if dev option is enabled, otherwise use [30, 60, 90, 120]
  const durations = enableDevOption ? [2, 30, 60, 90, 120] : [30, 60, 90, 120];

  return (
    <div className="grid grid-cols-1 gap-8 mb-6 w-full">
      {/* Number of Teams */}
      <div className="flex flex-col items-center space-y-4 w-full">
        <label className="text-sm font-medium">Number of Teams</label>
        <div className={styles.radioInput}>
          {[1, 2, 3, 4].map((num) => (
            <label key={num}>
              <input
                type="radio"
                name="teams"
                value={num}
                checked={numberOfTeams === num}
                onChange={(e) => setNumberOfTeams(parseInt(e.target.value))}
              />
              <span>{num}</span>
            </label>
          ))}
          <span className={styles.selection}></span>
        </div>
      </div>

      {/* Players per Team */}
      <div className="flex flex-col items-center space-y-4 w-full">
        <label className="text-sm font-medium">Players per Team</label>
        <div className={styles.radioInput}>
          {[1, 2, 3, 4].map((num) => (
            <label key={num}>
              <input
                type="radio"
                name="players"
                value={num}
                checked={playersPerTeam === num}
                onChange={(e) => setPlayersPerTeam(parseInt(e.target.value))}
              />
              <span>{num}</span>
            </label>
          ))}
          <span className={styles.selection}></span>
        </div>
      </div>

      {/* Round Duration */}
      <div className="flex flex-col items-center space-y-4 w-full">
        <label className="text-sm font-medium">Round Duration</label>
        {/* Container with restricted max-width on mobile */}
        <div className="w-full" style={{ maxWidth: "280px" }}>
          <div
            className={styles.radioInput}
            style={{ "--container_width": "280px" }}
          >
            {durations.map((duration, index) => (
              <label key={`${duration}-${index}`}>
                <input
                  type="radio"
                  name="duration"
                  value={duration}
                  checked={roundDuration === duration}
                  onChange={(e) =>
                    setRoundDuration(parseInt(e.target.value))
                  }
                />
                <span>{duration}s</span>
              </label>
            ))}
            <span className={styles.selection}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamControls;
