import React, { useState } from 'react';
import { usePeopleSplits, useAddSplit, useUpdateSplit, useDeleteSplit } from './hooks';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, Plus, CheckCircle2, Trash2, Edit2, ArrowLeft, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function SplitsPage() {
  const navigate = useNavigate();
  const { data: splits = [], isLoading } = usePeopleSplits();
  const addSplit = useAddSplit();
  const updateSplit = useUpdateSplit();
  const deleteSplit = useDeleteSplit();

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [personName, setPersonName] = useState('');
  const [direction, setDirection] = useState('owed_to_me');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const owedToMe = (splits as any[]).filter(s => s.direction === 'owed_to_me' && !s.settled);
  const iOwe = (splits as any[]).filter(s => s.direction === 'i_owe' && !s.settled);
  const settled = (splits as any[]).filter(s => s.settled);

  const totalOwedToMe = owedToMe.reduce((sum, s) => sum + Number(s.amount || 0), 0);
  const totalIOwe = iOwe.reduce((sum, s) => sum + Number(s.amount || 0), 0);
  const netBalance = totalOwedToMe - totalIOwe;

  const handleOpenAdd = () => {
    setEditItem(null);
    setPersonName(''); setDescription(''); setAmount('');
    setDirection('owed_to_me'); setNotes('');
    setModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditItem(item);
    setPersonName(item.person_name || '');
    setDirection(item.direction || 'owed_to_me');
    setDescription(item.description || '');
    setAmount(item.amount?.toString() || '');
    setNotes(item.notes || '');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName.trim() || !amount) return;

    const payload: any = {
      person_name: personName,
      direction,
      description: description || null,
      amount: parseFloat(amount),
      outstanding: parseFloat(amount),
      settled: false,
      notes: notes || null,
    };

    if (editItem) {
      await updateSplit.mutateAsync({ id: editItem.id, data: payload });
    } else {
      await addSplit.mutateAsync(payload);
    }
    setModalOpen(false);
  };

  const handleSettle = (id: string) => {
    updateSplit.mutate({ id, data: { settled: true, outstanding: 0 } });
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this split?')) {
      deleteSplit.mutate(id);
    }
  };

  const SplitCard = ({ split, color }: { split: any, color: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-[#0b0f19]/80 border border-${color}-500/20 rounded-2xl p-4 shadow-xl group hover:border-${color}-500/40 transition-colors`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-white text-base">{split.person_name}</h4>
          <p className="text-xs text-zinc-400 mt-0.5">{split.description || 'Split expense'}</p>
        </div>
        <span className={`text-lg font-black font-mono text-${color}-400`}>
          ₹{Number(split.amount).toLocaleString()}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
        <Button 
          size="sm" variant="ghost" 
          className="text-emerald-400 hover:bg-emerald-500/20 rounded-lg text-xs h-7 px-2.5"
          onClick={() => handleSettle(split.id)}
        >
          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Settle
        </Button>
        <button onClick={() => handleOpenEdit(split)} className="p-1.5 rounded-lg hover:bg-blue-500/20 text-zinc-400 hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all">
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => handleDelete(split.id)} className="p-1.5 rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button onClick={() => navigate('/finance')} variant="ghost" size="sm" className="p-1.5 h-8 text-zinc-400 hover:text-white rounded-lg">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-black text-white tracking-tight">Splits & Debts</h1>
        </div>
        <Button onClick={handleOpenAdd} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/30 gap-1.5 font-bold">
          <Plus className="w-4 h-4" /> Add Split
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0b0f19]/80 border border-emerald-500/20 rounded-2xl p-5 shadow-xl">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1"><ArrowUpRight className="w-3 h-3 text-emerald-400" /> Owed to Me</span>
          <p className="text-2xl font-black text-emerald-400 font-mono mt-1">₹{totalOwedToMe.toLocaleString()}</p>
          <span className="text-xs text-zinc-500">{owedToMe.length} pending</span>
        </div>
        <div className="bg-[#0b0f19]/80 border border-rose-500/20 rounded-2xl p-5 shadow-xl">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1"><ArrowDownRight className="w-3 h-3 text-rose-400" /> I Owe</span>
          <p className="text-2xl font-black text-rose-400 font-mono mt-1">₹{totalIOwe.toLocaleString()}</p>
          <span className="text-xs text-zinc-500">{iOwe.length} pending</span>
        </div>
        <div className="bg-[#0b0f19]/80 border border-blue-500/20 rounded-2xl p-5 shadow-xl">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Net Balance</span>
          <p className={`text-2xl font-black font-mono mt-1 ${netBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {netBalance >= 0 ? '+' : ''}₹{netBalance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Owed to Me */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4" /> Owed to Me ({owedToMe.length})
          </h3>
          {owedToMe.length === 0 ? (
            <p className="text-zinc-500 text-sm text-center py-8 bg-white/[0.02] rounded-2xl border border-white/5">No one owes you anything right now.</p>
          ) : (
            <div className="space-y-3">
              {owedToMe.map(s => <SplitCard key={s.id} split={s} color="emerald" />)}
            </div>
          )}
        </div>

        {/* I Owe */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4" /> I Owe ({iOwe.length})
          </h3>
          {iOwe.length === 0 ? (
            <p className="text-zinc-500 text-sm text-center py-8 bg-white/[0.02] rounded-2xl border border-white/5">You don't owe anything right now.</p>
          ) : (
            <div className="space-y-3">
              {iOwe.map(s => <SplitCard key={s.id} split={s} color="rose" />)}
            </div>
          )}
        </div>
      </div>

      {/* Settled History */}
      {settled.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Settled ({settled.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {settled.slice(0, 6).map((s: any) => (
              <div key={s.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium text-zinc-400">{s.person_name}</span>
                  <span className="text-xs text-zinc-600 block">{s.description}</span>
                </div>
                <span className="text-sm font-mono text-zinc-500 line-through">₹{Number(s.amount).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md bg-[#0b0f19] border-blue-500/30 text-white rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              {editItem ? 'Edit Split' : 'Add Split'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Person Name</Label>
              <Input value={personName} onChange={(e) => setPersonName(e.target.value)} placeholder="e.g. Rahul, Priya" required className="bg-[#111827] border-white/10 text-white rounded-xl" />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Direction</Label>
              <Select value={direction} onValueChange={setDirection}>
                <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-[#111827] border-white/10 text-white">
                  <SelectItem value="owed_to_me">They owe me</SelectItem>
                  <SelectItem value="i_owe">I owe them</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Amount (₹)</Label>
                <Input type="number" step="1" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="500" required className="bg-[#111827] border-white/10 text-white rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Description</Label>
                <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Dinner split" className="bg-[#111827] border-white/10 text-white rounded-xl" />
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-white rounded-xl">Cancel</Button>
              <Button type="submit" disabled={addSplit.isPending || updateSplit.isPending} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold px-6 shadow-lg shadow-blue-600/30">
                {editItem ? 'Save' : 'Add Split'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
