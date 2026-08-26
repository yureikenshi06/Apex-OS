import React, { useState, useEffect } from 'react';
import { Task, TaskInsert } from '@/api/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAddTask, useUpdateTask, useDeleteTask } from './hooks';
import { 
  CheckSquare, Calendar, Clock, Tag, AlertCircle, 
  Trash2, Layers, Flag, Sparkles, Check 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
}

const CATEGORIES = [
  { name: 'Personal', color: 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30' },
  { name: 'CFA', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  { name: 'Placement', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  { name: 'Academic', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  { name: 'Fitness', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  { name: 'Finance', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  { name: 'Other', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
];

const PRIORITIES = [
  { name: 'High', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30', active: 'bg-rose-600 text-white' },
  { name: 'Medium', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30', active: 'bg-amber-600 text-white' },
  { name: 'Low', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40 hover:bg-blue-500/30', active: 'bg-blue-600 text-white' },
];

const STATUSES = [
  { name: 'To Do', icon: '⏳', color: 'bg-zinc-800 text-zinc-300', active: 'bg-zinc-700 text-white border-zinc-500' },
  { name: 'In Progress', icon: '⚡', color: 'bg-blue-950/60 text-blue-300', active: 'bg-blue-600 text-white border-blue-400' },
  { name: 'Done', icon: '✓', color: 'bg-emerald-950/60 text-emerald-300', active: 'bg-emerald-600 text-white border-emerald-400' },
];

export function TaskFormModal({ isOpen, onClose, task }: TaskFormModalProps) {
  const addTaskMutation = useAddTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Personal');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [status, setStatus] = useState<'To Do' | 'In Progress' | 'Done'>('To Do');
  const [deadline, setDeadline] = useState('');
  const [estimatedHours, setEstimatedHours] = useState('1');
  const [actualHours, setActualHours] = useState('0');
  const [linkedArea, setLinkedArea] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setCategory(task.category || 'Personal');
      setPriority((task.priority as any) || 'Medium');
      setStatus((task.status as any) || 'To Do');
      setDeadline(task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : '');
      setEstimatedHours(task.estimated_hours?.toString() || '1');
      setActualHours(task.actual_hours?.toString() || '0');
      setLinkedArea(task.linked_area || '');
      setNotes(task.notes || '');
    } else {
      setTitle('');
      setCategory('Personal');
      setPriority('Medium');
      setStatus('To Do');
      setDeadline('');
      setEstimatedHours('1');
      setActualHours('0');
      setLinkedArea('');
      setNotes('');
    }
  }, [task, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const payload = {
      title: title.trim(),
      category,
      priority,
      status,
      deadline: deadline || null,
      estimated_hours: parseFloat(estimatedHours) || null,
      actual_hours: parseFloat(actualHours) || null,
      linked_area: linkedArea || null,
      notes: notes || null,
    };

    if (task) {
      await updateTaskMutation.mutateAsync({ id: task.id, updates: payload });
    } else {
      await addTaskMutation.mutateAsync(payload as any);
    }
    onClose();
  };

  const handleDelete = async () => {
    if (!task) return;
    if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
      await deleteTaskMutation.mutateAsync(task.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#0b0f19] text-white border-blue-500/30 sm:max-w-[550px] rounded-3xl shadow-2xl p-6">
        <DialogHeader className="pb-2 border-b border-white/10">
          <DialogTitle className="text-xl font-black text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-blue-400" />
            {task ? 'Edit Task' : 'Create New Task'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Title Input */}
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">
              Task Title <span className="text-rose-400">*</span>
            </Label>
            <Input 
              required 
              value={title} 
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Solve FSA Reading 18 Practice Problems..."
              className="bg-[#111827] border-white/10 text-white rounded-xl h-10 text-sm focus-visible:ring-blue-500"
              autoFocus
            />
          </div>

          {/* Category Selector */}
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Category</Label>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map(cat => {
                const isSelected = category === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setCategory(cat.name)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30'
                        : `${cat.color} hover:bg-white/10`
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority & Status Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Priority Selector */}
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Priority</Label>
              <div className="grid grid-cols-3 gap-1 bg-[#111827] p-1 rounded-xl border border-white/10">
                {PRIORITIES.map(p => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setPriority(p.name as any)}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                      priority === p.name ? p.active + ' shadow-md' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Selector */}
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Status</Label>
              <div className="grid grid-cols-3 gap-1 bg-[#111827] p-1 rounded-xl border border-white/10">
                {STATUSES.map(s => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setStatus(s.name as any)}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                      status === s.name ? s.active + ' shadow-md' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>{s.icon}</span>
                    <span>{s.name === 'In Progress' ? 'Doing' : s.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Deadline & Hours Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Deadline</Label>
              <Input 
                type="date" 
                value={deadline} 
                onChange={e => setDeadline(e.target.value)}
                className="bg-[#111827] border-white/10 text-white rounded-xl h-9 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Est. Hours</Label>
              <Input 
                type="number" 
                step="0.5"
                min="0"
                value={estimatedHours} 
                onChange={e => setEstimatedHours(e.target.value)}
                className="bg-[#111827] border-white/10 text-white rounded-xl h-9 text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Actual Hours</Label>
              <Input 
                type="number" 
                step="0.5"
                min="0"
                value={actualHours} 
                onChange={e => setActualHours(e.target.value)}
                className="bg-[#111827] border-white/10 text-white rounded-xl h-9 text-xs font-mono"
              />
            </div>
          </div>

          {/* Linked Area / Goal */}
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Linked Goal / Milestone</Label>
            <Input 
              value={linkedArea} 
              onChange={e => setLinkedArea(e.target.value)}
              placeholder="e.g. CFA Level I Exam, TrueAlpha Equity Research, Semester Project..."
              className="bg-[#111827] border-white/10 text-white rounded-xl h-9 text-xs"
            />
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Notes & Checklist</Label>
            <Textarea 
              value={notes} 
              onChange={e => setNotes(e.target.value)}
              placeholder="Add links, sub-tasks, or notes..."
              className="bg-[#111827] border-white/10 text-white rounded-xl min-h-[75px] text-xs"
            />
          </div>

          {/* Dialog Actions */}
          <DialogFooter className="pt-3 border-t border-white/10 flex flex-row items-center justify-between gap-2">
            <div>
              {task && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={handleDelete}
                  disabled={deleteTaskMutation.isPending}
                  className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 text-xs h-9 px-3 rounded-xl gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Delete
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
                disabled={addTaskMutation.isPending || updateTaskMutation.isPending}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold h-9 px-6 rounded-xl shadow-lg shadow-blue-600/30"
              >
                {task ? 'Save Changes' : 'Create Task'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
