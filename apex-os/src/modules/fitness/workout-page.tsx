import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PLAN_DAYS = ['Monday (Upper A)', 'Tuesday (Lower A)', 'Wednesday (Cardio/Core)', 'Thursday (Upper B)', 'Friday (Lower B)', 'Saturday (Conditioning)'];

export default function WorkoutPage() {
  const [openDay, setOpenDay] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#fafafa] p-6 space-y-6">
      <h1 className="text-3xl font-bold">Weekly Workout Plan</h1>
      
      <div className="space-y-4">
        {PLAN_DAYS.map((day, idx) => (
          <div key={idx} className="bg-[#111118] border border-gray-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenDay(openDay === idx ? null : idx)}
              className="w-full p-4 flex justify-between items-center text-left hover:bg-gray-800/50 transition-colors"
            >
              <span className="font-semibold text-lg">{day}</span>
              <span className="text-xl">{openDay === idx ? '−' : '+'}</span>
            </button>
            <AnimatePresence>
              {openDay === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 pb-4 border-t border-gray-800"
                >
                  <div className="py-4 text-gray-400 text-sm">
                    Exercise list placeholder. Click here to add exercises.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
