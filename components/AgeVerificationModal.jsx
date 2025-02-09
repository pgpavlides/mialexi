"use client";

import React from 'react';

export default function AgeVerificationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Close when clicking the backdrop
    >
      <div 
        className="bg-white rounded-lg p-6 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the modal
      >
        <h2 className="text-xl font-bold mb-4">Επιβεβαίωση Ηλικίας</h2>
        <p className="mb-6 text-gray-600">
          Είστε άνω των 18 ετών; Το περιεχόμενο αυτής της κατηγορίας απευθύνεται μόνο σε ενήλικες.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Όχι
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Ναι, είμαι άνω των 18
          </button>
        </div>
      </div>
    </div>
  );
}
