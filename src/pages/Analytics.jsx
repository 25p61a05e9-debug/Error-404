import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { analyticsData } from '../data/mockData';

const filters = ['7 days', '30 days', '6 months', '1 year'];

export default function Analytics() {
    const [selectedRange, setSelectedRange] = useState('30 days');

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">Analytics</p>
                    <h1 className="mt-2 text-3xl font-bold text-white">Financial analytics</h1>
                </div>
                <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                        <button key={filter} type="button" onClick={() => setSelectedRange(filter)} className={`rounded-xl px-3 py-2 text-sm ${selectedRange === filter ? 'bg-cyan-500 text-slate-950' : 'border border-slate-700 bg-slate-900 text-slate-300'}`}>
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
                    <p className="text-sm text-slate-400">Spending trend</p>
                    <p className="mt-2 text-2xl font-semibold text-white">-12%</p>
                    <p className="mt-2 text-sm text-emerald-400">Your spending decreased this month.</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
                    <p className="text-sm text-slate-400">Top category</p>
                    <p className="mt-2 text-2xl font-semibold text-white">Food</p>
                    <p className="mt-2 text-sm text-cyan-400">Highest spending category.</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
                    <p className="text-sm text-slate-400">Savings</p>
                    <p className="mt-2 text-2xl font-semibold text-white">₹17,420</p>
                    <p className="mt-2 text-sm text-violet-400">Solid savings trend this month.</p>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
                    <h2 className="mb-4 text-xl font-semibold text-white">Monthly spending trend</h2>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={analyticsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                                <Line type="monotone" dataKey="expenses" stroke="#22d3ee" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
                    <h2 className="mb-4 text-xl font-semibold text-white">Income vs expenses</h2>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analyticsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                                <Bar dataKey="income" fill="#22d3ee" radius={[6, 6, 0, 0]} />
                                <Bar dataKey="expenses" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
