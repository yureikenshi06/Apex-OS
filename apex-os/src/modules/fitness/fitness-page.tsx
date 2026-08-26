import React from 'react';
import { motion } from 'framer-motion';
import { useFitnessStats, useBodyMeasurements } from './hooks';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';
import { StatCard } from '@/components/shared/stat-card';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dumbbell, Flame, Utensils, Heart, Moon, Scale, Sparkles, CheckCircle2, Plus, Activity } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function FitnessPage() {
  const { data: stats, isLoading } = useFitnessStats();
  const { data: measurements = [] } = useBodyMeasurements();
  const navigate = useNavigate();

  const weightTrend = measurements.length > 0 
    ? [...measurements].reverse().map(m => ({
        date: m.date,
        weight: Number(m.body_weight_kg),
      }))
    : [
        { date: 'Aug 1', weight: 83.0 },
        { date: 'Aug 8', weight: 82.2 },
        { date: 'Aug 15', weight: 81.6 },
        { date: 'Aug 22', weight: 81.0 },
        { date: 'Today', weight: stats?.currentWeight || 80.5 }
      ];

  const caloriePct = Math.min(100, Math.round(((stats?.caloriesToday || 0) / (stats?.calorieTarget || 2199)) * 100));
  const proteinPct = Math.min(100, Math.round(((stats?.proteinToday || 0) / (stats?.proteinTarget || 149)) * 100));

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Fitness Command Center</h1>
            <Badge variant="secondary" className="bg-orange-900/50 text-orange-200 border-orange-700/50 font-semibold px-2.5">
              Body Recomposition
            </Badge>
          </div>
          <p className="text-sm text-zinc-400 mt-1">Track workouts, calorie/protein intake, body weight trend, and recovery metrics.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={() => navigate('/fitness/log')}
            className="bg-orange-600 hover:bg-orange-500 text-white rounded-xl shadow-lg shadow-orange-600/30 gap-1.5 font-semibold"
          >
            <Dumbbell className="w-4 h-4" /> Log Workout
          </Button>
          <Button 
            onClick={() => navigate('/fitness/food-log')}
            variant="outline"
            className="border-white/10 text-white hover:bg-white/10 rounded-xl gap-1.5"
          >
            <Utensils className="w-4 h-4" /> Log Food
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        <StatCard 
          title="Current Weight" 
          value={stats?.currentWeight || 80.5} 
          format="number"
          suffix=" kg"
          color="text-orange-400"
          gradient="from-orange-600/20 via-orange-600/5 to-transparent"
          changeLabel={`Goal: ${stats?.targetWeight || 75} kg (Start: ${stats?.startingWeight || 83}kg)`} 
          icon={Scale} 
        />
        <StatCard 
          title="Workout Streak" 
          value={stats?.workoutStreak || 12} 
          format="number"
          suffix=" Days"
          color="text-amber-400"
          gradient="from-amber-600/20 via-amber-600/5 to-transparent"
          changeLabel="Consistent training" 
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
          color="text-indigo-400"
          gradient="from-indigo-600/20 via-indigo-600/5 to-transparent"
          changeLabel="Target: 7.5 hours" 
          icon={Moon} 
        />
      </div>

      {/* Charts & Nutrition Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weight Trajectory Chart */}
        <Card className="lg:col-span-2 bg-[#111118]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-orange-400" />
              Weight Trend (kg)
            </CardTitle>
            <Badge variant="outline" className="text-xs text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
              -{(stats?.weightLost || 2.5).toFixed(1)} kg Lost
            </Badge>
          </CardHeader>
          <CardContent className="h-[280px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightTrend}>
                <defs>
                  <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.4} />
                <XAxis dataKey="date" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#181824', borderColor: '#3f3f46', borderRadius: '12px', color: '#fff' }}
                  formatter={(val: any) => [`${val} kg`, 'Weight']}
                />
                <Area type="monotone" dataKey="weight" stroke="#f97316" strokeWidth={2.5} fillOpacity={1} fill="url(#weightGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daily Macros Snapshot */}
        <Card className="bg-[#111118]/80 border-white/10 backdrop-blur-xl rounded-2xl shadow-xl flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <Utensils className="w-4 h-4 text-rose-400" />
              Today's Nutrition Targets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            {/* Calories */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-zinc-400">Calories</span>
                <span className="text-white font-mono">{stats?.caloriesToday} / {stats?.calorieTarget} kcal ({caloriePct}%)</span>
              </div>
              <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500" style={{ width: `${caloriePct}%` }} />
              </div>
            </div>

            {/* Protein */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-zinc-400">Protein</span>
                <span className="text-emerald-400 font-mono">{stats?.proteinToday}g / {stats?.proteinTarget}g ({proteinPct}%)</span>
              </div>
              <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500" style={{ width: `${proteinPct}%` }} />
              </div>
            </div>

            {/* Habit Checklist Score */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Consistency Score</span>
                <span className="text-[11px] text-zinc-400 block mt-0.5">9-point daily fitness checklist</span>
              </div>
              <span className="text-2xl font-black text-indigo-400 font-mono">{stats?.consistencyScore}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fitness Sub-Modules Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <FitnessNav to="/fitness/workout" title="Workout Plan" icon={<Dumbbell className="w-4 h-4 text-orange-400" />} />
        <FitnessNav to="/fitness/log" title="Workout Log" icon={<Activity className="w-4 h-4 text-amber-400" />} />
        <FitnessNav to="/fitness/habits" title="9-Habit Check" icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />} />
        <FitnessNav to="/fitness/meals" title="Meal Plans" icon={<Utensils className="w-4 h-4 text-rose-400" />} />
        <FitnessNav to="/fitness/supplements" title="Supplements" icon={<Sparkles className="w-4 h-4 text-purple-400" />} />
        <FitnessNav to="/fitness/body" title="Body & BMI" icon={<Scale className="w-4 h-4 text-blue-400" />} />
      </div>
    </div>
  );
}

function FitnessNav({ to, title, icon }: { to: string, title: string, icon: React.ReactNode }) {
  return (
    <Link to={to}>
      <motion.div 
        whileHover={{ y: -2, scale: 1.02 }} 
        whileTap={{ scale: 0.98 }} 
        className="bg-[#111118]/80 border border-white/10 hover:border-orange-500/40 rounded-2xl p-4 text-center flex flex-col items-center justify-center gap-2 transition-all shadow-xl group cursor-pointer"
      >
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform shadow-inner">
          {icon}
        </div>
        <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors truncate w-full">{title}</span>
      </motion.div>
    </Link>
  );
}
