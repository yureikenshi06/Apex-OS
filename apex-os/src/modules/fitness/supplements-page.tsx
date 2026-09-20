import React from 'react';

export default function SupplementsPage() {
  return (
    <div className="text-fg space-y-6">
      <h1 className="text-[22px] font-extrabold tracking-tight md:text-3xl">Supplement Tracker</h1>
      
      <div className="bg-yellow-900/20 border border-yellow-700 text-yellow-200 p-4 rounded-xl text-sm leading-relaxed">
        <strong>Disclaimer:</strong> Food first. Supplements are optional extras, not requirements. Do not start any supplement without medical advice. This is informational only and is not medical advice.
      </div>

      <div className="bg-surface-2 p-6 rounded-2xl border border-gray-800">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 text-sm">
              <th className="pb-3">Supplement</th>
              <th className="pb-3">Dose</th>
              <th className="pb-3">Timing</th>
              <th className="pb-3">Monthly Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-500">No supplements tracked.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
