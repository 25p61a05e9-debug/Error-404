export const mockTransactions = [
    { id: 1, date: '2026-10-01', description: 'Salary', category: 'Salary', type: 'Income', amount: 60000, notes: 'Monthly salary deposit', status: 'Completed' },
    { id: 2, date: '2026-10-01', description: 'Swiggy', category: 'Food', type: 'Expense', amount: 450, notes: 'Dinner delivery', status: 'Completed' },
    { id: 3, date: '2026-10-02', description: 'Uber', category: 'Transport', type: 'Expense', amount: 280, notes: 'Office commute', status: 'Completed' },
    { id: 4, date: '2026-10-03', description: 'Amazon', category: 'Shopping', type: 'Expense', amount: 2400, notes: 'Home essentials', status: 'Completed' },
    { id: 5, date: '2026-10-04', description: 'Netflix', category: 'Bills', type: 'Expense', amount: 649, notes: 'Streaming subscription', status: 'Completed' },
    { id: 6, date: '2026-10-05', description: 'Freelance Project', category: 'Freelance', type: 'Income', amount: 12000, notes: 'Landing page redesign', status: 'Completed' },
    { id: 7, date: '2026-10-06', description: 'Zomato', category: 'Food', type: 'Expense', amount: 520, notes: 'Lunch orders', status: 'Completed' },
    { id: 8, date: '2026-10-08', description: 'Metro Card', category: 'Transport', type: 'Expense', amount: 320, notes: 'Commuter pass', status: 'Completed' },
    { id: 9, date: '2026-10-09', description: 'BookMyShow', category: 'Entertainment', type: 'Expense', amount: 1100, notes: 'Movie tickets', status: 'Completed' },
    { id: 10, date: '2026-10-10', description: 'Apollo Pharmacy', category: 'Health', type: 'Expense', amount: 980, notes: 'Medicine refill', status: 'Completed' },
    { id: 11, date: '2026-10-11', description: 'Udemy', category: 'Education', type: 'Expense', amount: 2200, notes: 'Frontend course', status: 'Completed' },
    { id: 12, date: '2026-10-11', description: 'Apple', category: 'Shopping', type: 'Expense', amount: 3650, notes: 'Accessories', status: 'Pending' },
    { id: 13, date: '2026-10-12', description: 'DIgital Ocean', category: 'Bills', type: 'Expense', amount: 870, notes: 'Hosting bill', status: 'Completed' },
    { id: 14, date: '2026-10-13', description: 'Gift from Family', category: 'Other', type: 'Income', amount: 5000, notes: 'Support fund', status: 'Completed' },
    { id: 15, date: '2026-10-15', description: 'Croma', category: 'Shopping', type: 'Expense', amount: 4200, notes: 'Laptop docking station', status: 'Completed' },
    { id: 16, date: '2026-10-18', description: 'Myntra', category: 'Shopping', type: 'Expense', amount: 1875, notes: 'Clothing purchase', status: 'Completed' },
    { id: 17, date: '2026-10-20', description: 'McDonalds', category: 'Food', type: 'Expense', amount: 640, notes: 'Family dinner', status: 'Completed' },
    { id: 18, date: '2026-10-21', description: 'INR rent transfer', category: 'Bills', type: 'Expense', amount: 13500, notes: 'Apartment rent', status: 'Completed' },
    { id: 19, date: '2026-10-23', description: 'FreeLancer retainer', category: 'Freelance', type: 'Income', amount: 18000, notes: 'Monthly retainer', status: 'Completed' },
    { id: 20, date: '2026-10-25', description: 'Blinkit', category: 'Food', type: 'Expense', amount: 890, notes: 'Groceries', status: 'Completed' },
];

export const mockBudgets = [
    { id: 1, category: 'Food', limit: 10000, spent: 7200, color: 'bg-emerald-500' },
    { id: 2, category: 'Transport', limit: 10000, spent: 3500, color: 'bg-cyan-500' },
    { id: 3, category: 'Shopping', limit: 10000, spent: 6000, color: 'bg-violet-500' },
    { id: 4, category: 'Entertainment', limit: 5000, spent: 4200, color: 'bg-amber-500' },
    { id: 5, category: 'Bills', limit: 18000, spent: 15600, color: 'bg-rose-500' },
];

export const analyticsData = [
    { month: 'Jan', income: 54000, expenses: 35000, savings: 19000 },
    { month: 'Feb', income: 56000, expenses: 38200, savings: 17800 },
    { month: 'Mar', income: 58000, expenses: 36800, savings: 21200 },
    { month: 'Apr', income: 61000, expenses: 40500, savings: 20500 },
    { month: 'May', income: 60000, expenses: 42900, savings: 17100 },
    { month: 'Jun', income: 60000, expenses: 42580, savings: 17420 },
];

export const defaultProfile = {
    fullName: 'Alex Morgan',
    email: 'alex@fintrack.app',
    currency: 'INR',
    monthlyIncomeTarget: 60000,
    savingsGoal: 25000,
};
