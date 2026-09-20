import React from 'react';

export default function MealsPage() {
  return (
    <div className="text-fg space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-[22px] font-extrabold tracking-tight md:text-3xl">Meal Plan Reference</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium">Add Meal</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {['Breakfast', 'Lunch', 'Dinner'].map((cat) => (
          <div key={cat} className="bg-surface-2 p-4 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-800 pb-2">{cat}</h2>
            <div className="text-sm text-gray-400">No meals added to this category.</div>
          </div>
        ))}
      </div>
    </div>
  );
}
