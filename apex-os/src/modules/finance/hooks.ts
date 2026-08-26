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
    mutationFn: (data: TransactionInsert) => financeApi.addTransaction({ ...data, owner_id: user?.id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['finance-stats'] });
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
    mutationFn: (data: BudgetInsert) => financeApi.addBudget({ ...data, owner_id: user?.id! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
};

export const useUpdateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: BudgetUpdate }) => financeApi.updateBudget(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
};

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => financeApi.deleteBudget(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
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
    mutationFn: (data: RecurringExpenseInsert) => financeApi.addRecurringExpense({ ...data, owner_id: user?.id! }),
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
    mutationFn: (data: PeopleSplitInsert) => financeApi.addPeopleSplit({ ...data, owner_id: user?.id! }),
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
    mutationFn: (data: NetWorthEntryInsert) => financeApi.addNetWorthEntry({ ...data, owner_id: user?.id! }),
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

// --- Stats ---
export const useFinanceStats = (month?: number, year?: number) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['finance-stats', user?.id, month, year],
    queryFn: async () => {
      if (!user?.id) return {
        totalIncome: 0,
        totalExpenses: 0,
        savings: 0,
        savingsRate: 0,
        categorySpend: [],
        monthlyTrend: [],
        budgetActual: [],
        needWantSplit: [],
        essentialDiscretionarySplit: []
      };

      const transactions = await financeApi.getTransactions(user.id, { month, year });
      const budgets = await financeApi.getBudgets(user.id);
      
      const totalIncome = transactions
        .filter(t => t.transaction_type === 'Income')
        .reduce((sum, t) => sum + (t.amount || 0), 0);
      const totalExpenses = transactions
        .filter(t => t.transaction_type === 'Expense')
        .reduce((sum, t) => sum + (t.amount || 0), 0);
      const savings = totalIncome - totalExpenses;
      const savingsRate = totalIncome > 0 ? Math.round((savings / totalIncome) * 100) : 0;
      
      // Category spend
      const catMap: Record<string, number> = {};
      transactions.filter(t => t.transaction_type === 'Expense').forEach(t => {
        const cat = t.category || 'Other';
        catMap[cat] = (catMap[cat] || 0) + Number(t.amount || 0);
      });
      const categorySpend = Object.keys(catMap).map(name => ({ name, value: catMap[name] }));

      // Need vs want
      let needTotal = 0;
      let wantTotal = 0;
      transactions.filter(t => t.transaction_type === 'Expense').forEach(t => {
        if (t.need_want === 'Need') needTotal += Number(t.amount || 0);
        else if (t.need_want === 'Want') wantTotal += Number(t.amount || 0);
      });
      const needWantSplit = [
        { name: 'Need', value: needTotal || 1 },
        { name: 'Want', value: wantTotal || 1 }
      ];

      // Essential vs Discretionary
      let essentialTotal = 0;
      let discTotal = 0;
      transactions.filter(t => t.transaction_type === 'Expense').forEach(t => {
        if (t.essential_discretionary === 'Essential') essentialTotal += Number(t.amount || 0);
        else if (t.essential_discretionary === 'Discretionary') discTotal += Number(t.amount || 0);
      });
      const essentialDiscretionarySplit = [
        { name: 'Essential', value: essentialTotal || 1 },
        { name: 'Discretionary', value: discTotal || 1 }
      ];

      // Monthly trend dummy/recent aggregation
      const monthlyTrend = [
        { month: 'Jun', income: 80000, expenses: 32000 },
        { month: 'Jul', income: 85000, expenses: 38000 },
        { month: 'Aug', income: totalIncome || 85000, expenses: totalExpenses || 35417 },
      ];

      const budgetActual = budgets.map(b => ({
        category: b.category,
        budget: b.monthly_budget,
        actual: catMap[b.category] || 0
      }));

      return {
        totalIncome,
        totalExpenses,
        savings,
        savingsRate,
        categorySpend: categorySpend.length ? categorySpend : [{ name: 'Housing', value: 22000 }, { name: 'Food', value: 8000 }],
        monthlyTrend,
        budgetActual,
        needWantSplit,
        essentialDiscretionarySplit,
      };
    },
    enabled: !!user?.id,
  });
};
