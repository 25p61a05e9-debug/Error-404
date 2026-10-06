import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '', terms: false });

    const strength = form.password.length >= 8 ? 'Strong' : form.password.length >= 6 ? 'Moderate' : 'Weak';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.fullName || !form.email || !form.password || !form.confirmPassword) return;
        if (form.password !== form.confirmPassword) return;
        if (!form.terms) return;
        register({ fullName: form.fullName, email: form.email, password: form.password });
        navigate('/dashboard');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#0f172a,#020817_58%)] px-4 py-10 text-slate-100">
            <div className="w-full max-w-xl rounded-[28px] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-violet-950/20">
                <div className="mb-8">
                    <p className="text-sm uppercase tracking-[0.3em] text-violet-400">Create account</p>
                    <h2 className="mt-3 text-3xl font-semibold text-white">Join FinTrack</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm text-slate-300">Full name</label>
                        <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none" placeholder="Alex Morgan" />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">Email</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none" placeholder="name@example.com" />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">Password</label>
                        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none" placeholder="Create a password" />
                        <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                            <span className={`rounded-full px-2 py-1 ${strength === 'Strong' ? 'bg-emerald-500/15 text-emerald-400' : strength === 'Moderate' ? 'bg-amber-500/15 text-amber-400' : 'bg-rose-500/15 text-rose-400'}`}>{strength}</span>
                            Use at least 8 characters.
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">Confirm password</label>
                        <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none" placeholder="Confirm your password" />
                    </div>

                    <label className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-300">
                        <input type="checkbox" checked={form.terms} onChange={(e) => setForm({ ...form, terms: e.target.checked })} className="mt-1 rounded border-slate-700 bg-slate-950" />
                        <span>I agree to the terms and conditions for secure personal finance tracking.</span>
                    </label>

                    <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:brightness-110">Create Account</button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-400">
                    Already have an account? <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
