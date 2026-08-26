import React from 'react';
import { motion } from 'framer-motion';
import { usePersonalBrand } from './hooks';

export default function PersonalBrandPage() {
  const { data: content, isLoading } = usePersonalBrand();

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Personal Brand</h1>
        <button className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg font-medium transition-colors">
          Add Content
        </button>
      </div>

      <div className="bg-[#111118] rounded-2xl border border-gray-800 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-900/50 text-gray-400">
            <tr>
              <th className="px-4 py-3">Platform</th>
              <th className="px-4 py-3">Idea / Title</th>
              <th className="px-4 py-3">Stage</th>
              <th className="px-4 py-3">Published Date</th>
              <th className="px-4 py-3">Views</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
            ) : !content?.length ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No content ideas found</td></tr>
            ) : (
              content.map((item: any) => (
                <motion.tr key={item.id} className="border-t border-gray-800 hover:bg-gray-800/20">
                  <td className="px-4 py-3 font-medium">{item.platform}</td>
                  <td className="px-4 py-3 text-gray-300">{item.title}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded text-xs bg-indigo-500/20 text-indigo-400">
                      {item.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{item.date_published || '-'}</td>
                  <td className="px-4 py-3 text-gray-400">{item.views || '-'}</td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
