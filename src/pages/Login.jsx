import { useState } from 'react';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: 'alex@fintrack.app', password: 'demo123' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please enter both email and password.');
      return;
    }

    login({ email: form.email, password: form.password, name: 'Alex Morgan' });
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#0f172a,#020817_58%)] px-4 py-10 text-slate-100">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900/80 shadow-2xl shadow-cyan-950/20 lg:grid-cols-2">
        <div className="relative hidden flex-col justify-between bg-slate-950 p-8 lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_35%)]" />
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 font-bold text-slate-950">F</div>
            <div>
              <p className="text-xl font-semibold text-white">FinTrack</p>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Secure finance</p>
            </div>
          </div>

          <div className="relative z-10 space-y-6">
            <h1 className="max-w-xs text-4xl font-semibold leading-tight text-white">Plan smarter. Spend wiser.</h1>
            <p className="max-w-sm text-slate-300">Track every rupee, forecast future purchases, and let AI help you make stronger financial decisions.</p>
          </div>

          <div className="relative z-10 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="mb-2 flex items-center gap-2 text-cyan-400"><ShieldCheck className="h-4 w-4" /> Protected and private</div>
            <p className="text-sm text-slate-300">Your spending data is kept safe as you monitor income, budgets, and cashflow.</p>
          </div>
        </div>

        <div className="p-6 md:p-10">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Welcome back</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Sign in to FinTrack</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none" placeholder="name@company.com" />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-11 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none" placeholder="Enter your password" />
                <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-3 text-slate-400 hover:text-white">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-300"><input type="checkbox" className="rounded border-slate-700 bg-slate-950" /> Remember me</label>
              <a href="#" className="text-cyan-400 hover:text-cyan-300">Forgot password?</a>
            </div>

            {error && <p className="text-sm text-rose-400">{error}</p>}

            <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110">Login</button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Don’t have an account?{' '}
            <Link to="/register" className="font-medium text-cyan-400 hover:text-cyan-300">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
