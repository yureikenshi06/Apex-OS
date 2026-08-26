import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useWeeklyReview, useUpsertWeeklyReview } from './hooks';

export default function WeeklyReviewPage() {
  const [week, setWeek] = useState(format(new Date(), 'yyyy-MM-dd'));
  const { data: review, isLoading } = useWeeklyReview(week);
  const upsertMutation = useUpsertWeeklyReview();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const went_well = String(formData.get('went_well') || '');
    const needs_improvement = String(formData.get('needs_improvement') || '');
    const prioritiesRaw = String(formData.get('priorities') || '');
    const top_priorities = prioritiesRaw.split('\n').map(s => s.trim()).filter(Boolean);

    upsertMutation.mutate({
      week_of: week,
      review_data: {
        went_well,
        needs_improvement,
      },
      top_priorities,
    });
  };

  const wentWellVal = review?.review_data?.went_well || '';
  const needsImprovementVal = review?.review_data?.needs_improvement || '';
  const prioritiesVal = review?.top_priorities?.join('\n') || '';

  return (
    <div className="p-6 max-w-4xl mx-auto text-foreground">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Weekly Review</h1>
        <input 
          type="date" 
          value={week} 
          onChange={(e) => setWeek(e.target.value)}
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
            <div>
              <label className="block text-sm text-muted-foreground mb-2">What went well?</label>
              <textarea 
                name="went_well"
                defaultValue={wentWellVal}
                rows={4}
                className="w-full bg-secondary/50 border border-border rounded-lg p-3 text-foreground focus:border-primary outline-none"
                placeholder="Reflect on your wins..."
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">What needs improvement?</label>
              <textarea 
                name="needs_improvement"
                defaultValue={needsImprovementVal}
                rows={4}
                className="w-full bg-secondary/50 border border-border rounded-lg p-3 text-foreground focus:border-primary outline-none"
                placeholder="Where did you fall short?"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Top priorities for next week</label>
              <textarea 
                name="priorities"
                defaultValue={prioritiesVal}
                rows={4}
                className="w-full bg-secondary/50 border border-border rounded-lg p-3 text-foreground focus:border-primary outline-none"
                placeholder="1. Priority one&#10;2. Priority two&#10;3. Priority three"
              />
            </div>
            
            <div className="flex justify-end pt-4">
              <button 
                type="submit" 
                disabled={upsertMutation.isPending}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
              >
                {upsertMutation.isPending ? 'Saving...' : 'Save Review'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
