import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAddWorkoutLog } from './hooks';
import { Dumbbell, Plus, Trash2, CheckCircle2, Flame } from 'lucide-react';
import { format } from 'date-fns';

interface WorkoutLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultExercise?: string;
  defaultMuscleGroup?: string;
  defaultSets?: number;
  defaultReps?: number;
}

const MUSCLE_GROUPS = [
  'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 
  'Quads', 'Hamstrings', 'Glutes', 'Calves', 'Core', 'Full Body'
];

export function WorkoutLogModal({
  isOpen,
  onClose,
  defaultExercise = '',
  defaultMuscleGroup = 'Chest',
  defaultSets = 3,
  defaultReps = 10,
}: WorkoutLogModalProps) {
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const [date, setDate] = useState(todayStr);
  const [exercise, setExercise] = useState(defaultExercise);
  const [muscleGroup, setMuscleGroup] = useState(defaultMuscleGroup);
  const [sets, setSets] = useState(defaultSets.toString());
  const [reps, setReps] = useState(defaultReps.toString());
  const [weightKg, setWeightKg] = useState('60');
  const [rpe, setRpe] = useState('8');
  const [isPr, setIsPr] = useState(false);
  const [notes, setNotes] = useState('');

  const addMutation = useAddWorkoutLog();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exercise.trim()) return;

    const s = parseInt(sets, 10) || 1;
    const r = parseInt(reps, 10) || 1;
    const w = parseFloat(weightKg) || 0;
    const totalVolume = s * r * w;

    await addMutation.mutateAsync({
      date,
      exercise: exercise.trim(),
      sets: s,
      reps: r,
      weight_kg: w,
      volume: totalVolume,
      rpe: parseInt(rpe, 10) || 8,
      is_pr: isPr,
      notes: notes.trim() || undefined,
    } as any);

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#0b0f19] border-orange-500/30 text-white rounded-3xl shadow-2xl p-6">
        <DialogHeader className="pb-2 border-b border-white/10">
          <DialogTitle className="text-xl font-black text-white flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-orange-400" />
            Log Exercise Set
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4 py-2">
          {/* Date & Muscle Group */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-[#111827] border-white/10 text-white rounded-xl h-9 text-xs"
                required
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Muscle Group</Label>
              <Select value={muscleGroup} onValueChange={setMuscleGroup}>
                <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl h-9 text-xs">
                  <SelectValue placeholder="Target" />
                </SelectTrigger>
                <SelectContent className="bg-[#111827] border-white/10 text-white">
                  {MUSCLE_GROUPS.map((mg) => (
                    <SelectItem key={mg} value={mg}>{mg}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Exercise Name */}
          <div className="space-y-1">
            <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Exercise Name</Label>
            <Input
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              placeholder="e.g. Barbell Bench Press, Squat..."
              className="bg-[#111827] border-white/10 text-white rounded-xl h-9 text-sm"
              required
              autoFocus
            />
          </div>

          {/* Sets, Reps, Weight */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Sets</Label>
              <Input
                type="number"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="bg-[#111827] border-white/10 text-white rounded-xl h-9 text-sm font-mono text-center"
                required
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Reps</Label>
              <Input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="bg-[#111827] border-white/10 text-white rounded-xl h-9 text-sm font-mono text-center"
                required
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Weight (kg)</Label>
              <Input
                type="number"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="bg-[#111827] border-white/10 text-white rounded-xl h-9 text-sm font-mono text-center"
                required
              />
            </div>
          </div>

          {/* RPE & PR Checkbox */}
          <div className="flex items-center justify-between p-3 bg-[#111827]/70 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2">
              <Label className="text-xs text-zinc-300 font-bold">RPE (1-10):</Label>
              <Input
                type="number"
                min="1"
                max="10"
                value={rpe}
                onChange={(e) => setRpe(e.target.value)}
                className="bg-[#0b0f19] border-white/10 text-white rounded-lg h-7 w-12 text-center text-xs font-mono"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-amber-300 select-none">
              <input
                type="checkbox"
                checked={isPr}
                onChange={(e) => setIsPr(e.target.checked)}
                className="rounded border-amber-500 bg-[#0b0f19] text-amber-500 w-4 h-4"
              />
              <Flame className="w-3.5 h-3.5 text-amber-400" /> New PR (Personal Record)
            </label>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Notes / Form Cue</Label>
            <Input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Clean pause reps at chest, increase 2.5kg next session"
              className="bg-[#111827] border-white/10 text-white rounded-xl h-8 text-xs placeholder:text-zinc-500"
            />
          </div>

          {/* Modal Footer */}
          <DialogFooter className="pt-3 border-t border-white/10 flex justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-zinc-400 hover:text-white text-xs h-9 px-4 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs h-9 px-6 rounded-xl shadow-lg shadow-orange-600/30"
            >
              Log Set
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
