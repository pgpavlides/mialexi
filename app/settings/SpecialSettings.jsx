"use client";

import React from "react";

const SpecialSettings = ({ noAds, setNoAds, categories, handleCategoryChange, styles }) => {
  return (
    <div className="bg-slate-900 rounded-lg p-6 mb-8 w-full">
      <h3 className="text-lg font-semibold mb-4">Επιπλέον ρυθμίσεις</h3>
      <div className="space-y-4">
        {/* Adult Content */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 bg-slate-700 rounded">
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
              onChange={() => handleCategoryChange("adult")}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        {/* No Ads */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 bg-slate-700 rounded">
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
  );
};

export default SpecialSettings;
