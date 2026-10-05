import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-center text-slate-100">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">404</p>
        <h1 className="mt-4 text-4xl font-bold text-white">Page not found</h1>
        <p className="mt-3 text-slate-400">The page you are looking for does not exist or has moved.</p>
        <Link to="/dashboard" className="mt-6 inline-flex rounded-xl bg-cyan-500 px-4 py-2.5 font-semibold text-slate-950">Back to dashboard</Link>
      </div>
    </div>
  );
}
