import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useDailyPlanner, useGenerateFromTemplate, useUpdatePlannerEntry } from './hooks';

export default function DailyPlannerPage() {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const { data: entries, isLoading } = useDailyPlanner(date);
  const generateMutation = useGenerateFromTemplate();
  const updateMutation = useUpdatePlannerEntry();

  const handleGenerate = () => {
    generateMutation.mutate(date);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daily Planner</h1>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
          className="bg-[#111118] border border-gray-800 rounded px-3 py-2 text-white"
        />
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[1,2,3].map(i => <div key={i} className="h-16 bg-[#111118] rounded-xl"></div>)}
        </div>
      ) : (
        <div className="space-y-4">
          {!entries?.length ? (
            <div className="text-center p-12 bg-[#111118] rounded-2xl border border-gray-800">
              <p className="text-gray-400 mb-4">No planner entries for this date.</p>
              <button 
                onClick={handleGenerate}
                className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Generate from Template
              </button>
            </div>
          ) : (
            <div className="bg-[#111118] rounded-2xl border border-gray-800 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-900/50 text-gray-400">
                  <tr>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Planned Activity</th>
                    <th className="px-4 py-3">Actual Activity</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry: any) => (
                    <motion.tr 
                      key={entry.id} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-gray-800 hover:bg-gray-800/20"
                    >
                      <td className="px-4 py-3">{entry.start_time} - {entry.end_time}</td>
                      <td className="px-4 py-3">{entry.planned_activity}</td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          defaultValue={entry.actual_activity || ''}
                          onBlur={(e) => updateMutation.mutate({ id: entry.id, updates: { actual_activity: e.target.value } })}
                          className="bg-transparent border-b border-transparent focus:border-indigo-500 outline-none w-full"
                          placeholder="What did you actually do?"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select 
                          defaultValue={entry.status || 'Pending'}
                          onChange={(e) => updateMutation.mutate({ id: entry.id, updates: { status: e.target.value } })}
                          className="bg-transparent outline-none cursor-pointer"
                        >
                          <option value="Pending" className="bg-[#111118]">Pending</option>
                          <option value="Completed" className="bg-[#111118]">Completed</option>
                          <option value="In Progress" className="bg-[#111118]">In Progress</option>
                          <option value="Missed" className="bg-[#111118]">Missed</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          defaultValue={entry.notes || ''}
                          onBlur={(e) => updateMutation.mutate({ id: entry.id, updates: { notes: e.target.value } })}
                          className="bg-transparent border-b border-transparent focus:border-indigo-500 outline-none w-full"
                          placeholder="Notes..."
                        />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
