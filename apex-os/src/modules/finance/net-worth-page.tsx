import React, { useState } from 'react';
import { useNetWorthEntries, useAddNetWorthEntry, useUpdateNetWorthEntry, useDeleteNetWorthEntry } from './hooks';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Wallet, TrendingUp, ArrowLeft, Trash2, Edit2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function NetWorthPage() {
  const navigate = useNavigate();
  const { data: entries = [], isLoading } = useNetWorthEntries();
  const addEntry = useAddNetWorthEntry();
  const updateEntry = useUpdateNetWorthEntry();
  const deleteEntry = useDeleteNetWorthEntry();

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [monthDate, setMonthDate] = useState(new Date().toISOString().slice(0, 7) + '-01');
  const [bank, setBank] = useState('');
  const [cash, setCash] = useState('');
  const [investments, setInvestments] = useState('');
  const [otherAssets, setOtherAssets] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [loans, setLoans] = useState('');
  const [otherLiabilities, setOtherLiabilities] = useState('');

  const chartData = [...entries].map((e: any) => ({
    date: new Date(e.month_date || e.date || new Date()).toLocaleDateString(undefined, { month: 'short', year: '2-digit' }),
    assets: Number(e.total_assets) || (Number(e.bank || 0) + Number(e.cash || 0) + Number(e.investments || 0) + Number(e.other_assets || 0)),
    liabilities: Number(e.total_liabilities) || (Number(e.credit_card || 0) + Number(e.loans || 0) + Number(e.other_liabilities || 0)),
    netWorth: Number(e.net_worth) || ((Number(e.bank || 0) + Number(e.cash || 0) + Number(e.investments || 0) + Number(e.other_assets || 0)) - (Number(e.credit_card || 0) + Number(e.loans || 0) + Number(e.other_liabilities || 0))),
  }));

  const latest = entries[entries.length - 1] || {};
  const totalAssets = Number(latest.total_assets) || (Number(latest.bank || 0) + Number(latest.cash || 0) + Number(latest.investments || 0) + Number(latest.other_assets || 0));
  const totalLiabilities = Number(latest.total_liabilities) || (Number(latest.credit_card || 0) + Number(latest.loans || 0) + Number(latest.other_liabilities || 0));
  const currentNW = totalAssets - totalLiabilities;

  const handleOpenAdd = () => {
    setEditItem(null);
    setMonthDate(new Date().toISOString().slice(0, 7) + '-01');
    setBank(''); setCash(''); setInvestments(''); setOtherAssets('');
    setCreditCard(''); setLoans(''); setOtherLiabilities('');
    setModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditItem(item);
    setMonthDate(item.month_date || '');
    setBank(item.bank?.toString() || '0');
    setCash(item.cash?.toString() || '0');
    setInvestments(item.investments?.toString() || '0');
    setOtherAssets(item.other_assets?.toString() || '0');
    setCreditCard(item.credit_card?.toString() || '0');
    setLoans(item.loans?.toString() || '0');
    setOtherLiabilities(item.other_liabilities?.toString() || '0');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      month_date: monthDate,
      bank: parseFloat(bank) || 0,
      cash: parseFloat(cash) || 0,
      investments: parseFloat(investments) || 0,
      other_assets: parseFloat(otherAssets) || 0,
      credit_card: parseFloat(creditCard) || 0,
      loans: parseFloat(loans) || 0,
      other_liabilities: parseFloat(otherLiabilities) || 0,
    };

    if (editItem) {
      await updateEntry.mutateAsync({ id: editItem.id, data: payload });
    } else {
      await addEntry.mutateAsync(payload);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this net worth entry?')) {
      deleteEntry.mutate(id);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button onClick={() => navigate('/finance')} variant="ghost" size="sm" className="p-1.5 h-8 text-zinc-400 hover:text-white rounded-lg">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-black text-white tracking-tight">Net Worth Tracker</h1>
        </div>
        <Button onClick={handleOpenAdd} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/30 gap-1.5 font-bold">
          <Plus className="w-4 h-4" /> Add Monthly Snapshot
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0b0f19]/80 border border-emerald-500/20 rounded-2xl p-5 shadow-xl">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Total Assets</span>
          <p className="text-2xl font-black text-emerald-400 font-mono mt-1">₹{totalAssets.toLocaleString()}</p>
        </div>
        <div className="bg-[#0b0f19]/80 border border-rose-500/20 rounded-2xl p-5 shadow-xl">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Total Liabilities</span>
          <p className="text-2xl font-black text-rose-400 font-mono mt-1">₹{totalLiabilities.toLocaleString()}</p>
        </div>
        <div className="bg-[#0b0f19]/80 border border-blue-500/20 rounded-2xl p-5 shadow-xl">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Net Worth</span>
          <p className={`text-2xl font-black font-mono mt-1 ${currentNW >= 0 ? 'text-blue-400' : 'text-rose-400'}`}>₹{currentNW.toLocaleString()}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-[#0b0f19]/80 border border-blue-500/20 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-400" /> Net Worth Trajectory
        </h2>
        <div className="h-[320px]">
          {chartData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-zinc-500 text-sm">
              No net worth history yet. Add your first monthly snapshot!
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="netWorthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.4} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0e131f', borderColor: '#1e293b', borderRadius: '12px', color: '#fff' }} 
                  formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="netWorth" name="Net Worth" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#netWorthGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Monthly Entries Table */}
      <div className="bg-[#0b0f19]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="max-h-[400px] overflow-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="sticky top-0 z-10 bg-[#0e1424] text-zinc-300 text-xs uppercase tracking-wider font-bold border-b border-white/10">
              <tr>
                <th className="p-3.5">Month</th>
                <th className="p-3.5 text-right">Bank</th>
                <th className="p-3.5 text-right">Cash</th>
                <th className="p-3.5 text-right">Investments</th>
                <th className="p-3.5 text-right">Assets</th>
                <th className="p-3.5 text-right">Liabilities</th>
                <th className="p-3.5 text-right">Net Worth</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {isLoading ? (
                <tr><td colSpan={8} className="p-12 text-center text-zinc-500 animate-pulse">Loading...</td></tr>
              ) : entries.length === 0 ? (
                <tr><td colSpan={8} className="p-12 text-center text-zinc-500">No entries yet. Add your first monthly snapshot.</td></tr>
              ) : (
                [...entries].reverse().map((e: any, idx: number) => {
                  const assets = Number(e.bank || 0) + Number(e.cash || 0) + Number(e.investments || 0) + Number(e.other_assets || 0);
                  const liabilities = Number(e.credit_card || 0) + Number(e.loans || 0) + Number(e.other_liabilities || 0);
                  const nw = assets - liabilities;
                  return (
                    <motion.tr 
                      key={e.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-white/[0.03] transition-colors group"
                    >
                      <td className="p-3.5 font-semibold text-white">
                        {new Date(e.month_date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                      </td>
                      <td className="p-3.5 text-right text-zinc-300 font-mono">₹{Number(e.bank || 0).toLocaleString()}</td>
                      <td className="p-3.5 text-right text-zinc-300 font-mono">₹{Number(e.cash || 0).toLocaleString()}</td>
                      <td className="p-3.5 text-right text-zinc-300 font-mono">₹{Number(e.investments || 0).toLocaleString()}</td>
                      <td className="p-3.5 text-right text-emerald-400 font-bold font-mono">₹{assets.toLocaleString()}</td>
                      <td className="p-3.5 text-right text-rose-400 font-bold font-mono">₹{liabilities.toLocaleString()}</td>
                      <td className={`p-3.5 text-right font-black font-mono ${nw >= 0 ? 'text-blue-400' : 'text-rose-400'}`}>₹{nw.toLocaleString()}</td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleOpenEdit(e)} className="p-1.5 rounded-lg hover:bg-blue-500/20 text-zinc-400 hover:text-blue-400">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDelete(e.id)} className="p-1.5 rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400">
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
              <Wallet className="w-5 h-5 text-blue-400" />
              {editItem ? 'Edit Snapshot' : 'Add Monthly Snapshot'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-300 font-bold uppercase tracking-wider">Month</Label>
              <Input type="date" value={monthDate} onChange={(e) => setMonthDate(e.target.value)} className="bg-[#111827] border-white/10 text-white rounded-xl" />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Assets</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-[11px] text-zinc-400">Bank Balance</Label>
                  <Input type="number" step="1" value={bank} onChange={(e) => setBank(e.target.value)} placeholder="0" className="bg-[#111827] border-white/10 text-white rounded-xl" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[11px] text-zinc-400">Cash</Label>
                  <Input type="number" step="1" value={cash} onChange={(e) => setCash(e.target.value)} placeholder="0" className="bg-[#111827] border-white/10 text-white rounded-xl" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[11px] text-zinc-400">Investments</Label>
                  <Input type="number" step="1" value={investments} onChange={(e) => setInvestments(e.target.value)} placeholder="0" className="bg-[#111827] border-white/10 text-white rounded-xl" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[11px] text-zinc-400">Other Assets</Label>
                  <Input type="number" step="1" value={otherAssets} onChange={(e) => setOtherAssets(e.target.value)} placeholder="0" className="bg-[#111827] border-white/10 text-white rounded-xl" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-rose-400 uppercase tracking-wider">Liabilities</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-[11px] text-zinc-400">Credit Card</Label>
                  <Input type="number" step="1" value={creditCard} onChange={(e) => setCreditCard(e.target.value)} placeholder="0" className="bg-[#111827] border-white/10 text-white rounded-xl" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[11px] text-zinc-400">Loans</Label>
                  <Input type="number" step="1" value={loans} onChange={(e) => setLoans(e.target.value)} placeholder="0" className="bg-[#111827] border-white/10 text-white rounded-xl" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[11px] text-zinc-400">Other</Label>
                  <Input type="number" step="1" value={otherLiabilities} onChange={(e) => setOtherLiabilities(e.target.value)} placeholder="0" className="bg-[#111827] border-white/10 text-white rounded-xl" />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-white rounded-xl">Cancel</Button>
              <Button type="submit" disabled={addEntry.isPending || updateEntry.isPending} className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold px-6 shadow-lg shadow-blue-600/30">
                {editItem ? 'Save' : 'Add Snapshot'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
