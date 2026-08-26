import React from 'react';
import { motion } from 'framer-motion';
import { useAcademicTracker } from './hooks';

export default function AcademicPage() {
  const { data: academics, isLoading } = useAcademicTracker();

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Academic Tracker</h1>
        <button className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg font-medium transition-colors">
          Add Item
        </button>
      </div>

      <div className="bg-[#111118] rounded-2xl border border-gray-800 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-900/50 text-gray-400">
            <tr>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Deadline</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Priority</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
            ) : !academics?.length ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No academic items found</td></tr>
            ) : (
              academics.map((item: any) => (
                <motion.tr key={item.id} className="border-t border-gray-800 hover:bg-gray-800/20">
                  <td className="px-4 py-3 font-medium">{item.course_code}</td>
                  <td className="px-4 py-3 text-gray-300">{item.item_type}</td>
                  <td className="px-4 py-3 text-red-400">{item.deadline}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded text-xs bg-gray-800 text-gray-300">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{item.priority}</td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
