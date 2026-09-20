import React, { useState, useMemo } from 'react';
import { useFinanceAnalysis, useSpendingInsights, TimeframeMode, FinanceAnalysisFilter } from './hooks';
import { formatCurrency } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, Legend, Area, AreaChart, BarChart, Bar
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, ArrowDownRight, Wallet, Target, RefreshCw, 
  PiggyBank, Receipt, TrendingUp, Plus, Calendar, DollarSign, 
  Layers, Settings, ChevronLeft, ChevronRight, Clock, ArrowRight,
  Zap, AlertTriangle, CheckCircle2, TrendingDown, BarChart2, Flame, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatCard, StatGrid } from '@/components/shared/stat-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUIStore } from '@/store/ui-store';
import CategoryManagerModal from './category-manager-modal';

const COLORS = ['#3B6EF6', '#8b5cf6', '#22C55E', '#06b6d4', '#F5A524', '#ec4899', '#f43f5e', '#3B6EF6', '#14b8a6', '#ef4444'];

const CustomCashFlowTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const income = payload.find((p: any) => p.dataKey === 'income')?.value || 0;
    const expenses = payload.find((p: any) => p.dataKey === 'expenses')?.value || 0;
    const net = income - expenses;

    return (
      <div className="bg-surface-1 border border-blue-500/30 p-3.5 rounded-2xl min-w-[170px]">
        <p className="text-xs font-bold text-white mb-2 pb-1.5 border-b border-line flex items-center justify-between">
          <span>{label}</span>
          <span className={`text-[11px] font-mono font-extrabold px-1.5 py-0.5 rounded ${net >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
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
      <div className="bg-surface-1 border border-blue-500/30 p-3 rounded-xl">
        <p className="text-xs font-bold text-white">{payload[0].name}</p>
        <p className="text-xs font-semibold text-blue-400">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

// ─── Chart Tooltips ───────────────────────────────────────────────────────────
const SpikeDayTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const { amount, isSpike, fullDate } = payload[0]?.payload || {};
  return (
    <div className={`bg-surface-1 border p-3 rounded-2xl min-w-[130px] ${isSpike ? 'border-rose-500/40' : 'border-blue-500/20'}`}>
      <p className="text-xs font-bold text-zinc-400 mb-1">{fullDate || `Period ${label}`}</p>
      <p className={`text-base font-black font-mono ${isSpike ? 'text-rose-400' : 'text-white'}`}>₹{(amount || 0).toLocaleString()}</p>
      {isSpike && <p className="text-[11px] text-rose-400 font-bold mt-1">⚡ Impulse Spike</p>}
    </div>
  );
};

const DowTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const dayName = payload[0]?.payload?.day || label;
  return (
    <div className="bg-surface-1 border border-blue-500/20 p-3 rounded-2xl">
      <p className="text-xs font-bold text-white mb-1">{dayName}</p>
      <p className="text-xs text-zinc-400">Avg: <span className="text-white font-mono font-bold">₹{(payload[0]?.value || 0).toLocaleString()}</span></p>
      <p className="text-[11px] text-zinc-500 mt-0.5">{payload[0]?.payload?.txCount} transactions total</p>
    </div>
  );
};

const TrendTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-1 border border-blue-500/20 p-3.5 rounded-2xl min-w-[160px]">
      <p className="text-xs font-bold text-white mb-2 pb-1.5 border-b border-line">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center justify-between text-xs gap-3 mb-1">
          <span className="text-zinc-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            {p.name}
          </span>
          <span className="font-bold font-mono text-white">₹{(p.value || 0).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

const CumulativeTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const actual = payload.find((p: any) => p.dataKey === 'actual')?.value || 0;
  const ideal  = payload.find((p: any) => p.dataKey === 'ideal')?.value  || 0;
  const diff   = actual - ideal;
  return (
    <div className="bg-surface-1 border border-indigo-500/30 p-3.5 rounded-2xl min-w-[160px]">
      <p className="text-xs font-bold text-zinc-400 mb-2">Period {label}</p>
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between gap-4"><span className="text-blue-400">Actual cumulative</span><span className="font-mono font-bold text-white">₹{actual.toLocaleString()}</span></div>
        <div className="flex justify-between gap-4"><span className="text-zinc-500">Ideal (linear)</span><span className="font-mono text-zinc-400">₹{ideal.toLocaleString()}</span></div>
        <div className={`flex justify-between gap-4 pt-1 border-t border-line font-bold ${diff > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
          <span>{diff > 0 ? 'Over-paced' : 'Under-paced'}</span>
          <span className="font-mono">{diff > 0 ? '+' : ''}₹{diff.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

// ─── Spending Insights Panel ──────────────────────────────────────────────────
function SpendingInsightsPanel({ filter }: { filter?: FinanceAnalysisFilter }) {
  const { data: ins, isLoading } = useSpendingInsights(filter);

  if (isLoading) return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-48 bg-white/5 rounded-xl" />
      <div className="h-52 bg-white/[0.02] rounded-[20px] border border-line/70" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-52 bg-white/[0.02] rounded-[20px] border border-line/70" />
        <div className="h-52 bg-white/[0.02] rounded-[20px] border border-line/70" />
      </div>
    </div>
  );

  if (ins && !ins.hasData) {
    return (
      <Card className="bg-surface-1 border border-line rounded-[20px] p-8 text-center">
        <Receipt className="w-10 h-10 text-zinc-500 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-zinc-300">No Expense Data Recorded</h3>
        <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
          No expenses found for <strong className="text-zinc-400">{ins.timeframeLabel || 'the selected period'}</strong>. Select another timeframe or log transactions to view spending intelligence.
        </p>
      </Card>
    );
  }

  if (!ins?.hasData) return null;

  // All fields guaranteed present when hasData = true
  const timeframeLabel   = (ins.timeframeLabel    ?? '') as string;
  const timeframeMode    = (ins.timeframeMode     ?? 'monthly') as string;
  const timelineUnit     = (ins.timelineUnit      ?? 'day') as string;
  const dayOfWeekData     = (ins.dayOfWeekData     ?? []) as { day: string; avgSpend: number; txCount: number }[];
  const maxDowSpend       = (ins.maxDowSpend        ?? 1)  as number;
  const peakDay           = (ins.peakDay            ?? '') as string;
  const categoryTrends    = (ins.categoryTrends     ?? []) as Record<string, any>[];
  const categoryGrowth    = (ins.categoryGrowth     ?? []) as { category: string; current: number; previous: number; diff: number; pct: number; trending: 'up' | 'down' | 'flat' }[];
  const topCats           = (ins.topCats            ?? []) as string[];
  const dailySpikeData    = (ins.dailySpikeData     ?? []) as { label: string; amount: number; isSpike: boolean; fullDate?: string }[];
  const avgDailySpend     = (ins.avgDailySpend      ?? 0)  as number;
  const spikeDays         = (ins.spikeDays          ?? 0)  as number;
  const totalImpulseSpend = (ins.totalImpulseSpend  ?? 0)  as number;
  const needsTotal        = (ins.needsTotal         ?? 0)  as number;
  const wantsTotal        = (ins.wantsTotal         ?? 0)  as number;
  const needsCats         = (ins.needsCats          ?? []) as string[];
  const wantsCats         = (ins.wantsCats          ?? []) as string[];
  const cumulativeData    = (ins.cumulativeData     ?? []) as { day: string; actual: number; ideal: number }[];
  const impulseTransactions = (ins.impulseTransactions ?? []) as any[];
  const impulseByCategory = (ins.impulseByCategory ?? []) as { name: string; total: number; count: number; pct: number }[];

  const nvwTotal         = needsTotal + wantsTotal;
  const wantsPct         = nvwTotal > 0 ? Math.round((wantsTotal / nvwTotal) * 100) : 0;
  const savingsPotential = Math.round(wantsTotal * 0.2);
  const nvwData          = [{ name: 'Needs', value: needsTotal }, { name: 'Wants', value: wantsTotal }];
  const NVW_COLORS       = ['#22C55E', '#F5A524'];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">

      {/* Header + summary chips */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-500/15 border border-rose-500/30 rounded-xl"><Zap className="w-5 h-5 text-rose-400" /></div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white tracking-tight">Spending Intelligence</h2>
              {timeframeLabel && (
                <Badge variant="outline" className="text-[11px] border-rose-500/30 text-rose-300 bg-rose-500/10 font-bold px-2 py-0.5">
                  {timeframeLabel}
                </Badge>
              )}
            </div>
            <p className="text-xs text-zinc-400">
              Impulse detection, category trends &amp; savings gaps {timeframeLabel ? `for ${timeframeLabel}` : ''}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {spikeDays > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-xs">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-rose-300 font-bold">{spikeDays} impulse {timelineUnit}{spikeDays > 1 ? 's' : ''}</span>
              <span className="text-rose-500 font-mono text-[11px]">· ₹{totalImpulseSpend.toLocaleString()} burned</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-300 font-bold">Peak: {peakDay}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-xs">
            <BarChart2 className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-indigo-300 font-bold">{wantsPct}% wants</span>
          </div>
        </div>
      </div>

      {/* Chart 1: Impulse Spike Timeline */}
      <Card className="bg-surface-1 border-rose-500/15 rounded-[20px] p-5 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" />
              {timelineUnit === 'month' ? 'Monthly' : 'Daily'} Spend — Impulse Spike Detection
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Red = {timelineUnit}s you spent 1.5×+ above average of ₹{avgDailySpend.toLocaleString()}/{timelineUnit}
            </p>
          </div>
          {spikeDays > 0 && (
            <div className="shrink-0 text-right">
              <div className="text-xs text-zinc-500">Total impulse spend</div>
              <div className="text-lg font-black text-rose-400 font-mono">₹{totalImpulseSpend.toLocaleString()}</div>
              <div className="text-[11px] text-zinc-500">across {spikeDays} spike {timelineUnit}{spikeDays > 1 ? 's' : ''}</div>
            </div>
          )}
        </div>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailySpikeData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="#1A2030" opacity={0.4} vertical={false} />
              <XAxis dataKey="label" stroke="#56627D" fontSize={10} tickLine={false} axisLine={false} interval={dailySpikeData.length > 15 ? 4 : 1} />
              <YAxis stroke="#56627D" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => v === 0 ? '' : `₹${v >= 1000 ? `${(v/1000).toFixed(0)}k` : v}`} />
              <RechartsTooltip content={<SpikeDayTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Bar dataKey="amount" radius={[3,3,0,0]} maxBarSize={20}>
                {dailySpikeData.map((entry, i) => (
                  <Cell key={i} fill={entry.isSpike ? '#ef4444' : entry.amount > 0 ? '#3B6EF6' : '#1A2030'} fillOpacity={entry.isSpike ? 1 : 0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-3 justify-center text-xs text-zinc-500">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500/70" /> Normal</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-500" /> Impulse spike</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-surface-3" /> No spend</span>
        </div>
      </Card>

      {/* Charts Row 2: Category Velocity + Day-of-Week */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Category Velocity Card */}
        <Card className="bg-surface-1 border-blue-500/15 rounded-[20px] p-5 min-w-0">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2"><TrendingUp className="w-4 h-4 text-blue-400" /> Category Velocity — Historical Trend</h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">Which categories are growing or shrinking leading up to {timeframeLabel || 'selected period'}</p>
          </div>
          <div className="h-[220px] w-full">
            {topCats.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-zinc-500">Not enough history yet</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryTrends} margin={{ top: 4, right: 8, left: -20, bottom: 0 }} barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2030" opacity={0.4} vertical={false} />
                  <XAxis dataKey="month" stroke="#56627D" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#56627D" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => v === 0 ? '' : `₹${v >= 1000 ? `${(v/1000).toFixed(0)}k` : v}`} />
                  <RechartsTooltip content={<TrendTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                  {topCats.map((cat, i) => (
                    <Bar key={cat} dataKey={cat} name={cat} fill={COLORS[i % COLORS.length]} radius={[2,2,0,0]} maxBarSize={12} fillOpacity={0.85} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Month-over-Month Category Trend Badges */}
          {categoryGrowth.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-line/70">
              {categoryGrowth.map((cg, i) => {
                const color = COLORS[i % COLORS.length];
                return (
                  <div key={cg.category} className="p-2.5 rounded-xl bg-white/[0.02] border border-line/70 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-semibold text-zinc-300 flex items-center gap-1.5 truncate">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                        <span className="truncate">{cg.category}</span>
                      </span>
                      <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded font-mono shrink-0 ${
                        cg.trending === 'up'
                          ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                          : cg.trending === 'down'
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                          : 'bg-white/5 text-zinc-400'
                      }`}>
                        {cg.trending === 'up' ? '▲ +' : cg.trending === 'down' ? '▼ ' : ''}{cg.pct}%
                      </span>
                    </div>
                    <div className="text-xs font-mono font-bold text-white">
                      ₹{cg.current.toLocaleString()}
                      <span className="text-[11px] font-normal text-zinc-500 ml-1">vs ₹{cg.previous.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Day of Week Pattern Card */}
        <Card className="bg-surface-1 border-amber-500/15 rounded-[20px] p-5 min-w-0">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-400" /> Day-of-Week Spending Pattern</h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">Average spend per transaction by weekday</p>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dayOfWeekData} layout="vertical" margin={{ top: 4, right: 40, left: 8, bottom: 4 }} barCategoryGap="18%">
                <XAxis type="number" stroke="#56627D" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => v === 0 ? '' : `₹${v >= 1000 ? `${(v/1000).toFixed(0)}k` : v}`} />
                <YAxis type="category" dataKey="day" stroke="#8A93A6" fontSize={11} tickLine={false} axisLine={false} width={28} />
                <RechartsTooltip content={<DowTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                <Bar dataKey="avgSpend" name="Avg spend" radius={[0,4,4,0]} maxBarSize={18}>
                  {dayOfWeekData.map((entry, i) => {
                    const intensity = maxDowSpend > 0 ? entry.avgSpend / maxDowSpend : 0;
                    return (
                      <Cell key={i}
                        fill={entry.day === peakDay ? '#F5A524' : `rgba(59,130,246,${0.3 + intensity * 0.7})`}
                        fillOpacity={intensity > 0 ? 1 : 0.3}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2 text-center">
            🟡 Peak day: <strong className="text-amber-400">{peakDay}</strong>
          </p>
        </Card>
      </div>

      {/* Charts Row 3: Needs vs Wants + Cumulative Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="bg-surface-1 border-emerald-500/15 rounded-[20px] p-5 min-w-0">
          <div className="mb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" /> Needs vs Wants ({timeframeLabel || 'Selected Range'})
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">Essential vs discretionary spending split</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="h-[180px] w-[180px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={nvwData} cx="50%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={4} dataKey="value">
                    {nvwData.map((_, i) => <Cell key={i} fill={NVW_COLORS[i]} />)}
                  </Pie>
                  <RechartsTooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 w-full space-y-3">
              <div className="p-3 rounded-2xl bg-emerald-500/8 border border-emerald-500/20">
                <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider mb-0.5">Needs</div>
                <div className="text-lg font-black text-white font-mono">₹{needsTotal.toLocaleString()}</div>
                <div className="text-[11px] text-zinc-500">{needsCats.slice(0,3).join(', ')}{needsCats.length > 3 ? ` +${needsCats.length-3}` : ''}</div>
              </div>
              <div className="p-3 rounded-2xl bg-amber-500/8 border border-amber-500/20">
                <div className="text-[11px] text-amber-400 font-bold uppercase tracking-wider mb-0.5">Wants</div>
                <div className="text-lg font-black text-white font-mono">₹{wantsTotal.toLocaleString()}</div>
                <div className="text-[11px] text-zinc-500">{wantsCats.slice(0,3).join(', ')}{wantsCats.length > 3 ? ` +${wantsCats.length-3}` : ''}</div>
              </div>
              {savingsPotential > 0 && (
                <div className="p-2.5 rounded-xl bg-blue-500/8 border border-blue-500/20">
                  <div className="text-[11px] text-blue-400 font-bold">💡 Savings Opportunity</div>
                  <div className="text-xs text-zinc-300 mt-0.5">Cut wants 20% → save <strong className="text-blue-300">₹{savingsPotential.toLocaleString()}</strong> in this period</div>
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card className="bg-surface-1 border-indigo-500/15 rounded-[20px] p-5 min-w-0">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2"><TrendingDown className="w-4 h-4 text-indigo-400" /> Cumulative Spend vs Ideal Pace</h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">Blue = actual · Grey dashed = ideal even distribution</p>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cumulativeData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B6EF6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#3B6EF6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="idealGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#56627D" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#56627D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1A2030" opacity={0.4} vertical={false} />
                <XAxis dataKey="day" stroke="#56627D" fontSize={10} tickLine={false} axisLine={false} interval={cumulativeData.length > 15 ? 4 : 1} />
                <YAxis stroke="#56627D" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => v === 0 ? '' : `₹${v >= 1000 ? `${(v/1000).toFixed(0)}k` : v}`} />
                <RechartsTooltip content={<CumulativeTooltip />} />
                <Area type="monotone" dataKey="ideal" stroke="#56627D" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#idealGrad)" />
                <Area type="monotone" dataKey="actual" stroke="#3B6EF6" strokeWidth={2.5} fill="url(#actualGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2 text-center">Blue above grey = front-loading spend early in the period</p>
        </Card>
      </div>

      {/* Impulse Spending Breakdown & Hall of Shame */}
      {(impulseTransactions.length > 0 || impulseByCategory.length > 0) && (
        <Card className="bg-surface-1 border-rose-500/10 rounded-[20px] p-5 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" /> Impulse Spending ({timeframeLabel || 'Selected Period'})
            </h3>
            <span className="text-[11px] text-zinc-500 font-mono hidden sm:block">discretionary · above avg transaction</span>
          </div>

          {/* Breakdown by Category */}
          {impulseByCategory.length > 0 && (
            <div className="mb-4 p-4 rounded-2xl bg-white/[0.02] border border-line/70">
              <div className="text-xs font-bold text-zinc-300 mb-3 flex items-center justify-between">
                <span>Where impulse spending went in {timeframeLabel || 'this period'}:</span>
                <span className="text-[11px] font-mono text-zinc-500">{impulseByCategory.length} categories</span>
              </div>
              <div className="space-y-2.5">
                {impulseByCategory.map(cat => (
                  <div key={cat.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-300 font-medium">{cat.name} <span className="text-zinc-500 font-normal">({cat.count} tx)</span></span>
                      <span className="font-mono font-bold text-rose-300">₹{cat.total.toLocaleString()} <span className="text-zinc-500 text-[11px] font-normal">({cat.pct}%)</span></span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div className="h-1.5 rounded-full bg-rose-500/80 transition-all duration-500" style={{ width: `${cat.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Individual Top Impulse Transactions */}
          {impulseTransactions.length > 0 && (
            <>
              <div className="text-xs font-bold text-zinc-400 mb-2">Highest Individual Impulse Spends:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {impulseTransactions.map((tx: any, i: number) => (
                  <div key={tx.id || i} className="p-3.5 rounded-2xl bg-rose-500/5 border border-rose-500/15 hover:border-rose-500/30 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <Badge variant="outline" className="text-[11px] px-1.5 py-0 border-rose-500/20 text-rose-300 bg-rose-500/10">{tx.category}</Badge>
                      <span className="text-[11px] text-zinc-500 font-mono">{new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <p className="text-xs font-semibold text-zinc-200 truncate mb-2" title={tx.description}>{tx.description}</p>
                    <div className="text-lg font-black text-rose-400 font-mono">-₹{Number(tx.amount).toLocaleString()}</div>
                    {i === 0 && <p className="text-[11px] text-rose-500 mt-1 font-bold">👑 Biggest impulse in this period</p>}
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="mt-4 p-3 rounded-2xl bg-emerald-500/8 border border-emerald-500/20 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <p className="text-xs text-zinc-300">
              Skipping these {impulseTransactions.length} transactions would have saved you{' '}
              <strong className="text-emerald-400">₹{impulseTransactions.reduce((s: number, t: any) => s + Number(t.amount || 0), 0).toLocaleString()}</strong> in {timeframeLabel || 'this period'}.
            </p>
          </div>
        </Card>
      )}
    </motion.div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

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

  // Unified timeframe filter for both finance analysis and spending intelligence
  const analysisFilter = useMemo<FinanceAnalysisFilter>(() => ({
    mode: timeframeMode,
    date: selectedDate,
    month: selectedMonth,
    year: selectedYear,
    startDate: customStartDate,
    endDate: customEndDate,
  }), [timeframeMode, selectedDate, selectedMonth, selectedYear, customStartDate, customEndDate]);

  // Fetch dynamic analysis based on selected timeframe
  const { data: analysis, isLoading } = useFinanceAnalysis(analysisFilter);

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
    <div className="space-y-6 max-w-7xl mx-auto text-foreground font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[22px] font-extrabold tracking-tight md:text-3xl">Finance Command Center</h1>
          <p className="text-xs text-zinc-400 mt-0.5 font-medium">
            {getTimeframeLabel()}
          </p>
        </div>

        <div className="flex w-full items-center gap-2.5 sm:w-auto">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setCategoryModalOpen(true)}
            className="bg-surface-2 border-line hover:border-blue-500/40 text-zinc-300 hover:text-white rounded-xl text-xs h-9 px-3 gap-1.5"
          >
            <Settings className="w-3.5 h-3.5 text-blue-400" aria-hidden /> <span className="hidden sm:inline">Categories & Subcategories</span><span className="sm:hidden">Categories</span>
          </Button>

          <Button 
            onClick={() => openQuickAdd('transaction')}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl gap-1.5 font-bold h-9 text-xs px-4"
          >
            <Plus className="w-4 h-4" /> Add Transaction
          </Button>
        </div>
      </div>

      {/* Timeframe Selector & Date Controls Bar */}
      <div className="bg-surface-1 border border-blue-500/25 rounded-[20px] p-4 space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Timeframe Mode Pills */}
          <div className="no-scrollbar flex max-w-full items-center gap-1.5 overflow-x-auto p-1 bg-surface-2 rounded-2xl border border-line w-fit">
            {(['daily', 'weekly', 'monthly', 'yearly', 'custom'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTimeframeMode(mode)}
                className={`shrink-0 whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold transition-all capitalize ${
                  timeframeMode === mode
                    ? 'bg-blue-600 text-white'
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
                  className={`text-xs h-8 rounded-xl border-line ${selectedDate === todayStr ? 'bg-blue-600/20 text-blue-300 border-blue-500/40' : 'bg-surface-2 text-zinc-300'}`}
                >
                  Today
                </Button>
                <Input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)} 
                  className="bg-surface-2 border-line text-white rounded-xl h-8 text-xs w-[140px]" 
                />
              </div>
            )}

            {timeframeMode === 'weekly' && (
              <div className="flex items-center gap-2">
                <Input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)} 
                  className="bg-surface-2 border-line text-white rounded-xl h-8 text-xs w-[140px]" 
                />
                <span className="text-xs text-zinc-400 font-mono">
                  Week: {startDateStr} → {endDateStr}
                </span>
              </div>
            )}

            {timeframeMode === 'monthly' && (
              <div className="flex items-center gap-2">
                <Select value={selectedMonth.toString()} onValueChange={(v) => setSelectedMonth(parseInt(v))}>
                  <SelectTrigger className="w-[130px] bg-surface-2 border-line text-white rounded-xl h-8 text-xs">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent className="bg-surface-2 border-line text-white">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <SelectItem key={m} value={m.toString()}>
                        {new Date(2000, m - 1, 1).toLocaleString('default', { month: 'long' })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(parseInt(v))}>
                  <SelectTrigger className="w-[90px] bg-surface-2 border-line text-white rounded-xl h-8 text-xs">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent className="bg-surface-2 border-line text-white">
                    {[currentYear - 2, currentYear - 1, currentYear, currentYear + 1].map((y) => (
                      <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {timeframeMode === 'yearly' && (
              <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(parseInt(v))}>
                <SelectTrigger className="w-[100px] bg-surface-2 border-line text-white rounded-xl h-8 text-xs">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="bg-surface-2 border-line text-white">
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
                  className="bg-surface-2 border-line text-white rounded-xl h-8 text-xs w-[135px]" 
                />
                <span className="text-xs text-zinc-400 font-bold">To</span>
                <Input 
                  type="date" 
                  value={customEndDate} 
                  onChange={(e) => setCustomEndDate(e.target.value)} 
                  className="bg-surface-2 border-line text-white rounded-xl h-8 text-xs w-[135px]" 
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <StatGrid>
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
      </StatGrid>

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
        <Card className="lg:col-span-2 bg-surface-1 border-blue-500/20 rounded-[20px] p-6 flex flex-col justify-between">
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
                <span className="text-zinc-500">•</span>
                <span className="text-rose-400 font-semibold">Out: ₹{totalExpenses.toLocaleString()}</span>
                <span className="text-zinc-500">•</span>
                <span className={`font-bold ${savings >= 0 ? 'text-blue-400' : 'text-rose-400'}`}>
                  Net: {savings >= 0 ? '+' : ''}₹{savings.toLocaleString()}
                </span>
              </div>
            )}
          </CardHeader>

          <CardContent className="p-0 h-[320px] relative">
            {!hasData && !isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-white/[0.01] rounded-2xl border border-line/70">
                <DollarSign className="w-10 h-10 text-zinc-500 mb-2" />
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
                      <stop offset="5%" stopColor="#3B6EF6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3B6EF6" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A2030" opacity={0.4} />
                  <XAxis dataKey="label" stroke="#8A93A6" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis 
                    stroke="#8A93A6" 
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
                    stroke="#3B6EF6" 
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
        <Card className="bg-surface-1 border-blue-500/20 rounded-[20px] p-6 flex flex-col justify-between">
          <CardHeader className="p-0 pb-3">
            <CardTitle className="text-base font-bold text-white flex items-center justify-between">
              <span>Spend by Category</span>
              {categorySpend.length > 0 && (
                <Badge variant="outline" className="border-blue-500/40 text-blue-300 bg-blue-500/10 text-[11px] font-mono">
                  {categorySpend.length} categories
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 h-[320px] relative">
            {categorySpend.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-white/[0.01] rounded-2xl border border-line/70">
                <Target className="w-10 h-10 text-zinc-500 mb-2" />
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
        <Card className="bg-surface-1 border border-line rounded-[20px] p-6">
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
              <div key={tx.id} className="p-3.5 rounded-2xl bg-white/[0.02] border border-line/70 hover:border-white/15 transition-all">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                  <span>{new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                  <Badge variant="outline" className="text-[11px] px-1.5 py-0 border-line text-zinc-300">
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

      {/* ── Spending Intelligence Charts ── */}
      <SpendingInsightsPanel filter={analysisFilter} />

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
        className={`bg-surface-1 border border-${color}-500/20 hover:border-${color}-500/50 hover:bg-${color}-500/5 rounded-2xl p-5 flex items-center gap-4 transition-all group`}
      >
        <div className={`p-3 bg-${color}-500/10 border border-${color}-500/20 group-hover:scale-110 rounded-xl transition-transform shrink-0`}>
          {icon}
        </div>
        <span className={`font-bold text-sm text-white group-hover:text-${color}-400 transition-colors block truncate`}>{title}</span>
      </motion.div>
    </Link>
  );
}
