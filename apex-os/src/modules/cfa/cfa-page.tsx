import React from 'react';
import { motion } from 'framer-motion';
import { ProgressRing } from './progress-ring';
import { useCFADashboardStats, useCFADeadlineCountdown } from './hooks';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export default function CFAPage() {
  const { data: stats, isLoading: isStatsLoading } = useCFADashboardStats();
  const { data: daysUntil } = useCFADeadlineCountdown();

  if (isStatsLoading) {
    return <div className="p-8 text-white animate-pulse">Loading Dashboard...</div>;
  }

  const overallProgress = stats ? (stats.totalCompleted / stats.totalTopics) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 p-8 space-y-8 font-inter">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">CFA Level I Tracker</h1>
          <p className="text-gray-400 mt-1">2027 Exam Preparation</p>
        </div>
        <motion.div 
          className="bg-[#111118] border border-indigo-500/20 p-4 rounded-2xl shadow-lg shadow-indigo-500/10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="text-sm text-indigo-400 font-medium mb-1">Countdown to Jan 31, 2027</div>
          <div className="text-3xl font-bold text-white">{daysUntil} <span className="text-xl text-gray-400">days</span></div>
        </motion.div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Overall Progress', value: `${stats?.totalCompleted} / ${stats?.totalTopics}`, sub: `${overallProgress.toFixed(1)}% Completed` },
          { label: 'Total Hours', value: `${stats?.overallHoursLogged}h`, sub: 'Logged so far' },
          { label: 'Chapters Done', value: stats?.chaptersCompleted, sub: 'Out of 100+' },
          { label: 'LOs Covered', value: stats?.losCovered, sub: 'Study + Review: ' + (stats?.studyTopicsDone || 0) + ' / ' + (stats?.reviewTopicsDone || 0) },
        ].map((s, i) => (
          <motion.div 
            key={i} 
            className="bg-[#111118] border border-gray-800 p-5 rounded-2xl"
            whileHover={{ y: -2 }}
          >
            <div className="text-gray-400 text-sm">{s.label}</div>
            <div className="text-2xl font-semibold text-white mt-2">{s.value}</div>
            <div className="text-xs text-indigo-400 mt-1">{s.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Module Rings */}
      <div className="bg-[#111118] border border-gray-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6">Module Progress</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
          {stats?.modules.map((m, i) => {
            let color = '#ef4444'; // red
            if (m.percentage > 75) color = '#22c55e'; // green
            else if (m.percentage >= 25) color = '#f59e0b'; // amber

            return (
              <motion.div key={i} whileHover={{ scale: 1.05 }} className="flex flex-col items-center">
                <ProgressRing progress={m.percentage} size={100} strokeWidth={8} color={color} label={m.name} />
                <div className="mt-3 text-sm font-medium text-gray-300">{m.name}</div>
                <div className="text-xs text-gray-500">{m.completed}/{m.total} done</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Charts & Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#111118] border border-gray-800 rounded-2xl p-6 h-[400px]">
          <h2 className="text-xl font-semibold mb-4">Hours: Planned vs Actual</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats?.modules} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="name" stroke="#6b7280" tick={{fill: '#9ca3af'}} />
              <YAxis stroke="#6b7280" tick={{fill: '#9ca3af'}} />
              <Tooltip cursor={{fill: '#1f2937'}} contentStyle={{backgroundColor: '#111118', borderColor: '#374151', color: '#fff'}} />
              <Legend wrapperStyle={{paddingTop: '20px'}}/>
              <Bar dataKey="plannedHours" name="Planned" fill="#374151" radius={[4,4,0,0]} />
              <Bar dataKey="actualHours" name="Actual" fill="#6366f1" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <a href="/cfa/topics" className="block bg-indigo-600 hover:bg-indigo-700 transition-colors p-6 rounded-2xl group relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-white">All Topics</h3>
              <p className="text-indigo-200 text-sm mt-2">View the unified syllabus tracker and update your progress.</p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform transform translate-x-4 translate-y-4 text-8xl">
              📚
            </div>
          </a>
          <a href="/cfa/revision" className="block bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700 p-6 rounded-2xl group relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-white">Revision Plan</h3>
              <p className="text-gray-400 text-sm mt-2">Track rounds of revision, practice exams, and weak areas.</p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform transform translate-x-4 translate-y-4 text-8xl">
              🔄
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
