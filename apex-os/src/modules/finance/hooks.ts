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
    mutationFn: (data: Omit<RecurringExpenseInsert, 'owner_id'>) => financeApi.addRecurringExpense({ ...data, owner_id: user?.id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring'] });
    },
  });
};

export const useUpdateRecurring = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: RecurringExpenseUpdate }) => financeApi.updateRecurringExpense(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recurring'] });
    },
  });
};

export const useDeleteRecurring = () => {
  const queryClient = useQueryClient();
  return useMutation({
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
    mutationFn: (data: Omit<PeopleSplitInsert, 'owner_id'>) => financeApi.addPeopleSplit({ ...data, owner_id: user?.id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['splits'] });
    },
  });
};

export const useUpdateSplit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PeopleSplitUpdate }) => financeApi.updatePeopleSplit(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['splits'] });
    },
  });
};

export const useDeleteSplit = () => {
  const queryClient = useQueryClient();
  return useMutation({
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
    mutationFn: (data: Omit<NetWorthEntryInsert, 'owner_id'>) => financeApi.addNetWorthEntry({ ...data, owner_id: user?.id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['net-worth'] });
    },
  });
};

export const useUpdateNetWorthEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: NetWorthEntryUpdate }) => financeApi.updateNetWorthEntry(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['net-worth'] });
    },
  });
};

export const useDeleteNetWorthEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
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
