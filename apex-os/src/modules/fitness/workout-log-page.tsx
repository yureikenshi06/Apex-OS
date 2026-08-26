import React from 'react';
import { motion } from 'framer-motion';

export default function WorkoutLogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#fafafa] p-6 space-y-6">
      <h1 className="text-3xl font-bold">Workout Log</h1>
      <div className="bg-[#111118] p-6 rounded-2xl border border-gray-800">
        <div className="flex justify-between items-center mb-6">
          <input type="date" className="bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#6366f1]" />
          <button className="bg-[#6366f1] hover:bg-indigo-400 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Load from Plan
          </button>
        </div>
        
        <div className="text-gray-400 text-center py-10 border-2 border-dashed border-gray-800 rounded-xl">
          No exercises logged yet. Load from plan or add manually.
        </div>
      </div>
    </div>
  );
}
