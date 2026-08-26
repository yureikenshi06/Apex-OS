import React from 'react';
import { motion } from 'framer-motion';
import { useTimetableBlocks } from './hooks';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const HOURS = Array.from({ length: 18 }, (_, i) => i + 6); // 06:00 to 23:00

export default function TimetablePage() {
  const { data: blocks, isLoading } = useTimetableBlocks();

  return (
    <div className="p-6 max-w-[1400px] mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Master Timetable</h1>
        <button className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg font-medium transition-colors">
          Add Block
        </button>
      </div>

      <div className="bg-[#111118] border border-gray-800 rounded-2xl overflow-x-auto">
        <div className="min-w-[1000px]">
          <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-gray-800">
            <div className="p-4 text-center text-sm font-medium text-gray-400">Time</div>
            {DAYS.map(day => (
              <div key={day} className="p-4 text-center text-sm font-medium border-l border-gray-800/50">
                {day}
              </div>
            ))}
          </div>

          <div className="relative">
            {HOURS.map(hour => (
              <div key={hour} className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-gray-800/30 min-h-[60px]">
                <div className="p-2 text-center text-xs text-gray-500">
                  {hour.toString().padStart(2, '0')}:00
                </div>
                {DAYS.map(day => (
                  <div key={`${day}-${hour}`} className="border-l border-gray-800/30 p-1 relative">
                    {/* Render blocks here if they match */}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
