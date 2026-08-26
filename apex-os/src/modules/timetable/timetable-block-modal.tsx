import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAddTimetableBlock, useUpdateTimetableBlock, useDeleteTimetableBlock } from './hooks';
import { useTimetableTags } from './timetable-tag-store';
import { TimetableTagManagerModal } from './timetable-tag-manager-modal';
import type { TimetableBlock } from '@/api/types';
import { 
  Calendar as CalendarIcon, Clock, Trash2, Tag, 
  Settings, Check, Sparkles, Plus 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TimetableBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBlock?: TimetableBlock | null;
  defaultDay?: number;
  defaultHour?: number;
}

const CATEGORIES = [
  { name: 'CFA', color: '#6366f1' },
  { name: 'Placement', color: '#8b5cf6' },
  { name: 'Academic', color: '#06b6d4' },
  { name: 'Fitness', color: '#10b981' },
  { name: 'Reading', color: '#f59e0b' },
  { name: 'Personal Brand', color: '#ec4899' },
  { name: 'Class', color: '#3b82f6' },
  { name: 'Meal', color: '#64748b' },
  { name: 'Travel', color: '#475569' },
  { name: 'Personal Care', color: '#64748b' },
];

const DAYS = [
  { id: 0, label: 'Mon', full: 'Monday' },
  { id: 1, label: 'Tue', full: 'Tuesday' },
  { id: 2, label: 'Wed', full: 'Wednesday' },
  { id: 3, label: 'Thu', full: 'Thursday' },
  { id: 4, label: 'Fri', full: 'Friday' },
  { id: 5, label: 'Sat', full: 'Saturday' },
  { id: 6, label: 'Sun', full: 'Sunday' },
];

const COLOR_PRESETS = [
  '#6366f1', '#3b82f6', '#8b5cf6', '#06b6d4',
  '#10b981', '#f59e0b', '#ec4899', '#f43f5e',
  '#64748b', '#475569', '#1e293b'
];

export function TimetableBlockModal({
  isOpen,
  onClose,
  initialBlock,
  defaultDay = 0,
  defaultHour = 9,
}: TimetableBlockModalProps) {
  const [dayOfWeek, setDayOfWeek] = useState<number>(defaultDay);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:30');
  const [activity, setActivity] = useState('');
  const [category, setCategory] = useState('CFA');
  const [color, setColor] = useState('#6366f1');
  const [selectedTag, setSelectedTag] = useState<string>('Deep Work');
  const [tagManagerOpen, setTagManagerOpen] = useState(false);

  const { tags } = useTimetableTags();
  const addMutation = useAddTimetableBlock();
  const updateMutation = useUpdateTimetableBlock();
  const deleteMutation = useDeleteTimetableBlock();

  useEffect(() => {
    if (initialBlock) {
      setDayOfWeek(initialBlock.day_of_week ?? defaultDay);
      setStartTime(initialBlock.start_time?.slice(0, 5) || '09:00');
      setEndTime(initialBlock.end_time?.slice(0, 5) || '10:30');
      setActivity(initialBlock.activity || '');
      setCategory(initialBlock.category || 'CFA');
      setColor(initialBlock.color || '#6366f1');
      // If activity has tag in brackets or matching tag
      const foundTag = tags.find(t => initialBlock.activity?.toLowerCase().includes(t.name.toLowerCase()));
      if (foundTag) setSelectedTag(foundTag.name);
    } else {
      setDayOfWeek(defaultDay);
      const startH = defaultHour.toString().padStart(2, '0');
      const endH = (defaultHour + 1).toString().padStart(2, '0');
      setStartTime(`${startH}:00`);
      setEndTime(`${endH}:30`);
      setActivity('');
      setCategory('CFA');
      setColor('#6366f1');
      setSelectedTag('Deep Work');
    }
  }, [initialBlock, isOpen, defaultDay, defaultHour]);

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    const found = CATEGORIES.find(c => c.name === newCat);
    if (found) setColor(found.color);
  };

  const handleApplyDuration = (minutes: number) => {
    if (!startTime) return;
    const [h, m] = startTime.split(':').map(Number);
    const totalMin = h * 60 + m + minutes;
    const endH = Math.floor(totalMin / 60) % 24;
    const endM = totalMin % 60;
    setEndTime(`${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim()) return;

    const payload = {
      day_of_week: dayOfWeek,
      start_time: startTime,
      end_time: endTime,
      activity: activity.trim(),
      category,
      color,
    };

    if (initialBlock) {
      await updateMutation.mutateAsync({
        id: initialBlock.id,
        updates: payload,
      });
    } else {
      await addMutation.mutateAsync(payload as any);
    }
    onClose();
  };

  const handleDelete = async () => {
    if (!initialBlock) return;
    if (confirm(`Delete timetable block "${initialBlock.activity}"?`)) {
      await deleteMutation.mutateAsync(initialBlock.id);
      onClose();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg bg-[#0b0f19] border-blue-500/30 text-white rounded-3xl shadow-2xl p-6">
          <DialogHeader className="pb-2 border-b border-white/10">
            <DialogTitle className="text-xl font-black text-white flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-blue-400" />
              {initialBlock ? 'Edit Timetable Block' : 'Add Timetable Block'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 py-2">
            {/* Activity Name */}
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">
                Activity Title <span className="text-rose-400">*</span>
              </Label>
              <Input
                required
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder="e.g. CFA — Concept Study (Deep Work)"
                className="bg-[#111827] border-white/10 text-white rounded-xl h-10 text-sm focus-visible:ring-blue-500"
                autoFocus
              />
            </div>

            {/* Day of Week Selector */}
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Day of Week</Label>
              <div className="grid grid-cols-7 gap-1 bg-[#111827] p-1 rounded-xl border border-white/10">
                {DAYS.map((d) => {
                  const isSelected = dayOfWeek === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDayOfWeek(d.id)}
                      className={`py-2 text-xs font-bold rounded-lg transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                      title={d.full}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Start Time & End Time + Quick Duration Presets */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Time Slot</Label>
                <div className="flex items-center gap-1">
                  {[30, 45, 60, 90, 120].map(mins => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => handleApplyDuration(mins)}
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5"
                    >
                      +{mins}m
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 bg-[#111827] border border-white/10 rounded-xl px-3 py-1.5">
                  <span className="text-[11px] text-zinc-400 font-bold">Start:</span>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="bg-transparent border-0 text-white p-0 h-7 text-xs font-mono focus-visible:ring-0"
                    required
                  />
                </div>
                <div className="flex items-center gap-2 bg-[#111827] border border-white/10 rounded-xl px-3 py-1.5">
                  <span className="text-[11px] text-zinc-400 font-bold">End:</span>
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="bg-transparent border-0 text-white p-0 h-7 text-xs font-mono focus-visible:ring-0"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Category Selector */}
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Category</Label>
              <div className="flex flex-wrap gap-1.5 max-h-[90px] overflow-y-auto pr-1">
                {CATEGORIES.map((cat) => {
                  const isSelected = category === cat.name;
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => handleCategoryChange(cat.name)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                        isSelected
                          ? 'bg-white/15 border-white/40 text-white shadow-sm'
                          : 'bg-[#111827] border-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tag Selector with Manage Tags trigger */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3 h-3 text-blue-400" /> Tag
                </Label>
                <button
                  type="button"
                  onClick={() => setTagManagerOpen(true)}
                  className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                >
                  <Settings className="w-3 h-3" /> Manage Tags
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-[80px] overflow-y-auto pr-1">
                {tags.map((t) => {
                  const isSelected = selectedTag === t.name;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setSelectedTag(t.name);
                        // append or update tag in activity if not present
                        if (!activity.toLowerCase().includes(t.name.toLowerCase())) {
                          // optional tag association
                        }
                      }}
                      className={`px-2 py-0.5 rounded-lg text-[11px] font-medium transition-all border ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-400'
                          : 'bg-[#111827] border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {t.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Swatches */}
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Card Accent Color</Label>
              <div className="flex items-center gap-2">
                {COLOR_PRESETS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-6 h-6 rounded-full transition-transform ${
                      color === c ? 'scale-125 ring-2 ring-white shadow-lg' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <DialogFooter className="pt-3 border-t border-white/10 flex flex-row items-center justify-between gap-2">
              <div>
                {initialBlock && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                    className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 text-xs h-9 px-3 rounded-xl gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Delete Block
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
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
                  disabled={addMutation.isPending || updateMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold h-9 px-6 rounded-xl shadow-lg shadow-blue-600/30"
                >
                  {initialBlock ? 'Save Changes' : 'Add Block'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Tag Manager Modal */}
      <TimetableTagManagerModal
        isOpen={tagManagerOpen}
        onClose={() => setTagManagerOpen(false)}
      />
    </>
  );
}
