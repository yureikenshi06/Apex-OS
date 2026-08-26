import React, { useState } from 'react';
import { 
  useBodyMeasurements, 
  useCardioSteps, 
  useSleepLog, 
  useDeleteMeasurement, 
  useDeleteCardio, 
  useDeleteSleep 
} from './hooks';
import { DailyCheckinModal, DailyLogEntry } from './daily-checkin-modal';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Scale, Activity, Moon, Edit3, Trash2, Calendar, 
  Sparkles, Plus, Star, ChevronRight 
} from 'lucide-react';
import { format } from 'date-fns';

export function DailyLogHistory() {
  const { data: measurements = [] } = useBodyMeasurements();
  const { data: cardioLogs = [] } = useCardioSteps();
  const { data: sleepLogs = [] } = useSleepLog();

  const deleteMeasurement = useDeleteMeasurement();
  const deleteCardio = useDeleteCardio();
  const deleteSleep = useDeleteSleep();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DailyLogEntry | null>(null);

  // Group by unique dates
  const dateSet = new Set<string>();
  measurements.forEach(m => m.date && dateSet.add(m.date));
  cardioLogs.forEach(c => c.date && dateSet.add(c.date));
  sleepLogs.forEach(s => s.date && dateSet.add(s.date));

  // If empty, add a sample for today
  const sortedDates = Array.from(dateSet).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const entries: DailyLogEntry[] = sortedDates.map(date => {
    const m = measurements.find(item => item.date === date);
    const c = cardioLogs.find(item => item.date === date);
    const s = sleepLogs.find(item => item.date === date);

    return {
      date,
      weight: m ? Number(m.body_weight_kg) : null,
      measurementId: m?.id,
      steps: c ? Number(c.steps) : null,
      cardioId: c?.id,
      sleepHrs: s ? Number(s.total_sleep_hrs) : null,
      sleepQuality: s?.sleep_quality || null,
      bedtime: s?.bedtime || null,
      wakeTime: s?.wake_time || null,
      restingHr: s?.resting_hr || null,
      sleepId: s?.id,
    };
  });

  const handleEdit = (entry: DailyLogEntry) => {
    setEditingEntry(entry);
    setModalOpen(true);
  };

  const handleDelete = async (entry: DailyLogEntry) => {
    if (confirm(`Delete daily log entry for ${entry.date}?`)) {
      const promises: Promise<any>[] = [];
      if (entry.measurementId) promises.push(deleteMeasurement.mutateAsync(entry.measurementId));
      if (entry.cardioId) promises.push(deleteCardio.mutateAsync(entry.cardioId));
      if (entry.sleepId) promises.push(deleteSleep.mutateAsync(entry.sleepId));
      await Promise.all(promises);
    }
  };

  return (
    <Card className="bg-[#0b0f19]/90 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">Daily Metrics History & Log Editor</h3>
          <Badge variant="outline" className="text-xs text-zinc-400 border-white/10 font-mono">
            {entries.length} Logs
          </Badge>
        </div>

        <Button
          size="sm"
          onClick={() => {
            setEditingEntry(null);
            setModalOpen(true);
          }}
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold h-8 px-3.5 gap-1.5 shadow-lg shadow-emerald-600/30"
        >
          <Plus className="w-3.5 h-3.5" /> Log Entry
        </Button>
      </div>

      {entries.length === 0 ? (
        <div className="p-8 rounded-2xl bg-[#111827]/40 text-center space-y-2 border border-white/5">
          <p className="text-sm text-zinc-400">No daily metric entries logged yet.</p>
          <Button
            size="sm"
            onClick={() => {
              setEditingEntry(null);
              setModalOpen(true);
            }}
            className="bg-emerald-600 text-white rounded-xl text-xs"
          >
            Create First Daily Log
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map(entry => (
            <div
              key={entry.date}
              className="p-3.5 rounded-2xl bg-[#111827]/70 border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group"
            >
              {/* Date & Core Metrics Pill */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 min-w-28">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-xs font-bold text-white font-mono">
                    {format(new Date(entry.date), 'EEE, dd MMM yyyy')}
                  </span>
                </div>

                {/* Body Weight */}
                <div className="flex items-center gap-1.5 bg-[#0b0f19] px-2.5 py-1 rounded-xl border border-white/5 text-xs font-mono">
                  <Scale className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-zinc-400">Weight:</span>
                  <strong className="text-white">
                    {entry.weight !== null ? `${entry.weight} kg` : '—'}
                  </strong>
                </div>

                {/* Steps */}
                <div className="flex items-center gap-1.5 bg-[#0b0f19] px-2.5 py-1 rounded-xl border border-white/5 text-xs font-mono">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-zinc-400">Steps:</span>
                  <strong className="text-white">
                    {entry.steps !== null ? Number(entry.steps).toLocaleString() : '—'}
                  </strong>
                </div>

                {/* Sleep */}
                <div className="flex items-center gap-1.5 bg-[#0b0f19] px-2.5 py-1 rounded-xl border border-white/5 text-xs font-mono">
                  <Moon className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-zinc-400">Sleep:</span>
                  <strong className="text-white">
                    {entry.sleepHrs !== null ? `${entry.sleepHrs} hrs` : '—'}
                  </strong>
                  {entry.sleepQuality && (
                    <span className="text-amber-400 ml-1">★{entry.sleepQuality}</span>
                  )}
                </div>
              </div>

              {/* Action Buttons: Edit (✏️) & Delete (🗑️) */}
              <div className="flex items-center gap-2 self-end md:self-center">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(entry)}
                  className="h-8 px-2.5 text-xs font-bold text-zinc-300 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(entry)}
                  className="h-8 px-2 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl"
                  title="Delete log entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Daily Check-in Modal for Edit/Add */}
      <DailyCheckinModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingEntry(null);
        }}
        initialData={editingEntry}
      />
    </Card>
  );
}
