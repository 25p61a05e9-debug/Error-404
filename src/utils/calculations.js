export function getTotalIncome(transactions = []) {
  return transactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
}

export function getTotalExpenses(transactions = []) {
  return transactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
}

export function getBalance(transactions = []) {
  return getTotalIncome(transactions) - getTotalExpenses(transactions);
}

export function getSavings(transactions = []) {
  return getBalance(transactions);
}

export function getCategoryExpenses(transactions = []) {
  const totals = {};
  transactions.forEach((item) => {
    if (item.type === 'Expense') {
      totals[item.category] = (totals[item.category] || 0) + Number(item.amount || 0);
    }
  });
  return Object.entries(totals).map(([name, value]) => ({ name, value }));
}

export function getBudgetProgress(budget) {
  if (!budget || !budget.limit) return 0;
  return Math.min((Number(budget.spent || 0) / Number(budget.limit || 1)) * 100, 100);
}
