import React from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useHomeStats, useDailyScore, useNeedsAttention } from './hooks';
import { useTasks, useUpdateTask } from '../tasks/hooks';
import { useDailyPlanner, useGenerateFromTemplate, useUpdatePlannerEntry } from '../timetable/hooks';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/shared/stat-card';
import { EmptyState } from '@/components/shared/empty-state';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, Clock, AlertTriangle, Check, Activity, Sparkles, Plus, Calendar, Flame } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '@/store/ui-store';

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { openQuickAdd } = useUIStore();
  const today = format(new Date(), 'yyyy-MM-dd');
  const displayDate = format(new Date(), 'EEEE, d MMMM yyyy');

  const { cfaHours, monthlySpend, fitnessHabits, tasksDue } = useHomeStats();
  const { data: dailyScore = 0 } = useDailyScore(today);
  const { data: needsAttention = [] } = useNeedsAttention();
  
  const { data: tasks = [] } = useTasks();
  const todayTasks = tasks.filter(t => t.deadline === today && t.status !== 'Done');
  
  const { data: scheduleEntries = [], isLoading: scheduleLoading } = useDailyPlanner(today);
  const generateTemplate = useGenerateFromTemplate();
  const updatePlannerEntry = useUpdatePlannerEntry();
  const updateTask = useUpdateTask();

  const handleTaskToggle = (id: string, isDone: boolean) => {
    updateTask.mutate({ id, updates: { status: isDone ? 'Done' : 'To Do' } });
  };

  const handleScheduleStatus = (id: string, status: string) => {
    updatePlannerEntry.mutate({ id, updates: { completion_status: status } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto text-foreground">
      {/* Top Banner & Daily Score */}
      <motion.div 
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-transparent p-6 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl" 
        variants={containerVariants} 
        initial="hidden" 
        animate="show"
      >
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Apex Executive OS
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Welcome back, {user?.email?.split('@')[0] || 'Prakhar'}
          </h1>
          <p className="text-sm font-medium text-zinc-400">{displayDate}</p>
          
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="secondary" className="bg-orange-500/15 text-orange-300 border-orange-500/30 px-3 py-1 text-xs font-semibold gap-1.5 shadow-sm">
              <Flame className="w-3.5 h-3.5 text-orange-400" /> 12-Day Workout Streak
            </Badge>
            <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 px-3 py-1 text-xs font-semibold gap-1.5 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 5-Day Habit Streak
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/15 text-blue-300 border-blue-500/30 px-3 py-1 text-xs font-semibold gap-1.5 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-blue-400" /> 8-Day CFA Streak
            </Badge>
          </div>
        </div>
        
        {/* Animated Daily Score Ring */}
        <div className="flex items-center gap-5 bg-[#111118]/90 p-5 rounded-2xl border border-white/10 shadow-2xl z-10">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" className="fill-none stroke-zinc-800" strokeWidth="8" />
              <circle 
                cx="50" cy="50" r="42" 
                className="fill-none stroke-indigo-500 transition-all duration-1000 ease-out shadow-lg" 
                strokeWidth="8" 
                strokeDasharray="263.89" 
                strokeDashoffset={263.89 - (263.89 * (dailyScore || 0)) / 100}
                strokeLinecap="round" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-white">{Math.round(dailyScore)}%</span>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Score</span>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Daily Execution Score</h3>
            <p className="text-xs text-zinc-400 max-w-[130px] leading-snug mt-0.5">
              Weighted target completion across timetable & habits
            </p>
          </div>
        </div>
      </motion.div>

      {/* 4 Stat Cards Row - Exactly equal height and vibrant styling */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch" 
        variants={containerVariants} 
        initial="hidden" 
        animate="show"
      >
        <StatCard 
          title="CFA Hours This Week" 
          value={cfaHours.value} 
          format="hours"
          color="text-indigo-400"
          gradient="from-indigo-600/20 via-indigo-600/5 to-transparent"
          changeLabel={`Target: ${cfaHours.target}h per week`} 
          icon={Clock} 
        />
        <StatCard 
          title="Monthly Spend" 
          value={monthlySpend.value} 
          format="currency" 
          prefix="₹"
          color="text-emerald-400"
          gradient="from-emerald-600/20 via-emerald-600/5 to-transparent"
          changeLabel={`Budget: ₹${monthlySpend.budget.toLocaleString('en-IN')}`} 
          icon={Activity} 
        />
        <StatCard 
          title="Fitness Habits" 
          value={fitnessHabits.total > 0 ? (fitnessHabits.completed / fitnessHabits.total) * 100 : 0} 
          format="percent" 
          color="text-purple-400"
          gradient="from-purple-600/20 via-purple-600/5 to-transparent"
          changeLabel={`${fitnessHabits.completed}/${fitnessHabits.total} habits completed`} 
          icon={CheckCircle2} 
        />
        <StatCard 
          title="Tasks Due" 
          value={tasksDue.today} 
          format="number" 
          color="text-rose-400"
          gradient="from-rose-600/20 via-rose-600/5 to-transparent"
          changeLabel={`${tasksDue.overdue} overdue items`} 
          icon={AlertTriangle} 
        />
      </motion.div>

      {/* Middle Section: Today's Schedule + Today's Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <motion.div variants={itemVariants} initial="hidden" animate="show" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              Today's Schedule
            </h2>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => navigate('/timetable/daily')}
              className="text-xs text-indigo-400 hover:text-indigo-300"
            >
              Open Daily Planner →
            </Button>
          </div>

          <Card className="bg-[#111118]/80 backdrop-blur-xl border-white/10 rounded-2xl shadow-xl overflow-hidden min-h-[280px] flex flex-col justify-center">
            <CardContent className="p-4 flex-1 flex flex-col justify-center">
              {scheduleLoading ? (
                <div className="space-y-2 p-2">
                  <div className="h-12 bg-white/5 animate-pulse rounded-xl" />
                  <div className="h-12 bg-white/5 animate-pulse rounded-xl" />
                </div>
              ) : scheduleEntries.length === 0 ? (
                <div className="text-center py-8 px-4 space-y-4">
                  <p className="text-sm text-zinc-400">No schedule generated for today yet.</p>
                  <Button
                    onClick={() => generateTemplate.mutate(today)}
                    disabled={generateTemplate.isPending}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 gap-2 font-medium"
                  >
                    <Sparkles className="w-4 h-4" />
                    {generateTemplate.isPending ? 'Generating...' : "Generate from Master Timetable"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                  {scheduleEntries.map((entry: any) => {
                    const isCompleted = entry.completion_status === 'Completed';
                    return (
                      <div 
                        key={entry.id}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                          isCompleted 
                            ? 'bg-emerald-950/20 border-emerald-500/30 opacity-75' 
                            : 'bg-white/5 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono text-xs text-zinc-400 shrink-0">
                            {entry.start_time?.slice(0, 5)} - {entry.end_time?.slice(0, 5)}
                          </span>
                          <span className={`text-sm font-semibold truncate ${isCompleted ? 'line-through text-zinc-400' : 'text-white'}`}>
                            {entry.planned_activity}
                          </span>
                          {entry.category && (
                            <Badge variant="outline" className="text-[10px] bg-white/5 border-white/10 text-zinc-300 shrink-0">
                              {entry.category}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <button
                            onClick={() => handleScheduleStatus(entry.id, isCompleted ? 'In Progress' : 'Completed')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                              isCompleted 
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                                : 'bg-white/10 text-zinc-400 hover:bg-white/20 hover:text-white'
                            }`}
                          >
                            {isCompleted ? 'Done ✓' : 'Mark Done'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Tasks */}
        <motion.div variants={itemVariants} initial="hidden" animate="show" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              Today's Priority Tasks
            </h2>
            <Button 
              size="sm" 
              onClick={() => openQuickAdd('task')}
              className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 text-xs rounded-xl gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Task
            </Button>
          </div>

          <Card className="bg-[#111118]/80 backdrop-blur-xl border-white/10 rounded-2xl shadow-xl overflow-hidden min-h-[280px] flex flex-col justify-center">
            <CardContent className="p-4 flex-1 flex flex-col justify-center">
              {todayTasks.length === 0 ? (
                <EmptyState title="All clear for today! 🎉" description="No pending tasks due today. Add a new task or review upcoming milestones." />
              ) : (
                <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                  <AnimatePresence>
                    {todayTasks.map(task => (
                      <motion.div 
                        key={task.id} 
                        layout 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all"
                      >
                        <Checkbox 
                          checked={task.status === 'Done'} 
                          onCheckedChange={(checked) => handleTaskToggle(task.id, Boolean(checked))} 
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-white truncate">{task.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-[10px] h-4 text-zinc-400 border-white/10 bg-white/5">
                              {task.category}
                            </Badge>
                            <Badge 
                              variant="outline" 
                              className={`text-[10px] h-4 font-bold ${
                                task.priority === 'High' 
                                  ? 'border-rose-500/40 text-rose-400 bg-rose-500/10' 
                                  : 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10'
                              }`}
                            >
                              {task.priority}
                            </Badge>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Section: Needs Attention */}
      <motion.div variants={itemVariants} initial="hidden" animate="show" className="space-y-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          Smart Attention Radar
        </h2>
        <Card className="bg-[#111118]/80 backdrop-blur-xl border-white/10 rounded-2xl shadow-xl overflow-hidden">
          <CardContent className="p-5">
            {needsAttention.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3 text-emerald-400 shadow-inner">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="text-emerald-400 font-bold text-base">All caught up! 🎉</h3>
                <p className="text-xs text-zinc-400 mt-1">No overdue tasks or budget overruns detected. Keep up the high momentum.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {needsAttention.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    <Badge variant="outline" className="border-rose-500/40 text-rose-400 text-xs">
                      {item.type || 'Action Required'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
