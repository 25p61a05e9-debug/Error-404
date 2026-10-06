import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useFinance } from '../context/FinanceContext';

const COLORS = ['#22d3ee', '#a78bfa', '#f59e0b', '#34d399', '#f97316', '#ef4444'];

export default function SpendingChart() {
    const { transactions } = useFinance();
    const totals = Object.entries(
        transactions
            .filter((item) => item.type === 'Expense')
            .reduce((acc, item) => {
                acc[item.category] = (acc[item.category] || 0) + Number(item.amount || 0);
                return acc;
            }, {}),
    ).map(([name, value]) => ({ name, value }));

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-white">Expense categories</h2>
                <p className="text-sm text-slate-400">Your spending mix this month</p>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={totals} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3}>
                            {totals.map((entry, index) => (
                                <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-2 space-y-2">
                {totals.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[index % COLORS.length] }} />
                            {item.name}
                        </div>
                        <span className="font-medium text-white">₹{item.value.toLocaleString('en-IN')}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
