import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="flex min-h-screen">
                <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
                <div className="flex min-h-screen flex-1 flex-col">
                    <Navbar onMenuClick={() => setMobileOpen((prev) => !prev)} />
                    <main className="flex-1 overflow-y-auto p-4 md:p-6 xl:p-8">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}
