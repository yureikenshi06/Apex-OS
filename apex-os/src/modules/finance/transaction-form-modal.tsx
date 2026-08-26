import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAddTransaction, useUpdateTransaction } from './hooks';
import { useFinanceCategories } from './category-store';
import CategoryManagerModal from './category-manager-modal';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Settings, Plus } from 'lucide-react';

const PAYMENT_METHODS = ['Cash', 'UPI', 'Debit Card', 'Credit Card', 'Net Banking', 'Wallet', 'Bank Transfer', 'Other'];
const ACCOUNTS = ['Bank Account', 'Cash', 'Credit Card', 'UPI', 'Digital Wallet', 'Investment Account', 'Other'];
const ASSIGNED_TO = ['Self', 'Family', 'Friend', 'Roommate', 'College', 'Work', 'Business', 'Other'];
const NEED_WANT = ['Need', 'Want'];
const ESSENTIAL_DISC = ['Essential', 'Discretionary'];
const RECURRING_FREQ = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'];

interface TransactionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: any;
}

export default function TransactionFormModal({ isOpen, onClose, transaction }: TransactionFormModalProps) {
  const { categories, addSubcategory } = useFinanceCategories();
  const [managerOpen, setManagerOpen] = useState(false);
  const [isQuickAddingSubcat, setIsQuickAddingSubcat] = useState(false);
  const [quickSubcatText, setQuickSubcatText] = useState('');

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      transaction_type: 'Expense',
      date: new Date().toISOString().split('T')[0],
      amount: '',
      description: '',
      category: '',
      subcategory: '',
      payment_method: 'UPI',
      account_wallet: 'Bank Account',
      assigned_to: 'Self',
      need_want: 'Need',
      essential_discretionary: 'Essential',
      is_recurring: false,
      recurring_frequency: '',
      notes: '',
      merchant_payee: '',
    }
  });

  const addMutation = useAddTransaction();
  const updateMutation = useUpdateTransaction();
  const txType = (watch('transaction_type') || 'Expense') as 'Expense' | 'Income' | 'Transfer';
  const category = watch('category');
  const isRecurring = watch('is_recurring');

  const categoryMap = categories[txType] || {};
  const categoryOptions = Object.keys(categoryMap);
  const subcategoryOptions = category ? (categoryMap[category] || []) : [];

  useEffect(() => {
    if (transaction) {
      Object.keys(transaction).forEach((key) => {
        setValue(key as any, transaction[key]);
      });
      if (transaction.date) setValue('date', new Date(transaction.date).toISOString().split('T')[0]);
    } else {
      reset();
      setValue('date', new Date().toISOString().split('T')[0]);
    }
  }, [transaction, isOpen, reset, setValue]);

  // When type changes, reset category + subcategory if not editing
  useEffect(() => {
    if (!transaction && isOpen) {
      const firstCat = categoryOptions[0] || '';
      setValue('category', firstCat);
      setValue('subcategory', '');
    }
  }, [txType, isOpen]);

  const handleQuickAddSubcat = () => {
    if (quickSubcatText.trim() && category) {
      addSubcategory(txType, category, quickSubcatText.trim());
      setValue('subcategory', quickSubcatText.trim());
      setQuickSubcatText('');
      setIsQuickAddingSubcat(false);
    }
  };

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      amount: parseFloat(data.amount),
      paid_by_me: parseFloat(data.amount),
      my_share: parseFloat(data.amount),
    };

    if (transaction) {
      updateMutation.mutate({ id: transaction.id, data: payload }, {
        onSuccess: () => { reset(); onClose(); }
      });
    } else {
      addMutation.mutate(payload, {
        onSuccess: () => { reset(); onClose(); }
      });
    }
  };

  const typeColors: Record<string, string> = {
    'Expense': 'bg-rose-600/90 text-white shadow-rose-600/40',
    'Income': 'bg-emerald-600/90 text-white shadow-emerald-600/40',
    'Transfer': 'bg-blue-600/90 text-white shadow-blue-600/40',
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="bg-[#0b0f19] border-blue-500/30 text-white max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-white">
              {transaction ? 'Edit Transaction' : 'Add Transaction'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-2">
            {/* Transaction Type Tabs */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
              {(['Expense', 'Income', 'Transfer'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setValue('transaction_type', t)}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                    txType === t ? typeColors[t] + ' shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t === 'Expense' ? '↓ Expense' : t === 'Income' ? '↑ Income' : '⇆ Transfer'}
                </button>
              ))}
            </div>

            {/* Row 1: Date + Amount */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Date</Label>
                <Input type="date" {...register('date')} className="bg-[#111827] border-white/10 text-white rounded-xl" required />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Amount (₹)</Label>
                <Input type="number" step="0.01" {...register('amount')} className="bg-[#111827] border-white/10 text-white rounded-xl text-lg font-mono font-bold" placeholder="0.00" required />
              </div>
            </div>

            {/* Row 2: Description + Merchant */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Description</Label>
                <Input {...register('description')} className="bg-[#111827] border-white/10 text-white rounded-xl" placeholder="What was this for?" required />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Merchant / Payee</Label>
                <Input {...register('merchant_payee')} className="bg-[#111827] border-white/10 text-white rounded-xl" placeholder="e.g. Swiggy, Amazon" />
              </div>
            </div>

            {/* Row 3: Category + Subcategory (Dynamic with Manage/Edit capability) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Category</Label>
                  <button
                    type="button"
                    onClick={() => setManagerOpen(true)}
                    className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                  >
                    <Settings className="w-3 h-3" /> Edit Categories
                  </button>
                </div>
                <Select value={watch('category')} onValueChange={(v) => setValue('category', v)}>
                  <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111827] border-white/10 text-white">
                    {categoryOptions.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Subcategory</Label>
                  <button
                    type="button"
                    onClick={() => setIsQuickAddingSubcat(!isQuickAddingSubcat)}
                    className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-0.5"
                  >
                    <Plus className="w-3 h-3" /> New
                  </button>
                </div>

                {isQuickAddingSubcat ? (
                  <div className="flex gap-1.5">
                    <Input
                      value={quickSubcatText}
                      onChange={(e) => setQuickSubcatText(e.target.value)}
                      placeholder="Subcategory name..."
                      className="bg-[#111827] border-blue-500/40 text-white rounded-xl h-9 text-xs"
                      autoFocus
                    />
                    <Button
                      type="button"
                      onClick={handleQuickAddSubcat}
                      className="bg-blue-600 text-white rounded-xl h-9 px-3 text-xs"
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <Select value={watch('subcategory')} onValueChange={(v) => setValue('subcategory', v)}>
                    <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl">
                      <SelectValue placeholder={category ? 'Select Subcategory' : 'Pick category first'} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111827] border-white/10 text-white">
                      {subcategoryOptions.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* Row 4: Payment Method + Account */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Payment Method</Label>
                <Select value={watch('payment_method')} onValueChange={(v) => setValue('payment_method', v)}>
                  <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl">
                    <SelectValue placeholder="Method" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111827] border-white/10 text-white">
                    {PAYMENT_METHODS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Account / Wallet</Label>
                <Select value={watch('account_wallet')} onValueChange={(v) => setValue('account_wallet', v)}>
                  <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl">
                    <SelectValue placeholder="Account" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111827] border-white/10 text-white">
                    {ACCOUNTS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 5: Assigned To + Need/Want + Essential/Discretionary (Only for Expense) */}
            {txType === 'Expense' && (
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Assigned To</Label>
                  <Select value={watch('assigned_to')} onValueChange={(v) => setValue('assigned_to', v)}>
                    <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111827] border-white/10 text-white">
                      {ASSIGNED_TO.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Need / Want</Label>
                  <Select value={watch('need_want')} onValueChange={(v) => setValue('need_want', v)}>
                    <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111827] border-white/10 text-white">
                      {NEED_WANT.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Essential / Disc.</Label>
                  <Select value={watch('essential_discretionary')} onValueChange={(v) => setValue('essential_discretionary', v)}>
                    <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111827] border-white/10 text-white">
                      {ESSENTIAL_DISC.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Recurring toggle */}
            <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/10">
              <div>
                <p className="font-semibold text-sm text-white">Recurring Transaction</p>
                <p className="text-xs text-zinc-400">Does this happen regularly?</p>
              </div>
              <Switch checked={isRecurring} onCheckedChange={(c) => setValue('is_recurring', c)} />
            </div>

            {isRecurring && (
              <div className="space-y-1.5">
                <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Recurring Frequency</Label>
                <Select value={watch('recurring_frequency')} onValueChange={(v) => setValue('recurring_frequency', v)}>
                  <SelectTrigger className="bg-[#111827] border-white/10 text-white rounded-xl">
                    <SelectValue placeholder="Frequency" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111827] border-white/10 text-white">
                    {RECURRING_FREQ.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Notes */}
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Notes</Label>
              <Textarea {...register('notes')} className="bg-[#111827] border-white/10 text-white rounded-xl min-h-[70px]" placeholder="Optional notes..." />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <Button type="button" variant="ghost" onClick={onClose} className="text-zinc-400 hover:text-white rounded-xl">Cancel</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold px-6 shadow-lg shadow-blue-600/30" disabled={addMutation.isPending || updateMutation.isPending}>
                {transaction ? 'Save Changes' : 'Add Transaction'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Category Manager Modal */}
      <CategoryManagerModal
        isOpen={managerOpen}
        onClose={() => setManagerOpen(false)}
        defaultType={txType}
        defaultCategory={category}
      />
    </>
  );
}
