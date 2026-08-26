import React, { useState } from 'react';
import { useFinanceAnalysis, TimeframeMode } from './hooks';
import { formatCurrency } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, Legend, Area, AreaChart 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, ArrowDownRight, Wallet, Target, RefreshCw, 
  PiggyBank, Receipt, TrendingUp, Plus, Calendar, DollarSign, 
  Layers, Settings, ChevronLeft, ChevronRight, Clock, ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatCard } from '@/components/shared/stat-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUIStore } from '@/store/ui-store';
import CategoryManagerModal from './category-manager-modal';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#06b6d4', '#f59e0b', '#ec4899', '#f43f5e', '#6366f1', '#14b8a6', '#ef4444'];

const CustomCashFlowTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const income = payload.find((p: any) => p.dataKey === 'income')?.value || 0;
    const expenses = payload.find((p: any) => p.dataKey === 'expenses')?.value || 0;
    const net = income - expenses;

    return (
      <div className="bg-[#0e131f]/95 border border-blue-500/30 p-3.5 rounded-2xl shadow-2xl backdrop-blur-md min-w-[170px]">
        <p className="text-xs font-bold text-white mb-2 pb-1.5 border-b border-white/10 flex items-center justify-between">
          <span>{label}</span>
          <span className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded ${net >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
            {net >= 0 ? '+' : ''}{formatCurrency(net)}
          </span>
        </p>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Income:
            </span>
            <span className="font-bold text-emerald-400 font-mono">{formatCurrency(income)}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400" /> Expenses:
            </span>
            <span className="font-bold text-rose-400 font-mono">{formatCurrency(expenses)}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0e131f]/95 border border-blue-500/30 p-3 rounded-xl shadow-2xl backdrop-blur-md">
        <p className="text-xs font-bold text-white">{payload[0].name}</p>
        <p className="text-xs font-semibold text-blue-400">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function FinancePage() {
  const todayStr = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  // Timeframe states
  const [timeframeMode, setTimeframeMode] = useState<TimeframeMode>('monthly');
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [customStartDate, setCustomStartDate] = useState(new Date(currentYear, currentMonth - 1, 1).toISOString().split('T')[0]);
  const [customEndDate, setCustomEndDate] = useState(todayStr);

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const { openQuickAdd } = useUIStore();

  // Fetch dynamic analysis based on selected timeframe
  const { data: analysis, isLoading } = useFinanceAnalysis({
    mode: timeframeMode,
    date: selectedDate,
    month: selectedMonth,
    year: selectedYear,
    startDate: customStartDate,
    endDate: customEndDate,
  });

  const { 
    totalIncome = 0, 
    totalExpenses = 0, 
    savings = 0, 
    savingsRate = 0, 
    categorySpend = [], 
    trendData = [], 
    topExpenses = [],
    transactionCount = 0,
    startDateStr = '',
    endDateStr = '',
    hasData = false,
  } = analysis || {};

  // Formatted timeframe display label
  const getTimeframeLabel = () => {
    if (timeframeMode === 'daily') {
      return `Daily Spend Analysis for ${new Date(selectedDate).toLocaleDateString('default', { dateStyle: 'long' })}`;
    }
    if (timeframeMode === 'weekly') {
      return `Weekly Spend Analysis (${startDateStr} to ${endDateStr})`;
    }
    if (timeframeMode === 'monthly') {
      const mName = new Date(2000, selectedMonth - 1, 1).toLocaleString('default', { month: 'long' });
      return `Monthly Spend Analysis for ${mName} ${selectedYear}`;
    }
    if (timeframeMode === 'yearly') {
      return `Yearly Spend Analysis for ${selectedYear}`;
    }
    return `Custom Range Spend Analysis (${customStartDate} to ${customEndDate})`;
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto text-foreground font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Finance Command Center</h1>
          <p className="text-xs text-zinc-400 mt-0.5 font-medium">
            {getTimeframeLabel()}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setCategoryModalOpen(true)}
            className="bg-[#111827] border-white/10 hover:border-blue-500/40 text-zinc-300 hover:text-white rounded-xl text-xs h-9 px-3 gap-1.5"
          >
            <Settings className="w-3.5 h-3.5 text-blue-400" /> Categories & Subcategories
          </Button>

          <Button 
            onClick={() => openQuickAdd('transaction')}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/30 gap-1.5 font-bold h-9 text-xs px-4"
          >
            <Plus className="w-4 h-4" /> Add Transaction
          </Button>
        </div>
      </div>

      {/* Timeframe Selector & Date Controls Bar */}
      <div className="bg-[#0b0f19]/90 border border-blue-500/25 rounded-3xl p-4 shadow-2xl backdrop-blur-xl space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Timeframe Mode Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-[#111827] rounded-2xl border border-white/10 w-fit">
            {(['daily', 'weekly', 'monthly', 'yearly', 'custom'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTimeframeMode(mode)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all capitalize ${
                  timeframeMode === mode
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {mode === 'custom' ? 'Custom Range' : mode}
              </button>
            ))}
          </div>

          {/* Context-Aware Date Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {timeframeMode === 'daily' && (
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setSelectedDate(todayStr)} 
                  className={`text-xs h-8 rounded-xl border-white/10 ${selectedDate === todayStr ? 'bg-blue-600/20 text-blue-300 border-blue-500/40' : 'bg-[#111827] text-zinc-300'}`}
                >
                  Today
                </Button>
                <Input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)} 
                  className="bg-[#111827] border-white/10 text-white rounded-xl h-8 text-xs w-[140px]" 
                />
              </div>
            )}

            {timeframeMode === 'weekly' && (
              <div className="flex items-center gap-2">
                <Input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)} 
                  className="bg-[#111827] border-white/10 text-white rounded-xl h-8 text-xs w-[140px]" 
                />
                <span className="text-xs text-zinc-400 font-mono">
                  Week: {startDateStr} → {endDateStr}
                </span>
              </div>
            )}

            {timeframeMode === 'monthly' && (
              <div className="flex items-center gap-2">
                <Select value={selectedMonth.toString()} onValueChange={(v) => setSelectedMonth(parseInt(v))}>
                  <SelectTrigger className="w-[130px] bg-[#111827] border-white/10 text-white rounded-xl h-8 text-xs">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111827] border-white/10 text-white">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <SelectItem key={m} value={m.toString()}>
                        {new Date(2000, m - 1, 1).toLocaleString('default', { month: 'long' })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(parseInt(v))}>
                  <SelectTrigger className="w-[90px] bg-[#111827] border-white/10 text-white rounded-xl h-8 text-xs">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111827] border-white/10 text-white">
                    {[currentYear - 2, currentYear - 1, currentYear, currentYear + 1].map((y) => (
                      <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {timeframeMode === 'yearly' && (
              <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(parseInt(v))}>
                <SelectTrigger className="w-[100px] bg-[#111827] border-white/10 text-white rounded-xl h-8 text-xs">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="bg-[#111827] border-white/10 text-white">
                  {[currentYear - 2, currentYear - 1, currentYear, currentYear + 1].map((y) => (
                    <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {timeframeMode === 'custom' && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 font-bold">From</span>
                <Input 
                  type="date" 
                  value={customStartDate} 
                  onChange={(e) => setCustomStartDate(e.target.value)} 
                  className="bg-[#111827] border-white/10 text-white rounded-xl h-8 text-xs w-[135px]" 
                />
                <span className="text-xs text-zinc-400 font-bold">To</span>
                <Input 
                  type="date" 
                  value={customEndDate} 
                  onChange={(e) => setCustomEndDate(e.target.value)} 
                  className="bg-[#111827] border-white/10 text-white rounded-xl h-8 text-xs w-[135px]" 
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        <StatCard 
          title="Total Inflow" 
          value={totalIncome} 
          format="currency" 
          prefix="₹"
          color="text-emerald-400"
          gradient="from-emerald-600/20 via-emerald-600/5 to-transparent"
          changeLabel={`${transactionCount} transactions in period`} 
          icon={ArrowUpRight} 
        />
        <StatCard 
          title="Total Outflow" 
          value={totalExpenses} 
          format="currency" 
          prefix="₹"
          color="text-rose-400"
          gradient="from-rose-600/20 via-rose-600/5 to-transparent"
          changeLabel="Total spend in period" 
          icon={ArrowDownRight} 
        />
        <StatCard 
          title="Net Surplus / Deficit" 
          value={savings} 
          format="currency" 
          prefix="₹"
          color="text-blue-400"
          gradient="from-blue-600/20 via-blue-600/5 to-transparent"
          changeLabel="Inflow minus outflow" 
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

      {/* Navigation Sub-Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <NavCard to="/finance/transactions" title="Transactions Ledger" icon={<Receipt className="w-5 h-5 text-blue-400" />} color="blue" />
        <NavCard to="/finance/budgets" title="Budget Limits" icon={<Target className="w-5 h-5 text-emerald-400" />} color="emerald" />
        <NavCard to="/finance/recurring" title="Recurring & Subscriptions" icon={<RefreshCw className="w-5 h-5 text-cyan-400" />} color="cyan" />
        <NavCard to="/finance/networth" title="Net Worth Tracker" icon={<Wallet className="w-5 h-5 text-amber-400" />} color="amber" />
      </div>

      {/* Primary Dynamic Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cash Flow Trajectory Chart (Dynamically adapts to daily/weekly/monthly/yearly/custom) */}
        <Card className="lg:col-span-2 bg-[#0b0f19]/80 border-blue-500/20 backdrop-blur-xl rounded-3xl shadow-2xl p-6 flex flex-col justify-between">
          <CardHeader className="p-0 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Cash Flow Trajectory
              </CardTitle>
            </div>
            
            {hasData && (
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-emerald-400 font-semibold">In: ₹{totalIncome.toLocaleString()}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-rose-400 font-semibold">Out: ₹{totalExpenses.toLocaleString()}</span>
                <span className="text-zinc-600">•</span>
                <span className={`font-bold ${savings >= 0 ? 'text-blue-400' : 'text-rose-400'}`}>
                  Net: {savings >= 0 ? '+' : ''}₹{savings.toLocaleString()}
                </span>
              </div>
            )}
          </CardHeader>

          <CardContent className="p-0 h-[320px] relative">
            {!hasData && !isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-white/[0.01] rounded-2xl border border-white/5">
                <DollarSign className="w-10 h-10 text-zinc-600 mb-2" />
                <p className="text-sm font-bold text-zinc-300">No Transactions in Selected Timeframe</p>
                <p className="text-xs text-zinc-500 max-w-xs mt-1 mb-4">
                  Log your income and expenses or select a different date range to view your cash flow analysis.
                </p>
                <Button 
                  onClick={() => openQuickAdd('transaction')} 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Transaction
                </Button>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.4} />
                  <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(val) => val === 0 ? '₹0' : `₹${val >= 1000 ? `${(val/1000).toFixed(0)}k` : val}`} 
                  />
                  <RechartsTooltip content={<CustomCashFlowTooltip />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }} 
                    iconType="circle"
                  />
                  <Area 
                    type="monotone" 
                    name="Income" 
                    dataKey="income" 
                    stroke="#3b82f6" 
                    strokeWidth={2.5} 
                    fillOpacity={1} 
                    fill="url(#incomeGrad)" 
                  />
                  <Area 
                    type="monotone" 
                    name="Expenses" 
                    dataKey="expenses" 
                    stroke="#ef4444" 
                    strokeWidth={2.5} 
                    fillOpacity={1} 
                    fill="url(#expenseGrad)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Spend by Category Donut */}
        <Card className="bg-[#0b0f19]/80 border-blue-500/20 backdrop-blur-xl rounded-3xl shadow-2xl p-6 flex flex-col justify-between">
          <CardHeader className="p-0 pb-3">
            <CardTitle className="text-base font-bold text-white flex items-center justify-between">
              <span>Spend by Category</span>
              {categorySpend.length > 0 && (
                <Badge variant="outline" className="border-blue-500/40 text-blue-300 bg-blue-500/10 text-[10px] font-mono">
                  {categorySpend.length} categories
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 h-[320px] relative">
            {categorySpend.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-white/[0.01] rounded-2xl border border-white/5">
                <Target className="w-10 h-10 text-zinc-600 mb-2" />
                <p className="text-sm font-bold text-zinc-300">No Expenses Recorded</p>
                <p className="text-xs text-zinc-500 max-w-xs mt-1 mb-4">
                  Add expenses in this timeframe to see your spending category breakdown.
                </p>
                <Button 
                  onClick={() => openQuickAdd('transaction')} 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Expense
                </Button>
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
                    {categorySpend.map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<PieTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', maxHeight: '60px', overflowY: 'auto' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Expense Outflows in this Timeframe */}
      {topExpenses.length > 0 && (
        <Card className="bg-[#0b0f19]/80 border border-white/10 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-rose-400" />
              Highest Outflows in Selected Timeframe
            </h3>
            <Link to="/finance/transactions" className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1">
              View All Transactions <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {topExpenses.map((tx: any) => (
              <div key={tx.id} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                  <span>{new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-white/10 text-zinc-300">
                    {tx.category}
                  </Badge>
                </div>
                <div className="font-bold text-white text-xs truncate" title={tx.description}>
                  {tx.description}
                </div>
                <div className="text-base font-black text-rose-400 font-mono mt-1">
                  -₹{Number(tx.amount).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Category Manager Modal */}
      <CategoryManagerModal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
      />
    </div>
  );
}

function NavCard({ to, title, icon, color }: { to: string, title: string, icon: React.ReactNode, color: string }) {
  return (
    <Link to={to}>
      <motion.div 
        whileHover={{ y: -3, scale: 1.02 }} 
        whileTap={{ scale: 0.98 }} 
        className={`bg-[#0b0f19]/80 border border-${color}-500/20 hover:border-${color}-500/50 hover:bg-${color}-500/5 rounded-2xl p-5 flex items-center gap-4 transition-all shadow-xl group`}
      >
        <div className={`p-3 bg-${color}-500/10 border border-${color}-500/20 group-hover:scale-110 rounded-xl transition-transform shadow-inner shrink-0`}>
          {icon}
        </div>
        <span className={`font-bold text-sm text-white group-hover:text-${color}-400 transition-colors block truncate`}>{title}</span>
      </motion.div>
    </Link>
  );
}
