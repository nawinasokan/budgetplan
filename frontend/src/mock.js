// Mock data for budget planner app
export const mockTransactions = [
  {
    id: '1',
    date: '2025-01-15',
    type: 'expense',
    amount: 45.50,
    category: 'Food',
    description: 'Grocery shopping',
    createdAt: '2025-01-15T10:30:00Z'
  },
  {
    id: '2',
    date: '2025-01-14',
    type: 'income',
    amount: 2500.00,
    category: 'Income',
    description: 'Salary',
    createdAt: '2025-01-14T09:00:00Z'
  },
  {
    id: '3',
    date: '2025-01-13',
    type: 'expense',
    amount: 25.00,
    category: 'Transportation',
    description: 'Gas',
    createdAt: '2025-01-13T16:45:00Z'
  },
  {
    id: '4',
    date: '2025-01-12',
    type: 'expense',
    amount: 60.00,
    category: 'Entertainment',
    description: 'Movie tickets',
    createdAt: '2025-01-12T19:30:00Z'
  },
  {
    id: '5',
    date: '2025-01-11',
    type: 'expense',
    amount: 120.00,
    category: 'Food',
    description: 'Restaurant dinner',
    createdAt: '2025-01-11T20:15:00Z'
  },
  {
    id: '6',
    date: '2025-01-10',
    type: 'expense',
    amount: 35.00,
    category: 'Transportation',
    description: 'Uber ride',
    createdAt: '2025-01-10T14:20:00Z'
  },
  {
    id: '7',
    date: '2025-01-09',
    type: 'income',
    amount: 150.00,
    category: 'Income',
    description: 'Freelance work',
    createdAt: '2025-01-09T11:00:00Z'
  },
  {
    id: '8',
    date: '2025-01-08',
    type: 'expense',
    amount: 80.00,
    category: 'Entertainment',
    description: 'Concert tickets',
    createdAt: '2025-01-08T18:45:00Z'
  }
];

export const mockCategories = [
  { id: 'food', name: 'Food', color: '#FFB5B5', budget: 500 },
  { id: 'transportation', name: 'Transportation', color: '#B5E7FF', budget: 300 },
  { id: 'entertainment', name: 'Entertainment', color: '#C9FFB5', budget: 200 }
];

export const mockBudgets = {
  food: { limit: 500, spent: 165.50 },
  transportation: { limit: 300, spent: 60.00 },
  entertainment: { limit: 200, spent: 140.00 }
};

// Helper functions for local storage simulation
export const getStoredTransactions = () => {
  const stored = localStorage.getItem('budgetPlannerTransactions');
  return stored ? JSON.parse(stored) : mockTransactions;
};

export const saveTransactions = (transactions) => {
  localStorage.setItem('budgetPlannerTransactions', JSON.stringify(transactions));
};

export const getStoredBudgets = () => {
  const stored = localStorage.getItem('budgetPlannerBudgets');
  return stored ? JSON.parse(stored) : mockBudgets;
};

export const saveBudgets = (budgets) => {
  localStorage.setItem('budgetPlannerBudgets', JSON.stringify(budgets));
};