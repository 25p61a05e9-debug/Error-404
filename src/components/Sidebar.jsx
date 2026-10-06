import { ChartColumn, CircleDollarSign, LayoutDashboard, MessageSquareText, PiggyBank, Settings, UserRound, WalletCards } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/transactions', label: 'Transactions', icon: WalletCards },
    { to: '/budgets', label: 'Budgets', icon: PiggyBank },
    { to: '/analytics', label: 'Analytics', icon: ChartColumn },
    { to: '/ai-assistant', label: 'AI Assistant', icon: MessageSquareText },
];

const secondaryItems = [
    { to: '/profile', label: 'Profile', icon: UserRound },
    { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ mobileOpen, onClose }) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <aside className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-800 bg-slate-950/95 p-4 backdrop-blur-lg transition lg:static lg:translate-x-0`}>
            <div className="mb-8 flex items-center gap-3 px-3 pt-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 text-lg font-bold text-white shadow-lg shadow-cyan-500/20">F</div>
                <div>
                    <p className="text-2xl font-bold tracking-tight text-white">FinTrack</p>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-400">Personal finance</p>
                </div>
            </div>

            <nav className="space-y-2">
                {navItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        onClick={onClose}
                        className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive ? 'bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/30' : 'text-slate-300 hover:bg-slate-900 hover:text-white'}`}
                    >
                        <Icon className="h-4 w-4" />
                        {label}
                    </NavLink>
                ))}
            </nav>

            <div className="mt-8 border-t border-slate-800 pt-6">
                {secondaryItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        onClick={onClose}
                        className={({ isActive }) => `mb-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-900 hover:text-white'}`}
                    >
                        <Icon className="h-4 w-4" />
                        {label}
                    </NavLink>
                ))}

                <button
                    type="button"
                    onClick={() => {
                        logout();
                        navigate('/login');
                    }}
                    className="mt-4 flex w-full items-center gap-3 rounded-xl bg-red-500/10 px-3 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/15"
                >
                    <CircleDollarSign className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
