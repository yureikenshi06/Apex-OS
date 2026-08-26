import React from 'react';
import { motion } from 'framer-motion';
import { usePlacementTracker } from './hooks';

export default function PlacementPage() {
  const { data: placements, isLoading } = usePlacementTracker();

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Placement Tracker</h1>
        <button className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg font-medium transition-colors">
          Add Application
        </button>
      </div>

      <div className="bg-[#111118] rounded-2xl border border-gray-800 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-900/50 text-gray-400">
            <tr>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Result</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
            ) : !placements?.length ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">No applications found</td></tr>
            ) : (
              placements.map((item: any) => (
                <motion.tr key={item.id} className="border-t border-gray-800 hover:bg-gray-800/20">
                  <td className="px-4 py-3 font-medium">{item.company}</td>
                  <td className="px-4 py-3 text-gray-300">{item.role}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded text-xs bg-gray-800 text-gray-300">
                      {item.application_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{item.test_interview_date}</td>
                  <td className="px-4 py-3 text-gray-400">{item.result || '-'}</td>
                  <td className="px-4 py-3 text-gray-400">{item.notes}</td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
