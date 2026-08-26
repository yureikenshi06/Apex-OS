import React, { useState } from 'react';
import { useTransactions, useDeleteTransaction } from './hooks';
import { formatCurrency, downloadAsCSV } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, Search, Download, Trash2, Edit2, ArrowLeft, 
  ArrowUpRight, ArrowDownRight, Settings, Calendar, Filter, Layers 
} from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import TransactionFormModal from './transaction-form-modal';
import CategoryManagerModal from './category-manager-modal';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TX_TYPES = ['All', 'Expense', 'Income', 'Transfer'];
type TimeframeFilter = 'all' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';

export default function TransactionsPage() {
  const navigate = useNavigate();
  const todayStr = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [timeframe, setTimeframe] = useState<TimeframeFilter>('all');
  const [customStart, setCustomStart] = useState(new Date(currentYear, currentMonth - 1, 1).toISOString().split('T')[0]);
  const [customEnd, setCustomEnd] = useState(todayStr);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  
  const { data: transactions = [], isLoading } = useTransactions();
  const deleteMutation = useDeleteTransaction();

  // Compute date boundaries for timeframe filtering
  const getFilterBounds = (): { start?: string; end?: string } => {
    const now = new Date();
    if (timeframe === 'daily') {
      return { start: todayStr, end: todayStr };
    }
    if (timeframe === 'weekly') {
      const day = now.getDay();
      const diffToMon = now.getDate() - day + (day === 0 ? -6 : 1);
      const mon = new Date(now);
      mon.setDate(diffToMon);
      const sun = new Date(mon);
      sun.setDate(mon.getDate() + 6);
      return {
        start: mon.toISOString().split('T')[0],
        end: sun.toISOString().split('T')[0],
      };
    }
    if (timeframe === 'monthly') {
      const s = new Date(currentYear, currentMonth - 1, 1);
      const e = new Date(currentYear, currentMonth, 0);
      return {
        start: s.toISOString().split('T')[0],
        end: e.toISOString().split('T')[0],
      };
    }
    if (timeframe === 'yearly') {
      return {
        start: `${currentYear}-01-01`,
        end: `${currentYear}-12-31`,
      };
    }
    if (timeframe === 'custom') {
      return { start: customStart, end: customEnd };
    }
    return {}; // all
  };

  const bounds = getFilterBounds();

  const filteredTransactions = transactions.filter((tx: any) => {
    const matchesSearch = !searchTerm || 
      tx.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.subcategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.merchant_payee?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'All' || tx.transaction_type === filterType;

    let matchesDate = true;
    if (bounds.start && tx.date) {
      matchesDate = matchesDate && tx.date >= bounds.start;
    }
    if (bounds.end && tx.date) {
      matchesDate = matchesDate && tx.date <= bounds.end;
    }

    return matchesSearch && matchesType && matchesDate;
  });

  // Calculate filtered totals
  const totalInflow = filteredTransactions
    .filter(t => t.transaction_type === 'Income')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const totalOutflow = filteredTransactions
    .filter(t => t.transaction_type === 'Expense')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const netBalance = totalInflow - totalOutflow;

  const handleEdit = (tx: any) => {
    setSelectedTx(tx);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this transaction?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) return;
    const exportData = filteredTransactions.map(t => ({
      Date: t.date,
      Type: t.transaction_type,
      Description: t.description,
      Category: t.category,
      Subcategory: t.subcategory || '',
      Amount: t.amount,
      PaymentMethod: t.payment_method || '',
      Account: t.account_wallet || '',
      Merchant: t.merchant_payee || '',
      AssignedTo: t.assigned_to || '',
      NeedWant: t.need_want || '',
      EssentialDisc: t.essential_discretionary || '',
      Notes: t.notes || '',
    }));
    downloadAsCSV(exportData, `transactions_${timeframe}_${todayStr}.csv`);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto text-foreground font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Button onClick={() => navigate('/finance')} variant="ghost" size="sm" className="p-1.5 h-8 text-zinc-400 hover:text-white rounded-lg">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-black text-white tracking-tight">Transactions Ledger</h1>
          <Badge variant="secondary" className="bg-blue-900/50 text-blue-200 border-blue-700/50 font-bold px-2.5">
            {filteredTransactions.length} items
          </Badge>
        </div>

        <div className="flex items-center gap-2.5">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setCategoryModalOpen(true)}
            className="bg-[#111827] border-white/10 hover:border-blue-500/40 text-zinc-300 hover:text-white rounded-xl text-xs h-9 px-3 gap-1.5"
          >
            <Settings className="w-3.5 h-3.5 text-blue-400" /> Categories
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportCSV}
            className="bg-white/5 border-white/10 text-zinc-300 rounded-xl hover:bg-white/10 text-xs h-9"
          >
            <Download className="w-4 h-4 mr-1.5" /> Export CSV
          </Button>
          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/30 font-bold text-xs h-9 px-4" 
            onClick={() => { setSelectedTx(null); setIsModalOpen(true); }}
          >
            <Plus className="w-4 h-4 mr-1.5" /> Add Transaction
          </Button>
        </div>
      </div>

      {/* Summary Stat Bar for Filtered View */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0b0f19]/90 border border-white/10 p-3.5 rounded-3xl shadow-xl backdrop-blur-xl">
        <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Filtered Count</span>
          <span className="text-lg font-black text-white font-mono mt-0.5 block">{filteredTransactions.length}</span>
        </div>
        <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Total Inflow</span>
          <span className="text-lg font-black text-emerald-400 font-mono mt-0.5 block">+₹{totalInflow.toLocaleString()}</span>
        </div>
        <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">Total Outflow</span>
          <span className="text-lg font-black text-rose-400 font-mono mt-0.5 block">-₹{totalOutflow.toLocaleString()}</span>
        </div>
        <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Net Balance</span>
          <span className={`text-lg font-black font-mono mt-0.5 block ${netBalance >= 0 ? 'text-blue-400' : 'text-rose-400'}`}>
            {netBalance >= 0 ? '+' : ''}₹{netBalance.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Filter Controls: Search + Type + Timeframe (Daily/Weekly/Monthly/Yearly/Custom) */}
      <div className="bg-[#0b0f19]/90 border border-white/10 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xl backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
            <Input 
              placeholder="Search by description, merchant, category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-[#111827] border-white/10 text-white rounded-xl h-8 text-xs placeholder:text-zinc-500 focus-visible:ring-blue-500"
            />
          </div>

          {/* Type Filter */}
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[110px] bg-[#111827] border-white/10 text-xs rounded-xl h-8 text-zinc-300">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-[#111827] border-white/10 text-white text-xs">
              {TX_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>

          {/* Timeframe Filter Dropdown */}
          <Select value={timeframe} onValueChange={(v) => setTimeframe(v as TimeframeFilter)}>
            <SelectTrigger className="w-[140px] bg-[#111827] border-white/10 text-xs rounded-xl h-8 text-zinc-300">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent className="bg-[#111827] border-white/10 text-white text-xs">
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="daily">Today / Daily</SelectItem>
              <SelectItem value="weekly">This Week</SelectItem>
              <SelectItem value="monthly">This Month</SelectItem>
              <SelectItem value="yearly">This Year</SelectItem>
              <SelectItem value="custom">Custom Date Range</SelectItem>
            </SelectContent>
          </Select>

          {/* Custom Date Pickers if custom selected */}
          {timeframe === 'custom' && (
            <div className="flex items-center gap-1.5">
              <Input 
                type="date" 
                value={customStart} 
                onChange={(e) => setCustomStart(e.target.value)} 
                className="bg-[#111827] border-white/10 text-white rounded-xl h-8 text-xs w-[130px]" 
              />
              <span className="text-zinc-500 text-xs">to</span>
              <Input 
                type="date" 
                value={customEnd} 
                onChange={(e) => setCustomEnd(e.target.value)} 
                className="bg-[#111827] border-white/10 text-white rounded-xl h-8 text-xs w-[130px]" 
              />
            </div>
          )}
        </div>

        <div className="text-xs text-zinc-400 font-medium shrink-0">
          Showing <strong className="text-white">{filteredTransactions.length}</strong> transactions
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-[#0b0f19]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl">
        <div className="max-h-[600px] overflow-auto">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead className="sticky top-0 z-10 bg-[#0e1424] text-zinc-300 text-xs uppercase tracking-wider font-bold border-b border-white/10">
              <tr>
                <th className="p-3.5 w-12 text-center">Type</th>
                <th className="p-3.5 w-28">Date</th>
                <th className="p-3.5">Description</th>
                <th className="p-3.5 w-32">Category</th>
                <th className="p-3.5 w-36">Subcategory</th>
                <th className="p-3.5 text-right w-32">Amount</th>
                <th className="p-3.5 w-28">Method</th>
                <th className="p-3.5 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              <AnimatePresence>
                {isLoading ? (
                  <tr><td colSpan={8} className="p-12 text-center text-zinc-500 animate-pulse">Loading transactions...</td></tr>
                ) : filteredTransactions.length === 0 ? (
                  <tr><td colSpan={8} className="p-12 text-center text-zinc-500">No transactions match your search or timeframe filter.</td></tr>
                ) : (
                  filteredTransactions.map((tx: any, idx: number) => {
                    const isExpense = tx.transaction_type === 'Expense';
                    const isIncome = tx.transaction_type === 'Income';
                    return (
                      <motion.tr 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: idx * 0.02 }}
                        key={tx.id} 
                        className="hover:bg-white/[0.03] transition-colors group"
                      >
                        <td className="p-3.5 text-center">
                          <div className={`w-7 h-7 mx-auto rounded-lg flex items-center justify-center ${isExpense ? 'bg-rose-500/15' : isIncome ? 'bg-emerald-500/15' : 'bg-blue-500/15'}`}>
                            {isExpense ? <ArrowDownRight className="w-3.5 h-3.5 text-rose-400" /> : isIncome ? <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" /> : <span className="text-blue-400 text-xs font-bold">⇆</span>}
                          </div>
                        </td>
                        <td className="p-3.5 whitespace-nowrap text-zinc-300 text-xs font-mono">
                          {new Date(tx.date).toLocaleDateString()}
                        </td>
                        <td className="p-3.5 font-semibold text-white">
                          {tx.description}
                          {tx.merchant_payee && (
                            <span className="block text-[10px] text-zinc-500 font-normal mt-0.5">
                              {tx.merchant_payee}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-white/10 text-zinc-300 bg-white/5 font-semibold">
                            {tx.category}
                          </Badge>
                        </td>
                        <td className="p-3.5 text-xs text-zinc-400">{tx.subcategory || '—'}</td>
                        <td className={`p-3.5 text-right font-bold font-mono whitespace-nowrap ${isExpense ? 'text-rose-400' : isIncome ? 'text-emerald-400' : 'text-blue-400'}`}>
                          {isExpense ? '-' : isIncome ? '+' : ''}₹{Number(tx.amount).toLocaleString()}
                        </td>
                        <td className="p-3.5 text-zinc-400 text-xs">{tx.payment_method || '—'}</td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(tx)} className="p-1.5 rounded-lg hover:bg-blue-500/20 text-zinc-400 hover:text-blue-400 transition-colors" title="Edit transaction">
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleDelete(tx.id)} className="p-1.5 rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors" title="Delete transaction">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 border-t border-white/10 text-xs text-zinc-400 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Showing <strong>{filteredTransactions.length}</strong> transactions</span>
          <div className="flex items-center gap-4 font-mono text-zinc-300">
            <span>Inflow: <strong className="text-emerald-400">+₹{totalInflow.toLocaleString()}</strong></span>
            <span>•</span>
            <span>Outflow: <strong className="text-rose-400">-₹{totalOutflow.toLocaleString()}</strong></span>
          </div>
        </div>
      </div>

      {/* Transaction Add/Edit Form Modal */}
      <TransactionFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        transaction={selectedTx} 
      />

      {/* Category Manager Modal */}
      <CategoryManagerModal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
      />
    </div>
  );
}
