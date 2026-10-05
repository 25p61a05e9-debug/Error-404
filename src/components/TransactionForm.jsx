import { useState } from 'react';

const defaultValues = {
  description: '',
  amount: '',
  type: 'Expense',
  category: 'Food',
  date: new Date().toISOString().slice(0, 10),
  notes: '',
};

export default function TransactionForm({ initialValues = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({ ...defaultValues, ...initialValues });

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      description: form.description,
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
      notes: form.notes,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm text-slate-300">Description</label>
        <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none" placeholder="Groceries" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Amount</label>
          <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none" placeholder="1500" />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">Type</label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none">
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Category</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none">
            {['Food','Transport','Shopping','Entertainment','Bills','Health','Education','Salary','Freelance','Other'].map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-300">Date</label>
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none" />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">Notes</label>
        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none" placeholder="Notes" />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-slate-200">Cancel</button>
        <button type="submit" className="rounded-xl bg-cyan-500 px-4 py-2.5 font-medium text-slate-950">Save</button>
      </div>
    </form>
  );
}
