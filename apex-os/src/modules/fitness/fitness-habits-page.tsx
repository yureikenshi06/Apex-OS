import React from 'react';

export default function FitnessHabitsPage() {
  const habits = [
    'Workout Completed', 'Steps Completed', 'Calories Within Target',
    'Protein Target Hit', 'Water Target Hit', 'Sleep Target Hit',
    'Fruits/Veg Consumed', 'No Junk Food', 'Mobility/Stretching'
  ];

  return (
    <div className="text-fg space-y-6">
      <h1 className="text-[22px] font-extrabold tracking-tight md:text-3xl">Daily Habit Tracker</h1>
      <div className="bg-surface-2 p-6 rounded-2xl border border-gray-800 max-w-2xl">
        <div className="mb-6 flex justify-between items-center">
          <input type="date" className="bg-gray-900 border border-gray-700 rounded-lg p-2 text-white" />
          <div className="text-xl font-bold text-primary">Score: 85/100</div>
        </div>
        
        <div className="space-y-4">
          {habits.map((habit, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
              <span>{habit}</span>
              <button className="w-12 h-6 bg-gray-700 rounded-full relative transition-colors aria-checked:bg-primary">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform aria-checked:translate-x-6" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
