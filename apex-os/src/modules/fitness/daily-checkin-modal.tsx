import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  useAddMeasurement, useUpdateMeasurement,
  useAddCardio, useUpdateCardio,
  useAddSleep, useUpdateSleep
} from './hooks';
import { Scale, Activity, Moon, Sparkles, Star } from 'lucide-react';
import { format } from 'date-fns';

export interface DailyLogEntry {
  id?: string;
  date: string;
  weight?: number | null;
  measurementId?: string;
  steps?: number | null;
  cardioId?: string;
  sleepHrs?: number | null;
  sleepQuality?: number | null;
  bedtime?: string | null;
  wakeTime?: string | null;
  restingHr?: number | null;
  sleepId?: string;
}

interface DailyCheckinModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: DailyLogEntry | null;
}

export function DailyCheckinModal({ isOpen, onClose, initialData }: DailyCheckinModalProps) {
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const [date, setDate] = useState(todayStr);
  const [weight, setWeight] = useState('81.5');
  const [steps, setSteps] = useState('8500');
  const [sleepHrs, setSleepHrs] = useState('7.5');
  const [sleepQuality, setSleepQuality] = useState<number>(4);
  const [bedtime, setBedtime] = useState('22:30');
  const [wakeTime, setWakeTime] = useState('06:00');
  const [restingHr, setRestingHr] = useState('62');

  const addMeasurement = useAddMeasurement();
  const updateMeasurement = useUpdateMeasurement();
  const addCardio = useAddCardio();
  const updateCardio = useUpdateCardio();
  const addSleep = useAddSleep();
  const updateSleep = useUpdateSleep();

  useEffect(() => {
    if (initialData) {
      setDate(initialData.date || todayStr);
      setWeight(initialData.weight !== undefined && initialData.weight !== null ? String(initialData.weight) : '');
      setSteps(initialData.steps !== undefined && initialData.steps !== null ? String(initialData.steps) : '');
      setSleepHrs(initialData.sleepHrs !== undefined && initialData.sleepHrs !== null ? String(initialData.sleepHrs) : '');
      setSleepQuality(initialData.sleepQuality || 4);
      setBedtime(initialData.bedtime || '22:30');
      setWakeTime(initialData.wakeTime || '06:00');
      setRestingHr(initialData.restingHr ? String(initialData.restingHr) : '');
    } else {
      setDate(todayStr);
      setWeight('81.5');
      setSteps('8500');
      setSleepHrs('7.5');
      setSleepQuality(4);
      setBedtime('22:30');
      setWakeTime('06:00');
      setRestingHr('62');
    }
  }, [initialData, isOpen, todayStr]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const promises: Promise<any>[] = [];

    // Save/Update Weight
    if (weight) {
      const weightVal = parseFloat(weight);
      if (initialData?.measurementId) {
        promises.push(
          updateMeasurement.mutateAsync({
            id: initialData.measurementId,
            data: { date, body_weight_kg: weightVal }
          })
        );
      } else {
        promises.push(
          addMeasurement.mutateAsync({
            date,
            body_weight_kg: weightVal,
          } as any)
        );
      }
    }

    // Save/Update Steps
    if (steps) {
      const stepsVal = parseInt(steps, 10);
      if (initialData?.cardioId) {
        promises.push(
          updateCardio.mutateAsync({
            id: initialData.cardioId,
            data: { date, steps: stepsVal }
          })
        );
      } else {
        promises.push(
          addCardio.mutateAsync({
            date,
            steps: stepsVal,
            cardio_type: 'Daily Walking',
            duration_min: 60,
          } as any)
        );
      }
    }

    // Save/Update Sleep
    if (sleepHrs) {
      const sleepVal = parseFloat(sleepHrs);
      if (initialData?.sleepId) {
        promises.push(
          updateSleep.mutateAsync({
            id: initialData.sleepId,
            data: {
              date,
              total_sleep_hrs: sleepVal,
              sleep_quality: sleepQuality,
              bedtime,
              wake_time: wakeTime,
              resting_hr: restingHr ? parseInt(restingHr, 10) : undefined,
            }
          })
        );
      } else {
        promises.push(
          addSleep.mutateAsync({
            date,
            total_sleep_hrs: sleepVal,
            sleep_quality: sleepQuality,
            bedtime,
            wake_time: wakeTime,
            resting_hr: restingHr ? parseInt(restingHr, 10) : undefined,
          } as any)
        );
      }
    }

    await Promise.all(promises);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#0b0f19] border-emerald-500/30 text-white rounded-3xl shadow-2xl p-6">
        <DialogHeader className="pb-2 border-b border-white/10">
          <DialogTitle className="text-xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            {initialData ? 'Edit Daily Metrics' : 'Log Daily Metrics'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4 py-2">
          {/* Date Picker */}
          <div className="space-y-1">
            <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-[#111827] border-white/10 text-white rounded-xl h-9 text-xs font-mono"
              required
            />
          </div>

          {/* Body Weight (kg) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-orange-400" /> Body Weight (kg)
              </Label>
              <span className="text-[11px] text-zinc-400 font-mono">Goal: 75.0 kg</span>
            </div>
            <div className="relative">
              <Input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 81.5"
                className="bg-[#111827] border-white/10 text-white rounded-xl h-9 text-sm pl-3 pr-10 font-mono"
              />
              <span className="absolute right-3 top-2 text-xs text-zinc-500 font-mono">kg</span>
            </div>
          </div>

          {/* Daily Steps */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" /> Steps Logged
              </Label>
              <span className="text-[11px] text-zinc-400 font-mono">Target: 8,000</span>
            </div>
            <div className="relative">
              <Input
                type="number"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="e.g. 8500"
                className="bg-[#111827] border-white/10 text-white rounded-xl h-9 text-sm pl-3 pr-14 font-mono"
              />
              <span className="absolute right-3 top-2 text-xs text-zinc-500 font-mono">steps</span>
            </div>
          </div>

          {/* Sleep & Quality */}
          <div className="space-y-2 p-3 bg-[#111827]/70 rounded-2xl border border-white/5">
            <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-blue-400" /> Sleep Duration & Quality
            </Label>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] text-zinc-400 block mb-0.5">Total Sleep (hrs)</span>
                <Input
                  type="number"
                  step="0.5"
                  value={sleepHrs}
                  onChange={(e) => setSleepHrs(e.target.value)}
                  className="bg-[#0b0f19] border-white/10 text-white rounded-lg h-8 text-xs font-mono"
                />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block mb-0.5">Bedtime</span>
                <Input
                  type="time"
                  value={bedtime}
                  onChange={(e) => setBedtime(e.target.value)}
                  className="bg-[#0b0f19] border-white/10 text-white rounded-lg h-8 text-xs font-mono p-1"
                />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block mb-0.5">Wake Time</span>
                <Input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="bg-[#0b0f19] border-white/10 text-white rounded-lg h-8 text-xs font-mono p-1"
                />
              </div>
            </div>

            {/* Quality Stars */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-zinc-400">Sleep Quality Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSleepQuality(star)}
                    className="p-0.5 transition-transform hover:scale-125"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        star <= sleepQuality
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-zinc-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
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
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-9 px-6 rounded-xl shadow-lg shadow-emerald-600/30"
            >
              {initialData ? 'Update Entry' : 'Save Metrics'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
