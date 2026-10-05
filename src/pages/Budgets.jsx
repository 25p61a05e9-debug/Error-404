import { useState } from 'react';
import { Plus } from 'lucide-react';
import BudgetCard from '../components/BudgetCard';
import Modal from '../components/Modal';
import { useFinance } from '../context/FinanceContext';

export default function Budgets() {
  const { budgets, addBudget, updateBudget, deleteBudget } = useFinance();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ category: 'Food', limit: 10000, spent: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { category: form.category, limit: Number(form.limit), spent: Number(form.spent || 0) };
    if (editing) {
      updateBudget(editing.id, payload);
    } else {
      addBudget(payload);
    }
    setOpen(false);
    setEditing(null);
    setForm({ category: 'Food', limit: 10000, spent: 0 });
  };

  const openEdit = (budget) => {
    setEditing(budget);
    setForm({ category: budget.category, limit: budget.limit, spent: budget.spent });
    setOpen(true);
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ category: 'Food', limit: 10000, spent: 0 });
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">Budgets</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Budgets</h1>
        </div>
        <button type="button" onClick={openCreate} className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20">
          <Plus className="h-4 w-4" /> Create Budget
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {budgets.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} onEdit={openEdit} onDelete={(id) => deleteBudget(id)} />
        ))}
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)} title={editing ? 'Edit budget' : 'Create budget'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none">
              {['Food','Transport','Shopping','Entertainment','Bills','Health','Education','Other'].map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Limit</label>
              <input type="number" value={form.limit} onChange={(e) => setForm({ ...form, limit: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Spent</label>
              <input type="number" value={form.spent} onChange={(e) => setForm({ ...form, spent: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-slate-200">Cancel</button>
            <button type="submit" className="rounded-xl bg-cyan-500 px-4 py-2.5 font-medium text-slate-950">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
