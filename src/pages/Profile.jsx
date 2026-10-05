import { useFinance } from '../context/FinanceContext';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { profile, setProfile } = useFinance();
  const { user, logout } = useAuth();

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">Profile</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Personal profile</h1>
        </div>
        <button type="button" onClick={logout} className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-300 hover:bg-red-500/15">Logout</button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 text-2xl font-bold text-white">A</div>
          <h2 className="mt-5 text-2xl font-semibold text-white">{profile.fullName}</h2>
          <p className="mt-2 text-slate-400">{user?.email || profile.email}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Name</label>
              <input value={profile.fullName} onChange={(e) => handleChange('fullName', e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Email</label>
              <input value={profile.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Currency</label>
              <select value={profile.currency} onChange={(e) => handleChange('currency', e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none">
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Monthly income target</label>
              <input type="number" value={profile.monthlyIncomeTarget} onChange={(e) => handleChange('monthlyIncomeTarget', Number(e.target.value))} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-slate-300">Savings goal</label>
              <input type="number" value={profile.savingsGoal} onChange={(e) => handleChange('savingsGoal', Number(e.target.value))} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
