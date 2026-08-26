import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAddTimetableBlock, useUpdateTimetableBlock, useDeleteTimetableBlock } from './hooks';
import type { TimetableBlock } from '@/api/types';
import { Trash2 } from 'lucide-react';

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
  { id: 0, label: 'Monday' },
  { id: 1, label: 'Tuesday' },
  { id: 2, label: 'Wednesday' },
  { id: 3, label: 'Thursday' },
  { id: 4, label: 'Friday' },
  { id: 5, label: 'Saturday' },
  { id: 6, label: 'Sunday' },
];

const COLOR_PRESETS = [
  '#6366f1', // Indigo
  '#8b5cf6', // Purple
  '#10b981', // Emerald
  '#06b6d4', // Cyan
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#f43f5e', // Rose
  '#3b82f6', // Blue
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
    } else {
      setDayOfWeek(defaultDay);
      const startH = defaultHour.toString().padStart(2, '0');
      const endH = (defaultHour + 1).toString().padStart(2, '0');
      setStartTime(`${startH}:00`);
      setEndTime(`${endH}:30`);
      setActivity('');
      setCategory('CFA');
      setColor('#6366f1');
    }
  }, [initialBlock, isOpen, defaultDay, defaultHour]);

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    const found = CATEGORIES.find(c => c.name === newCat);
    if (found) setColor(found.color);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim()) return;

    if (initialBlock) {
      await updateMutation.mutateAsync({
        id: initialBlock.id,
        updates: {
          day_of_week: dayOfWeek,
          start_time: startTime,
          end_time: endTime,
          activity,
          category,
          color,
        },
      });
    } else {
      await addMutation.mutateAsync({
        day_of_week: dayOfWeek,
        start_time: startTime,
        end_time: endTime,
        activity,
        category,
        color,
      });
    }
    onClose();
  };

  const handleDelete = async () => {
    if (!initialBlock) return;
    await deleteMutation.mutateAsync(initialBlock.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#111118] border-white/10 text-white rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {initialBlock ? 'Edit Timetable Block' : 'Add Timetable Block'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="space-y-4 py-2">
          {/* Day of Week */}
          <div className="space-y-1.5">
            <Label className="text-zinc-300 text-xs font-semibold uppercase">Day of Week</Label>
            <div className="grid grid-cols-7 gap-1">
              {DAYS.map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDayOfWeek(d.id)}
                  className={`py-2 text-xs font-medium rounded-xl transition-all ${
                    dayOfWeek === d.id
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {d.label.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Title */}
          <div className="space-y-1.5">
            <Label className="text-zinc-300 text-xs font-semibold uppercase">Activity Name</Label>
            <Input
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              placeholder="e.g. CFA Quant Study / Gym / Work"
              required
              className="bg-[#1a1a24] border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 rounded-xl"
            />
          </div>

          {/* Time Range */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-xs font-semibold uppercase">Start Time</Label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="bg-[#1a1a24] border-white/10 text-white rounded-xl focus-visible:ring-indigo-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-300 text-xs font-semibold uppercase">End Time</Label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="bg-[#1a1a24] border-white/10 text-white rounded-xl focus-visible:ring-indigo-500"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label className="text-zinc-300 text-xs font-semibold uppercase">Category</Label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="bg-[#1a1a24] border-white/10 text-white rounded-xl">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-[#181824] border-white/10 text-white">
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat.name} value={cat.name} className="focus:bg-indigo-600 focus:text-white">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span>{cat.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color Presets */}
          <div className="space-y-1.5">
            <Label className="text-zinc-300 text-xs font-semibold uppercase">Block Color Accent</Label>
            <div className="flex items-center gap-2">
              {COLOR_PRESETS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full transition-transform ${
                    color === c ? 'scale-125 ring-2 ring-white shadow-lg' : 'hover:scale-110 opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between sm:justify-between pt-3 border-t border-white/10">
            {initialBlock ? (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                className="rounded-xl gap-1.5"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </Button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="text-zinc-400 hover:text-white rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={addMutation.isPending || updateMutation.isPending}
                className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 px-5 font-semibold"
              >
                {initialBlock ? 'Update Block' : 'Save Block'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
