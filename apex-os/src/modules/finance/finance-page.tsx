import React, { useState } from 'react';
import { useFinanceStats } from './hooks';
import { formatCurrency } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { 
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend, Area, AreaChart 
} from 'recharts';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Wallet, Target, RefreshCw, Users, PiggyBank, Receipt, TrendingUp, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatCard } from '@/components/shared/stat-card';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/store/ui-store';

const COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#06b6d4', '#f59e0b', '#ec4899', '#f43f5e', '#3b82f6'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#181824]/95 border border-white/10 p-3 rounded-xl shadow-2xl backdrop-blur-md">
        <p className="text-xs font-semibold text-zinc-400 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs font-bold" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function FinancePage() {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const { openQuickAdd } = useUIStore();

  const { data: stats, isLoading } = useFinanceStats(month, year);

  const { 
    totalIncome = 0, 
    totalExpenses = 0, 
    savings = 0, 
    savingsRate = 0, 
    categorySpend = [], 
    monthlyTrend = [], 
    budgetActual = [], 
    needWantSplit = [] 
  } = stats || {};

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Finance Command Center</h1>
          <p className="text-sm text-zinc-400 mt-1">Cash flow tracking, category budgets, splits, and net worth trajectory.</p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={month.toString()} onValueChange={(v) => setMonth(parseInt(v))}>
            <SelectTrigger className="w-[140px] bg-[#111118] border-white/10 text-white rounded-xl">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent className="bg-[#181824] border-white/10 text-white">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <SelectItem key={m} value={m.toString()}>
                  {new Date(2000, m - 1, 1).toLocaleString('default', { month: 'long' })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={year.toString()} onValueChange={(v) => setYear(parseInt(v))}>
            <SelectTrigger className="w-[100px] bg-[#111118] border-white/10 text-white rounded-xl">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="bg-[#181824] border-white/10 text-white">
              {[currentYear - 2, currentYear - 1, currentYear, currentYear + 1].map((y) => (
                <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            onClick={() => openQuickAdd('transaction')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-600/30 gap-1.5 font-semibold"
          >
            <Plus className="w-4 h-4" /> Add Transaction
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        <StatCard 
          title="Total Income" 
          value={totalIncome} 
          format="currency" 
          prefix="₹"
          color="text-emerald-400"
          gradient="from-emerald-600/20 via-emerald-600/5 to-transparent"
          changeLabel="Total inflow for month" 
          icon={ArrowUpRight} 
        />
        <StatCard 
          title="Total Expenses" 
          value={totalExpenses} 
          format="currency" 
          prefix="₹"
          color="text-rose-400"
          gradient="from-rose-600/20 via-rose-600/5 to-transparent"
          changeLabel="Total outflow for month" 
          icon={ArrowDownRight} 
        />
        <StatCard 
          title="Net Savings" 
          value={savings} 
          format="currency" 
          prefix="₹"
          color="text-indigo-400"
          gradient="from-indigo-600/20 via-indigo-600/5 to-transparent"
          changeLabel="Surplus generated" 
          icon={PiggyBank} 
        />
        <StatCard 
          title="Savings Rate" 
          value={savingsRate} 
          format="percent" 
          color="text-cyan-400"
          gradient="from-cyan-600/20 via-cyan-600/5 to-transparent"
          changeLabel="Target: 20% minimum" 
          icon={Target} 
        />
      </div>

      {/* Primary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income vs Expenses Trend AreaChart */}
        <Card className="lg:col-span-2 bg-[#111118]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Cash Flow Trend (Income vs Outflow)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[320px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.4} />
                <XAxis dataKey="month" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                <Area type="monotone" name="Income" dataKey="income" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#incomeGrad)" />
                <Area type="monotone" name="Expenses" dataKey="expenses" stroke="#f43f5e" strokeWidth={2.5} fillOpacity={1} fill="url(#expenseGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Spend by Category PieChart */}
        <Card className="bg-[#111118]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-white">Spend by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-[320px] pt-4">
            {categorySpend.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-zinc-500">
                No expense transactions logged for this month.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={categorySpend} 
                    cx="50%" 
                    cy="45%" 
                    innerRadius={55} 
                    outerRadius={80} 
                    paddingAngle={4} 
                    dataKey="value"
                  >
                    {categorySpend.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', maxHeight: '60px', overflowY: 'auto' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation Sub-Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <NavCard to="/finance/transactions" title="Transactions Ledger" subtitle="Search & export receipts" icon={<Receipt className="w-5 h-5 text-indigo-400" />} />
        <NavCard to="/finance/budgets" title="Budget Limits" subtitle="Category limits & thresholds" icon={<Target className="w-5 h-5 text-emerald-400" />} />
        <NavCard to="/finance/recurring" title="Recurring Subscriptions" subtitle="One-click payment logging" icon={<RefreshCw className="w-5 h-5 text-cyan-400" />} />
        <NavCard to="/finance/networth" title="Net Worth Trajectory" subtitle="Asset & liability ledger" icon={<Wallet className="w-5 h-5 text-amber-400" />} />
      </div>
    </div>
  );
}

function NavCard({ to, title, subtitle, icon }: { to: string, title: string, subtitle: string, icon: React.ReactNode }) {
  return (
    <Link to={to}>
      <motion.div 
        whileHover={{ y: -3, scale: 1.02 }} 
        whileTap={{ scale: 0.98 }} 
        className="bg-[#111118]/80 border border-white/10 hover:border-indigo-500/40 hover:bg-white/5 rounded-2xl p-5 flex items-center gap-4 transition-all shadow-xl group"
      >
        <div className="p-3 bg-white/5 border border-white/10 group-hover:scale-110 rounded-xl transition-transform shadow-inner shrink-0">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <span className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors block truncate">{title}</span>
          <span className="text-xs text-zinc-400 block truncate mt-0.5">{subtitle}</span>
        </div>
      </motion.div>
    </Link>
  );
}
