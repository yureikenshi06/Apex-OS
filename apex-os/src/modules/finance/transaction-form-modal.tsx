import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAddTransaction, useUpdateTransaction } from './hooks';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

interface TransactionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: any;
}

export default function TransactionFormModal({ isOpen, onClose, transaction }: TransactionFormModalProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      amount: '',
      description: '',
      category: '',
      payment_method: 'UPI',
      is_recurring: false,
      notes: '',
    }
  });

  const addMutation = useAddTransaction();
  const updateMutation = useUpdateTransaction();
  const type = watch('type');
  const isRecurring = watch('is_recurring');

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

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      amount: parseFloat(data.amount),
    };

    if (transaction) {
      updateMutation.mutate({ id: transaction.id, data: payload }, {
        onSuccess: () => {
          reset();
          onClose();
        }
      });
    } else {
      addMutation.mutate(payload, {
        onSuccess: () => {
          reset();
          onClose();
        }
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-zinc-950 border-zinc-800 text-zinc-100 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{transaction ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="flex gap-4 p-1 bg-zinc-900 rounded-lg w-full max-w-md">
            {['income', 'expense', 'transfer'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setValue('type', t)}
                className={`flex-1 py-2 text-sm font-medium rounded-md capitalize transition-colors ${type === t ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" {...register('date')} className="bg-zinc-900 border-zinc-800" required />
            </div>
            <div className="space-y-2">
              <Label>Amount (₹)</Label>
              <Input type="number" step="0.01" {...register('amount')} className="bg-zinc-900 border-zinc-800" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Input {...register('description')} className="bg-zinc-900 border-zinc-800" placeholder="What was this for?" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select onValueChange={(v) => setValue('category', v)} defaultValue={watch('category')}>
                <SelectTrigger className="bg-zinc-900 border-zinc-800"><SelectValue placeholder="Select Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Transport">Transport</SelectItem>
                  <SelectItem value="Housing">Housing</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Salary">Salary</SelectItem>
                  <SelectItem value="Investment">Investment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select onValueChange={(v) => setValue('payment_method', v)} defaultValue={watch('payment_method')}>
                <SelectTrigger className="bg-zinc-900 border-zinc-800"><SelectValue placeholder="Method" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Debit Card">Debit Card</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Net Banking">Net Banking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <div>
              <p className="font-medium">Recurring Transaction</p>
              <p className="text-sm text-zinc-400">Does this happen regularly?</p>
            </div>
            <Switch checked={isRecurring} onCheckedChange={(c) => setValue('is_recurring', c)} />
          </div>

          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea {...register('notes')} className="bg-zinc-900 border-zinc-800 min-h-[80px]" placeholder="Optional notes..." />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
            <Button type="button" variant="ghost" onClick={onClose} className="text-zinc-400 hover:text-white">Cancel</Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white" disabled={addMutation.isPending || updateMutation.isPending}>
              {transaction ? 'Save Changes' : 'Add Transaction'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
