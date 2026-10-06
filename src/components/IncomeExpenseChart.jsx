import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { analyticsData } from '../data/mockData';

export default function IncomeExpenseChart() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-white">Income vs expenses</h2>
                    <p className="text-sm text-slate-400">Current financial trend</p>
                </div>
            </div>

            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData}>
                        <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                        <Line type="monotone" dataKey="income" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4, fill: '#22d3ee' }} />
                        <Line type="monotone" dataKey="expenses" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6' }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
