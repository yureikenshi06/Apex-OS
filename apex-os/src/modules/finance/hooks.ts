import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as financeApi from '@/api/finance';
import { useAuth } from '@/hooks/use-auth';
import type { 
  TransactionInsert, TransactionUpdate,
  BudgetInsert, BudgetUpdate,
  RecurringExpenseInsert, RecurringExpenseUpdate,
  PeopleSplitInsert, PeopleSplitUpdate,
  NetWorthEntryInsert, NetWorthEntryUpdate
} from '@/api/types';

// --- Transactions ---
export const useTransactions = (filters?: any) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['transactions', user?.id, filters],
    queryFn: () => financeApi.getTransactions(user?.id!, filters),
    enabled: !!user?.id,
  });
};

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    meta: { scope: 'finance' },
    mutationFn: (data: Omit<TransactionInsert, 'owner_id'>) => financeApi.addTransaction({ ...data, owner_id: user?.id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['finance-stats'] });
      queryClient.invalidateQueries({ queryKey: ['finance-analysis'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    meta: { scope: 'finance' },
    mutationFn: ({ id, data }: { id: string; data: TransactionUpdate }) => financeApi.updateTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['finance-stats'] });
      queryClient.invalidateQueries({ queryKey: ['finance-analysis'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    meta: { scope: 'finance' },
    mutationFn: (id: string) => financeApi.deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['finance-stats'] });
      queryClient.invalidateQueries({ queryKey: ['finance-analysis'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
};

// --- Budgets ---
export const useBudgets = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['budgets', user?.id],
    queryFn: () => financeApi.getBudgets(user?.id!),
    enabled: !!user?.id,
  });
};

export const useAddBudget = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    meta: { scope: 'finance' },
    mutationFn: (data: Omit<BudgetInsert, 'owner_id'>) => financeApi.addBudget({ ...data, owner_id: user?.id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['finance-stats'] });
      queryClient.invalidateQueries({ queryKey: ['finance-analysis'] });
    },
  });
};

export const useUpdateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    meta: { scope: 'finance' },
    mutationFn: ({ id, data }: { id: string; data: BudgetUpdate }) => financeApi.updateBudget(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['finance-stats'] });
      queryClient.invalidateQueries({ queryKey: ['finance-analysis'] });
    },
  });
};

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    meta: { scope: 'finance' },
    mutationFn: (id: string) => financeApi.deleteBudget(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['finance-stats'] });
      queryClient.invalidateQueries({ queryKey: ['finance-analysis'] });
    },
  });
};

// --- Recurring Expenses ---
export const useRecurringExpenses = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['recurring', user?.id],
    queryFn: () => financeApi.getRecurringExpenses(user?.id!),
    enabled: !!user?.id,
  });
};

export const useAddRecurring = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    meta: { scope: 'finance' },
    mutationFn: (data: Omit<RecurringExpenseInsert, 'owner_id'>) => financeApi.addRecurringExpense({ ...data, owner_id: user?.id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring'] });
    },
  });
};

export const useUpdateRecurring = () => {
  const queryClient = useQueryClient();
  return useMutation({
    meta: { scope: 'finance' },
    mutationFn: ({ id, data }: { id: string; data: RecurringExpenseUpdate }) => financeApi.updateRecurringExpense(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring'] });
    },
  });
};

export const useDeleteRecurring = () => {
  const queryClient = useQueryClient();
  return useMutation({
    meta: { scope: 'finance' },
    mutationFn: (id: string) => financeApi.deleteRecurringExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring'] });
    },
  });
};

export const useMarkRecurringPaid = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    meta: { scope: 'finance' },
    mutationFn: (id: string) => financeApi.markRecurringAsPaid(id, user?.id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['finance-stats'] });
      queryClient.invalidateQueries({ queryKey: ['finance-analysis'] });
    },
  });
};

// --- Splits ---
export const usePeopleSplits = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['splits', user?.id],
    queryFn: () => financeApi.getPeopleSplits(user?.id!),
    enabled: !!user?.id,
  });
};

export const useAddSplit = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    meta: { scope: 'finance' },
    mutationFn: (data: Omit<PeopleSplitInsert, 'owner_id'>) => financeApi.addPeopleSplit({ ...data, owner_id: user?.id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['splits'] });
    },
  });
};

export const useUpdateSplit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    meta: { scope: 'finance' },
    mutationFn: ({ id, data }: { id: string; data: PeopleSplitUpdate }) => financeApi.updatePeopleSplit(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['splits'] });
    },
  });
};

export const useDeleteSplit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    meta: { scope: 'finance' },
    mutationFn: (id: string) => financeApi.deletePeopleSplit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['splits'] });
    },
  });
};

// --- Net Worth ---
export const useNetWorthEntries = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['net-worth', user?.id],
    queryFn: () => financeApi.getNetWorthEntries(user?.id!),
    enabled: !!user?.id,
  });
};

export const useAddNetWorthEntry = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    meta: { scope: 'finance' },
    mutationFn: (data: Omit<NetWorthEntryInsert, 'owner_id'>) => financeApi.addNetWorthEntry({ ...data, owner_id: user?.id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['net-worth'] });
    },
  });
};

export const useUpdateNetWorthEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    meta: { scope: 'finance' },
    mutationFn: ({ id, data }: { id: string; data: NetWorthEntryUpdate }) => financeApi.updateNetWorthEntry(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['net-worth'] });
    },
  });
};

export const useDeleteNetWorthEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    meta: { scope: 'finance' },
    mutationFn: (id: string) => financeApi.deleteNetWorthEntry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['net-worth'] });
    },
  });
};

// --- Timeframe Analysis Types ---
export type TimeframeMode = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';

export interface FinanceAnalysisFilter {
  mode: TimeframeMode;
  date?: string;       // YYYY-MM-DD
  month?: number;      // 1-12
  year?: number;       // YYYY
  startDate?: string;  // YYYY-MM-DD for custom
  endDate?: string;    // YYYY-MM-DD for custom
}

// --- Dynamic Finance Analysis Hook (Supports Daily, Weekly, Monthly, Yearly, Custom) ---
export const useFinanceAnalysis = (filter: FinanceAnalysisFilter) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['finance-analysis', user?.id, filter],
    queryFn: async () => {
      if (!user?.id) return {
        totalIncome: 0,
        totalExpenses: 0,
        savings: 0,
        savingsRate: 0,
        categorySpend: [],
        trendData: [],
        topExpenses: [],
        transactionCount: 0,
        startDateStr: '',
        endDateStr: '',
        hasData: false,
      };

      const now = new Date();
      const currentYear = filter.year || now.getFullYear();
      const currentMonth = filter.month || (now.getMonth() + 1);

      let startBound = '';
      let endBound = '';

      // Determine date bounds
      if (filter.mode === 'daily') {
        const d = filter.date || now.toISOString().split('T')[0];
        startBound = d;
        endBound = d;
      } else if (filter.mode === 'weekly') {
        // Find current week Monday to Sunday
        const target = filter.date ? new Date(filter.date) : now;
        const day = target.getDay(); // 0 is Sun
        const diffToMon = target.getDate() - day + (day === 0 ? -6 : 1);
        const mon = new Date(target);
        mon.setDate(diffToMon);
        const sun = new Date(mon);
        sun.setDate(mon.getDate() + 6);

        startBound = mon.toISOString().split('T')[0];
        endBound = sun.toISOString().split('T')[0];
      } else if (filter.mode === 'monthly') {
        const s = new Date(currentYear, currentMonth - 1, 1);
        const e = new Date(currentYear, currentMonth, 0);
        startBound = s.toISOString().split('T')[0];
        endBound = e.toISOString().split('T')[0];
      } else if (filter.mode === 'yearly') {
        startBound = `${currentYear}-01-01`;
        endBound = `${currentYear}-12-31`;
      } else if (filter.mode === 'custom') {
        startBound = filter.startDate || `${currentYear}-01-01`;
        endBound = filter.endDate || now.toISOString().split('T')[0];
      }

      // Fetch all transactions
      const allTransactions = await financeApi.getTransactions(user.id);
      
      // Filter transactions within interval
      const txsInPeriod = allTransactions.filter(t => {
        if (!t.date) return false;
        return t.date >= startBound && t.date <= endBound;
      });

      const totalIncome = txsInPeriod
        .filter(t => t.transaction_type === 'Income')
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);
      const totalExpenses = txsInPeriod
        .filter(t => t.transaction_type === 'Expense')
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);
      const savings = totalIncome - totalExpenses;
      const savingsRate = totalIncome > 0 ? Math.round((savings / totalIncome) * 100) : 0;

      // Category spend
      const catMap: Record<string, number> = {};
      txsInPeriod.filter(t => t.transaction_type === 'Expense').forEach(t => {
        const cat = t.category || 'Other';
        catMap[cat] = (catMap[cat] || 0) + Number(t.amount || 0);
      });
      const categorySpend = Object.keys(catMap)
        .map(name => ({ name, value: catMap[name] }))
        .sort((a, b) => b.value - a.value);

      // Top expenses
      const topExpenses = txsInPeriod
        .filter(t => t.transaction_type === 'Expense')
        .sort((a, b) => Number(b.amount || 0) - Number(a.amount || 0))
        .slice(0, 5);

      // Compute Trend Data for the chart
      let trendData: Array<{ label: string; income: number; expenses: number; net: number }> = [];

      if (filter.mode === 'daily') {
        // Show hourly or 7-day trailing context up to selected day
        const selectedD = new Date(startBound);
        const days: string[] = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date(selectedD);
          d.setDate(selectedD.getDate() - i);
          days.push(d.toISOString().split('T')[0]);
        }

        trendData = days.map(dStr => {
          const txs = allTransactions.filter(t => t.date === dStr);
          const inc = txs.filter(t => t.transaction_type === 'Income').reduce((s, t) => s + Number(t.amount || 0), 0);
          const exp = txs.filter(t => t.transaction_type === 'Expense').reduce((s, t) => s + Number(t.amount || 0), 0);
          const dObj = new Date(dStr);
          return {
            label: `${dObj.toLocaleString('default', { weekday: 'short' })} ${dObj.getDate()}`,
            income: inc,
            expenses: exp,
            net: inc - exp,
          };
        });
      } else if (filter.mode === 'weekly') {
        // 7 days of the selected week (Mon..Sun)
        const mon = new Date(startBound);
        trendData = Array.from({ length: 7 }, (_, i) => {
          const d = new Date(mon);
          d.setDate(mon.getDate() + i);
          const dStr = d.toISOString().split('T')[0];
          const txs = allTransactions.filter(t => t.date === dStr);
          const inc = txs.filter(t => t.transaction_type === 'Income').reduce((s, t) => s + Number(t.amount || 0), 0);
          const exp = txs.filter(t => t.transaction_type === 'Expense').reduce((s, t) => s + Number(t.amount || 0), 0);
          return {
            label: `${d.toLocaleString('default', { weekday: 'short' })} ${d.getDate()}`,
            income: inc,
            expenses: exp,
            net: inc - exp,
          };
        });
      } else if (filter.mode === 'monthly') {
        // Group by 4-5 weeks of the month or 3-day bins
        const startD = new Date(startBound);
        const totalDays = new Date(currentYear, currentMonth, 0).getDate();
        
        // Show 6 intervals across the month (e.g. 1-5, 6-10, 11-15, 16-20, 21-25, 26-End)
        const bins = [
          { label: '1-5', start: 1, end: 5 },
          { label: '6-10', start: 6, end: 10 },
          { label: '11-15', start: 11, end: 15 },
          { label: '16-20', start: 16, end: 20 },
          { label: '21-25', start: 21, end: 25 },
          { label: `26-${totalDays}`, start: 26, end: totalDays },
        ];

        trendData = bins.map(bin => {
          const txs = txsInPeriod.filter(t => {
            if (!t.date) return false;
            const dayNum = parseInt(t.date.split('-')[2], 10);
            return dayNum >= bin.start && dayNum <= bin.end;
          });
          const inc = txs.filter(t => t.transaction_type === 'Income').reduce((s, t) => s + Number(t.amount || 0), 0);
          const exp = txs.filter(t => t.transaction_type === 'Expense').reduce((s, t) => s + Number(t.amount || 0), 0);
          return {
            label: `${bin.label} ${startD.toLocaleString('default', { month: 'short' })}`,
            income: inc,
            expenses: exp,
            net: inc - exp,
          };
        });
      } else if (filter.mode === 'yearly') {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        trendData = monthNames.map((mName, idx) => {
          const mNum = idx + 1;
          const txs = txsInPeriod.filter(t => {
            if (!t.date) return false;
            const parts = t.date.split('-');
            return parseInt(parts[1], 10) === mNum;
          });
          const inc = txs.filter(t => t.transaction_type === 'Income').reduce((s, t) => s + Number(t.amount || 0), 0);
          const exp = txs.filter(t => t.transaction_type === 'Expense').reduce((s, t) => s + Number(t.amount || 0), 0);
          return {
            label: mName,
            income: inc,
            expenses: exp,
            net: inc - exp,
          };
        });
      } else {
        // Custom Range: group by day if <= 31 days, otherwise group by month
        const d1 = new Date(startBound);
        const d2 = new Date(endBound);
        const daySpan = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        if (daySpan <= 31) {
          trendData = Array.from({ length: Math.max(1, daySpan) }, (_, i) => {
            const d = new Date(d1);
            d.setDate(d1.getDate() + i);
            const dStr = d.toISOString().split('T')[0];
            const txs = txsInPeriod.filter(t => t.date === dStr);
            const inc = txs.filter(t => t.transaction_type === 'Income').reduce((s, t) => s + Number(t.amount || 0), 0);
            const exp = txs.filter(t => t.transaction_type === 'Expense').reduce((s, t) => s + Number(t.amount || 0), 0);
            return {
              label: `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`,
              income: inc,
              expenses: exp,
              net: inc - exp,
            };
          });
        } else {
          // Group by months across the span
          const monthMap: Record<string, { inc: number; exp: number }> = {};
          txsInPeriod.forEach(t => {
            if (!t.date) return;
            const key = t.date.slice(0, 7); // YYYY-MM
            if (!monthMap[key]) monthMap[key] = { inc: 0, exp: 0 };
            if (t.transaction_type === 'Income') monthMap[key].inc += Number(t.amount || 0);
            if (t.transaction_type === 'Expense') monthMap[key].exp += Number(t.amount || 0);
          });

          const sortedKeys = Object.keys(monthMap).sort();
          if (sortedKeys.length === 0) {
            trendData = [{ label: startBound, income: 0, expenses: 0, net: 0 }];
          } else {
            trendData = sortedKeys.map(k => {
              const d = new Date(k + '-01');
              return {
                label: d.toLocaleString('default', { month: 'short', year: '2-digit' }),
                income: monthMap[k].inc,
                expenses: monthMap[k].exp,
                net: monthMap[k].inc - monthMap[k].exp,
              };
            });
          }
        }
      }

      const hasData = txsInPeriod.length > 0;

      return {
        totalIncome,
        totalExpenses,
        savings,
        savingsRate,
        categorySpend,
        trendData,
        topExpenses,
        transactionCount: txsInPeriod.length,
        startDateStr: startBound,
        endDateStr: endBound,
        hasData,
      };
    },
    enabled: !!user?.id,
  });
};

// --- Backwards Compatibility Wrapper ---
export const useFinanceStats = (month?: number, year?: number) => {
  return useFinanceAnalysis({
    mode: 'monthly',
    month,
    year,
  });
};

// --- Spending Intelligence / Visual Analytics ---
export const useSpendingInsights = (filter?: FinanceAnalysisFilter) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['spending-insights', user?.id, filter],
    queryFn: async () => {
      if (!user?.id) return null;

      const now = new Date();
      const currentYear = filter?.year || now.getFullYear();
      const currentMonth = filter?.month || (now.getMonth() + 1);
      const mode = filter?.mode || 'monthly';

      let startBound = '';
      let endBound = '';
      let timeframeLabel = '';

      if (mode === 'daily') {
        const d = filter?.date || now.toISOString().split('T')[0];
        startBound = d;
        endBound = d;
        timeframeLabel = new Date(d + 'T00:00:00').toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });
      } else if (mode === 'weekly') {
        const target = filter?.date ? new Date(filter.date + 'T00:00:00') : now;
        const day = target.getDay();
        const diffToMon = target.getDate() - day + (day === 0 ? -6 : 1);
        const mon = new Date(target);
        mon.setDate(diffToMon);
        const sun = new Date(mon);
        sun.setDate(mon.getDate() + 6);
        startBound = mon.toISOString().split('T')[0];
        endBound = sun.toISOString().split('T')[0];
        timeframeLabel = `${mon.toLocaleDateString('default', { month: 'short', day: 'numeric' })} – ${sun.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      } else if (mode === 'monthly') {
        const s = new Date(currentYear, currentMonth - 1, 1);
        const e = new Date(currentYear, currentMonth, 0);
        startBound = s.toISOString().split('T')[0];
        endBound = e.toISOString().split('T')[0];
        const mName = new Date(2000, currentMonth - 1, 1).toLocaleString('default', { month: 'long' });
        timeframeLabel = `${mName} ${currentYear}`;
      } else if (mode === 'yearly') {
        startBound = `${currentYear}-01-01`;
        endBound = `${currentYear}-12-31`;
        timeframeLabel = `Year ${currentYear}`;
      } else if (mode === 'custom') {
        startBound = filter?.startDate || `${currentYear}-01-01`;
        endBound = filter?.endDate || now.toISOString().split('T')[0];
        timeframeLabel = `${startBound} to ${endBound}`;
      }

      const allTx = await financeApi.getTransactions(user.id);
      const allExpenses = allTx.filter(t => t.transaction_type === 'Expense' && t.date);

      if (allExpenses.length === 0) {
        return { hasData: false, timeframeLabel, timeframeMode: mode };
      }

      // Filter expenses strictly within the selected range
      const rangeExpenses = allExpenses.filter(t => t.date! >= startBound && t.date! <= endBound);

      if (rangeExpenses.length === 0) {
        return {
          hasData: false,
          timeframeLabel,
          timeframeMode: mode,
          noTransactionsInPeriod: true,
        };
      }

      // ── 1. Timeline / Impulse Spike Detection ──────────────────────────────
      const isYearly = mode === 'yearly';
      const daySpan = Math.round((new Date(endBound + 'T00:00:00').getTime() - new Date(startBound + 'T00:00:00').getTime()) / 86400000) + 1;
      const isLongCustom = mode === 'custom' && daySpan > 35;

      let dailySpikeData: Array<{ label: string; amount: number; isSpike: boolean; fullDate?: string }> = [];
      let avgDailySpend = 0;
      let spikeThreshold = 0;
      let spikeDays = 0;
      let totalImpulseSpend = 0;
      let timelineUnit = 'day';

      if (isYearly || isLongCustom) {
        timelineUnit = 'month';
        const monthMap: Record<string, number> = {};
        rangeExpenses.forEach(t => {
          const mKey = t.date!.slice(0, 7);
          monthMap[mKey] = (monthMap[mKey] || 0) + Number(t.amount || 0);
        });

        // Determine list of months
        const startY = Number(startBound.slice(0, 4));
        const startM = Number(startBound.slice(5, 7));
        const endY = Number(endBound.slice(0, 4));
        const endM = Number(endBound.slice(5, 7));

        const mList: string[] = [];
        let y = startY;
        let m = startM;
        while (y < endY || (y === endY && m <= endM)) {
          mList.push(`${y}-${String(m).padStart(2, '0')}`);
          m++;
          if (m > 12) {
            m = 1;
            y++;
          }
        }

        const amounts = mList.map(k => Math.round(monthMap[k] || 0));
        const nonZero = amounts.filter(a => a > 0);
        avgDailySpend = nonZero.length > 0 ? Math.round(amounts.reduce((a, b) => a + b, 0) / nonZero.length) : 0;
        spikeThreshold = Math.round(avgDailySpend * 1.5);

        dailySpikeData = mList.map((k, idx) => {
          const amt = amounts[idx];
          const isSpike = amt >= spikeThreshold && amt > 0;
          if (isSpike) {
            spikeDays++;
            totalImpulseSpend += (amt - avgDailySpend);
          }
          const [yr, mo] = k.split('-').map(Number);
          const mName = new Date(yr, mo - 1, 1).toLocaleString('default', { month: 'short' });
          return {
            label: isYearly ? mName : `${mName} '${String(yr).slice(2)}`,
            amount: amt,
            isSpike,
            fullDate: `${mName} ${yr}`,
          };
        });
      } else {
        timelineUnit = 'day';
        const dailyMap: Record<string, number> = {};
        rangeExpenses.forEach(t => {
          dailyMap[t.date!] = (dailyMap[t.date!] || 0) + Number(t.amount || 0);
        });

        const dList: string[] = [];
        const curDate = new Date(startBound + 'T00:00:00');
        const endDateObj = new Date(endBound + 'T00:00:00');

        // If single day, show surrounding 7 days centered on selected date
        if (mode === 'daily') {
          curDate.setDate(curDate.getDate() - 3);
          endDateObj.setDate(endDateObj.getDate() + 3);
        }

        while (curDate <= endDateObj) {
          dList.push(curDate.toISOString().split('T')[0]);
          curDate.setDate(curDate.getDate() + 1);
        }

        const amounts = dList.map(d => Math.round(dailyMap[d] || 0));
        const nonZero = amounts.filter(a => a > 0);
        avgDailySpend = nonZero.length > 0 ? Math.round(amounts.reduce((a, b) => a + b, 0) / nonZero.length) : 0;
        spikeThreshold = Math.round(avgDailySpend * 1.6);

        dailySpikeData = dList.map((dStr, idx) => {
          const amt = amounts[idx];
          const isSpike = amt >= spikeThreshold && amt > 0;
          if (isSpike) {
            spikeDays++;
            totalImpulseSpend += (amt - avgDailySpend);
          }
          const [y, m, d] = dStr.split('-').map(Number);
          const dateObj = new Date(y, m - 1, d);
          const label = mode === 'weekly'
            ? dateObj.toLocaleDateString('default', { weekday: 'short' })
            : mode === 'daily' && dStr === startBound
            ? `★ ${d}`
            : String(d);

          return {
            label,
            amount: amt,
            isSpike,
            fullDate: dateObj.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' }),
          };
        });
      }

      // ── 2. Day-of-Week Spending Pattern ────────────────────────────────────
      const dowSource = rangeExpenses.length >= 5 ? rangeExpenses : allExpenses;
      const dowMap: Record<number, { total: number; count: number }> = {
        0: { total: 0, count: 0 }, 1: { total: 0, count: 0 }, 2: { total: 0, count: 0 },
        3: { total: 0, count: 0 }, 4: { total: 0, count: 0 }, 5: { total: 0, count: 0 },
        6: { total: 0, count: 0 },
      };
      dowSource.forEach(t => {
        const [y, m, d] = t.date!.split('-').map(Number);
        const dow = new Date(y, m - 1, d).getDay();
        dowMap[dow].total += Number(t.amount || 0);
        dowMap[dow].count++;
      });
      const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayOfWeekData = DAY_NAMES.map((name, i) => ({
        day: name,
        avgSpend: dowMap[i].count > 0 ? Math.round(dowMap[i].total / dowMap[i].count) : 0,
        totalSpend: Math.round(dowMap[i].total),
        txCount: dowMap[i].count,
      }));
      const maxDowSpend = Math.max(...dayOfWeekData.map(d => d.avgSpend), 1);
      const peakDayObj = dayOfWeekData.reduce((a, b) => a.avgSpend > b.avgSpend ? a : b);
      const peakDay = peakDayObj.avgSpend > 0 ? peakDayObj.day : 'None';

      // ── 3. Category Trends & Velocity (aligned to timeframe) ───────────────
      let anchorDate = now;
      if (mode === 'monthly') {
        anchorDate = new Date(currentYear, currentMonth - 1, 1);
      } else if (mode === 'yearly') {
        anchorDate = new Date(currentYear, 11, 31);
      } else if (mode === 'custom' && filter?.endDate) {
        anchorDate = new Date(filter.endDate + 'T00:00:00');
      } else if (filter?.date) {
        anchorDate = new Date(filter.date + 'T00:00:00');
      }

      const numTrendMonths = mode === 'yearly' ? 12 : 6;
      const trendMonths: string[] = [];
      for (let i = numTrendMonths - 1; i >= 0; i--) {
        const d = new Date(anchorDate.getFullYear(), anchorDate.getMonth() - i, 1);
        trendMonths.push(d.toLocaleString('default', { month: 'short', year: '2-digit' }));
      }

      const catTotals: Record<string, number> = {};
      rangeExpenses.forEach(t => {
        const cat = t.category || 'Other';
        catTotals[cat] = (catTotals[cat] || 0) + Number(t.amount || 0);
      });
      const topCats = Object.entries(catTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name]) => name);

      const monthCatMap: Record<string, Record<string, number>> = {};
      trendMonths.forEach(mo => {
        monthCatMap[mo] = {};
        topCats.forEach(cat => { monthCatMap[mo][cat] = 0; });
      });
      allExpenses.forEach(t => {
        const [y, mo] = t.date!.split('-').map(Number);
        const key = new Date(y, mo - 1, 1).toLocaleString('default', { month: 'short', year: '2-digit' });
        const cat = t.category || 'Other';
        if (monthCatMap[key] !== undefined && topCats.includes(cat)) {
          monthCatMap[key][cat] += Number(t.amount || 0);
        }
      });

      const categoryTrends = trendMonths.map(mo => ({
        month: mo,
        ...Object.fromEntries(topCats.map(cat => [cat, Math.round(monthCatMap[mo]?.[cat] || 0)])),
      }));

      const categoryGrowth = topCats.map(cat => {
        const latestMo = trendMonths[trendMonths.length - 1];
        const prevMo = trendMonths[trendMonths.length - 2];
        const currentVal = monthCatMap[latestMo]?.[cat] || 0;
        const prevVal = prevMo ? (monthCatMap[prevMo]?.[cat] || 0) : 0;
        const diff = currentVal - prevVal;
        const pct = prevVal > 0 ? Math.round((diff / prevVal) * 100) : currentVal > 0 ? 100 : 0;
        return {
          category: cat,
          current: Math.round(currentVal),
          previous: Math.round(prevVal),
          diff: Math.round(diff),
          pct,
          trending: diff > 0 ? ('up' as const) : diff < 0 ? ('down' as const) : ('flat' as const),
        };
      });

      // ── 4. Needs vs Wants in Selected Range ────────────────────────────────
      const NEEDS_KW = ['food', 'grocery', 'groceries', 'medical', 'health', 'medicine', 'doctor',
        'utility', 'utilities', 'electricity', 'water', 'rent', 'housing', 'transport',
        'commute', 'bus', 'metro', 'personal care', 'hygiene', 'education', 'tuition', 'fuel'];
      const needsCatSet = new Set<string>();
      const wantsCatSet = new Set<string>();
      rangeExpenses.forEach(t => {
        const cat = (t.category || '').toLowerCase();
        if (NEEDS_KW.some(kw => cat.includes(kw))) needsCatSet.add(t.category || 'Other');
        else wantsCatSet.add(t.category || 'Other');
      });
      const needsTotal = Math.round(rangeExpenses
        .filter(t => needsCatSet.has(t.category || 'Other'))
        .reduce((s, t) => s + Number(t.amount || 0), 0));
      const wantsTotal = Math.round(rangeExpenses
        .filter(t => wantsCatSet.has(t.category || 'Other'))
        .reduce((s, t) => s + Number(t.amount || 0), 0));

      // ── 5. Cumulative spend vs ideal linear pace ───────────────────────────
      const totalPeriodSpend = dailySpikeData.reduce((s, d) => s + d.amount, 0);
      const idealPerUnit = totalPeriodSpend / Math.max(1, dailySpikeData.length);
      let cumSum = 0;
      const cumulativeData = dailySpikeData.map((d, i) => {
        cumSum += d.amount;
        return {
          day: d.label,
          actual: Math.round(cumSum),
          ideal: Math.round(idealPerUnit * (i + 1)),
        };
      });

      // ── 6. Top impulse transactions & category breakdown in Period ─────────
      const avgTxAmount = rangeExpenses.length > 0
        ? rangeExpenses.reduce((s, t) => s + Number(t.amount || 0), 0) / rangeExpenses.length : 0;
      const impulseTransactions = rangeExpenses
        .filter(t => !needsCatSet.has(t.category || 'Other') && Number(t.amount || 0) > avgTxAmount * 1.25)
        .sort((a, b) => Number(b.amount || 0) - Number(a.amount || 0))
        .slice(0, 6);

      const impulseCategoryMap: Record<string, { total: number; count: number }> = {};
      impulseTransactions.forEach(t => {
        const cat = t.category || 'Other';
        if (!impulseCategoryMap[cat]) {
          impulseCategoryMap[cat] = { total: 0, count: 0 };
        }
        impulseCategoryMap[cat].total += Number(t.amount || 0);
        impulseCategoryMap[cat].count += 1;
      });
      const impulseTotalFromTx = impulseTransactions.reduce((s, t) => s + Number(t.amount || 0), 0);
      const impulseByCategory = Object.entries(impulseCategoryMap)
        .map(([name, data]) => ({
          name,
          total: Math.round(data.total),
          count: data.count,
          pct: impulseTotalFromTx > 0 ? Math.round((data.total / impulseTotalFromTx) * 100) : 0,
        }))
        .sort((a, b) => b.total - a.total);

      return {
        hasData: true,
        timeframeLabel,
        timeframeMode: mode,
        timelineUnit,
        dayOfWeekData,
        maxDowSpend,
        peakDay,
        categoryTrends,
        categoryGrowth,
        topCats,
        dailySpikeData,
        avgDailySpend: Math.round(avgDailySpend),
        spikeThreshold: Math.round(spikeThreshold),
        spikeDays,
        totalImpulseSpend: Math.round(totalImpulseSpend),
        needsTotal,
        wantsTotal,
        needsCats: Array.from(needsCatSet),
        wantsCats: Array.from(wantsCatSet),
        cumulativeData,
        impulseTransactions,
        impulseByCategory,
      };
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });
};
