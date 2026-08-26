import React from 'react';
import { useRecurringExpenses, useMarkRecurringPaid } from './hooks';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecurringPage() {
  const { data: recurring = [], isLoading } = useRecurringExpenses();
  const markPaidMutation = useMarkRecurringPaid();

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Recurring Expenses</h1>
          <p className="text-zinc-400 text-sm">Subscriptions and regular bills.</p>
        </div>
        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Recurring
        </Button>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-sm">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-zinc-400 uppercase bg-zinc-900/80 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Frequency</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Next Due</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-zinc-500">Loading...</td></tr>
            ) : (
              recurring.map((item: any, idx: number) => {
                const isDueSoon = new Date(item.next_due_date).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000;
                return (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    key={item.id} 
                    className="border-b border-zinc-800/50 hover:bg-zinc-800/30"
                  >
                    <td className="px-6 py-4 font-medium text-zinc-200">{item.name}</td>
                    <td className="px-6 py-4 text-zinc-400">{item.category}</td>
                    <td className="px-6 py-4 text-zinc-400 capitalize">{item.frequency}</td>
                    <td className="px-6 py-4 font-medium text-zinc-200">{formatCurrency(item.amount)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {isDueSoon && <Clock className="w-4 h-4 text-amber-500" />}
                        <span className={isDueSoon ? "text-amber-400 font-medium" : "text-zinc-400"}>
                          {new Date(item.next_due_date).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-green-400 hover:border-green-500/50"
                        onClick={() => markPaidMutation.mutate(item.id)}
                        disabled={markPaidMutation.isPending}
                      >
                        <CheckCircle className="w-4 h-4 mr-1.5" /> Mark Paid
                      </Button>
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
