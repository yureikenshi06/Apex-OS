import React from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function BodyPage() {
  const data = [{ name: 'Week 1', weight: 85 }, { name: 'Week 2', weight: 84 }, { name: 'Week 3', weight: 82.5 }];
  
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#fafafa] p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Weight & Measurements</h1>
        <button className="bg-[#6366f1] text-white px-4 py-2 rounded-lg font-medium">Log Entry</button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#111118] p-6 rounded-2xl border border-gray-800 h-80 flex flex-col">
          <h2 className="text-lg font-medium mb-4">Weight Trend</h2>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" stroke="#4b5563" />
                <Tooltip contentStyle={{ backgroundColor: '#111118', borderColor: '#1f2937' }} />
                <Line type="monotone" dataKey="weight" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-[#111118] p-6 rounded-2xl border border-gray-800">
          <h2 className="text-lg font-medium mb-4">Latest Measurements</h2>
          <div className="text-center text-gray-500 py-12">No measurements logged.</div>
        </div>
      </div>
    </div>
  );
}
