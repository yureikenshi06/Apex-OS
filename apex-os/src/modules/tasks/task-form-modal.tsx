import React, { useState, useEffect } from 'react';
import { Task } from '@/types/database';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAddTask, useUpdateTask } from './hooks';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
}

const CATEGORIES = ['Personal', 'CFA', 'Placement', 'Academic', 'Fitness', 'Finance', 'Other'];
const PRIORITIES = ['High', 'Medium', 'Low'];
const STATUSES = ['To Do', 'In Progress', 'Done'];

export function TaskFormModal({ isOpen, onClose, task }: TaskFormModalProps) {
  const addTask = useAddTask();
  const updateTask = useUpdateTask();

  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    category: 'Personal',
    priority: 'Medium',
    status: 'To Do',
    deadline: '',
    estimated_hours: 0,
    actual_hours: 0,
    linked_area: '',
    notes: ''
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    } else {
      setFormData({
        title: '',
        category: 'Personal',
        priority: 'Medium',
        status: 'To Do',
        deadline: '',
        estimated_hours: 0,
        actual_hours: 0,
        linked_area: '',
        notes: ''
      });
    }
  }, [task, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      updateTask.mutate({ id: task.id, updates: formData });
    } else {
      addTask.mutate(formData);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#111118] text-white border-white/10 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Task' : 'New Task'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input 
              id="title" 
              required 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={v => setFormData({...formData, category: v})}>
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={formData.priority} onValueChange={v => setFormData({...formData, priority: v})}>
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={v => setFormData({...formData, status: v})}>
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input 
                id="deadline" 
                type="date" 
                value={formData.deadline || ''} 
                onChange={e => setFormData({...formData, deadline: e.target.value})}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="est_hours">Est. Hours</Label>
              <Input 
                id="est_hours" 
                type="number" 
                min="0" step="0.5"
                value={formData.estimated_hours || 0} 
                onChange={e => setFormData({...formData, estimated_hours: parseFloat(e.target.value)})}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="act_hours">Actual Hours</Label>
              <Input 
                id="act_hours" 
                type="number" 
                min="0" step="0.5"
                value={formData.actual_hours || 0} 
                onChange={e => setFormData({...formData, actual_hours: parseFloat(e.target.value)})}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linked_area">Linked Area</Label>
            <Input 
              id="linked_area" 
              value={formData.linked_area || ''} 
              onChange={e => setFormData({...formData, linked_area: e.target.value})}
              className="bg-white/5 border-white/10 text-white"
              placeholder="e.g. Quant, Machine Learning, Resume"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              value={formData.notes || ''} 
              onChange={e => setFormData({...formData, notes: e.target.value})}
              className="bg-white/5 border-white/10 text-white resize-none"
              rows={3}
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">Cancel</Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              {task ? 'Save Changes' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
