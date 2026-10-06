import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

export default function RecentTransactions({ transactions }) {
    return (
        <div className="space-y-3">
            {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                    <div className="flex items-center gap-3">
                        <div className={`rounded-xl p-2 ${transaction.type === 'Income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                            {transaction.type === 'Income' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                        </div>
                        <div>
                            <p className="font-medium text-white">{transaction.description}</p>
                            <p className="text-xs text-slate-400">{transaction.category}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className={`font-semibold ${transaction.type === 'Income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {transaction.type === 'Income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-xs text-slate-400">{transaction.date}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
