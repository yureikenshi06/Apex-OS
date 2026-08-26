import React from 'react';

export default function FoodLogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#fafafa] p-6 space-y-6">
      <h1 className="text-3xl font-bold">Daily Food Log</h1>
      <div className="bg-[#111118] p-6 rounded-2xl border border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
          <div className="p-3 bg-gray-900 rounded-lg">
            <div className="text-sm text-gray-400">Calories</div>
            <div className="text-xl font-bold">1800 / 2200</div>
          </div>
          <div className="p-3 bg-gray-900 rounded-lg">
            <div className="text-sm text-gray-400">Protein</div>
            <div className="text-xl font-bold text-green-400">120g / 150g</div>
          </div>
          <div className="p-3 bg-gray-900 rounded-lg">
            <div className="text-sm text-gray-400">Carbs</div>
            <div className="text-xl font-bold text-blue-400">200g</div>
          </div>
          <div className="p-3 bg-gray-900 rounded-lg">
            <div className="text-sm text-gray-400">Fat</div>
            <div className="text-xl font-bold text-orange-400">60g</div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6">
          <h3 className="text-lg font-medium mb-4">Today's Entries</h3>
          <div className="text-center text-gray-400 py-8">No food logged today.</div>
        </div>
      </div>
    </div>
  );
}
