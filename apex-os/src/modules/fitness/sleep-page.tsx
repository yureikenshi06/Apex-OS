import React from 'react';

export default function SleepPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#fafafa] p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sleep & Recovery</h1>
        <button className="bg-[#6366f1] text-white px-4 py-2 rounded-lg font-medium">Log Sleep</button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111118] p-6 rounded-2xl border border-gray-800">
          <h2 className="text-lg font-medium mb-4">Recent Sleep Log</h2>
          <div className="text-center py-10 text-gray-500">No sleep records found.</div>
        </div>
        <div className="bg-[#111118] p-6 rounded-2xl border border-gray-800">
          <h2 className="text-lg font-medium mb-4">Recovery Status</h2>
          <div className="flex flex-col items-center justify-center h-48 space-y-4">
            <div className="w-24 h-24 rounded-full bg-green-500/20 border-4 border-green-500 flex items-center justify-center text-green-400 font-bold text-2xl">
              Good
            </div>
            <p className="text-sm text-gray-400 text-center">Your body is well-rested and recovered.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
