import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  useBodyMeasurements, 
  useCardioSteps, 
  useSleepLog, 
  useFitnessStats, 
} from './hooks';
import { DailyCheckinModal } from './daily-checkin-modal';
import { DailyLogHistory } from './daily-log-history';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { 
  Scale, Activity, Moon, Plus, Sparkles, Flame, 
  Trash2, Heart, Star, Target, TrendingDown, ArrowLeft 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

export default function BodyPage() {
  const navigate = useNavigate();
  const [checkinModalOpen, setCheckinModalOpen] = useState(false);
  const { data: stats } = useFitnessStats();
  const { data: measurements = [] } = useBodyMeasurements();
  const { data: cardioLogs = [] } = useCardioSteps();
  const { data: sleepLogs = [] } = useSleepLog();

  // Weight Trend Data
  const weightData = measurements.length > 0
    ? [...measurements].reverse().map(m => ({
        date: new Date(m.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        weight: Number(m.body_weight_kg),
        waist: m.waist_cm ? Number(m.waist_cm) : null,
      }))
    : [
        { date: 'Aug 1', weight: 83.0 },
        { date: 'Aug 8', weight: 82.3 },
        { date: 'Aug 15', weight: 81.6 },
        { date: 'Aug 22', weight: 81.0 },
        { date: 'Today', weight: stats?.currentWeight || 80.5 }
      ];

  // Steps Trend Data (Last 7 Logs)
  const stepsData = cardioLogs.length > 0
    ? [...cardioLogs].reverse().slice(-7).map(c => ({
        date: new Date(c.date).toLocaleDateString(undefined, { weekday: 'short' }),
        steps: Number(c.steps || 0),
      }))
    : [
        { date: 'Mon', steps: 8400 },
        { date: 'Tue', steps: 7200 },
        { date: 'Wed', steps: 9100 },
        { date: 'Thu', steps: 8600 },
        { date: 'Fri', steps: 7900 },
        { date: 'Sat', steps: 10200 },
        { date: 'Sun', steps: 8500 }
      ];

  // Sleep Quality Data (Last 7 Logs)
  const sleepData = sleepLogs.length > 0
    ? [...sleepLogs].reverse().slice(-7).map(s => ({
        date: new Date(s.date).toLocaleDateString(undefined, { weekday: 'short' }),
        hours: Number(s.total_sleep_hrs || 0),
        quality: s.sleep_quality || 4,
      }))
    : [
        { date: 'Mon', hours: 7.5, quality: 4 },
        { date: 'Tue', hours: 8.0, quality: 5 },
        { date: 'Wed', hours: 7.0, quality: 3 },
        { date: 'Thu', hours: 7.5, quality: 4 },
        { date: 'Fri', hours: 7.2, quality: 4 },
        { date: 'Sat', hours: 8.5, quality: 5 },
        { date: 'Sun', hours: 7.5, quality: 4 }
      ];

  const currentWeight = stats?.currentWeight || 83.0;
  const startingWeight = stats?.startingWeight || 83.0;
  const targetWeight = stats?.targetWeight || 75.0;
  const weightLost = stats?.weightLost || 0;
  const weightRemaining = stats?.weightRemaining || 8.0;
  const progressPct = stats?.progressPct || 0;

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto text-foreground font-sans">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => navigate('/fitness')}
          className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl gap-2 font-bold text-xs -ml-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Fitness Command Center
        </Button>
      </div>

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Body Metrics & Recovery Hub</h1>
        </div>

        <Button
          onClick={() => setCheckinModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-600/30 gap-1.5 font-bold h-9 text-xs px-4"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" /> Log Daily Check-in
        </Button>
      </div>

      {/* Target Weight Goal Progress Card */}
      <Card className="bg-gradient-to-r from-[#071913] via-[#09221b] to-[#0b0f19] border border-emerald-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Target className="w-3.5 h-3.5" /> Weight Goal Trajectory
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              {currentWeight} kg <span className="text-sm font-medium text-zinc-400">/ {targetWeight} kg Target</span>
            </h2>
            <div className="flex items-center gap-3 text-xs text-zinc-300 font-mono">
              <span>Start: <strong className="text-white">{startingWeight} kg</strong></span>
              <span>•</span>
              <span>Lost: <strong className="text-emerald-400">-{weightLost.toFixed(1)} kg</strong></span>
              <span>•</span>
              <span>To Goal: <strong className="text-orange-400">{weightRemaining.toFixed(1)} kg</strong></span>
            </div>
          </div>

          <div className="w-full md:w-80 space-y-2">
            <div className="flex justify-between text-xs font-bold text-zinc-300">
              <span>Goal Progress</span>
              <span className="text-emerald-400 font-mono">{progressPct}% Complete</span>
            </div>
            <Progress value={progressPct} className="h-3 bg-zinc-800" />
            <span className="text-[11px] text-zinc-400 block text-right font-mono">
              BMI: {stats?.bmi || 30.5} (Target: 24.5)
            </span>
          </div>
        </div>
      </Card>

      {/* Weight & Steps Dual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Trajectory Area Chart */}
        <Card className="bg-[#0b0f19]/90 border border-white/10 rounded-3xl p-5 shadow-2xl backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-orange-400" />
              Weight History (kg)
            </h3>
            <span className="text-xs text-zinc-400 font-mono">Target: 75.0 kg</span>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightData}>
                <defs>
                  <linearGradient id="weightAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} />
                <XAxis dataKey="date" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  formatter={(val: any) => [`${val} kg`, 'Body Weight']}
                />
                <ReferenceLine y={75} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Target 75kg', fill: '#10b981', fontSize: 10 }} />
                <Area type="monotone" dataKey="weight" stroke="#f97316" strokeWidth={2.5} fillOpacity={1} fill="url(#weightAreaGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Steps Activity Bar Chart */}
        <Card className="bg-[#0b0f19]/90 border border-white/10 rounded-3xl p-5 shadow-2xl backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Weekly Steps Velocity
            </h3>
            <span className="text-xs text-zinc-400 font-mono">Goal: 8,000 steps</span>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stepsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} />
                <XAxis dataKey="date" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  formatter={(val: any) => [`${Number(val).toLocaleString()} steps`, 'Steps Logged']}
                />
                <ReferenceLine y={8000} stroke="#3b82f6" strokeDasharray="3 3" label={{ value: 'Goal 8k', fill: '#3b82f6', fontSize: 10 }} />
                <Bar dataKey="steps" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Sleep & Quality Recovery Section */}
      <Card className="bg-[#0b0f19]/90 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Moon className="w-4 h-4 text-blue-400" />
            Sleep Duration & Recovery Quality
          </h3>
          <span className="text-xs text-zinc-400 font-mono">Target: 7.5 – 8.0 hrs</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sleepData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.3} />
                <XAxis dataKey="date" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} domain={[0, 10]} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  formatter={(val: any) => [`${val} hours`, 'Sleep Duration']}
                />
                <ReferenceLine y={7.5} stroke="#f59e0b" strokeDasharray="3 3" />
                <Bar dataKey="hours" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3 bg-[#111827]/60 p-4 rounded-2xl border border-white/5">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">Recovery Insights</span>
            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-400">Avg Sleep:</span>
                <span className="font-bold text-white font-mono">{stats?.sleepLastNight || 7.5} hrs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Quality:</span>
                <span className="font-bold text-amber-400 font-mono">★ {stats?.sleepQuality || 4}/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Hydration Target:</span>
                <span className="font-bold text-blue-400 font-mono">~2.9 L</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* DAILY LOG HISTORY & IN-PLACE EDITOR */}
      <DailyLogHistory />

      {/* Daily Check-in Modal */}
      <DailyCheckinModal
        isOpen={checkinModalOpen}
        onClose={() => setCheckinModalOpen(false)}
      />
    </div>
  );
}
