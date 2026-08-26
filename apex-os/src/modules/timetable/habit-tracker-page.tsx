import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useHabitTracker, useUpsertHabitTracker } from './hooks';
import { useAuth } from '@/hooks/use-auth';

export default function HabitTrackerPage() {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const { user } = useAuth();
  const { data: habitData, isLoading } = useHabitTracker(date);
  const upsertMutation = useUpsertHabitTracker();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const payload = {
      owner_id: user?.id,
      date,
      wake_time: formData.get('wake_time'),
      sleep_time: formData.get('sleep_time'),
      gym: formData.get('gym') === 'on',
      reading_min: Number(formData.get('reading_min')),
      cfa_hours: Number(formData.get('cfa_hours')),
      placement_hours: Number(formData.get('placement_hours')),
      academic_hours: Number(formData.get('academic_hours')),
    };
    upsertMutation.mutate(payload);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-foreground">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
          className="bg-card border border-border/50 rounded-lg px-3 py-2 text-foreground"
        />
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card p-6 rounded-2xl border border-border/50 shadow-lg"
      >
        {isLoading ? (
          <div className="animate-pulse h-64 bg-secondary/50 rounded-xl"></div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Wake Time</label>
                <input name="wake_time" type="time" defaultValue={habitData?.wake_time || '06:00'} className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-foreground" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Sleep Time</label>
                <input name="sleep_time" type="time" defaultValue={habitData?.sleep_time || '23:00'} className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-foreground" />
              </div>
              <div className="flex items-center space-x-3">
                <input name="gym" type="checkbox" defaultChecked={Boolean(habitData?.gym)} className="w-5 h-5 rounded border-border bg-secondary text-primary focus:ring-ring" />
                <label className="text-sm font-medium">Gym Session</label>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Reading (mins)</label>
                <input name="reading_min" type="number" defaultValue={habitData?.reading_min || 0} className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-foreground" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">CFA Hours</label>
                <input name="cfa_hours" type="number" step="0.5" defaultValue={habitData?.cfa_hours || 0} className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-foreground" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Placement Hours</label>
                <input name="placement_hours" type="number" step="0.5" defaultValue={habitData?.placement_hours || 0} className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-foreground" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Academic Hours</label>
                <input name="academic_hours" type="number" step="0.5" defaultValue={habitData?.academic_hours || 0} className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-foreground" />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button 
                type="submit" 
                disabled={upsertMutation.isPending}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
              >
                {upsertMutation.isPending ? 'Saving...' : 'Save Habits'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
