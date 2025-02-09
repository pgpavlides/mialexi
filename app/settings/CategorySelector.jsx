"use client";

import React from "react";
import * as Icons from "lucide-react";

const categoryIcons = {
  series: Icons.Tv2,
  song: Icons.Music,
  celebrity: Icons.Users,
  geography: Icons.Globe2,
  animal: Icons.Cat,
  plant: Icons.Flower2,
  food: Icons.UtensilsCrossed,
  profession: Icons.Briefcase,
};

const CategorySelector = ({
  categories,
  toggleCategory,
  handleCategoryChange,
  categoryLabels,
  styles,
}) => {
  const areAllSelected = Object.keys(categories).every((key) => categories[key]);

  return (
    <div className="mb-8 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <label className="block text-sm font-medium mb-2 sm:mb-0">
          Επιλογή κατηγοριών:
        </label>
        <button
          onClick={() => handleCategoryChange("all")}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
            areAllSelected
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
          }`}
        >
          <Icons.CheckSquare className="w-5 h-5" />
          <span>Επιλογή Όλων</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categoryLabels &&
          Object.entries(categoryLabels)
            .filter(([key]) => key !== "adult" && key !== "all")
            .map(([key, label]) => {
              const IconComponent = categoryIcons[key];
              return (
                <div
                  key={key}
                  // Default: flex-row for mobile; Desktop (lg) becomes flex-col
                  className="flex items-center lg:flex-col lg:items-start p-4 bg-slate-900 rounded-lg hover:bg-slate-950 transition-colors"
                >
                  <div className="flex items-center flex-1 space-x-3">
                    {IconComponent && (
                      <IconComponent className="w-8 h-8 text-purple-600" />
                    )}
                    <span className="text-base">{label}</span>
                  </div>
                  {/* On desktop, add margin on top so the toggle sits below the name */}
                  <div className="lg:mt-4">
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={categories[key]}
                        onChange={() => handleCategoryChange(key)}
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default CategorySelector;
