import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  useCFATopics, useUpdateCFATopic, useAddCFATopic, 
  useLinkTopicToTask, useUnlinkTopicFromTask, CFA_MODULE_CONFIG 
} from './hooks';
import { ProgressRing } from './progress-ring';
import { 
  Search, Plus, BookOpen, CheckCircle2, Award, Clock, 
  ArrowLeft, Check, AlertCircle, RefreshCw, Zap, Layers, Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const STATUSES = ['Not Started', 'In Progress', 'Completed'];
const REVISION_STATUSES = ['Not Started', 'First Pass Done', 'Revised Once', 'Revised Twice', 'Mastered'];
const PRIORITIES = ['High', 'Medium', 'Low'];
const ROW_TYPES = ['STUDY', 'REVIEW'];

export default function CFATopicsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialModule = searchParams.get('module') || 'All Modules';

  const [filterModule, setFilterModule] = useState(initialModule);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterRevision, setFilterRevision] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync state if URL search params change
  useEffect(() => {
    const urlMod = searchParams.get('module');
    if (urlMod) {
      setFilterModule(urlMod);
    }
  }, [searchParams]);

  const handleModuleSelect = (modName: string) => {
    setFilterModule(modName);
    if (modName === 'All Modules' || modName === 'All') {
      searchParams.delete('module');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ module: modName });
    }
  };

  const { data: topics = [], isLoading } = useCFATopics({ 
    module: filterModule, 
    status: filterStatus, 
    revision_status: filterRevision, 
    priority: filterPriority,
    row_type: filterType,
    search: searchQuery 
  });
  
  const updateTopic = useUpdateCFATopic();
  const addTopicMutation = useAddCFATopic();
  const linkTask = useLinkTopicToTask();
  const unlinkTask = useUnlinkTopicFromTask();

  // Add Topic Modal State
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newModule, setNewModule] = useState(CFA_MODULE_CONFIG[0].fullName);
  const [newChapter, setNewChapter] = useState('');
  const [newSubtopic, setNewSubtopic] = useState('');
  const [newTaskText, setNewTaskText] = useState('Learn concepts + solve practice questions');
  const [newHours, setNewHours] = useState('2.0');
  const [newPriority, setNewPriority] = useState('High');
  const [newType, setNewType] = useState('STUDY');

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapter.trim()) return;

    await addTopicMutation.mutateAsync({
      module: newModule,
      chapter_topic: newChapter,
      subtopic_lo: newSubtopic,
      task: newTaskText,
      planned_hours: parseFloat(newHours) || 2.0,
      priority: newPriority as any,
      row_type: newType as any,
      status: 'Not Started',
      completed: false,
      revision_status: 'Not Started',
    });
    setNewChapter('');
    setNewSubtopic('');
    setAddModalOpen(false);
  };

  const handleStatusChange = (id: string, status: any) => {
    const isComp = status === 'Completed';
    updateTopic.mutate({ id, updates: { status, completed: isComp } });
  };

  const handleRevisionChange = (id: string, revision_status: any) => {
    updateTopic.mutate({ id, updates: { revision_status } });
  };

  const handleCompletedToggle = (id: string, completed: boolean) => {
    updateTopic.mutate({ 
      id, 
      updates: { 
        completed, 
        status: completed ? 'Completed' : 'In Progress' 
      } 
    });
  };
  
  const toggleTaskLink = (topic: any) => {
    if (topic.linked_task_id) {
      unlinkTask.mutate(topic.id);
    } else {
      linkTask.mutate(topic);
    }
  };

  // Compute selected module's detailed analysis metrics
  const selectedConfig = CFA_MODULE_CONFIG.find(c => c.fullName === filterModule || c.short === filterModule || c.aliases?.includes(filterModule));
  const isSpecificModule = Boolean(selectedConfig && filterModule !== 'All Modules');

  const totalModuleTopics = topics.length;
  const completedModuleTopics = topics.filter(t => t.completed || t.status === 'Completed').length;
  const moduleHoursTotal = topics.reduce((sum, t) => sum + Number(t.planned_hours || 0), 0);
  const moduleHoursDone = topics.filter(t => t.completed || t.status === 'Completed').reduce((sum, t) => sum + Number(t.planned_hours || 0), 0);
  const modulePct = totalModuleTopics > 0 ? Math.round((completedModuleTopics / totalModuleTopics) * 100) : 0;

  const firstPassCount = topics.filter(t => t.revision_status === 'First Pass Done').length;
  const revisedCount = topics.filter(t => t.revision_status === 'Revised Once' || t.revision_status === 'Revised Twice').length;
  const masteredCount = topics.filter(t => t.revision_status === 'Mastered').length;
  const notStartedCount = Math.max(0, totalModuleTopics - (firstPassCount + revisedCount + masteredCount));

  const studyCount = topics.filter(t => t.row_type === 'STUDY').length;
  const reviewCount = topics.filter(t => t.row_type === 'REVIEW').length;
  const highPriorityIncomplete = topics.filter(t => t.priority === 'High' && !t.completed).length;

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1600px] mx-auto text-foreground font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => navigate('/cfa')} 
            variant="ghost" 
            size="sm" 
            className="p-1.5 h-8 text-zinc-400 hover:text-white rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-black text-white tracking-tight">CFA Topics & LOS Tracker</h1>
          <Badge variant="secondary" className="bg-blue-900/50 text-blue-200 border-blue-700/50 font-bold px-2.5">
            324 Topics
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/30 gap-1.5 font-semibold text-xs h-9 px-4"
          >
            <Plus className="w-4 h-4" /> Add Topic
          </Button>
        </div>
      </div>

      {/* Module Quick Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => handleModuleSelect('All Modules')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            filterModule === 'All Modules'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5'
          }`}
        >
          All Modules (324)
        </button>
        {CFA_MODULE_CONFIG.map((m) => {
          const isSelected = filterModule === m.fullName || filterModule === m.short;
          return (
            <button
              key={m.fullName}
              onClick={() => handleModuleSelect(m.fullName)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              <span>{m.short}</span>
            </button>
          );
        })}
      </div>

      {/* High-Impact Progress Analysis Dashboard */}
      <motion.div 
        layout 
        className="bg-gradient-to-r from-[#0d1424] via-[#090d17] to-[#05060a] border border-blue-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Progress Ring & Title */}
          <div className="flex items-center gap-5">
            <div className="shrink-0">
              <ProgressRing 
                progress={modulePct} 
                size={90} 
                strokeWidth={8} 
                color={modulePct >= 75 ? '#10b981' : modulePct >= 25 ? '#3b82f6' : '#ef4444'} 
                label={`${modulePct}%`} 
              />
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                  {isSpecificModule ? selectedConfig?.fullName : 'All CFA Curriculum Modules'}
                </h2>
                <Badge variant="outline" className="border-blue-500/40 text-blue-300 bg-blue-500/10 text-xs font-mono font-bold px-2.5 py-0.5">
                  {completedModuleTopics} / {totalModuleTopics} Topics
                </Badge>
              </div>

              {/* Progress Stage Distribution Bar */}
              <div className="space-y-1.5 max-w-lg">
                <div className="h-2.5 w-full bg-zinc-900 rounded-full overflow-hidden flex border border-white/5 shadow-inner">
                  <div style={{ width: `${(masteredCount / (totalModuleTopics || 1)) * 100}%` }} className="bg-emerald-500 h-full transition-all duration-500" title="Mastered" />
                  <div style={{ width: `${(revisedCount / (totalModuleTopics || 1)) * 100}%` }} className="bg-purple-500 h-full transition-all duration-500" title="Revised" />
                  <div style={{ width: `${(firstPassCount / (totalModuleTopics || 1)) * 100}%` }} className="bg-blue-500 h-full transition-all duration-500" title="First Pass Done" />
                  <div style={{ width: `${(notStartedCount / (totalModuleTopics || 1)) * 100}%` }} className="bg-zinc-800 h-full transition-all duration-500" title="Not Started" />
                </div>
                <div className="flex flex-wrap items-center gap-3.5 text-xs font-semibold text-zinc-300">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" /> Mastered: <strong className="text-emerald-400">{masteredCount}</strong></span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm" /> Revised: <strong className="text-purple-400">{revisedCount}</strong></span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm" /> First Pass: <strong className="text-blue-400">{firstPassCount}</strong></span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-zinc-700 shadow-sm" /> Pending: <strong className="text-zinc-400">{notStartedCount}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 4 Sleek Glass Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 shrink-0">
            <div className="bg-white/[0.04] border border-white/10 hover:border-blue-500/40 p-3.5 rounded-2xl min-w-[125px] transition-colors shadow-lg">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Completion</span>
              <span className="text-xl font-black text-white font-mono mt-0.5 block">{modulePct}%</span>
              <span className="text-[10px] text-emerald-400 font-medium block">{completedModuleTopics}/{totalModuleTopics} done</span>
            </div>
            <div className="bg-white/[0.04] border border-white/10 hover:border-blue-500/40 p-3.5 rounded-2xl min-w-[125px] transition-colors shadow-lg">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Study Hours</span>
              <span className="text-xl font-black text-blue-400 font-mono mt-0.5 block">{moduleHoursDone.toFixed(1)}h</span>
              <span className="text-[10px] text-zinc-400 font-medium block">of {moduleHoursTotal.toFixed(1)}h planned</span>
            </div>
            <div className="bg-white/[0.04] border border-white/10 hover:border-blue-500/40 p-3.5 rounded-2xl min-w-[125px] transition-colors shadow-lg">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Type Split</span>
              <span className="text-xl font-black text-purple-400 font-mono mt-0.5 block">{studyCount} / {reviewCount}</span>
              <span className="text-[10px] text-zinc-400 font-medium block">Study / Review</span>
            </div>
            <div className="bg-white/[0.04] border border-white/10 hover:border-blue-500/40 p-3.5 rounded-2xl min-w-[125px] transition-colors shadow-lg">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">High Priority</span>
              <span className="text-xl font-black text-rose-400 font-mono mt-0.5 block">{highPriorityIncomplete}</span>
              <span className="text-[10px] text-rose-300/80 font-medium block">pending action</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Filters Bar */}
      <div className="bg-[#0b0f19]/90 border border-white/10 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xl backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="w-4 h-4 text-blue-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input 
              type="text" 
              placeholder="Search topics or LOS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#111827] border-white/10 pl-9 text-xs rounded-xl focus-visible:ring-blue-500 text-white placeholder:text-zinc-500 h-8"
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[120px] bg-[#111827] border-white/10 text-xs rounded-xl h-8 text-zinc-300">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#111827] border-white/10 text-white text-xs">
              <SelectItem value="All">All Status</SelectItem>
              {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={filterRevision} onValueChange={setFilterRevision}>
            <SelectTrigger className="w-[135px] bg-[#111827] border-white/10 text-xs rounded-xl h-8 text-zinc-300">
              <SelectValue placeholder="Revision" />
            </SelectTrigger>
            <SelectContent className="bg-[#111827] border-white/10 text-white text-xs">
              <SelectItem value="All">All Revision</SelectItem>
              {REVISION_STATUSES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-[110px] bg-[#111827] border-white/10 text-xs rounded-xl h-8 text-zinc-300">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent className="bg-[#111827] border-white/10 text-white text-xs">
              <SelectItem value="All">All Priority</SelectItem>
              {PRIORITIES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[105px] bg-[#111827] border-white/10 text-xs rounded-xl h-8 text-zinc-300">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-[#111827] border-white/10 text-white text-xs">
              <SelectItem value="All">All Types</SelectItem>
              {ROW_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="text-xs text-zinc-400 font-medium shrink-0">
          Showing <strong className="text-white">{topics.length}</strong> items
        </div>
      </div>

      {/* Main Table - Internal Viewport Scroll Container so horizontal/vertical scrollbars are ALWAYS visible in viewport */}
      <div className="bg-[#0b0f19]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl">
        <div className="max-h-[600px] overflow-auto relative">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="sticky top-0 z-10 bg-[#0e1424] text-zinc-300 text-xs uppercase tracking-wider font-bold border-b border-white/10 shadow-sm">
              <tr>
                <th className="p-3.5 w-12 text-center">Done</th>
                <th className="p-3.5 w-24">Module</th>
                <th className="p-3.5 w-64">Chapter / Reading</th>
                <th className="p-3.5">Learning Outcome Statements (LOS)</th>
                <th className="p-3.5 w-20 text-center">Type</th>
                <th className="p-3.5 w-24 text-center">Priority</th>
                <th className="p-3.5 w-32 text-center">Status</th>
                <th className="p-3.5 w-36 text-center">Revision</th>
                <th className="p-3.5 w-28 text-center">Tasks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              <AnimatePresence>
                {isLoading ? (
                  <tr><td colSpan={9} className="p-12 text-center text-zinc-500 font-medium animate-pulse">Loading CFA topics...</td></tr>
                ) : topics.length === 0 ? (
                  <tr><td colSpan={9} className="p-12 text-center text-zinc-500 font-medium">No matching CFA topics found.</td></tr>
                ) : topics.map((topic) => {
                  const isDone = topic.completed || topic.status === 'Completed';
                  const modCfg = CFA_MODULE_CONFIG.find(c => c.fullName === topic.module || c.aliases?.includes(topic.module));
                  const modShort = modCfg?.short || topic.module;

                  return (
                    <motion.tr 
                      key={topic.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`hover:bg-white/[0.03] transition-colors group ${isDone ? 'bg-emerald-950/10' : ''}`}
                    >
                      {/* Done Checkbox */}
                      <td className="p-3 text-center">
                        <input 
                          type="checkbox" 
                          checked={isDone}
                          onChange={(e) => handleCompletedToggle(topic.id, e.target.checked)}
                          className="w-4 h-4 rounded border-zinc-700 text-blue-600 focus:ring-blue-500/50 bg-[#111827] cursor-pointer"
                        />
                      </td>

                      {/* Module Badge */}
                      <td className="p-3">
                        <Badge 
                          variant="outline" 
                          className="text-[10px] font-bold px-2 py-0.5 border-blue-500/30 text-blue-300 bg-blue-500/10 whitespace-nowrap"
                        >
                          {modShort}
                        </Badge>
                      </td>

                      {/* Chapter Title */}
                      <td className="p-3 font-semibold text-white">
                        <span className={isDone ? 'line-through text-zinc-400' : ''}>
                          {topic.chapter_topic}
                        </span>
                        {topic.planned_hours && (
                          <span className="block text-[10px] text-zinc-500 font-mono mt-0.5">
                            Est: {topic.planned_hours}h
                          </span>
                        )}
                      </td>

                      {/* Subtopic / LOS */}
                      <td className="p-3 text-xs text-zinc-300 leading-relaxed">
                        <span className="line-clamp-2 hover:line-clamp-none transition-all cursor-text">
                          {topic.subtopic_lo}
                        </span>
                      </td>

                      {/* Row Type */}
                      <td className="p-3 text-center">
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                          topic.row_type === 'STUDY' 
                            ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20' 
                            : 'bg-purple-500/15 text-purple-400 border border-purple-500/20'
                        }`}>
                          {topic.row_type}
                        </span>
                      </td>

                      {/* Priority */}
                      <td className="p-3 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          topic.priority === 'High'
                            ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            : topic.priority === 'Low'
                            ? 'bg-zinc-800 text-zinc-400'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        }`}>
                          {topic.priority || 'Medium'}
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="p-3 text-center">
                        <select 
                          value={topic.status || 'Not Started'} 
                          onChange={(e) => handleStatusChange(topic.id, e.target.value)}
                          className="bg-[#111827] border border-white/10 text-zinc-200 text-xs rounded-lg px-2 py-1 focus:border-blue-500 outline-none cursor-pointer"
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress ⏳</option>
                          <option value="Completed">Completed ✓</option>
                        </select>
                      </td>

                      {/* Revision Status Dropdown */}
                      <td className="p-3 text-center">
                        <select 
                          value={topic.revision_status || 'Not Started'} 
                          onChange={(e) => handleRevisionChange(topic.id, e.target.value)}
                          className={`text-xs rounded-lg px-2 py-1 border outline-none cursor-pointer font-medium ${
                            topic.revision_status === 'Mastered'
                              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40'
                              : topic.revision_status?.includes('Revised')
                              ? 'bg-purple-950/40 text-purple-300 border-purple-500/40'
                              : topic.revision_status === 'First Pass Done'
                              ? 'bg-blue-950/40 text-blue-300 border-blue-500/40'
                              : 'bg-[#111827] text-zinc-400 border-white/10'
                          }`}
                        >
                          {REVISION_STATUSES.map(r => <option key={r} value={r} className="bg-[#111827] text-white">{r}</option>)}
                        </select>
                      </td>

                      {/* Task Link Button */}
                      <td className="p-3 text-center">
                        <button 
                          onClick={() => toggleTaskLink(topic)}
                          className={`text-xs px-2.5 py-1 rounded-xl font-semibold transition-all shadow-sm ${
                            topic.linked_task_id 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40'
                            : 'bg-white/5 border border-white/10 text-zinc-300 hover:bg-blue-600 hover:text-white hover:border-blue-500'
                          }`}
                          title={topic.linked_task_id ? 'Linked in Task Manager (Click to unlink)' : 'Click to create a linked task in Task Manager'}
                        >
                          {topic.linked_task_id ? '✓ In Tasks' : '+ Task'}
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="p-3.5 border-t border-white/10 text-xs text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-2 bg-white/[0.02]">
          <span>Showing <strong>{topics.length}</strong> CFA learning topics</span>
          <div className="flex items-center gap-4 font-mono text-zinc-300">
            <span>Total Planned: <strong className="text-white">{moduleHoursTotal.toFixed(1)} hrs</strong></span>
            <span>•</span>
            <span>Mastered: <strong className="text-emerald-400">{masteredCount}</strong></span>
          </div>
        </div>
      </div>

      {/* Add CFA Topic Modal */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="sm:max-w-lg bg-[#0b0f19] border-blue-500/30 text-white rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              Add CFA Learning Topic
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateTopic} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase">CFA Curriculum Module</Label>
              <Select value={newModule} onValueChange={setNewModule}>
                <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#111827] border-white/10 text-white">
                  {CFA_MODULE_CONFIG.map(m => (
                    <SelectItem key={m.fullName} value={m.fullName}>
                      {m.fullName} ({m.weight})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase">Chapter / Reading Title</Label>
              <Input
                value={newChapter}
                onChange={(e) => setNewChapter(e.target.value)}
                placeholder="e.g. Yield Curves and Term Structure"
                required
                className="bg-[#111827] border-white/10 text-white rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase">Learning Outcome Statements (LOS)</Label>
              <Input
                value={newSubtopic}
                onChange={(e) => setNewSubtopic(e.target.value)}
                placeholder="Describe spot rates, forward rates, and yield spread analysis..."
                className="bg-[#111827] border-white/10 text-white rounded-xl"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-bold uppercase">Planned Hours</Label>
                <Input
                  type="number"
                  step="0.5"
                  value={newHours}
                  onChange={(e) => setNewHours(e.target.value)}
                  className="bg-[#111827] border-white/10 text-white rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-bold uppercase">Priority</Label>
                <Select value={newPriority} onValueChange={setNewPriority}>
                  <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111827] border-white/10 text-white">
                    {PRIORITIES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-bold uppercase">Type</Label>
                <Select value={newType} onValueChange={setNewType}>
                  <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111827] border-white/10 text-white">
                    {ROW_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setAddModalOpen(false)} className="text-zinc-400 hover:text-white rounded-xl">
                Cancel
              </Button>
              <Button type="submit" disabled={addTopicMutation.isPending} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold px-5 shadow-lg shadow-blue-600/30">
                {addTopicMutation.isPending ? 'Saving...' : 'Add Topic'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
