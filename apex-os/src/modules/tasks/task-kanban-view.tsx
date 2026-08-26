import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '@/api/types';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { 
  CheckCircle2, Clock, Trash2, Edit2, AlertCircle, 
  Calendar, GripVertical, Check, ArrowRight, ArrowLeft 
} from 'lucide-react';
import { useDeleteTask } from './hooks';

interface TaskKanbanViewProps {
  tasks: Task[];
  onUpdateStatus: (id: string, newStatus: string) => void;
  onEditTask: (task: Task) => void;
}

const COLUMNS = [
  { id: 'To Do', label: 'To Do', icon: '📋', color: 'border-zinc-500/30 text-zinc-300', ring: 'focus:border-zinc-500' },
  { id: 'In Progress', label: 'In Progress', icon: '⚡', color: 'border-blue-500/40 text-blue-300', ring: 'focus:border-blue-500' },
  { id: 'Done', label: 'Completed', icon: '✓', color: 'border-emerald-500/40 text-emerald-300', ring: 'focus:border-emerald-500' },
];

export function TaskKanbanView({ tasks, onUpdateStatus, onEditTask }: TaskKanbanViewProps) {
  const deleteTaskMutation = useDeleteTask();
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  const getTasksByStatus = (statusId: string) => {
    return tasks.filter(t => t.status === statusId);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggingTaskId(taskId);
  };

  const handleDragEnd = () => {
    setDraggingTaskId(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDragLeave = (e: React.DragEvent, columnId: string) => {
    // Only reset if leaving the column container
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    if (dragOverColumn === columnId) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain') || draggingTaskId;
    if (taskId) {
      onUpdateStatus(taskId, columnId);
    }
    setDragOverColumn(null);
    setDraggingTaskId(null);
  };

  const handleDelete = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    if (confirm(`Delete task "${title}"?`)) {
      deleteTaskMutation.mutate(id);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
      {COLUMNS.map(column => {
        const columnTasks = getTasksByStatus(column.id);
        const isDraggingOver = dragOverColumn === column.id;

        return (
          <div 
            key={column.id} 
            className="flex flex-col gap-3"
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={(e) => handleDragLeave(e, column.id)}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <span className="text-base">{column.icon}</span>
                <h3 className="text-sm font-bold text-white tracking-wide">{column.label}</h3>
              </div>
              <Badge variant="outline" className={`text-xs font-mono font-bold px-2 py-0.5 ${column.color} bg-white/5`}>
                {columnTasks.length}
              </Badge>
            </div>
            
            {/* Column Drop Container */}
            <div 
              className={`flex flex-col gap-3 min-h-[350px] p-3 rounded-3xl border-2 transition-all backdrop-blur-xl ${
                isDraggingOver 
                  ? 'bg-blue-600/10 border-blue-500 border-solid shadow-xl shadow-blue-500/10' 
                  : 'bg-[#0b0f19]/80 border-white/5 border-dashed hover:border-white/10'
              }`}
            >
              <AnimatePresence>
                {columnTasks.map(task => {
                  const isDone = task.status === 'Done';
                  const isOverdue = task.deadline && new Date(task.deadline).getTime() < Date.now() && !isDone;
                  const isBeingDragged = draggingTaskId === task.id;

                  return (
                    <motion.div
                      layout
                      key={task.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: isBeingDragged ? 0.4 : 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      draggable
                      onDragStart={(e) => handleDragStart(e as any, task.id)}
                      onDragEnd={handleDragEnd}
                      onClick={() => onEditTask(task)}
                      className={`p-4 bg-[#111827] rounded-2xl border transition-all cursor-grab active:cursor-grabbing hover:border-blue-500/50 shadow-md group relative overflow-hidden ${
                        isDone 
                          ? 'border-emerald-500/20 bg-emerald-950/10' 
                          : 'border-white/10'
                      }`}
                    >
                      {/* Drag Handle Indicator */}
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <div className="flex items-center gap-1 text-zinc-500 group-hover:text-zinc-300">
                          <GripVertical className="w-3.5 h-3.5 -ml-1 shrink-0" />
                          <h4 className={`text-sm font-semibold leading-tight ${isDone ? 'line-through text-zinc-400' : 'text-white'}`}>
                            {task.title}
                          </h4>
                        </div>
                      </div>

                      {task.linked_area && (
                        <span className="text-[11px] text-zinc-400 block mb-2 font-medium">
                          {task.linked_area}
                        </span>
                      )}
                      
                      {/* Badges Row */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4.5 bg-white/5 text-zinc-300 border-white/10">
                          {task.category || 'General'}
                        </Badge>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          task.priority === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                          task.priority === 'Medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {task.priority || 'Medium'}
                        </span>
                      </div>

                      {/* Footer info & Actions */}
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/5 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          {task.deadline ? (
                            <span className={`flex items-center gap-1 font-mono ${isOverdue ? 'text-rose-400 font-bold' : 'text-zinc-500'}`}>
                              {isOverdue && <AlertCircle className="w-3 h-3" />}
                              <Calendar className="w-3 h-3" />
                              {format(parseISO(task.deadline), 'MMM d')}
                            </span>
                          ) : (
                            <span className="text-zinc-600 text-[10px]">No due date</span>
                          )}
                        </div>
                        
                        {/* Quick Mover Controls & Edit/Delete */}
                        <div className="flex items-center gap-1">
                          {/* Left Mover */}
                          {column.id === 'In Progress' && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); onUpdateStatus(task.id, 'To Do'); }}
                              className="p-1 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white"
                              title="Move to To Do"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                          )}
                          {column.id === 'Done' && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); onUpdateStatus(task.id, 'In Progress'); }}
                              className="p-1 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white"
                              title="Move to In Progress"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                          )}

                          {/* Right Mover */}
                          {column.id === 'To Do' && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); onUpdateStatus(task.id, 'In Progress'); }}
                              className="p-1 rounded-md hover:bg-blue-600/30 text-blue-400 hover:text-blue-300"
                              title="Start Task (Move to In Progress)"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                          {column.id === 'In Progress' && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); onUpdateStatus(task.id, 'Done'); }}
                              className="p-1 rounded-md hover:bg-emerald-600/30 text-emerald-400 hover:text-emerald-300"
                              title="Complete Task (Move to Done)"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                          )}

                          {/* Edit & Delete */}
                          <button
                            onClick={(e) => { e.stopPropagation(); onEditTask(task); }}
                            className="p-1 rounded-md hover:bg-blue-500/20 text-zinc-400 hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Edit"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(e, task.id, task.title)}
                            className="p-1 rounded-md hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {columnTasks.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-xs text-zinc-600 border border-dashed border-white/5 rounded-2xl m-2">
                  <span>Drop tasks here</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
