import React from 'react';
import { motion } from 'framer-motion';
import { useFitnessStats } from './hooks';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function FitnessPage() {
  const { data: stats, isLoading } = useFitnessStats();

  if (isLoading) return <div className="text-[#fafafa] p-6">Loading stats...</div>;

  const mockTrend = [
    { date: '1', weight: 80 }, { date: '5', weight: 79.5 },
    { date: '10', weight: 79 }, { date: '15', weight: 78.5 },
    { date: '20', weight: 78 }, { date: '30', weight: 78 }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#fafafa] p-6 space-y-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold"
      >
        Fitness Dashboard
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Body Stats */}
        <div className="bg-[#111118] p-4 rounded-2xl border border-gray-800">
          <h2 className="text-gray-400 text-sm mb-2">Current Weight</h2>
          <div className="text-2xl font-bold">{stats?.currentWeight} kg</div>
          <div className="text-sm text-green-400 mt-1">Goal: {stats?.targetWeight} kg</div>
          <div className="h-24 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrend}>
                <Line type="monotone" dataKey="weight" stroke="#6366f1" strokeWidth={2} dot={false} />
                <Tooltip contentStyle={{ backgroundColor: '#111118', border: 'none', borderRadius: '8px' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Nutrition Snapshot */}
        <div className="bg-[#111118] p-4 rounded-2xl border border-gray-800">
          <h2 className="text-gray-400 text-sm mb-2">Nutrition Today</h2>
          <div className="space-y-4 mt-2">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Calories</span>
                <span>{stats?.caloriesToday} / {stats?.calorieTarget}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#6366f1]" style={{ width: `${Math.min(100, ((stats?.caloriesToday || 0) / (stats?.calorieTarget || 1)) * 100)}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Protein</span>
                <span>{stats?.proteinToday}g / {stats?.proteinTarget}g</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${Math.min(100, ((stats?.proteinToday || 0) / (stats?.proteinTarget || 1)) * 100)}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-[#111118] p-4 rounded-2xl border border-gray-800 flex flex-col justify-between">
          <h2 className="text-gray-400 text-sm mb-2">Activity</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Workout Streak</span>
              <span className="font-semibold">{stats?.workoutStreak} days 🔥</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Steps Today</span>
              <span className="font-semibold">{stats?.stepsToday} 👟</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Sleep</span>
              <span className="font-semibold">{stats?.sleepLastNight} hrs 💤</span>
            </div>
          </div>
        </div>

        {/* Consistency Score */}
        <div className="bg-[#111118] p-4 rounded-2xl border border-gray-800 flex flex-col items-center justify-center">
          <h2 className="text-gray-400 text-sm mb-4">Consistency Score</h2>
          <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-gray-800">
            <div className="absolute inset-0 rounded-full border-4 border-[#6366f1]" style={{ clipPath: `polygon(0 0, 100% 0, 100% ${stats?.consistencyScore}%, 0 ${stats?.consistencyScore}%)` }} />
            <span className="text-3xl font-bold">{stats?.consistencyScore}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
