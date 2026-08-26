import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '@/types/database';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';

interface TaskKanbanViewProps {
  tasks: Task[];
  onUpdateStatus: (id: string, newStatus: string) => void;
  onEditTask: (task: Task) => void;
}

const COLUMNS = ['To Do', 'In Progress', 'Done'];

export function TaskKanbanView({ tasks, onUpdateStatus, onEditTask }: TaskKanbanViewProps) {
  
  const getTasksByStatus = (status: string) => tasks.filter(t => t.status === status);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 items-start">
      {COLUMNS.map(column => (
        <div key={column} className="flex flex-col gap-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{column}</h3>
            <Badge variant="secondary" className="bg-white/10">{getTasksByStatus(column).length}</Badge>
          </div>
          
          <div className="flex flex-col gap-3 min-h-[200px] p-2 -mx-2 rounded-xl bg-white/5 border border-dashed border-white/10">
            <AnimatePresence>
              {getTasksByStatus(column).map(task => (
                <motion.div
                  layout
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => onEditTask(task)}
                  className="p-4 bg-[#111118] rounded-xl border border-white/5 cursor-pointer hover:border-white/20 transition-colors shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h4 className="text-sm font-medium text-white leading-tight">{task.title}</h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 bg-white/5 text-gray-300 border-transparent">
                      {task.category}
                    </Badge>
                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-5 border-transparent ${
                      task.priority === 'High' ? 'bg-red-500/10 text-red-400' :
                      task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      {task.priority}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[10px] text-gray-500">
                      {task.deadline ? format(parseISO(task.deadline), 'MMM d') : 'No date'}
                    </span>
                    
                    {/* Simple status mover instead of drag and drop for now */}
                    <div className="flex gap-1">
                      {column !== 'To Do' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); onUpdateStatus(task.id, 'To Do'); }}
                          className="text-[10px] text-gray-400 hover:text-white px-1"
                        >
                          ←
                        </button>
                      )}
                      {column !== 'In Progress' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); onUpdateStatus(task.id, 'In Progress'); }}
                          className="text-[10px] text-gray-400 hover:text-white px-1"
                        >
                          {column === 'Done' ? '←' : '→'}
                        </button>
                      )}
                      {column !== 'Done' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); onUpdateStatus(task.id, 'Done'); }}
                          className="text-[10px] text-gray-400 hover:text-white px-1"
                        >
                          →
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {getTasksByStatus(column).length === 0 && (
              <div className="text-center py-8 text-xs text-gray-500">No tasks</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
