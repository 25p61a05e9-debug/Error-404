import { useMemo, useState } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';
import { useFinance } from '../context/FinanceContext';

export default function FutureSpendSimulator() {
    const { totalIncome, totalExpenses, balance } = useFinance();
    const [purchaseName, setPurchaseName] = useState('New Phone');
    const [purchaseAmount, setPurchaseAmount] = useState(20000);
    const [month, setMonth] = useState('November 2026');

    const simulation = useMemo(() => {
        const purchase = Number(purchaseAmount || 0);
        const projectedBalance = balance - purchase;
        const currentSavingsRate = totalIncome ? (balance / totalIncome) * 100 : 0;
        const afterPurchaseRate = totalIncome ? (projectedBalance / totalIncome) * 100 : 0;

        let status = 'risk';
        let text = 'This purchase may strain your monthly savings.';

        if (projectedBalance >= 0) {
            status = 'safe';
            text = 'You can comfortably afford this purchase while keeping a healthy buffer.';
        } else if (projectedBalance >= -10000) {
            status = 'caution';
            text = 'Your purchase is affordable, but it may reduce your monthly savings.';
        }

        return {
            projectedBalance,
            currentSavingsRate,
            afterPurchaseRate,
            status,
            text,
        };
    }, [balance, purchaseAmount, totalIncome]);

    return (
        <div className="rounded-[28px] border border-violet-500/30 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.18),transparent_28%),rgba(15,23,42,0.95)] p-5 shadow-[0_0_30px_rgba(168,85,247,0.12)]">
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-violet-400">Future spend simulator</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">Can I afford a future purchase?</h2>
                </div>
                <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-3 text-violet-300">
                    <Calculator className="h-5 w-5" />
                </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
                <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm text-slate-300">Purchase name</label>
                            <input value={purchaseName} onChange={(e) => setPurchaseName(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-violet-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm text-slate-300">Purchase amount</label>
                            <input type="number" value={purchaseAmount} onChange={(e) => setPurchaseAmount(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-violet-500 focus:outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">Expected purchase month</label>
                        <select value={month} onChange={(e) => setMonth(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-violet-500 focus:outline-none">
                            <option>November 2026</option>
                            <option>December 2026</option>
                            <option>January 2027</option>
                        </select>
                    </div>

                    <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-400">Projected outcome</p>
                                <p className={`mt-1 text-2xl font-semibold ${simulation.status === 'safe' ? 'text-emerald-400' : simulation.status === 'caution' ? 'text-amber-400' : 'text-rose-400'}`}>
                                    {simulation.status === 'safe' ? 'Yes, you can afford this purchase.' : simulation.status === 'caution' ? 'Proceed with caution.' : 'This may be risky.'}
                                </p>
                            </div>
                            <TrendingUp className={`h-8 w-8 ${simulation.status === 'safe' ? 'text-emerald-400' : simulation.status === 'caution' ? 'text-amber-400' : 'text-rose-400'}`} />
                        </div>
                        <p className="mt-3 text-sm text-slate-300">{simulation.text}</p>
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
                    <p className="text-sm text-slate-400">Projected balance</p>
                    <p className="mt-2 text-3xl font-bold text-white">{formatCurrency(simulation.projectedBalance)}</p>
                    <div className="mt-5 space-y-4">
                        <div>
                            <div className="mb-1 flex items-center justify-between text-sm text-slate-300"><span>Current savings rate</span><span>{Math.round(simulation.currentSavingsRate)}%</span></div>
                            <div className="h-2.5 rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" style={{ width: `${Math.min(simulation.currentSavingsRate, 100)}%` }} /></div>
                        </div>
                        <div>
                            <div className="mb-1 flex items-center justify-between text-sm text-slate-300"><span>After purchase</span><span>{Math.round(simulation.afterPurchaseRate)}%</span></div>
                            <div className="h-2.5 rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-500" style={{ width: `${Math.min(simulation.afterPurchaseRate, 100)}%` }} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
