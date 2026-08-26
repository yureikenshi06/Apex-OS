import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  useFitnessStats, 
  useBodyMeasurements, 
  useCardioSteps, 
  useResetAllFitnessData 
} from './hooks';
import { DailyCheckinModal } from './daily-checkin-modal';
import { DailyLogHistory } from './daily-log-history';
import { TRAINER_WORKOUT_PLAN } from './trainer-workout-seed';
import { useExerciseCompletion } from './exercise-completion-store';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Dumbbell, Flame, Moon, Scale, Sparkles, CheckCircle2, 
  Plus, Activity, Target, ArrowRight, Clock, Heart, 
  ChevronRight, Check, RotateCcw, Trash2 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function FitnessPage() {
  const [checkinModalOpen, setCheckinModalOpen] = useState(false);
  const navigate = useNavigate();

  const { data: stats } = useFitnessStats();
  const { data: measurements = [] } = useBodyMeasurements();
  const { data: cardioLogs = [] } = useCardioSteps();

  const resetAllMutation = useResetAllFitnessData();
  const { completedMap, toggleExercise, resetToday } = useExerciseCompletion();

  // Determine today's workout plan (0=Mon...6=Sun)
  const now = new Date();
  const jsDay = now.getDay();
  const dayOfWeek = jsDay === 0 ? 6 : jsDay - 1;
  const todayTrainerDay = TRAINER_WORKOUT_PLAN.find(p => p.day_of_week === dayOfWeek) || TRAINER_WORKOUT_PLAN[0];

  // Exercises completed count
  const totalExercises = todayTrainerDay.exercises.length;
  const completedCount = todayTrainerDay.exercises.filter(ex => completedMap[ex.name]).length;
  const completionPct = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0;

  const handleResetAllData = async () => {
    if (confirm('Reset all fitness logs, weight entries, steps, and check-ins?')) {
      await resetAllMutation.mutateAsync();
      resetToday();
    }
  };

  // Weight Data
  const weightTrend = measurements.length > 0 
    ? [...measurements].reverse().map(m => ({
        date: new Date(m.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        weight: Number(m.body_weight_kg),
      }))
    : [
        { date: 'Aug 1', weight: 83.0 },
        { date: 'Aug 8', weight: 82.3 },
        { date: 'Aug 15', weight: 81.6 },
        { date: 'Aug 22', weight: 81.0 },
        { date: 'Today', weight: stats?.currentWeight || 80.5 }
      ];

  // Steps Data
  const stepsTrend = cardioLogs.length > 0
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

  const currentWeight = stats?.currentWeight || 83.0;
  const startingWeight = stats?.startingWeight || 83.0;
  const targetWeight = stats?.targetWeight || 75.0;
  const weightLost = stats?.weightLost || 0;
  const weightRemaining = stats?.weightRemaining || 8.0;
  const progressPct = stats?.progressPct || 0;

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto text-foreground font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Fitness Command Center</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button 
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResetAllData}
            disabled={resetAllMutation.isPending}
            className="bg-[#111827] border-white/10 hover:border-rose-500/40 text-zinc-400 hover:text-rose-400 rounded-xl text-xs h-9 px-3 gap-1.5"
            title="Reset/wipe all fitness data"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Data
          </Button>

          <Button 
            onClick={() => setCheckinModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-600/30 gap-1.5 font-bold h-9 text-xs px-4"
          >
            <Activity className="w-4 h-4" /> Log Daily Metrics
          </Button>
        </div>
      </div>

      {/* Sub-Navigation Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link 
          to="/fitness/workout"
          className="p-5 rounded-3xl bg-[#0b0f19]/90 border border-white/10 hover:border-orange-500/50 transition-all flex items-center justify-between group shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/30">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm font-black text-white group-hover:text-orange-400 transition-colors block">
                Trainer Workout Routine
              </span>
              <span className="text-xs text-zinc-400 block mt-0.5">
                6-Day Split (Mon–Sat)
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
        </Link>

        <Link 
          to="/fitness/body"
          className="p-5 rounded-3xl bg-[#0b0f19]/90 border border-white/10 hover:border-emerald-500/50 transition-all flex items-center justify-between group shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors block">
                Body & Recovery Hub
              </span>
              <span className="text-xs text-zinc-400 block mt-0.5">
                Weight Goal, Steps & Sleep
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
        </Link>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        <StatCard 
          title="Current Weight" 
          value={currentWeight} 
          format="number"
          suffix=" kg"
          color="text-orange-400"
          gradient="from-orange-600/20 via-orange-600/5 to-transparent"
          changeLabel={`Goal: ${targetWeight} kg (${weightRemaining.toFixed(1)}kg to go)`} 
          icon={Scale} 
        />
        <StatCard 
          title="Workout Streak" 
          value={stats?.workoutStreak || 12} 
          format="number"
          suffix=" Days"
          color="text-amber-400"
          gradient="from-amber-600/20 via-amber-600/5 to-transparent"
          changeLabel="Consistent Split" 
          icon={Flame} 
        />
        <StatCard 
          title="Steps Today" 
          value={stats?.stepsToday || 8420} 
          format="number"
          color="text-emerald-400"
          gradient="from-emerald-600/20 via-emerald-600/5 to-transparent"
          changeLabel="Target: 8,000 steps" 
          icon={Activity} 
        />
        <StatCard 
          title="Sleep Last Night" 
          value={stats?.sleepLastNight || 7.5} 
          format="hours"
          color="text-blue-400"
          gradient="from-blue-600/20 via-blue-600/5 to-transparent"
          changeLabel={`Quality: ★ ${stats?.sleepQuality || 4}/5`} 
          icon={Moon} 
        />
      </div>

      {/* Recomposition Goal Progress Card */}
      <Card className="bg-gradient-to-r from-[#071913] via-[#09221b] to-[#0b0f19] border border-emerald-500/30 rounded-3xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Target className="w-3.5 h-3.5" /> Weight Goal Trajectory
            </div>
            <h3 className="text-2xl font-black text-white">
              {currentWeight} kg <span className="text-sm font-medium text-zinc-400">/ {targetWeight} kg Target</span>
            </h3>
            <div className="flex items-center gap-3 text-xs text-zinc-300 font-mono">
              <span>Start: <strong className="text-white">{startingWeight} kg</strong></span>
              <span>•</span>
              <span>Lost: <strong className="text-emerald-400">-{weightLost.toFixed(1)} kg</strong></span>
              <span>•</span>
              <span>BMI: <strong className="text-blue-400">{stats?.bmi || 30.5}</strong></span>
            </div>
          </div>

          <div className="w-full md:w-80 space-y-2">
            <div className="flex justify-between text-xs font-bold text-zinc-300">
              <span>Progress</span>
              <span className="text-emerald-400 font-mono">{progressPct}%</span>
            </div>
            <Progress value={progressPct} className="h-3 bg-zinc-800" />
            <span className="text-[11px] text-zinc-400 block text-right font-mono">
              {weightRemaining.toFixed(1)} kg to goal
            </span>
          </div>
        </div>
      </Card>

      {/* TODAY'S PRESCRIBED WORKOUT ROUTINE */}
      <Card className="bg-[#0b0f19]/90 border border-orange-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              <h3 className="text-base font-bold text-white">
                Today's Prescribed Routine: <span className="text-orange-300">{todayTrainerDay.day_name}</span>
              </h3>
            </div>
            <span className="text-xs text-zinc-400 block mt-0.5">{todayTrainerDay.focus}</span>
          </div>

          <div className="flex items-center gap-3">
            {totalExercises > 0 && (
              <span className="text-xs font-mono font-bold text-zinc-300">
                Completed: <strong className="text-emerald-400">{completedCount}/{totalExercises} ({completionPct}%)</strong>
              </span>
            )}
            <Button
              size="sm"
              onClick={() => navigate('/fitness/workout')}
              className="bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold h-8 px-3"
            >
              Full Plan →
            </Button>
          </div>
        </div>

        {todayTrainerDay.exercises.length === 0 ? (
          <div className="p-6 rounded-2xl bg-[#111827]/40 text-center text-xs text-zinc-400 space-y-1">
            <span className="text-sm font-bold text-white block">Sunday Rest Day</span>
            <span>Optional 20–30 min walk and mobility.</span>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {/* Every single exercise without limit */}
              {todayTrainerDay.exercises.map((ex, idx) => {
                const isDone = Boolean(completedMap[ex.name]);

                return (
                  <div 
                    key={ex.name}
                    onClick={() => toggleExercise(ex.name)}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer group select-none ${
                      isDone
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-zinc-400' 
                        : 'bg-[#111827]/70 border-white/5 hover:border-orange-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExercise(ex.name);
                        }}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors border ${
                          isDone 
                            ? 'bg-emerald-500 border-emerald-400 text-white' 
                            : 'border-zinc-700 bg-[#0b0f19] hover:border-orange-500'
                        }`}
                      >
                        {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                      </button>

                      <div className="min-w-0">
                        <h4 className={`text-xs font-bold truncate transition-colors ${
                          isDone ? 'line-through text-zinc-500' : 'text-white group-hover:text-orange-300'
                        }`}>
                          {idx + 1}. {ex.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="outline" className="text-[9px] border-white/10 text-zinc-400 bg-white/5 py-0">
                            {ex.muscle_group}
                          </Badge>
                          <span className="text-[10px] text-zinc-400 font-mono">
                            {ex.sets} sets × {ex.reps}
                          </span>
                          <span className="text-[9px] text-zinc-500 font-mono">
                            (Rest {ex.rest_sec}s)
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded shrink-0 ${
                      isDone ? 'text-emerald-400 bg-emerald-500/10' : 'text-zinc-500 group-hover:text-white'
                    }`}>
                      {isDone ? 'Done ✓' : 'Mark Done'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Cardio & Cooldown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {todayTrainerDay.cardio && (
                <div className="p-3 rounded-2xl bg-blue-950/20 border border-blue-500/30 text-xs">
                  <span className="font-bold text-blue-300 block mb-0.5">⚡ Cardio:</span>
                  <span className="text-zinc-300 text-[11px]">{todayTrainerDay.cardio}</span>
                </div>
              )}
              {todayTrainerDay.cooldown && (
                <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs">
                  <span className="font-bold text-emerald-300 block mb-0.5">🌿 Cooldown:</span>
                  <span className="text-zinc-300 text-[11px]">{todayTrainerDay.cooldown}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>

      {/* Dual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#0b0f19]/90 border border-white/10 rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-orange-400" />
              Weight Trajectory (kg)
            </h3>
            <span className="text-xs text-zinc-400 font-mono">Target: 75.0 kg</span>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightTrend}>
                <defs>
                  <linearGradient id="weightMainGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="date" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#090d18', borderColor: '#1e293b', borderRadius: '16px', color: '#fff', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.8)' }}
                  formatter={(val: any) => [`${val} kg`, 'Body Weight']}
                />
                <ReferenceLine y={75} stroke="#3b82f6" strokeDasharray="3 3" />
                <Area type="monotone" dataKey="weight" stroke="#ef4444" strokeWidth={2.5} fillOpacity={1} fill="url(#weightMainGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-[#0b0f19]/90 border border-blue-500/20 rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              Daily Steps Velocity
            </h3>
            <span className="text-xs text-zinc-400 font-mono">Goal: 8,000 steps</span>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stepsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="date" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#090d18', borderColor: '#1e293b', borderRadius: '16px', color: '#fff', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.8)' }}
                  formatter={(val: any) => [`${Number(val).toLocaleString()} steps`, 'Steps']}
                />
                <ReferenceLine y={8000} stroke="#ef4444" strokeDasharray="3 3" />
                <Bar dataKey="steps" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

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
