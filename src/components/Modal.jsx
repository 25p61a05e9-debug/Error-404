export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/30">
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                    <button type="button" onClick={onClose} className="rounded-full border border-slate-700 p-2 text-slate-300 transition hover:border-slate-500 hover:text-white">✕</button>
                </div>
                {children}
            </div>
        </div>
    );
}
