import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '@/api/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { 
  CheckCircle2, Clock, Trash2, Edit2, AlertCircle, 
  Calendar, Check, ArrowRight, Play, CheckSquare, Sparkles 
} from 'lucide-react';
import { useDeleteTask } from './hooks';

interface TaskListViewProps {
  tasks: Task[];
  onToggleStatus: (id: string, isDone: boolean) => void;
  onUpdateStatus: (id: string, newStatus: string) => void;
  onEditTask: (task: Task) => void;
}

export function TaskListView({ tasks, onToggleStatus, onUpdateStatus, onEditTask }: TaskListViewProps) {
  const deleteTaskMutation = useDeleteTask();

  const handleDelete = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    if (confirm(`Delete task "${title}"?`)) {
      deleteTaskMutation.mutate(id);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 bg-surface-1/60 rounded-[20px] border border-line/70">
        <CheckSquare className="w-12 h-12 text-zinc-500 mx-auto mb-3" />
        <h3 className="text-base font-bold text-zinc-300">No Tasks Found</h3>
        <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
          No tasks match your selected filter or search. Create a new task or adjust your filters above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      <AnimatePresence>
        {tasks.map((task, idx) => {
          const isDone = task.status === 'Done';
          const isInProgress = task.status === 'In Progress';
          const isOverdue = task.deadline && new Date(task.deadline).getTime() < Date.now() && !isDone;

          return (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onEditTask(task)}
              className={`grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3.5 gap-y-2.5 p-3.5 sm:flex sm:justify-between sm:gap-4 sm:p-4 rounded-2xl border transition-all cursor-pointer group ${
                isDone 
                  ? 'bg-emerald-950/10 border-emerald-500/20 hover:border-emerald-500/40' 
                  : isInProgress
                  ? 'bg-blue-950/20 border-blue-500/30 hover:border-blue-500/60'
                  : 'bg-surface-1 border-line hover:border-line-strong'
              }`}
            >
              {/* Left: Checkbox + Status Selector + Title */}
              <div className="contents sm:flex sm:items-center sm:gap-3.5 sm:flex-1 sm:min-w-0">
                {/* Done Checkbox */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStatus(task.id, !isDone);
                  }}
                  className={`order-1 sm:order-none w-[22px] h-[22px] sm:w-5 sm:h-5 rounded-lg border flex items-center justify-center transition-all shrink-0 ${
                    isDone
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'border-zinc-700 bg-surface-2 hover:border-blue-500'
                  }`}
                  title={isDone ? 'Mark as Incomplete' : 'Mark as Done'}
                >
                  {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>

                {/* Status Selector Dropdown (Allows setting In Progress / To Do / Done directly!) */}
                <div onClick={(e) => e.stopPropagation()} className="order-3 col-start-2 shrink-0 sm:order-none sm:col-auto">
                  <select
                    value={task.status || 'To Do'}
                    onChange={(e) => onUpdateStatus(task.id, e.target.value)}
                    className={`text-xs rounded-xl px-2.5 py-1 font-bold outline-none cursor-pointer border transition-colors ${
                      isDone
                        ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
                        : isInProgress
                        ? 'bg-blue-950/50 text-blue-300 border-blue-500/40'
                        : 'bg-surface-2 text-zinc-400 border-line'
                    }`}
                  >
                    <option value="To Do" className="bg-surface-2 text-white">⏳ To Do</option>
                    <option value="In Progress" className="bg-surface-2 text-white">⚡ In Progress</option>
                    <option value="Done" className="bg-surface-2 text-white">✓ Done</option>
                  </select>
                </div>

                {/* Title & Details */}
                <div className="order-2 min-w-0 flex-1 sm:order-none">
                  <h4 className={`text-sm font-semibold truncate ${isDone ? 'line-through text-zinc-500' : 'text-white'}`}>
                    {task.title}
                  </h4>
                  {task.linked_area && (
                    <span className="text-[11px] text-zinc-500 truncate block mt-0.5">
                      Goal: {task.linked_area}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Badges & Actions */}
              <div className="order-4 col-start-2 flex flex-wrap items-center gap-2.5 sm:order-none sm:col-auto sm:shrink-0 sm:flex-nowrap sm:gap-3">
                {/* Category Badge */}
                <Badge variant="outline" className="text-[11px] px-2 py-0.5 border-line text-zinc-300 bg-white/5 hidden sm:inline-flex">
                  {task.category || 'General'}
                </Badge>
                
                {/* Priority Badge */}
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                  task.priority === 'High'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : task.priority === 'Low'
                    ? 'bg-zinc-800 text-zinc-400'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {task.priority || 'Medium'}
                </span>

                {/* Estimated Hours */}
                {task.estimated_hours && (
                  <span className="text-xs text-zinc-500 font-mono hidden md:inline-block">
                    {task.estimated_hours}h
                  </span>
                )}

                {/* Deadline */}
                {task.deadline && (
                  <div className={`text-xs font-mono flex items-center gap-1 sm:w-24 justify-end ${
                    isOverdue ? 'text-rose-400 font-bold' : 'text-zinc-400'
                  }`}>
                    {isOverdue && <AlertCircle className="w-3.5 h-3.5" />}
                    <span>{format(parseISO(task.deadline), 'MMM d')}</span>
                  </div>
                )}

                {/* Action Buttons (Edit & Delete) */}
                <div className="flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditTask(task);
                    }}
                    className="p-1.5 rounded-lg hover:bg-blue-500/20 text-zinc-400 hover:text-blue-400 transition-colors"
                    title="Edit Task"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e, task.id, task.title)}
                    className="p-1.5 rounded-lg hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition-colors"
                    title="Delete Task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
