import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCFARevisionPlan, useAddRevisionItem, useUpdateRevisionItem, useDeleteRevisionItem } from './hooks';

export default function CFARevisionPage() {
  const { data: plan = [], isLoading } = useCFARevisionPlan();
  const addMutation = useAddRevisionItem();
  const updateMutation = useUpdateRevisionItem();
  const deleteMutation = useDeleteRevisionItem();
  
  const [isAdding, setIsAdding] = useState(false);

  const rounds = Array.from(new Set(plan.map(p => p.revision_round)));

  if (isLoading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 p-8 font-inter">
      <div className="max-w-[1200px] mx-auto space-y-8">
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Revision Plan</h1>
            <p className="text-gray-400 mt-1">Structured review sessions & practice exams</p>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20"
          >
            + Add Revision Item
          </button>
        </div>

        {rounds.length === 0 && !isAdding && (
          <div className="bg-[#111118] border border-gray-800 rounded-2xl p-12 text-center text-gray-500">
            No revision items yet. Start planning your revision rounds.
          </div>
        )}

        <div className="space-y-8">
          {rounds.map((round) => {
            const items = plan.filter(p => p.revision_round === round).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
            const completed = items.filter(i => i.status === 'Completed').length;
            const progress = items.length ? (completed / items.length) * 100 : 0;

            return (
              <motion.div 
                key={round}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#111118] border border-gray-800 rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="p-6 border-b border-gray-800 bg-gray-900/30">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">{round}</h2>
                    <span className="text-sm text-gray-400">{completed} / {items.length} Completed</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      className="bg-indigo-500 h-1.5" 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-900/10 text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800">
                        <th className="p-4 font-medium w-[15%]">Module</th>
                        <th className="p-4 font-medium w-[25%]">Activity</th>
                        <th className="p-4 font-medium w-[10%] text-center">Status</th>
                        <th className="p-4 font-medium w-[15%] text-center">Score/Result</th>
                        <th className="p-4 font-medium w-[25%]">Weak Areas</th>
                        <th className="p-4 font-medium w-[10%] text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                      {items.map(item => (
                        <tr key={item.id} className="hover:bg-gray-800/20 transition-colors">
                          <td className="p-4 font-medium text-gray-300">
                            <span className="bg-gray-800 px-2 py-1 rounded text-xs">{item.module}</span>
                          </td>
                          <td className="p-4 text-gray-300">{item.activity}</td>
                          <td className="p-4 text-center">
                            <select 
                              value={item.status} 
                              onChange={(e) => updateMutation.mutate({ id: item.id, updates: { status: e.target.value }})}
                              className={`text-xs px-2 py-1 rounded bg-transparent border border-gray-700 cursor-pointer focus:outline-none ${
                                item.status === 'Completed' ? 'text-green-400 border-green-500/30 bg-green-500/10' :
                                item.status === 'In Progress' ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' :
                                'text-gray-400'
                              }`}
                            >
                              <option className="bg-gray-900" value="Not Started">Not Started</option>
                              <option className="bg-gray-900" value="In Progress">In Progress</option>
                              <option className="bg-gray-900" value="Completed">Completed</option>
                            </select>
                          </td>
                          <td className="p-4">
                            <input 
                              type="text" 
                              value={item.score_result || ''} 
                              onChange={(e) => updateMutation.mutate({ id: item.id, updates: { score_result: e.target.value }})}
                              placeholder="e.g. 78%" 
                              className="bg-transparent border-b border-dashed border-gray-700 focus:border-indigo-500 w-full text-center text-gray-300 focus:outline-none py-1"
                            />
                          </td>
                          <td className="p-4">
                            <input 
                              type="text" 
                              value={item.weak_areas || ''} 
                              onChange={(e) => updateMutation.mutate({ id: item.id, updates: { weak_areas: e.target.value }})}
                              placeholder="Notes on weak areas..." 
                              className="bg-transparent border-none w-full text-gray-400 focus:outline-none focus:text-white placeholder-gray-600"
                            />
                          </td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => deleteMutation.mutate(item.id)}
                              className="text-gray-500 hover:text-red-400 transition-colors p-1"
                              title="Delete Item"
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
