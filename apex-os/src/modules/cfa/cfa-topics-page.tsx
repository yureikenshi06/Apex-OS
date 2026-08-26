import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCFATopics, useUpdateCFATopic, useLinkTopicToTask, useUnlinkTopicFromTask } from './hooks';

const MODULES = [
  'All Modules', 'Quant', 'Econ', 'CorpFin', 'FSA', 'Equities', 
  'FixedIncome', 'Derivatives', 'Alts', 'Portfolio', 'Ethics'
];

export default function CFATopicsPage() {
  const [filterModule, setFilterModule] = useState('All Modules');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterRevision, setFilterRevision] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: topics = [], isLoading } = useCFATopics({ 
    module: filterModule === 'All Modules' ? undefined : filterModule, 
    status: filterStatus === 'All' ? undefined : filterStatus, 
    revision_status: filterRevision === 'All' ? undefined : filterRevision, 
    search: searchQuery 
  });
  
  const updateTopic = useUpdateCFATopic();
  const linkTask = useLinkTopicToTask();
  const unlinkTask = useUnlinkTopicFromTask();

  const handleStatusChange = (id: string, status: any) => updateTopic.mutate({ id, updates: { status } });
  const handleRevisionChange = (id: string, revision_status: any) => updateTopic.mutate({ id, updates: { revision_status } });
  const handleCompletedToggle = (id: string, completed: boolean) => updateTopic.mutate({ id, updates: { completed, status: completed ? 'Completed' : 'In Progress' } });
  
  const toggleTaskLink = (topic: any) => {
    if (topic.linked_task_id) {
      unlinkTask.mutate(topic.id);
    } else {
      linkTask.mutate(topic);
    }
  };

  const filteredTopics = topics; // Logic would apply local filtering if not done by backend

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 p-8 font-inter">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Topics Tracker</h1>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            + Add Topic
          </button>
        </div>

        {/* Filters */}
        <div className="bg-[#111118] border border-gray-800 rounded-2xl p-4 flex flex-wrap gap-4 items-center">
          <input 
            type="text" 
            placeholder="Search topics..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 min-w-[200px]"
          />
          <select value={filterModule} onChange={(e) => setFilterModule(e.target.value)} className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none">
            {MODULES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none">
            <option value="All">All Status</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select value={filterRevision} onChange={(e) => setFilterRevision(e.target.value)} className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none">
            <option value="All">All Revision</option>
            <option value="Not Started">Not Started</option>
            <option value="First Pass Done">First Pass Done</option>
            <option value="Revised Once">Revised Once</option>
            <option value="Revised Twice">Revised Twice</option>
            <option value="Mastered">Mastered</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-[#111118] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800">
                  <th className="p-4 font-medium">Mod</th>
                  <th className="p-4 font-medium">Chapter/Topic</th>
                  <th className="p-4 font-medium">Subtopic/LOs</th>
                  <th className="p-4 font-medium text-center">Type</th>
                  <th className="p-4 font-medium text-center">Status</th>
                  <th className="p-4 font-medium text-center">Done</th>
                  <th className="p-4 font-medium text-center">Revision</th>
                  <th className="p-4 font-medium text-center">Tasks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50 text-sm">
                <AnimatePresence>
                  {isLoading ? (
                    <tr><td colSpan={8} className="p-8 text-center text-gray-500">Loading topics...</td></tr>
                  ) : filteredTopics.length === 0 ? (
                    <tr><td colSpan={8} className="p-8 text-center text-gray-500">No topics found.</td></tr>
                  ) : filteredTopics.map((topic) => (
                    <motion.tr 
                      key={topic.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-800/20 transition-colors group"
                    >
                      <td className="p-4">
                        <span className="bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded text-xs font-semibold">{topic.module}</span>
                      </td>
                      <td className="p-4 font-medium text-gray-200">{topic.chapter_topic}</td>
                      <td className="p-4 text-gray-400 max-w-[200px] truncate hover:whitespace-normal hover:bg-gray-900 rounded p-1 transition-all">{topic.subtopic_lo}</td>
                      <td className="p-4 text-center">
                        <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wide ${topic.row_type === 'STUDY' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                          {topic.row_type}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <select 
                          value={topic.status} 
                          onChange={(e) => handleStatusChange(topic.id, e.target.value)}
                          className="bg-transparent border-none text-gray-300 text-xs focus:ring-0 cursor-pointer w-full text-center hover:bg-gray-800 rounded p-1"
                        >
                          <option className="bg-gray-900" value="Not Started">Not Started</option>
                          <option className="bg-gray-900" value="In Progress">In Progress</option>
                          <option className="bg-gray-900" value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="p-4 text-center">
                        <input 
                          type="checkbox" 
                          checked={topic.completed}
                          onChange={(e) => handleCompletedToggle(topic.id, e.target.checked)}
                          className="w-4 h-4 rounded border-gray-600 text-indigo-600 focus:ring-indigo-500/50 bg-gray-900 cursor-pointer"
                        />
                      </td>
                      <td className="p-4 text-center">
                        <select 
                          value={topic.revision_status} 
                          onChange={(e) => handleRevisionChange(topic.id, e.target.value)}
                          className="bg-transparent border-none text-gray-300 text-xs focus:ring-0 cursor-pointer w-full text-center hover:bg-gray-800 rounded p-1"
                        >
                          <option className="bg-gray-900" value="Not Started">Not Started</option>
                          <option className="bg-gray-900" value="First Pass Done">First Pass Done</option>
                          <option className="bg-gray-900" value="Revised Once">Revised Once</option>
                          <option className="bg-gray-900" value="Revised Twice">Revised Twice</option>
                          <option className="bg-gray-900" value="Mastered">Mastered</option>
                        </select>
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => toggleTaskLink(topic)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                            topic.linked_task_id 
                            ? 'bg-green-500/10 text-green-400 hover:bg-red-500/10 hover:text-red-400'
                            : 'bg-gray-800 text-gray-400 hover:bg-indigo-500 hover:text-white'
                          }`}
                          title={topic.linked_task_id ? 'Click to unlink task' : 'Add to task list'}
                        >
                          {topic.linked_task_id ? 'In Tasks' : '+ Task'}
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-800 text-xs text-gray-500 flex justify-between">
            <span>Showing {filteredTopics.length} topics</span>
            <span>Total Planned: {filteredTopics.reduce((acc, curr) => acc + (curr.planned_hours || 0), 0)}h</span>
          </div>
        </div>
      </div>
    </div>
  );
}
