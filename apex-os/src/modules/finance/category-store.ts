import { useState, useEffect } from 'react';

export interface CategoryMap {
  [category: string]: string[];
}

export interface FinanceCategoryConfig {
  Expense: CategoryMap;
  Income: CategoryMap;
  Transfer: CategoryMap;
}

export const DEFAULT_FINANCE_CATEGORIES: FinanceCategoryConfig = {
  Expense: {
    Food: ['Groceries', 'Restaurants', 'Cafes', 'Snacks', 'Delivery', 'Dining Out'],
    Transport: ['Public Transport', 'Taxi', 'Fuel', 'Parking', 'Vehicle Maintenance'],
    Education: ['Tuition', 'Books', 'Courses', 'Certifications', 'Study Material'],
    Health: ['Medicine', 'Doctor', 'Fitness', 'Gym', 'Wellness'],
    Housing: ['Rent', 'Electricity', 'Internet', 'Maintenance', 'Household Items'],
    Entertainment: ['Movies', 'Games', 'Events', 'Streaming', 'Hobbies'],
    Shopping: ['Clothing', 'Electronics', 'Personal Care', 'Accessories'],
    Finance: ['Bank Fees', 'Investment Fees', 'Loan Payments', 'Credit Card Fees'],
    Travel: ['Flights', 'Hotels', 'Food', 'Local Transport', 'Activities'],
    Personal: ['Gifts', 'Donations', 'Miscellaneous'],
    Other: ['Other'],
  },
  Income: {
    Salary: ['Monthly Salary', 'Bonus', 'Stipend'],
    Freelance: ['Consulting', 'Content Creation', 'Tutoring'],
    Investment: ['Dividends', 'Interest', 'Capital Gains'],
    Reimbursement: ['Office', 'Travel', 'Medical'],
    Other: ['Gift Received', 'Cashback', 'Other'],
  },
  Transfer: {
    'Bank Transfer': ['Savings', 'Investment Account', 'Other'],
    'Wallet': ['UPI Wallet', 'Other'],
    'Other': ['Other'],
  }
};

const STORAGE_KEY = 'apex_finance_categories_v2';

export function getStoredCategories(): FinanceCategoryConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.Expense && parsed.Income && parsed.Transfer) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading stored categories:', e);
  }
  return DEFAULT_FINANCE_CATEGORIES;
}

export function saveStoredCategories(config: FinanceCategoryConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    window.dispatchEvent(new Event('apex_categories_updated'));
  } catch (e) {
    console.error('Error saving categories:', e);
  }
}

export function useFinanceCategories() {
  const [categories, setCategories] = useState<FinanceCategoryConfig>(getStoredCategories);

  useEffect(() => {
    const handleUpdate = () => {
      setCategories(getStoredCategories());
    };
    window.addEventListener('apex_categories_updated', handleUpdate);
    return () => window.removeEventListener('apex_categories_updated', handleUpdate);
  }, []);

  const addSubcategory = (type: 'Expense' | 'Income' | 'Transfer', category: string, subcategory: string) => {
    const trimmed = subcategory.trim();
    if (!trimmed) return;

    const updated = { ...categories };
    if (!updated[type][category]) {
      updated[type][category] = [];
    }
    if (!updated[type][category].includes(trimmed)) {
      updated[type][category] = [...updated[type][category], trimmed];
      saveStoredCategories(updated);
      setCategories(updated);
    }
  };

  const editSubcategory = (
    type: 'Expense' | 'Income' | 'Transfer', 
    category: string, 
    oldSubcategory: string, 
    newSubcategory: string
  ) => {
    const trimmed = newSubcategory.trim();
    if (!trimmed || trimmed === oldSubcategory) return;

    const updated = { ...categories };
    if (updated[type][category]) {
      updated[type][category] = updated[type][category].map(s => s === oldSubcategory ? trimmed : s);
      saveStoredCategories(updated);
      setCategories(updated);
    }
  };

  const deleteSubcategory = (type: 'Expense' | 'Income' | 'Transfer', category: string, subcategory: string) => {
    const updated = { ...categories };
    if (updated[type][category]) {
      updated[type][category] = updated[type][category].filter(s => s !== subcategory);
      saveStoredCategories(updated);
      setCategories(updated);
    }
  };

  const addCategory = (type: 'Expense' | 'Income' | 'Transfer', category: string) => {
    const trimmed = category.trim();
    if (!trimmed) return;

    const updated = { ...categories };
    if (!updated[type][trimmed]) {
      updated[type][trimmed] = ['General'];
      saveStoredCategories(updated);
      setCategories(updated);
    }
  };

  const deleteCategory = (type: 'Expense' | 'Income' | 'Transfer', category: string) => {
    const updated = { ...categories };
    delete updated[type][category];
    saveStoredCategories(updated);
    setCategories(updated);
  };

  const resetToDefaults = () => {
    saveStoredCategories(DEFAULT_FINANCE_CATEGORIES);
    setCategories(DEFAULT_FINANCE_CATEGORIES);
  };

  return {
    categories,
    addSubcategory,
    editSubcategory,
    deleteSubcategory,
    addCategory,
    deleteCategory,
    resetToDefaults,
  };
}
