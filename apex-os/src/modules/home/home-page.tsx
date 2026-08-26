import React from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useHomeStats, useDailyScore, useNeedsAttention } from './hooks';
import { useTasks, useUpdateTask } from '../tasks/hooks';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/shared/stat-card';
import { EmptyState } from '@/components/shared/empty-state';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, Clock, AlertTriangle, Check, Activity } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function HomePage() {
  const { user } = useAuth();
  const today = format(new Date(), 'yyyy-MM-dd');
  const displayDate = format(new Date(), 'EEEE, d MMMM yyyy');

  const { cfaHours, monthlySpend, fitnessHabits, tasksDue } = useHomeStats();
  const { data: dailyScore = 0 } = useDailyScore(today);
  const { data: needsAttention = [] } = useNeedsAttention();
  
  const { data: tasks = [] } = useTasks();
  const todayTasks = tasks.filter(t => t.deadline === today && t.status !== 'Done');
  
  const updateTask = useUpdateTask();

  const handleTaskToggle = (id: string, isDone: boolean) => {
    updateTask.mutate({ id, updates: { status: isDone ? 'Done' : 'To Do' } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto text-foreground">
      {/* Top Section */}
      <motion.div className="flex flex-col md:flex-row md:items-center justify-between gap-6" variants={containerVariants} initial="hidden" animate="show">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Good day, {user?.email?.split('@')[0] || 'Prakhar'}</h1>
          <p className="text-muted-foreground mt-1">{displayDate}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary" className="bg-indigo-900/50 text-indigo-200 border-indigo-700/50">🔥 12 Day Workout Streak</Badge>
            <Badge variant="secondary" className="bg-emerald-900/50 text-emerald-200 border-emerald-700/50">🔥 5 Day Habit Streak</Badge>
            <Badge variant="secondary" className="bg-blue-900/50 text-blue-200 border-blue-700/50">🔥 8 Day CFA Streak</Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-card p-4 rounded-2xl border border-border/50 shadow-lg">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" className="fill-none stroke-secondary" strokeWidth="8" />
              <circle 
                cx="50" cy="50" r="45" 
                className="fill-none stroke-primary" 
                strokeWidth="8" 
                strokeDasharray="282.7" 
                strokeDashoffset={282.7 - (282.7 * (dailyScore || 0)) / 100}
                strokeLinecap="round" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{Math.round(dailyScore)}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Score</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-foreground">Daily Score</h3>
            <p className="text-sm text-muted-foreground">Weighted completion rate</p>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards Row */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" variants={containerVariants} initial="hidden" animate="show">
        <StatCard 
          title="CFA Hours This Week" 
          value={cfaHours.value} 
          format="hours"
          changeLabel={`Target: ${cfaHours.target}h`} 
          icon={Clock} 
        />
        <StatCard 
          title="Monthly Spend" 
          value={monthlySpend.value} 
          format="currency" 
          prefix="₹"
          changeLabel={`Budget: ₹${monthlySpend.budget.toLocaleString('en-IN')}`} 
          icon={Activity} 
        />
        <StatCard 
          title="Fitness Habits" 
          value={fitnessHabits.total > 0 ? (fitnessHabits.completed / fitnessHabits.total) * 100 : 0} 
          format="percent" 
          changeLabel={`${fitnessHabits.completed}/${fitnessHabits.total} completed`} 
          icon={CheckCircle2} 
        />
        <StatCard 
          title="Tasks Due" 
          value={tasksDue.today} 
          format="number" 
          changeLabel={`${tasksDue.overdue} overdue`} 
          icon={AlertTriangle} 
        />
      </motion.div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} initial="hidden" animate="show">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Today's Schedule</h2>
          <Card className="border-border/50">
            <CardContent className="p-4">
              <EmptyState title="No schedule planned" description="You haven't set up your planner for today yet." />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} initial="hidden" animate="show">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Today's Tasks</h2>
          <Card className="border-border/50">
            <CardContent className="p-4">
              {todayTasks.length === 0 ? (
                <EmptyState title="All done!" description="No tasks due today." />
              ) : (
                <div className="space-y-3">
                  <AnimatePresence>
                    {todayTasks.map(task => (
                      <motion.div 
                        key={task.id} 
                        layout 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <Checkbox 
                          checked={task.status === 'Done'} 
                          onCheckedChange={(checked) => handleTaskToggle(task.id, Boolean(checked))} 
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">{task.title}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-[10px] h-4 text-muted-foreground border-border">{task.category}</Badge>
                            <Badge variant="outline" className="text-[10px] h-4 border-red-900/50 text-red-400">{task.priority}</Badge>
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

      {/* Bottom Section */}
      <motion.div variants={itemVariants} initial="hidden" animate="show">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Needs Attention</h2>
        <Card className="border-border/50">
          <CardContent className="p-4">
            {needsAttention.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3">
                  <Check className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-emerald-400 font-medium">All caught up! 🎉</h3>
                <p className="text-sm text-muted-foreground">Everything is running smoothly.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {needsAttention.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                    <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
                    <span className="text-destructive-foreground text-sm">{item.title}</span>
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
