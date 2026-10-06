import { ArrowRight, CreditCard, DollarSign, Landmark, PiggyBank, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import IncomeExpenseChart from '../components/IncomeExpenseChart';
import RecentTransactions from '../components/RecentTransactions';
import SpendingChart from '../components/SpendingChart';
import FutureSpendSimulator from '../components/FutureSpendSimulator';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/formatCurrency';
import StatCard from '../components/StatCard';

export default function Dashboard() {
    const { transactions, totalIncome, totalExpenses, balance, savings } = useFinance();

    const recent = transactions.slice(0, 5);
    const budgetProgress = [
        { category: 'Food', percentage: 72, spent: 7200, limit: 10000 },
        { category: 'Transport', percentage: 35, spent: 3500, limit: 10000 },
        { category: 'Shopping', percentage: 60, spent: 6000, limit: 10000 },
        { category: 'Entertainment', percentage: 84, spent: 4200, limit: 5000 },
        { category: 'Bills', percentage: 87, spent: 15600, limit: 18000 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-cyan-400">Overview</p>
                    <h1 className="mt-2 text-3xl font-bold text-white md:text-5xl">Good evening, Alex 👋</h1>
                    <p className="mt-2 text-slate-400">Here&apos;s your financial overview.</p>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200">
                    <span>Month</span>
                    <select className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-white focus:outline-none">
                        <option>October 2026</option>
                        <option>September 2026</option>
                        <option>August 2026</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard title="Total Balance" value={formatCurrency(balance)} detail="12.4%" positive icon={Wallet} />
                <StatCard title="Monthly Income" value={formatCurrency(totalIncome)} detail="8.2%" positive icon={DollarSign} />
                <StatCard title="Monthly Expenses" value={formatCurrency(totalExpenses)} detail="3.1%" positive={false} icon={CreditCard} />
                <StatCard title="Savings" value={formatCurrency(savings)} detail="9.7%" positive icon={PiggyBank} />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.45fr_0.9fr]">
                <IncomeExpenseChart />
                <SpendingChart />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-white">Recent transactions</h2>
                            <p className="text-sm text-slate-400">Latest movement across your accounts</p>
                        </div>
                        <Link to="/transactions" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition hover:text-cyan-300">
                            View all transactions <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <RecentTransactions transactions={recent} />
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-white">Budget overview</h2>
                            <p className="text-sm text-slate-400">Spending against allocated limits</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {budgetProgress.map((budget) => (
                            <div key={budget.category}>
                                <div className="mb-1 flex items-center justify-between text-sm text-slate-300">
                                    <span>{budget.category}</span>
                                    <span>{budget.percentage}%</span>
                                </div>
                                <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" style={{ width: `${budget.percentage}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <FutureSpendSimulator />
        </div>
    );
}
