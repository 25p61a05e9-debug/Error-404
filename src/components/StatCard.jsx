import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

export default function StatCard({ title, value, detail, positive = true, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-[0_0_0_1px_rgba(15,23,42,0.8)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-500/10 p-2 text-cyan-400">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-slate-400">{title}</p>
            <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${positive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
          {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {detail}
        </div>
      </div>
    </div>
  );
}
