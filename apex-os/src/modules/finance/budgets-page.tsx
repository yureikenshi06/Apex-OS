import React, { useState } from 'react';
import { useBudgets, useAddBudget, useUpdateBudget, useDeleteBudget, useFinanceStats } from './hooks';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit2, Target, ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, Cell 
} from 'recharts';

const BUDGET_CATEGORIES = [
  'Food', 'Transport', 'Education', 'Health', 'Housing', 'Entertainment',
  'Shopping', 'Finance', 'Travel', 'Personal', 'Clothing', 'Utilities',
  'Subscriptions', 'Gym & Fitness', 'Gifts', 'Other'
];

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

export default function BudgetsPage() {
  const navigate = useNavigate();
  const { data: budgets = [], isLoading } = useBudgets();
  const { data: stats } = useFinanceStats(currentMonth, currentYear);
  const addBudget = useAddBudget();
  const updateBudget = useUpdateBudget();
  const deleteBudget = useDeleteBudget();

  const [modalOpen, setModalOpen] = useState(false);
  const [editBudget, setEditBudget] = useState<any>(null);
  const [category, setCategory] = useState('');
  const [monthlyBudget, setMonthlyBudget] = useState('');

  // Build a map of actual spend by category from stats
  const catSpendMap: Record<string, number> = {};
  (stats?.categorySpend || []).forEach((cs: any) => {
    catSpendMap[cs.name] = cs.value;
  });

  const handleOpenAdd = () => {
    setEditBudget(null);
    setCategory('');
    setMonthlyBudget('');
    setModalOpen(true);
  };

  const handleOpenEdit = (budget: any) => {
    setEditBudget(budget);
    setCategory(budget.category);
    setMonthlyBudget(budget.monthly_budget?.toString() || '');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !monthlyBudget) return;

    if (editBudget) {
      await updateBudget.mutateAsync({ 
        id: editBudget.id, 
        data: { category, monthly_budget: parseFloat(monthlyBudget) } 
      });
    } else {
      await addBudget.mutateAsync({ 
        category, 
        monthly_budget: parseFloat(monthlyBudget) 
      });
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this budget?')) {
      deleteBudget.mutate(id);
    }
  };

  // Chart data: budget vs actual
  const chartData = budgets.map((b: any) => ({
    category: b.category,
    budget: Number(b.monthly_budget) || 0,
    actual: catSpendMap[b.category] || 0,
  }));

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button onClick={() => navigate('/finance')} variant="ghost" size="sm" className="p-1.5 h-8 text-zinc-400 hover:text-white rounded-lg">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-black text-white tracking-tight">Budget Limits</h1>
        </div>
        <Button onClick={handleOpenAdd} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/30 gap-1.5 font-bold">
          <Plus className="w-4 h-4" /> Add Budget
        </Button>
      </div>

      {/* Budget vs Actual Chart */}
      {chartData.length > 0 && (
        <div className="bg-[#0b0f19]/80 border border-blue-500/20 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-400" /> Budget vs Actual Spend
          </h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.4} />
                <XAxis dataKey="category" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0e131f', borderColor: '#1e293b', borderRadius: '12px', color: '#fff' }} 
                  formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, '']}
                />
                <Bar dataKey="budget" name="Budget" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Actual" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.actual > entry.budget ? '#ef4444' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Budget Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {isLoading ? (
            <p className="text-zinc-500 col-span-full text-center py-12 animate-pulse">Loading budgets...</p>
          ) : budgets.length === 0 ? (
            <div className="col-span-full text-center py-16 text-zinc-500">
              <Target className="w-10 h-10 mx-auto mb-3 text-zinc-600" />
              <p className="font-medium">No budgets created yet</p>
              <p className="text-sm mt-1 mb-4">Create budget limits for different spending categories</p>
              <Button onClick={handleOpenAdd} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl">
                <Plus className="w-4 h-4 mr-2" /> Create First Budget
              </Button>
            </div>
          ) : (
            budgets.map((budget: any, idx: number) => {
              const actual = catSpendMap[budget.category] || 0;
              const limit = Number(budget.monthly_budget) || 1;
              const percent = Math.min((actual / limit) * 100, 120);
              const remaining = Math.max(limit - actual, 0);
              
              let barColor = 'bg-emerald-500';
              let statusColor = 'text-emerald-400';
              let statusText = 'On Track';
              if (percent > 100) { barColor = 'bg-red-500'; statusColor = 'text-red-400'; statusText = 'Over Budget!'; }
              else if (percent > 80) { barColor = 'bg-amber-500'; statusColor = 'text-amber-400'; statusText = 'Approaching Limit'; }

              return (
                <motion.div 
                  key={budget.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-[#0b0f19]/80 border border-white/10 hover:border-blue-500/30 rounded-2xl p-5 backdrop-blur-xl shadow-xl transition-colors group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-white text-base">{budget.category}</h3>
                      <span className={`text-xs font-semibold ${statusColor}`}>{statusText}</span>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenEdit(budget)} className="p-1.5 rounded-lg hover:bg-blue-500/20 text-zinc-400 hover:text-blue-400 transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(budget.id)} className="p-1.5 rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-3 flex justify-between items-end">
                    <span className="text-2xl font-black text-white font-mono">₹{actual.toLocaleString()}</span>
                    <span className="text-sm text-zinc-400 font-medium">/ ₹{limit.toLocaleString()}</span>
                  </div>

                  <div className="w-full bg-zinc-800/80 rounded-full h-2.5 mb-3 overflow-hidden">
                    <div className={`h-2.5 rounded-full ${barColor} transition-all duration-700`} style={{ width: `${Math.min(percent, 100)}%` }} />
                  </div>

                  <div className="flex justify-between text-xs text-zinc-400 font-medium">
                    <span>{percent.toFixed(0)}% used</span>
                    <span className="text-emerald-400">₹{remaining.toLocaleString()} left</span>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Add/Edit Budget Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md bg-[#0b0f19] border-blue-500/30 text-white rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              {editBudget ? 'Edit Budget' : 'Create Budget'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Spending Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-[#111827] border-white/10 text-white">
                  {BUDGET_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Monthly Budget Limit (₹)</Label>
              <Input 
                type="number" 
                step="100" 
                value={monthlyBudget} 
                onChange={(e) => setMonthlyBudget(e.target.value)}
                placeholder="e.g. 10000" 
                required
                className="bg-[#111827] border-white/10 text-white rounded-xl text-lg font-mono"
              />
            </div>

            <DialogFooter className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-white rounded-xl">Cancel</Button>
              <Button type="submit" disabled={addBudget.isPending || updateBudget.isPending} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold px-6 shadow-lg shadow-blue-600/30">
                {editBudget ? 'Save Changes' : 'Create Budget'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
