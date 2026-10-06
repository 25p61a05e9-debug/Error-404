import AIChat from '../components/AIChat';

export default function AIAssistant() {
    return (
        <div className="space-y-6">
            <div>
                <p className="text-sm uppercase tracking-[0.25em] text-violet-400">AI assistant</p>
                <h1 className="mt-2 text-3xl font-bold text-white">FinTrack AI</h1>
            </div>
            <AIChat />
        </div>
    );
}
