"use client";

import React from "react";
import * as Icons from "lucide-react";

const TeamList = ({ teams, editingTeamId, setEditingTeamId, updateTeam }) => {
  const handleTeamNameEdit = (teamId, name) => {
    updateTeam(teamId, { name });
    setEditingTeamId(null);
  };

  const handleTeamNameKeyPress = (e, teamId, name) => {
    if (e.key === "Enter") {
      handleTeamNameEdit(teamId, name);
    }
  };

  return (
    <div className="space-y-3 mt-4 w-full">
      {teams.map((team) => (
        <div
          key={team.id}
          className="flex flex-col sm:flex-row items-center justify-between bg-slate-900 p-3 rounded-lg"
        >
          <div className="flex items-center space-x-3 flex-1 w-full">
            {editingTeamId === team.id ? (
              <input
                type="text"
                defaultValue={team.name}
                className="bg-slate-800 text-white px-2 py-1 rounded w-full"
                onBlur={(e) => handleTeamNameEdit(team.id, e.target.value)}
                onKeyPress={(e) => handleTeamNameKeyPress(e, team.id, e.target.value)}
                autoFocus
              />
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="font-medium">{team.name}</span>
                <button
                  onClick={() => setEditingTeamId(team.id)}
                  className="text-gray-400 hover:text-white transition-colors ml-2"
                >
                  <Icons.Pencil className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <div
            className="w-8 h-8 rounded cursor-pointer border-2 border-white mt-2 sm:mt-0"
            style={{ backgroundColor: team.color }}
            onClick={() => {
              const input = document.createElement("input");
              input.type = "color";
              input.value = team.color;
              input.addEventListener("change", (e) => {
                updateTeam(team.id, { color: e.target.value });
              });
              input.click();
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default TeamList;
