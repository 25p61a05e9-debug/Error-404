const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const readLocal = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const api = {
  async login(email, password) {
    await delay();
    if (!email || !password) throw new Error('Email and password are required');
    return {
      user: { email, name: 'Alex Morgan' },
      token: 'demo-token',
    };
  },

  async register(payload) {
    await delay();
    const user = { ...payload, id: Date.now() };
    writeLocal('fintrack-user', user);
    return user;
  },

  async getTransactions() {
    await delay();
    return readLocal('fintrack-transactions', []);
  },

  async createTransaction(transaction) {
    await delay();
    const items = readLocal('fintrack-transactions', []);
    const next = [...items, { ...transaction, id: Date.now() }];
    writeLocal('fintrack-transactions', next);
    return next;
  },

  async updateTransaction(id, updates) {
    await delay();
    const items = readLocal('fintrack-transactions', []);
    const next = items.map((item) => (item.id === id ? { ...item, ...updates } : item));
    writeLocal('fintrack-transactions', next);
    return next;
  },

  async deleteTransaction(id) {
    await delay();
    const items = readLocal('fintrack-transactions', []);
    const next = items.filter((item) => item.id !== id);
    writeLocal('fintrack-transactions', next);
    return next;
  },

  async getBudgets() {
    await delay();
    return readLocal('fintrack-budgets', []);
  },

  async createBudget(budget) {
    await delay();
    const items = readLocal('fintrack-budgets', []);
    const next = [...items, { ...budget, id: Date.now() }];
    writeLocal('fintrack-budgets', next);
    return next;
  },
};
