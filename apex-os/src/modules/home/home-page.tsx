import React from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useHomeStats, useDailyScore, useNeedsAttention, useTodaySchedule } from './hooks';
import { useTasks, useUpdateTask } from '../tasks/hooks';
import { 
  useUpdatePlannerEntry, 
  useDeletePlannerEntry, 
  useGenerateFromTemplate, 
  useClearDailyPlanner 
} from '../timetable/hooks';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/shared/stat-card';
import { EmptyState } from '@/components/shared/empty-state';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CheckCircle2, Clock, AlertTriangle, Check, Activity, 
  Sparkles, Plus, Calendar, Flame, ArrowRight, Zap, 
  Target, Dumbbell, Wallet, GraduationCap, Play, ShieldAlert,
  Trash2, RotateCcw
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useUIStore } from '@/store/ui-store';

export default function HomePage() {
  const navigate = useNavigate();
  const { openQuickAdd } = useUIStore();
  const today = format(new Date(), 'yyyy-MM-dd');

  const { cfaHours, monthlySpend, fitnessHabits, tasksDue } = useHomeStats();
  const { data: dailyScore = 82 } = useDailyScore(today);
  const { data: needsAttention = [] } = useNeedsAttention();
  
  const { data: allTasks = [] } = useTasks();
  const priorityTasks = allTasks
    .filter(t => t.status !== 'Done')
    .sort((a, b) => {
      if (a.priority === 'High' && b.priority !== 'High') return -1;
      if (b.priority === 'High' && a.priority !== 'High') return 1;
      return 0;
    })
    .slice(0, 6);
  
  const { schedule = [], ongoingBlock, nextBlock, isLoading: scheduleLoading } = useTodaySchedule(today);
  const updatePlannerEntry = useUpdatePlannerEntry();
  const deletePlannerEntry = useDeletePlannerEntry();
  const generateFromTemplate = useGenerateFromTemplate();
  const clearDailyPlanner = useClearDailyPlanner();
  const updateTask = useUpdateTask();

  const handleTaskToggle = (id: string, isDone: boolean) => {
    updateTask.mutate({ id, updates: { status: isDone ? 'Done' : 'To Do' } });
  };

  const handleScheduleStatus = (id: string, status: string) => {
    updatePlannerEntry.mutate({ id, updates: { completion_status: status } });
  };

  const handleDeleteScheduleItem = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Delete this item from today\'s schedule?')) {
      await deletePlannerEntry.mutateAsync(id);
    }
  };

  const handleSyncMasterSchedule = async () => {
    if (confirm('Sync and populate today\'s complete routine from your Master Timetable?')) {
      await generateFromTemplate.mutateAsync(today);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 }
  };

  // Schedule completion count
  const completedScheduleCount = schedule.filter((s: any) => s.completion_status === 'Completed').length;

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto text-foreground font-sans">
      {/* ========================================================================= */}
      {/* 1. TOP EXECUTIVE HERO BANNER & DAILY EXECUTION SCORE                      */}
      {/* ========================================================================= */}
      <motion.div 
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-[#0b1329] via-[#0d1733] to-[#080d1a] p-6 md:p-8 rounded-3xl border border-blue-500/25 shadow-2xl relative overflow-hidden backdrop-blur-2xl" 
        variants={containerVariants} 
        initial="hidden" 
        animate="show"
      >
        {/* Ambient Glows */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-rose-400 bg-clip-text text-transparent">Master Yurei Kenshi</span>
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-1">
            <Badge variant="secondary" className="bg-rose-500/15 text-rose-300 border-rose-500/30 px-3 py-1 text-xs font-semibold gap-1.5 shadow-sm">
              <Flame className="w-3.5 h-3.5 text-rose-400" /> 12-Day Workout Streak
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/15 text-blue-300 border-blue-500/30 px-3 py-1 text-xs font-semibold gap-1.5 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> 5-Day Habit Streak
            </Badge>
            <Badge variant="secondary" className="bg-cyan-500/15 text-cyan-300 border-cyan-500/30 px-3 py-1 text-xs font-semibold gap-1.5 shadow-sm">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" /> 8-Day CFA Streak
            </Badge>
          </div>
        </div>
        
        {/* Animated Daily Mastery Score Ring with Blue-Red Dual Gradient */}
        <div className="flex items-center gap-5 bg-[#090d18]/90 p-5 rounded-3xl border border-blue-500/30 shadow-2xl z-10 shrink-0">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="scoreBlueRed" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="42" className="fill-none stroke-zinc-800/80" strokeWidth="8" />
              <circle 
                cx="50" cy="50" r="42" 
                className="fill-none transition-all duration-1000 ease-out" 
                stroke="url(#scoreBlueRed)"
                strokeWidth="8" 
                strokeDasharray="263.89" 
                strokeDashoffset={263.89 - (263.89 * (dailyScore || 0)) / 100}
                strokeLinecap="round" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-white font-mono">{Math.round(dailyScore)}%</span>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Mastery</span>
            </div>
          </div>
          <div>
            <h3 className="font-black text-white text-base">Execution Score</h3>
            <span className="text-xs text-zinc-400 font-mono">Live Composite</span>
          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. ONGOING & UPCOMING SCHEDULE LIVE RADAR BANNER                           */}
      {/* ========================================================================= */}
      {(ongoingBlock || nextBlock) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ongoingBlock ? (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-[#0b0f19] border border-blue-500/40 shadow-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">Currently Active (Now)</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{ongoingBlock.activity}</h4>
                  <span className="text-xs text-zinc-400 font-mono">{ongoingBlock.start_time?.slice(0, 5)} – {ongoingBlock.end_time?.slice(0, 5)}</span>
                </div>
              </div>
              <Badge className="bg-blue-600 text-white font-mono text-[10px]">{ongoingBlock.category}</Badge>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-[#0b0f19]/80 border border-white/5 shadow-xl flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Next Activity Slot</span>
                <h4 className="text-sm font-bold text-zinc-300 mt-0.5">{nextBlock?.activity || 'Free Time'}</h4>
                <span className="text-xs text-zinc-500 font-mono">{nextBlock?.start_time?.slice(0, 5)} – {nextBlock?.end_time?.slice(0, 5)}</span>
              </div>
              {nextBlock?.category && <Badge variant="outline" className="text-[10px] border-white/10 text-zinc-400">{nextBlock.category}</Badge>}
            </div>
          )}

          {nextBlock && ongoingBlock && (
            <div className="p-4 rounded-2xl bg-[#0b0f19]/80 border border-white/10 shadow-xl flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Coming Up Next</span>
                <h4 className="text-sm font-bold text-white mt-0.5 truncate max-w-xs">{nextBlock.activity}</h4>
                <span className="text-xs text-zinc-400 font-mono">{nextBlock.start_time?.slice(0, 5)} – {nextBlock.end_time?.slice(0, 5)}</span>
              </div>
              <Button onClick={() => navigate('/timetable')} size="sm" variant="ghost" className="text-xs text-blue-400 hover:text-white rounded-xl h-8 px-2.5">
                Timetable →
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. 4 CORE EXECUTIVE METRIC CARDS                                         */}
      {/* ========================================================================= */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch" 
        variants={containerVariants} 
        initial="hidden" 
        animate="show"
      >
        <StatCard 
          title="CFA Study Velocity" 
          value={cfaHours.value} 
          format="hours"
          color="text-blue-400"
          gradient="from-blue-600/20 via-blue-600/5 to-transparent"
          changeLabel={`${cfaHours.completedTopics}/${cfaHours.totalTopics} LOS (${cfaHours.masteryPct}%)`} 
          icon={GraduationCap} 
        />
        <StatCard 
          title="Monthly Spend Outflow" 
          value={monthlySpend.value} 
          format="currency" 
          prefix="₹"
          color="text-emerald-400"
          gradient="from-emerald-600/20 via-emerald-600/5 to-transparent"
          changeLabel={`Budget limit: ₹${monthlySpend.budget.toLocaleString('en-IN')}`} 
          icon={Wallet} 
        />
        <StatCard 
          title="Fitness & Habits Hit" 
          value={fitnessHabits.pct} 
          format="percent" 
          color="text-purple-400"
          gradient="from-purple-600/20 via-purple-600/5 to-transparent"
          changeLabel={`${fitnessHabits.completed}/9 core habits checked today`} 
          icon={Dumbbell} 
        />
        <StatCard 
          title="Deliverables Due" 
          value={tasksDue.today} 
          format="number" 
          color="text-rose-400"
          gradient="from-rose-600/20 via-rose-600/5 to-transparent"
          changeLabel={`${tasksDue.overdue} overdue items pending`} 
          icon={AlertTriangle} 
        />
      </motion.div>

      {/* ========================================================================= */}
      {/* 4. MIDDLE SECTION: TODAY'S SCHEDULE + PRIORITY TASKS                     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Today's Auto-Loaded Schedule */}
        <motion.div variants={itemVariants} initial="hidden" animate="show" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white">Today's Schedule</h2>
              <span className="text-xs text-zinc-400 font-mono">({completedScheduleCount}/{schedule.length} done)</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleSyncMasterSchedule}
                disabled={generateFromTemplate.isPending}
                className="text-[11px] h-7 px-2 bg-[#111827] border-white/10 hover:border-blue-500/40 text-blue-300 rounded-lg gap-1"
                title="Populate/Reset today's routine from Master Timetable"
              >
                <RotateCcw className="w-3 h-3 text-blue-400" /> Sync Master
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => navigate('/timetable')}
                className="text-xs text-zinc-400 hover:text-white rounded-lg h-7 px-2"
              >
                Timetable →
              </Button>
            </div>
          </div>

          <Card className="bg-[#0b0f19]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden min-h-[320px] flex flex-col justify-between">
            <CardContent className="p-4 flex-1 flex flex-col justify-start">
              {scheduleLoading ? (
                <div className="space-y-2 p-2">
                  <div className="h-12 bg-white/5 animate-pulse rounded-xl" />
                  <div className="h-12 bg-white/5 animate-pulse rounded-xl" />
                </div>
              ) : schedule.length === 0 ? (
                <div className="text-center py-12 px-4 space-y-3">
                  <p className="text-sm text-zinc-400">No schedule items found for today.</p>
                  <Button onClick={handleSyncMasterSchedule} className="bg-blue-600 text-white rounded-xl text-xs">
                    Sync from Master Timetable
                  </Button>
                </div>
              ) : (
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {schedule.map((entry: any, idx: number) => {
                    const isCompleted = entry.completion_status === 'Completed';
                    return (
                      <div 
                        key={entry.id || idx}
                        className={`flex items-center justify-between p-3 rounded-2xl border transition-all group ${
                          isCompleted 
                            ? 'bg-emerald-950/20 border-emerald-500/30 opacity-70' 
                            : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono text-xs text-zinc-400 shrink-0">
                            {entry.start_time?.slice(0, 5)} - {entry.end_time?.slice(0, 5)}
                          </span>
                          <span className={`text-sm font-semibold truncate ${isCompleted ? 'line-through text-zinc-500' : 'text-white'}`}>
                            {entry.activity || entry.planned_activity}
                          </span>
                          {entry.category && (
                            <Badge variant="outline" className="text-[10px] bg-white/5 border-white/10 text-zinc-400 shrink-0 hidden sm:inline-flex">
                              {entry.category}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <button
                            onClick={() => handleScheduleStatus(entry.id, isCompleted ? 'In Progress' : 'Completed')}
                            className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                              isCompleted 
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                                : 'bg-white/5 text-zinc-400 hover:bg-white/15 hover:text-white border border-white/5'
                            }`}
                          >
                            {isCompleted ? 'Done ✓' : 'Mark Done'}
                          </button>

                          {/* Delete Item Button */}
                          <button
                            type="button"
                            onClick={(e) => handleDeleteScheduleItem(e, entry.id)}
                            className="p-1 rounded-lg text-zinc-600 hover:text-rose-400 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete this block"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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

        {/* Right: Priority Tasks Queue */}
        <motion.div variants={itemVariants} initial="hidden" animate="show" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white">Priority Deliverables</h2>
              <span className="text-xs text-zinc-400 font-mono">({priorityTasks.length} active)</span>
            </div>
            <Button 
              size="sm" 
              onClick={() => openQuickAdd('task')}
              className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs rounded-xl gap-1 h-8"
            >
              <Plus className="w-3.5 h-3.5" /> Add Task
            </Button>
          </div>

          <Card className="bg-[#0b0f19]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden min-h-[320px] flex flex-col justify-between">
            <CardContent className="p-4 flex-1 flex flex-col justify-start">
              {priorityTasks.length === 0 ? (
                <div className="text-center py-12 px-4 space-y-2">
                  <p className="text-sm font-bold text-emerald-400">All deliverables clear! 🎉</p>
                  <p className="text-xs text-zinc-500">No active tasks pending right now.</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  <AnimatePresence>
                    {priorityTasks.map(task => (
                      <motion.div 
                        key={task.id} 
                        layout 
                        initial={{ opacity: 0, y: 8 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => handleTaskToggle(task.id, true)}
                          className="w-5 h-5 rounded-lg border border-zinc-700 bg-[#111827] hover:border-blue-500 flex items-center justify-center shrink-0 transition-colors"
                        >
                          {task.status === 'Done' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-white truncate">{task.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-[10px] h-4 text-zinc-400 border-white/10 bg-white/5">
                              {task.category || 'Personal'}
                            </Badge>
                            <span 
                              className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                                task.priority === 'High' 
                                  ? 'border border-rose-500/40 text-rose-300 bg-rose-500/10' 
                                  : 'border border-blue-500/40 text-blue-300 bg-blue-500/10'
                              }`}
                            >
                              {task.priority || 'Medium'}
                            </span>
                            {task.deadline && (
                              <span className="text-[10px] text-zinc-500 font-mono">
                                Due {new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                              </span>
                            )}
                          </div>
                        </div>

                        <Link to="/tasks" className="text-zinc-500 hover:text-white p-1">
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 5. SMART ATTENTION RADAR & INTELLIGENCE ENGINE                            */}
      {/* ========================================================================= */}
      <motion.div variants={itemVariants} initial="hidden" animate="show" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            Smart Attention Radar
          </h2>
          <span className="text-xs text-zinc-400">Real-time alerts across all pillars</span>
        </div>

        <Card className="bg-[#0b0f19]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <CardContent className="p-5">
            {needsAttention.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3 text-emerald-400 shadow-inner">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="text-emerald-400 font-bold text-base">All Radar Systems Optimal! 🎉</h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-md">
                  No overdue deliverables, budget overruns, or study gaps detected. Maintain full execution velocity.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {needsAttention.map((item: any) => {
                  const isCritical = item.urgency === 'critical';
                  const isWarning = item.urgency === 'warning';

                  return (
                    <div 
                      key={item.id} 
                      className={`flex items-center justify-between gap-3 p-4 rounded-2xl border transition-all ${
                        isCritical
                          ? 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                          : isWarning
                          ? 'bg-amber-950/20 border-amber-500/30 text-amber-300'
                          : 'bg-blue-950/20 border-blue-500/30 text-blue-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <AlertTriangle className={`w-4 h-4 shrink-0 ${isCritical ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-blue-400'}`} />
                        <div className="min-w-0">
                          <span className="text-xs font-bold block text-white truncate">{item.title}</span>
                          <span className="text-[11px] text-zinc-400 block truncate mt-0.5">{item.description}</span>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        onClick={() => navigate(item.link)}
                        className={`text-xs h-7 px-3 rounded-xl font-bold shrink-0 ${
                          isCritical
                            ? 'bg-rose-600 hover:bg-rose-500 text-white'
                            : isWarning
                            ? 'bg-amber-600 hover:bg-amber-500 text-white'
                            : 'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                      >
                        {item.actionText || 'Inspect'}
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
