import React from 'react';

export default function CardioPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#fafafa] p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cardio & Steps</h1>
        <button className="bg-[#6366f1] text-white px-4 py-2 rounded-lg font-medium">Log Cardio</button>
      </div>
      <div className="bg-[#111118] p-6 rounded-2xl border border-gray-800">
        <h2 className="text-lg font-medium mb-4">Steps History</h2>
        <div className="h-64 flex items-center justify-center text-gray-500 border border-dashed border-gray-700 rounded-xl">
          Chart Placeholder
        </div>
      </div>
    </div>
  );
}
