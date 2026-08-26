import React, { useState } from 'react';
import { useRecurringExpenses, useAddRecurring, useUpdateRecurring, useDeleteRecurring, useMarkRecurringPaid } from './hooks';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, CheckCircle, Clock, Trash2, Edit2, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['Housing', 'Transport', 'Entertainment', 'Subscriptions', 'Education', 'Health', 'Finance', 'Food', 'Utilities', 'Other'];
const FREQUENCIES = ['Monthly', 'Quarterly', 'Yearly', 'Weekly'];
const PAYMENT_METHODS = ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash', 'Auto-Debit'];

export default function RecurringPage() {
  const navigate = useNavigate();
  const { data: recurring = [], isLoading } = useRecurringExpenses();
  const addMutation = useAddRecurring();
  const updateMutation = useUpdateRecurring();
  const deleteMutation = useDeleteRecurring();
  const markPaidMutation = useMarkRecurringPaid();

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Subscriptions');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('Monthly');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [nextDue, setNextDue] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleOpenAdd = () => {
    setEditItem(null);
    setName(''); setAmount(''); setCategory('Subscriptions');
    setFrequency('Monthly'); setPaymentMethod('UPI'); setNotes('');
    setNextDue(new Date().toISOString().split('T')[0]);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditItem(item);
    setName(item.expense_name || '');
    setAmount(item.amount?.toString() || '');
    setCategory(item.category || 'Other');
    setFrequency(item.frequency || 'Monthly');
    setPaymentMethod(item.payment_method || 'UPI');
    setNextDue(item.next_due_date || new Date().toISOString().split('T')[0]);
    setNotes(item.notes || '');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !amount) return;

    const payload: any = {
      expense_name: name,
      category,
      amount: parseFloat(amount),
      frequency,
      payment_method: paymentMethod,
      next_due_date: nextDue,
      notes: notes || null,
      is_active: true,
      start_date: new Date().toISOString().split('T')[0],
    };

    if (editItem) {
      await updateMutation.mutateAsync({ id: editItem.id, data: payload });
    } else {
      await addMutation.mutateAsync(payload);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this recurring expense?')) {
      deleteMutation.mutate(id);
    }
  };

  const totalMonthly = recurring.reduce((sum: number, r: any) => {
    const amt = Number(r.amount) || 0;
    if (r.frequency === 'Monthly') return sum + amt;
    if (r.frequency === 'Quarterly') return sum + amt / 3;
    if (r.frequency === 'Yearly') return sum + amt / 12;
    if (r.frequency === 'Weekly') return sum + amt * 4.33;
    return sum + amt;
  }, 0);

  const dueSoon = recurring.filter((r: any) => {
    const dueDate = new Date(r.next_due_date);
    return dueDate.getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000;
  });

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button onClick={() => navigate('/finance')} variant="ghost" size="sm" className="p-1.5 h-8 text-zinc-400 hover:text-white rounded-lg">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-black text-white tracking-tight">Recurring & Subscriptions</h1>
        </div>
        <Button onClick={handleOpenAdd} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/30 gap-1.5 font-bold">
          <Plus className="w-4 h-4" /> Add Recurring
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0b0f19]/80 border border-white/10 rounded-2xl p-5 shadow-xl">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Monthly Commitment</span>
          <p className="text-2xl font-black text-white font-mono mt-1">₹{totalMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="bg-[#0b0f19]/80 border border-white/10 rounded-2xl p-5 shadow-xl">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Active Subscriptions</span>
          <p className="text-2xl font-black text-blue-400 font-mono mt-1">{recurring.length}</p>
        </div>
        <div className="bg-[#0b0f19]/80 border border-white/10 rounded-2xl p-5 shadow-xl">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Due This Week</span>
          <p className="text-2xl font-black text-amber-400 font-mono mt-1">{dueSoon.length}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0b0f19]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl">
        <div className="max-h-[500px] overflow-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="sticky top-0 z-10 bg-[#0e1424] text-zinc-300 text-xs uppercase tracking-wider font-bold border-b border-white/10">
              <tr>
                <th className="p-3.5">Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Frequency</th>
                <th className="p-3.5 text-right">Amount</th>
                <th className="p-3.5">Payment</th>
                <th className="p-3.5">Next Due</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {isLoading ? (
                <tr><td colSpan={7} className="p-12 text-center text-zinc-500 animate-pulse">Loading...</td></tr>
              ) : recurring.length === 0 ? (
                <tr><td colSpan={7} className="p-12 text-center text-zinc-500">No recurring expenses. Add your first subscription or bill.</td></tr>
              ) : (
                recurring.map((item: any, idx: number) => {
                  const isDueSoon = new Date(item.next_due_date).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000;
                  const isOverdue = new Date(item.next_due_date).getTime() < Date.now();
                  return (
                    <motion.tr 
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className="hover:bg-white/[0.03] transition-colors group"
                    >
                      <td className="p-3.5 font-semibold text-white">{item.expense_name}</td>
                      <td className="p-3.5">
                        <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300">{item.category}</span>
                      </td>
                      <td className="p-3.5 text-zinc-400 capitalize">{item.frequency}</td>
                      <td className="p-3.5 text-right font-bold text-white font-mono">₹{Number(item.amount).toLocaleString()}</td>
                      <td className="p-3.5 text-zinc-400">{item.payment_method || '—'}</td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          {isOverdue && <AlertCircle className="w-3.5 h-3.5 text-red-400" />}
                          {isDueSoon && !isOverdue && <Clock className="w-3.5 h-3.5 text-amber-400" />}
                          <span className={isOverdue ? 'text-red-400 font-semibold' : isDueSoon ? 'text-amber-400 font-medium' : 'text-zinc-400'}>
                            {new Date(item.next_due_date).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button 
                            size="sm" variant="ghost"
                            className="text-emerald-400 hover:bg-emerald-500/20 rounded-lg text-xs h-7 px-2"
                            onClick={() => markPaidMutation.mutate(item.id)}
                            disabled={markPaidMutation.isPending}
                          >
                            <CheckCircle className="w-3.5 h-3.5 mr-1" /> Paid
                          </Button>
                          <button onClick={() => handleOpenEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-500/20 text-zinc-400 hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-lg bg-[#0b0f19] border-blue-500/30 text-white rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-white flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-blue-400" />
              {editItem ? 'Edit Recurring Expense' : 'Add Recurring Expense'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2">
                <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Expense Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Netflix, Gym Membership" required className="bg-[#111827] border-white/10 text-white rounded-xl" />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#111827] border-white/10 text-white">
                    {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Amount (₹)</Label>
                <Input type="number" step="1" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="499" required className="bg-[#111827] border-white/10 text-white rounded-xl" />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#111827] border-white/10 text-white">
                    {FREQUENCIES.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#111827] border-white/10 text-white">
                    {PAYMENT_METHODS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Next Due Date</Label>
                <Input type="date" value={nextDue} onChange={(e) => setNextDue(e.target.value)} className="bg-[#111827] border-white/10 text-white rounded-xl" />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Notes</Label>
                <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional" className="bg-[#111827] border-white/10 text-white rounded-xl" />
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-white rounded-xl">Cancel</Button>
              <Button type="submit" disabled={addMutation.isPending || updateMutation.isPending} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold px-6 shadow-lg shadow-blue-600/30">
                {editItem ? 'Save' : 'Add Recurring'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
