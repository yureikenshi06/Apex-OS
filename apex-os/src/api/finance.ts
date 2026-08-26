import { supabase } from '@/lib/supabase';
import type { 
  Transaction, TransactionInsert, TransactionUpdate,
  Budget, BudgetInsert, BudgetUpdate,
  RecurringExpense, RecurringExpenseInsert, RecurringExpenseUpdate,
  PeopleSplit, PeopleSplitInsert, PeopleSplitUpdate,
  NetWorthEntry, NetWorthEntryInsert, NetWorthEntryUpdate
} from '@/api/types';

// Transactions
export async function getTransactions(ownerId: string, filters?: { month?: string | number, year?: number, category?: string, type?: string }): Promise<Transaction[]> {
  let query = supabase
    .from('transactions')
    .select('*')
    .eq('owner_id', ownerId)
    .order('date', { ascending: false });

  if (filters) {
    if (filters.category) query = query.eq('category', filters.category);
    if (filters.type) query = query.eq('transaction_type', filters.type);
    
    if (typeof filters.month === 'number' && filters.year !== undefined) {
      const startDate = new Date(filters.year, filters.month - 1, 1).toISOString().split('T')[0];
      const endDate = new Date(filters.year, filters.month, 0).toISOString().split('T')[0];
      query = query.gte('date', startDate).lte('date', endDate);
    } else if (filters.year !== undefined) {
      const startDate = `${filters.year}-01-01`;
      const endDate = `${filters.year}-12-31`;
      query = query.gte('date', startDate).lte('date', endDate);
    }
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getTransactionsByMonth(ownerId: string, month: number, year: number): Promise<Transaction[]> {
  return getTransactions(ownerId, { month, year });
}

export async function addTransaction(item: TransactionInsert): Promise<Transaction> {
  const { data, error } = await supabase.from('transactions').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateTransaction(id: string, updates: TransactionUpdate): Promise<Transaction> {
  const { data, error } = await supabase.from('transactions').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteTransaction(id: string): Promise<void> {
  const { error } = await supabase.from('transactions').delete().eq('id', id);
  if (error) throw error;
}

// Budgets
export async function getBudgets(ownerId: string): Promise<Budget[]> {
  const { data, error } = await supabase
    .from('budgets')
    .select('*')
    .eq('owner_id', ownerId);
  if (error) throw error;
  return data || [];
}

export async function addBudget(item: BudgetInsert): Promise<Budget> {
  const { data, error } = await supabase.from('budgets').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateBudget(id: string, updates: BudgetUpdate): Promise<Budget> {
  const { data, error } = await supabase.from('budgets').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteBudget(id: string): Promise<void> {
  const { error } = await supabase.from('budgets').delete().eq('id', id);
  if (error) throw error;
}

// Recurring Expenses
export async function getRecurringExpenses(ownerId: string, activeOnly: boolean = true): Promise<RecurringExpense[]> {
  let query = supabase.from('recurring_expenses').select('*').eq('owner_id', ownerId);
  if (activeOnly) {
    query = query.eq('is_active', true);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function addRecurringExpense(item: RecurringExpenseInsert): Promise<RecurringExpense> {
  const { data, error } = await supabase.from('recurring_expenses').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateRecurringExpense(id: string, updates: RecurringExpenseUpdate): Promise<RecurringExpense> {
  const { data, error } = await supabase.from('recurring_expenses').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteRecurringExpense(id: string): Promise<void> {
  const { error } = await supabase.from('recurring_expenses').delete().eq('id', id);
  if (error) throw error;
}

export async function markRecurringAsPaid(recurringExpenseId: string, ownerId: string): Promise<void> {
  const { data: expense, error: getError } = await supabase
    .from('recurring_expenses')
    .select('*')
    .eq('id', recurringExpenseId)
    .eq('owner_id', ownerId)
    .single();
    
  if (getError || !expense) throw getError || new Error('Not found');

  const now = new Date();
  
  const transaction: TransactionInsert = {
    owner_id: ownerId,
    amount: expense.amount,
    category: expense.category || 'Recurring',
    subcategory: expense.subcategory || null,
    date: now.toISOString().split('T')[0],
    transaction_type: 'Expense',
    description: `Paid: ${expense.expense_name}`,
    payment_method: expense.payment_method || null,
    account_wallet: expense.account || null,
    merchant_payee: expense.expense_name,
    assigned_to: expense.assigned_to || 'Self',
    need_want: 'Need',
    essential_discretionary: 'Essential',
    is_recurring: true,
    recurring_frequency: expense.frequency || 'Monthly',
    status: 'Completed',
    paid_by_me: expense.amount,
    my_share: expense.amount,
    recoverable: 0,
    recovered: 0,
    outstanding: 0,
    notes: expense.notes || null,
    tags: ['recurring'],
  };

  await addTransaction(transaction);

  let nextDue = expense.next_due_date ? new Date(expense.next_due_date) : new Date();
  if (expense.frequency === 'Monthly') {
    nextDue.setMonth(nextDue.getMonth() + 1);
  } else if (expense.frequency === 'Quarterly') {
    nextDue.setMonth(nextDue.getMonth() + 3);
  } else if (expense.frequency === 'Yearly') {
    nextDue.setFullYear(nextDue.getFullYear() + 1);
  }

  await updateRecurringExpense(recurringExpenseId, { next_due_date: nextDue.toISOString().split('T')[0] });
}

// People Splits
export async function getPeopleSplits(ownerId: string): Promise<PeopleSplit[]> {
  const { data, error } = await supabase.from('people_splits').select('*').eq('owner_id', ownerId);
  if (error) throw error;
  return data || [];
}

export async function addPeopleSplit(item: PeopleSplitInsert): Promise<PeopleSplit> {
  const { data, error } = await supabase.from('people_splits').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updatePeopleSplit(id: string, updates: PeopleSplitUpdate): Promise<PeopleSplit> {
  const { data, error } = await supabase.from('people_splits').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deletePeopleSplit(id: string): Promise<void> {
  const { error } = await supabase.from('people_splits').delete().eq('id', id);
  if (error) throw error;
}

// Net Worth Entries
export async function getNetWorthEntries(ownerId: string): Promise<NetWorthEntry[]> {
  const { data, error } = await supabase
    .from('net_worth_entries')
    .select('*')
    .eq('owner_id', ownerId)
    .order('month_date', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function addNetWorthEntry(item: NetWorthEntryInsert): Promise<NetWorthEntry> {
  const { data, error } = await supabase.from('net_worth_entries').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateNetWorthEntry(id: string, updates: NetWorthEntryUpdate): Promise<NetWorthEntry> {
  const { data, error } = await supabase.from('net_worth_entries').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteNetWorthEntry(id: string): Promise<void> {
  const { error } = await supabase.from('net_worth_entries').delete().eq('id', id);
  if (error) throw error;
}
