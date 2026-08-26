import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePopulateTrainerWorkoutPlan, useWorkoutPlan } from './hooks';
import { TRAINER_WORKOUT_PLAN } from './trainer-workout-seed';
import { useExerciseCompletion } from './exercise-completion-store';
import { 
  Dumbbell, Flame, CheckCircle2, RotateCcw, Plus, 
  Sparkles, Clock, Heart, ArrowLeft, ShieldCheck, ChevronRight, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export default function WorkoutPage() {
  const navigate = useNavigate();
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const { completedMap, toggleExercise } = useExerciseCompletion();

  const populateMutation = usePopulateTrainerWorkoutPlan();
  const currentPlanDay = TRAINER_WORKOUT_PLAN[activeDayIdx] || TRAINER_WORKOUT_PLAN[0];

  const handlePopulatePlan = async () => {
    if (confirm('Load 6-Day Workout Plan into your active routine?')) {
      await populateMutation.mutateAsync();
    }
  };

  const completedCount = currentPlanDay.exercises.filter(ex => completedMap[ex.name]).length;
  const totalExercises = currentPlanDay.exercises.length;

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
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-white tracking-tight">Trainer Workout Routine</h1>
            <Badge variant="secondary" className="bg-orange-900/50 text-orange-200 border-orange-700/50 font-bold px-2.5">
              6-Day Split
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePopulatePlan}
            disabled={populateMutation.isPending}
            className="bg-[#111827] border-white/10 hover:border-orange-500/40 text-orange-300 rounded-xl text-xs h-9 px-3 gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Sync Plan
          </Button>
        </div>
      </div>

      {/* Trainer Principles Pill */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#0b0f19]/80 border border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Progressive Overload</span>
            <span className="text-[10px] text-zinc-400 block">+2.5 kg once rep target hit for 2 sessions</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0b0f19]/80 border border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">RPE 7–8 Intensity</span>
            <span className="text-[10px] text-zinc-400 block">2–3 reps in reserve on compound lifts</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0b0f19]/80 border border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Sunday Only Off</span>
            <span className="text-[10px] text-zinc-400 block">6 days training • Sleep 7.5+ hrs</span>
          </div>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-[#111827] rounded-2xl border border-white/10">
        {TRAINER_WORKOUT_PLAN.map((d, idx) => (
          <button
            key={d.day_name}
            onClick={() => setActiveDayIdx(idx)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
              activeDayIdx === idx
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30 ring-2 ring-white/20'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{d.day_name}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/15 font-mono">
              {d.exercises.length > 0 ? `${d.exercises.length} lifts` : 'Rest'}
            </span>
          </button>
        ))}
      </div>

      {/* Active Day Detail Card */}
      <Card className="bg-[#0b0f19]/90 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white">{currentPlanDay.day_name}</h2>
              <Badge className="bg-orange-600/20 text-orange-300 border border-orange-500/40 text-xs font-semibold">
                {currentPlanDay.focus}
              </Badge>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Warmup: <span className="text-zinc-300">{currentPlanDay.warmup}</span>
            </p>
          </div>

          {totalExercises > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-zinc-400">
                Completed: <strong className="text-emerald-400">{completedCount}/{totalExercises}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Exercises List / Rest Day Card */}
        {currentPlanDay.exercises.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-2 bg-[#111827]/40 rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Sunday Rest & Recovery</h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Optional 20–30 min easy walk or mobility. Prioritize sleep and hydration.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentPlanDay.exercises.map((ex, idx) => {
                const isDone = Boolean(completedMap[ex.name]);

                return (
                  <div
                    key={ex.name}
                    onClick={() => toggleExercise(ex.name)}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer group select-none ${
                      isDone
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-zinc-400'
                        : 'bg-[#111827]/70 border-white/5 hover:border-orange-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
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
                        <h4 className={`text-sm font-bold truncate transition-colors ${
                          isDone ? 'line-through text-zinc-400' : 'text-white group-hover:text-orange-300'
                        }`}>
                          {idx + 1}. {ex.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-[10px] border-white/10 text-zinc-400 bg-white/5">
                            {ex.muscle_group}
                          </Badge>
                          <span className="text-[11px] text-zinc-400 font-mono font-semibold">
                            {ex.sets} sets × {ex.reps}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono">
                            (Rest {ex.rest_sec}s)
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className={`text-xs font-bold px-2 py-1 rounded-lg shrink-0 ${
                      isDone ? 'text-emerald-400 bg-emerald-500/10' : 'text-zinc-500 group-hover:text-white'
                    }`}>
                      {isDone ? 'Done ✓' : 'Mark Done'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Cardio & Cooldown Footer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              {currentPlanDay.cardio && (
                <div className="p-3.5 rounded-2xl bg-blue-950/20 border border-blue-500/30 text-xs">
                  <span className="font-bold text-blue-300 block mb-0.5">⚡ Cardio:</span>
                  <span className="text-zinc-300">{currentPlanDay.cardio}</span>
                </div>
              )}
              {currentPlanDay.cooldown && (
                <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs">
                  <span className="font-bold text-emerald-300 block mb-0.5">🌿 Cooldown:</span>
                  <span className="text-zinc-300">{currentPlanDay.cooldown}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
