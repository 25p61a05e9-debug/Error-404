import { Bell, Search, UserCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFinance } from '../context/FinanceContext';

export default function Navbar({ onMenuClick }) {
    const { user } = useAuth();
    const { profile } = useFinance();

    return (
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950/70 px-4 py-4 backdrop-blur xl:px-6">
            <div className="flex items-center gap-3">
                <button type="button" onClick={onMenuClick} className="rounded-xl border border-slate-700 p-2 text-slate-200 lg:hidden">
                    ☰
                </button>
                <div className="hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 md:flex">
                    <Search className="h-4 w-4 text-slate-400" />
                    <input aria-label="Search" placeholder="Search" className="w-40 border-0 bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none" />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button type="button" className="relative rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-200 transition hover:border-slate-700">
                    <Bell className="h-4 w-4" />
                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-cyan-400" />
                </button>
                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2">
                    <UserCircle2 className="h-8 w-8 text-cyan-400" />
                    <div className="hidden text-left sm:block">
                        <p className="text-sm font-medium text-white">{profile?.fullName || user?.name || 'Alex'}</p>
                        <p className="text-[11px] text-slate-400">Premium</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
