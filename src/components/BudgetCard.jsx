import { Pencil, Trash2 } from 'lucide-react';

export default function BudgetCard({ budget, onEdit, onDelete }) {
    const progress = Math.min((budget.spent / budget.limit) * 100, 100);
    const remaining = budget.limit - budget.spent;
    const status = progress < 70 ? 'under' : progress < 90 ? 'warning' : 'over';

    const tone = {
        under: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        over: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    }[status];

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-cyan-500/10 p-2 text-cyan-400">🏷️</div>
                    <div>
                        <p className="text-lg font-semibold text-white">{budget.category}</p>
                        <p className="text-sm text-slate-400">{budget.spent} / {budget.limit}</p>
                    </div>
                </div>
                <div className={`rounded-full border px-2.5 py-1 text-xs font-medium ${tone}`}>
                    {status === 'under' ? 'Under control' : status === 'warning' ? 'Near limit' : 'Exceeded'}
                </div>
            </div>

            <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                <span>{Math.round(progress)}%</span>
                <span>Remaining: ₹{Math.max(remaining, 0).toLocaleString('en-IN')}</span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                <div className={`h-full rounded-full ${status === 'under' ? 'bg-emerald-500' : status === 'warning' ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${progress}%` }} />
            </div>

            <div className="mt-5 flex justify-end gap-2">
                <button type="button" onClick={() => onEdit(budget)} className="rounded-lg border border-slate-700 bg-slate-950 p-2 text-cyan-300 hover:border-slate-600"><Pencil className="h-4 w-4" /></button>
                <button type="button" onClick={() => onDelete(budget.id)} className="rounded-lg border border-slate-700 bg-slate-950 p-2 text-rose-300 hover:border-slate-600"><Trash2 className="h-4 w-4" /></button>
            </div>
        </div>
    );
}
