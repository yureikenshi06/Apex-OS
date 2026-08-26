import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkoutLogs, useAddWorkoutLog, useDeleteWorkoutLog } from './hooks';
import { TRAINER_WORKOUT_PLAN } from './trainer-workout-seed';
import { WorkoutLogModal } from './workout-log-modal';
import { 
  Dumbbell, Flame, Plus, Trash2, Calendar as CalendarIcon, 
  Sparkles, RotateCcw, CheckCircle2, ChevronRight, Activity 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

export default function WorkoutLogPage() {
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [modalOpen, setLogModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<any>(null);

  const { data: logs = [], isLoading } = useWorkoutLogs();
  const addLog = useAddWorkoutLog();
  const deleteLog = useDeleteWorkoutLog();

  const filteredLogs = logs.filter(l => !selectedDate || l.date === selectedDate);

  const totalVolumeDay = filteredLogs.reduce((sum, l) => sum + Number(l.volume || (Number(l.weight_kg || 0) * (l.reps || 0) * (l.sets || 1))), 0);
  const totalVolumeAll = logs.reduce((sum, l) => sum + Number(l.volume || (Number(l.weight_kg || 0) * (l.reps || 0) * (l.sets || 1))), 0);
  const prCount = logs.filter(l => l.is_pr).length;

  const handleLoadTrainerPlanForDay = async () => {
    const jsDay = new Date(selectedDate).getDay();
    const targetDay = (jsDay + 6) % 7; // Map JS getDay() to 0=Mon..6=Sun
    const planDay = TRAINER_WORKOUT_PLAN.find(p => p.day_of_week === targetDay);

    if (!planDay || planDay.exercises.length === 0) {
      alert('Selected date is a Rest / Recovery day in your trainer plan!');
      return;
    }

    if (confirm(`Load ${planDay.exercises.length} exercises from "${planDay.focus}" into today's log?`)) {
      for (const ex of planDay.exercises) {
        const repsNum = parseInt(ex.reps.split('-')[0], 10) || 10;
        await addLog.mutateAsync({
          date: selectedDate,
          exercise: ex.name,
          sets: ex.sets,
          reps: repsNum,
          weight_kg: 50,
          volume: ex.sets * repsNum * 50,
          rpe: 8,
          is_pr: false,
          notes: `${ex.muscle_group} | Rest ${ex.rest_sec}s`,
        } as any);
      }
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete logged exercise "${name}"?`)) {
      await deleteLog.mutateAsync(id);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto text-foreground font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-white tracking-tight">Workout Log & PR Tracker</h1>
            <Badge variant="secondary" className="bg-orange-900/50 text-orange-200 border-orange-700/50 font-bold px-2.5">
              Live Sets
            </Badge>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Log your training sets, track weights lifted, and celebrate new Personal Records.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleLoadTrainerPlanForDay}
            className="bg-[#111827] border-white/10 hover:border-orange-500/40 text-orange-300 rounded-xl text-xs h-9 px-3 gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Load from Trainer Plan
          </Button>

          <Button
            onClick={() => {
              setEditingLog(null);
              setLogModalOpen(true);
            }}
            className="bg-orange-600 hover:bg-orange-500 text-white rounded-xl shadow-lg shadow-orange-600/30 gap-1.5 font-bold h-9 text-xs px-4"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" /> Log Exercise Set
          </Button>
        </div>
      </div>

      {/* Date Filter & Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-2xl bg-[#0b0f19]/90 border border-white/10 flex items-center justify-between gap-2">
          <span className="text-xs font-bold text-zinc-400">Date:</span>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-[#111827] border-white/10 text-white rounded-xl h-8 text-xs w-36 font-mono"
          />
        </div>

        <div className="p-3 rounded-2xl bg-[#0b0f19]/90 border border-white/10 flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-400">Day Volume:</span>
          <span className="text-sm font-black text-white font-mono">{totalVolumeDay.toLocaleString()} kg</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#0b0f19]/90 border border-white/10 flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-400">All-Time Volume:</span>
          <span className="text-sm font-black text-orange-400 font-mono">{totalVolumeAll.toLocaleString()} kg</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#0b0f19]/90 border border-white/10 flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-400">PRs Logged:</span>
          <span className="text-sm font-black text-amber-400 font-mono flex items-center gap-1">
            <Flame className="w-4 h-4" /> {prCount} Records
          </span>
        </div>
      </div>

      {/* Logged Exercises Table / Cards */}
      <Card className="bg-[#0b0f19]/90 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-orange-400" />
            Exercises Logged for {selectedDate === todayStr ? 'Today' : selectedDate}
          </h3>
          <span className="text-xs text-zinc-400 font-mono">({filteredLogs.length} items)</span>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-3 bg-[#111827]/40 rounded-2xl border border-white/5">
            <p className="text-sm text-zinc-400">No exercises logged for this date yet.</p>
            <div className="flex justify-center gap-2">
              <Button onClick={handleLoadTrainerPlanForDay} className="bg-orange-600 text-white rounded-xl text-xs">
                Load from Trainer Plan
              </Button>
              <Button onClick={() => setLogModalOpen(true)} variant="outline" className="border-white/10 text-white rounded-xl text-xs">
                Log Manually
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-2xl bg-[#111827]/70 border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/30">
                    <Dumbbell className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{log.exercise}</h4>
                      {log.is_pr && (
                        <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] gap-1 font-bold">
                          <Flame className="w-3 h-3 text-amber-400" /> PR
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono mt-1">
                      <span><strong>{log.sets} sets</strong> × <strong>{log.reps} reps</strong></span>
                      <span>•</span>
                      <span>Weight: <strong className="text-white">{log.weight_kg} kg</strong></span>
                      <span>•</span>
                      <span>Volume: <strong className="text-orange-400">{log.volume || (Number(log.weight_kg) * Number(log.sets) * Number(log.reps))} kg</strong></span>
                      {log.rpe && <span>• RPE {log.rpe}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {log.notes && (
                    <span className="text-[11px] text-zinc-500 italic max-w-xs truncate hidden md:inline">
                      "{log.notes}"
                    </span>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(log.id, log.exercise)}
                    className="p-2 text-zinc-600 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Workout Log Modal */}
      <WorkoutLogModal
        isOpen={modalOpen}
        onClose={() => setLogModalOpen(false)}
      />
    </div>
  );
}
