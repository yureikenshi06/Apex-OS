import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { useDailyPlanner, useGenerateFromTemplate, useUpdatePlannerEntry, useAddPlannerEntry, useDeletePlannerEntry } from './hooks';
import { Plus, Sparkles, CheckCircle2, Clock, Zap, AlertCircle, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CATEGORIES = ['CFA', 'Placement', 'Academic', 'Fitness', 'Reading', 'Personal Brand', 'Class', 'Meal', 'Travel', 'Personal Care'];
const PRIORITIES = ['P0', 'P1', 'P2', 'P3'];

export default function DailyPlannerPage() {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const { data: entries = [], isLoading } = useDailyPlanner(date);
  const generateMutation = useGenerateFromTemplate();
  const updateMutation = useUpdatePlannerEntry();
  const addMutation = useAddPlannerEntry();
  const deleteMutation = useDeletePlannerEntry();

  const [modalOpen, setModalOpen] = useState(false);
  const [newActivity, setNewActivity] = useState('');
  const [newCategory, setNewCategory] = useState('CFA');
  const [newPriority, setNewPriority] = useState('P1');
  const [newStartTime, setNewStartTime] = useState('09:00');
  const [newEndTime, setNewEndTime] = useState('10:30');
  const [newEnergy, setNewEnergy] = useState(4);

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.trim()) return;

    await addMutation.mutateAsync({
      date,
      planned_activity: newActivity,
      category: newCategory,
      priority: newPriority,
      start_time: newStartTime,
      end_time: newEndTime,
      energy_level: newEnergy,
      completion_status: 'In Progress',
      planned_duration_min: 90,
    });
    setNewActivity('');
    setModalOpen(false);
  };

  const completedCount = entries.filter((e: any) => e.completion_status === 'Completed').length;
  const totalCount = entries.length;
  const completionPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Daily Planner</h1>
            <Badge variant="secondary" className="bg-purple-900/50 text-purple-200 border-purple-700/50 font-semibold px-2.5">
              Execution Log
            </Badge>
          </div>
          <p className="text-sm text-zinc-400 mt-1">
            Track planned vs. actual execution and energy ratings for each activity block.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-auto bg-[#111118] border-white/10 text-white rounded-xl focus-visible:ring-indigo-500 font-medium"
          />
          <Button 
            onClick={() => setModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 gap-1.5 font-semibold"
          >
            <Plus className="w-4 h-4" /> Add Activity
          </Button>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#111118]/80 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
          <span className="text-xs text-zinc-400 font-semibold uppercase">Total Scheduled</span>
          <p className="text-2xl font-black text-white mt-1">{totalCount} blocks</p>
        </div>
        <div className="bg-[#111118]/80 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
          <span className="text-xs text-zinc-400 font-semibold uppercase">Completed</span>
          <p className="text-2xl font-black text-emerald-400 mt-1">{completedCount} blocks</p>
        </div>
        <div className="bg-[#111118]/80 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
          <span className="text-xs text-zinc-400 font-semibold uppercase">Execution Rate</span>
          <p className="text-2xl font-black text-indigo-400 mt-1">{completionPct}%</p>
        </div>
        <div className="bg-[#111118]/80 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">
          <span className="text-xs text-zinc-400 font-semibold uppercase">Energy Average</span>
          <p className="text-2xl font-black text-amber-400 mt-1">⚡ 4.2 / 5</p>
        </div>
      </div>

      {/* Main Table / List */}
      <div className="bg-[#111118]/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="p-8 space-y-3">
            <div className="h-14 bg-white/5 animate-pulse rounded-xl" />
            <div className="h-14 bg-white/5 animate-pulse rounded-xl" />
            <div className="h-14 bg-white/5 animate-pulse rounded-xl" />
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-16 px-6 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto shadow-inner">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white">No schedule planned for {date}</h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto">
              You can populate today's schedule from your Master Timetable with one click, or add custom blocks manually.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                onClick={() => generateMutation.mutate(date)}
                disabled={generateMutation.isPending}
                className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 gap-2 font-medium"
              >
                <Sparkles className="w-4 h-4" />
                {generateMutation.isPending ? 'Generating...' : 'Generate from Master Timetable'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setModalOpen(true)}
                className="border-white/10 text-white hover:bg-white/10 rounded-xl"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Add Manually
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/5 text-zinc-400 border-b border-white/10 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-5 py-4">Time</th>
                  <th className="px-5 py-4">Planned Activity</th>
                  <th className="px-5 py-4">Actual Execution</th>
                  <th className="px-5 py-4">Category / Priority</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {entries.map((entry: any) => {
                  const isCompleted = entry.completion_status === 'Completed';
                  return (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`hover:bg-white/[0.02] transition-colors ${
                        isCompleted ? 'bg-emerald-950/10' : ''
                      }`}
                    >
                      <td className="px-5 py-4 font-mono text-xs text-zinc-400 shrink-0">
                        {entry.start_time?.slice(0, 5)} - {entry.end_time?.slice(0, 5)}
                      </td>
                      
                      <td className="px-5 py-4 font-semibold text-white">
                        <span className={isCompleted ? 'line-through text-zinc-400' : ''}>
                          {entry.planned_activity}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <input
                          type="text"
                          defaultValue={entry.actual_activity || ''}
                          placeholder="What did you actually do?"
                          onBlur={(e) => updateMutation.mutate({ id: entry.id, updates: { actual_activity: e.target.value } })}
                          className="bg-transparent border-b border-transparent hover:border-white/20 focus:border-indigo-500 outline-none text-zinc-200 text-xs w-full transition-colors py-1"
                        />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <Badge variant="outline" className="text-[10px] bg-white/5 border-white/10 text-zinc-300">
                            {entry.category || 'General'}
                          </Badge>
                          <Badge variant="outline" className="text-[10px] bg-indigo-500/10 border-indigo-500/30 text-indigo-300">
                            {entry.priority || 'P1'}
                          </Badge>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <select
                          value={entry.completion_status || 'In Progress'}
                          onChange={(e) => updateMutation.mutate({ id: entry.id, updates: { completion_status: e.target.value } })}
                          className="bg-[#181824] border border-white/10 text-white text-xs rounded-lg px-2.5 py-1.5 outline-none cursor-pointer focus:border-indigo-500"
                        >
                          <option value="Completed">Completed ✓</option>
                          <option value="In Progress">In Progress ⏳</option>
                          <option value="Missed">Missed ✗</option>
                          <option value="Rescheduled">Rescheduled ↺</option>
                        </select>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => deleteMutation.mutate(entry.id)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Planner Entry Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md bg-[#111118] border-white/10 text-white rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Add Planner Entry</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddEntry} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-semibold uppercase">Planned Activity</Label>
              <Input
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                placeholder="e.g. Quantitative Methods Reading 3"
                required
                className="bg-[#1a1a24] border-white/10 text-white rounded-xl focus-visible:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-semibold uppercase">Start Time</Label>
                <Input
                  type="time"
                  value={newStartTime}
                  onChange={(e) => setNewStartTime(e.target.value)}
                  className="bg-[#1a1a24] border-white/10 text-white rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-semibold uppercase">End Time</Label>
                <Input
                  type="time"
                  value={newEndTime}
                  onChange={(e) => setNewEndTime(e.target.value)}
                  className="bg-[#1a1a24] border-white/10 text-white rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-semibold uppercase">Category</Label>
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger className="bg-[#1a1a24] border-white/10 text-white rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#181824] border-white/10 text-white">
                    {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-semibold uppercase">Priority</Label>
                <Select value={newPriority} onValueChange={setNewPriority}>
                  <SelectTrigger className="bg-[#1a1a24] border-white/10 text-white rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#181824] border-white/10 text-white">
                    {PRIORITIES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-white rounded-xl">
                Cancel
              </Button>
              <Button type="submit" disabled={addMutation.isPending} className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold px-5 shadow-lg shadow-indigo-600/30">
                {addMutation.isPending ? 'Adding...' : 'Add Activity'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
