import React, { useState } from 'react';
import { useFinanceStats } from './hooks';
import { formatCurrency } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Wallet, Target, RefreshCw, Users, PiggyBank, Receipt } from 'lucide-react';
import { Link } from 'react-router-dom';

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#22c55e', '#f59e0b', '#ec4899', '#ef4444'];

export default function FinancePage() {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const { data: stats, isLoading } = useFinanceStats(month, year);

  if (isLoading) return <div className="p-8 text-center text-zinc-400">Loading stats...</div>;

  const { totalIncome = 0, totalExpenses = 0, savings = 0, savingsRate = 0, categorySpend = [], monthlyTrend = [], budgetActual = [], needWantSplit = [], essentialDiscretionarySplit = [] } = stats || {};

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Finance Dashboard</h1>
          <p className="text-zinc-400">Track and manage your wealth.</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={month.toString()} onValueChange={(v) => setMonth(parseInt(v))}>
            <SelectTrigger className="w-[140px] bg-zinc-900 border-zinc-800">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <SelectItem key={m} value={m.toString()}>
                  {new Date(2000, m - 1, 1).toLocaleString('default', { month: 'long' })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={year.toString()} onValueChange={(v) => setYear(parseInt(v))}>
            <SelectTrigger className="w-[100px] bg-zinc-900 border-zinc-800">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {[currentYear - 2, currentYear - 1, currentYear, currentYear + 1].map((y) => (
                <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Income" amount={totalIncome} icon={<ArrowUpRight className="text-green-500 w-5 h-5" />} />
        <StatCard title="Total Expenses" amount={totalExpenses} icon={<ArrowDownRight className="text-red-500 w-5 h-5" />} />
        <StatCard title="Savings" amount={savings} icon={<PiggyBank className="text-indigo-500 w-5 h-5" />} />
        <StatCard title="Savings Rate" amount={savingsRate} isPercentage icon={<Target className="text-cyan-500 w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Income vs Expenses Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="month" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#111118', borderColor: '#27272a', color: '#f4f4f5' }} />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Spend by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categorySpend} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {categorySpend.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: '#111118', borderColor: '#27272a', color: '#f4f4f5' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <NavCard to="/finance/transactions" title="Transactions" icon={<Receipt className="w-6 h-6 text-indigo-400" />} />
         <NavCard to="/finance/budgets" title="Budgets" icon={<Target className="w-6 h-6 text-green-400" />} />
         <NavCard to="/finance/recurring" title="Recurring" icon={<RefreshCw className="w-6 h-6 text-cyan-400" />} />
         <NavCard to="/finance/net-worth" title="Net Worth" icon={<Wallet className="w-6 h-6 text-amber-400" />} />
      </div>
    </div>
  );
}

function StatCard({ title, amount, icon, isPercentage = false }: { title: string, amount: number, icon: React.ReactNode, isPercentage?: boolean }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium text-zinc-400">{title}</p>
        <div className="p-2 bg-zinc-800/50 rounded-lg">{icon}</div>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-zinc-100">
          {isPercentage ? `${amount}%` : formatCurrency(amount)}
        </h3>
      </div>
    </motion.div>
  );
}

function NavCard({ to, title, icon }: { to: string, title: string, icon: React.ReactNode }) {
  return (
    <Link to={to}>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 rounded-2xl p-6 flex items-center gap-4 transition-colors cursor-pointer">
        <div className="p-3 bg-zinc-800/80 rounded-xl">{icon}</div>
        <span className="font-medium text-zinc-200">{title}</span>
      </motion.div>
    </Link>
  );
}
