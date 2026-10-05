import { useMemo, useState } from 'react';
import { Edit3, Plus, Search, Trash2, Download } from 'lucide-react';
import Modal from '../components/Modal';
import TransactionForm from '../components/TransactionForm';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../utils/formatCurrency';

const sortOptions = {
  dateDesc: (a, b) => new Date(b.date) - new Date(a.date),
  amountDesc: (a, b) => Number(b.amount) - Number(a.amount),
  amountAsc: (a, b) => Number(a.amount) - Number(b.amount),
};

export default function Transactions() {
  const { transactions, deleteTransaction, updateTransaction, addTransaction } = useFinance();
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dateDesc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const filtered = useMemo(() => {
    const result = transactions.filter((item) => {
      const matchesQuery = item.description.toLowerCase().includes(query.toLowerCase());
      const matchesType = typeFilter === 'All' || item.type === typeFilter;
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      return matchesQuery && matchesType && matchesCategory;
    });

    return [...result].sort(sortOptions[sortBy]);
  }, [transactions, query, typeFilter, categoryFilter, sortBy]);

  const openEdit = (item) => {
    setSelectedTransaction(item);
    setIsModalOpen(true);
  };

  const handleSubmit = (values) => {
    if (selectedTransaction) {
      updateTransaction(selectedTransaction.id, values);
    } else {
      addTransaction(values);
    }
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">Transactions</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Transactions</h1>
        </div>
        <div className="flex gap-3">
          <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 hover:border-slate-600"><Download className="h-4 w-4" /> Export</button>
          <button type="button" onClick={() => { setSelectedTransaction(null); setIsModalOpen(true); }} className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 hover:brightness-110"><Plus className="h-4 w-4" /> Add Transaction</button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search transactions" className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-9 pr-3 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none" />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none">
            <option value="All">All types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none">
            <option value="All">All categories</option>
            {Array.from(new Set(transactions.map((item) => item.category))).map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-sm text-slate-400">Showing {filtered.length} transactions</div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none">
            <option value="dateDesc">Newest first</option>
            <option value="amountDesc">Highest amount</option>
            <option value="amountAsc">Lowest amount</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/75">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-200">
            <thead className="bg-slate-950/60 text-slate-300">
              <tr>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Description</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t border-slate-800 hover:bg-slate-950/40">
                  <td className="px-5 py-4">{item.date}</td>
                  <td className="px-5 py-4 font-medium text-white">{item.description}</td>
                  <td className="px-5 py-4">{item.category}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.type === 'Income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>{item.type}</span>
                  </td>
                  <td className={`px-5 py-4 font-semibold ${item.type === 'Income' ? 'text-emerald-400' : 'text-rose-400'}`}>{item.type === 'Income' ? '+' : '-'}{formatCurrency(item.amount)}</td>
                  <td className="px-5 py-4"><span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-400">{item.status}</span></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => openEdit(item)} className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-cyan-300 hover:border-slate-600"><Edit3 className="h-4 w-4" /></button>
                      <button type="button" onClick={() => handleDelete(item.id)} className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-rose-300 hover:border-slate-600"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { setSelectedTransaction(null); setIsModalOpen(false); }} title={selectedTransaction ? 'Edit transaction' : 'Add transaction'}>
        <TransactionForm initialValues={selectedTransaction || {}} onSubmit={handleSubmit} onCancel={() => { setSelectedTransaction(null); setIsModalOpen(false); }} />
      </Modal>
    </div>
  );
}
