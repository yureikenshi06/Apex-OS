import React, { useState } from 'react';
import { useTasks, useUpdateTask } from './hooks';
import { TaskListView } from './task-list-view';
import { TaskKanbanView } from './task-kanban-view';
import { TaskFormModal } from './task-form-modal';
import { Task } from '@/types/database';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, List, LayoutGrid } from 'lucide-react';

export default function TasksPage() {
  const [view, setView] = useState<'list' | 'kanban'>('list');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filters = {
    ...(filterCategory !== 'all' ? { category: filterCategory } : {}),
    ...(filterPriority !== 'all' ? { priority: filterPriority } : {}),
  };

  const { data: tasks = [], isLoading } = useTasks(filters);
  const updateTask = useUpdateTask();

  const handleToggleStatus = (id: string, isDone: boolean) => {
    updateTask.mutate({ id, updates: { status: isDone ? 'Done' : 'To Do' } });
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    updateTask.mutate({ id, updates: { status: newStatus } });
  };

  const openNewModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-white space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-gray-400 mt-1">Manage your pending action items.</p>
        </div>
        
        <Button onClick={openNewModal} className="bg-indigo-600 hover:bg-indigo-700 text-white shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#111118] p-4 rounded-2xl border border-white/5">
        <Tabs value={view} onValueChange={(v) => setView(v as 'list' | 'kanban')} className="w-full md:w-auto">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="list" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
              <List className="w-4 h-4 mr-2" /> List
            </TabsTrigger>
            <TabsTrigger value="kanban" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
              <LayoutGrid className="w-4 h-4 mr-2" /> Board
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-[150px] bg-white/5 border-white/10">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="CFA">CFA</SelectItem>
              <SelectItem value="Placement">Placement</SelectItem>
              <SelectItem value="Academic">Academic</SelectItem>
              <SelectItem value="Fitness">Fitness</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-full md:w-[150px] bg-white/5 border-white/10">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-gray-500">Loading tasks...</div>
      ) : (
        view === 'list' ? (
          <TaskListView tasks={tasks} onToggleStatus={handleToggleStatus} onEditTask={openEditModal} />
        ) : (
          <TaskKanbanView tasks={tasks} onUpdateStatus={handleUpdateStatus} onEditTask={openEditModal} />
        )
      )}

      <TaskFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        task={selectedTask} 
      />
    </div>
  );
}
