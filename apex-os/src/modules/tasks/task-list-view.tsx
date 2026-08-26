import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '@/api/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';

interface TaskListViewProps {
  tasks: Task[];
  onToggleStatus: (id: string, isDone: boolean) => void;
  onEditTask: (task: Task) => void;
}

export function TaskListView({ tasks, onToggleStatus, onEditTask }: TaskListViewProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center p-12 bg-card rounded-2xl border border-border/50 mt-4">
        <p className="text-muted-foreground">No tasks found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 mt-4">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-colors cursor-pointer group"
            onClick={() => onEditTask(task)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <Checkbox 
                checked={task.status === 'Done'} 
                onCheckedChange={(checked) => onToggleStatus(task.id, Boolean(checked))} 
                className="w-5 h-5"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-medium truncate ${task.status === 'Done' ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                {task.title}
              </h4>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Badge variant="outline" className="text-xs text-muted-foreground border-border bg-secondary/50 hidden md:flex">
                {task.category}
              </Badge>
              
              <Badge 
                variant="outline" 
                className={`text-xs border-transparent ${
                  task.priority === 'High' ? 'bg-destructive/10 text-destructive' :
                  task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-blue-500/10 text-blue-400'
                }`}
              >
                {task.priority}
              </Badge>

              {task.deadline && (
                <span className="text-xs text-muted-foreground w-24 text-right">
                  {format(parseISO(task.deadline), 'MMM d, yyyy')}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
