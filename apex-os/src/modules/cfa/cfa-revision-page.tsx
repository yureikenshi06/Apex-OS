import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  useCFARevisionPlan, useAddRevisionItem, useUpdateRevisionItem, 
  useDeleteRevisionItem, CFA_MODULE_CONFIG 
} from './hooks';
import { 
  RefreshCw, Plus, Trash2, ArrowLeft, CheckCircle2, 
  Sparkles, Award, Target, BookOpen 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const REVISION_ROUNDS = [
  'Round 1: First Pass Formula & Formula Book Drilling',
  'Round 2: End-of-Reading Item Sets & Question Bank',
  'Round 3: High-Weight Module Drilling (Ethics + FSA + Fixed Income)',
  'Round 4: Full CFA Mock Exams & Time Management',
];

export default function CFARevisionPage() {
  const { data: plan = [], isLoading } = useCFARevisionPlan();
  const addMutation = useAddRevisionItem();
  const updateMutation = useUpdateRevisionItem();
  const deleteMutation = useDeleteRevisionItem();
  const navigate = useNavigate();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [round, setRound] = useState(REVISION_ROUNDS[0]);
  const [moduleName, setModuleName] = useState(CFA_MODULE_CONFIG[0].fullName);
  const [activity, setActivity] = useState('');
  const [hours, setHours] = useState('3.0');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim()) return;

    await addMutation.mutateAsync({
      revision_round: round,
      module: moduleName,
      activity,
      planned_hours: parseFloat(hours) || 3.0,
      status: 'Not Started',
    });
    setActivity('');
    setModalOpen(false);
  };

  const rounds = Array.from(new Set(plan.map(p => p.revision_round)));
  if (rounds.length === 0 && !isLoading) {
    // Show default structure
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto text-foreground font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => navigate('/cfa')} 
              variant="ghost" 
              size="sm" 
              className="p-1.5 h-8 text-zinc-400 hover:text-white rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl font-black text-white tracking-tight">CFA Revision Plan</h1>
            <Badge variant="secondary" className="bg-red-900/50 text-red-200 border-red-700/50 font-bold px-2.5">
              February 2027
            </Badge>
          </div>
        </div>

        <Button 
          onClick={() => setModalOpen(true)}
          className="bg-red-600 hover:bg-red-500 text-white rounded-xl shadow-lg shadow-red-600/30 gap-1.5 font-semibold"
        >
          <Plus className="w-4 h-4" /> Add Revision Task
        </Button>
      </div>

      {/* Rounds Container */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="p-12 text-center text-zinc-500 font-medium animate-pulse">Loading revision plan...</div>
        ) : rounds.length === 0 ? (
          <div className="bg-[#0b0f19]/90 border border-blue-500/20 rounded-3xl p-12 text-center space-y-4 shadow-2xl backdrop-blur-xl">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto shadow-inner">
              <RefreshCw className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-white">No CFA Revision Tasks Yet</h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Plan out your February 2027 revision sprints, end-of-reading item set drilling, and mock test schedules.
            </p>
            <Button onClick={() => setModalOpen(true)} className="bg-red-600 hover:bg-red-500 text-white rounded-xl">
              <Plus className="w-4 h-4 mr-1.5" /> Create First Revision Sprint
            </Button>
          </div>
        ) : (
          rounds.map((rName) => {
            const items = plan.filter(p => p.revision_round === rName);
            const completedCount = items.filter(i => i.status === 'Completed').length;
            const pct = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

            return (
              <motion.div 
                key={rName}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0b0f19]/90 border border-blue-500/20 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl"
              >
                {/* Round Header */}
                <div className="p-5 border-b border-white/10 bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-black text-white flex items-center gap-2">
                      <Target className="w-4 h-4 text-red-400" />
                      {rName}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-zinc-400">
                      {completedCount} / {items.length} done ({pct}%)
                    </span>
                    <div className="w-28 h-2 bg-zinc-800 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-gradient-to-r from-red-500 to-blue-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-white/5">
                  {items.map((item) => {
                    const isDone = item.status === 'Completed';
                    return (
                      <div key={item.id} className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors ${isDone ? 'bg-emerald-950/10' : ''}`}>
                        <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={(e) => updateMutation.mutate({ id: item.id, updates: { status: e.target.checked ? 'Completed' : 'In Progress' } })}
                            className="w-4 h-4 rounded border-zinc-700 text-red-600 focus:ring-red-500/50 bg-[#111827] cursor-pointer mt-0.5 sm:mt-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-bold ${isDone ? 'line-through text-zinc-500' : 'text-white'}`}>
                                {item.activity}
                              </span>
                              {item.module && (
                                <Badge variant="outline" className="text-[10px] bg-blue-500/10 border-blue-500/30 text-blue-300">
                                  {item.module}
                                </Badge>
                              )}
                            </div>
                            {item.weak_areas && (
                              <p className="text-xs text-rose-400 mt-1 font-medium">
                                Weak Areas: {item.weak_areas}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-7 sm:ml-0">
                          {item.planned_hours && (
                            <span className="text-xs font-mono text-zinc-400 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                              {item.planned_hours} hrs
                            </span>
                          )}
                          <select
                            value={item.status || 'Not Started'}
                            onChange={(e) => updateMutation.mutate({ id: item.id, updates: { status: e.target.value } })}
                            className="bg-[#111827] border border-white/10 text-zinc-200 text-xs rounded-lg px-2.5 py-1 focus:border-red-500 outline-none"
                          >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress ⏳</option>
                            <option value="Completed">Completed ✓</option>
                          </select>
                          <button
                            onClick={() => deleteMutation.mutate(item.id)}
                            className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Add Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md bg-[#0b0f19] border-red-500/30 text-white rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-white flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-red-400" />
              Add CFA Revision Task
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAdd} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase">Revision Sprint / Round</Label>
              <Select value={round} onValueChange={setRound}>
                <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#111827] border-white/10 text-white">
                  {REVISION_ROUNDS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase">Curriculum Module</Label>
              <Select value={moduleName} onValueChange={setModuleName}>
                <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#111827] border-white/10 text-white">
                  {CFA_MODULE_CONFIG.map(m => (
                    <SelectItem key={m.fullName} value={m.fullName}>
                      {m.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase">Revision Activity</Label>
              <Input
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder="e.g. Solve 80 FSA item sets on Inventory & Long-lived assets"
                required
                className="bg-[#111827] border-white/10 text-white rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase">Planned Revision Hours</Label>
              <Input
                type="number"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="bg-[#111827] border-white/10 text-white rounded-xl"
              />
            </div>

            <DialogFooter className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-white rounded-xl">
                Cancel
              </Button>
              <Button type="submit" disabled={addMutation.isPending} className="bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold px-5 shadow-lg shadow-red-600/30">
                {addMutation.isPending ? 'Saving...' : 'Add Revision Task'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
