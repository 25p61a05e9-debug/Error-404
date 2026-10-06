import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { analyticsData, defaultProfile, mockBudgets, mockTransactions } from '../data/mockData';

const FinanceContext = createContext(null);

const STORAGE_KEYS = {
    transactions: 'fintrack-transactions',
    budgets: 'fintrack-budgets',
    profile: 'fintrack-profile',
};

function readStorage(key, fallback) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch {
        return fallback;
    }
}

export function FinanceProvider({ children }) {
    const [transactions, setTransactions] = useState(() => readStorage(STORAGE_KEYS.transactions, mockTransactions));
    const [budgets, setBudgets] = useState(() => readStorage(STORAGE_KEYS.budgets, mockBudgets));
    const [profile, setProfile] = useState(() => readStorage(STORAGE_KEYS.profile, defaultProfile));

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.budgets, JSON.stringify(budgets));
    }, [budgets]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
    }, [profile]);

    const addTransaction = (transaction) => {
        const next = {
            id: Date.now(),
            status: 'Completed',
            date: new Date().toISOString().slice(0, 10),
            ...transaction,
        };
        setTransactions((prev) => [next, ...prev]);
    };

    const updateTransaction = (id, updates) => {
        setTransactions((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
    };

    const deleteTransaction = (id) => {
        setTransactions((prev) => prev.filter((item) => item.id !== id));
    };

    const addBudget = (budget) => {
        setBudgets((prev) => [
            {
                id: Date.now(),
                category: budget.category,
                limit: Number(budget.limit),
                spent: Number(budget.spent || 0),
                color: 'bg-cyan-500',
            },
            ...prev,
        ]);
    };

    const updateBudget = (id, updates) => {
        setBudgets((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
    };

    const deleteBudget = (id) => {
        setBudgets((prev) => prev.filter((item) => item.id !== id));
    };

    const totalIncome = useMemo(() => transactions.filter((t) => t.type === 'Income').reduce((sum, item) => sum + Number(item.amount), 0), [transactions]);
    const totalExpenses = useMemo(() => transactions.filter((t) => t.type === 'Expense').reduce((sum, item) => sum + Number(item.amount), 0), [transactions]);
    const balance = totalIncome - totalExpenses;
    const savings = balance;

    const value = {
        transactions,
        budgets,
        profile,
        analyticsData,
        totalIncome,
        totalExpenses,
        balance,
        savings,
        setProfile,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addBudget,
        updateBudget,
        deleteBudget,
    };

    return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
    const context = useContext(FinanceContext);
    if (!context) throw new Error('useFinance must be inside FinanceProvider');
    return context;
}
