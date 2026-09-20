import React from 'react';

export default function GroceryPage() {
  return (
    <div className="text-fg space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-[22px] font-extrabold tracking-tight md:text-3xl">Grocery & Budget</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium">Add Purchase</button>
      </div>
      <div className="bg-surface-2 p-6 rounded-2xl border border-gray-800 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 text-sm">
              <th className="pb-3 px-2">Item</th>
              <th className="pb-3 px-2">Category</th>
              <th className="pb-3 px-2">Qty</th>
              <th className="pb-3 px-2">Price</th>
              <th className="pb-3 px-2">Cost/Serving</th>
              <th className="pb-3 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500">No recent grocery purchases.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
