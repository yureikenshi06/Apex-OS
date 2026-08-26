import React from 'react';
import { useBudgets } from './hooks';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BudgetsPage() {
  const { data: budgets = [], isLoading } = useBudgets();

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Budgets</h1>
          <p className="text-zinc-400 text-sm">Monitor your spending limits.</p>
        </div>
        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Budget
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <p className="text-zinc-500">Loading budgets...</p>
        ) : (
          budgets.map((budget: any, idx: number) => {
            const percent = Math.min((budget.actual / budget.limit) * 100, 100);
            let color = 'bg-green-500';
            if (percent > 80) color = 'bg-amber-500';
            if (percent >= 100) color = 'bg-red-500';

            return (
              <motion.div 
                key={budget.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-zinc-200">{budget.category}</h3>
                  <span className="text-xs px-2 py-1 bg-zinc-800 text-zinc-300 rounded-md">
                    {budget.period || 'Monthly'}
                  </span>
                </div>
                
                <div className="mb-2 flex justify-between items-end">
                  <span className="text-2xl font-bold text-zinc-100">{formatCurrency(budget.actual)}</span>
                  <span className="text-sm text-zinc-400">/ {formatCurrency(budget.limit)}</span>
                </div>

                <div className="w-full bg-zinc-800 rounded-full h-2.5 mb-2">
                  <div className={`h-2.5 rounded-full ${color} transition-all duration-500`} style={{ width: `${percent}%` }}></div>
                </div>

                <div className="flex justify-between text-xs text-zinc-500 mt-3">
                  <span>{percent.toFixed(1)}% used</span>
                  <span>{formatCurrency(Math.max(budget.limit - budget.actual, 0))} remaining</span>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
