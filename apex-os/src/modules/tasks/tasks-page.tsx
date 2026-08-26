import React, { useState } from 'react';
import { useTasks, useAllTasks, useUpdateTask } from './hooks';
import { TaskListView } from './task-list-view';
import { TaskKanbanView } from './task-kanban-view';
import { TaskFormModal } from './task-form-modal';
import { Task } from '@/api/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, List, LayoutGrid, Search, CheckSquare, 
  Flame, Clock, CheckCircle2, Zap, Target, Filter 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function TasksPage() {
  const [view, setView] = useState<'list' | 'kanban'>('list');
  const [statusTab, setStatusTab] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Filters for the active view
  const filters = {
    category: filterCategory,
    priority: filterPriority,
    status: statusTab,
    search: searchTerm,
  };

  const { data: tasks = [], isLoading } = useTasks(filters);
  const { data: allTasks = [] } = useAllTasks();
  const updateTaskMutation = useUpdateTask();

  // Compute progress bar metrics from all unfiltered tasks
  const totalCount = allTasks.length;
  const doneCount = allTasks.filter(t => t.status === 'Done').length;
  const inProgressCount = allTasks.filter(t => t.status === 'In Progress').length;
  const todoCount = allTasks.filter(t => !t.status || t.status === 'To Do').length;
  const highPriorityPending = allTasks.filter(t => t.priority === 'High' && t.status !== 'Done').length;
  const completionPct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const handleToggleStatus = (id: string, isDone: boolean) => {
    updateTaskMutation.mutate({ id, updates: { status: isDone ? 'Done' : 'To Do' } });
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    updateTaskMutation.mutate({ id, updates: { status: newStatus } });
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
    <div className="p-4 md:p-8 max-w-7xl mx-auto text-foreground space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Task Command Center</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Organize, prioritize, and track all your strategic deliverables.
          </p>
        </div>
        
        <Button 
          onClick={openNewModal} 
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 gap-1.5 h-10 px-5 text-xs shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Task
        </Button>
      </div>

      {/* Task Completion Progress & Status Overview Card */}
      <div className="bg-[#0b0f19]/90 border border-blue-500/25 rounded-3xl p-5 shadow-2xl backdrop-blur-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Progress Percent & Bar */}
          <div className="space-y-2 flex-1 max-w-md">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Target className="w-4 h-4 text-blue-400" /> Task Completion Progress
              </span>
              <span className="font-mono font-bold text-blue-400">
                {doneCount} of {totalCount} Done ({completionPct}%)
              </span>
            </div>
            
            {/* Multi-segment Glowing Progress Bar */}
            <div className="w-full bg-[#111827] rounded-full h-3 overflow-hidden border border-white/5 flex">
              <div 
                className="bg-emerald-500 h-full transition-all duration-700 shadow-sm shadow-emerald-500/50" 
                style={{ width: `${totalCount > 0 ? (doneCount / totalCount) * 100 : 0}%` }} 
                title={`${doneCount} Done`}
              />
              <div 
                className="bg-blue-500 h-full transition-all duration-700 shadow-sm shadow-blue-500/50" 
                style={{ width: `${totalCount > 0 ? (inProgressCount / totalCount) * 100 : 0}%` }} 
                title={`${inProgressCount} In Progress`}
              />
            </div>
          </div>

          {/* Metric Status Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
            <div className="bg-[#111827] border border-white/5 p-2.5 rounded-2xl min-w-[100px]">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block flex items-center gap-1">
                <Clock className="w-3 h-3 text-zinc-400" /> To Do
              </span>
              <span className="text-lg font-black text-white font-mono mt-0.5 block">{todoCount}</span>
            </div>

            <div className="bg-[#111827] border border-blue-500/20 p-2.5 rounded-2xl min-w-[100px]">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block flex items-center gap-1">
                <Zap className="w-3 h-3 text-blue-400" /> In Progress
              </span>
              <span className="text-lg font-black text-blue-400 font-mono mt-0.5 block">{inProgressCount}</span>
            </div>

            <div className="bg-[#111827] border border-emerald-500/20 p-2.5 rounded-2xl min-w-[100px]">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Completed
              </span>
              <span className="text-lg font-black text-emerald-400 font-mono mt-0.5 block">{doneCount}</span>
            </div>

            <div className="bg-[#111827] border border-rose-500/20 p-2.5 rounded-2xl min-w-[100px]">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block flex items-center gap-1">
                <Flame className="w-3 h-3 text-rose-400" /> High Priority
              </span>
              <span className="text-lg font-black text-rose-400 font-mono mt-0.5 block">{highPriorityPending}</span>
            </div>
          </div>
        </div>
      </div>

      {/* View Switcher, Status Tabs & Filters Bar */}
      <div className="bg-[#0b0f19]/90 border border-white/10 p-3.5 rounded-3xl shadow-xl backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: View Toggle & Status Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {/* List vs Board Toggle */}
          <div className="flex items-center p-1 bg-[#111827] rounded-2xl border border-white/10">
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                view === 'list' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" /> List
            </button>
            <button
              onClick={() => setView('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                view === 'kanban' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Board
            </button>
          </div>

          {/* Status Filter Tabs */}
          <div className="hidden sm:flex items-center p-1 bg-[#111827] rounded-2xl border border-white/10">
            {[
              { id: 'all', label: 'All Tasks' },
              { id: 'Incomplete', label: 'Active / Incomplete' },
              { id: 'To Do', label: 'To Do' },
              { id: 'In Progress', label: 'In Progress' },
              { id: 'Done', label: 'Done' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  statusTab === tab.id
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Search, Category & Priority Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative flex-1 min-w-[140px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-blue-400" />
            <Input 
              placeholder="Search tasks..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-[#111827] border-white/10 text-white rounded-xl h-8 text-xs placeholder:text-zinc-500 w-full"
            />
          </div>

          {/* Category Dropdown */}
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[125px] bg-[#111827] border-white/10 text-xs rounded-xl h-8 text-zinc-300">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#111827] border-white/10 text-white text-xs">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="CFA">CFA</SelectItem>
              <SelectItem value="Placement">Placement</SelectItem>
              <SelectItem value="Academic">Academic</SelectItem>
              <SelectItem value="Fitness">Fitness</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          {/* Priority Dropdown */}
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-[115px] bg-[#111827] border-white/10 text-xs rounded-xl h-8 text-zinc-300">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent className="bg-[#111827] border-white/10 text-white text-xs">
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Task List / Board Container */}
      {isLoading ? (
        <div className="py-20 text-center text-zinc-500 animate-pulse font-medium">
          Loading tasks from database...
        </div>
      ) : view === 'list' ? (
        <TaskListView 
          tasks={tasks} 
          onToggleStatus={handleToggleStatus} 
          onUpdateStatus={handleUpdateStatus}
          onEditTask={openEditModal} 
        />
      ) : (
        <TaskKanbanView 
          tasks={tasks} 
          onUpdateStatus={handleUpdateStatus} 
          onEditTask={openEditModal} 
        />
      )}

      {/* Add / Edit Task Modal */}
      <TaskFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        task={selectedTask} 
      />
    </div>
  );
}
